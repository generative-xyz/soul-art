import { Button, Tab, Tabs } from 'react-bootstrap';

import IconSVG from '@/components/IconSVG';
import React from 'react';
import TabsStyles from './style.module.scss';
import { formatLongAddress } from '@trustless-computer/dapp-core';

const auctionTabHeader = [
  {
    title: 'Live auction',
    type: 'live',
  },
  {
    title: 'Description',
    type: 'desc',
  },
  {
    title: 'Attributes',
    type: 'attr',
  },
  {
    title: 'Interactions',
    type: 'inter',
  },
];

const liveAuctionData = [
  {
    userImg: 'img-user.svg',
    userAddress: '012831236821763812638',
  },
  {
    userImg: 'img-user.svg',
    userAddress: '012831236821763812638',
  },
  {
    userImg: 'img-user.svg',
    userAddress: '012831236821763812638',
  },
  {
    userImg: 'img-user.svg',
    userAddress: '012831236821763812638',
  },
  {
    userImg: 'img-user.svg',
    userAddress: '012831236821763812638',
  },
  {
    userImg: 'img-user.svg',
    userAddress: '012831236821763812638',
  },
  {
    userImg: 'img-user.svg',
    userAddress: '012831236821763812638',
  },
  {
    userImg: 'img-user.svg',
    userAddress: '012831236821763812638',
  },
];

const descriptionData = [
  {
    desc: 'Perceptrons is an experimental attempt to deploy run-time AI on-chain. While many projects have attempted to store AI artworks (outputs from AI models) on-chain, Perceptrons attempts to store the actual AI models themselves (the neural networks that produce the outputs) on-chain. Not only are the models stored on-chain, but the feed-forward algorithm is also stored on-chain. Not merely a static piece of art—you can interact with Perceptrons by asking them to do image recognition tasks. Perceptrons permanently live on the Bitcoin network—ever evolving. They grow. They die. And finally, they’re reborn again in a different form. Perceptrons are also upgradeable, i.e., you can plug a newer, smarter model into a Perceptron, which will change both the artwork and the brain behind the artwork. We believe this could open up an entirely new market: buying and selling data for upgradable dynamic artworks.',
  },
];

const attributeData = [
  {
    type: 'activation function',
    typeName: 'ReLU',
    rare: '51',
  },
  {
    type: 'birth year',
    typeName: 'ReLU',
    rare: '5',
  },
  {
    type: 'color palette',
    typeName: 'ReLU',
    rare: '70',
  },
  {
    type: 'dataset',
    typeName: 'ReLU',
    rare: '59',
  },
  {
    type: 'deep learning framework',
    typeName: 'ReLU',
    rare: '11',
  },
  {
    type: 'hardware acceleration',
    typeName: 'ReLU',
    rare: '37',
  },
  {
    type: 'birth year',
    typeName: 'ReLU',
    rare: '11',
  },
];

const interactionData = [
  {
    keyText: 'i',
    keyDesc: 'Show/hide technical information.',
  },
  {
    keyText: 'u',
    keyDesc: 'Update the AI mode',
  },
  {
    keyText: 'b',
    keyDesc: 'Hide/show borders',
  },
  {
    keyText: 'k',
    keyDesc: 'Save the hi-res image of the Soul to your computer',
  },
  {
    keyText: 's',
    keyDesc: 'Save the screenshot of the Soul to your computer',
  },
];
const RenderTabLiveAuction = () => {
  return (
    <>
      {liveAuctionData.map((liveAucData, index) => (
        <div className={TabsStyles.content_auction_tabLive} key={index}>
          <div className={TabsStyles.content_auction_tabLiveLeft}>
            <div className={TabsStyles.content_auction_tabLiveLeftIcon}>
              <IconSVG
                src={`${CDN_URL}/${liveAucData.userImg}`}
                maxWidth={'58'}
                maxHeight={'58'}
              ></IconSVG>
            </div>
            <div className={TabsStyles.content_auction_tabLiveLeftAddress}>
              {formatLongAddress(`${liveAucData.userAddress}`)}
            </div>
          </div>
          <div className={TabsStyles.content_auction_tabLiveRight}>
            <p className={TabsStyles.content_auction_tabLiveRightPrice}>
              1.5 BTC
            </p>
            <p className={TabsStyles.content_auction_tabLiveRightTime}>
              Jan 18, 2022 at 6:25pm
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
const RenderTabDescription = () => {
  return (
    <div className={TabsStyles.content_auction_tabDesc}>
      <div className={TabsStyles.content_auction_tabDescHead}>
        <div>
          <IconSVG
            src={`${CDN_URL}/ic-sun.svg`}
            maxWidth={'40'}
            maxHeight={'40'}
            className={TabsStyles.content_auction_tabDescHeadIcon}
          ></IconSVG>
        </div>
        <p>Learn more about Soul</p>
        <Button className={TabsStyles.content_auction_tabDescHeadButton}>
          Explore
          <IconSVG
            src={`${CDN_URL}/bannerArrow.svg`}
            maxWidth={'10.67'}
            maxHeight={'8'}
          ></IconSVG>
        </Button>
      </div>
      {descriptionData.map((descData, index) => (
        <div key={index} className={TabsStyles.content_auction_tabDescText}>
          {descData.desc}
        </div>
      ))}
    </div>
  );
};
const RenderTabAttribute = () => {
  return (
    <>
      {attributeData.map((attrData, index) => (
        <div className={TabsStyles.content_auction_tabAttr} key={index}>
          <div>
            <p className={TabsStyles.content_auction_tabAttrType}>
              {attrData.type}
            </p>
            <p className={TabsStyles.content_auction_tabAttrTypeName}>
              {attrData.typeName}
            </p>
          </div>
          <div className={TabsStyles.content_auction_tabAttrRare}>
            {attrData.rare}&#37;
          </div>
        </div>
      ))}
    </>
  );
};
const RenderTabInteraction = () => {
  return (
    <>
      {interactionData.map((interData, index) => (
        <div className={TabsStyles.content_auction_tabInter} key={index}>
          <div className={TabsStyles.content_auction_tabInterKeyText}>
            {interData.keyText}
          </div>
          <div className={TabsStyles.content_auction_tabInterKeyDesc}>
            {interData.keyDesc}
          </div>
        </div>
      ))}
    </>
  );
};

const CDN_URL =
  'https://storage.googleapis.com/generative-static-prod/soul-art';
const TabsComponent = () => {
  return (
    <Tabs defaultActiveKey="0" className={TabsStyles.content_auction_tabs}>
      {auctionTabHeader.map((auctionHeader, index) => {
        return (
          <Tab
            eventKey={index}
            key={index}
            title={auctionHeader.title}
            className={TabsStyles.content_auction_tab}
          >
            <div className={TabsStyles.content_auction_tabBox}>
              {auctionHeader.type === 'live' && <RenderTabLiveAuction />}
              {auctionHeader.type === 'desc' && <RenderTabDescription />}
              {auctionHeader.type === 'attr' && <RenderTabAttribute />}
              {auctionHeader.type === 'inter' && <RenderTabInteraction />}
            </div>
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default TabsComponent;