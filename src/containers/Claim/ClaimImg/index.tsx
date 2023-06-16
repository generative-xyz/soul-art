import { CDN_URL } from '@/configs';
import s from './style.module.scss';
type IClaimImgProps = {
  isClaimed: boolean;
};

const ClaimImg: React.FC<IClaimImgProps> = ({ isClaimed }) => {
  return (
    <div className={`${s.claimImg} ${isClaimed ? s.true : ''}`}>
      <div className={s.backgroundImg}>
        <img src={`${CDN_URL}/claim-bg.jpg`} alt="claim background" />
      </div>
      <div className={s.img}>
        <img src={`${CDN_URL}/claimImg.jpg`} alt="claim image" />
      </div>
    </div>
  );
};

export default ClaimImg;
