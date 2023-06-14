import { API_URL } from '@/configs';
import { apiClient } from '.';
import { camelCaseKeys } from '@trustless-computer/dapp-core';
import { ICreateSignature, ISignatureResult } from '@/interfaces/api/signature';

const API_PATH = API_URL + '/soul';

export const generateSignature = async (
  payload: ICreateSignature
): Promise<ISignatureResult> => {
  const res = await apiClient.post(`${API_PATH}/signature`, payload);
  return Object(camelCaseKeys(res));
};
