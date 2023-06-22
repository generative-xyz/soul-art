import React, { PropsWithChildren } from "react";
import { Modal, ModalProps } from "react-bootstrap";
import s from './styles.module.scss';
import IconSVG from "@/components/IconSVG";
import { CDN_URL } from "@/configs";

interface IProps extends ModalProps {
  show: boolean;
  handleClose: () => void;
  title?: string;
}

const BaseModal: React.FC<PropsWithChildren<IProps>> = ({
  show,
  handleClose,
  title,
  children,
}: IProps): React.ReactElement => {
  return (
    <Modal
      className={s.modal}
      centered
      show={show}
      onHide={handleClose}
    >
      <div className={s.modalContainer}>
        <Modal.Header className={s.modalHeader}>
          {title && (
            <Modal.Title className={s.modalTitle}>
              <p className={s.modalTitleContent}>
                {title}
              </p>
            </Modal.Title>
          )}
          <div
            className={s.closeBtn}
            onClick={handleClose}
          >
            <IconSVG
              src={`${CDN_URL}/ic-vector.svg`}
              maxWidth={'16'}
              maxHeight={'16'}
            />
          </div>
        </Modal.Header>
        <Modal.Body className={s.modal_body}>
          {children}
        </Modal.Body>
      </div>
    </Modal>
  )
}

export default BaseModal;
