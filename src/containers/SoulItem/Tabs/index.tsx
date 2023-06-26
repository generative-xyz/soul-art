import { ITokenDetail } from '@/interfaces/api/marketplace';
import React, { useContext, useMemo } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import TabBidders from './TabBidders';
import TabDescription from './TabDescription';
import TabFeatures from './TabFeatures';
import TabInteraction from './TabInteraction';
import s from './style.module.scss';
import { AuctionContext } from '@/contexts/auction-context';
import { AuctionStatus } from '@/enums/soul';
// import TabHistory from './TabHistory';

const TabsComponent = ({
  data,
}: {
  data: ITokenDetail;
}): React.ReactElement => {
  const { auction } = useContext(AuctionContext);
  const tabList = useMemo((): Array<{ title: string; type: string }> => {
    const header = [
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
      {
        title: 'History',
        type: 'history',
      },
    ];
    if (auction && auction.auctionStatus === AuctionStatus.INPROGRESS || auction && auction.auctionStatus === AuctionStatus.ENDED) {
      header.unshift({
        title: 'Bidders',
        type: 'bidders',
      });
    }
    return header;
  }, [auction]);

  return (
    <Tabs defaultActiveKey="0" className={s.tabs}>
      {tabList.map((tab, index) => {
        return (
          <Tab
            eventKey={index}
            key={index}
            title={tab.title}
            className={`${s.content_auction_tab}`}
          >
            <div className={`${s.content_auction_tabBox} small-scrollbar`}>
              {tab.type === 'bidders' && <TabBidders />}
              {tab.type === 'desc' && <TabDescription />}
              {tab.type === 'inter' && <TabInteraction />}
              {tab.type === 'feat' && (
                <TabFeatures
                  owner={data.owner}
                  mintedBlock={data.blockNumber}
                />
              )}
            </div>
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default React.memo(TabsComponent);
