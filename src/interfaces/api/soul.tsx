export interface ISoul {
  deleted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  owner: string;
  tokenUri: string;
  image?: string;
  mintedAt: string;
  attributes: [{ traitType: string; value: string }];
  metadata: string;
  metadata_type: string;
  animation_file_url: string;
  image_capture: string;
  collection_address: string;
  tokenId: string;
  tokenIdInt: number;
  is_auction: true;
}
