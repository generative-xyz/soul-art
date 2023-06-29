import { ROUTE_PATH } from '@/constants/route-path';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Homepage from '@/containers/Home';
import React from 'react';

const LandingPage: NextPage = (): React.ReactElement => {
  const router = useRouter();

  if (
    router.pathname &&
    !router.pathname.startsWith(ROUTE_PATH.CONNECT_WALLET)
  ) {
    localStorage.setItem('route', router.pathname);
  }

  return <Homepage />;
};

export default LandingPage;
