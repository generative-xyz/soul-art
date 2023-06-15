import { useState, useEffect } from 'react';
import ClaimContent from './ClaimContent';
import ClaimImg from './ClaimImg';
import s from './style.module.scss';
import { Col, Container } from 'react-bootstrap';
import ClaimField from './ClaimField';

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

  const handleClaimed = () => {
    setClaimed(true);
  };

  useEffect(() => {
    if (isClaimed) {
      setClaimStatus('waiting');
    }
  }, [isClaimed]);

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
