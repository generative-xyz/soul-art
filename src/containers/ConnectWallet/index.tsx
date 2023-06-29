import React, { useContext, useEffect, useState } from 'react';
import { Wrapper, ConnectWalletButton } from './ConnectWallet.styled';
import { WalletContext } from '@/contexts/wallet-context';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { ROUTE_PATH } from '@/constants/route-path';
import { useRouter } from 'next/router';
import { showToastError } from '@/utils/toast';
import { CDN_URL } from '@/configs';
import logger from '@/services/logger';

const ConnectWallet: React.FC = (): React.ReactElement => {
  const { onConnect, requestBtcAddress, onDisconnect } =
    useContext(WalletContext);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await onConnect();
      await requestBtcAddress();
    } catch (err) {
      showToastError({
        message: 'Rejected request',
      });
      logger.error(err);
      onDisconnect();
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const lastRoute = localStorage.getItem('route');
      router.push(lastRoute || ROUTE_PATH.HOME);
    }
  }, [isAuthenticated]);

  return (
    <Wrapper>
      <div className="mainContent">
        <h1 className="title">Connect Wallet</h1>
        <p className="desc">Connect your wallet to adopt a Soul.</p>
        <ConnectWalletButton
          className={'connectWalletButtonWrapper'}
          disabled={isConnecting}
          onClick={handleConnectWallet}
        >
          <img
            alt="wallet-icon"
            className="wallet-icon"
            src={`${CDN_URL}/heroicons_wallet-solid.svg`}
          />
          <span className={'connectWalletButton'}>
            {isConnecting ? 'Connecting...' : 'Connect wallet'}
          </span>
        </ConnectWalletButton>
      </div>
    </Wrapper>
  );
};

export default ConnectWallet;
