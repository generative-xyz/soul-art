export interface ICreateSignature {
  wallet_address?: string;
}

export interface ISignatureResult {
  signature: string;
  messageHash: string;
  gm: string;
}
