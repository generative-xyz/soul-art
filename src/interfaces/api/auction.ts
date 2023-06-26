import { AuctionStatus } from "@/enums/soul";
import { IPagingParams } from "./query";

export interface IAuction {
  available: boolean;
  auctionStatus: AuctionStatus;
  highestBid: string;
  endTime: string;
  chainAuctionId: string;
  dbAuctionId: string;
}

export interface IAuctionBidder {
  amount: string;
  sender: string;
  bidderAvatar: string;
  bidderName: string;
  time: string;
}

export interface IGetAuctionDetailParams {
  tokenId: string;
}

export interface IGetBidderListParams extends IPagingParams {
  dbAuctionId: string;
}

export interface IGetBidderListResponse {
  items: Array<IAuctionBidder>;
  total: number;
}