import { ROUTE_PATH } from '@/constants/route-path';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import FeatureAlert from './FeatureAlert';
import s from './layout.module.scss';
import { LightboxProvider } from '@/contexts/Lightbox/lighbox-context';
import cs from 'classnames';
import HistoryAlert from './HistoryAlert';
import NbcHeader from './NbcHeader';

export const HEADER_HEIGHT = 142;
export const FO0TER_HEIGHT = 80;

const Layout: React.FC<PropsWithChildren> = ({
  children,
}): React.ReactElement => {
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
    <div className={s.container}>
      <NbcHeader />

      <main className={cs(s.main)}>
        {children}
      </main>
      <FeatureAlert />
      <HistoryAlert />
    </div>
  );
};

const WrappedLayout: React.FC<PropsWithChildren> = ({
  children,
}): React.ReactElement => {
  return (
    <LightboxProvider>
      <Layout>{children}</Layout>
    </LightboxProvider>
  );
};

export default WrappedLayout;
