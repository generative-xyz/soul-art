import React, { ReactElement } from 'react';
import s from './styles.module.scss';
import {
  CLAIM_START_TIME
} from '@/configs';
import cs from 'classnames';
import useCountdown from '@/hooks/useCountdown';

interface IProps {
  className?: string;
  countDownTo: string; // format similar to '2023-06-22 14:00:00'
}

const CountdownText: React.FC<IProps> = ({ className, countDownTo }: IProps): ReactElement => {
  const { hours, minutes, seconds } = useCountdown(
    countDownTo,
  );

  return (
    <span className={cs(s.countdownText, className)}>
      {`${hours !== null ? `${hours}h` : '--'} : ${minutes !== null ? `${minutes}m` : '--'
        } : ${seconds !== null ? `${seconds}s` : '--'}`}
    </span>
  );
};

export default React.memo(CountdownText);
