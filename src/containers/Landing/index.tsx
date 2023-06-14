import React from 'react';
import { GridDebug } from '@Animations/Grid/grid';
import { Hero } from './Hero';
import Owner from './SectionOwner';
import Tech from './Tech';
import Flare from './Flare';
import { useSmoothScroll } from '@Hooks/useSmoothScroll';
import { FrameTop } from '@/containers/Landing/FrameTop';
import ProgressBar from './ProgressBar';
import s from './style.module.scss';

export const LandingContainer: React.FC = () => {
  useSmoothScroll();
  return (
    <div className={s.landingPage}>
      <GridDebug />
      <Hero />
      <FrameTop />
      <Owner />
      <Flare />
      <Tech />
        <ProgressBar />
    </div>
  );
};
