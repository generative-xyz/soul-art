
import { IAuction, IGetAuctionDetailParams } from '@/interfaces/api/auction';
import { apiClient } from '.';
import { camelCaseKeys } from '@/utils';
import { SOUL_CONTRACT } from '@/configs';

const API_PATH = '/auction';

export const getAuctionDetail = async (params: IGetAuctionDetailParams): Promise<IAuction> => {
  const { tokenId } = params;
  const res = await apiClient.get(`${API_PATH}/detail/${SOUL_CONTRACT}/${tokenId}`);
  return Object(camelCaseKeys(res));
}
