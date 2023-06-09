import { TAPROOT_ADDRESS } from '@/constants/storage-key';

class BitCoinStorage {
  private getUserTaprootKey = (evmAddress: string) => {
    return `${TAPROOT_ADDRESS}-${evmAddress.toLowerCase()}`;
  };

  getUserTaprootAddress = (evmAddress: string): string | null => {
    const key = this.getUserTaprootKey(evmAddress);
    return localStorage.getItem(key);
  };

  setUserTaprootAddress = (evmAddress: string, taprootAddress: string) => {
    const key = this.getUserTaprootKey(evmAddress);
    return localStorage.setItem(key, taprootAddress);
  };

  removeUserTaprootAddress = (evmAddress: string) => {
    const key = this.getUserTaprootKey(evmAddress);
    return localStorage.removeItem(key);
  };
}

const instance = new BitCoinStorage();

export default instance;
