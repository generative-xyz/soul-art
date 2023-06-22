/* eslint-disable @typescript-eslint/no-non-null-assertion */

// App configs
export const APP_ENV: string = process.env.NEXT_PUBLIC_APP_ENV!;
export const API_URL: string = process.env.NEXT_PUBLIC_API_URL!;
export const TC_NETWORK_RPC: string = process.env.NEXT_PUBLIC_TC_NETWORK_RPC!;
export const CDN_URL: string = process.env.NEXT_PUBLIC_CDN_URL!;
export const TC_CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
export const TC_EXPLORER_URL: string = process.env.NEXT_PUBLIC_TC_EXPLORER!;

// Contract configs
export const SOUL_CONTRACT: string = process.env.NEXT_PUBLIC_SOUL_CONTRACT!;
export const GM_CONTRACT: string = process.env.NEXT_PUBLIC_GM_CONTRACT!;
export const GM_ADDRESS: string = process.env.NEXT_PUBLIC_GM_CONTRACT!;

export const TC_URL: string = process.env.NEXT_PUBLIC_TC_WEB_URL!;
export const TRANSFER_TX_SIZE = 1000;
export const MULTIPART_CHUNK_SIZE = 32000000; // 32Mb

// Event
export const CLAIM_START_TIME = '2023-07-06 14:00:00';

/* eslint-enable @typescript-eslint/no-non-null-assertion */
