import React, { useContext, useMemo } from 'react';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
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

type AuctionProps = {
  data: ITokenDetail;
};
const AuctionInfo: React.FC<AuctionProps> = ({ data }) => {
  const { account } = useWeb3React();
  const { auction } = useContext(AuctionContext);

  const auctionAction = useMemo(() => {
    if (!auction || !auction.available) return <></>;
    if (auction.auctionStatus === AuctionStatus.INPROGRESS) {
      return <CreateBidButton data={data} />;
    } else if (auction.auctionStatus === AuctionStatus.ENDED) {
      return <SettleAuctionButton data={data} />;
    } else {
      return <StartAuctionButton data={data} />;
    }
  }, [auction, data]);

  console.log('🚀 ~ data.owner:', data.owner);

  return (
    <div className={s.auctionInfo}>
      <p className={s.content_title}>
        {!!data.name ? data.name : `Soul #${data.tokenId}`}
      </p>
      <div className={s.content_warning}>
        <div className={s.content_warning_iconUser}>
          <Jazzicon diameter={28} seed={jsNumberForAddress(data.owner)} />
          {!!auction?.available && (
            <div className={s.content_warning_iconWarning}>
              <IconSVG
                maxWidth="20"
                src={`${CDN_URL}/ic-warning.svg`}
              ></IconSVG>
            </div>
          )}
        </div>
        {!!auction?.available ? (
          <div className={s.content_warning_showAddress}>
            {account === data.owner
              ? 'You are'
              : `${shortenAddress(data.owner)} is `}
            not eligible to own Soul
          </div>
        ) : (
          <div className={s.content_address}>
            {account === data.owner ? 'You' : `${shortenAddress(data.owner)}`}
          </div>
        )}
      </div>
      <div className={s.divider}></div>
      {auctionAction}
    </div>
  );
};

export default React.memo(AuctionInfo);
