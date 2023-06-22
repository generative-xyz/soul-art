import {
  IGetCollectionNFTListParams,
  IGetCollectionNFTListResponse,
  ITokenDetail,
} from '@/interfaces/api/marketplace';
import { camelCaseKeys } from '@/utils';
import { constructURL } from '@/utils/url';
import { apiClient } from '.';

const API_PATH = '/marketplace';

export const getCollectionNFTList = async (
  params: IGetCollectionNFTListParams
): Promise<IGetCollectionNFTListResponse> => {
  const { contract_address, ...rest } = params;
  const res = await apiClient.get(
    constructURL(`${API_PATH}/collections/${contract_address}/nfts`, rest)
  );
  return Object(camelCaseKeys(res));
};

export const getNFTDetail = async ({
  contractAddress,
  tokenId,
}: {
  contractAddress: string;
  tokenId: string;
}): Promise<ITokenDetail> => {
  const res = await apiClient.get(
    `${API_PATH}/collections/${contractAddress}/nfts/${tokenId}`
  );
  return Object(camelCaseKeys(res));
};
