import React, { useCallback, useContext, useState } from "react";
import { ITokenDetail } from "@/interfaces/api/marketplace";
import BaseModal from '@/components/BaseModal'
import SonarWaveCircle from "@/components/SonarWaveCircle";
import CountdownText from "@/components/CountdownText";
import Button from "@/components/Button";
import s from './styles.module.scss';
import { AuctionContext } from "@/contexts/auction-context";
import useCreateBid, { ICreateBidParams } from "@/hooks/contract-operations/soul/useCreateBid";
import useContractOperation from "@/hooks/contract-operations/useContractOperation";
import logger from "@/services/logger";
import { showToastError } from "@/utils/toast";
import { formatEthPrice } from "@/utils/format";
import { Formik } from 'formik';
import Web3 from 'web3';
import { isValidNumber } from "@/utils";
import cs from 'classnames';
import { AssetsContext } from "@/contexts/assets-context";
import * as TC_SDK from 'trustless-computer-sdk';
import { TRANSFER_TX_SIZE } from "@/configs";
import BigNumber from 'bignumber.js';
import web3Instance from '@/connections/custom-web3-provider';
import EstimatedFee from "@/components/EstimatedFee";

interface IProps {
  show: boolean;
  handleClose: () => void;
  data: ITokenDetail;
}

interface IFormValues {
  amount: string;
}

const ModalBid: React.FC<IProps> = ({
  show,
  handleClose,
  data
}: IProps): React.ReactElement => {
  const { auction, auctionEndTime } = useContext(AuctionContext);
  const { gmDepositBalance } = useContext(AssetsContext);
  const { feeRate } = useContext(AssetsContext);
  const [estBTCFee, setEstBTCFee] = useState<string | null>(null);
  const [estTCFee, setEstTCFee] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { run: createBid } = useContractOperation({
    operation: useCreateBid,
    inscribeable: true
  });
  const {
    estimateGas
  } = useCreateBid();

  const validateForm = (values: IFormValues): Record<string, string> => {
    const errors: Record<string, string> = {};
    const { amount } = values;
    const decimalRegex = /^\d+(\.\d{1,4})?$/; // Regular expression for numbers with up to 4 decimal places

    if (!amount) {
      errors.amount = 'Amount is required.'
    } else if (!isValidNumber(amount)) {
      errors.amount = 'Invalid number.'
    } else if (parseFloat(amount) < 0) {
      errors.amount = 'Invalid number. Amount must be greater than 0.'
    } else if (!decimalRegex.test(amount)) {
      errors.amount = 'Please enter a valid number with up to 4 decimal places.';
    } else {
      calculateEstBtcFee();
      calculateEstTcFee(amount.toString());
    }

    return errors;
  }

  const handleSubmit = async (values: IFormValues): Promise<void> => {
    if (processing) return;

    try {
      setProcessing(true);
      const { amount } = values;
      await createBid({
        tokenId: Number(data.tokenId),
        amount: Web3.utils.toWei(amount.toString()),
      });
    } catch (err: unknown) {
      logger.error(err);
      showToastError({
        message: (err as Error).message,
      })
    } finally {
      setProcessing(false);
    }
  }

  const calculateEstBtcFee = useCallback(() => {
    if (!show) return;

    const estimatedEconomyFee = TC_SDK.estimateInscribeFee({
      tcTxSizeByte: TRANSFER_TX_SIZE,
      feeRatePerByte: feeRate.hourFee,
    });
    setEstBTCFee(estimatedEconomyFee.totalFee.toString());
  },
    [feeRate, show],
  );

  const calculateEstTcFee = useCallback(async (amount: string) => {
    if (!estimateGas || !data.tokenId || !show || !amount) return '0';
    setEstTCFee(null);
    try {
      const payload: ICreateBidParams = {
        tokenId: data.tokenId as unknown as number,
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
    [setEstTCFee, estimateGas, data, show],
  );

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
        {({ values, errors, touched, handleChange, handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            <p className={s.bidModal_header_content_desc}>
              You will be the highest bidder in the auction once your bid is submitted.
            </p>
            <div className={s.bidModal_body_address}>
              <div className={s.bidModal_body_addressContent}>
                <img className={s.bidModal_body_addressContent_imageCapture} src={data.imageCapture} alt="art_img" />
                <p
                  className={
                    s.bidModal_body_addressContent_infoId
                  }
                >
                  {`Soul ${data.tokenId}`}
                </p>
              </div>
              {auctionEndTime && (
                <div className={s.bidModal_body_auctionCountdownWrapper}>
                  <SonarWaveCircle />
                  <CountdownText className={s.bidModal_body_auctionCountdownWrapper_countdownText} countDownTo={auctionEndTime} />
                </div>
              )}
            </div>
            <div className={s.bidModal_body_highest}>
              <div className={s.bidModal_body_highest_wrapper}>
                <div className={s.bidModal_body_highestPrice}>
                  <p className={s.bidModal_body_highestPrice_label}>Highest bid</p>
                  <p className={s.bidModal_body_highestPrice_value}>{`${formatEthPrice(auction.highestBid)} GM`}</p>
                </div>
                <div className={s.bidModal_body_highestPrice}>
                  <p className={s.bidModal_body_highestPrice_label}>Auction Wallet</p>
                  <p className={s.bidModal_body_highestPrice_value}>{`${formatEthPrice(gmDepositBalance)} GM`}</p>
                </div>
              </div>
              <div className={cs(s.bidModal_body_highestInput, {
                [s.error]: errors.amount && touched.amount
              })}>
                <input
                  name='amount'
                  type="number"
                  value={values.amount}
                  onChange={handleChange}
                  placeholder='Bid more'
                />
                <p
                  className={
                    s.bidModal_body_highestInput_classifyBuy
                  }>
                  GM
                </p>
              </div>
              {errors.amount && touched.amount && (
                <p className={s.bidModal_body_highestInput_errorMessage}>{errors.amount}</p>
              )}
              <p className={s.bidModal_body_highestInput_desc}>
                Your GM <strong>will be returned</strong> if there is a higher
                bidder.
              </p>
            </div>
            <div className={s.bidModal_body_fee}>
              <EstimatedFee
                estimateBTCGas={estBTCFee}
                estimateTCGas={estTCFee}
              />
            </div>
            <div className={s.modalFooter}>
              <Button
                disabled={!isValid || processing}
                type="submit"
                className={s.bidBtn}>
                {processing ? 'Processing...' : 'Bid'}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </BaseModal>
  )
}

export default ModalBid;

