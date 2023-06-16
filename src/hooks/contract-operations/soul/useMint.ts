import SoulJson from '@/abis/soul.json';
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

export interface IClaimParams {
  address: string;
  totalGM: number;
  signature: string;

  txSuccessCallback?: (_tx: Transaction | null) => Promise<void>;
}

const useSoul: ContractOperationHook<IClaimParams, Transaction | null> = () => {
  const contract = useContract(SOUL_CONTRACT, SoulJson.abi, true);
  const { btcBalance, feeRate } = useContext(AssetsContext);
  const { account, provider } = useWeb3React();

  const estimateGas = useCallback(
    async (params: IClaimParams): Promise<string> => {
      if (account && provider && contract) {
        const { address, totalGM, signature } = params;
        const gasLimit = await contract.estimateGas.mint(
          address,
          totalGM,
          signature
        );
        const gasLimitBN = new BigNumber(gasLimit.toString());
        const gasBuffer = gasLimitBN.times(1.1).decimalPlaces(0);
        logger.debug('useMint estimate gas', gasBuffer.toString());
        return gasBuffer.toString();
      }
      return '500000';
    },
    [contract, provider, account]
  );
  const call = useCallback(
    async (params: IClaimParams): Promise<Transaction | null> => {
      if (account && provider && contract) {
        logger.debug('useMint', params);

        const { address, txSuccessCallback } = params;

        const tcTxSizeByte = TRANSFER_TX_SIZE;

        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: tcTxSizeByte,
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

        const gasLimit = await estimateGas({
          address,
          totalGM: params.totalGM,
          signature: params.signature,
        });

        const transaction = await contract
          .connect(provider.getSigner())
          .mint(address, params.totalGM, params.signature, {
            gasLimit: gasLimit,
          });

        if (txSuccessCallback) {
          await txSuccessCallback(transaction);
        }

        return transaction;
      }

      return null;
    },
    [account, provider, contract, btcBalance, feeRate]
  );

  return {
    call: call,
    estimateGas: estimateGas,
    dAppType: DAppType.SOUL,
    operationName: 'Soul',
  };
};

export default useSoul;