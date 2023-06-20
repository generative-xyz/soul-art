import { TC_NETWORK_RPC } from '@/configs';
import Web3 from 'web3';
import { BlockTransactionString } from 'web3-eth';

class CustomWeb3Provider {
  private web3: Web3;

  constructor(rpcEndpoint: string) {
    this.web3 = new Web3(rpcEndpoint);
  }

  async getGasPrice(): Promise<string> {
    const gasPrice = await this.web3.eth.getGasPrice();
    return gasPrice;
  }

  async getBlock(blockNumer: number): Promise<BlockTransactionString> {
    const blockTransaction = await this.web3.eth.getBlock(blockNumer);
    return blockTransaction;
  }
}

const instance = new CustomWeb3Provider(TC_NETWORK_RPC);

export default instance;
