import { NextPage } from 'next';
import React from 'react';
import { GridDebug } from '@/animations/Grid/grid';
import ArtLandingPage from '@/containers/Art';

const LandingPage: NextPage = (): React.ReactElement => {
  return (
    <>
      <ArtLandingPage />
      <GridDebug />
    </>
  );
};

export default LandingPage;
