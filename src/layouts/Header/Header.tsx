import IconSVG from '@/components/IconSVG';
import { BUY_GM_URL, CDN_URL, TC_URL } from '@/configs';
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
  useRef,
  useState,
} from 'react';
import { Button, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useSelector } from 'react-redux';
import { Wrapper } from './Header.styled';
import MenuMobile from './MenuMobile';
import ModalWithdraw from './Modal/ModalWithdraw';
import s from './header.module.scss';
import { formatEthPrice } from '@/utils/format';
import BigNumber from 'bignumber.js';

type NavContent = {
  title: string;
  url: string;
  target?: string;
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
    title: 'Souls',
    url: ROUTE_PATH.STORY,
  },
  // {
  //   title: 'Artworks',
  //   url: ROUTE_PATH.GALLERY,
  // },
  {
    title: 'GM',
    url: 'https://newbitcoincity.com/gm',
    target: '_blank',
  },
  {
    title: 'Orphanage',
    url: ROUTE_PATH.ORPHANAGE,
  },
  // {
  //   title: 'Bidding',
  //   url: ROUTE_PATH.STATUS,
  // },
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
  const story = router.pathname === ROUTE_PATH.STORY;
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
  const [showTooltip, setShowTooltip] = useState(false);
  const timeOutRef = useRef<NodeJS.Timer | null>(null);

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

  const handleToggleTooltip = () => {
    if (showTooltip) {
      timeOutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    } else {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = null;
      }
      setShowTooltip(true);
    }
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

  useEffect(() => {
    const gmBalanceBN = new BigNumber(gmBalance).dividedBy(1e18);
    setEligibleOwner(gmBalanceBN.isGreaterThanOrEqualTo(1));
  }, [gmBalance]);

  const ContentHeader = (): JSX.Element => {
    return (
      <div
        className={`content-header d-flex justify-content-between align-items-center w-100 ${
          homepage || story ? 'dark' : ''
        }`}
      >
        <div className={s.nav_container}>
          {NAV_CONTENT.map(({ title, url, target }) => {
            return (
              <Link
                key={title}
                href={url}
                className={`${s.nav_item}
                  ${router.pathname === url ? s.active : ''}`}
                target={target || '_self'}
              >
                {title}
              </Link>
            );
          })}
        </div>
        <Link className={s.logo} href={ROUTE_PATH.HOME}>
          <IconSVG
            src={
              theme === 'dark'
                ? `${CDN_URL}/logo-soul-white.svg`
                : `${CDN_URL}/logo-soul-black.svg`
            }
            maxHeight="28"
          ></IconSVG>
        </Link>
        <MenuMobile
          isOpen={isOpenMenu}
          onCloseMenu={() => setIsOpenMenu(false)}
        />
        <div className={`rightContainer`}>
          <Link
            href={ROUTE_PATH.TECH}
            className={`${s.nbc_link}`}
          >
            Tech
          </Link>
          <Link
            href={ROUTE_PATH.ART}
            className={`${s.nbc_link}`}
          >
            Art
          </Link>
          <Link
            href={'https://newbitcoincity.com/'}
            target="_blank"
            className={`${s.nbc_link}`}
          >
            New Bitcoin City
          </Link>
          <Link
            href={'https://discord.com/invite/yNbatuGMDG'}
            target="_blank"
            className={`${s.nbc_link}`}
          >
            <IconSVG
              src={`${CDN_URL}/ic-discord.svg`}
              maxWidth="20"
              type="fill"
              color={homepage || story ? 'white' : 'black'}
            ></IconSVG>
          </Link>
          <Link
            href={'https://twitter.com/NewBitcoinCity'}
            target="_blank"
            className={`${s.nbc_link}`}
          >
            <IconSVG
              src={`${CDN_URL}/ic_twitter.svg`}
              maxWidth="20"
              type="fill"
              color={homepage || story ? 'white' : 'black'}
            ></IconSVG>
          </Link>
          {isAuthenticated ? (
            <div className={s.wallets}>
              <Dropdown className={s.auction_wallet}>
                <Dropdown.Toggle
                  as={WalletToggle}
                  id="dropdown-custom-components"
                >
                  <div
                    className={cs(
                      s.profile_container,
                      s.profile_auction_wallet_container
                    )}
                  >
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id={'warning-gm'}
                          className={cs(
                            s.tooltip_body,
                            s.auction_wallet_tooltip
                          )}
                        >
                          <div className={s.auction_tooltip_content}>
                            <p>This wallet is only for Soul adoption.</p>
                            <p>
                              Please deposit GM into your bidding wallet to
                              place a bid.
                            </p>
                          </div>
                        </Tooltip>
                      }
                      placement="bottom"
                    >
                      <div>
                        <p className={s.profile_auction_wallet}>
                          <IconSVG
                            src={`${CDN_URL}/ic_round-info.svg`}
                            maxWidth="16"
                            maxHeight="16"
                            color={homepage || story ? 'white' : 'black'}
                            type="fill"
                          ></IconSVG>
                          Bidding Wallet
                        </p>
                      </div>
                    </OverlayTrigger>

                    <div className={cs(s.profile_amount, 'pr-4')}>
                      <span>{`${formatEthPrice(gmDepositBalance)} GM`}</span>
                      <IconSVG
                        src={`${CDN_URL}/ic-add-fill.svg`}
                        maxWidth="20"
                      />
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className={s.menu_wrapper}>
                  <div className={s.menu_container}>
                    <div
                      onClick={() => setShowDepositModal(true)}
                      className={s.menu_box}
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
                      className={s.menu_box}
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
                  <div className={s.profile_container}>
                    <OverlayTrigger
                      show={showTooltip}
                      onToggle={handleToggleTooltip}
                      placement="bottom"
                      overlay={
                        <Tooltip
                          id={'warning-gm'}
                          placement="left"
                          show={!eligibleOwner}
                          className={`${s.tooltip_body} ${
                            !eligibleOwner ? '' : 'd-none'
                          }`}
                        >
                          <div className={s.tooltip_content}>
                            <p>Your balance is less than 1GM</p>
                            <p>Your Soul is looking for a better match...</p>
                            <div className={s.tooltip_action}>
                              <Link
                                className={s.tooltip_buyMore}
                                href={BUY_GM_URL}
                              >
                                <span>Buy GM</span>
                                <img
                                  src={`${CDN_URL}/tooltip-arrow-icon.svg`}
                                  alt="arrow-icon"
                                />
                              </Link>
                            </div>
                          </div>
                        </Tooltip>
                      }
                    >
                      <div
                        className={cs(
                          s.profile_amount,
                          !eligibleOwner && s.warning
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
              className={s.connect_button}
            >
              <img
                alt="wallet_icon"
                className={s.wallet_icon}
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
        className={classNames(s.header, theme ? s[theme] : '', 'dark')}
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
