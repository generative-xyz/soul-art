import IconSVG from '@/components/IconSVG';
import s from './style.module.scss';
import { successIcon, waitIcon } from '@/constants/asset';
import React from 'react';

type IStatusProps = {
  type: string;
};

const Status: React.FC<IStatusProps> = ({ type }) => {
  const Received = () => {
    return (
      <div className={s.received}>
        <IconSVG src={successIcon} maxHeight={'16'} maxWidth={'16'} />
        <span>Received</span>
      </div>
    );
  };

  const Waiting = () => {
    return (
      <div className={s.wait}>
        <IconSVG src={waitIcon} maxHeight={'15'} maxWidth={'15'} />
        <span>Waiting...</span>
      </div>
    );
  };

  return (
    <div className={s.status}>
      {type === 'success' ? <Received /> : ''}
      {type === 'waiting' ? <Waiting /> : ''}
    </div>
  );
};

export default React.memo(Status);
