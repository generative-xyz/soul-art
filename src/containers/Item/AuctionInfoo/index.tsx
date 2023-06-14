import { Button, Tab, Tabs } from 'react-bootstrap';

import AuctionInfoStyles from './style.module.scss';
import IconSVG from '@/components/IconSVG';
import React from 'react';
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
      <Tabs
        defaultActiveKey="1"
        className={AuctionInfoStyles.content_auction_tabs}
      >
        <Tab
          eventKey="1"
          title="Live auction"
          className={AuctionInfoStyles.content_auction_tabsDivide}
        >
          <div className={AuctionInfoStyles.content_auction_tabsContent}>
            <div className={AuctionInfoStyles.content_auction_tabsLeft}>
              <div className={AuctionInfoStyles.content_auction_tabsLeftIcon}>
                <IconSVG
                  src={`${CDN_URL_IMG}/img-user.svg`}
                  maxWidth="80"
                  maxHeight="80"
                ></IconSVG>
              </div>
              <div
                className={AuctionInfoStyles.content_auction_tabsLeftAddress}
              >
                {formatLongAddress('012831236821763812638')}
              </div>
            </div>
            <div className={AuctionInfoStyles.content_auction_tabsRight}>
              <p className={AuctionInfoStyles.content_auction_tabsRightPrice}>
                1.5 BTC
              </p>
              <p className={AuctionInfoStyles.content_auction_tabsRightTime}>
                Jan 18, 2022 at 6:25pm
              </p>
            </div>
          </div>
          <div className={AuctionInfoStyles.content_auction_tabsContent}>
            <div className={AuctionInfoStyles.content_auction_tabsLeft}>
              <div className={AuctionInfoStyles.content_auction_tabsLeftIcon}>
                <IconSVG
                  src={`${CDN_URL_IMG}/img-user.svg`}
                  maxWidth="80"
                  maxHeight="80"
                ></IconSVG>
              </div>
              <div
                className={AuctionInfoStyles.content_auction_tabsLeftAddress}
              >
                {formatLongAddress('012831236821763812638')}
              </div>
            </div>
            <div className={AuctionInfoStyles.content_auction_tabsRight}>
              <p className={AuctionInfoStyles.content_auction_tabsRightPrice}>
                1.5 BTC
              </p>
              <p className={AuctionInfoStyles.content_auction_tabsRightTime}>
                Jan 18, 2022 at 6:25pm
              </p>
            </div>
          </div>
          <div className={AuctionInfoStyles.content_auction_tabsContent}>
            <div className={AuctionInfoStyles.content_auction_tabsLeft}>
              <div className={AuctionInfoStyles.content_auction_tabsLeftIcon}>
                <IconSVG
                  src={`${CDN_URL_IMG}/img-user.svg`}
                  maxWidth="80"
                  maxHeight="80"
                ></IconSVG>
              </div>
              <div
                className={AuctionInfoStyles.content_auction_tabsLeftAddress}
              >
                {formatLongAddress('012831236821763812638')}
              </div>
            </div>
            <div className={AuctionInfoStyles.content_auction_tabsRight}>
              <p className={AuctionInfoStyles.content_auction_tabsRightPrice}>
                1.5 BTC
              </p>
              <p className={AuctionInfoStyles.content_auction_tabsRightTime}>
                Jan 18, 2022 at 6:25pm
              </p>
            </div>
          </div>
          <div className={AuctionInfoStyles.content_auction_tabsContent}>
            <div className={AuctionInfoStyles.content_auction_tabsLeft}>
              <div className={AuctionInfoStyles.content_auction_tabsLeftIcon}>
                <IconSVG
                  src={`${CDN_URL_IMG}/img-user.svg`}
                  maxWidth="80"
                  maxHeight="80"
                ></IconSVG>
              </div>
              <div
                className={AuctionInfoStyles.content_auction_tabsLeftAddress}
              >
                {formatLongAddress('012831236821763812638')}
              </div>
            </div>
            <div className={AuctionInfoStyles.content_auction_tabsRight}>
              <p className={AuctionInfoStyles.content_auction_tabsRightPrice}>
                1.5 BTC
              </p>
              <p className={AuctionInfoStyles.content_auction_tabsRightTime}>
                Jan 18, 2022 at 6:25pm
              </p>
            </div>
          </div>
          <div className={AuctionInfoStyles.content_auction_tabsContent}>
            <div className={AuctionInfoStyles.content_auction_tabsLeft}>
              <div className={AuctionInfoStyles.content_auction_tabsLeftIcon}>
                <IconSVG
                  src={`${CDN_URL_IMG}/img-user.svg`}
                  maxWidth="80"
                  maxHeight="80"
                ></IconSVG>
              </div>
              <div
                className={AuctionInfoStyles.content_auction_tabsLeftAddress}
              >
                {formatLongAddress('012831236821763812638')}
              </div>
            </div>
            <div className={AuctionInfoStyles.content_auction_tabsRight}>
              <p className={AuctionInfoStyles.content_auction_tabsRightPrice}>
                1.5 BTC
              </p>
              <p className={AuctionInfoStyles.content_auction_tabsRightTime}>
                Jan 18, 2022 at 6:25pm
              </p>
            </div>
          </div>
          <div className={AuctionInfoStyles.content_auction_tabsContent}>
            <div className={AuctionInfoStyles.content_auction_tabsLeft}>
              <div className={AuctionInfoStyles.content_auction_tabsLeftIcon}>
                <IconSVG
                  src={`${CDN_URL_IMG}/img-user.svg`}
                  maxWidth="80"
                  maxHeight="80"
                ></IconSVG>
              </div>
              <div
                className={AuctionInfoStyles.content_auction_tabsLeftAddress}
              >
                {formatLongAddress('012831236821763812638')}
              </div>
            </div>
            <div className={AuctionInfoStyles.content_auction_tabsRight}>
              <p className={AuctionInfoStyles.content_auction_tabsRightPrice}>
                1.5 BTC
              </p>
              <p className={AuctionInfoStyles.content_auction_tabsRightTime}>
                Jan 18, 2022 at 6:25pm
              </p>
            </div>
          </div>
          <div className={AuctionInfoStyles.content_auction_tabsContent}>
            <div className={AuctionInfoStyles.content_auction_tabsLeft}>
              <div className={AuctionInfoStyles.content_auction_tabsLeftIcon}>
                <IconSVG
                  src={`${CDN_URL_IMG}/img-user.svg`}
                  maxWidth="80"
                  maxHeight="80"
                ></IconSVG>
              </div>
              <div
                className={AuctionInfoStyles.content_auction_tabsLeftAddress}
              >
                {formatLongAddress('012831236821763812638')}
              </div>
            </div>
            <div className={AuctionInfoStyles.content_auction_tabsRight}>
              <p className={AuctionInfoStyles.content_auction_tabsRightPrice}>
                1.5 BTC
              </p>
              <p className={AuctionInfoStyles.content_auction_tabsRightTime}>
                Jan 18, 2022 at 6:25pm
              </p>
            </div>
          </div>
        </Tab>
        <Tab eventKey="2" title="Description">
          Description
        </Tab>
        <Tab eventKey="3" title="Attributes">
          Attributes
        </Tab>
        <Tab eventKey="4" title="Interaction">
          Interaction
        </Tab>
      </Tabs>
    </div>
  );
};

export default AuctionInfo;
