import IconSVG from '@/components/IconSVG';
import { CDN_URL, TC_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { AssetsContext } from '@/contexts/assets-context';
import { WalletContext } from '@/contexts/wallet-context';
import { DappsTabs } from '@/enums/tabs';
import logger from '@/services/logger';
import {
  getIsAuthenticatedSelector,
  getUserSelector,
} from '@/state/user/selector';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import { showToastError, showToastSuccess } from '@/utils/toast';
import { AnimFade } from '@Animations/Fade';
import { formatLongAddress } from '@trustless-computer/dapp-core';
import { useWeb3React } from '@web3-react/core';
import { default as classNames, default as cs } from 'classnames';
import copy from 'copy-to-clipboard';
import Link from 'next/link';
import { HTMLAttributes, forwardRef, useContext, useState } from 'react';
import { Button, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useSelector } from 'react-redux';
import { Wrapper } from './Header.styled';
import MenuMobile from './MenuMobile';
import headerStyles from './header.module.scss';
import { useRouter } from 'next/router';

// type NavContent = {
//   title: string;
//   url: string;
// };

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

// const NAV_CONTENT: NavContent[] = [
//   {
//     title: 'Story',
//     url: ROUTE_PATH.HOME,
//   },
//   {
//     title: 'Art',
//     url: ROUTE_PATH.ART,
//   },
//   // {
//   //   title: 'FAQs',
//   //   url: '/faq',
//   // },
// ];

const Header = ({
  height,
  isAnimation,
  theme,
}: {
  height: number;
  isAnimation?: boolean;
  theme?: string;
}) => {
  const router = useRouter();

  const homepage = router.pathname === ROUTE_PATH.HOME;

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { btcBalance, tcBalance, gmBalance } = useContext(AssetsContext);
  const user = useSelector(getUserSelector);
  const { account } = useWeb3React();
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { onDisconnect, onConnect, requestBtcAddress } =
    useContext(WalletContext);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const ContentHeader = (): JSX.Element => {
    return (
      <div
        className={`content-header d-flex justify-content-between align-items-center w-100 ${
          homepage ? 'dark' : ''
        }`}
      >
        <div className={headerStyles.nav_container}>
          {/* {NAV_CONTENT.map(({ title, url }) => {
            return (
              <Link
                key={title}
                href={url}
                className={`${headerStyles.nav_item}
                  ${router.pathname === url ? headerStyles.active : ''}`}
              >
                {title}
              </Link>
            );
          })}
          <div className={headerStyles.divider}></div> */}
          <Link
            href={'https://newbitcoincity.com/'}
            target="_blank"
            className={`${headerStyles.nav_item}`}
          >
            New Bitcoin City
            <IconSVG
              maxWidth="20"
              src={`${CDN_URL}/ic-arrow-up-right.svg`}
              color={homepage ? 'white' : 'black'}
              type="stroke"
            />
          </Link>
        </div>

        <Link className="logo" href={ROUTE_PATH.HOME}>
          <IconSVG
            src={`${CDN_URL}/ic-logo-white.svg`}
            maxHeight={'32'}
            maxWidth={'32'}
            className={headerStyles.logo_svg}
          />
        </Link>
        <MenuMobile
          isOpen={isOpenMenu}
          onCloseMenu={() => setIsOpenMenu(false)}
        />
        <div className={`rightContainer`}>
          {isAuthenticated ? (
            <Dropdown
              show={showDropdown}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Dropdown.Toggle
                as={WalletToggle}
                id="dropdown-custom-components"
              >
                <div className={headerStyles.profile_container}>
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id={'warning-gm'}
                        placement="bottom"
                        className={headerStyles.tooltip_body}
                      >
                        <div className={headerStyles.tooltip_content}>
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
                        headerStyles.profile_amount,
                        headerStyles.warning
                      )}
                    >
                      <IconSVG
                        src={`${CDN_URL}/ic-warning.svg`}
                        maxWidth={'20'}
                        maxHeight={'20'}
                      ></IconSVG>
                      {gmBalance}&nbsp;GM
                    </div>
                  </OverlayTrigger>

                  <div className={headerStyles.profile_amount}>
                    {formatEthPrice(tcBalance)}&nbsp;TC
                  </div>
                  <div className={headerStyles.profile_amount}>
                    {formatBTCPrice(btcBalance)}&nbsp;BTC
                  </div>
                  <div className={headerStyles.profile_avatar}>
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
              <Dropdown.Menu className={headerStyles.menu_wrapper}>
                <div className={headerStyles.menu_container}>
                  <div className={headerStyles.menu_content}>
                    <div className={headerStyles.menu_title}>TC Address</div>
                    <div className={headerStyles.menu_item}>
                      <div className={headerStyles.menu_item_address}>
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
                          className={headerStyles.copy_icon}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="divider" />
                  <div className={headerStyles.menu_content}>
                    <div className={headerStyles.menu_title}>BTC Address</div>
                    <div className={headerStyles.menu_item}>
                      <div className={headerStyles.menu_item_address}>
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
                          className={headerStyles.copy_icon}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={headerStyles.menu_divider}></div>
                  <div
                    onClick={() =>
                      window.open(`${TC_URL}?tab=${DappsTabs.ARTIFACT}`)
                    }
                    className={headerStyles.menu_box}
                  >
                    <IconSVG src={`${CDN_URL}/profile.svg`} maxWidth="16" />
                    <p>Profile</p>
                  </div>
                  <div
                    onClick={() =>
                      window.open(`${TC_URL}?tab=${DappsTabs.ARTIFACT}`)
                    }
                    className={headerStyles.menu_box}
                  >
                    <IconSVG src={`${CDN_URL}/wallet.svg`} maxWidth="16" />
                    <p>Wallet</p>
                  </div>
                  <div className={headerStyles.menu_divider} />
                  <Button
                    onClick={onDisconnect}
                    className={headerStyles.menu_box}
                  >
                    <IconSVG src={`${CDN_URL}/disconnect.svg`} maxWidth="16" />
                    <p>Disconnect</p>
                  </Button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              disabled={isConnecting}
              onClick={handleConnectWallet}
              className={headerStyles.connect_button}
            >
              <img
                alt="wallet_icon"
                className={headerStyles.wallet_icon}
                src={`${CDN_URL}/heroicons_wallet-solid.svg`}
              />
              {isConnecting ? 'Connecting...' : 'Connect wallet'}
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Wrapper
      className={classNames(
        headerStyles.header,
        theme ? headerStyles[theme] : '',
        'dark'
      )}
      style={{ height }}
    >
      <div className="container">
        {isAnimation ? (
          <AnimFade>
            <ContentHeader />
          </AnimFade>
        ) : (
          <ContentHeader />
        )}
      </div>
    </Wrapper>
  );
};

export default Header;
