import { IAttribute } from '../attributes';
import { IOwnedBNS } from '../bns';
import { ICollection } from './collection';
import { IPagingParams } from './query';

export interface ITokenOffer {
  id: string;
  deletedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  offeringId: string;
  collectionContract: string;
  tokenId: string;
  buyer: string;
  erc20Token: string;
  price: number;
  status: number;
  durationTime: number;
  blockNumber: number;
  ownerAddress: string | null;
}

export interface IErc20PriceInfo {
  offeringId: string;
  tokenId: string;
  erc20Token: string;
  price: string;
}

export interface ITokenSaleInfo {
  id: string;
  createdAt: string;
  offeringId: string;
  collectionContract: string;
  tokenId: string;
  seller: string;
  erc20Token: string;
  price: string;
  status: number;
  blockNumber: number;
  durationTime: string;
}

export interface IToken {
  animationFileUrl?: string;
  collectionAddress: string;
  tokenId: string;
  contentType: string;
  name: string;
  owner: string;
  tokenUri: string;
  image: string;
  mintedAt: number;
  listingForSales: Array<ITokenSaleInfo>;
  makeOffers?: ITokenOffer[];
  buyable: boolean;
  priceErc20: IErc20PriceInfo;
  collection: ICollection;
  size: number;
  imageCapture?: string;
  bnsData?: IOwnedBNS[];
  deleted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  attributes: IAttribute[];
  metadata: string;
  metadata_type: string;
  animation_file_url: string;
  image_capture: string;
  collection_address: string;
  tokenIdInt: number;
  is_auction: true;
}

export interface IGetCollectionNFTListParams extends IPagingParams {
  rarity?: string;
  price?: string;
  attributes?: string;
  token_id?: string;
  is_big_file?: boolean;
  sort_by?: string;
  sort?: number;
  contract_address: string;
  buyable?: boolean;
  from_price?: string;
  to_price?: string;
}

export interface IGetCollectionNFTListResponse {
  items: IToken[];
  totalItem: number;
}
