import { CDN_URL } from '@/configs';
import s from './style.module.scss';
import { Explorer } from '@Components/Expoler';

type IClaimImgProps = {
  isClaimed: boolean;
  soulToken: any;
  claimStatus: string;
};

const ClaimImg: React.FC<IClaimImgProps> = ({
  isClaimed,
  soulToken,
  claimStatus,
}) => {
  return (
    <div
      className={`${s.claimImg} ${isClaimed ? s.true : ''} ${
        claimStatus === 'waiting' ? s.wait : ''
      }`}
    >
      {soulToken ? (
        <Explorer url={soulToken.image} />
      ) : (
        <>
          <div className={s.backgroundImg}>
            <img src={`${CDN_URL}/claim-bg.jpg`} alt="claim background" />
          </div>
          <div className={s.img}>
            <img src={`${CDN_URL}/claimImg.jpg`} alt="claim image" />
          </div>
        </>
      )}
    </div>
  );
};

export default ClaimImg;
