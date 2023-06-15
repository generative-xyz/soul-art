/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import ClaimContent from './ClaimContent';
import ClaimImg from './ClaimImg';
import s from './style.module.scss';
import { Col, Container } from 'react-bootstrap';
import ClaimField from './ClaimField';
import { generateSignature } from '@/services/signature';
import useSoul, {
  IClaimParams,
} from '@/hooks/contract-operations/soul/useMint';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { Transaction } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import { WalletContext } from '@/contexts/wallet-context';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { ROUTE_PATH } from '@/constants/route-path';
import { useRouter } from 'next/router';
import { showToastError } from '@/utils/toast';
import logger from '@/services/logger';

const ClaimPage = () => {
  const [isClaimed, setClaimed] = useState<boolean>(false);
  const [isWalletConnected, setWalletConnected] = useState<boolean>(
    localStorage.getItem('isWalletConnected') === 'false' // Retrieve the value from localStorage on initial render
  );
  const [isReceiveAble, setIsReceiveAble] = useState<boolean>(true);
  const [claimStatus, setClaimStatus] = useState<string>('time');
  const { onConnect, requestBtcAddress, onDisconnect } =
    useContext(WalletContext);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const { account } = useWeb3React();
  const [status, setStatus] = useState();
  const { run: call } = useContractOperation<IClaimParams, Transaction | null>({
    operation: useSoul,
    inscribeable: true,
  });

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await onConnect();
      await requestBtcAddress();
    } catch (err) {
      showToastError({
        message: (err as Error).message,
      });
      logger.error(err);
      setWalletConnected(false); // Set the state to false if connection fails
      onDisconnect();
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (account) {
      if (!isConnecting) {
        setWalletConnected(true);

        localStorage.setItem('isWalletConnected', 'true'); // Update localStorage when the wallet is connected
      }
    } else {
      setWalletConnected(false);
      localStorage.setItem('isWalletConnected', 'false'); // Update localStorage when the wallet is connected
    }
  }, [account]);
  const handleClaimed = async () => {
    if (!account) {
      handleConnectWallet();
    }

    // (async () => {
    //   const result = await generateSignature({
    //     wallet_address: '0xDF1B860C0e0e3D33306106249933495bC037565D',
    //   });
    //   console.log(result);
    // })();

    // console.log(mintPermission);

    // const data = await generateSignature({
    //   wallet_address: account,
    // });

    // call({
    //   address: account!,
    //   totalGM: Number(data.gm),
    //   signature: data.signature,
    // });
  };

  return (
    <div className={s.claimPage}>
      <Container className={s.container}>
        <Col lg={{ span: 4, offset: 4 }} className={s.column}>
          <div className={s.wrapBox}>
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
              <ClaimImg isClaimed={isClaimed} />
              <ClaimContent isClaimed={isClaimed} claimStatus={claimStatus} />
              {!isClaimed ? (
                <ClaimField
                  handleClaimed={handleClaimed}
                  isConnectedWallet={isWalletConnected}
                  isReceiveAble={isReceiveAble}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default ClaimPage;
