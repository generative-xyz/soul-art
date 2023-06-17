import React, { useState, useEffect, useContext } from 'react';
import ClaimContent from './ClaimContent';
import ClaimImg from './ClaimImg';
import s from './style.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import ClaimField from './ClaimField';

import { Transaction } from 'ethers';
import useMint, { IMintParams } from '@/hooks/contract-operations/soul/useMint';
import { useWeb3React } from '@web3-react/core';
import { generateSignature } from '@/services/signature';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { WalletContext } from '@/contexts/wallet-context';
import logger from '@/services/logger';
import { showToastError } from '@/utils/toast';
import { AssetsContext } from '@/contexts/assets-context';
import BigNumber from 'bignumber.js';
import useAsyncEffect from 'use-async-effect';
import { getListTokensByWallet } from '@Services/soul';
import { SoulEventType } from '@/enums/soul';
import { getUserSelector } from '@/state/user/selector';
import { useSelector } from 'react-redux';
// import useAsyncEffect from "use-async-effect";
// import {getListTokensByWallet} from "@Services/soul";

const ClaimPage = () => {
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [isWalletConnected, setWalletConnected] = useState<boolean>(false);
  const [_isWalletConnected_localhost, setWalletConnected_localhost] =
    useState<any>();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isReceiveAble, setIsReceiveAble] = useState<boolean>(true);
  const [claimStatus, setClaimStatus] = useState<string>('time');
  const { account, provider } = useWeb3React();
  const [totalGM, setTotalGM] = useState<number>(0);
  const [signature, setSignature] = useState<string>('');
  const [isWaitingForConfirm, setIsWaitingForConfirm] =
    useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const { onDisconnect, onConnect, requestBtcAddress } =
    useContext(WalletContext);
  const { btcBalance, tcBalance } = useContext(AssetsContext);
  const [haveEnoughBalance, setHaveEnoughBalance] = useState<boolean>(false);
  const user = useSelector(getUserSelector);
  const [mintAt, setMintAt] = useState<string | number>('');
  const [isFetchingApi, setIsFetchingApi] = useState<boolean>(false);

  //todo add type kevin
  const [soulToken, setSoulToken] = useState<any | null>(null);

  const { run: call } = useContractOperation<IMintParams, Transaction | null>({
    operation: useMint,
    inscribeable: true,
  });

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await onConnect();
      await requestBtcAddress();
    } catch (err) {
      logger.error(err);
      setWalletConnected(false);
      onDisconnect();
      setIsClaimed(false);
      setClaimStatus('time');
      localStorage.setItem('isWalletConnected', 'false');

      showToastError({
        message: (err as Error).message,
      });
    } finally {
      setIsConnecting(false);
      setWalletConnected(true);
    }
  };

  const handleClaimed = async () => {
    try {
      setIsWaitingForConfirm(true);
      if (isWalletConnected) {
        await call({
          address: account as string,
          totalGM: totalGM,
          signature: signature,
          txSuccessCallback: txSuccessCallback,
        });
      } else {
        handleConnectWallet();
      }
    } catch (err) {
      logger.error(err);
    } finally {
      setIsWaitingForConfirm(false);
    }
  };

  const txSuccessCallback = async (transaction: Transaction | null) => {
    if (!transaction || !account) return;
    const txHash = transaction.hash;
    if (!txHash) return;
    const storageKey = `${SoulEventType.MINT}_${account}`;
    localStorage.setItem(storageKey, txHash);
  };

  // Connect wallet
  useEffect(() => {
    const walletConnectedValue = localStorage.getItem('isWalletConnected');
    const walletConnected = walletConnectedValue === 'true';

    setWalletConnected_localhost(walletConnectedValue);
    setWalletConnected(walletConnected);

    if (account && !isConnecting) {
      setWalletConnected(true);
      localStorage.setItem('isWalletConnected', 'true'); // Update localStorage when the wallet is connected
    } else {
      setWalletConnected(false);
      setIsReceiveAble(true);
      setIsClaimed(false);
      setClaimStatus('');
      localStorage.setItem('isWalletConnected', 'false'); // Update localStorage when the wallet is disconnected
    }
  }, [account, isConnecting, user?.walletAddress]);

  // Check if this account is minted
  useAsyncEffect(async () => {
    try {
      setIsFetchingApi(true);
      if (!isConnecting) {
        const { items } = await getListTokensByWallet(account as string);
        if (items.length) {
          setSoulToken(items[0] || null);
          setIsClaimed(true);
          setClaimStatus('success');

          if (items[0].mintAt && Date.parse(items[0].mintAt)) {
            const date = new Date(items[0].mint);
            setMintAt(
              date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })
            );
          }
        }
      }
    } catch (e) {
      logger.error('Error get tokens:', e);
    } finally {
      setTimeout(async () => {
        setIsFetchingApi(false);
      }, 5000);
    }
  }, [account]);

  // Find transaction hash in localstorage
  useEffect(() => {
    try {
      if (!soulToken) {
        const storageKey = `${SoulEventType.MINT}_${account}`;
        const txHash = localStorage.getItem(storageKey) || '';
        setTransactionHash(txHash.toString());
      }
    } catch (e) {
      logger.error('Error get transaction hash:', e);
    }
  }, [soulToken]);

  //
  useAsyncEffect(async () => {
    let res: any;
    try {
      res = await generateSignature({
        wallet_address: account,
      });
    } catch (err) {
      logger.error(err);
    } finally {
      setSignature(res?.signature);
      setTotalGM(Number(res?.gm));
    }
  }, [account]);

  useEffect(() => {
    setIsReceiveAble(!!signature);
  }, [signature]);

  // Check balance
  useEffect(() => {
    const userTcBalance = new BigNumber(tcBalance);
    const userBtcBalance = new BigNumber(btcBalance);
    if (
      userTcBalance.isGreaterThan(0) &&
      userBtcBalance.isGreaterThan(0) &&
      account
    ) {
      setHaveEnoughBalance(true);
    }
  }, [account, btcBalance, tcBalance]);

  // Check transaction status
  useEffect(() => {
    if (account && !isConnecting) {
      const fetchTransactionStatus = async () => {
        try {
          if (!isWalletConnected) return;
          if (provider) {
            const receipt = await provider.getTransactionReceipt(
              transactionHash
            );
            if (receipt.status === 1) {
              setIsClaimed(true);
              setClaimStatus('success');
            } else if (receipt.status === 0) {
              setIsClaimed(false);
              setClaimStatus('');
            } else if (
              receipt.status === null ||
              receipt.status === undefined
            ) {
              setIsClaimed(false);
              setClaimStatus('waiting');
            } else {
              setIsClaimed(false);
              setClaimStatus('');
            }
          }
        } catch (error) {
          logger.error('Error retrieving transaction receipt:', error);
        }
      };

      fetchTransactionStatus();

      const intervalId = setInterval(() => {
        fetchTransactionStatus();
      }, 10000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [
    provider,
    transactionHash,
    isWalletConnected,
    account,
    isConnecting,
    haveEnoughBalance,
  ]);

  useEffect(() => {
    const storageKey = `${SoulEventType.MINT}_${account}`;
    const txHash = localStorage.getItem(storageKey) || '';
    setTransactionHash(txHash.toString());
  }, [account]);

  return (
    <div className={s.claimPage}>
      <Container className={s.container}>
        <Row className={s.row}>
          <Col lg={{ span: 4, offset: 4 }} className={s.column}>
            <div className={`${s.wrapBox} ${isClaimed ? s.isClaimed : ''}`}>
              <div className={s.successNoti}>
                <p className={s.status}>Claim success</p>
                <span className={s.dot}></span>
                <p className={s.date}>{mintAt}</p>
              </div>
              <div
                className={`${s.claimBox} ${
                  claimStatus === 'success' ? s.success : ''
                }`}
              >
                <ClaimImg isClaimed={isClaimed} soulToken={soulToken} />
                <ClaimContent isClaimed={isClaimed} claimStatus={claimStatus} />
                {!isClaimed ? (
                  <ClaimField
                    isWaitingForConfirm={isWaitingForConfirm}
                    handleClaimed={handleClaimed}
                    handleConnectWallet={handleConnectWallet}
                    isConnectedWallet={isWalletConnected}
                    isReceiveAble={isReceiveAble}
                    isConnecting={isConnecting}
                    haveEnoughBalance={haveEnoughBalance}
                    isClaimed={isClaimed}
                    isFetchingApi={isFetchingApi}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ClaimPage;
