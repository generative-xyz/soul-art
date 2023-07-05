import React, { useContext, useMemo } from 'react';
import IconSVG from '@/components/IconSVG';
import { CDN_URL, SOUL_CONTRACT, TC_EXPLORER_URL } from '@/configs';
import { ITokenDetail } from '@/interfaces/api/marketplace';
import { shortenAddress } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import s from './style.module.scss';
import { AuctionContext } from '@/contexts/auction-context';
import { AuctionStatus } from '@/enums/soul';
import Link from 'next/link';
import { AssetsContext } from '@/contexts/assets-context';
import BigNumber from 'bignumber.js';
import BuyGMButton from './BuyGMButton';
import StartAuctionButton from './StartAuctionButton';
import CreateBidButton from './CreateBidButton';
import SettleAuctionButton from './SettleAuctionButton';
import { ROUTE_PATH } from '@/constants/route-path';

type AuctionProps = {
  data: ITokenDetail;
};
const AuctionInfo: React.FC<AuctionProps> = ({ data }) => {
  const { account } = useWeb3React();
  const { auction } = useContext(AuctionContext);
  const { gmBalance } = useContext(AssetsContext);
  const isAvailable =
    !!auction?.available &&
    data.owner?.toLowerCase() !== SOUL_CONTRACT.toLowerCase();
  const isOwner = account?.toLowerCase() === data.owner?.toLowerCase();

  const auctionAction = useMemo(() => {
    if (!auction || !auction.available) return <></>;
    if (auction.auctionStatus === AuctionStatus.INPROGRESS) {
      return (
        <CreateBidButton
          tokenId={data.tokenId}
          imageCapture={data.imageCapture || ''}
        />
      );
    } else if (auction.auctionStatus === AuctionStatus.ENDED) {
      return <SettleAuctionButton tokenId={data.tokenId} />;
    } else {
      const gmBalanceBN = new BigNumber(gmBalance).dividedBy(1e18);
      if (gmBalanceBN.isLessThan(1) && isOwner) {
        return <BuyGMButton />;
      }
      return <StartAuctionButton data={data} />;
    }
  }, [auction, data, isOwner, gmBalance]);

  return (
    <div className={s.auctionInfo}>
      <p className={s.content_title}>
        {!!data.name ? (
          data.name
        ) : (
          <>
            <Link href={ROUTE_PATH.GALLERY}>Soul</Link> #{data.tokenId}
          </>
        )}
      </p>
      <div className={s.content_warning}>
        {auction?.auctionStatus === AuctionStatus.INPROGRESS ||
        auction?.auctionStatus === AuctionStatus.ENDED ? (
          <>
            <div className={s.content_warning_iconUser}>
              <img src={`${CDN_URL}/ic-question-owner.svg`} />
            </div>
            <div className={s.content_waitingOwner}>
              Awaiting a better match...
            </div>
          </>
        ) : (
          <>
            <div className={s.content_warning_iconUser}>
              <Jazzicon diameter={28} seed={jsNumberForAddress(data.owner)} />
              {isAvailable && (
                <div className={s.content_warning_iconWarning}>
                  <IconSVG
                    maxWidth="20"
                    src={`${CDN_URL}/ic-warning.svg`}
                  ></IconSVG>
                </div>
              )}
            </div>
            {isAvailable ? (
              <div className={s.content_warning_showAddress}>
                <Link
                  target="_blank"
                  href={`${TC_EXPLORER_URL}/address/${data.owner}`}
                >
                  {isOwner ? 'You ' : `${shortenAddress(data.owner)} `}
                </Link>
                {isOwner ? 'are ' : `is `}
                not eligible to own this Soul
              </div>
            ) : (
              <Link
                target="_blank"
                href={`${TC_EXPLORER_URL}/address/${data.owner}`}
                className={s.content_address}
              >
                {isOwner ? 'You' : `${shortenAddress(data.owner)}`}
              </Link>
            )}
          </>
        )}
      </div>
      {auction && auction.available && <div className={s.divider}></div>}
      {auctionAction}
    </div>
  );
};

export default React.memo(AuctionInfo);
