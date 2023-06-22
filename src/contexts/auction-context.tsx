import React, { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { IAuction } from "@/interfaces/api/auction";
import { getAuctionDetail } from '@/services/auction';
import logger from '@/services/logger';
import { useRouter } from 'next/router';
import web3Instance from '@/connections/custom-web3-provider';
import dayjs from 'dayjs';
import useAsyncEffect from 'use-async-effect';
import { AuctionStatus } from '@/enums/soul';

export interface IAuctionContext {
  auction: IAuction | null;
  fetchAuction: () => Promise<void>;
  auctionEndTime: string | null;
  biddable: boolean;
}

const initialValue: IAuctionContext = {
  auction: null,
  auctionEndTime: null,
  fetchAuction: () => new Promise<void>(r => r()),
  biddable: true,
};


export const AuctionContext = React.createContext<IAuctionContext>(initialValue);

export const AuctionProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const router = useRouter();
  const { tokenId } = router.query as { tokenId: string };
  const [auction, setAuction] = useState<IAuction | null>(null);
  const [biddable, setBiddable] = useState(true);
  const [auctionEndTime, setAuctionEndTime] = useState<string | null>(null);

  const getAuctionEndTime = useCallback(async () => {
    if (!auction) {
      setAuctionEndTime(null);
      return;
    };
    const endBlock = auction.endTime as unknown as number;
    const currentBlock = await web3Instance.getCurrentBlockNumber();
    const avgBlockTime = await web3Instance.calculateAverageBlockTime();
    logger.debug('avgBlockTime', avgBlockTime)
    const now = dayjs().unix();
    const endTimestamp = now + (endBlock - currentBlock) * avgBlockTime;
    if (endTimestamp <= 0) {
      setAuctionEndTime(null);
      setBiddable(false);
      return;
    }
    const endTime = dayjs.utc(endTimestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
    setAuctionEndTime(endTime);
  }, [auction]);

  const fetchAuction = useCallback(async (): Promise<void> => {
    try {
      if (!tokenId) return;
      const res = await getAuctionDetail({ tokenId });
      logger.log('auction response', res);
      setAuction(res);
    } catch (err: unknown) {
      logger.error('failed to load auction detail');
      logger.error(err);
    }
  }, [tokenId]);

  useEffect(() => {
    getAuctionEndTime();
  }, [getAuctionEndTime]);

  useEffect(() => {
    fetchAuction();
  }, [fetchAuction]);

  useAsyncEffect(() => {
    setBiddable(true);
    if (!auction || (auction.auctionStatus !== AuctionStatus.INPROGRESS)) {
      setBiddable(false);
      return;
    };

    let intervalId: NodeJS.Timer | null = null;

    const checkBiddableStatus = async (): Promise<void> => {
      const endBlock = Number(auction.endTime);
      const currentBlock = await web3Instance.getCurrentBlockNumber();
      if (endBlock <= currentBlock) {
        setBiddable(false);
        intervalId && clearInterval(intervalId);
      }
    }

    checkBiddableStatus();
    intervalId = setInterval(checkBiddableStatus, 15000);

    return () => {
      intervalId && clearInterval(intervalId);
    }
  }, [auction])

  const contextValues = useMemo((): IAuctionContext => {
    return {
      fetchAuction,
      auction,
      auctionEndTime,
      biddable,
    };
  }, [
    biddable,
    auction,
    fetchAuction,
    auctionEndTime,
  ]);

  return (
    <AuctionContext.Provider value={contextValues}>
      {children}
    </AuctionContext.Provider>
  );
}