import React, { useState } from 'react';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { ITokenDetail } from '@/interfaces/api/marketplace';
import { shortenAddress } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import useAsyncEffect from 'use-async-effect';
import useGMBalanceOf from '@/hooks/contract-operations/gm/useGMBalanceOf';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import StartAuctionButton from './StartAuctionButton';
import CreateBidButton from './CreateBidButton';
import s from './style.module.scss';

type AuctionProps = {
  data: ITokenDetail;
};
const AuctionInfo: React.FC<AuctionProps> = ({ data }) => {
  const { account, provider } = useWeb3React();
  const [isOwnerEligible, setIsOwnerEligible] = useState<boolean | null>(null);
  const { run: getGmBalance } = useContractOperation({
    operation: useGMBalanceOf,
    inscribeable: false,
  });

  useAsyncEffect(async () => {
    if (!data.owner || !provider) return
    const gmBalance = await getGmBalance({
      address: data.owner
    });
    setIsOwnerEligible(gmBalance.isGreaterThan(1e18));
  }, [data.owner, provider, getGmBalance]);

  return (
    <div className={s.auctionInfo}>
      <p className={s.content_title}>{`Soul #${data.tokenId}`}</p>
      <div className={s.content_warning}>
        <div className={s.content_warning_iconUser}>
          <Jazzicon diameter={28} seed={jsNumberForAddress(data.owner)} />
          {!isOwnerEligible && (
            <div className={s.content_warning_iconWarning}>
              <IconSVG
                maxWidth="20"
                src={`${CDN_URL}/ic-warning.svg`}
              ></IconSVG>
            </div>
          )}
        </div>
        {!isOwnerEligible && (
          <div className={s.content_warning_showAddress}>
            {account === data.owner
              ? 'You are'
              : `${shortenAddress(data.owner)} is `}
            not eligible to own Soul
          </div>
        )}
      </div>
      <div className={s.divider}></div>
      <StartAuctionButton data={data} />
      <CreateBidButton data={data} />
    </div>
  );
};

export default React.memo(AuctionInfo); 
