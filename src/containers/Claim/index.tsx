import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ClaimContent from './ClaimContent';
import ClaimImg from './ClaimImg';
import s from './style.module.scss';
import { CLAIM_START_TIME } from '@/configs';
import useTimeComparison from '@/hooks/useTimeComparison';
import { ISoul } from '@/interfaces/api/soul';
import logger from '@/services/logger';
import { useWeb3React } from '@web3-react/core';
import Discord from './Discord';
import useMint from '@/hooks/contract-operations/soul/useMint';
import { toStorageKey } from '@/utils';
import useAsyncEffect from 'use-async-effect';
import { getListTokensByWallet } from '@/services/soul';
import ClaimButton from './ClaimButton';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import { AssetsContext } from '@/contexts/assets-context';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@/constants/route-path';

const ClaimPage: React.FC = (): React.ReactElement => {
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const router = useRouter();
  const { ownerTokenId } = useContext(AssetsContext);

  const [claimStatus, setClaimStatus] = useState<
    'idle' | 'waiting' | 'success'
  >('idle');
  const user = useSelector(getUserSelector);
  const { provider } = useWeb3React();
  const [isFetchingApi, setIsFetchingApi] = useState(false);
  const [soulToken, setSoulToken] = useState<ISoul | null>(null);
  const { operationName } = useMint();
  const claimingStartComparisonResult = useTimeComparison(CLAIM_START_TIME);
  const isEventStarted =
    claimingStartComparisonResult !== null && claimingStartComparisonResult > 0;

  useAsyncEffect(async () => {
    if (!user?.walletAddress) return;

    try {
      setIsFetchingApi(true);
      const { items } = await getListTokensByWallet(user.walletAddress);
      if (items.length > 0 && items[0]) {
        const soulItem = items[0];
        setSoulToken(soulItem);
        setIsClaimed(true);
        setClaimStatus('success');
      }
    } catch (err: unknown) {
      logger.error('Error get tokens:', err);
    } finally {
      setIsFetchingApi(false);
    }
  }, [user?.walletAddress]);

  useEffect(() => {
    if (!user?.walletAddress || !provider || isClaimed) return;

    const key = toStorageKey(operationName, user?.walletAddress);
    const transactionHash = localStorage.getItem(key);
    if (!transactionHash) return;

    const fetchTransactionStatus = async () => {
      try {
        const receipt = await provider.getTransactionReceipt(transactionHash);

        if (
          receipt?.status === null ||
          receipt?.status === undefined ||
          receipt?.status === 1
        ) {
          setIsClaimed(true);
          setClaimStatus('waiting');
        } else {
          setIsClaimed(false);
          setClaimStatus('idle');
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
      intervalId && clearInterval(intervalId);
    };
  }, [provider, user?.walletAddress, operationName, isClaimed]);

  return (
    <div className={s.claimPage}>
      <Container className={s.container}>
        <Row className={s.row}>
          <Col lg={{ span: 8, offset: 2 }} className={s.column}>
            <div className={`${s.wrapBox}`}>
              <h3 className={s.blockTitle}>GM Contributors</h3>
              <div
                className={`${s.claimBox} ${
                  claimStatus === 'success' ? s.success : ''
                }`}
                onClick={() => {
                  if (!!ownerTokenId) {
                    router.push(`${ROUTE_PATH.HOME}/${ownerTokenId}`);
                  }
                }}
              >
                <ClaimImg
                  isClaimed={isClaimed}
                  soulToken={soulToken}
                  claimStatus={claimStatus}
                />
                <ClaimContent
                  isEventStarted={isEventStarted}
                  isClaimed={isClaimed}
                  claimStatus={claimStatus}
                />
                {isEventStarted && claimStatus === 'idle' && (
                  <ClaimButton isFetchingApi={isFetchingApi} />
                )}
              </div>
            </div>
            <Discord />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ClaimPage;
