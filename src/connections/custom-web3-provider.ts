import SoulAbiJson from '@/abis/soul.json';
import { SOUL_CONTRACT, TC_NETWORK_RPC } from '@/configs';
import Web3 from 'web3';
import { BlockTransactionString } from 'web3-eth';
import { AbiItem } from 'web3-utils';
import ERC20AbiJson from '@/abis/erc20.json';
import BigNumber from 'bignumber.js';
import logger from '@/services/logger';
import { FeatureStatus } from '@/constants/feature';

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

  async getMintedBlock(tokenId: number): Promise<number> {
    const contract = new this.web3.eth.Contract(
      SoulAbiJson.abi as Array<AbiItem>,
      SOUL_CONTRACT
    );
    const blockNumber = await contract.methods._mintAt(tokenId).call();
    return blockNumber;
  }

  async getLastSettleBlock(tokenId: number): Promise<number> {
    const contract = new this.web3.eth.Contract(
      SoulAbiJson.abi as Array<AbiItem>,
      SOUL_CONTRACT
    );
    const blockNumber = await contract.methods._lastSettle(tokenId).call();
    return blockNumber;
  }

  async calculateAverageBlockTime(): Promise<number> {
    const latestBlockNumber = await this.web3.eth.getBlockNumber();
    const numBlocksToAverage = 50;
    let totalBlockTime = 0;

    const blockPromises = [];
    for (
      let i = latestBlockNumber;
      i > latestBlockNumber - numBlocksToAverage;
      i--
    ) {
      blockPromises.push(this.getBlock(i));
    }

    const blocks = await Promise.all(blockPromises);

    for (let i = 1; i < blocks.length; i++) {
      const block = blocks[i];
      const previousBlock = blocks[i - 1];

      if (
        block &&
        block.timestamp &&
        previousBlock &&
        previousBlock.timestamp
      ) {
        totalBlockTime += Math.abs(
          (block.timestamp as number) - (previousBlock.timestamp as number)
        );
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

  async getSettingFeatures(): Promise<{
    features: string[];
    balances: number[];
    holdTimes: number[];
  } | null> {
    try {
      const contract = new this.web3.eth.Contract(
        SoulAbiJson.abi as Array<AbiItem>,
        SOUL_CONTRACT
      );
      const res = await contract.methods.getSettingFeatures().call();
      return res;
    } catch (err: unknown) {
      logger.error(err);
      return null;
    }
  }

  async getFeaturesStatus({
    tokenId,
    owner,
    featureList,
  }: {
    tokenId: string;
    owner: string;
    featureList: string[];
  }): Promise<FeatureStatus[] | null> {
    try {
      const contract = new this.web3.eth.Contract(
        SoulAbiJson.abi as Array<AbiItem>,
        SOUL_CONTRACT
      );

      const featureStatus = await Promise.all(
        featureList.map(async feature => {
          const checkCanUnlock = await contract.methods
            .canUnlockFeature(tokenId, owner, feature)
            .call();
          const checkIsUnlocked = await contract.methods
            ._features(tokenId, owner, feature)
            .call();

          if (!checkCanUnlock && checkIsUnlocked)
            return FeatureStatus['Unlocked'];
          if (checkCanUnlock && !checkIsUnlocked)
            return FeatureStatus['Available'];
          return FeatureStatus['Locked'];
        })
      );

      return featureStatus;
    } catch (err: unknown) {
      logger.error(err);
      return null;
    }
  }
}

const instance = new CustomWeb3Provider(TC_NETWORK_RPC);

export default instance;
