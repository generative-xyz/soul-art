import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import ERC20ABIJson from '@/abis/erc20.json';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { getContract } from '@/utils';
import logger from '@/services/logger';
import BigNumber from 'bignumber.js';

export interface IGetAllowanceAmountParams {
  operatorAddress: string;
  contractAddress: string;
}

const useGetAllowanceAmount: ContractOperationHook<
  IGetAllowanceAmountParams,
  BigNumber
> = () => {
  const { account, provider } = useWeb3React();

  const call = useCallback(
    async (params: IGetAllowanceAmountParams): Promise<BigNumber> => {
      logger.debug('useGetAllowanceAmount', params);
      if (account && provider) {
        const { operatorAddress, contractAddress } = params;
        const contract = getContract(contractAddress, ERC20ABIJson.abi, provider, account);
        const allowance = await contract.allowance(account, operatorAddress, {
          from: account
        });
        return new BigNumber(allowance.toString());
      }

      return new BigNumber('0');
    },
    [account, provider],
  );

  return {
    call: call,
    dAppType: DAppType.ERC20,
    operationName: 'Get Allowance Amount',
  };
};

export default useGetAllowanceAmount;
