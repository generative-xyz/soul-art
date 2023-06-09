import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { isAddress } from '@ethersproject/address';
import type { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';

function getProviderOrSigner(provider: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(provider, account) : provider;
}

function getSigner(provider: JsonRpcProvider, account: string): JsonRpcSigner {
  return provider.getSigner(account);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getContract(address: string, ABI: any, provider: JsonRpcProvider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Contract(address, ABI, getProviderOrSigner(provider, account) as any);
}
