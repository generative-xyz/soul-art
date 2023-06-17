import React from 'react';
import { GridDebug } from '@Animations/Grid/grid';
import Tech from './Tech';
import Flare from './Flare';
import { useSmoothScroll } from '@Hooks/useSmoothScroll';
import { FrameTop } from '@/containers/Landing/FrameTop';
import s from './style.module.scss';
import { HEADER_HEIGHT } from '@/layouts';
import Header from '@/layouts/Header';
import ProgressBarCs from '@/containers/Landing/ProgressBarCs';
import { Loading } from '@/containers/Landing/Loading';
import SectionFlys from '@/containers/Landing/SectionFlys';

export const LandingContainer: React.FC = () => {
  useSmoothScroll();

  return (
    <div className={s.landingPage}>
      <Header height={HEADER_HEIGHT} isAnimation={true} theme={'dark'} />
      <Loading />
      <FrameTop />
      <Flare />
      <SectionFlys />
      <Tech />
      <ProgressBarCs />
      <GridDebug />
    </div>
  );
};
