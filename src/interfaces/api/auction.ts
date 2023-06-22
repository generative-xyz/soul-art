import { AuctionStatus } from "@/enums/soul";

export interface IAuction {
  available: boolean;
  auctionStatus: AuctionStatus;
  highestBid: string;
  endTime: string;
}

export interface IGetAuctionDetailParams {
  tokenId: string;
}
