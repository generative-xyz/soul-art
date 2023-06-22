import IconSVG from '@/components/IconSVG';
import s from './style.module.scss';
import { notiReceive } from '@/constants/asset';
import { getUserSelector } from '@/state/user/selector';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useMemo, useState } from 'react';
import { WalletContext } from '@/contexts/wallet-context';
import logger from '@/services/logger';
import { showToastError } from '@/utils/toast';
import BigNumber from 'bignumber.js';
import { AssetsContext } from '@/contexts/assets-context';
import { useWeb3React } from '@web3-react/core';
import { SoulEventType } from '@/enums/soul';
import useMint, { IMintParams } from '@/hooks/contract-operations/soul/useMint';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { Transaction } from 'ethers';
import { generateSignature } from '@/services/signature';
import useAsyncEffect from 'use-async-effect';

type IClaimButtonProps = {
  isFetchingApi: boolean;
};

const ClaimButton: React.FC<IClaimButtonProps> = ({
  isFetchingApi,
}): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const { account } = useWeb3React();
  const { btcBalance, tcBalance } = useContext(AssetsContext);
  const { onDisconnect, onConnect, requestBtcAddress } = useContext(WalletContext);
  const [isConnecting, setIsConnecting] = useState(false);
  const [sufficientBal, setSufficientBal] = useState(false);
  const [totalGM, setTotalGM] = useState(0);
  const [signature, setSignature] = useState('');
  const [minting, setMinting] = useState(false);
  const { run: call } = useContractOperation<IMintParams, Transaction | null>({
    operation: useMint,
    inscribeable: true,
  });
  const isReceiveAble = useMemo(() => !!signature, [signature]);

  const txSuccessCallback = async (transaction: Transaction | null) => {
    if (!transaction || !account) return;
    const txHash = transaction.hash;
    if (!txHash) return;
    const storageKey = `${SoulEventType.MINT}_${account.toLowerCase()}`;
    localStorage.setItem(storageKey, txHash);
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
        message: 'Rejected request',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleClaim = async () => {
    try {
      setMinting(true);
      const tx = await call({
        address: account as string,
        totalGM: totalGM,
        signature: signature,
        txSuccessCallback: txSuccessCallback,
      });
      if (!tx) {
        showToastError({
          message: 'Rejected request.',
        });
      }
    } catch (err: unknown) {
      logger.error(err);
      showToastError({
        message: (err as Error).message,
      });
    } finally {
      setMinting(false);
    }
  };

  useEffect(() => {
    if (!account) return;
    const userTcBalance = new BigNumber(tcBalance);
    const userBtcBalance = new BigNumber(btcBalance);
    if (
      userTcBalance.isGreaterThan(0) &&
      userBtcBalance.isGreaterThan(0) &&
      account
    ) {
      setSufficientBal(true);
    }
  }, [account, btcBalance, tcBalance]);

  useAsyncEffect(async () => {
    if (!account) return;

    try {
      const res = await generateSignature({
        wallet_address: account,
      });
      setTotalGM(Number(res?.gm));
      setSignature(res?.signature);
    } catch (err) {
      logger.error(err);
    }
  }, [account]);

  const NotificationConnectWallet: React.FC = () => {
    return (
      <div className={s.noti}>
        <IconSVG src={notiReceive} maxHeight={'44'} maxWidth={'44'} />
        {sufficientBal ? (
          <span>Your wallet is not on the list to receive Soul.</span>
        ) : (
          <span>Your wallet does not have enough balance.</span>
        )}
      </div>
    );
  };

  const ContentConnected: React.FC = () => {
    return (
      <button
        disabled={!isReceiveAble || !sufficientBal || isFetchingApi || minting}
        className={s.textButton}
        onClick={handleClaim}
      >
        <span>{minting ? 'Processing...' : 'Adopt Soul'}</span>
      </button>
    );
  };

  const ContentNotConnected: React.FC = () => {
    return (
      <button
        disabled={isConnecting}
        className={s.textButton}
        onClick={handleConnectWallet}>
        {isConnecting ? 'Connecting...' : 'Connect wallet to adopt Souls'}
      </button>
    );
  };

  return (
    <div className={s.claimButton}>
      {user?.walletAddress ? <ContentConnected /> : <ContentNotConnected />}
      {(!isReceiveAble || !sufficientBal) && user?.walletAddress && !isConnecting && (
        <NotificationConnectWallet />
      )}
    </div>
  );
};

export default ClaimButton;
