import React from 'react';
import { GridDebug } from '@Animations/Grid/grid';
import { AnimateProvider } from '@Context/Animate';
import { Hero } from './Hero';
import Owner from './Owner';
import Tech from './Tech';

export const LandingContainer: React.FC = () => {
  return (
    <>
      <AnimateProvider>
        <Hero />
        {<GridDebug />}
        <Owner />
        <Tech />
      </AnimateProvider>
    </>
  );
};
