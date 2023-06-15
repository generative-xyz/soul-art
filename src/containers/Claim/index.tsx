import React, { useState, useEffect } from 'react';
import ClaimContent from './ClaimContent';
import ClaimImg from './ClaimImg';
import s from './style.module.scss';
import { Col, Container } from 'react-bootstrap';
import ClaimField from './ClaimField';
import { generateSignature } from '@/services/signature';
import useSoul from '@/hooks/contract-operations/soul/useMint';

const ClaimPage = () => {
  const [isClaimed, _setClaimed] = useState(false);
  const [isWalletConnected, setWalletConnected] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [claimStatus, setClaimStatus] = useState('waiting');

  const { call } = useSoul();



const ClaimPage = () => {
  const [isClaimed, setClaimed] = useState<boolean>(false);
  const [isWalletConnected, setWalletConnected] = useState<boolean>(false);
  const [isReceiveAble, setIsReceiveAble] = useState<boolean>(false);
  const [claimStatus, setClaimStatus] = useState<string>('time');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- delete this line when done logic
  const handleConnectWallet = () => {
    setWalletConnected(true);
    setIsReceiveAble(true);
  };

  useEffect(() => {
    if (isClaimed) {
      setClaimStatus('waiting');
    }
  }, [isClaimed]);

  const handleClaimed = async () => {
    setClaimed(true);

    const data = await generateSignature({
      wallet_address: '0xa733E6b35922221D5358b5C7d314c1589be92A5f',
    });
    call({
      address: '0xa733E6b35922221D5358b5C7d314c1589be92A5f',
      totalGM: Number(data.gm),
      signature: data.signature,
    });
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
