import React from 'react';
import { GridDebug } from '@Animations/Grid/grid';
import Tech from './Tech';
import Flare from './Flare';
import { useSmoothScroll } from '@Hooks/useSmoothScroll';
import { FrameTop } from '@/containers/Landing/FrameTop';
import ProgressBar from './ProgressBar';
import s from './style.module.scss';
import { HEADER_HEIGHT } from '@/layouts';
import Header from '@/layouts/Header';
import Sunback from '@/containers/Landing/Sunback';
import { useWeb3React } from '@web3-react/core';

export const LandingContainer: React.FC = () => {
  const { account } = useWeb3React();

  useSmoothScroll();

  React.useEffect(() => {
    localStorage.setItem('isWalletConnected', (!!account).toString());
  }, [account]);

  return (
    <div className={s.landingPage}>
      <Header height={HEADER_HEIGHT} isAnimation={true} theme={'dark'} />
      <FrameTop />
      <Flare />
      <Sunback />
      <Tech />
      <ProgressBar />
      <GridDebug />
    </div>
  );
};
