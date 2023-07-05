import { shortenAddress } from '@/utils';
import s from './styles.module.scss';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import web3Instance from '@/connections/custom-web3-provider';
import { AssetsContext } from '@/contexts/assets-context';
import logger from '@/services/logger';
import dayjs from 'dayjs';
import { AuctionStatus } from '@/enums/soul';
import cs from 'classnames';
import SonarWaveCircle from '../SonarWaveCircle';
import CountdownText from '../CountdownText';

export interface IProps {
  href: string;
  image?: string;
  thumbnail?: string;
  tokenId?: string;
  className?: string;
  title?: string;
  ownerAddr?: string;
  auctionStatus?: number;
  endBlock?: string;
}

const SoulCard: React.FC<IProps> = ({
  href,
  image,
  className,
  ownerAddr,
  title,
  auctionStatus,
  endBlock,
}: IProps): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const { avgBlockTime } = useContext(AssetsContext);
  const [auctionEndTime, setAuctionEndTime] = useState<string | null>(null);

  const calculateEndTime = useCallback(async () => {
    if (auctionStatus !== AuctionStatus.INPROGRESS) return;
    const endBlockNum = endBlock as unknown as number;
    const currentBlock = await web3Instance.getCurrentBlockNumber();
    logger.debug('avgBlockTime', avgBlockTime);
    const now = dayjs().unix();
    const endTimestamp = now + (endBlockNum - currentBlock) * avgBlockTime;
    if (endTimestamp <= 0) {
      setAuctionEndTime(null);
      return;
    }
    const endTime = dayjs
      .utc(endTimestamp * 1000)
      .format('YYYY-MM-DD HH:mm:ss');
    setAuctionEndTime(endTime);
  }, [avgBlockTime, endBlock]);

  useEffect(() => {
    calculateEndTime();
  }, [calculateEndTime]);

  return (
    <Card className={cs(s.card, className)}>
      {auctionEndTime && (
        <div className={s.card_bidding}>
          <span>
            Bidding
          </span>
          <SonarWaveCircle className={s.card_sonarCircle} />
          <CountdownText countDownTo={auctionEndTime} />
        </div>
      )}
      <Card.Link href={href} as={Link} className={s.card_link}>
        <div className={s.card_image__container}>
          <Card.Img
            variant="top"
            src={image}
            className={s.card_image}
          />
        </div>
        <Card.Body className={s.card_body}>
          <div className={s.hoverInfo}>
            <p>{title}</p>
            <div className={s.owner}>
              {!!ownerAddr && (
                <>
                  <div className={s.avatarWrapper}>
                    <Jazzicon
                      diameter={24}
                      seed={jsNumberForAddress(ownerAddr)}
                    />
                  </div>
                  <div className={s.address}>
                    {user?.walletAddress?.toLowerCase() ===
                      ownerAddr.toLowerCase()
                      ? 'You'
                      : shortenAddress(ownerAddr)}
                  </div>
                </>
              )}
            </div>
          </div>
        </Card.Body>
      </Card.Link>
    </Card>
  );
};

export default React.memo(SoulCard);
