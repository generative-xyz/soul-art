import IconSVG from '@/components/IconSVG';
import s from './style.module.scss';
import { notiReceive } from '@/constants/asset';
type IClainFeildProps = {
  handleClaimed: () => void;
  handleConnectWallet: () => void;
  isConnectedWallet: boolean;
  isReceiveAble: boolean;
  isWaitingForConfirm: boolean;
  isConnecting: boolean;
  haveEnoughBalance: boolean;
};

const ClaimField: React.FC<IClainFeildProps> = ({
  handleClaimed,
  handleConnectWallet,
  isConnectedWallet,
  isReceiveAble,
  isWaitingForConfirm,
  isConnecting,
  haveEnoughBalance,
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
    // console.log('isReceiveAble', isReceiveAble);
    // console.log('haveEnoughBalance', haveEnoughBalance);
    // console.log('isWaitingForConfirm', isWaitingForConfirm);
    // console.log('haveEnoughBalance', haveEnoughBalance);
    // console.log(
    //   'isConnectedWallet',
    //   !isReceiveAble && isConnectedWallet && !isConnecting
    // );
    return isWaitingForConfirm ? (
      <div className={`${s.textButton} ${s.false}`}>
        <span>Claiming...</span>
      </div>
    ) : (
      <div
        className={`${s.textButton} ${
          !isReceiveAble || !haveEnoughBalance ? s.false : ''
        }`}
        onClick={handleClaimed}
      >
        <span>Claim Soul</span>
      </div>
    );

    // <div
    //   className={`${s.textButton} ${isReceiveAble ? '' : s.false}`}
    //   onClick={handleClaimed}
    // >
    //   {isWaitingForConfirm ? <span>Claiming...</span> : <span>Claim Soul</span>}
    // </div>;
    // );
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
      {!isReceiveAble && isConnectedWallet && !isConnecting ? (
        <NotificationConnectWallet />
      ) : null}
    </div>
  );
};

export default ClaimField;
