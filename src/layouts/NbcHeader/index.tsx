import IconSVG from '@/components/IconSVG';
import { CDN_URL, TC_URL } from '@/configs';
import { DISCORD_URL, TWITTER_URL } from '@/constants/common';
import { ROUTE_PATH } from '@/constants/route-path';
import { AssetsContext } from '@/contexts/assets-context';
import { WalletContext } from '@/contexts/wallet-context';
import { DappsTabs } from '@/enums/tabs';
import logger from '@/services/logger';
import {
  getIsAuthenticatedSelector,
  getUserSelector,
} from '@/state/user/selector';
import { formatEthPrice } from '@/utils/format';
import { showToastError, showToastSuccess } from '@/utils/toast';
import {
  formatBTCPrice,
  formatLongAddress,
} from '@trustless-computer/dapp-core';
import { useWeb3React } from '@web3-react/core';
import cs from 'classnames';
import copy from 'copy-to-clipboard';
import React, { HTMLAttributes, forwardRef, useContext, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useSelector } from 'react-redux';
import SubHeader from '../SubHeader';
import MobileMenu from './MobileMenu';
import s from './styles.module.scss';

const WalletToggle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={e => {
        e.preventDefault();
        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}
    >
      {children}
    </div>
  )
);

WalletToggle.displayName = 'WalletToggle';

interface IProps {
  theme?: string;
}

