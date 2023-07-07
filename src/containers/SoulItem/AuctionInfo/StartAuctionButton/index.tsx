import { ITokenDetail } from '@/interfaces/api/marketplace';
import React, { useContext, useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';
import Button from '@/components/Button';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useCreateAuction from '@/hooks/contract-operations/soul/useCreateAuction';
import logger from '@/services/logger';
import { showToastError } from '@/utils/toast';
import { Transaction } from 'ethers';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import { useWeb3React } from '@web3-react/core';
import { toStorageKey } from '@/utils';
import { AuctionContext } from '@/contexts/auction-context';
import { TC_URL } from '@/configs';
import { TransactionPendingMessage } from '@/constants/action-message';
import { AuctionStatus } from '@/enums/soul';

interface IProps {
  data: ITokenDetail;
}

const StartAuctionButton: React.FC<IProps> = ({
  data,
}: IProps): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const [processing, setProcessing] = useState(false);
  const [inscribing, setInscribing] = useState(false);
  const { operationName } = useCreateAuction();
  const { run: createAuction } = useContractOperation({
    operation: useCreateAuction,
    inscribable: true,
  });
  const { provider } = useWeb3React();
  const { fetchAuction, auction } = useContext(AuctionContext);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const onTxSuccessCallback = async (tx: Transaction | null): Promise<void> => {
    if (!tx || !user?.walletAddress) return;
    const key = toStorageKey(
      operationName,
      `${data.tokenId}_${user.walletAddress}`
    );
    const txHash = tx.hash;
    if (!txHash) return;
    localStorage.setItem(key, txHash);
  };

  const handleStartAuction = async () => {
    if (processing) return;

    if (inscribing) {
      showToastError({
        message: `Please confirm the pending transaction in your wallet to ${TransactionPendingMessage['CREATE_AUCTION']}`,
        url: TC_URL,
        linkText: 'Go to wallet',
      });
      return;
    }

    try {
      setProcessing(true);
      await createAuction({
        tokenId: Number(data.tokenId),
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

  const createIntervalCheckStatus = () => {
    if (!user?.walletAddress || !provider) return;

    const key = toStorageKey(
      operationName,
      `${data.tokenId}_${user.walletAddress}`
    );
    const txHash = localStorage.getItem(key);

    if (!txHash) return;

    setInscribing(true);

    const fetchTransactionStatus = async () => {
      try {
        const receipt = await provider.getTransactionReceipt(txHash);

        if (receipt?.status === 1 || receipt?.status === 0) {
          logger.info('tx done', key);
          fetchAuction();

          if (
            auction?.auctionStatus === AuctionStatus.INPROGRESS ||
            auction?.auctionStatus === AuctionStatus.ENDED
          ) {
            intervalRef.current && clearInterval(intervalRef.current);
            setInscribing(false);
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        logger.error('Error retrieving transaction receipt:', error);
      }
    };

    fetchTransactionStatus();

    intervalRef.current = setInterval(() => {
      fetchTransactionStatus();
    }, 60000);
  }

  useEffect(() => {
    createIntervalCheckStatus();

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [createIntervalCheckStatus]);

  return (
    <Button
      disabled={processing}
      className={s.startAuctionButton}
      onClick={handleStartAuction}
    >
      {processing || inscribing ? 'Processing...' : 'Apply to adopt'}
    </Button>
  );
};

export default React.memo(StartAuctionButton);
