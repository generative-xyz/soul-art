import IconSVG from '@/components/IconSVG';
import s from './style.module.scss';
import { notiReceive } from '@/constants/asset';
type IClainFeildProps = {
  handleClaimed: () => void;
  handleConnectWallet: () => void;
  isConnectedWallet: boolean;
  isReceiveAble: boolean;
  isWaitingForConfirm: boolean;
};

const ClaimField: React.FC<IClainFeildProps> = ({
  handleClaimed,
  handleConnectWallet,
  isConnectedWallet,
  isReceiveAble,
  isWaitingForConfirm,
}) => {
  //Notification Smart Contract
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
      <div
        className={`${s.textButton} ${isReceiveAble ? '' : s.false}`}
        onClick={handleClaimed}
      >
        {isWaitingForConfirm ? (
          <span>Wait for your confirmation...</span>
        ) : (
          <span>Claim Soul</span>
        )}
      </div>
    );
  };
  const ContentNotConnected: React.FC = () => {
    return (
      <div className={s.textButton} onClick={handleConnectWallet}>
        <span>Connect wallet to claim Souls</span>
      </div>
    );
  };

  return (
    <div className={s.claimField}>
      {isConnectedWallet ? <ContentConnected /> : <ContentNotConnected />}
      {!isReceiveAble && isConnectedWallet ? (
        <NotificationConnectWallet />
      ) : null}
    </div>
  );
};

export default ClaimField;
