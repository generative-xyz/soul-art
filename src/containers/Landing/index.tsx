import { FrameTop } from '@/containers/Landing/FrameTop';
import { Loading } from '@/containers/Landing/Loading';
import ProgressBarCs from '@/containers/Landing/ProgressBarCs';
import SectionFlys from '@/containers/Landing/SectionFlys';
import NbcHeader from '@/layouts/NbcHeader';
import { useSmoothScroll } from '@Hooks/useSmoothScroll';
import React from 'react';
import FAQs from '../FAQs';
import Flare from './Flare';
import Tech from './Tech';
import s from './style.module.scss';

export const LandingContainer: React.FC = (): React.ReactElement => {
  useSmoothScroll();

  return (
    <div className={s.landingPage}>
      <NbcHeader theme={'dark'} />
      <Loading />
      <FrameTop />
      <Flare />
      <SectionFlys />
      <Tech />
      <FAQs />
      <ProgressBarCs />
    </div>
  );
};
