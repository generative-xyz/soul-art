import { CDN_URL, TC_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import Link from 'next/link';
import { HTMLAttributes, forwardRef, useState } from 'react';
import { Wrapper } from './Header.styled';
import MenuMobile from './MenuMobile';
import { AssetsContext } from '@/contexts/assets-context';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector, getUserSelector } from '@/state/user/selector';
import { useRouter } from 'next/router';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { jsNumberForAddress } from 'react-jazzicon';
import { useWeb3React } from '@web3-react/core';
import headerStyles from './header.module.scss';
import cs from 'classnames';
import { WalletContext } from '@/contexts/wallet-context';
import { showToastError, showToastSuccess } from '@/utils/toast';
import logger from '@/services/logger';
import Button from '@/components/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Dropdown from 'react-bootstrap/Dropdown';
import IconSVG from '@/components/IconSVG';
import { formatLongAddress } from '@trustless-computer/dapp-core';
import copy from 'copy-to-clipboard';
import { DappsTabs } from '@/enums/tabs';

type NavContent = {
  title: string;
  url: string;
};

const WalletToggle = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      if (typeof onClick === 'function') {
        onClick(e);
      }
    }}
  >
    {children}
  </div>
));
WalletToggle.displayName = 'WalletToggle'

const NAV_CONTENT: NavContent[] = [
  {
    title: 'Story',
    url: '/souls',
  },
  {
    title: 'Art',
    url: '/',
  },
  {
    title: 'FAQs',
    url: '/',
  },
];

const Header = ({ height }: { height: number }) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { btcBalance, tcBalance } = useContext(AssetsContext);
  const user = useSelector(getUserSelector);

  const router = useRouter();

  const { account } = useWeb3React();
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { onDisconnect, onConnect, requestBtcAddress } = useContext(WalletContext);
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

  return (
    <Wrapper style={{ height }}>
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className={headerStyles['nav_container']}>
          {NAV_CONTENT.map(({ title, url }) => {
            return (
              <Link
                key={title}
                href={url}
                target="_blank"
                className={cs(
                  headerStyles.nav_item,
                  router.pathname === url && headerStyles.active,
                )}
              >
                {title}
              </Link>
            );
          })}
        </div>

        <Link className="logo" href={ROUTE_PATH.HOME}>
          <img alt="logo" src={`${CDN_URL}/pages/artifacts/logo-1.svg`} />
          <h1 className="logo-title">Smart Inscriptions</h1>
        </Link>
        <MenuMobile isOpen={isOpenMenu} onCloseMenu={() => setIsOpenMenu(false)} />
        <div className="rightContainer">
          {isAuthenticated ? (
            <Dropdown>
              <Dropdown.Toggle as={WalletToggle} id="dropdown-custom-components">
                <div className={headerStyles.profile_container}>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={'warning-gm'} placement="bottom">
                        <div className={headerStyles.tooltip_content}>
                          <p>You are not owning over 1GM</p>
                          <p>
                            Your art will be adopted by someone else at any time.
                          </p>
                        </div>
                      </Tooltip>
                    }
                    placement="bottom"
                  >
                    <div
                      className={cs(
                        headerStyles.profile_amount,
                        headerStyles.warning,
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
                      <Jazzicon diameter={32} seed={jsNumberForAddress(account)} />
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
                  <div>
                    <div>
                      <IconSVG
                        src={`${CDN_URL}/icons/logo-white.svg`}
                        maxWidth="24"
                        maxHeight="24"
                      />
                      <p>{formatLongAddress(user?.walletAddress || '')}</p>
                    </div>
                    <div onClick={() => onClickCopy(user?.walletAddress || '')}>
                      <IconSVG
                        src={`${CDN_URL}/icons/ic-copy-artifact.svg`}
                        color="white"
                        maxWidth="16"
                        // type="stroke"
                      ></IconSVG>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div>
                    <div>
                      <IconSVG
                        src={`${CDN_URL}/icons/ic-btc.svg`}
                        maxWidth="24"
                        maxHeight="24"
                      />
                      <p>{formatLongAddress(user?.walletAddressBtcTaproot || '')}</p>
                    </div>
                    <div
                      onClick={() =>
                        onClickCopy(user?.walletAddressBtcTaproot || '')
                      }
                    >
                      <IconSVG
                        src={`${CDN_URL}/icons/ic-copy-artifact.svg`}
                        color="white"
                        maxWidth="16"
                      ></IconSVG>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div>
                    <div
                      onClick={() =>
                        window.open(`${TC_URL}?tab=${DappsTabs.ARTIFACT}`)
                      }
                    >
                      <IconSVG
                        src={`${CDN_URL}/icons/ep_wallet-filled.svg`}
                        maxWidth="20"
                      />
                      <p>Wallet</p>
                    </div>
                    <Button onClick={onDisconnect}>
                      <IconSVG
                        src={`${CDN_URL}/icons/basil_logout-solid.svg`}
                        maxWidth="20"
                      />
                      <p>Disconnect</p>
                    </Button>
                  </div>
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
              ></img>
              {isConnecting ? 'Connecting...' : 'Connect wallet'}
            </Button>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