const NbcHeader: React.FC<IProps> = ({ theme }: IProps): React.ReactElement => {
  const { account } = useWeb3React();
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { onDisconnect, onConnect, requestBtcAddress } =
    useContext(WalletContext);
  const { gmBalance, btcBalance, tcBalance } = useContext(AssetsContext);
  const user = useSelector(getUserSelector);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleOpenMobileMenu = () => {
    setShowMobileMenu(true);
  };

  const handleCloseMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await onConnect();
      await requestBtcAddress();
    } catch (err: unknown) {
      logger.error(err);
      onDisconnect();
      showToastError({
        message: 'Rejected request.',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const onClickCopy = (address: string) => {
    copy(address);
    showToastSuccess({
      message: 'Copied',
    });
  };

  const renderTokenBlock = (
    title: string,
    balance: string,
    token: string,
    address?: string
  ) => {
    let icon = '';
    switch (token) {
      case 'BTC':
        icon = `${CDN_URL}/ic-btc.svg`;

        break;

      default:
        icon = `${CDN_URL}/ic_tc.svg`;
        break;
    }

    return (
      <div className={s.menu_content}>
        <div className={s.menu_info}>
          <div className={s.menu_title}>{title}</div>
          <div className={s.menu_item}>
            <div className={s.menu_item_address}>
              <IconSVG src={icon} maxWidth="24" maxHeight="24" />
              <p>{formatLongAddress(address || '')}</p>
            </div>
            <div onClick={() => onClickCopy(address || '')}>
              <IconSVG
                src={`${CDN_URL}/ic-copy.svg`}
                color={'#fff'}
                maxWidth="16"
                className={s.copy_icon}
              />
            </div>
          </div>
        </div>
        <div className={s.menu_item_balance}>
          <p>
            {balance} {token}
          </p>
        </div>
      </div>
    );
  };

  return (
    <header
      className={cs(s.nbcHeader, theme ? s[theme] : '', 'dark')}
      id={'header'}
    >
      <div className="container">
        <div className={s.wrapper}>
          <div className={s.leftContent}>
            <a className={s.nbcLogo} href={ROUTE_PATH.NBC_HOME}>
              NBC
            </a>
            <ul className={s.leftMenu}>
              <li>
                <a className={s.menuItem} href={ROUTE_PATH.NBC_GAMEFI}>
                  GameFi
                </a>
              </li>
              <li>
                <a className={s.menuItem} href={ROUTE_PATH.NBC_DEFI}>
                  DeFi
                </a>
              </li>
              <li>
                <a className={s.menuItem} href={ROUTE_PATH.NBC_NFT}>
                  NFTs
                </a>
              </li>
              <li>
                <span className={`${s.menuItem} ${s.textBlack}`}>
                  GM & Souls
                </span>
              </li>
              <li>
                <a
                  className={cs(s.menuItem, s.gradientText)}
                  href={ROUTE_PATH.NBC_BUILDER}
                >
                  Builder
                </a>
              </li>
            </ul>
          </div>
          <div className={s.rightContent}>
            <ul className={s.rightMenu}>
              <li>
                <a href={ROUTE_PATH.NBC_STORY} className={s.menuItem}>
                  Our Story
                </a>
              </li>
              <li>
                <a href={DISCORD_URL} className={s.menuItem}>
                  <IconSVG
                    src={`${CDN_URL}/ic-discord.svg`}
                    type="fill"
                    color={theme === 'dark' ? 'white' : 'black'}
                    className={s.menuItem_icon}
                  ></IconSVG>
                </a>
              </li>
              <li>
                <a href={TWITTER_URL} className={s.menuItem}>
                  <IconSVG
                    src={`${CDN_URL}/ic_twitter.svg`}
                    type="fill"
                    color={theme === 'dark' ? 'white' : 'black'}
                    className={s.menuItem_icon}
                  ></IconSVG>
                </a>
              </li>
              <li>
                {isAuthenticated ? (
                  <div className={s.wallets}>
                    <Dropdown>
                      <Dropdown.Toggle
                        as={WalletToggle}
                        id="dropdown-custom-components"
                      >
                        <div className={s.profile_container}>
                          <div className={s.profile_avatar}>
                            {account ? (
                              <Jazzicon
                                diameter={32}
                                seed={jsNumberForAddress(account)}
                              />
                            ) : (
                              <img
                                src={`${CDN_URL}/icons/ic-avatar.svg`}
                                alt="default avatar"
                              />
                            )}
                          </div>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={s.menu_wrapper}>
                        <div className={s.menu_container}>
                          <div className={s.gm_balance}>
                            <p>GM balance</p>
                            <h5>{`${formatEthPrice(gmBalance)} GM`}</h5>
                          </div>
                          {renderTokenBlock(
                            'TC Address',
                            formatEthPrice(tcBalance),
                            `TC`,
                            user?.walletAddress
                          )}
                          {renderTokenBlock(
                            'BTC Address',
                            formatBTCPrice(btcBalance),
                            `BTC`,
                            user?.btcAddress
                          )}
                          <div
                            onClick={() =>
                              window.open(`${TC_URL}?tab=${DappsTabs.ARTIFACT}`)
                            }
                            className={s.menu_box}
                          >
                            <IconSVG
                              src={`${CDN_URL}/wallet.svg`}
                              maxWidth="16"
                            />
                            <p>Wallet</p>
                          </div>
                          <div className={s.menu_divider} />
                          <Button onClick={onDisconnect} className={s.menu_box}>
                            <IconSVG
                              src={`${CDN_URL}/disconnect.svg`}
                              maxWidth="16"
                            />
                            <p>Disconnect</p>
                          </Button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ) : (
                  <Button
                    disabled={isConnecting}
                    onClick={handleConnectWallet}
                    className={s.connectWalletBtn}
                  >
                    {isConnecting ? 'Connecting...' : 'Connect wallet'}
                  </Button>
                )}
              </li>
            </ul>
            <Button className={s.hamburgerBtn} onClick={handleOpenMobileMenu}>
              <IconSVG
                src={
                  theme === 'dark'
                    ? `${CDN_URL}/ic-menu-right-w.svg`
                    : `${CDN_URL}/ic-menu-right.svg`
                }
                maxWidth={'24'}
                maxHeight={'24'}
              />
            </Button>
            <MobileMenu
              theme={theme}
              show={showMobileMenu}
              handleClose={handleCloseMobileMenu}
            />
          </div>
        </div>
        <div className={s.divider}></div>
        <SubHeader theme={theme} />
      </div>
    </header>
  );
};

export default React.memo(NbcHeader);
