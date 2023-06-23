import React from 'react';
import BaseModal from '@/components/BaseModal';
import s from './styles.module.scss';

interface IProps {
  show: boolean;
  handleClose: () => void;
}

const ModalError: React.FC<IProps> = ({
  show,
  handleClose,
}: IProps) => {
  return (
    <BaseModal
      show={show}
      handleClose={handleClose}
      title="Oops..."
      className={s.modal}
    >
      <div className={s.modalContent}>
        <p className={s.errorText}>
          Each wallet is limited to adopting only one Soul. If you wish to adopt another Soul, please connect a new wallet.
        </p>
      </div>
    </BaseModal>
  )
}

export default ModalError;
