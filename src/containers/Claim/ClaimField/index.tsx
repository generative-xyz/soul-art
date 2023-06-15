// import IconSVG from '@/components/IconSVG';
import IconSVG from '@/components/IconSVG';
import s from './style.module.scss';
import { notiReceive } from '@/constants/asset';
// import { notiReceive } from '@/constants/asset';
type IClainFeildProps = {
  handleClaimed: () => void;
  isConnectedWallet: boolean;
  isReceiveAble: boolean;
};

const ClaimField: React.FC<IClainFeildProps> = ({
  handleClaimed,
  isConnectedWallet,
  isReceiveAble,
}) => {
  // Notification Smart Contract
  const NotificationConnectWallet: React.FC = () => {
    return (
      <div className={s.noti}>
        <IconSVG src={notiReceive} maxHeight={'44'} maxWidth={'44'} />
        <span>Your wallet is not on the list to receive Soul.</span>
      </div>
    );
  };

  const ContentConnected: React.FC = () => {
    return (
      <div className={`${s.textButton} ${isReceiveAble ? '' : s.false}`}>
        <span>Claim Soul</span>
      </div>
    );
  };
  const ContentNotConnected: React.FC = () => {
    return (
      <div className={s.textButton} onClick={handleClaimed}>
        <span>Connect wallet to claim Souls</span>
      </div>
    );
  };

  return (
    <div className={s.claimField}>
      {isConnectedWallet ? <ContentConnected /> : <ContentNotConnected />}
      {isReceiveAble ? '' : <NotificationConnectWallet />}
    </div>
  );
};

export default ClaimField;
