import { shortenAddress } from '@/utils';
import s from './styles.module.scss';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import web3Instance from '@/connections/custom-web3-provider';
import { AssetsContext } from '@/contexts/assets-context';
import logger from '@/services/logger';
import dayjs from 'dayjs';
import { AuctionStatus } from '@/enums/soul';
import cs from 'classnames';
import SonarWaveCircle from '../SonarWaveCircle';
import CountdownText from '../CountdownText';
import { CDN_URL, SOUL_CONTRACT } from '@/configs';
import ImageWrapper from '../ImageWrapper';
import { ROUTE_PATH } from '@/constants/route-path';
import IconSVG from '../IconSVG';

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
  tokenId,
}: IProps): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const { avgBlockTime } = useContext(AssetsContext);
  const { availableFeatures } = useContext(AssetsContext);

  const [auctionEndTime, setAuctionEndTime] = useState<string | null>(null);

  const isOwner = useMemo(
    () => user?.walletAddress?.toLowerCase() === ownerAddr?.toLowerCase(),
    [user?.walletAddress, ownerAddr]
  );

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
          <span>Adoption in progress</span>
          <SonarWaveCircle className={s.card_sonarCircle} />
          <CountdownText countDownTo={auctionEndTime} />
        </div>
      )}
      {isOwner && availableFeatures && availableFeatures.length > 0 && (
        <div className={s.new_effect}>
          <IconSVG
            src={`${CDN_URL}/ic-sparkles.svg`}
            maxWidth="20"
            maxHeight="20"
          />
          <p>New Effect</p>
          <Link href={`${ROUTE_PATH.HOME}/${tokenId}`}>
            Unlock it now
            <IconSVG
              src={`${CDN_URL}/ic-arrow-orange.svg`}
              maxWidth={'14'}
              maxHeight={'14'}
            />
          </Link>
        </div>
      )}

      <Card.Link href={href} as={Link} className={s.card_link}>
        <div className={s.card_image__container}>
          <ImageWrapper src={image} className={s.card_image} />
        </div>
        <Card.Body className={s.card_body}>
          <div className={s.hoverInfo}>
            <p>{title}</p>
            <div className={s.owner}>
              {!!ownerAddr && (
                <div className={s.owner}>
                  <div className={s.avatarWrapper}>
                    {ownerAddr.toLowerCase() === SOUL_CONTRACT.toLowerCase() ? (
                      <img
                        src={`${CDN_URL}/ic-question-owner.svg`}
                        alt="owner"
                      />
                    ) : (
                      <Jazzicon
                        diameter={24}
                        seed={jsNumberForAddress(ownerAddr)}
                      />
                    )}
                  </div>
                  <div className={s.address}>
                    {user?.walletAddress?.toLowerCase() ===
                    ownerAddr.toLowerCase()
                      ? 'You'
                      : ownerAddr.toLowerCase() === SOUL_CONTRACT.toLowerCase()
                      ? 'Waiting for adoption…'
                      : shortenAddress(ownerAddr)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card.Link>
    </Card>
  );
};

export default React.memo(SoulCard);
