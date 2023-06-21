import BaseModal from '@/components/BaseModal';
import React, { useContext } from 'react';
import s from './ModalDeposit.module.scss';
import EstimatedFee from '@/components/EstimatedFee';
import Button from '@/components/Button';
import { AssetsContext } from '@/contexts/assets-context';

type Props = {
  show: boolean;
  handleClose: () => void;
};

const ModalDeposit = ({ show, handleClose }: Props) => {
  const { gmBalance } = useContext(AssetsContext);

  return (
    <BaseModal show={show} handleClose={handleClose} title="Deposit">
      <p className={s.subTitle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, mollitia!
      </p>
      <div className={s.deposit_wrapper}>
        <p>
          Your GM balance must have <span>more than 1 GM</span> to deposit.
        </p>
        <div className={s.balance}>
          <div className={s.balance_item}>
            <span>GM Balance</span>
            <span className={s.balance_amount}>-- GM</span>
          </div>
          <div className={s.balance_item}>
            <span>Auction Wallet</span>
            <span className={s.balance_amount}>{gmBalance} GM</span>
          </div>
        </div>
        <div className={s.modal_input}>
          <input type="number" placeholder="0.0" />
          <div className={s.modal_input_right}>
            <Button>Max</Button>
            <span>GM</span>
          </div>
        </div>
      </div>
      <div className={s.divider}></div>
      <EstimatedFee
        estimateBTCGas={'1000000000000'}
        estimateTCGas={'1000000000000'}
      />
      <Button disabled={parseFloat(gmBalance) < 1} className={s.cta_btn}>
        Deposit
      </Button>
    </BaseModal>
  );
};

export default ModalDeposit;
