import { IAttribute } from '../attributes';
import { ICollection } from './collection';

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
  animationFileRrl: string;
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
