import Status from './Status';
import s from './style.module.scss';

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
          Lorem ipsum dolor sit amet consectetur. Curabitur in est sem tempus
          consectetur vulputate et. In nisl diam rhoncus adipiscing tellus
          molestie facilisis.
        </p>
        <p className={s.desc}>
          Lorem ipsum dolor sit amet consectetur. Curabitur in est sem tempus
          consectetur vulputate et. In nisl diam rhoncus adipiscing tellus
          molestie facilisis.
        </p>
      </div>
    );
  };

  return (
    <div className={`${s.claimContent} ${isClaimed ? s.true : ''}`}>
      <div className={s.claimContent_top}>
        <p className={`${s.claimContent_title} ${isClaimed ? s.true : ''}`}>
          Souls
        </p>
        <Status type={claimStatus} />
      </div>
      {isClaimed ? '' : <ClaimDesc />}
    </div>
  );
};

export default ClaimContent;
