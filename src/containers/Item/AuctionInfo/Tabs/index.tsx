import { Tab, Tabs } from 'react-bootstrap';

import IconSVG from '@/components/IconSVG';
import React from 'react';
import TabsStyles from './style.module.scss';
import { formatLongAddress } from '@trustless-computer/dapp-core';
import { CDN_URL } from '@/configs';

// const auctionInfoData = [
//   [
//     {
//       uIcon: 'img-user.svg',
//       uAddress: '012831236821763812638',
//       uBTC: '1.5',
//     },
//     {
//       uIcon: 'img-user.svg',
//       uAddress: '012831236821763812638',
//       uBTC: '1.5',
//     },
//     {
//       uIcon: 'img-user.svg',
//       uAddress: '012831236821763812638',
//       uBTC: '1.5',
//     },
//     {
//       uIcon: 'img-user.svg',
//       uAddress: '012831236821763812638',
//       uBTC: '1.5',
//     },
//     {
//       uIcon: 'img-user.svg',
//       uAddress: '012831236821763812638',
//       uBTC: '1.5',
//     },
//     {
//       uIcon: 'img-user.svg',
//       uAddress: '012831236821763812638',
//       uBTC: '1.5',
//     },
//     {
//       uIcon: 'img-user.svg',
//       uAddress: '012831236821763812638',
//       uBTC: '1.5',
//     },
//   ],
//   [
//     {
//       description:
//         'Perceptrons is an experimental attempt to deploy run-time AI on-chain. While many projects have attempted to store AI artworks (outputs from AI models) on-chain, Perceptrons attempts to store the actual AI models themselves (the neural networks that produce the outputs) on-chain. Not only are the models stored on-chain, but the feed-forward algorithm is also stored on-chain. Not merely a static piece of art—you can interact with Perceptrons by asking them to do image recognition tasks. Perceptrons permanently live on the Bitcoin network—ever evolving. They grow. They die. And finally, they’re reborn again in a different form. Perceptrons are also upgradeable, i.e., you can plug a newer, smarter model into a Perceptron, which will change both the artwork and the brain behind the artwork. We believe this could open up an entirely new market: buying and selling data for upgradable dynamic artworks.',
//     },
//   ],
//   [],
//   [],
// ];

const auctionTabHeader = [
  {
    title: 'Live auction',
  },
  {
    title: 'Description',
  },
  {
    title: 'Attributes',
  },
  {
    title: 'Interactions',
  },
];

const TabsComponent = () => {
  return (
    <Tabs defaultActiveKey="1" className={TabsStyles.content_auction_tabs}>
      {auctionTabHeader.map((auctionHeader, index) => {
        return (
          <Tab
            eventKey={index}
            key={index}
            title={auctionHeader.title}
            className={TabsStyles.content_auction_tab}
          >
            <div className={TabsStyles.content_auction_tabBox}>
              <div className={TabsStyles.content_auction_tabContent}>
                <div className={TabsStyles.content_auction_tabLeft}>
                  <div className={TabsStyles.content_auction_tabLeftIcon}>
                    <IconSVG
                      src={`${CDN_URL}/img-user.svg`}
                      maxWidth="65"
                      maxHeight="65"
                    ></IconSVG>
                  </div>
                  <div className={TabsStyles.content_auction_tabLeftAddress}>
                    {formatLongAddress('012831236821763812638')}
                  </div>
                </div>
                <div className={TabsStyles.content_auction_tabRight}>
                  <p className={TabsStyles.content_auction_tabRightPrice}>
                    1.5 BTC
                  </p>
                  <p className={TabsStyles.content_auction_tabRightTime}>
                    Jan 18, 2022 at 6:25pm
                  </p>
                </div>
              </div>
            </div>
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default TabsComponent;
