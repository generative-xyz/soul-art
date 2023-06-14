import React, { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';
import layoutStyles from './layout.module.scss';

export const HEADER_HEIGHT = 84;
export const FO0TER_HEIGHT = 80;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={layoutStyles.container}>
      <Header height={HEADER_HEIGHT} />
      <div className={layoutStyles.content_wrapper}>{children}</div>
      <Footer height={FO0TER_HEIGHT} />
    </div>
  );
};

export default Layout;
