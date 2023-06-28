import IconSVG from '@/components/IconSVG';
import { CDN_URL, TC_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { AssetsContext } from '@/contexts/assets-context';
import { WalletContext } from '@/contexts/wallet-context';
import { DappsTabs } from '@/enums/tabs';
import ModalDeposit from '@/layouts/Header/Modal/ModalDeposit';
import logger from '@/services/logger';
import {
  getIsAuthenticatedSelector,
  getUserSelector,
} from '@/state/user/selector';
import { showToastError, showToastSuccess } from '@/utils/toast';
import { AnimFade } from '@Animations/Fade';
import {
  formatBTCPrice,
  formatLongAddress,
} from '@trustless-computer/dapp-core';
import { useWeb3React } from '@web3-react/core';
import { default as classNames, default as cs } from 'classnames';
import copy from 'copy-to-clipboard';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HTMLAttributes,
  forwardRef,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Button, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useSelector } from 'react-redux';
import { Wrapper } from './Header.styled';
import MenuMobile from './MenuMobile';
import ModalWithdraw from './Modal/ModalWithdraw';
import headerStyles from './header.module.scss';
import { formatEthPrice } from '@/utils/format';

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
    url: ROUTE_PATH.HOME,
  },
  {
    title: 'Art',
    url: ROUTE_PATH.ART,
  },
  {
    title: 'Adopt status',
    url: ROUTE_PATH.STATUS,
  },
  {
    title: 'FAQs',
    url: ROUTE_PATH.FAQS,
  },
];

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
  const { gmBalance, btcBalance, tcBalance, gmDepositBalance } =
    useContext(AssetsContext);
  const user = useSelector(getUserSelector);
  const { account } = useWeb3React();
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { onDisconnect, onConnect, requestBtcAddress } =
    useContext(WalletContext);
  const [isConnecting, setIsConnecting] = useState(false);
  const [eligibleOwner, setEligibleOwner] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

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
      <div className={headerStyles.menu_content}>
        <div className={headerStyles.menu_info}>
          <div className={headerStyles.menu_title}>{title}</div>
          <div className={headerStyles.menu_item}>
            <div className={headerStyles.menu_item_address}>
              <IconSVG src={icon} maxWidth="24" maxHeight="24" />
              <p>{formatLongAddress(address || '')}</p>
            </div>
            <div onClick={() => onClickCopy(address || '')}>
              <IconSVG
                src={`${CDN_URL}/ic-copy.svg`}
                color={'#fff'}
                maxWidth="16"
                className={headerStyles.copy_icon}
              />
            </div>
          </div>
        </div>
        <div className={headerStyles.menu_item_balance}>
          <p>
            {balance} {token}
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setEligibleOwner(Number(formatEthPrice(gmBalance)) >= 1);
  }, [gmBalance]);

  const ContentHeader = (): JSX.Element => {
    return (
      <div
        className={`content-header d-flex justify-content-between align-items-center w-100 ${
          homepage ? 'dark' : ''
        }`}
      >
        <div className={headerStyles.nav_container}>
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
          Souls
        </Link>
        <MenuMobile
          isOpen={isOpenMenu}
          onCloseMenu={() => setIsOpenMenu(false)}
        />
        <div className={`rightContainer`}>
          <Link
            href={'https://newbitcoincity.com/'}
            target="_blank"
            className={`${headerStyles.nbc_link}`}
          >
            New Bitcoin City
          </Link>
          <Link
            href={'https://discord.com/invite/yNbatuGMDG'}
            target="_blank"
            className={`${headerStyles.nbc_link}`}
          >
            <IconSVG
              src={`${CDN_URL}/ic-discord.svg`}
              maxWidth="20"
              type="fill"
              color={homepage ? 'white' : 'black'}
            ></IconSVG>
          </Link>
          <Link
            href={'https://twitter.com/NewBitcoinCity'}
            target="_blank"
            className={`${headerStyles.nbc_link}`}
          >
            <IconSVG
              src={`${CDN_URL}/ic_twitter.svg`}
              maxWidth="20"
              type="fill"
              color={homepage ? 'white' : 'black'}
            ></IconSVG>
          </Link>
          {isAuthenticated ? (
            <div className={headerStyles.wallets}>
              <Dropdown className={headerStyles.auction_wallet}>
                <Dropdown.Toggle
                  as={WalletToggle}
                  id="dropdown-custom-components"
                >
                  <div
                    className={cs(
                      headerStyles.profile_container,
                      headerStyles.profile_auction_wallet_container
                    )}
                  >
                    <p className={headerStyles.profile_auction_wallet}>
                      Auction Wallet
                    </p>
                    <div className={cs(headerStyles.profile_amount)}>
                      <span>{`${formatEthPrice(gmDepositBalance)} GM`}</span>
                      <IconSVG
                        src={`${CDN_URL}/ic-add-fill.svg`}
                        maxWidth="20"
                      />
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className={headerStyles.menu_wrapper}>
                  <div className={headerStyles.menu_container}>
                    <div
                      onClick={() => setShowDepositModal(true)}
                      className={headerStyles.menu_box}
                    >
                      <IconSVG
                        src={`${CDN_URL}/ic-coin-hand.svg`}
                        maxWidth="20"
                      />
                      <p>Deposit</p>
                    </div>
                    <div
                      onClick={() => {
                        setShowWithdrawModal(true);
                      }}
                      className={headerStyles.menu_box}
                    >
                      <IconSVG
                        src={`${CDN_URL}/ic-coins-rotate.svg`}
                        maxWidth="20"
                      />
                      <p>Withdraw</p>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  as={WalletToggle}
                  id="dropdown-custom-components"
                >
                  <div className={headerStyles.profile_container}>
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id={'warning-gm'}
                          placement="left"
                          show={!eligibleOwner}
                          className={`${headerStyles.tooltip_body} ${
                            !eligibleOwner ? '' : 'd-none'
                          }`}
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
                          !eligibleOwner && headerStyles.warning
                        )}
                      >
                        <IconSVG
                          src={`${CDN_URL}/ic-warning.svg`}
                          maxWidth={'20'}
                          maxHeight={'20'}
                          className={`${!eligibleOwner ? '' : 'd-none'}`}
                        ></IconSVG>
                        {`${formatEthPrice(gmBalance)} GM`}
                      </div>
                    </OverlayTrigger>

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
    <>
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
      <ModalDeposit
        show={showDepositModal}
        handleClose={() => setShowDepositModal(false)}
      />
      <ModalWithdraw
        show={showWithdrawModal}
        handleClose={() => setShowWithdrawModal(false)}
      />
    </>
  );
};

export default memo(Header);
