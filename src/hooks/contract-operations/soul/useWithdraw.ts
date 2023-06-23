import SoulAbiJson from '@/abis/soul.json';
import { GM_ADDRESS, SOUL_CONTRACT, TRANSFER_TX_SIZE } from '@/configs';
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

const useWithdraw: ContractOperationHook<unknown, Transaction | null> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(SOUL_CONTRACT, SoulAbiJson.abi, true);
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const estimateGas = useCallback(
    async (): Promise<string> => {
      if (account && provider && contract) {
        const gasLimit = await contract.estimateGas.withdraw(GM_ADDRESS, {
          from: account,
        });
        const gasLimitBN = new BigNumber(gasLimit.toString());
        const gasBuffer = gasLimitBN.times(1.1).decimalPlaces(0);
        logger.debug('Estimated gas', gasBuffer.toString());
        return gasBuffer.toString();
      }
      return '500000';
    },
    [contract, provider, account]
  );

  const call = useCallback(
    async (): Promise<Transaction | null> => {
      if (account && provider && contract) {
        logger.debug('useDeposit');

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
          .withdraw(GM_ADDRESS, {
            gasLimit,
            from: account,
          });

        return transaction;
      }

      return null;
    },
    [account, provider, contract, btcBalance, feeRate, estimateGas]
  );

  return {
    estimateGas: estimateGas,
    call: call,
    dAppType: DAppType.SOUL,
    operationName: 'Withdraw',
  };
};

export default useWithdraw;
