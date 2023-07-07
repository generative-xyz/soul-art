import IconSVG from '@/components/IconSVG';
import s from './style.module.scss';
import { notiReceive } from '@/constants/asset';
import { getUserSelector } from '@/state/user/selector';
import { useSelector } from 'react-redux';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { WalletContext } from '@/contexts/wallet-context';
import logger from '@/services/logger';
import { showToastError } from '@/utils/toast';
import BigNumber from 'bignumber.js';
import { AssetsContext } from '@/contexts/assets-context';
import useMint, { IMintParams } from '@/hooks/contract-operations/soul/useMint';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { Transaction } from 'ethers';
import { generateSignature } from '@/services/signature';
import useAsyncEffect from 'use-async-effect';
import { toStorageKey } from '@/utils';

interface IClaimButtonProps {
  isFetchingApi: boolean;
  afterMintSuccess: () => void;
}

const ClaimButton: React.FC<IClaimButtonProps> = ({
  isFetchingApi,
  afterMintSuccess,
}): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const { btcBalance, tcBalance } = useContext(AssetsContext);
  const { onDisconnect, onConnect, requestBtcAddress } =
    useContext(WalletContext);
  const [isConnecting, setIsConnecting] = useState(false);
  const [sufficientBal, setSufficientBal] = useState(true);
  const [totalGM, setTotalGM] = useState('0');
  const [signature, setSignature] = useState('');
  const [minting, setMinting] = useState(false);
  const { run: mint } = useContractOperation<IMintParams, Transaction | null>({
    operation: useMint,
    inscribable: true,
  });
  const { operationName } = useMint();
  const isReceiveAble = useMemo(() => !!signature, [signature]);

  const txSuccessCallback = async (transaction: Transaction | null) => {
    if (!transaction || !user?.walletAddress) return;
    const txHash = transaction.hash;
    if (!txHash) return;
    const storageKey = toStorageKey(operationName, user.walletAddress);
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
    if (!user?.walletAddress) {
      showToastError({
        message: 'Unauthorized',
      });
      return;
    }

    if (minting) {
      return;
    }

    try {
      setMinting(true);
      await mint({
        address: user.walletAddress,
        totalGM: totalGM,
        signature: signature,
        txSuccessCallback: txSuccessCallback,
      });
      afterMintSuccess();
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
    if (!user?.walletAddress) return;
    const userTcBalance = new BigNumber(tcBalance);
    const userBtcBalance = new BigNumber(btcBalance);
    if (userTcBalance.isEqualTo(0) && userBtcBalance.isEqualTo(0)) {
      setSufficientBal(false);
    } else {
      setSufficientBal(true);
    }
  }, [user?.walletAddress, btcBalance, tcBalance]);

  useAsyncEffect(async () => {
    if (!user?.walletAddress) return;

    try {
      const res = await generateSignature({
        wallet_address: user?.walletAddress,
      });
      if (res.gm && res.signature) {
        setTotalGM(res?.gm);
        setSignature(res?.signature);
      }
    } catch (err) {
      logger.error(err);
    }
  }, [user?.walletAddress]);

  const NotificationConnectWallet: React.FC = () => {
    return (
      <div className={s.noti}>
        <IconSVG src={notiReceive} maxHeight={'44'} maxWidth={'44'} />
        <p>
          {!isReceiveAble && (
            <>Your wallet is not on the list to receive Soul.&nbsp;</>
          )}
          {!sufficientBal && <>Your wallet does not have enough balance.</>}
        </p>
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
        <span>{minting ? 'Processing...' : 'Adopt a Soul'}</span>
      </button>
    );
  };

  const ContentNotConnected: React.FC = () => {
    return (
      <button
        disabled={isConnecting}
        className={s.textButton}
        onClick={handleConnectWallet}
      >
        {isConnecting ? 'Connecting...' : 'Connect wallet to adopt Souls'}
      </button>
    );
  };

  return (
    <div className={s.claimButton}>
      {user?.walletAddress ? <ContentConnected /> : <ContentNotConnected />}
      {(!isReceiveAble || !sufficientBal) &&
        user?.walletAddress &&
        !isConnecting && <NotificationConnectWallet />}
    </div>
  );
};

export default React.memo(ClaimButton);
