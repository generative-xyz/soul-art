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

export interface IDepositParams {
  amount: string;
  txSuccessCallback?: (_tx: Transaction | null) => Promise<void>;
}

const useDeposit: ContractOperationHook<IDepositParams, Transaction | null> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(SOUL_CONTRACT, SoulAbiJson.abi, true);
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const estimateGas = useCallback(
    async (): Promise<string> => {
      return '500000';
    },
    []
  );

  const call = useCallback(
    async (params: IDepositParams): Promise<Transaction | null> => {
      if (account && provider && contract) {
        logger.debug('useDeposit', params);

        const { amount, txSuccessCallback } = params;

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

        const gasLimit = await estimateGas();
        const transaction = await contract
          .connect(provider.getSigner())
          .deposit(amount, {
            gasLimit,
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
    estimateGas: estimateGas,
    call: call,
    dAppType: DAppType.SOUL,
    operationName: 'Deposit',
  };
};

export default useDeposit;
