import React, { useEffect, useState } from 'react';
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
import dayjs from 'dayjs';
import web3Instance from '@/connections/custom-web3-provider';

const ClaimPage: React.FC = (): React.ReactElement => {
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [claimStatus, setClaimStatus] = useState<
    'idle' | 'waiting' | 'success'
  >('idle');
  const { account, provider } = useWeb3React();
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [mintedTimestamp, setMintedTimestamp] = useState<null | string>(null);
  const [_isFetchingApi, setIsFetchingApi] = useState(false);
  const [soulToken, setSoulToken] = useState<ISoul | null>(null);
  const {
    operationName
  } = useMint()
  const claimingStartComparisonResult = useTimeComparison(CLAIM_START_TIME);
  const isEventStarted =
    claimingStartComparisonResult !== null && claimingStartComparisonResult > 0;

  useAsyncEffect(async () => {
    if (!account) return;

    try {
      setIsFetchingApi(true);
      const { items } = await getListTokensByWallet(account);
      if (items.length > 0 && items[0]) {
        const soulItem = items[0];
        setSoulToken(soulItem);
        setIsClaimed(true);
        setClaimStatus('success');

        if (soulItem.mintedAt) {
          const block = await web3Instance.getBlock(soulItem.mintedAt);
          logger.info('block info', block);
          const date = dayjs.unix(block.timestamp as number);
          setMintedTimestamp(date.format('ddd, D MMM YYYY HH:mm:ss'));
        }
      }
    } catch (err: unknown) {
      logger.error('Error get tokens:', err);
    } finally {
      setIsFetchingApi(false);
    }
  }, [account]);

  useEffect(() => {
    if (!account || isClaimed) return;

    const key = toStorageKey(operationName, account);
    const txHash = localStorage.getItem(key);
    if (!txHash) return;

    setTransactionHash(txHash.toString());
  }, [account, isClaimed, operationName]);

  useEffect(() => {
    logger.log('account', account);
    logger.log('transactionHash', transactionHash);

    if (!account || !provider || !transactionHash) return;

    const fetchTransactionStatus = async () => {
      try {
        const receipt = await provider.getTransactionReceipt(transactionHash);

        if (receipt?.status === 1) {
          setIsClaimed(true);
          setClaimStatus('success');
        } else if (receipt?.status === 0) {
          setIsClaimed(false);
          setClaimStatus('idle');
        } else if (receipt?.status === null || receipt?.status === undefined) {
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
  }, [provider, transactionHash, account, operationName]);

  return (
    <div className={s.claimPage}>
      <Container className={s.container}>
        <Row className={s.row}>
          <Col
            lg={
              isEventStarted ? { span: 4, offset: 4 } : { span: 8, offset: 2 }
            }
            className={s.column}
          >
            <div className={`${s.wrapBox}`}>
              <h3 className={s.blockTitle}>The OG adopters</h3>
              {isClaimed && (
                <div className={s.successNoti}>
                  <p className={s.status}>Claim success</p>
                  <span className={s.dot}></span>
                  {mintedTimestamp && (
                    <p className={s.date}>{mintedTimestamp}</p>
                  )}
                </div>
              )}
              <div
                className={`${s.claimBox} ${claimStatus === 'success' ? s.success : ''
                  }`}
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
                {/* {isEventStarted && <ClaimButton isFetchingApi={isFetchingApi} />} */}
              </div>
            </div>
            {!isEventStarted && <Discord />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ClaimPage;
