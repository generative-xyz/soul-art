import { ROUTE_PATH } from '@/constants/route-path';
import { LandingContainer } from '@/containers/Landing';
import { AnimateProvider } from '@/contexts/animate-context';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const LandingPage: NextPage = (): React.ReactElement => {
  const router = useRouter();

  if (
    router.pathname &&
    !router.pathname.startsWith(ROUTE_PATH.CONNECT_WALLET)
  ) {
    localStorage.setItem('route', router.pathname);
  }

  return (
    <AnimateProvider>
      <LandingContainer />
    </AnimateProvider>
  );
};

export default LandingPage;
