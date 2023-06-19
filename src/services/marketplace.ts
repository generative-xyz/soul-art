import {
  IGetCollectionNFTListParams,
  IGetCollectionNFTListResponse,
} from '@/interfaces/api/marketplace';
import { camelCaseKeys } from '@/utils';
import { constructURL } from '@/utils/url';
import { apiClient } from '.';

const API_PATH = '/marketplace';

export const getCollectionNFTList = async (
  params: IGetCollectionNFTListParams
): Promise<IGetCollectionNFTListResponse> => {
  const { contract_address, ...rest } = params;
  //   const qs = queryString.stringify(rest);
  const res = await apiClient.get(
    constructURL(`${API_PATH}/collections/${contract_address}/nfts`, rest)
  );
  return Object(camelCaseKeys(res));
};
