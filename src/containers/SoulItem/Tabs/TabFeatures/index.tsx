import web3Instance from '@/connections/custom-web3-provider';
import logger from '@/services/logger';
import { getUserSelector } from '@/state/user/selector';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useAsyncEffect from 'use-async-effect';
import FeatureInfo from './FeatureInfo';
import s from './TabFeatures.module.scss';
import UnlockFeature from './UnlockFeature';

const TabFeatures = ({
  owner,
  mintedBlock,
}: {
  owner: string;
  mintedBlock?: string | number;
}) => {
  const router = useRouter();
  const user = useSelector(getUserSelector);

  const [tokenBlocksExist, setTokenBlocksExist] = useState(0);

  const { tokenId } = router.query as { tokenId: string };

  const [settingFeatures, setSettingFeatures] = useState<string[] | null>(null);
  const [featuresStatus, setFeaturesStatus] = useState<number[] | null>(null);
  const [unlockConditions, setUnlockConditions] = useState<{
    balances: number[];
    holdTimes: number[];
  } | null>(null);

  const isOwner = useMemo(() => user?.walletAddress === owner, [user, owner]);

  // Get token block hold time
  useAsyncEffect(async () => {
    if (!mintedBlock) return;
    const currentBlock = await web3Instance.getCurrentBlockNumber();
    setTokenBlocksExist(currentBlock - Number(mintedBlock));
  }, [mintedBlock]);

  // Get current setting features
  useAsyncEffect(async () => {
    const res = await web3Instance.getSettingFeatures();
    if (res) {
      setSettingFeatures(res.features);
      setUnlockConditions({
        balances: res.balances,
        holdTimes: res.holdTimes,
      });
    }
  }, []);

  // Get available for unlock features
  useAsyncEffect(async () => {
    try {
      if (!settingFeatures) return;
      const res = await web3Instance.getFeaturesStatus({
        tokenId,
        owner,
        featureList: settingFeatures,
      });

      setFeaturesStatus(res);
    } catch (err: unknown) {
      logger.debug('failed to get status');
    }
  }, [settingFeatures, router.asPath, owner, tokenId]);

  return (
    <div className={`${s.wrapper} small-scrollbar`}>
      {!!featuresStatus &&
        settingFeatures &&
        settingFeatures.length > 0 &&
        settingFeatures.map((feat, index) => (
          <div
            className={s.feature_wrapper}
            key={`${feat}-${index}-${tokenId}`}
          >
            <div className={s.feature_list}>
              <FeatureInfo
                feat={feat}
                tokenBlocksExist={tokenBlocksExist}
                status={featuresStatus[index]}
                index={index}
                levelUnlock={{
                  balance: unlockConditions?.balances[index],
                  holdTime: unlockConditions?.holdTimes[index],
                }}
                isOwner={isOwner}
              />
              <UnlockFeature
                status={featuresStatus[index]}
                feat={feat}
                isOwner={isOwner}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default TabFeatures;
