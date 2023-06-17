import React from 'react';
import { GridDebug } from '@Animations/Grid/grid';
import Owner from './SectionOwner';
import Tech from './Tech';
import Flare from './Flare';
import { useSmoothScroll } from '@Hooks/useSmoothScroll';
import { FrameTop } from '@/containers/Landing/FrameTop';
import ProgressBar from './ProgressBar';
import s from './style.module.scss';
import { HEADER_HEIGHT } from '@/layouts';
import Header from '@/layouts/Header';
import { Loading } from './Loading';

export const LandingContainer: React.FC = () => {
  useSmoothScroll();

  return (
    <div className={s.landingPage}>
      <Header height={HEADER_HEIGHT} isAnimation={true} theme={'dark'} />
      <Loading />
      <FrameTop />
      <Owner />
      <Flare />
      <Tech />
      <ProgressBar />
      <GridDebug />
    </div>
  );
};
