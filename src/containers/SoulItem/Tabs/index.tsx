import { AssetsContext } from '@/contexts/assets-context';
import { AuctionContext } from '@/contexts/auction-context';
import { AuctionStatus } from '@/enums/soul';
import { ITokenDetail } from '@/interfaces/api/marketplace';
import React, { useContext, useMemo } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import TabBidders from './TabBidders';
import TabDescription from './TabDescription';
import TabFeatures from './TabFeatures';
import TabInteraction from './TabInteraction';
import TabHistories from './TabHistories';
import s from './style.module.scss';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';

const TabsComponent = ({
  data,
}: {
  data: ITokenDetail;
}): React.ReactElement => {
  const router = useRouter();
  const { account } = useWeb3React();
  const { query } = router;
  const { auction } = useContext(AuctionContext);
  const { availableFeatures } = useContext(AssetsContext);

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
    if (
      (auction && auction.auctionStatus === AuctionStatus.INPROGRESS) ||
      (auction && auction.auctionStatus === AuctionStatus.ENDED)
    ) {
      header.unshift({
        title: 'Bidders',
        type: 'bidders',
      });
    }
    return header;
  }, [auction]);

  return (
    <Tabs
      defaultActiveKey={query.tab === 'feat' ? '2' : '0'}
      className={s.tabs}
    >
      {tabList.map((tab, index) => {
        return (
          <Tab
            mountOnEnter
            eventKey={index}
            key={index}
            title={
              tab.title !== 'Features' ? (
                tab.title
              ) : (
                <>
                  {tab.title}{' '}
                  {availableFeatures &&
                    availableFeatures.length > 0 &&
                    account?.toLowerCase() === data.owner && (
                      <span className={s.alert_dots}></span>
                    )}
                </>
              )
            }
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
              {tab.type === 'history' && <TabHistories data={data} />}
            </div>
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default React.memo(TabsComponent);
