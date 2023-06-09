import dayjs from 'dayjs';
import isNumber from 'lodash/isNumber';

const FORMAT_PATTERN = 'DD MMM hh:mm A';

interface IFormatDate {
  dateTime: number | string;
  formatPattern?: string;
}

const formatDateTime = ({ dateTime, formatPattern = FORMAT_PATTERN }: IFormatDate) =>
  dayjs(dateTime).format(formatPattern);

const formatTimeStamp = (timestamp: number) => new Date(timestamp).toISOString().replace('T', ' ').replace('.000Z', '');

interface IUnixExpired {
  unixTime: number | string | undefined;
  expiredMin?: number;
}

const isExpiredUnixTime = ({ unixTime, expiredMin = 1 }: IUnixExpired) => {
  if (!unixTime || !isNumber(unixTime)) return false;
  const now = Math.floor(new Date().getTime() / 1000);
  expiredMin = expiredMin * 60;
  return now - Number(unixTime) > expiredMin;
};

interface IExpired {
  time: number | string | undefined;
  expiredMin?: number;
}

const isExpiredTime = ({ time, expiredMin = 1 }: IExpired) => {
  if (!time || !isNumber(time)) return false;
  const now = Math.floor(new Date().getTime());
  expiredMin = expiredMin * 60;
  return now - Number(time) > expiredMin;
};

function getCurrentUnixTimestamp() {
  return Math.floor(Date.now() / 1000);
}

export {
  formatDateTime,
  isExpiredUnixTime,
  isExpiredTime,
  getCurrentUnixTimestamp,
  formatTimeStamp,
};