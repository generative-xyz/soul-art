import React, { useCallback, useContext, useState } from 'react';
import BaseModal from '@/components/BaseModal';
import SonarWaveCircle from '@/components/SonarWaveCircle';
import CountdownText from '@/components/CountdownText';
import Button from '@/components/Button';
import s from './styles.module.scss';
import { AuctionContext } from '@/contexts/auction-context';
import useCreateBid, {
  ICreateBidParams,
} from '@/hooks/contract-operations/soul/useCreateBid';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import logger from '@/services/logger';
import { showToastError } from '@/utils/toast';
import { formatEthPrice } from '@/utils/format';
import { Formik } from 'formik';
import Web3 from 'web3';
import { isValidNumber } from '@/utils';
import cs from 'classnames';
import { AssetsContext } from '@/contexts/assets-context';
import * as TC_SDK from 'trustless-computer-sdk';
import { TRANSFER_TX_SIZE } from '@/configs';
import BigNumber from 'bignumber.js';
import web3Instance from '@/connections/custom-web3-provider';
import EstimatedFee from '@/components/EstimatedFee';
import useGetUserBid from '@/hooks/contract-operations/soul/useGetUserBid';
import useAsyncEffect from 'use-async-effect';
import ImageWrapper from '@/components/ImageWrapper';

interface IProps {
  show: boolean;
  handleClose: () => void;
  tokenId: string;
  imageCapture: string;
}

interface IFormValues {
  amount: string;
}

