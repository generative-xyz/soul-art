import { SOUL_CONTRACT } from '@/configs';
import { IGetSoulHistoryParams, ISoulHistoryItem, ISoul } from '@/interfaces/api/soul';
import { IAttribute } from '@/interfaces/attributes';
import { camelCaseKeys } from '@/utils/helpers';
import { constructURL } from '@/utils/url';
import { apiClient } from '.';
import { IToken } from '@/interfaces/api/marketplace';

const API_PATH = '/soul';

export const getSoulsNfts = async ({
  attributes,
  limit = 10,
  page = 1,
  owner = '',
  isShowAll,
  isBigFile,
  sortBy,
  sort,
}: {
  attributes?: string;
  limit?: number;
  page?: number;
  owner?: string;
  isShowAll?: boolean;
  isBigFile?: boolean;
  sortBy?: string;
  sort?: number;
}): Promise<ISoul[]> => {
  const url = constructURL(`${API_PATH}/nfts`, {
    limit,
    page,
    owner,
    allow_empty: isShowAll,
    is_big_file: isBigFile,
    sort_by: sortBy,
    sort,
  });

  const res = await apiClient.get(url, {
    params: {
      attributes: attributes ? encodeURI(attributes) : undefined,
    },
  });

  return Object(camelCaseKeys(res));
};

export const getSoulDetail = async ({
  tokenId,
}: {
  tokenId: string;
}): Promise<IToken> => {
  const res = await apiClient.get(`${API_PATH}/nfts/${tokenId}`);
  return Object(camelCaseKeys(res));
};

export const getSoulAttributes = async (): Promise<IAttribute[]> => {
  const res = await apiClient.get(
    `/marketplace/collections/${SOUL_CONTRACT.toLowerCase()}/attributes`
  );
  return Object(camelCaseKeys(res));
};

export const getListContractNFTsByToken = async (
  token_id: string
): Promise<ISoul[]> => {
  const res = await apiClient.get(
    `/marketplace/collections/${SOUL_CONTRACT.toLowerCase()}/nfts`,
    { params: { token_id } }
  );
  return Object(camelCaseKeys(res));
};

export const getListTokensByWallet = async (
  walletAddress: string
): Promise<{ items: Array<ISoul>; totalItem: number }> => {
  const res = await apiClient.get(
    `/marketplace/collections/${SOUL_CONTRACT}/nfts?owner=${walletAddress}`
  );
  return Object(camelCaseKeys(res));
};

export const getSoulHistories = async (params: IGetSoulHistoryParams): Promise<Array<ISoulHistoryItem>> => {
  const { tokenId } = params;
  const res = await apiClient.get(`marketplace/contract/${SOUL_CONTRACT}/token/${tokenId}/soul_histories`);
  return Object(camelCaseKeys(res));
};
