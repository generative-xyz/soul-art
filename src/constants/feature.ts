import { CDN_URL } from '@/configs';

export enum Feature {
  'feature_suneffect' = 'Sun Effect',
  'feature_cloudlayer' = '+3 Cloud layers',
  'feature_foreground' = 'Foreground',
  'feature_decor' = 'Decor',
  'feature_specialobj' = 'Special Object',
  'feature_sunshape' = 'Sun shapes + 7 Cloud layers',
  'feature_rainbow' = 'Rainbow + 20 Cloud layers',
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
  `${CDN_URL}/feature-thumbnail/1_sunEffect.jpg`,
  `${CDN_URL}/feature-thumbnail/2_cloudLayer.jpg`,
  `${CDN_URL}/feature-thumbnail/3_foreground.jpg`,
  `${CDN_URL}/feature-thumbnail/4_decoration.jpg`,
  `${CDN_URL}/feature-thumbnail/5_specialObj.jpg`,
  `${CDN_URL}/feature-thumbnail/6_sunShape.jpg`,
  `${CDN_URL}/feature-thumbnail/7_rainbow.jpg`,
  `${CDN_URL}/feature-thumbnail/8_thunder.jpg`,
  `${CDN_URL}/feature-thumbnail/9_rain.jpg`,
  `${CDN_URL}/feature-thumbnail/10_sunAura.jpg`,
  `${CDN_URL}/feature-thumbnail/11_sunPillar.jpg`,
];
