import React, { PropsWithChildren } from 'react';
import Header from './Header';
import layoutStyles from './layout.module.scss';
import { GridDebug } from '@/animations/Grid/grid';

export const HEADER_HEIGHT = 80;
export const FO0TER_HEIGHT = 80;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={layoutStyles.container}>
      <Header height={HEADER_HEIGHT} />
      <div className={layoutStyles.content_wrapper}>{children}</div>
      <GridDebug />
    </div>
  );
};

export default Layout;
