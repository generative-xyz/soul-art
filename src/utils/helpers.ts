import camelCase from 'lodash/camelCase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const camelCaseKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelCaseKeys(v));
  }
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelCaseKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

export const sleep = (ms: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};