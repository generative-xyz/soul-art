import { AuctionStatus } from "@/enums/soul";
import { IPagingParams } from "./query";

export interface IAuction {
  available: boolean;
  auctionStatus: AuctionStatus;
  highestBid: string;
  endTime: string;
  chainAuctionId: string;
  dbAuctionId: string;
  highestBidder: string;
  highestBidderAvatar?: string;
  highestBidderName?: string
}

export interface IAuctionBid {
  amount: string;
  sender: string;
  bidderAvatar: string;
  bidderName: string;
  blockNumber: string;
  time: string;
  imageCapture: string;
  owner: string;
  ranking: number;
  tokenId: string;
  attributes: Array<{
    percent: number;
    traitType: string;
  }>;
  auction: {
    auctionId: string;
    createdAt: string;
    startTimeBlock: string;
    endTimeBlock: string;
    id: string;
    status: AuctionStatus;
    totalAmount: string;
    winner: string;
  };
}

export interface IGetAuctionDetailParams {
  tokenId: string;
}

export interface IGetBidderListParams extends IPagingParams {
  dbAuctionID?: string;
  owner?: string;
}

export interface IGetBidderListResponse {
  items: Array<IAuctionBid>;
  total: number;
}