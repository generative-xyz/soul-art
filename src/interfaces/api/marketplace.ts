import { IAttribute } from '../attributes';
import { IOwnedBNS } from '../bns';
import { ICollection } from './collection';
import { IPagingParams } from './query';
import { ITokenAttributes } from '../token';

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

export interface IInscriptionActivity {
  baseEntity: {
    id: string;
    deletedAt: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
  type: number;
  title: string;
  userAAddress: string | null;
  userBAddress: string | null;
  amount: number;
  erc20Address: string;
  time: string | null;
  inscriptionId: string;
  collectionContract: string;
  offeringId: string;
  blockNumber: number;
  txHash: string;
  logIndex: number;
}
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

export interface ITokenListingForSale {
  id: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt?: string;
  offeringId: string;
  collectionContract: string;
  tokenId: string;
  seller: string;
  erc20Token: string;
  price: string;
  status: number;
  durationTime: number;
  blockNumber: number;
  ownerAddress?: string;
}

export interface ITokenActivity {
  baseEntity: {
    id: string;
    deletedAt: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
  type: number;
  title: string;
  userAAddress: string | null;
  userBAddress: string | null;
  amount: number;
  erc20Address: string;
  time: string | null;
  inscriptionId: string;
  collectionContract: string;
  offeringId: string;
  blockNumber: number;
  txHash: string;
  logIndex: number;
}

export interface ITokenDetail {
  animationFileUrl: string;
  id: string;
  collection: ICollection;
  imageCapture?: string;
  name: string;
  tokenId: string;
  tokenUri: string;
  attributes: ITokenAttributes[];
  metadataType: string;
  contentType: string;
  createdAt: string;
  updatedAt: string;
  mintedAt: number;
  collectionAddress: string;
  owner: string;
  image?: string;
  activities?: ITokenActivity[];
  listingForSales?: ITokenListingForSale[];
  makeOffers?: ITokenOffer[];
  buyable: boolean;
  bnsData?: IOwnedBNS[];
  blockNumber?: number | string;
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
  owner?: string;
}

export interface IGetCollectionNFTListResponse {
  items: IToken[];
  totalItem: number;
}
