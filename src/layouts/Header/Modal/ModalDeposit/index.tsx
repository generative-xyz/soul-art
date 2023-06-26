import BaseModal from '@/components/BaseModal';
import React, { useCallback, useContext, useState } from 'react';
import s from './ModalDeposit.module.scss';
import EstimatedFee from '@/components/EstimatedFee';
import Button from '@/components/Button';
import { AssetsContext } from '@/contexts/assets-context';
import { formatEthPrice } from '@/utils/format';
import { Formik, FormikProps } from 'formik';
import { isValidNumber, toStorageKey } from '@/utils';
import logger from '@/services/logger';
import { showToastError } from '@/utils/toast';
import { GM_ADDRESS, SOUL_CONTRACT, TRANSFER_TX_SIZE } from '@/configs';
import * as TC_SDK from 'trustless-computer-sdk';
import web3Instance from '@/connections/custom-web3-provider';
import BigNumber from 'bignumber.js';
import cs from 'classnames';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useDeposit, { IDepositParams } from '@/hooks/contract-operations/soul/useDeposit';
import useApproveTokenAmount, { IApproveTokenAmountParams } from '@/hooks/contract-operations/erc20/useApproveTokenAmount';
import useGetAllowanceAmount, { IGetAllowanceAmountParams } from '@/hooks/contract-operations/erc20/useGetAllowanceAmount';
import { Transaction } from 'ethers';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import { MAX_HEX_VALUE } from '@/constants/common';
import Web3 from 'web3';

interface IProps {
  show: boolean;
  handleClose: () => void;
};

interface IFormValues {
  amount: string;
}

const ModalDeposit: React.FC<IProps> = ({ show, handleClose }: IProps) => {
  const user = useSelector(getUserSelector);
  const { gmBalance, gmDepositBalance } = useContext(AssetsContext);
  const [estBTCFee, setEstBTCFee] = useState<string | null>(null);
  const [estTCFee, setEstTCFee] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { feeRate } = useContext(AssetsContext);
  const { run: getAllowanceAmount } = useContractOperation<
    IGetAllowanceAmountParams,
    BigNumber
  >({
    operation: useGetAllowanceAmount,
    inscribable: false,
  });
  const { run: approveTokenAmount } = useContractOperation<
    IApproveTokenAmountParams,
    Transaction | null
  >({
    operation: useApproveTokenAmount,
    inscribable: false,
  });
  const {
    operationName: approveTokenOp
  } = useApproveTokenAmount();
  const { run: depositGmToSoul } = useContractOperation({
    operation: useDeposit,
    inscribable: true
  });

  const {
    estimateGas
  } = useDeposit();
  const formRef = React.useRef<FormikProps<IFormValues>>(null);

  const validateForm = (values: IFormValues): Record<string, string> => {
    const errors: Record<string, string> = {};
    const balance = new BigNumber(gmBalance).dividedBy(1e18).toNumber();

    if (!values.amount) {
      errors.amount = 'Amount is required.'
    } else if (!isValidNumber(values.amount)) {
      errors.amount = 'Invalid number.'
    } else if (parseFloat(values.amount) < 0) {
      errors.amount = 'Invalid number. Amount must be greater than 0.'
    } else if (parseFloat(values.amount) > balance) {
      errors.amount = 'Invalid number. Amount must be less than or equal your GM balance.'
    } else {
      calculateEstBtcFee();
      calculateEstTcFee(values.amount.toString());
    }
    return errors;
  }

  const handleSubmit = async (values: IFormValues): Promise<void> => {
    if (processing) return;
    const storageKey = toStorageKey(approveTokenOp, `${GM_ADDRESS}_${user?.walletAddress}`);

    try {
      setProcessing(true);
      const { amount } = values;

      const approvedCache = localStorage.getItem(storageKey);
      logger.debug('approved cache', approvedCache);

      if (!approvedCache) {
        logger.debug('approving token amount...');

        const allowanceAmountBN = await getAllowanceAmount({
          contractAddress: GM_ADDRESS,
          operatorAddress: SOUL_CONTRACT,
        });
        logger.debug('allowance Amount', allowanceAmountBN.toString());

        // Convert amount to bn
        const amountBN = new BigNumber(amount).times(1e18);

        if (allowanceAmountBN.isLessThan(amountBN)) {
          await approveTokenAmount({
            tokenAddress: GM_ADDRESS,
            consumerAddress: SOUL_CONTRACT,
            amount: MAX_HEX_VALUE,
          });

          localStorage.setItem(storageKey, 'true');
        }
      }

      await depositGmToSoul({
        amount: Web3.utils.toWei(amount.toString()),
      });
    } catch (err: unknown) {
      logger.error(err);
      localStorage.removeItem(storageKey);
      showToastError({
        message: (err as Error).message,
      })
    } finally {
      setProcessing(false);
    }
  }

  const handleSetMaxAmount = () => {
    if (formRef.current) {
      const amountBN = new BigNumber(gmBalance);
      const newAmount = (amountBN.dividedBy(1e18)).toString()
      const currentAmount = Number(formRef.current.values.amount).toString();
      if (newAmount !== currentAmount) {
        formRef.current.setFieldValue('amount', newAmount);
      }
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
    if (!estimateGas || !show) return '0';
    setEstTCFee(null);
    try {
      const payload: IDepositParams = {
        amount: amount,
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
    [setEstTCFee, estimateGas, show],
  );

  return (
    <BaseModal show={show} handleClose={handleClose} title="Deposit">
      <Formik
        key="deposit-gm-form"
        initialValues={{
          amount: '',
        }}
        innerRef={formRef}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            <p className={s.subTitle}>
              Deposit $GM to your auction wallet to make a bid.
            </p>
            <div className={s.deposit_wrapper}>
              <p className={s.deposit_guide}>
                The minimum amount required: <span>1 $GM</span>.
              </p>
              <div className={s.balance}>
                <div className={s.balance_item}>
                  <span>GM Balance</span>
                  <span className={s.balance_amount}>{`${formatEthPrice(gmBalance)} GM`}</span>
                </div>
                <div className={s.balance_item}>
                  <span>Auction Wallet</span>
                  <span className={s.balance_amount}>{`${formatEthPrice(gmDepositBalance)} GM`}</span>
                </div>
              </div>
              <div className={cs(s.modal_input, {
                [s.error]: errors.amount && touched.amount
              })}>
                <input
                  name='amount'
                  type="number"
                  value={values.amount}
                  onChange={handleChange}
                  placeholder='0.0'
                />
                <div className={s.modal_input_right}>
                  <Button type='button' onClick={handleSetMaxAmount}>Max</Button>
                  <span>GM</span>
                </div>
              </div>
              {errors.amount && touched.amount && (
                <p className={s.errorMessage}>{errors.amount}</p>
              )}
            </div>
            <div className={s.divider}></div>
            <EstimatedFee
              estimateBTCGas={estBTCFee}
              estimateTCGas={estTCFee}
            />
            <Button
              disabled={!isValid || processing}
              className={s.cta_btn}>
              Deposit
            </Button>
          </form>
        )}
      </Formik>
    </BaseModal>
  );
};

export default React.memo(ModalDeposit);
