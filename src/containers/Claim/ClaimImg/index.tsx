import s from './style.module.scss';
type IClaimImgProps = {
  isClaimed: boolean;
};

const ClaimImg: React.FC<IClaimImgProps> = ({ isClaimed }) => {
  const claimImg =
    'https://storage.googleapis.com/generative-static-prod/soul-art/claimImg.jpg';

  return (
    <div className={`${s.claimImg} ${isClaimed ? s.true : ''}`}>
      <div className={s.backgroundImg}>
        <span></span>
      </div>
      <div className={s.img}>
        <img src={claimImg} alt="claim image" />
      </div>
    </div>
  );
};

export default ClaimImg;
