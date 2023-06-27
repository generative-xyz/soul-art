import { GridDebug } from '@/animations/Grid/grid';
import React, { PropsWithChildren } from 'react';
import Header from './Header';
import layoutStyles from './layout.module.scss';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@/constants/route-path';
import FeatureAlert from './FeatureAlert';

export const HEADER_HEIGHT = 80;
export const FO0TER_HEIGHT = 80;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  if (
    router.pathname &&
    !router.pathname.startsWith(ROUTE_PATH.CONNECT_WALLET)
  ) {
    if (router.query.hasOwnProperty('tokenId')) {
      localStorage.setItem('route', `/souls/${router.query.tokenId}`);
    } else {
      localStorage.setItem('route', router.pathname);
    }
  }

  return (
    <>
      <div className={layoutStyles.container}>
        <Header height={HEADER_HEIGHT} />
        <div className={layoutStyles.content_wrapper}>{children}</div>
        <FeatureAlert />
        <GridDebug />
      </div>
    </>
  );
};

export default Layout;
