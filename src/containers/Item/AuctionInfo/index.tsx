import React, { useMemo, useState } from 'react';

import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { ITokenDetail } from '@/interfaces/api/marketplace';
import { shortenAddress } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import TabsComponent from './Tabs';
import AuctionInfoStyles from './style.module.scss';
import useAsyncEffect from 'use-async-effect';
import useGMBalanceOf from '@/hooks/contract-operations/gm/useGMBalanceOf';

type AuctionProps = {
  data: ITokenDetail;
};
const AuctionInfo: React.FC<AuctionProps> = ({ data }) => {
  const { account, provider } = useWeb3React();
  const [isOwnerEligible, setIsOwnerEligible] = useState<boolean | null>(null);
  const { call: getOwnerGmBalance } = useGMBalanceOf({
    walletAddress: data.owner,
  });

  const itemName = useMemo(() => `Soul #${data.tokenId}`, [data.tokenId]);

  useAsyncEffect(async () => {
    if (data.owner) {
      const gmBalanceVal = await getOwnerGmBalance();
      setIsOwnerEligible(gmBalanceVal > 1);
    }
  }, [data.owner, provider]);

  return (
    <>
      <div className={AuctionInfoStyles.container}>
        <p className={AuctionInfoStyles.content_title}>{itemName}</p>
        <div className={AuctionInfoStyles.content_warning}>
          {isOwnerEligible ? (
            <>
              <div className={AuctionInfoStyles.content_warning_iconUser}>
                <Jazzicon diameter={28} seed={jsNumberForAddress(data.owner)} />
              </div>
              <div className={AuctionInfoStyles.content_address}>
                {account === data.owner
                  ? 'You'
                  : `${shortenAddress(data.owner)}`}
              </div>
            </>
          ) : (
            <>
              <div className={AuctionInfoStyles.content_warning_iconUser}>
                <Jazzicon diameter={28} seed={jsNumberForAddress(data.owner)} />
                <div className={AuctionInfoStyles.content_warning_iconWarning}>
                  <IconSVG
                    maxWidth="20"
                    src={`${CDN_URL}/ic-warning.svg`}
                  ></IconSVG>
                </div>
              </div>
              <div className={AuctionInfoStyles.content_warning_showAddress}>
                {account === data.owner
                  ? 'You are'
                  : `${shortenAddress(data.owner)} is `}
                not eligible to own Soul
              </div>
            </>
          )}
        </div>
        {/* <div className={AuctionInfoStyles.content_divide}></div> */}
        {/* <div className={AuctionInfoStyles.content_auction}>
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
        </div> */}
        {/* <Button
          className={AuctionInfoStyles.content_auction_adoptButton}
          onClick={handleShow}
        >
          Adopt
        </Button> */}
        <TabsComponent />
      </div>
      {/* <Modal
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
                  maxWidth={'15.34'}
                  maxHeight={'15.34'}
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
                        maxWidth={'32'}
                        maxHeight={'32'}
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
      </Modal> */}
    </>
  );
};

export default AuctionInfo;
