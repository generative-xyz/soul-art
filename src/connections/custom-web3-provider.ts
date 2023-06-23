import SoulAbiJson from '@/abis/soul.json';
import { SOUL_CONTRACT, TC_NETWORK_RPC } from '@/configs';
import Web3 from 'web3';
import { BlockTransactionString } from 'web3-eth';
import { AbiItem } from 'web3-utils';
import ERC20AbiJson from '@/abis/erc20.json';
import BigNumber from 'bignumber.js';
import logger from '@/services/logger';

class CustomWeb3Provider {
  private web3: Web3;

  constructor(rpcEndpoint: string) {
    this.web3 = new Web3(rpcEndpoint);
  }

  async getGasPrice(): Promise<string> {
    const gasPrice = await this.web3.eth.getGasPrice();
    return gasPrice;
  }

  async getBlock(blockNumber: number): Promise<BlockTransactionString> {
    const blockTransaction = await this.web3.eth.getBlock(blockNumber);
    return blockTransaction;
  }

  async getCurrentBlockNumber(): Promise<number> {
    const blockNumber = await this.web3.eth.getBlockNumber();
    return blockNumber;
  }

  async calculateAverageBlockTime(): Promise<number> {
    const latestBlockNumber = await this.web3.eth.getBlockNumber();
    const numBlocksToAverage = 50;
    let totalBlockTime = 0;

    for (
      let i = latestBlockNumber;
      i > latestBlockNumber - numBlocksToAverage;
      i--
    ) {
      const block = await this.getBlock(i);

      if (block && block.timestamp) {
        const previousBlock = await this.getBlock(i - 1);
        if (previousBlock && previousBlock.timestamp) {
          totalBlockTime +=
            (block.timestamp as number) - (previousBlock.timestamp as number);
        }
      }
    }

    const averageBlockTime = totalBlockTime / numBlocksToAverage;
    return averageBlockTime;
  }

  async getErc20Balance(
    erc20Address: string,
    walletAddress: string
  ): Promise<BigNumber> {
    try {
      const tokenContract = new this.web3.eth.Contract(
        ERC20AbiJson.abi as Array<AbiItem>,
        erc20Address
      );
      const balance = await tokenContract.methods
        .balanceOf(walletAddress)
        .call();

      return new BigNumber(balance.toString());
    } catch (err: unknown) {
      logger.error(err);
      return new BigNumber('0');
    }
  }

  async getSettingFeatures(): Promise<string[]> {
    try {
      const contract = new this.web3.eth.Contract(
        SoulAbiJson.abi as Array<AbiItem>,
        SOUL_CONTRACT
      );
      const res = await contract.methods.getSettingFeatures().call();
      console.log(
        '🚀 ~ CustomWeb3Provider ~ getSettingFeatures ~ features:',
        res
      );
      return features;
    } catch (err: unknown) {
      logger.error(err);
      return [];
    }
  }
}

const instance = new CustomWeb3Provider(TC_NETWORK_RPC);

export default instance;
