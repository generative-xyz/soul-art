import SoulAbiJson from '@/abis/soul.json';
import { SOUL_CONTRACT, TRANSFER_TX_SIZE } from '@/configs';
import { AssetsContext } from '@/contexts/assets-context';
import { useContract } from '@/hooks/useContract';
import {
  ContractOperationHook,
  DAppType,
} from '@/interfaces/contract-operation';
import logger from '@/services/logger';
import { formatBTCPrice } from '@/utils/format';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { Transaction } from 'ethers';
import { useCallback, useContext } from 'react';
import * as TC_SDK from 'trustless-computer-sdk';

export interface IFeatureParams {
  tokenId: number;
  feature: string;
  txSuccessCallback?: (_tx: Transaction | null) => Promise<void>;
}

const useUnlockFeature: ContractOperationHook<
  IFeatureParams,
  Transaction | null
> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(SOUL_CONTRACT, SoulAbiJson.abi, true);
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const estimateGas = useCallback(
    async (params: IFeatureParams): Promise<string> => {
      if (account && provider && contract) {
        const { tokenId, feature } = params;
        const gasLimit = await contract.estimateGas.unlockFeature(
          tokenId,
          feature
        );
        const gasLimitBN = new BigNumber(gasLimit.toString());
        const gasBuffer = gasLimitBN.times(1.1).decimalPlaces(0);
        logger.debug('Unlock feature estimate gas', gasBuffer.toString());
        return gasBuffer.toString();
      }
      return '500000';
    },
    [contract, provider, account]
  );

  const call = useCallback(
    async (params: IFeatureParams): Promise<Transaction | null> => {
      if (account && provider && contract) {
        logger.debug('useUnlockFeature', params);

        const { tokenId, feature, txSuccessCallback } = params;

        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: TRANSFER_TX_SIZE,
          feeRatePerByte: feeRate.hourFee,
        });

        const balanceInBN = new BigNumber(btcBalance);
        if (balanceInBN.isLessThan(estimatedFee.totalFee)) {
          throw Error(
            `Insufficient BTC balance. Please top up at least ${formatBTCPrice(
              estimatedFee.totalFee.toString()
            )} BTC.`
          );
        }

        const gasLimit = await estimateGas(params);
        const transaction = await contract
          .connect(provider.getSigner())
          .unlockFeature(tokenId, feature, {
            gasLimit,
          });

        if (txSuccessCallback) {
          await txSuccessCallback(transaction);
        }

        return transaction;
      }

      return null;
    },
    [account, provider, contract, btcBalance, feeRate, estimateGas]
  );

  return {
    // estimateGas: estimateGas,
    call: call,
    dAppType: DAppType.SOUL,
    operationName: 'Unlock Feature',
  };
};

export default useUnlockFeature;
