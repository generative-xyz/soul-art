import { FeatureStatus } from '@/constants/feature';
import React from 'react';

const UnlockFeature = (status: { status: number }) => {
  switch (status) {
    case FeatureStatus['Locked']:
      break;

    default:
      break;
  }

  return <div>UnlockFeature</div>;
};

export default UnlockFeature;
