import { Feature, FeatureStatus, FeatureThumbnail } from '@/constants/feature';
import { AssetsContext } from '@/contexts/assets-context';
import { formatEthPrice } from '@/utils/format';
import BigNumber from 'bignumber.js';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import s from './FeatureInfo.module.scss';
import { getSoulHistories } from '@/services/soul';
import { useRouter } from 'next/router';
import logger from '@/services/logger';
import { ISoulHistoryItem } from '@/interfaces/api/soul';

type Props = {
  feat: string;
  status: number;
  tokenBlocksExist: number;
  levelUnlock?: {
    balance?: number;
    holdTime?: number;
  };
  isOwner?: boolean;
  index: number;
  owner?: string;
};

const FeatureInfo = ({
  feat,
  tokenBlocksExist,
  status,
  levelUnlock,
  isOwner = false,
  index,
  owner,
}: Props) => {
  const router = useRouter();
  const { tokenId } = router.query as { tokenId: string };

  const { gmBalance, gmDepositBalance } = useContext(AssetsContext);

  const [featureThumbnailUnlocked, setFeatureThumbnailUnlocked] = useState<
    ISoulHistoryItem[] | null
  >(null);

  const totalGMBalance = new BigNumber(gmDepositBalance).plus(
    new BigNumber(gmBalance)
  );

  const fetchOwnerHistory = useCallback(async () => {
    if (!owner) return;
    try {
      const res = await getSoulHistories({
        page: 1,
        limit: 11,
        tokenId: tokenId,
      });
      const histories = res.filter(item => {
        if (!item.featureName) return;
        return item.owner === owner;
      });
      if (histories && histories.length > 0) {
        setFeatureThumbnailUnlocked(histories);
      }
    } catch (err: unknown) {
      logger.debug('failed to fetch user history');
    }
  }, [owner]);

  const showBalance: number = useMemo(
    () =>
      (levelUnlock?.balance && status === FeatureStatus['Unlocked']) ||
      (levelUnlock?.balance &&
        Number(formatEthPrice(totalGMBalance.toString())) >
          levelUnlock?.balance)
        ? levelUnlock.balance
        : Number(formatEthPrice(totalGMBalance.toString())),
    [levelUnlock?.balance, status, totalGMBalance]
  );

  const showBlocks: number = useMemo(
    () =>
      (levelUnlock?.holdTime && status === FeatureStatus['Unlocked']) ||
      (levelUnlock?.holdTime &&
        tokenBlocksExist > Number(levelUnlock?.holdTime))
        ? Number(levelUnlock.holdTime)
        : tokenBlocksExist,
    [levelUnlock?.holdTime, status, tokenBlocksExist]
  );

  useEffect(() => {
    fetchOwnerHistory();
  }, []);

  if (!levelUnlock) return null;

  const foundImageCapture =
    featureThumbnailUnlocked &&
    featureThumbnailUnlocked.length > 0 &&
    featureThumbnailUnlocked.find(feature => feature.featureName === feat);

  return (
    <div className={s.wrapper}>
      <div className={s.feature_thumbnail_wrapper}>
        <img
          src={
            foundImageCapture
              ? featureThumbnailUnlocked.find(
                  feature => feature.featureName === feat
                )?.imageCapture
              : FeatureThumbnail[index]
          }
          alt={`Thumbnail of ${feat}`}
        />
      </div>
      <div className={s.feature_info}>
        <p>{Feature[feat as keyof typeof Feature]}</p>
        {isOwner ? (
          <div className={s.feature_progress}>
            <div>
              <span
                className={`${
                  status === FeatureStatus['Unlocked'] ? s.unlocked : ''
                }`}
              >
                {showBalance}/{levelUnlock?.balance} GM
              </span>
              <div className={s.progress_bar}>
                <div
                  className={s.inner_bar}
                  style={{
                    background: '#000000',
                    width: `${
                      (showBalance / Number(levelUnlock?.balance)) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <span
                className={`${
                  status === FeatureStatus['Unlocked'] ? s.unlocked : ''
                }`}
              >
                {showBlocks}/{levelUnlock?.holdTime} blocks
              </span>
              <div className={s.progress_bar}>
                <div
                  className={s.inner_bar}
                  style={{
                    background: '#000000',
                    width: `${
                      (showBlocks / Number(levelUnlock?.holdTime)) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className={s.feature_checkpoint}>
            <p>
              <span>Required balance: </span>
              {levelUnlock?.balance} GM
            </p>
            <p>
              <span>Life time: </span>
              {levelUnlock?.holdTime} blocks
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureInfo;
