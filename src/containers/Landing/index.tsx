import React from 'react';
import Tech from './Tech';
import Flare from './Flare';
import { useSmoothScroll } from '@Hooks/useSmoothScroll';
import { FrameTop } from '@/containers/Landing/FrameTop';
import s from './style.module.scss';
import { HEADER_HEIGHT } from '@/layouts';
import Header from '@/layouts/Header';
import { useWeb3React } from '@web3-react/core';
import ProgressBarCs from '@/containers/Landing/ProgressBarCs';
import { Loading } from '@/containers/Landing/Loading';
import SectionFlys from '@/containers/Landing/SectionFlys';

export const LandingContainer: React.FC = () => {
  const { account } = useWeb3React();

  useSmoothScroll();

  React.useEffect(() => {
    localStorage.setItem('isWalletConnected', (!!account).toString());
  }, [account]);

  return (
    <div className={s.landingPage}>
      <Header height={HEADER_HEIGHT} isAnimation={true} theme={'dark'} />
      <Loading />
      <FrameTop />
      <Flare />
      <SectionFlys />
      <Tech />
      <ProgressBarCs />
    </div>
  );
};
