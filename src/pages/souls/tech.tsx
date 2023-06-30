import { NextPage } from 'next';
import React from 'react';
import TechLandingPage from '@/containers/Tech';
import { GridDebug } from '@/animations/Grid/grid';

const LandingPage: NextPage = (): React.ReactElement => {
  return (
    <>
      <TechLandingPage />
      <GridDebug />
    </>
  );
};

export default LandingPage;
