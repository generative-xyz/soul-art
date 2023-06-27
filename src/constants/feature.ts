import { CDN_URL } from '@/configs';

export enum Feature {
  'feature_suneffect' = 'Sun Effect',
  'feature_cloudlayer' = '+3 Cloud layers',
  'feature_foreground' = 'Foreground',
  'feature_decor' = 'Decor',
  'feature_specialobj' = 'Special Object',
  'feature_sunshape' = 'Sun shapes + 3 Cloud layers',
  'feature_rainbow' = 'Rainbow + 3 Cloud layers',
  'feature_thunder' = 'Thunder',
  'feature_rain' = 'Rain',
  'feature_sunaura' = 'Sun Aura',
  'feature_sunpillar' = 'Sun Pillar',
}

export enum FeatureStatus {
  'Locked', // 0
  'Unlocked', // 1
  'Available', // 2
}

export const FeatureThumbnail = [
  `${CDN_URL}/feature-thumbnail/1_sunEffect.png`,
  `${CDN_URL}/feature-thumbnail/2_cloudLayer.png`,
  `${CDN_URL}/feature-thumbnail/3_foreground.png`,
  `${CDN_URL}/feature-thumbnail/4_decoration.png`,
  `${CDN_URL}/feature-thumbnail/5_specialObj.png`,
  `${CDN_URL}/feature-thumbnail/6_sunShape.png`,
  `${CDN_URL}/feature-thumbnail/7_rainbow.png`,
  `${CDN_URL}/feature-thumbnail/8_thunder.png`,
  `${CDN_URL}/feature-thumbnail/9_rain.png`,
  `${CDN_URL}/feature-thumbnail/10_sunAura.png`,
  `${CDN_URL}/feature-thumbnail/11_sunPillar.png`,
];
