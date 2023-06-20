import { ITokenDetail } from "@/interfaces/api/marketplace";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import s from './styles.module.scss';
import IconSVG from "@/components/IconSVG";
import { CDN_URL } from "@/configs";
import { formatLongAddress } from "@trustless-computer/dapp-core";

interface IProps {
  show: boolean;
  handleClose: () => void;
  data: ITokenDetail;
}

const ModalBid: React.FC<IProps> = ({
  show,
  handleClose,
  data
}: IProps): React.ReactElement => {
  return (
    <Modal
      className={s.modal}
      centered
      show={show}
      onHide={handleClose}
    // backdrop="static" //Click outside don't close modal
    >
      <div className={s.modal_container}>
        <Modal.Header className={s.modal_header}>
          <Modal.Title className={s.modal_header_content}>
            <p className={s.modal_header_content_title}>
              Adopt
            </p>
            <p className={s.modal_header_content_desc}>
              Once your bid is placed, you will be the highest bidder in the
              auction
            </p>
            <div
              className={s.modal_header_buttonClose}
              onClick={handleClose}
            >
              <IconSVG
                src={`${CDN_URL}/ic-vector.svg`}
                maxWidth={'15.34'}
                maxHeight={'15.34'}
              ></IconSVG>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={s.modal_body}>
          <div className={s.modal_body_address}>
            <div className={s.modal_body_addressContent}>
              <div
                className={s.modal_body_addressContent_img}
              >
                <img src={data.imageCapture} alt="art_img" />
              </div>
              <div
                className={s.modal_body_addressContent_info}
              >
                <p
                  className={
                    s.modal_body_addressContent_infoId
                  }
                >
                  Soul #123
                </p>
                <div
                  className={
                    s.modal_body_addressContent_infoUserAddress
                  }
                >
                  <div>
                    <IconSVG
                      src={`${CDN_URL}/img-user.svg`}
                      maxWidth={'32'}
                      maxHeight={'32'}
                    ></IconSVG>
                  </div>
                  <p>{formatLongAddress('012831236821763812638')}</p>
                </div>
              </div>
            </div>
            <div className={s.modal_body_addressContent}>
              <p
                className={s.modal_body_addressContent_live}
              ></p>
              <p className={s.modal_body_addressContent_time}>
                2d&nbsp;:&nbsp;16h&nbsp;:&nbsp;12m
              </p>
            </div>
          </div>
          <div className={s.modal_body_highest}>
            <div className={s.modal_body_highestPrice}>
              <p>Highest&nbsp;bid</p>
              <p>1.5&nbsp;GM</p>
            </div>
            <div className={s.modal_body_highestInput}>
              <input type="text" value="2.5" disabled />
              <p
                className={
                  s.modal_body_highestInput_classifyBuy
                }
              >
                GM
              </p>
            </div>
            <p className={s.modal_body_highestInput_desc}>
              Your GM <strong>will be returned</strong> if there is a higher
              bidder.
            </p>
          </div>
          <div className={s.modal_body_available}>
            <p className={s.modal_body_availableTitle}>
              Available Balance
            </p>
            <div className={s.modal_body_availableButton}>
              <Button
                className={s.modal_body_availableButtonStyle}
              >
                5&nbsp;GM
              </Button>
              <Button
                className={s.modal_body_availableButtonStyle}
              >
                1.5&nbsp;TC
              </Button>
              <Button
                className={s.modal_body_availableButtonStyle}
              >
                1.5&nbsp;BTC
              </Button>
            </div>
          </div>
          <div className={s.modal_divide}></div>
          <div className={s.modal_body_fee}>
            <div className={s.modal_body_feeContent}>
              <p>TC network fee</p>
              <p>1.5&nbsp;BTC</p>
            </div>
            <div className={s.modal_body_feeContent}>
              <p>TC network fee</p>
              <p>1.5&nbsp;BTC</p>
            </div>
          </div>
          <div className={s.modal_divide}></div>
        </Modal.Body>
        <Modal.Footer className={s.modal_footer}>
          <Button
            onClick={handleClose}
            className={s.modal_footer_button}
          >
            Bid
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}

export default ModalBid;
