import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { zeroPad } from '@/utils/format';

dayjs.extend(utc);
dayjs.extend(duration);

const useCountdown = (utcTime: string) => {
  const [hours, setHours] = useState<number | null>(0);
  const [minutes, setMinutes] = useState<number | null>(0);
  const [seconds, setSeconds] = useState<number | null>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs().utc();
      const diff = dayjs.duration(dayjs.utc(utcTime).diff(now));
      const diffHour = diff.hours() + diff.days() * 24;
      const diffMin = diff.minutes();
      const diffSec = diff.seconds();
      setHours(diffHour > 0 ? diffHour : 0);
      setMinutes(diffMin > 0 ? diffMin : 0);
      setSeconds(diffSec > 0 ? diffSec : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [utcTime]);

  return {
    hours,
    minutes: minutes !== null ? zeroPad(minutes, 2) : null,
    seconds: seconds !== null ? zeroPad(seconds, 2) : null,
  };
};

export default useCountdown;
