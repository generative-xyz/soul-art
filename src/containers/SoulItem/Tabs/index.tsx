import { AssetsContext } from '@/contexts/assets-context';
import { AuctionContext } from '@/contexts/auction-context';
import { AuctionStatus } from '@/enums/soul';
import { ITokenDetail } from '@/interfaces/api/marketplace';
import { useWeb3React } from '@web3-react/core';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import TabBidders from './TabBidders';
import TabDescription from './TabDescription';
import TabFeatures from './TabFeatures';
import TabHistories from './TabHistories';
import TabInteraction from './TabInteraction';
import s from './style.module.scss';
import Link from 'next/link';
import { CDN_URL, SOUL_CONTRACT, TC_EXPLORER_URL } from '@/configs';
import IconSVG from '@/components/IconSVG';

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
        title: 'Evolution',
        type: 'evolution',
      },
      {
        title: 'Interactions',
        type: 'inter',
      },

      {
        title: 'Events',
        type: 'events',
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
    setDefaultTab(
      isOwner && availableFeatures && availableFeatures.length > 0 ? '1' : '0'
    );
  }, [isOwner, availableFeatures]);

  return (
    <div className={s.wrapper}>
      <Tabs
        activeKey={defaultTab}
        className={s.tabs}
        onSelect={key => {
          if (!key) return;
          setDefaultTab(key);
        }}
      >
        {tabList.map((tab, index) => {
          return (
            <Tab
              mountOnEnter
              eventKey={index}
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
                {tab.type === 'evolution' && <TabFeatures owner={data.owner} />}
                {tab.type === 'events' && <TabHistories data={data} />}
              </div>
            </Tab>
          );
        })}
      </Tabs>
      <Link
        href={`${TC_EXPLORER_URL}/address/${SOUL_CONTRACT}`}
        className={s.explorer_link}
        target="_blank"
      >
        Contract
        <IconSVG
          src={`${CDN_URL}/ic-arrow-up-right.svg`}
          maxHeight="20"
          maxWidth="20"
        ></IconSVG>
      </Link>
    </div>
  );
};

export default React.memo(TabsComponent);
