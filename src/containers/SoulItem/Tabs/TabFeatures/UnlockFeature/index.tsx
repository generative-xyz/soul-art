import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import { CDN_URL, TC_URL } from '@/configs';
import { Feature, FeatureStatus } from '@/constants/feature';
import { GM_TOKEN_PAGE } from '@/constants/url';
import { AssetsContext } from '@/contexts/assets-context';
import useUnlockFeature from '@/hooks/contract-operations/soul/useUnlockFeature';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import logger from '@/services/logger';
import { getUserSelector } from '@/state/user/selector';
import { toStorageKey } from '@/utils';
import { formatEthPrice } from '@/utils/format';
import { showToastError } from '@/utils/toast';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import cs from 'classnames';
import { Transaction } from 'ethers';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import s from './UnlockFeature.module.scss';

interface Props {
  status: number;
  feat: string;
  isOwner?: boolean;
  unlockConditions: {
    balances: number[];
    holdTimes: number[];
  } | null;
  index: number;
  tokenBlocksExist: number;
}

const UnlockFeature = ({
  status,
  feat,
  isOwner = false,
  unlockConditions,
  index,
  tokenBlocksExist,
}: Props) => {
  const { account, provider } = useWeb3React();
  const router = useRouter();
  const { tokenId } = router.query as { tokenId: string };
  const user = useSelector(getUserSelector);
  const { gmBalance, gmDepositBalance } = useContext(AssetsContext);

  const [processing, setProcessing] = useState(false);
  const [inscribing, setInscribing] = useState(false);
  const [isEnoughGM, setIsEnoughGM] = useState(false);
  const [blocksLeftToUnlock, setBlocksLeftToUnlock] = useState(0);

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
  }, [user, provider, operationName, feat]);

  useEffect(() => {
    // check index in unlockConditions if totalGMBalance > balances[index] && currentBlock < holdTimes[index], set true
    if (!unlockConditions) return;

    const { balances, holdTimes } = unlockConditions;
    const totalGMBalance = new BigNumber(gmDepositBalance).plus(
      new BigNumber(gmBalance)
    );
    if (balances[index] && holdTimes[index]) {
      const enoughGmToUnlock =
        Number(formatEthPrice(totalGMBalance.toString())) > balances[index] &&
        tokenBlocksExist < holdTimes[index];
      setIsEnoughGM(enoughGmToUnlock);
      const blocksLeft = holdTimes[index] - tokenBlocksExist;
      if (blocksLeft > 0) {
        setBlocksLeftToUnlock(blocksLeft);
      }
    }
  }, [unlockConditions, gmBalance, gmDepositBalance, tokenBlocksExist, index]);

  switch (status) {
    case FeatureStatus['Locked']:
      return (
        <>
          {isOwner ? (
            <Button
              className={cs(s.unlock_btn, s.buy_btn, {
                [s.blocks_wait]: isEnoughGM,
              })}
            >
              {isEnoughGM ? (
                <OverlayTrigger
                  overlay={
                    <Tooltip
                      id={'warning-gm'}
                      className={cs(s.tooltip_body, s.auction_wallet_tooltip)}
                    >
                      <div className={s.auction_tooltip_content}>
                        <p>
                          Simply be with your Soul in {blocksLeftToUnlock} more
                          blocks to unlock this effect.
                        </p>
                      </div>
                    </Tooltip>
                  }
                  placement="bottom"
                >
                  <div className={s.blocks_wait_inner}>
                    {blocksLeftToUnlock} blocks to go
                    <IconSVG
                      src={`${CDN_URL}/ic_round-info.svg`}
                      maxWidth="16"
                      maxHeight="16"
                      color={'black'}
                      type="fill"
                    ></IconSVG>
                  </div>
                </OverlayTrigger>
              ) : (
                <a href={GM_TOKEN_PAGE} target="_blank">
                  Get more GM{' '}
                </a>
              )}
            </Button>
          ) : (
            <></>
          )}
        </>
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
              {processing || inscribing ? 'Processing...' : 'Reveal'}
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
