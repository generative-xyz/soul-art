import { camelCaseKeys } from '@/utils/helpers';
import { apiClient } from '.';
import { constructURL } from '@/utils/url';
import { ISoul } from '@/interfaces/api/soul';

const API_PATH = '/soul';

export const getSoulsNfts = async ({
  limit = 10,
  page = 1,
  owner = '',
  isShowAll,
  isBigFile,
  sortBy,
  sort,
}: {
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

  const res = await apiClient.get(url);
  return Object(camelCaseKeys(res));
};

export const getSoulDetail = async ({
  tokenId,
}: {
  tokenId: string;
}): Promise<ISoul> => {
  const res = await apiClient.get(`${API_PATH}/nfts/${tokenId}`);
  return Object(camelCaseKeys(res));
};
