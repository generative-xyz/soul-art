import web3Instance from '@/connections/custom-web3-provider';
import { Feature } from '@/constants/feature';
import useCheckFeatureStatus from '@/hooks/contract-operations/soul/useCheckFeatureStatus';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import logger from '@/services/logger';
import {
  getIsAuthenticatedSelector,
  getUserSelector,
} from '@/state/user/selector';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useAsyncEffect from 'use-async-effect';
import s from './TabFeatures.module.scss';
import UnlockFeature from './UnlockFeature';

const TabFeatures = ({ owner }: { owner: string }) => {
  const router = useRouter();
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const user = useSelector(getUserSelector);

  const { tokenId } = router.query as { tokenId: string };
  const { run: checkFeaturesStatus } = useContractOperation({
    operation: useCheckFeatureStatus,
    inscribeable: false,
  });

  const [settingFeatures, setSettingFeatures] = useState<string[] | null>(null);
  console.log('🚀 ~ TabFeatures ~ settingFeatures:', settingFeatures);
  const [featuresStatus, setFeaturesStatus] = useState<number[] | null>(null);

  // Get current setting features
  useAsyncEffect(async () => {
    const features = await web3Instance.getSettingFeatures();
    if (features.length > 0) setSettingFeatures(features);
  }, []);

  // Get available for unlock features
  useAsyncEffect(async () => {
    try {
      if (!isAuthenticated || !user?.walletAddress || !settingFeatures) return;
      const res = await checkFeaturesStatus({
        tokenId,
        owner,
        featureList: settingFeatures,
      });
      setFeaturesStatus(res);
    } catch (err: unknown) {
      logger.debug('failed to get status');
    }
  }, [settingFeatures, isAuthenticated, user?.walletAddress]);

  return (
    <div className={s.wrapper}>
      {settingFeatures &&
        settingFeatures.length > 0 &&
        settingFeatures.map((feat, index) => (
          <div className={s.feature_list} key={`${feat}-${index}`}>
            <p>{Feature[feat as keyof typeof Feature]}</p>
            {!!featuresStatus && (
              <UnlockFeature status={featuresStatus[index]} feat={feat} />
            )}
          </div>
        ))}
    </div>
  );
};

export default TabFeatures;
