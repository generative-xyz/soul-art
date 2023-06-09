import dayjs from 'dayjs';
import isNumber from 'lodash/isNumber';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const FORMAT_PATTERN = 'DD MMM hh:mm A';

interface IFormatDate {
  dateTime: number | string;
  formatPattern?: string;
}

export const formatDateTime = ({ dateTime, formatPattern = FORMAT_PATTERN }: IFormatDate) => {
  return dayjs(dateTime).utc().format(formatPattern);
}

export const formatTimeStamp = (timestamp: number) => new Date(timestamp).toISOString().replace('T', ' ').replace('.000Z', '');

interface IUnixExpired {
  unixTime: number | string | undefined;
  expiredMin?: number;
}

export const isExpiredUnixTime = ({ unixTime, expiredMin = 1 }: IUnixExpired) => {
  if (!unixTime || !isNumber(unixTime)) return false;
  const now = Math.floor(new Date().getTime() / 1000);
  expiredMin = expiredMin * 60;
  return now - Number(unixTime) > expiredMin;
};

interface IExpired {
  time: number | string | undefined;
  expiredMin?: number;
}

export const isExpiredTime = ({ time, expiredMin = 1 }: IExpired) => {
  if (!time || !isNumber(time)) return false;
  const now = Math.floor(new Date().getTime());
  expiredMin = expiredMin * 60;
  return now - Number(time) > expiredMin;
};

export function getCurrentUnixTimestamp() {
  return Math.floor(Date.now() / 1000);
}