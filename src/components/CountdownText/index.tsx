import React, { ReactElement } from 'react';
import s from './styles.module.scss';
import {
  CLAIM_START_TIME
} from '@/configs';
import cs from 'classnames';
import useCountdown from '@/hooks/useCountdown';

interface IProps {
  className?: string;
}

const CountdownText: React.FC<IProps> = ({ className }: IProps): ReactElement => {
  const { hours, minutes, seconds } = useCountdown(
    CLAIM_START_TIME,
  );

  return (
    <span className={cs(s.countdownText, className)}>
      {`${hours !== null ? `${hours}h` : '--'} : ${minutes !== null ? `${minutes}m` : '--'
        } : ${seconds !== null ? `${seconds}s` : '--'}`}
    </span>
  );
};

export default React.memo(CountdownText);
