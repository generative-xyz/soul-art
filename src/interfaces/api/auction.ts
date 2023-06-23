import { AuctionStatus } from "@/enums/soul";

export interface IAuction {
  available: boolean;
  auctionStatus: AuctionStatus;
  highestBid: string;
  endTime: string;
  chainAuctionId: string;
  dbAuctionId: string;
}

export interface IGetAuctionDetailParams {
  tokenId: string;
}
