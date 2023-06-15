import { CDN_URL, TC_URL } from '@/configs';
import { HTMLAttributes, forwardRef, useState } from 'react';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import {
  getIsAuthenticatedSelector,
  getUserSelector,
} from '@/state/user/selector';
import { showToastError, showToastSuccess } from '@/utils/toast';

import { AssetsContext } from '@/contexts/assets-context';
import Button from '@/components/Button';
import { DappsTabs } from '@/enums/tabs';
import Dropdown from 'react-bootstrap/Dropdown';
import IconSVG from '@/components/IconSVG';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import Link from 'next/link';
import MenuMobile from './MenuMobile';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { ROUTE_PATH } from '@/constants/route-path';
import Tooltip from 'react-bootstrap/Tooltip';
import { WalletContext } from '@/contexts/wallet-context';
import { Wrapper } from './Header.styled';
import copy from 'copy-to-clipboard';
import cs from 'classnames';
import { formatLongAddress } from '@trustless-computer/dapp-core';
import headerStyles from './header.module.scss';
import { jsNumberForAddress } from 'react-jazzicon';
import logger from '@/services/logger';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { AnimFade } from '@Animations/Fade';
import classNames from 'classnames';

type NavContent = {
  title: string;
  url: string;
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

const NAV_CONTENT: NavContent[] = [
  {
    title: 'Story',
    url: '/',
  },
  {
    title: 'Art',
    url: '/art',
  },
  {
    title: 'FAQs',
    url: '/faq',
  },
];

const CDN_URL_IMG =
  'https://storage.googleapis.com/generative-static-prod/soul-art';

const Header = ({
  height,
  isAnimation,
  theme,
}: {
  height: number;
  isAnimation?: boolean;
  theme?: string;
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { btcBalance, tcBalance } = useContext(AssetsContext);
  const user = useSelector(getUserSelector);

  const router = useRouter();

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

  const onClickCopy = (address: string) => {
    copy(address);
    showToastSuccess({
      message: 'Copied',
    });
  };

  const ContentHader = (): JSX.Element => {
    return (
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className={headerStyles['nav_container']}>
          {NAV_CONTENT.map(({ title, url }) => {
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
        </div>

        <Link className="logo" href={ROUTE_PATH.HOME}>
          <IconSVG
            src={`${CDN_URL_IMG}/logo.svg`}
            maxHeight={'32'}
            maxWidth={'32'}
            className={headerStyles.logo_svg}
          />
        </Link>
        <MenuMobile
          isOpen={isOpenMenu}
          onCloseMenu={() => setIsOpenMenu(false)}
        />
        <div className="rightContainer">
          {isAuthenticated ? (
            <Dropdown>
              <Dropdown.Toggle
                as={WalletToggle}
                id="dropdown-custom-components"
              >
                <div className={headerStyles.profile_container}>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={'warning-gm'} placement="bottom">
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
                      {formatEthPrice(tcBalance)} GM
                    </div>
                  </OverlayTrigger>

                  <div className={headerStyles.profile_amount}>
                    {formatEthPrice(tcBalance)} TC
                  </div>
                  <div className={headerStyles.profile_amount}>
                    {formatBTCPrice(btcBalance)} BTC
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

              <Dropdown.Menu className={headerStyles.menu_container}>
                <div>
                  <div className={headerStyles.menu_content}>
                    <div className={headerStyles.menu_title}>TC Address</div>
                    <div className={headerStyles.menu_item}>
                      <IconSVG
                        src={`${CDN_URL_IMG}/ic_tc.svg`}
                        maxWidth="28"
                        maxHeight="28"
                      />
                      <p>{formatLongAddress(user?.walletAddress || '')}</p>
                      <div
                        onClick={() => onClickCopy(user?.walletAddress || '')}
                      >
                        <IconSVG
                          src={`${CDN_URL_IMG}/ic-copy.svg`}
                          color="white"
                          maxWidth="16"
                          // type="stroke"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="divider" />
                  <div className={headerStyles.menu_content}>
                    <div className={headerStyles.menu_title}>BTC Address</div>
                    <div className={headerStyles.menu_item}>
                      <IconSVG
                        src={`${CDN_URL_IMG}/ic-btc.svg`}
                        maxWidth="28"
                        maxHeight="28"
                      />
                      <p>
                        {formatLongAddress(user?.walletAddressBtcTaproot || '')}
                      </p>
                      <div
                        onClick={() =>
                          onClickCopy(user?.walletAddressBtcTaproot || '')
                        }
                      >
                        <IconSVG
                          src={`${CDN_URL_IMG}/ic-copy.svg`}
                          color="white"
                          maxWidth="16"
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
                    <IconSVG src={`${CDN_URL_IMG}/profile.svg`} maxWidth="16" />
                    <p>Profile</p>
                  </div>
                  <div
                    onClick={() =>
                      window.open(`${TC_URL}?tab=${DappsTabs.ARTIFACT}`)
                    }
                    className={headerStyles.menu_box}
                  >
                    <IconSVG src={`${CDN_URL_IMG}/wallet.svg`} maxWidth="16" />
                    <p>Wallet</p>
                  </div>
                  <div className={headerStyles.menu_divider} />
                  <Button
                    onClick={onDisconnect}
                    className={headerStyles.menu_box}
                  >
                    <IconSVG
                      src={`${CDN_URL_IMG}/disconnect.svg`}
                      maxWidth="16"
                    />
                    <p>Disconnect</p>
                  </Button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              onClick={handleConnectWallet}
              className={headerStyles.connect_button}
            >
              <img
                alt="wallet_icon"
                className={headerStyles.wallet_icon}
                src={`${CDN_URL}/pages/artifacts/heroicons_wallet-solid.svg`}
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
        theme ? headerStyles[theme] : ''
      )}
      style={{ height }}
    >
      {isAnimation ? (
        <AnimFade>
          <ContentHader />
        </AnimFade>
      ) : (
        <ContentHader />
      )}
    </Wrapper>
  );
};

export default Header;