const ModalBid: React.FC<IProps> = ({
  show,
  handleClose,
  tokenId,
  imageCapture,
}: IProps): React.ReactElement => {
  const { auction, auctionEndTime } = useContext(AuctionContext);
  const { gmDepositBalance } = useContext(AssetsContext);
  const { feeRate } = useContext(AssetsContext);
  const [estBTCFee, setEstBTCFee] = useState<string | null>(null);
  const [estTCFee, setEstTCFee] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [userBid, setUserBid] = useState<string | null>(null);
  const { run: getUserBid } = useContractOperation({
    operation: useGetUserBid,
    inscribable: false,
  });
  const { run: createBid } = useContractOperation({
    operation: useCreateBid,
    inscribable: true,
  });
  const { estimateGas } = useCreateBid();

  const validateForm = (values: IFormValues): Record<string, string> => {
    const errors: Record<string, string> = {};
    const { amount } = values;

    if (!amount) {
      errors.amount = 'Amount is required.';
      return errors;
    }

    if (!isValidNumber(amount)) {
      errors.amount = 'Invalid number.';
      return errors;
    }

    const decimalRegex = /^\d+(\.\d{1,4})?$/;
    if (!decimalRegex.test(amount)) {
      errors.amount =
        'Please enter a valid number with up to 4 decimal places.';
      return errors;
    }

    if (parseFloat(amount) < 0) {
      errors.amount = 'Amount must be greater than 0.';
      return errors;
    }

    const gmDepositBalanceBN = new BigNumber(gmDepositBalance);
    const amountBN = new BigNumber(amount).times(1e18);
    const newHighestBig = new BigNumber(auction?.highestBid || 0).times(1.1);

    if (amountBN.isLessThan(newHighestBig)) {
      errors.amount = `Amount must be greater than ${formatEthPrice(
        newHighestBig.toString()
      )} GM.`;
      return errors;
    }

    if (amountBN.isGreaterThan(gmDepositBalanceBN)) {
      errors.amount = `You do not have enough GM to make a higher offer.`;
      return errors;
    }

    calculateEstBtcFee();
    calculateEstTcFee(amount.toString());
    return errors;
  };

  const handleSubmit = async (values: IFormValues): Promise<void> => {
    if (processing) return;

    if (!userBid) {
      showToastError({
        message: `Adopter is not found. Please try again.`,
      });
      return;
    }

    if (!auction) {
      showToastError({
        message: `Auction information not found.`,
      });
      return;
    }

    try {
      setProcessing(true);
      const { amount } = values;
      const newAmount = new BigNumber(amount).times(1e18);
      const currentUserBid = new BigNumber(userBid);
      const bidAmount = newAmount.minus(currentUserBid);
      await createBid({
        tokenId: Number(tokenId),
        amount: bidAmount.toString(),
      });
    } catch (err: unknown) {
      logger.error(err);
      showToastError({
        message: (err as Error).message,
      });
    } finally {
      setProcessing(false);
    }
  };

  const calculateEstBtcFee = useCallback(() => {
    if (!show) return;

    const estimatedEconomyFee = TC_SDK.estimateInscribeFee({
      tcTxSizeByte: TRANSFER_TX_SIZE,
      feeRatePerByte: feeRate.hourFee,
    });
    setEstBTCFee(estimatedEconomyFee.totalFee.toString());
  }, [feeRate, show]);

  const calculateEstTcFee = useCallback(
    async (amount: string) => {
      if (!estimateGas || !tokenId || !show || !amount) return '0';
      setEstTCFee(null);
      try {
        const payload: ICreateBidParams = {
          tokenId: tokenId as unknown as number,
          amount: Web3.utils.toWei(amount.toString()),
        };
        const gasLimit = await estimateGas(payload);
        const gasPrice = await web3Instance.getGasPrice();
        const gasLimitBN = new BigNumber(gasLimit);
        const gasPriceBN = new BigNumber(gasPrice);
        const tcGas = gasLimitBN.times(gasPriceBN);
        logger.debug('TC Gas', tcGas.toString());
        setEstTCFee(tcGas.toString());
        return tcGas.toString();
      } catch (err: unknown) {
        logger.error(err);
        return '0';
      }
    },
    [setEstTCFee, estimateGas, tokenId, show]
  );

  useAsyncEffect(async () => {
    if (!show || !auction || !tokenId) return;
    try {
      const balance = await getUserBid({
        tokenId: tokenId,
        auctionId: auction.chainAuctionId,
      });
      logger.info('user bid balance', balance);
      setUserBid(balance.toString());
    } catch (err: unknown) {
      logger.error('can not get user bid info', err);
    }
  }, [auction, show, tokenId]);

  if (!auction) return <></>;

  return (
    <BaseModal
      show={show}
      handleClose={handleClose}
      title="Bid"
      className={s.modal}
    >
      <Formik
        key="bid-soul-form"
        initialValues={{
          amount: '',
        }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <p className={s.bidModal_header_content_desc}>
              You will be the highest bidder in the auction once your bid is
              submitted.
            </p>
            <div className={s.bidModal_body_address}>
              <div className={s.bidModal_body_addressContent}>
                <ImageWrapper
                  className={s.bidModal_body_addressContent_imageCapture}
                  src={imageCapture}
                  alt="art_img"
                />
                <p className={s.bidModal_body_addressContent_infoId}>
                  {`Soul ${tokenId}`}
                </p>
              </div>
              {auctionEndTime && (
                <div className={s.bidModal_body_auctionCountdownWrapper}>
                  <SonarWaveCircle />
                  <CountdownText
                    className={
                      s.bidModal_body_auctionCountdownWrapper_countdownText
                    }
                    countDownTo={auctionEndTime}
                  />
                </div>
              )}
            </div>
            <div className={s.bidModal_body_highest}>
              <div className={s.bidModal_body_highest_wrapper}>
                <div className={s.bidModal_body_highestPrice}>
                  <p className={s.bidModal_body_highestPrice_label}>
                    Highest amount
                  </p>
                  <p
                    className={s.bidModal_body_highestPrice_value}
                  >{`${formatEthPrice(auction.highestBid)} GM`}</p>
                </div>
                <div className={s.bidModal_body_highestPrice}>
                  <p className={s.bidModal_body_highestPrice_label}>Your bid</p>
                  <p className={s.bidModal_body_highestPrice_value}>
                    {userBid ? `${formatEthPrice(userBid)} GM` : '-'}
                  </p>
                </div>
                <div className={s.bidModal_body_highestPrice}>
                  <p className={s.bidModal_body_highestPrice_label}>
                    Adoption wallet
                  </p>
                  <p
                    className={s.bidModal_body_highestPrice_value}
                  >{`${formatEthPrice(gmDepositBalance)} GM`}</p>
                </div>
              </div>
              <div
                className={cs(s.bidModal_body_highestInput, {
                  [s.error]: errors.amount && touched.amount,
                })}
              >
                <input
                  name="amount"
                  type="number"
                  value={values.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                />
                <p className={s.bidModal_body_highestInput_classifyBuy}>GM</p>
              </div>
              {errors.amount && touched.amount && (
                <p className={s.bidModal_body_highestInput_errorMessage}>
                  {errors.amount}
                </p>
              )}
              <ul className={s.bidModal_body_highestInput_desc}>
                <li>
                  90% of the proceeds from the winning bids go to the Souls DAO,
                  reinforcing the financial sustainability and growth of the
                  ecosystem.
                </li>
                <li>
                  The remaining 10% of the winning bids go to the Souls core
                  team as artist royalties.
                </li>
                <li>
                  Your GM <strong>will be returned</strong> if there is a higher
                  adopter.
                </li>
              </ul>
            </div>
            <div className={s.bidModal_body_fee}>
              <EstimatedFee
                estimateBTCGas={estBTCFee}
                estimateTCGas={estTCFee}
              />
            </div>
            <div className={s.modalFooter}>
              <Button disabled={processing} type="submit" className={s.bidBtn}>
                {processing ? 'Processing...' : 'Bid'}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </BaseModal>
  );
};

export default ModalBid;
