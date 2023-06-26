import { IAttribute } from '../attributes';
import { ICollection } from './collection';
import { IPagingParams } from './query';

export interface ISoul {
  deletedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  name: string;
  owner: string;
  tokenUri: string;
  mintedAt: number;
  attributes: IAttribute[];
  metadata: string;
  metadataType: string;
  animationFileUrl: string;
  imageCapture: string;
  tokenId: string;
  tokenIdInt: number;
  isAuction: true;
  blockNumber: string;
  activities: Array<unknown>;
  buyable: boolean;
  collection: ICollection;
  collectionAddress: string;
  contentType: string;
  image: string;
}

export interface IGetSoulHistoryParams extends IPagingParams {
  tokenId: string;
}

export interface IGetSoulHistoryResponse extends IPagingParams {
  items: Array<unknown>;
  total: number;
}
