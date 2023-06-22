import { User } from './user';

export type Token = {
  thumbnail?: string;
  name: string;
  description: string;
  image: string;
  animationUrl: string;
  animation_url: string;
  attributes: Array<unknown>;
  genNFTAddr: string;
  owner: User;
  project: unknown;
  mintedTime: string;
  creatorProfile?: User;
  ownerAddr: string;
  creator: User;
  tokenID: string;
  inscriptionIndex: string;
  buyable: boolean;
  isCompleted: boolean;
  priceBTC: string;
  priceETH: string;
  priceBrc20: {
    address: string;
    value: string;
    offering_id: string;
  };
  orderInscriptionIndex: string;
  orderID: string;
  projectID?: string;
  projectName?: string;
  is_minting?: boolean;
  minting_info?: {
    token_id: string;
    all: number;
    pending: number;
    done: number;
  };
  stats: {
    price: string;
  };
  animationHtml: string;
  listingDetail?: {
    paymentListingInfo: {
      btc: {
        paymentAddress: string;
        price: string;
      };
      eth?: {
        paymentAddress: string;
        price: string;
      };
    };
  };
  seed: string;
  ordinalsData?: {
    sat: string;
    contentLength: string;
    contentType: string;
    timestamp: string;
    block: string;
  };
  nftTokenId?: string;
  sell_verified: boolean;
  tokenIDData: string;
};

export interface ITokenAttributes {
  count: number;
  percent: number;
  total: number;
  traitType: string;
  value: string;
}
