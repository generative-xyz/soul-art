import React, { useCallback, useMemo, useState } from 'react';
import { IAuctionBid } from '@/interfaces/api/auction';
import { AuctionStatus } from '@/enums/soul';
import web3Instance from '@/connections/custom-web3-provider';
import dayjs from 'dayjs';
import s from './styles.module.scss';
import SonarWaveCircle from '@/components/SonarWaveCircle';
import CountdownText from '@/components/CountdownText';

interface IProps {
  bid: IAuctionBid;
}

const AuctionDate: React.FC<IProps> = ({ bid }: IProps): React.ReactElement => {
  const [auctionEndTime, setAuctionEndTime] = useState<string | null>(null);

  const getAuctionEndTime = useCallback(async () => {
    if (!bid || bid.auction.status !== AuctionStatus.INPROGRESS) {
      setAuctionEndTime(null);
      return;
    }
    const endBlock = bid.auction.endTimeBlock as unknown as number;
    const currentBlock = await web3Instance.getCurrentBlockNumber();
    const avgBlockTime = await web3Instance.calculateAverageBlockTime();
    const now = dayjs().unix();
    const endTimestamp = now + (endBlock - currentBlock) * avgBlockTime;
    if (endTimestamp <= 0) {
      setAuctionEndTime(null);
      return;
    }

    const endTime = dayjs
      .utc(endTimestamp * 1000)
      .format('YYYY-MM-DD HH:mm:ss');
    setAuctionEndTime(endTime);
  }, [bid]);

  useMemo(() => {
    getAuctionEndTime()
  }, [getAuctionEndTime]);

  return (
    <div className={s.countDownWrapper}>
      <SonarWaveCircle />
      <p className={s.countDownText}>
        {auctionEndTime && <CountdownText countDownTo={auctionEndTime} />}
        {!auctionEndTime && '--:--:--'}
      </p>
    </div>
  );
}

export default React.memo(AuctionDate);
