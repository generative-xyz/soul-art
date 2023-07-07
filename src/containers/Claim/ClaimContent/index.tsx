import CountdownText from '@/components/CountdownText';
import SonarWaveCircle from '@/components/SonarWaveCircle';
import { CLAIM_START_TIME } from '@/configs';
import { AssetsContext } from '@/contexts/assets-context';
import React, { useContext } from 'react';
import Status from './Status';
import s from './style.module.scss';

type IClaimContentProps = {
  isClaimed: boolean;
  claimStatus: string;
  isEventStarted: boolean;
};
const ClaimContent: React.FC<IClaimContentProps> = ({
  isClaimed,
  claimStatus,
  isEventStarted,
}) => {
  const { ownerTokenId } = useContext(AssetsContext);

  const ClaimDesc = () => {
    return (
      <div className={s.claimDesc}>
        <p className={s.desc}>
          Souls can only be adopted by New Bitcoiners who contributed at least 1
          $GM at the end of the GM crowdfunding event.
        </p>
        <p className={s.desc}>
          Just as the sun rises each day, the Souls collection symbolizes hope,
          resilience, and the potential for growth of the Bitcoin network.
        </p>
      </div>
    );
  };

  return (
    <div className={`${s.claimContent} ${isClaimed ? s.true : ''}`}>
      <div className={s.claimContent_top}>
        <div className={s.claimContent_header}>
          <p className={`${s.claimContent_title} ${isClaimed ? s.true : ''}`}>
            Soul {!!ownerTokenId && `#${ownerTokenId}`}
          </p>
          {!isEventStarted && (
            <div className={s.claimContent_countdownWrapper}>
              <p>Adopt your Soul in</p>
              <SonarWaveCircle />
              <CountdownText
                className={s.claimContent_countdownText}
                countDownTo={CLAIM_START_TIME}
              />
            </div>
          )}
        </div>
        <Status type={claimStatus} />
      </div>
      {isClaimed ? '' : <ClaimDesc />}
    </div>
  );
};

export default React.memo(ClaimContent);
