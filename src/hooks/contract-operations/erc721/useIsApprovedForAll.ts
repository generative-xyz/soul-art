import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import Erc721AbiJson from '@/abis/erc721.json';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { getContract } from '@/utils';
import logger from '@/services/logger';

export interface IIsApprovedForAllParams {
  operator: string;
  contractAddress: string;
}

const useIsApprovedForAll: ContractOperationHook<
  IIsApprovedForAllParams,
  boolean
> = () => {
  const { account, provider } = useWeb3React();

  const call = useCallback(
    async (params: IIsApprovedForAllParams): Promise<boolean> => {
      logger.debug('useIsApprovedForAll', params);

      if (account && provider) {
        const { operator, contractAddress } = params;
        const contract = getContract(contractAddress, Erc721AbiJson.abi, provider, account);
        const transaction = await contract.isApprovedForAll(account, operator, {
          from: account
        });

        return transaction;
      }

      return false;
    },
    [account, provider],
  );

  return {
    call: call,
    dAppType: DAppType.SOUL,
    operationName: 'Is Approved For All',
  };
};

export default useIsApprovedForAll;
