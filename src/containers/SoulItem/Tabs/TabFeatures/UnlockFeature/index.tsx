import Button from '@/components/Button';
import { Feature, FeatureStatus } from '@/constants/feature';
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
import IconSVG from '@/components/IconSVG';
import { CDN_URL, TC_URL } from '@/configs';
import cs from 'classnames';

interface Props {
  status: number;
  feat: string;
  isOwner?: boolean;
}

const UnlockFeature = ({ status, feat, isOwner = false }: Props) => {
  const { account, provider } = useWeb3React();
  const router = useRouter();
  const { tokenId } = router.query as { tokenId: string };
  const user = useSelector(getUserSelector);

  const [processing, setProcessing] = useState(false);
  const [inscribing, setInscribing] = useState(false);

  const { run: unlockFeature } = useContractOperation({
    operation: useUnlockFeature,
    inscribable: true,
  });

  const { operationName } = useUnlockFeature();

  const onTxSuccessCallback = async (transaction: Transaction | null) => {
    if (!transaction || !account) return;
    const txHash = transaction.hash;
    if (!txHash) return;
    const storageKey = toStorageKey(operationName, `${feat}_${account}`);
    localStorage.setItem(storageKey, txHash);
  };

  const handleUnlockFeature = async () => {
    try {
      setProcessing(true);

      if (inscribing) {
        showToastError({
          message: `Please confirm the pending transaction in your wallet  to unlock the ${
            Feature[feat as keyof typeof Feature]
          } effect.`,
          url: TC_URL,
          linkText: 'Go to wallet',
        });
        return;
      }

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
    const key = toStorageKey(operationName, `${feat}_${user.walletAddress}`);
    const txHash = localStorage.getItem(key);
    if (!txHash || !key.includes(feat)) return;

    setInscribing(true);
    let intervalId: NodeJS.Timer | null = null;

    const fetchTransactionStatus = async () => {
      try {
        const receipt = await provider.getTransactionReceipt(txHash);

        if (receipt?.status === 1 || receipt?.status === 0) {
          logger.info('tx done', key);
          localStorage.removeItem(key);
          setInscribing(false);
          intervalId && clearInterval(intervalId);
        }
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
      return (
        <Button disabled={true} className={cs(s.locked, s.unlock_btn)}>
          <IconSVG
            src={`${CDN_URL}/ic-key.svg`}
            maxWidth={'16'}
            maxHeight={'16'}
          />
          Unlock
        </Button>
      );
    case FeatureStatus['Unlocked']:
      return (
        <div className={s.unlocked}>
          <IconSVG
            src={`${CDN_URL}/ic-check.svg`}
            maxWidth={'16'}
            maxHeight={'16'}
          />
          Unlocked
        </div>
      );
    case FeatureStatus['Available']:
      return (
        <div>
          {isOwner ? (
            <Button className={s.unlock_btn} onClick={handleUnlockFeature}>
              <IconSVG
                src={`${CDN_URL}/ic-key.svg`}
                maxWidth={'16'}
                maxHeight={'16'}
              />
              {processing || inscribing ? 'Processing...' : 'Unlock'}
            </Button>
          ) : (
            <Button disabled={true} className={cs(s.locked, s.unlock_btn)}>
              <IconSVG
                src={`${CDN_URL}/ic-key.svg`}
                maxWidth={'16'}
                maxHeight={'16'}
              />
              Locked
            </Button>
          )}
        </div>
      );

    default:
      return <></>;
  }
};

export default UnlockFeature;
