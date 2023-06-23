
import { IAuction, IGetAuctionDetailParams, IGetBidderListParams, IGetBidderListResponse } from '@/interfaces/api/auction';
import { apiClient } from '.';
import { camelCaseKeys } from '@/utils';
import { SOUL_CONTRACT } from '@/configs';
import queryString from 'query-string';

const API_PATH = '/auction';

export const getAuctionDetail = async (params: IGetAuctionDetailParams): Promise<IAuction> => {
  const { tokenId } = params;
  const res = await apiClient.get(`${API_PATH}/detail/${SOUL_CONTRACT}/${tokenId}`);
  return Object(camelCaseKeys(res));
}

export const getBidderList = async (params: IGetBidderListParams): Promise<IGetBidderListResponse> => {
  const { dbAuctionId, ...rest } = params;
  const qs = queryString.stringify(rest);
  const res = await apiClient.get(`${API_PATH}/list-bid/${dbAuctionId}?${qs}`);
  return Object(camelCaseKeys(res));
}
