import Button from '@/components/Button';
import { TC_EXPLORER_URL, TC_URL } from '@/configs';
import { AuctionContext } from '@/contexts/auction-context';
import useSettleAuction from '@/hooks/contract-operations/soul/useSettleAuction';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import logger from '@/services/logger';
import { getUserSelector } from '@/state/user/selector';
import { formatLongAddress, toStorageKey } from '@/utils';
import { showToastError } from '@/utils/toast';
import { useWeb3React } from '@web3-react/core';
import cs from 'classnames';
import { Transaction } from 'ethers';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import s from './styles.module.scss';
import { formatEthPrice } from '@/utils/format';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Link from 'next/link';
import { ROOT_ADDRESS } from '@/constants/common';
import { AuctionStatus } from '@/enums/soul';

interface IProps {
  tokenId: string;
  title?: string;
  className?: string;
}

const SettleAuctionButton: React.FC<IProps> = ({
  tokenId,
  title = 'Complete adoption.',
  className,
}: IProps): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const [processing, setProcessing] = useState(false);
  const [inscribing, setInscribing] = useState(false);
  const { operationName } = useSettleAuction();
  const { run: settleAuction } = useContractOperation({
    operation: useSettleAuction,
    inscribable: true,
  });
  const { provider } = useWeb3React();
  const { fetchAuction, auction } = useContext(AuctionContext);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const onTxSuccessCallback = async (tx: Transaction | null): Promise<void> => {
    if (!tx || !user?.walletAddress) return;
    const key = toStorageKey(operationName, `${tokenId}_${user.walletAddress}`);
    const txHash = tx.hash;
    if (!txHash) return;
    localStorage.setItem(key, txHash);
  };

  const handleSettleAuction = async () => {
    if (processing) return;

    if (inscribing) {
      showToastError({
        message: `Please confirm the pending transaction in your wallet to adopt the Soul #${tokenId} you have won.`,
        url: TC_URL,
        linkText: 'Go to wallet',
      });
      return;
    }

    try {
      setProcessing(true);
      await settleAuction({
        tokenId: Number(tokenId),
        txSuccessCallback: onTxSuccessCallback,
      });
      createIntervalCheckStatus();
    } catch (err: unknown) {
      logger.error(err);
      showToastError({
        message: (err as Error).message,
      });
    } finally {
      setProcessing(false);
    }
  };

  const createIntervalCheckStatus = (): void => {
    intervalRef.current && clearInterval(intervalRef.current);
    if (!user?.walletAddress || !provider) return;

    const key = toStorageKey(operationName, `${tokenId}_${user.walletAddress}`);
    const txHash = localStorage.getItem(key);

    if (!txHash) return;

    setInscribing(true);

    const fetchTransactionStatus = async () => {
      try {
        const receipt = await provider.getTransactionReceipt(txHash);

        if (receipt?.status === 1 || receipt?.status === 0) {
          logger.info('tx done', key);
          fetchAuction();

          if (auction?.auctionStatus !== AuctionStatus.ENDED) {
            intervalRef.current && clearInterval(intervalRef.current);
            localStorage.removeItem(key);
            setInscribing(false);
          }
        }
      } catch (error) {
        logger.error('Error retrieving transaction receipt:', error);
      }
    };

    fetchTransactionStatus();

    intervalRef.current = setInterval(() => {
      fetchTransactionStatus();
    }, 30000);
  };

  useEffect(() => {
    createIntervalCheckStatus();

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [createIntervalCheckStatus]);

  return (
    <div>
      {auction && (
        <div className={s.auctionInfo}>
          <div className={s.highestBidWrapper}>
            <p className={s.highestBidTitle}>Highest amount</p>
            <p className={s.highestBidPrice}>
              {`${formatEthPrice(auction.highestBid)} GM`}
            </p>
          </div>
          <div className={s.content_auctionRight}>
            <p className={s.highestBidTitle}>Adopter</p>
            <p className={s.winnerInfo}>
              {auction.highestBidder &&
              auction.highestBidder !== ROOT_ADDRESS ? (
                <>
                  <Jazzicon
                    diameter={24}
                    seed={jsNumberForAddress(auction.highestBidder)}
                  />
                  <Link
                    href={`${TC_EXPLORER_URL}/address/${auction.highestBidder}`}
                    className={s.highestBidPrice}
                  >
                    {formatLongAddress(`${auction.highestBidder}`)}
                  </Link>
                </>
              ) : (
                <p className={s.highestBidPrice}>-</p>
              )}
            </p>
          </div>
        </div>
      )}
      <Button
        disabled={processing}
        className={cs(s.startAuctionButton, className)}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          handleSettleAuction();
        }}
      >
        {processing || inscribing ? 'Processing...' : title}
      </Button>
    </div>
  );
};

export default React.memo(SettleAuctionButton);
