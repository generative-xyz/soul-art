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
// import useAsyncEffect from "use-async-effect";
// import {getListTokensByWallet} from "@Services/soul";
import { SoulEventType } from '@/enums/soul';

const ClaimPage = () => {
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [isWalletConnected, setWalletConnected] = useState<boolean>(false);
  const [isWalletConnected_localhost, setWalletConnected_localhost] =
    useState<any>();
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

  const [soulToken, _setSoulToken] = useState<any | null>(null);
  const { run: call } = useContractOperation<IMintParams, Transaction | null>({
    operation: useMint,
    inscribeable: true,
  });

  useEffect(() => {
    setWalletConnected_localhost(localStorage.getItem('isWalletConnected'));
  }, []);

  useEffect(() => {
    setWalletConnected(isWalletConnected_localhost === 'true');
  }, [isWalletConnected_localhost]);

  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await onConnect();
      await requestBtcAddress();
    } catch (err) {
      logger.error(err);
      setWalletConnected(false);
      onDisconnect();
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

  useEffect(() => {
    if (account && !isConnecting) {
      setWalletConnected(true);
      localStorage.setItem('isWalletConnected', 'true'); // Update localStorage when the wallet is connected
    } else {
      setWalletConnected(false);
      setIsReceiveAble(true);
      setIsClaimed(false);
      setClaimStatus('time');
      localStorage.setItem('isWalletConnected', 'false'); // Update localStorage when the wallet is disconnected
    }
  }, [account, isConnecting]);

  useEffect(() => {
    if (account) {
      (async () => {
        let res: any;
        try {
          const userTcBalance = new BigNumber(tcBalance);
          const userBtcBalance = new BigNumber(btcBalance);
          if (userTcBalance.isGreaterThan(0) && userBtcBalance.isGreaterThan(0))
            res = await generateSignature({
              wallet_address: account,
            });
        } catch (err) {
          logger.error(err);
        } finally {
          if (res) setIsReceiveAble(true);
          else {
            setIsReceiveAble(false);
          }

          if (!account || isConnecting) {
            setIsReceiveAble(true);
          }
        }
      })();
    }
  }, [account, isConnecting, btcBalance, tcBalance]);

  const txSuccessCallback = async (transaction: Transaction | null) => {
    if (!transaction || !account) return;
    const txHash = transaction.hash;
    if (!txHash) return;
    const storageKey = `${SoulEventType.MINT}_${account}`;
    localStorage.setItem(storageKey, txHash);
  };

  useEffect(() => {
    (async () => {
      if (signature) {
        let res: any;
        try {
          setIsWaitingForConfirm(true);
          res = await call({
            address: account as string,
            totalGM: totalGM,
            signature: signature,
            txSuccessCallback: txSuccessCallback,
          });
        } catch (err) {
          logger.error(err);
        } finally {
          setIsWaitingForConfirm(false);
          if (res.toString().includes('User rejected transaction')) {
            setClaimStatus('time');
          }
        }
      }
    })();
  }, [signature]);

  useEffect(() => {
    (async () => {
      let res: any;
      try {
        const userTcBalance = new BigNumber(tcBalance);
        const userBtcBalance = new BigNumber(btcBalance);
        if (userTcBalance.isGreaterThan(0) && userBtcBalance.isGreaterThan(0))
          res = await generateSignature({
            wallet_address: account,
          });
      } catch (err) {
        logger.error(err);
      } finally {
        setSignature(res?.signature);
        setTotalGM(Number(res?.gm));
      }
    })();
  }, [account, btcBalance, tcBalance]);

  useEffect(() => {
    if (!transactionHash) return;
    if (provider) {
      provider
        .getTransactionReceipt(transactionHash)
        .then((receipt: any) => {
          if (receipt.status === 1) {
            setIsClaimed(true);
            setClaimStatus('success');
          } else if (receipt.status === 0) {
            setIsClaimed(false);
            setClaimStatus('time');
          } else if (receipt.status === null || receipt.status === undefined) {
            setIsClaimed(false);
            setClaimStatus('waiting');
          } else {
            setIsClaimed(false);
            setClaimStatus('time');
          }
        })
        .catch((error: any) => {
          logger.error('Error retrieving transaction receipt:', error);
        });
    }
  }, [provider]);

  useEffect(() => {
    const storageKey = `${SoulEventType.MINT}_${account}`;
    const txHash = localStorage.getItem(storageKey) || '';
    setTransactionHash(txHash.toString());
  }, [account]);

  // useAsyncEffect(async () => {
  //     try {
  //         const {items} = await getListTokensByWallet(account || '');
  //         if (items.length) {
  //             setSoulToken(items[0] || null);
  //         }
  //     } catch (e) {
  //         logger.error('Error get tokens:', e);
  //     }
  //
  // }, [account])

  return (
    <div className={s.claimPage}>
      <Container className={s.container}>
        <Row className={s.row}>
          <Col lg={{ span: 4, offset: 4 }} className={s.column}>
            <div className={`${s.wrapBox} ${isClaimed ? s.isClaimed : ''}`}>
              <div className={s.successNoti}>
                <p className={s.status}>Claim success</p>
                <span className={s.dot}></span>
                <p className={s.date}>Jan 18, 2022 at 6:25pm</p>
              </div>
              <div
                className={`${s.claimBox} ${
                  claimStatus === 'success' ? s.success : ''
                }`}
              >
                <ClaimImg isClaimed={isClaimed} soulToken={soulToken} claimStatus={claimStatus}/>
                <ClaimContent isClaimed={isClaimed} claimStatus={claimStatus} />
                {!isClaimed ? (
                  <ClaimField
                    isWaitingForConfirm={isWaitingForConfirm}
                    handleClaimed={handleClaimed}
                    handleConnectWallet={handleConnectWallet}
                    isConnectedWallet={isWalletConnected}
                    isReceiveAble={isReceiveAble}
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
