import React, { useContext, useMemo } from 'react';
import IconSVG from '@/components/IconSVG';
import { CDN_URL, SOUL_CONTRACT, TC_EXPLORER_URL } from '@/configs';
import { ITokenDetail } from '@/interfaces/api/marketplace';
import { shortenAddress } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import StartAuctionButton from './StartAuctionButton';
import CreateBidButton from './CreateBidButton';
import s from './style.module.scss';
import { AuctionContext } from '@/contexts/auction-context';
import { AuctionStatus } from '@/enums/soul';
import SettleAuctionButton from './SettleAuctionButton';
import Link from 'next/link';

type AuctionProps = {
  data: ITokenDetail;
};
const AuctionInfo: React.FC<AuctionProps> = ({ data }) => {
  const { account } = useWeb3React();
  const { auction } = useContext(AuctionContext);

  const auctionAction = useMemo(() => {
    if (!auction || !auction.available) return <></>;
    if (auction.auctionStatus === AuctionStatus.INPROGRESS) {
      return <CreateBidButton tokenId={data.tokenId} imageCapture={data.imageCapture || ''} />;
    } else if (auction.auctionStatus === AuctionStatus.ENDED) {
      return <SettleAuctionButton tokenId={data.tokenId} />;
    } else {
      return <StartAuctionButton data={data} />;
    }
  }, [auction, data]);

  const isAvailable = useMemo(() => {
    return (!!auction?.available && data.owner.toLowerCase() !== SOUL_CONTRACT.toLowerCase())
  }, [auction, data]);

  return (
    <div className={s.auctionInfo}>
      <p className={s.content_title}>
        {!!data.name ? data.name : `Soul #${data.tokenId}`}
      </p>
      <div className={s.content_warning}>
        {(auction?.auctionStatus === AuctionStatus.INPROGRESS || auction?.auctionStatus === AuctionStatus.ENDED) ? (
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
                <Link target='_blank' href={`${TC_EXPLORER_URL}/address/${data.owner}`}>
                  {account?.toLowerCase() === data.owner.toLowerCase()
                    ? 'You '
                    : `${shortenAddress(data.owner)} `}
                </Link>
                {account?.toLowerCase() === data.owner.toLowerCase()
                  ? 'are '
                  : `is `}
                not eligible to own this Soul
              </div>
            ) : (
              <Link target='_blank' href={`${TC_EXPLORER_URL}/address/${data.owner}`} className={s.content_address}>
                {account?.toLowerCase() === data.owner.toLowerCase() ? 'You' : `${shortenAddress(data.owner)}`}
              </Link>
            )}
          </>
        )}
      </div>
      {(auction && auction.available) && (<div className={s.divider}></div>)}
      {auctionAction}
    </div>
  );
};

export default React.memo(AuctionInfo);
