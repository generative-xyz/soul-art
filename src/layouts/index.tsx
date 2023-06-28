import React, { PropsWithChildren } from 'react';
import Header from './Header';
import s from './layout.module.scss';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@/constants/route-path';
import FeatureAlert from './FeatureAlert';
import Banner from './Banner';
import { CLAIM_START_TIME } from '@/configs';
import useTimeComparison from '@/hooks/useTimeComparison';
import cs from 'classnames';

export const HEADER_HEIGHT = 80;
export const FO0TER_HEIGHT = 80;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const claimingStartComparisonResult = useTimeComparison(CLAIM_START_TIME);
  const isEventStarted =
    claimingStartComparisonResult !== null && claimingStartComparisonResult > 0;

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
      <div className={s.container}>
        <Header height={HEADER_HEIGHT} />
        {isEventStarted && <Banner type='' />}
        <main
          className={cs(s.main, {
            [`${s.eventStarted}`]: isEventStarted
          })}>
          {children}
        </main>
        <FeatureAlert />
      </div>
    </>
  );
};

export default Layout;
