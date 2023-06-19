import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// Load the UTC plugins
dayjs.extend(utc);

function useTimeComparison(targetTime: string) {
  const [comparisonResult, setComparisonResult] = useState<null | number>(null);

  useEffect(() => {
    const compareTime = () => {
      // Convert the target time to UTC time
      const targetTimeUtc = dayjs.utc(targetTime);

      // Create a Day.js object for the current local time
      const currentLocalTime = dayjs().utc();

      // Compare the two times and update the state
      if (currentLocalTime.isBefore(targetTimeUtc)) {
        setComparisonResult(-1);
      } else if (currentLocalTime.isAfter(targetTimeUtc)) {
        setComparisonResult(1);
      } else {
        setComparisonResult(0);
      }
    };

    compareTime();

    const interval = setInterval(() => {
      compareTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return comparisonResult;
}

export default useTimeComparison;
