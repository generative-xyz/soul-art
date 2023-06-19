import CountdownText from '@/components/CountdownText';
import Status from './Status';
import s from './style.module.scss';
import SonarWaveCircle from '@/components/SonarWaveCircle';

type IClaimContentProps = {
  isClaimed: boolean;
  claimStatus: string;
};
const ClaimContent: React.FC<IClaimContentProps> = ({
  isClaimed,
  claimStatus,
}) => {
  const ClaimDesc = () => {
    return (
      <div className={s.claimDesc}>
        <p className={s.desc}>
          Explore Souls, the first ever art protocol that merges in a collective performance, trustlessly choreographed by unstoppable smart contracts, financially managed by a collector-run DAO, and powered by a native cryptocurrency - $GM.

        </p>
        <p className={s.desc}>
          Just as the sun rises each day, the Souls collection symbolizes hope, resilience, and the potential for growth of the Bitcoin network.
        </p>
      </div>
    );
  };

  return (
    <div className={`${s.claimContent} ${isClaimed ? s.true : ''}`}>
      <div className={s.claimContent_top}>
        <div className={s.claimContent_header}>
          <p className={`${s.claimContent_title} ${isClaimed ? s.true : ''}`}>
            Souls
          </p>
          <div className={s.claimContent_countdownWrapper}>
            <SonarWaveCircle />
            <CountdownText className={s.claimContent_countdownText} />
          </div>
        </div>
        <Status type={claimStatus} />
      </div>
      {isClaimed ? '' : <ClaimDesc />}
    </div>
  );
};

export default ClaimContent;
