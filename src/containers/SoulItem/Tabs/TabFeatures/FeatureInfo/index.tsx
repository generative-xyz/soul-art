import { Feature, FeatureStatus, FeatureThumbnail } from '@/constants/feature';
import { AssetsContext } from '@/contexts/assets-context';
import { formatEthPrice } from '@/utils/format';
import BigNumber from 'bignumber.js';
import { useContext, useMemo } from 'react';
import s from './FeatureInfo.module.scss';

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
};

const FeatureInfo = ({
  feat,
  tokenBlocksExist,
  status,
  levelUnlock,
  isOwner = false,
  index,
}: Props) => {
  const { gmBalance, gmDepositBalance } = useContext(AssetsContext);

  const totalGMBalance = new BigNumber(gmDepositBalance).plus(
    new BigNumber(gmBalance)
  );

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

  if (!levelUnlock) return null;

  return (
    <div className={s.wrapper}>
      <div className={s.feature_thumbnail_wrapper}>
        <img src={FeatureThumbnail[index]} alt={`Thumbnail of ${feat}`} />
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
              <span>Balance: </span>
              {levelUnlock?.balance} GM
            </p>
            <p>
              <span>Hold time: </span>
              {levelUnlock?.holdTime} blocks
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureInfo;
