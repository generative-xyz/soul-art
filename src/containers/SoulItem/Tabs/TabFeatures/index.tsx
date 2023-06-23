import React, { useState } from 'react';
import web3Instance from '@/connections/custom-web3-provider';
import useAsyncEffect from 'use-async-effect';
import s from './TabFeatures.module.scss';
import { Feature } from '@/constants/feature';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useCheckFeatureStatus from '@/hooks/contract-operations/soul/useCheckFeatureStatus';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  getIsAuthenticatedSelector,
  getUserSelector,
} from '@/state/user/selector';
import logger from '@/services/logger';

enum FeatureStatus {
  LOCKED = 'Locked',
  UNLOCKED = 'Unlocked',
  AVAILABLE = 'Available',
}

const TabFeatures = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const user = useSelector(getUserSelector);

  const { tokenId } = router.query as { tokenId: string };
  const { run: checkFeaturesStatus } = useContractOperation({
    operation: useCheckFeatureStatus,
    inscribeable: false,
  });

  const [settingFeatures, setSettingFeatures] = useState<string[] | null>(null);
  const [featuresStatus, setFeaturesStatus] = useState<boolean[] | null>(null);
  console.log('🚀 ~ TabFeatures ~ featuresStatus:', featuresStatus);

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
        featureList: settingFeatures,
      });
      setFeaturesStatus(res);
    } catch (err: unknown) {
      logger.debug('failed to get status');
    }
  }, [settingFeatures, isAuthenticated, user?.walletAddress]);

  // const status = FeatureStatus.LOCKED;

  return (
    <div className={s.wrapper}>
      {settingFeatures &&
        settingFeatures.length > 0 &&
        settingFeatures.map((feat, index) => (
          <div className={s.feature_list}>
            <p>{Feature[feat as keyof typeof Feature]}</p>
            <p>{featuresStatus ? `${featuresStatus[index]}` : 'LOCKED'}</p>
          </div>
        ))}
    </div>
  );
};

export default TabFeatures;
