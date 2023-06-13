import React from 'react';
import { GridDebug } from '@Animations/Grid/grid';
import { AnimateProvider } from '@Context/Animate';
import { Hero } from './Hero';
import Introduce from './Introduce';
import Owner from './SectionOwner';
import Tech from './Tech';
import Flare from './Flare';
import Living from './Lingving';
import SubLiving from './SubLiving';
import Sunback from './Sunback';

export const LandingContainer: React.FC = () => {
  return (
    <>
      <AnimateProvider>
        {<GridDebug />}
        <Hero />
        <Introduce />
        <Living />
        <SubLiving />
        <Owner />
        <Flare />
        <Sunback />
        <Tech />
      </AnimateProvider>
    </>
  );
};
