import React, { useContext, useEffect, useState } from 'react';
import s from './styles.module.scss';
import { formatLongAddress } from '@trustless-computer/dapp-core';
import { AuctionContext } from '@/contexts/auction-context';
import { getBidderList } from '@/services/auction';
import { IAuctionBidder } from '@/interfaces/api/auction';
import uniqBy from 'lodash/uniqBy';
import { formatEthPrice } from '@/utils/format';
import { formatDateTime } from '@/utils/time';
import InfiniteLoading from '@/components/InfiniteLoading';
import logger from '@/services/logger';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { jsNumberForAddress } from 'react-jazzicon';
import Link from 'next/link';
import { TC_EXPLORER_URL } from '@/configs';
import Empty from '@/components/Empty';

const LIMIT_PAGE = 20;

const TabBidders: React.FC = (): React.ReactElement => {
  const { auction } = useContext(AuctionContext);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [bidders, setBidders] = useState<Array<IAuctionBidder>>([]);

  const fetchBidders = async (p?: number) => {
    if (!auction) return;

    try {
      const page = p || Math.floor(bidders.length / LIMIT_PAGE) + 1;
      const { items, total } = await getBidderList({
        page,
        limit: LIMIT_PAGE,
        dbAuctionId: auction.dbAuctionId,
      });

      if (page === 1) {
        setBidders(items || []);
      } else {
        setBidders((prev) => uniqBy([...prev, ...items], 'sender'));
      }

      if (bidders.length < total) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (err: unknown) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBidders(1);
  }, [auction])

  return (
    <div className={s.tabLive}>
      {bidders.length === 0 && (
        <div className={s.emptyWrapper}>
          <Empty />
        </div>
      )}
      {bidders.length > 0 && bidders.map((bidder, index) => (
        <Link href={`${TC_EXPLORER_URL}/address/${bidder.sender}`} target='_blank' className={s.tabLiveItem} key={index}>
          <div className={s.tabLiveLeft}>
            {bidder.avatar ? (
              <img
                src={bidder.avatar}
                className={s.avatar}
                width={48}
                height={48}
              />
            ) : (
              <Jazzicon
                diameter={48}
                seed={jsNumberForAddress(bidder.sender)}
              />
            )}
            <p className={s.tabLiveLeftAddress}>
              {formatLongAddress(`${bidder.sender}`)}
            </p>
          </div>
          <div className={s.tabLiveRight}>
            <p className={s.tabLiveRightPrice}>
              {`${formatEthPrice(bidder.amount)} GM`}
            </p>
            <p className={s.tabLiveRightTime}>
              {formatDateTime({
                dateTime: bidder.time,
                formatPattern: 'MMM D, YYYY [at] h:mma'
              })}
            </p>
          </div>
        </Link>
      ))}
      {hasMore &&
        <InfiniteLoading
          fetchMoreData={fetchBidders}
          isLoading={loading}
          hasMoreData={hasMore}
        />
      }
    </div>
  );
};

export default TabBidders;