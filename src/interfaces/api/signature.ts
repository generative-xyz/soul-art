export interface ICreateSignature {
  wallet_address?: string;
}

export interface ISignatureResult {
  signature: string;
  message_hash: string;
  gm: string;
}
