import React, { HTMLAttributes, forwardRef, useContext, useState } from 'react';
import s from './styles.module.scss';
import { ROUTE_PATH } from '@/constants/route-path';
import { CDN_URL, TC_URL } from '@/configs';
import IconSVG from '@/components/IconSVG';
import { WalletContext } from '@/contexts/wallet-context';
import { DappsTabs } from '@/enums/tabs';
import { getIsAuthenticatedSelector, getUserSelector } from '@/state/user/selector';
import { formatEthPrice } from '@/utils/format';
import { formatBTCPrice, formatLongAddress } from '@trustless-computer/dapp-core';
import { useWeb3React } from '@web3-react/core';
import { Dropdown, Button } from 'react-bootstrap';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useSelector } from 'react-redux';
import cs from 'classnames';
import { AssetsContext } from '@/contexts/assets-context';
import { showToastError, showToastSuccess } from '@/utils/toast';
import copy from 'copy-to-clipboard';
import logger from '@/services/logger';
import { DISCORD_URL } from '@/constants/common';

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
  const { btcBalance, tcBalance } =
    useContext(AssetsContext);
  const user = useSelector(getUserSelector);
  const [isConnecting, setIsConnecting] = useState(false);

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
    <header className={cs(s.nbcHeader, theme ? s[theme] : '', 'dark')}>
      <div className="container">
        <div className={s.wrapper}>
          <div className={s.leftContent}>
            <a className={s.nbcLogo} href={ROUTE_PATH.NBC_HOME}>NBC</a>
            <ul className={s.leftMenu}>
              <li>
                <a className={s.menuItem} href={ROUTE_PATH.NBC_GAMEFI}>
                  Gamefi
                </a>
              </li>
              <li className={s.menuItem}>
                <a className={s.menuItem} href={ROUTE_PATH.NBC_DEFI}>
                  Defi
                </a>
              </li>
              <li className={s.menuItem}>
                <a className={s.menuItem} href={ROUTE_PATH.NBC_NFT}>
                  NFTs
                </a>
              </li>
              <li className={s.menuItem}>
                Gm & Souls
              </li>
              <li className={cs(s.menuItem, s.gradientText)}>
                <a className={s.menuItem} href={ROUTE_PATH.NBC_BUIDER}>
                  Builder
                </a>
              </li>
            </ul>
          </div>
          <div className={s.rightContent}>
            <ul className={s.rightMenu}>
              {/* <li >
                <a href={ROUTE_PATH.STORY} className={s.menuItem}>
                  Our story
                </a>
              </li> */}
              <li>
                <a href={DISCORD_URL}>
                  <IconSVG
                    src={`${CDN_URL}/ic-discord.svg`}
                    maxWidth="20"
                    type="fill"
                    color={theme === 'dark' ? 'white' : 'black'}
                  ></IconSVG>
                </a>
              </li>
              <li>
                <a href={DISCORD_URL}>
                  <IconSVG
                    src={`${CDN_URL}/ic_twitter.svg`}
                    maxWidth="20"
                    type="fill"
                    color={theme === 'dark' ? 'white' : 'black'}
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
                            <IconSVG src={`${CDN_URL}/wallet.svg`} maxWidth="16" />
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
          </div>
        </div>
      </div>
    </header>
  )
}

export default React.memo(NbcHeader);
