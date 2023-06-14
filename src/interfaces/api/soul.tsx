export interface ISoul {
  deleted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  owner: string;
  token_uri: string;
  image?: string;
  minted_at: string;
  attributes: [{ traitType: string; value: string }];
  metadata: string;
  metadata_type: string;
  animation_file_url: string;
  image_capture: string;
  collection_address: string;
  token_id: string;
  token_id_int: number;
  is_auction: true;
}
