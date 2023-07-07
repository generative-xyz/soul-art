import { AssetsContext } from '@/contexts/assets-context';
import { AuctionContext } from '@/contexts/auction-context';
import { AuctionStatus } from '@/enums/soul';
import { ITokenDetail } from '@/interfaces/api/marketplace';
import { useWeb3React } from '@web3-react/core';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import TabAttributes from './TabAttributes';
import TabBidders from './TabBidders';
import TabDescription from './TabDescription';
import TabFeatures from './TabFeatures';
import TabHistories from './TabHistories';
import TabInteraction from './TabInteraction';
import s from './style.module.scss';

const TabsComponent = ({
  data,
}: {
  data: ITokenDetail;
}): React.ReactElement => {
  const { account } = useWeb3React();
  const { auction } = useContext(AuctionContext);
  const { availableFeatures } = useContext(AssetsContext);

  const isOwner = useMemo(() => {
    return data.owner.toLowerCase() === account?.toLowerCase();
  }, [data.owner, account]);

  const [defaultTab, setDefaultTab] = useState<string>();

  const tabList = useMemo((): Array<{ title: string; type: string }> => {
    const header = [
      {
        title: 'Description',
        type: 'desc',
      },
      {
        title: 'Attributes',
        type: 'attr',
      },
      {
        title: 'Evolution',
        type: 'effect',
      },
      {
        title: 'Interactions',
        type: 'inter',
      },

      {
        title: 'Events',
        type: 'history',
      },
    ];
    if (
      (auction && auction.auctionStatus === AuctionStatus.INPROGRESS) ||
      (auction && auction.auctionStatus === AuctionStatus.ENDED)
    ) {
      header.unshift({
        title: 'Adopters',
        type: 'adopters',
      });
    }
    return header;
  }, [auction]);

  useEffect(() => {
    setDefaultTab('effect');
  }, [isOwner, availableFeatures]);

  return (
    <div className={s.wrapper}>
      <Tabs
        activeKey={defaultTab}
        className={`${s.tabs} small-scrollbar`}
        onSelect={key => {
          if (!key) return;
          setDefaultTab(key);
        }}
      >
        {tabList.map((tab, index) => {
          return (
            <Tab
              mountOnEnter
              eventKey={tab.type}
              key={index}
              title={
                tab.title !== 'Evolution' ? (
                  tab.title
                ) : (
                  <>
                    {tab.title}{' '}
                    {isOwner &&
                      availableFeatures &&
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
                {tab.type === 'adopters' && <TabBidders />}
                {tab.type === 'desc' && <TabDescription />}
                {tab.type === 'inter' && <TabInteraction />}
                {tab.type === 'effect' && <TabFeatures owner={data.owner} />}
                {tab.type === 'history' && <TabHistories data={data} />}
                {tab.type === 'attr' && (
                  <TabAttributes attributes={data.attributes} />
                )}
              </div>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default React.memo(TabsComponent);
