import { Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';

import AuctionInfoStyles from './style.module.scss';
import { CDN_URL } from '@/configs';
import IconSVG from '@/components/IconSVG';
import TabsComponent from './Tabs';
import { formatLongAddress } from '@trustless-computer/dapp-core';

type AuctionImgProps = {
  img: string | undefined;
};
const AuctionInfo:React.FC<AuctionImgProps> = ({img}) => {

  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className={AuctionInfoStyles.container}>
        <p className={AuctionInfoStyles.content_title}>Solaris #123</p>
        <div className={AuctionInfoStyles.content_warning}>
          <div className={AuctionInfoStyles.content_warning_iconUser}>
           <IconSVG
              src={`${CDN_URL}/img-user.svg`}
              maxWidth={"50"}
              maxHeight={"50"}
            ></IconSVG>
            <div className={AuctionInfoStyles.content_warning_iconWarning}>
              <IconSVG src={`${CDN_URL}/ic-warning.svg`}></IconSVG>
            </div>
          </div>
          <div className={AuctionInfoStyles.content_warning_showAddress}>
            {formatLongAddress('012831236821763812638')} is not eligible to own
            Soul
          </div>
        </div>
        <div className={AuctionInfoStyles.content_divide}></div>
        <div className={AuctionInfoStyles.content_auction}>
          <div className={AuctionInfoStyles.content_auctionLeft}>
            <p className={AuctionInfoStyles.content_auctionLeft_title}>
              Highest bid
            </p>
            <p className={AuctionInfoStyles.content_auctionLeft_price}>
              1.5 GM
            </p>
          </div>
          <div className={AuctionInfoStyles.content_auctionRight}>
            <p className={AuctionInfoStyles.content_auctionRight_live}></p>
            <p className={AuctionInfoStyles.content_auctionRight_time}>
              2d&nbsp;:&nbsp;16h&nbsp;:&nbsp;12m
            </p>
          </div>
        </div>
        <Button
          className={AuctionInfoStyles.content_auction_adoptButton}
          onClick={handleShow}
        >
          Adopt
        </Button>
        <TabsComponent />
      </div>
      <Modal
        className={AuctionInfoStyles.modal}
        centered
        show={show}
        onHide={handleClose}
        // backdrop="static" //Click outside don't close modal
      >
        <div className={AuctionInfoStyles.modal_container}>
          <Modal.Header className={AuctionInfoStyles.modal_header}>
            <Modal.Title className={AuctionInfoStyles.modal_header_content}>
              <p className={AuctionInfoStyles.modal_header_content_title}>
                Adopt
              </p>
              <p className={AuctionInfoStyles.modal_header_content_desc}>
                Once your bid is placed, you will be the highest bidder in the
                auction
              </p>
              <div
                className={AuctionInfoStyles.modal_header_buttonClose}
                onClick={handleClose}
              >
                <IconSVG
                  src={`${CDN_URL}/ic-vector.svg`}
                  maxWidth={"15.34"}
                  maxHeight={"15.34"}
                ></IconSVG>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={AuctionInfoStyles.modal_body}>
            <div className={AuctionInfoStyles.modal_body_address}>
              <div className={AuctionInfoStyles.modal_body_addressContent}>
                <div
                  className={AuctionInfoStyles.modal_body_addressContent_img}
                >
                  <img src={img} alt="art_img" />
                </div>
                <div
                  className={AuctionInfoStyles.modal_body_addressContent_info}
                >
                  <p
                    className={
                      AuctionInfoStyles.modal_body_addressContent_infoId
                    }
                  >
                    Soul #123
                  </p>
                  <div
                    className={
                      AuctionInfoStyles.modal_body_addressContent_infoUserAddress
                    }
                  >
                    <div>
                      <IconSVG
                        src={`${CDN_URL}/img-user.svg`}
                        maxWidth={"32"}
                        maxHeight={"32"}
                      ></IconSVG>
                    </div>
                    <p>{formatLongAddress('012831236821763812638')}</p>
                  </div>
                </div>
              </div>
              <div className={AuctionInfoStyles.modal_body_addressContent}>
                <p
                  className={AuctionInfoStyles.modal_body_addressContent_live}
                ></p>
                <p className={AuctionInfoStyles.modal_body_addressContent_time}>
                  2d&nbsp;:&nbsp;16h&nbsp;:&nbsp;12m
                </p>
              </div>
            </div>
            <div className={AuctionInfoStyles.modal_body_highest}>
              <div className={AuctionInfoStyles.modal_body_highestPrice}>
                <p>Highest&nbsp;bid</p>
                <p>1.5&nbsp;GM</p>
              </div>
              <div className={AuctionInfoStyles.modal_body_highestInput}>
                <input type="text" value="2.5" disabled />
                <p
                  className={
                    AuctionInfoStyles.modal_body_highestInput_classifyBuy
                  }
                >
                  GM
                </p>
              </div>
              <p className={AuctionInfoStyles.modal_body_highestInput_desc}>
                Your GM <strong>will be returned</strong> if there is a higher
                bidder.
              </p>
            </div>
            <div className={AuctionInfoStyles.modal_body_available}>
              <p className={AuctionInfoStyles.modal_body_availableTitle}>
                Available Balance
              </p>
              <div className={AuctionInfoStyles.modal_body_availableButton}>
                <Button
                  className={AuctionInfoStyles.modal_body_availableButtonStyle}
                >
                  5&nbsp;GM
                </Button>
                <Button
                  className={AuctionInfoStyles.modal_body_availableButtonStyle}
                >
                  1.5&nbsp;TC
                </Button>
                <Button
                  className={AuctionInfoStyles.modal_body_availableButtonStyle}
                >
                  1.5&nbsp;BTC
                </Button>
              </div>
            </div>
            <div className={AuctionInfoStyles.modal_divide}></div>
            <div className={AuctionInfoStyles.modal_body_fee}>
              <div className={AuctionInfoStyles.modal_body_feeContent}>
                <p>TC network fee</p>
                <p>1.5&nbsp;BTC</p>
              </div>
              <div className={AuctionInfoStyles.modal_body_feeContent}>
                <p>TC network fee</p>
                <p>1.5&nbsp;BTC</p>
              </div>
            </div>
            <div className={AuctionInfoStyles.modal_divide}></div>
          </Modal.Body>
          <Modal.Footer className={AuctionInfoStyles.modal_footer}>
            <Button
              onClick={handleClose}
              className={AuctionInfoStyles.modal_footer_button}
            >
              Bid
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default AuctionInfo;