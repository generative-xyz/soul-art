import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from '@/components/Button';
import c from './style.module.scss';
import Claimed from './Claimed';
import Status from './ClaimStatus';
import ClaimSlider from './ClaimSlider';
import { generateSignature } from '@/services/signature';
import useSoul from '@/hooks/contract-operations/soul/useMint';

const ClaimPage = () => {
  const [isClaimed, _setClaimed] = useState(false);
  const [isWalletConnected, setWalletConnected] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [claimStatus, setClaimStatus] = useState('waiting');

  const { call } = useSoul();

  const handleConnectWallet = () => {
    setWalletConnected(true);
    setShowAlert(true);
  };

  useEffect(() => {
    if (isClaimed) {
      setClaimStatus('waiting');

      setTimeout(() => {
        setClaimStatus('success');
      }, 3000);
    }
  }, [isClaimed]);

  const handleClaimed = async () => {
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
    <>
      {isClaimed ? (
        <Claimed status={claimStatus} />
      ) : (
        <Card className={c.claim}>
          <Card.Body>
            <ClaimSlider />
            <div className={c.claim_title}>
              <h5 className={c.claim_title__text}>Soul</h5>
              <p className={c.claim_title__time}>
                <span>
                  <Status />
                </span>
                2d : 16h : 12m
              </p>
            </div>
            <Card.Text className={c.claim_description}>
              Lorem ipsum dolor sit amet consectetur. Curabitur in est sem
              tempus
              <br />
              consectetur vulputate et. In nisl diam rhoncus adipiscing tellus
              molestie facilisis.
            </Card.Text>
            <Card.Text className={c.claim_description}>
              Lorem ipsum dolor sit amet consectetur. Curabitur in est sem
              tempus
              <br />
              consectetur vulputate et. In nisl diam rhoncus adipiscing tellus
              molestie facilisis.
            </Card.Text>
            {isWalletConnected ? (
              <>
                <Button
                  className={c.claim_button}
                  disabled={showAlert}
                  onClick={handleClaimed}
                >
                  Claim Soul
                </Button>
                {showAlert && (
                  <div className={c.alert}>
                    <div>
                      <span className={c.alert_avt}></span>
                      <img
                        src="https://storage.googleapis.com/generative-static-prod/soul-art/clarity_warning-solid.svg"
                        alt="icon"
                      />
                    </div>
                    &quot;Your wallet is not on the list to receive Soul.&quot;
                  </div>
                )}
              </>
            ) : (
              <Button className={c.claim_button} onClick={handleConnectWallet}>
                Connect wallet to claim Soul
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ClaimPage;
