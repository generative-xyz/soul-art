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
          Explore Souls, the first on-chain soulbound art that merges in a
          collective performance, reflecting human emotions such as fear, greed,
          and belief.
        </p>
        <p className={s.desc}>
          These Souls are personalised and irreplaceable, requiring ongoing care
          from their owners. If you have no joy with them, they will leave you
          in search of a better match.
        </p>
        <p className={s.desc}>
          Enjoy this collection, which will help you understand the
          interconnected nature of our New Bitcoin City community.
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
