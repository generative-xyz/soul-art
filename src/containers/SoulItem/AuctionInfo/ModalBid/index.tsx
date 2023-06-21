import { ITokenDetail } from "@/interfaces/api/marketplace";
import React from "react";
import BaseModal from '@/components/BaseModal'
import s from './styles.module.scss';
import SonarWaveCircle from "@/components/SonarWaveCircle";
import CountdownText from "@/components/CountdownText";

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
    <BaseModal
      show={show}
      handleClose={handleClose}
      title="Bid"
    >
      <p className={s.modal_header_content_desc}>
        Once your bid is placed, you will be the highest bidder in the auction.
      </p>
      <div className={s.modal_body_address}>
        <div className={s.modal_body_addressContent}>
          <img className={s.modal_body_addressContent_imageCapture} src={data.imageCapture} alt="art_img" />
          <p
            className={
              s.modal_body_addressContent_infoId
            }
          >
            {`Soul ${data.tokenId}`}
          </p>
        </div>
        <div className={s.modal_body_auctionCountdownWrapper}>
          <SonarWaveCircle />
          <CountdownText className={s.modal_body_auctionCountdownWrapper_countdownText} countDownTo="2023-06-23 22:00:00" />
        </div>
      </div>
      <div className={s.modal_body_highest}>
        <div className={s.modal_body_highest_wrapper}>
          <div className={s.modal_body_highestPrice}>
            <p className={s.modal_body_highestPrice_label}>Highest bid</p>
            <p className={s.modal_body_highestPrice_value}>1.5 GM</p>
          </div>
          <div className={s.modal_body_highestPrice}>
            <p className={s.modal_body_highestPrice_label}>Highest bid</p>
            <p className={s.modal_body_highestPrice_value}>1.5 GM</p>
          </div>
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
    </BaseModal>
  )
}

export default ModalBid;
