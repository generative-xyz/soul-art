import Button from '@/components/Button';
import { FeatureStatus } from '@/constants/feature';
import React, { useEffect, useState } from 'react';
import s from './UnlockFeature.module.scss';
import { Transaction } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useUnlockFeature from '@/hooks/contract-operations/soul/useUnlockFeature';
import { toStorageKey } from '@/utils';
import logger from '@/services/logger';
import { showToastError } from '@/utils/toast';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import { useRouter } from 'next/router';

const UnlockFeature = ({ status, feat }: { status: number; feat: string }) => {
  const { account, provider } = useWeb3React();
  const router = useRouter();
  const { tokenId } = router.query as { tokenId: string };
  const user = useSelector(getUserSelector);

  const [processing, setProcessing] = useState(false);
  const [inscribing, setInscribing] = useState(false);

  const { run: unlockFeature } = useContractOperation({
    operation: useUnlockFeature,
    inscribeable: true,
  });

  const { operationName } = useUnlockFeature();

  const onTxSuccessCallback = async (transaction: Transaction | null) => {
    if (!transaction || !account) return;
    const txHash = transaction.hash;
    if (!txHash) return;
    const storageKey = toStorageKey(operationName, account);
    localStorage.setItem(storageKey, txHash);
  };

  const handleUnlockFeature = async () => {
    try {
      setProcessing(true);
      await unlockFeature({
        tokenId: Number(tokenId),
        feature: feat,
        txSuccessCallback: onTxSuccessCallback,
      });
    } catch (err: unknown) {
      logger.error(err);
      logger.debug('failed to unlock feature');
      showToastError({
        message: (err as Error).message,
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (!user?.walletAddress || !provider) return;

    const key = toStorageKey(operationName, user.walletAddress);
    const txHash = localStorage.getItem(key);

    if (!txHash) return;

    setInscribing(true);
    let intervalId: NodeJS.Timer | null = null;

    const fetchTransactionStatus = async () => {
      try {
        const receipt = await provider.getTransactionReceipt(txHash);

        if (receipt && receipt.status !== 1) return;
        logger.info('tx done');
        localStorage.removeItem(key);
        setInscribing(false);
        intervalId && clearInterval(intervalId);
      } catch (error) {
        logger.error('Error retrieving transaction receipt:', error);
      }
    };

    fetchTransactionStatus();

    intervalId = setInterval(() => {
      fetchTransactionStatus();
    }, 60000);

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [user, provider, operationName]);

  switch (status) {
    case FeatureStatus['Locked']:
      return <div className={s.text_red}>Locked</div>;
    case FeatureStatus['Unlocked']:
      return <div className={s.text_green}>Unlocked</div>;
    case FeatureStatus['Available']:
      return (
        <div>
          <Button className={s.unlock_btn} onClick={handleUnlockFeature}>
            Unlock
          </Button>
        </div>
      );

    default:
      return <></>;
  }
};

export default UnlockFeature;
