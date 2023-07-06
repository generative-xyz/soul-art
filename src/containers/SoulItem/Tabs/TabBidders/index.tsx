import Empty from '@/components/Empty';
import InfiniteLoading from '@/components/InfiniteLoading';
import { TC_EXPLORER_URL } from '@/configs';
import { AuctionContext } from '@/contexts/auction-context';
import { IAuctionBid } from '@/interfaces/api/auction';
import { getBidderList } from '@/services/auction';
import logger from '@/services/logger';
import { getUserSelector } from '@/state/user/selector';
import { formatEthPrice } from '@/utils/format';
import { formatDateTime } from '@/utils/time';
import { formatLongAddress } from '@trustless-computer/dapp-core';
import uniqBy from 'lodash/uniqBy';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { useSelector } from 'react-redux';
import s from './styles.module.scss';

const LIMIT_PAGE = 20;

const TabBidders: React.FC = (): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const { auction } = useContext(AuctionContext);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [bidders, setBidders] = useState<Array<IAuctionBid>>([]);

  const fetchBidders = async (p?: number) => {
    if (!auction) return;

    try {
      setLoading(true);
      const page = p || Math.floor(bidders.length / LIMIT_PAGE) + 1;
      const { items, total } = await getBidderList({
        page,
        limit: LIMIT_PAGE,
        dbAuctionID: auction.dbAuctionId,
      });

      if (page === 1) {
        setBidders(items || []);
      } else {
        setBidders(prev => uniqBy([...prev, ...items], 'sender'));
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
  };

  useEffect(() => {
    fetchBidders(1);
  }, [auction]);

  return (
    <div className={s.tabLive}>
      {bidders.length === 0 && (
        <div className={s.emptyWrapper}>
          <Empty infoText="Waiting for the first adopter" />
        </div>
      )}
      {bidders.length > 0 &&
        bidders.map((bidder, index) => (
          <Link
            href={`${TC_EXPLORER_URL}/address/${bidder.sender}`}
            target="_blank"
            className={s.tabLiveItem}
            key={index}
          >
            <div className={s.tabLiveLeft}>
              <Jazzicon
                diameter={40}
                seed={jsNumberForAddress(bidder.sender)}
              />
              <p className={s.tabLiveLeftAddress}>
                {formatLongAddress(`${bidder.sender}`)}
              </p>
              {bidder.sender.toLowerCase() ===
                user?.walletAddress?.toLowerCase() && (
                  <div className={s.currentUserTag}>You</div>
                )}
            </div>
            <div className={s.tabLiveRight}>
              <p className={s.tabLiveRightPrice}>
                {`${formatEthPrice(bidder.amount)} GM`}
              </p>
              <p className={s.tabLiveRightTime}>
                {formatDateTime({
                  dateTime: bidder.time,
                  formatPattern: 'MMM D, YYYY [at] h:mma',
                })}
              </p>
            </div>
          </Link>
        ))}
      {hasMore && (
        <InfiniteLoading
          fetchMoreData={fetchBidders}
          isLoading={loading}
          hasMoreData={hasMore}
        />
      )}
    </div>
  );
};

export default TabBidders;
