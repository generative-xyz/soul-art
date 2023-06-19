import { LandingContainer } from '@/containers/Landing';
import { AnimateProvider } from '@/contexts/animate-context';
import { NextPage } from 'next';
import React from 'react';

const LandingPage: NextPage = (): React.ReactElement => {
  return (
    <AnimateProvider>
      <LandingContainer />
    </AnimateProvider>
  );
};

export default LandingPage;
