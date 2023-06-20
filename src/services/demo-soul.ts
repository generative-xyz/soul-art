import { camelCaseKeys } from '@/utils/helpers';
import { demoApiClient } from '.';
import { constructURL } from '@/utils/url';
import { ISoul } from '@/interfaces/api/soul';
import { IAttribute } from '@/interfaces/attributes';

const API_PATH = '/collections/0x9841faa1133da03b9ae09e8daa1a725bc15575f0';

export const getSoulDemoAttributes = async (): Promise<IAttribute[]> => {
  const res = await demoApiClient.get(`${API_PATH}/attributes`);
  return Object(camelCaseKeys(res));
};

export const getSoulDemoDetail = async ({
  tokenId,
}: {
  tokenId: string;
}): Promise<ISoul> => {
  const res = await demoApiClient.get(`${API_PATH}/nfts/${tokenId}`);
  return Object(camelCaseKeys(res));
};

export const getDemoSoulsNfts = async ({
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

  const res = await demoApiClient.get<
    any,
    { items: ISoul[]; total_item: number }
  >(url, {
    params: {
      attributes: attributes,
    },
  });
  return Object(camelCaseKeys(res.items));
};
