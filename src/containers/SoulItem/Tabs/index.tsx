import { Tab, Tabs } from 'react-bootstrap';
import s from './style.module.scss';
import TabDescription from './TabDescription';
import TabInteraction from './TabInteraction';
import React from 'react'
import TabBidders from './TabBidders';

const auctionTabHeader = [
  {
    title: 'Bidders',
    type: 'bidders',
  },
  {
    title: 'Description',
    type: 'desc',
  },
  {
    title: 'Interactions',
    type: 'inter',
  },
];

const TabsComponent: React.FC = (): React.ReactElement => {
  return (
    <Tabs defaultActiveKey="0" className={s.tabs}>
      {auctionTabHeader.map((auctionHeader, index) => {
        return (
          <Tab
            eventKey={index}
            key={index}
            title={auctionHeader.title}
            className={`${s.content_auction_tab}`}
          >
            <div
              className={`${s.content_auction_tabBox} small-scrollbar`}
            >
              {auctionHeader.type === 'bidders' && < TabBidders />}
              {auctionHeader.type === 'desc' && <TabDescription />}
              {auctionHeader.type === 'inter' && <TabInteraction />}
            </div>
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default React.memo(TabsComponent);
