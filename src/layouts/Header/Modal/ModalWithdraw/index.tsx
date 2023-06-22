import BaseModal from '@/components/BaseModal';
import React from 'react';

type Props = {
  show: boolean;
  handleClose: () => void;
};

const ModalWithdraw = ({ show, handleClose }: Props) => {
  return (
    <BaseModal show={show} handleClose={handleClose} title="Withdraw">
      ModalWithdraw
    </BaseModal>
  );
};

export default ModalWithdraw;
