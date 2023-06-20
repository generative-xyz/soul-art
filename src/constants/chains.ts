import { APP_ENV, TC_CHAIN_ID, TC_EXPLORER_URL, TC_NETWORK_RPC } from '@/configs';

export enum SupportedChainId {
  MAINNET = 1,
  GOERLI = 5,
  POLYGON_MUMBAI = 80001,
  TRUSTLESS_COMPUTER = TC_CHAIN_ID,
};

const TC_NAME = APP_ENV === 'production' ? 'Trustless Computer' : 'TC Dev';

export const TRUSTLESS_COMPUTER_CHAIN_INFO = {
  name: TC_NAME,
  title: '',
  chain: 'TC',
  icon: '',
  rpc: [TC_NETWORK_RPC],
  faucets: [],
  nativeCurrency: {
    name: 'TC',
    symbol: 'TC',
    decimals: 18,
  },
  infoURL: 'https://trustless.computer',
  shortName: 'TC',
  chainId: SupportedChainId.TRUSTLESS_COMPUTER,
  networkId: SupportedChainId.TRUSTLESS_COMPUTER,
  slip44: 0,
  explorers: [
    {
      name: 'Trustless computer explorer',
      url: TC_EXPLORER_URL,
      standard: 'EIP3091',
    },
  ],
  ens: {
    registry: '',
  },
};
