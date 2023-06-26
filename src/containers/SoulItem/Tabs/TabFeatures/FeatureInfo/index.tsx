import React, { useContext } from 'react';
import s from './FeatureInfo.module.scss';
import { Feature, FeatureStatus } from '@/constants/feature';
import { AssetsContext } from '@/contexts/assets-context';
import { formatEthPrice } from '@/utils/format';

type Props = {
  feat: string;
  status: number;
  tokenBlocksExist: number;
  levelUnlock?: {
    balance?: number;
    holdTime?: number;
  };
  isOwner?: boolean;
};

const FeatureInfo = ({
  feat,
  tokenBlocksExist,
  status,
  levelUnlock,
  isOwner = false,
}: Props) => {
  const { gmBalance } = useContext(AssetsContext);

  if (!levelUnlock) return null;

  const showBalance: number =
    levelUnlock?.balance &&
    Number(formatEthPrice(gmBalance)) > levelUnlock?.balance
      ? levelUnlock.balance
      : Number(formatEthPrice(gmBalance));

  const showBlocks =
    levelUnlock?.holdTime && tokenBlocksExist > Number(levelUnlock?.holdTime)
      ? Number(levelUnlock?.holdTime)
      : tokenBlocksExist;

  return (
    <div className={s.wrapper}>
      <div className={s.feature_thumbnail_wrapper}>
        <img
          src="https://cdn.dev.generative.xyz/capture/dapp-1687761463373198532-1687761486.png"
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
