import { AssetsContext } from '@/contexts/assets-context';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import React, { useContext } from 'react';
import { WalletBalance } from '../Header.styled';
import { Wrapper } from './MenuMobile.styled';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { ROUTE_PATH } from '@/constants/route-path';
import { CDN_URL } from '@/configs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { jsNumberForAddress } from 'react-jazzicon';
import { useWeb3React } from '@web3-react/core';
import { NAV_CONTENT } from '../const';
import menuMobileStyles from './MenuMobile.module.scss';
import Button from '@/components/Button';

interface IProp {
  isOpen: boolean;
  onCloseMenu: () => void;
}

const MenuMobile = ({ onCloseMenu, isOpen }: IProp) => {
  const { btcBalance, tcBalance, gmBalance } = useContext(AssetsContext);
  const { account } = useWeb3React();
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const router = useRouter();

  const handleConnectWallet = async () => {
    router.push(`${ROUTE_PATH.CONNECT_WALLET}`);
  };

  return (
    <Wrapper isOpen={isOpen} className={isOpen ? 'show' : ''}>
      <div className="inner">
        <button className="btnMenuMobile" onClick={onCloseMenu}>
          <img src={`${CDN_URL}/ic_close_menu.svg`} alt="ic_close_menu" />
        </button>
        {NAV_CONTENT.map(({ title, url }) => {
          return (
            <Link
              key={title}
              href={url}
              className={`${menuMobileStyles.nav_item}
                  ${router.pathname === url ? menuMobileStyles.active : ''}`}
            >
              {title}
            </Link>
          );
        })}
        {isAuthenticated ? (
          <div className="wallet mobile">
            <WalletBalance>
              <div className="balance">
                <p> {`${formatEthPrice(gmBalance)} GM`}</p>
                <span className="divider"></span>
                <p>{formatBTCPrice(btcBalance)} BTC</p>
                <span className="divider"></span>
                <p>{formatEthPrice(tcBalance)} TC</p>
              </div>
              <div className="avatar">
                {account ? (
                  <Jazzicon diameter={32} seed={jsNumberForAddress(account)} />
                ) : (
                  <img src={`${CDN_URL}/ic-avatar.svg`} alt="default avatar" />
                )}
              </div>
            </WalletBalance>
          </div>
        ) : (
          <Button
            onClick={handleConnectWallet}
            className={menuMobileStyles.connect_button}
          >
            <img
              alt="wallet_icon"
              className={menuMobileStyles.wallet_icon}
              src={`${CDN_URL}/heroicons_wallet-solid.svg`}
            />
            Connect wallet
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

MenuMobile.displayName = 'MenuMobile';
export default MenuMobile;
