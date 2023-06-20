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

  async calculateAverageBlockTime(): Promise<number> {
    const latestBlockNumber = await this.web3.eth.getBlockNumber();
    const numBlocksToAverage = 1000;
    let totalBlockTime = 0;

    for (let i = latestBlockNumber; i > latestBlockNumber - numBlocksToAverage; i--) {
      const block = await this.getBlock(i);

      if (block && block.timestamp) {
        const previousBlock = await this.getBlock(i - 1);
        if (previousBlock && previousBlock.timestamp) {
          totalBlockTime += (block.timestamp as number) - (previousBlock.timestamp as number);
        }
      }
    }

    const averageBlockTime = totalBlockTime / numBlocksToAverage;
    return averageBlockTime;
  }
}

const instance = new CustomWeb3Provider(TC_NETWORK_RPC);

export default instance;
