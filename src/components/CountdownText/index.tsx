import React, { ReactElement } from 'react';
import s from './styles.module.scss';
import cs from 'classnames';
import useCountdown from '@/hooks/useCountdown';

interface IProps {
  className?: string;
  countDownTo: string; // format similar to '2023-06-22 14:00:00'
  showDay?: boolean;
}

const CountdownText: React.FC<IProps> = ({ className, countDownTo, showDay = false }: IProps): ReactElement => {
  const { days, totalHours, hours, minutes, seconds } = useCountdown(
    countDownTo,
  );
  const displayDay = showDay || (totalHours !== null && totalHours > 72);

  return (
    <span className={cs(s.countdownText, className)}>
      {displayDay && (
        <>
          {`${days !== null ? `${days}d` : '--'} : ${hours !== null ? `${hours}h` : '--'} : ${minutes !== null ? `${minutes}m` : '--'
            }`}
        </>
      )}
      {!displayDay && (
        <>
          {`${totalHours !== null ? `${totalHours}h` : '--'} : ${minutes !== null ? `${minutes}m` : '--'
            } : ${seconds !== null ? `${seconds}s` : '--'}`}
        </>
      )}
    </span>
  );
};

export default React.memo(CountdownText);
