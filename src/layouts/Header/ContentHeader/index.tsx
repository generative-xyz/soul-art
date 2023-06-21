import copy from 'copy-to-clipboard';
import contentHeader from './contentHeader.module.scss';
import { showToastError, showToastSuccess } from '@/utils/toast';
import Link from 'next/link';
import { useRouter } from 'next/router';
import IconSVG from '@/components/IconSVG';
import { ROUTE_PATH } from '@/constants/route-path';
import { useSelector } from 'react-redux';
import { HTMLAttributes, forwardRef, useContext, useState } from 'react';
import { AssetsContext } from '@/contexts/assets-context';
import { useWeb3React } from '@web3-react/core';
import {
  getIsAuthenticatedSelector,
  getUserSelector,
} from '@/state/user/selector';
import { WalletContext } from '@/contexts/wallet-context';
import { CDN_URL, TC_URL } from '@/configs';
import MenuMobile from '../MenuMobile';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import logger from '@/services/logger';
import cs from 'classnames';
import { formatLongAddress } from '@trustless-computer/dapp-core';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { DappsTabs } from '@/enums/tabs';
import Button from '@/components/Button';
import { NAV_CONTENT } from '../const';

const onClickCopy = (address: string) => {
  copy(address);
  showToastSuccess({
    message: 'Copied',
  });
};

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

const ContentHeader = (): JSX.Element => {
  const router = useRouter();
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { btcBalance, tcBalance, gmBalance } = useContext(AssetsContext);
  const user = useSelector(getUserSelector);

  const { account } = useWeb3React();
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { onDisconnect, onConnect, requestBtcAddress } =
    useContext(WalletContext);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await onConnect();
      await requestBtcAddress();
    } catch (err) {
      logger.error(err);
      onDisconnect();
      showToastError({
        message: (err as Error).message,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <>
      <div
        className={cs(
          'container d-flex justify-content-between align-items-center w-100',
          contentHeader.headerContent
        )}
      >
        <div className={contentHeader['nav_container']}>
          {NAV_CONTENT.map(({ title, url }) => {
            return (
              <Link
                key={title}
                href={url}
                className={`${contentHeader.nav_item}
                  ${router.pathname === url ? contentHeader.active : ''}`}
              >
                {title}
              </Link>
            );
          })}
        </div>

        <Link className="logo" href={ROUTE_PATH.HOME}>
          <IconSVG
            src={`${CDN_URL}/logo.svg`}
            maxHeight={'32'}
            maxWidth={'32'}
            className={contentHeader.logo_svg}
          />
        </Link>
        <div>
          {isAuthenticated ? (
            <Dropdown className={contentHeader.rightContent}>
              <Dropdown.Toggle
                as={WalletToggle}
                id="dropdown-custom-components"
              >
                <div className={contentHeader.profile_container}>
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id={'warning-gm'}
                        placement="left"
                        className={contentHeader.tooltip_body}
                      >
                        <div className={contentHeader.tooltip_content}>
                          <p>You are not owning over 1GM</p>
                          <p>
                            Your art will be adopted by someone else at any
                            time.
                          </p>
                        </div>
                      </Tooltip>
                    }
                    placement="bottom"
                  >
                    <div
                      className={cs(
                        contentHeader.profile_amount,
                        contentHeader.warning
                      )}
                    >
                      <IconSVG
                        src={`${CDN_URL}/ic-warning.svg`}
                        maxWidth={'20'}
                        maxHeight={'20'}
                      ></IconSVG>
                      {`${formatEthPrice(gmBalance)} GM`}
                    </div>
                  </OverlayTrigger>

                  <div className={contentHeader.profile_amount}>
                    {formatEthPrice(tcBalance)}&nbsp;TC
                  </div>
                  <div className={contentHeader.profile_amount}>
                    {formatBTCPrice(btcBalance)}&nbsp;BTC
                  </div>
                  <div className={contentHeader.profile_avatar}>
                    {account ? (
                      <Jazzicon
                        diameter={32}
                        seed={jsNumberForAddress(account)}
                      />
                    ) : (
                      <img
                        src={`${CDN_URL}/ic-avatar.svg`}
                        alt="default avatar"
                      />
                    )}
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className={contentHeader.menu_container}>
                <div>
                  <div className={contentHeader.menu_content}>
                    <div className={contentHeader.menu_title}>TC Address</div>
                    <div className={contentHeader.menu_item}>
                      <div className={contentHeader.menu_item_address}>
                        <IconSVG
                          src={`${CDN_URL}/ic_tc.svg`}
                          maxWidth="28"
                          maxHeight="28"
                        />
                        <p>{formatLongAddress(user?.walletAddress || '')}</p>
                      </div>
                      <div
                        onClick={() => onClickCopy(user?.walletAddress || '')}
                      >
                        <IconSVG
                          src={`${CDN_URL}/ic-copy.svg`}
                          color={'#fff'}
                          maxWidth="16"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="divider" />
                  <div className={contentHeader.menu_content}>
                    <div className={contentHeader.menu_title}>BTC Address</div>
                    <div className={contentHeader.menu_item}>
                      <div className={contentHeader.menu_item_address}>
                        <IconSVG
                          src={`${CDN_URL}/ic-btc.svg`}
                          maxWidth="28"
                          maxHeight="28"
                        />
                        <p>
                          {formatLongAddress(
                            user?.walletAddressBtcTaproot || ''
                          )}
                        </p>
                      </div>
                      <div
                        onClick={() =>
                          onClickCopy(user?.walletAddressBtcTaproot || '')
                        }
                      >
                        <IconSVG
                          src={`${CDN_URL}/ic-copy.svg`}
                          color="white"
                          maxWidth="16"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={contentHeader.menu_divider}></div>
                  <div
                    onClick={() =>
                      window.open(`${TC_URL}?tab=${DappsTabs.ARTIFACT}`)
                    }
                    className={contentHeader.menu_box}
                  >
                    <IconSVG src={`${CDN_URL}/profile.svg`} maxWidth="16" />
                    <p>Profile</p>
                  </div>
                  <div
                    onClick={() =>
                      window.open(`${TC_URL}?tab=${DappsTabs.ARTIFACT}`)
                    }
                    className={contentHeader.menu_box}
                  >
                    <IconSVG src={`${CDN_URL}/wallet.svg`} maxWidth="16" />
                    <p>Wallet</p>
                  </div>
                  <div className={contentHeader.menu_divider} />
                  <Button
                    onClick={onDisconnect}
                    className={contentHeader.menu_box}
                  >
                    <IconSVG src={`${CDN_URL}/disconnect.svg`} maxWidth="16" />
                    <p>Disconnect</p>
                  </Button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Button
                onClick={handleConnectWallet}
                className={contentHeader.connect_button}
              >
                <img
                  alt="wallet_icon"
                  className={contentHeader.wallet_icon}
                  src={`${CDN_URL}/heroicons_wallet-solid.svg`}
                />
                {isConnecting ? 'Connecting...' : 'Connect wallet'}
              </Button>
            </>
          )}
          <button
            className={cs(
              contentHeader.burgerBtn,
              router.pathname === '/'
                ? contentHeader.burgerBtn_white
                : undefined
            )}
            onClick={() => setIsOpenMenu(true)}
          >
            <IconSVG src={`${CDN_URL}/ic-hambuger.svg`} />
          </button>
        </div>
      </div>
      <MenuMobile
        isOpen={isOpenMenu}
        onCloseMenu={() => setIsOpenMenu(false)}
      />
    </>
  );
};

export default ContentHeader;
