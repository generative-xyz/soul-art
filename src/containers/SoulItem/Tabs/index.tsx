import { ITokenDetail } from '@/interfaces/api/marketplace';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import TabBidders from './TabBidders';
import TabDescription from './TabDescription';
import TabFeatures from './TabFeatures';
import TabInteraction from './TabInteraction';
import s from './style.module.scss';

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
  {
    title: 'Features',
    type: 'feat',
  },
];

const TabsComponent = ({
  data,
}: {
  data: ITokenDetail;
}): React.ReactElement => {
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
            <div className={`${s.content_auction_tabBox} small-scrollbar`}>
              {auctionHeader.type === 'bidders' && <TabBidders />}
              {auctionHeader.type === 'desc' && <TabDescription />}
              {auctionHeader.type === 'inter' && <TabInteraction />}
              {auctionHeader.type === 'feat' && (
                <TabFeatures owner={data.owner} />
              )}
            </div>
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default React.memo(TabsComponent);
