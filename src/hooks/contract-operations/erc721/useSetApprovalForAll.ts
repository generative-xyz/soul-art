import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import Erc721AbiJson from '@/abis/erc721.json';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useContext } from 'react';
import logger from '@/services/logger';
import { Transaction } from 'ethers';
import { TRANSFER_TX_SIZE } from '@/configs';
import BigNumber from 'bignumber.js';
import * as TC_SDK from 'trustless-computer-sdk';
import { formatBTCPrice } from '@/utils/format';
import { AssetsContext } from '@/contexts/assets-context';
import { getContract } from '@/utils';

export interface ISetApprovalForAllParams {
  operator: string;
  contractAddress: string;
}

const useSetApprovalForAll: ContractOperationHook<
  ISetApprovalForAllParams,
  Transaction | null
> = () => {
  const { account, provider } = useWeb3React();
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const estimateGas = useCallback(
    async (params: ISetApprovalForAllParams): Promise<string> => {
      const { operator, contractAddress } = params;
      if (account && provider) {
        const contract = getContract(contractAddress, Erc721AbiJson.abi, provider);
        const gasLimit = await contract.estimateGas.setApprovalForAll(operator, true, {
          from: account
        });
        const gasLimitBN = new BigNumber(gasLimit.toString());
        const gasBuffer = gasLimitBN.times(1.1).decimalPlaces(0);
        logger.debug('Estimated gas', gasBuffer.toString());
        return gasBuffer.toString();
      }
      return '500000';
    },
    [provider, account]
  );

  const call = useCallback(
    async (params: ISetApprovalForAllParams): Promise<Transaction | null> => {
      logger.debug('useSetApprovalForAll', params);
      const { operator, contractAddress } = params;

      if (account && provider) {
        const contract = getContract(contractAddress, Erc721AbiJson.abi, provider);

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
        const transaction = await contract.setApprovalForAll(operator, true, {
          from: account,
          gasLimit
        });
        return transaction;
      }

      return null;
    },
    [account, provider, btcBalance, feeRate, estimateGas]
  );

  return {
    estimateGas: estimateGas,
    call: call,
    dAppType: DAppType.SOUL,
    operationName: 'Set Approval For All',
  };
};

export default useSetApprovalForAll;
