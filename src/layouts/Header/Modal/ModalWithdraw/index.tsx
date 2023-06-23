import BaseModal from '@/components/BaseModal';
import React, { useContext, useState } from 'react';
import s from './styles.module.scss';
import Button from '@/components/Button';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useWithdraw from '@/hooks/contract-operations/soul/useWithdraw';
import { AssetsContext } from '@/contexts/assets-context';
import BigNumber from 'bignumber.js';
import { showToastError } from '@/utils/toast';
import logger from '@/services/logger';

interface IProps {
  show: boolean;
  handleClose: () => void;
};

const ModalWithdraw: React.FC<IProps> = ({ show, handleClose }: IProps): React.ReactElement => {
  const { gmDepositBalance } = useContext(AssetsContext);
  const [processing, setProcessing] = useState(false);
  const { run: withdraw } = useContractOperation({
    operation: useWithdraw,
    inscribable: true,
  })

  const handleWithdraw = async (): Promise<void> => {
    try {
      setProcessing(true);
      const gmDepositBalanceBN = new BigNumber(gmDepositBalance);
      if (gmDepositBalanceBN.isEqualTo(0)) {
        showToastError({
          message: 'No asset found.'
        })
        return;
      }

      await withdraw({});
    } catch (err: unknown) {
      logger.error(err);
      showToastError({
        message: (err as Error).message
      })
    } finally {
      setProcessing(false);
    }
  }

  return (
    <BaseModal
      show={show}
      handleClose={handleClose}
      title="Are you want to withdraw?">
      <div className={s.modalContent}>
        <p className={s.reminderText}>
          You will withdraw your entire $GM balance from the auction wallet.
        </p>
        <div className={s.actionWrapper}>
          <Button
            disabled={processing}
            onClick={handleWithdraw}
            className={s.withdrawBtn}>
            {processing ? 'Processing...' : 'Withdraw'}
          </Button>
          <Button
            onClick={handleClose}
            className={s.cancelBtn}>
            Cancel
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default React.memo(ModalWithdraw);
