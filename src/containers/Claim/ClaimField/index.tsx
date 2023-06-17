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
  isClaimed: boolean;
  isFetchingApi: boolean;
};

const ClaimField: React.FC<IClainFeildProps> = ({
  handleClaimed,
  handleConnectWallet,
  isConnectedWallet,
  isReceiveAble,
  isWaitingForConfirm,
  isConnecting,
  haveEnoughBalance,
  isClaimed,
  isFetchingApi,
}) => {
  //Notification Smart Contract
  const NotificationConnectWallet: React.FC = () => {
    return (
      <div className={s.noti}>
        <IconSVG src={notiReceive} maxHeight={'44'} maxWidth={'44'} />
        {haveEnoughBalance ? (
          <span>Your wallet is not on the list to receive Soul.</span>
        ) : (
          <span>Your wallet does not have enough balance.</span>
        )}
      </div>
    );
  };

  // console.log('isReceiveAble', isReceiveAble);
  // console.log('haveEnoughBalance', haveEnoughBalance);
  // console.log('isWaitingForConfirm', isWaitingForConfirm);
  // console.log('haveEnoughBalance', haveEnoughBalance);
  // console.log('isConnectedWallet', isConnectedWallet);
  // console.log('isClaimed', isClaimed);

  const ContentConnected: React.FC = () => {
    return isWaitingForConfirm ? (
      <div className={`${s.textButton} ${s.false}`}>
        <span>Claiming...</span>
      </div>
    ) : (
      <div
        className={`${s.textButton} ${
          isReceiveAble && haveEnoughBalance && !isFetchingApi ? '' : s.false
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
        <span>
          Connect wallet{' '}
          <span className={`${isClaimed ? s.hide : ''}`}>to claim Souls</span>
        </span>
      </div>
    );
  };

  return (
    <div className={s.claimField}>
      {isConnectedWallet ? <ContentConnected /> : <ContentNotConnected />}
      {(!isReceiveAble || !haveEnoughBalance) &&
      isConnectedWallet &&
      !isConnecting ? (
        <NotificationConnectWallet />
      ) : null}
    </div>
  );
};

export default ClaimField;
