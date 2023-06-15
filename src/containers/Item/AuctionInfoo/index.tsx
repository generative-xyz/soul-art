import AuctionInfoStyles from './style.module.scss';
import { Button } from 'react-bootstrap';
import IconSVG from '@/components/IconSVG';
import React from 'react';
import TabsComponent from './Tabs';
import { formatLongAddress } from '@trustless-computer/dapp-core';

const CDN_URL_IMG =
  'https://storage.googleapis.com/generative-static-prod/soul-art';

const AuctionInfo = () => {
  return (
    <div className={AuctionInfoStyles.container}>
      <p className={AuctionInfoStyles.content_title}>Solaris #123</p>
      <div className={AuctionInfoStyles.content_warning}>
        <div className={AuctionInfoStyles.content_warning_iconUser}>
          <IconSVG
            src={`${CDN_URL_IMG}/img-user.svg`}
            maxWidth="50"
            maxHeight="50"
          ></IconSVG>
          <div className={AuctionInfoStyles.content_warning_iconWarning}>
            <IconSVG src={`${CDN_URL_IMG}/ic-warning.svg`}></IconSVG>
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
          <p className={AuctionInfoStyles.content_auctionLeft_price}>1.5 PM</p>
        </div>
        <div className={AuctionInfoStyles.content_auctionRight}>
          <p className={AuctionInfoStyles.content_auctionRight_live}></p>
          <p className={AuctionInfoStyles.content_auctionRight_time}>
            2d&nbsp;:&nbsp;16h&nbsp;:&nbsp;12m
          </p>
        </div>
      </div>
      <Button className={AuctionInfoStyles.content_auction_adoptButton}>
        Adopt
      </Button>
      <TabsComponent />
    </div>
  );
};

export default AuctionInfo;
