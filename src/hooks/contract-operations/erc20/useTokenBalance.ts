import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import ERC20ABIJson from '@/abis/erc20.json';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { getContract } from '@/utils';
import logger from '@/services/logger';
import BigNumber from 'bignumber.js';

export interface IGetTokenBalanceParams {
  contractAddress: string;
}

const useTokenBalance: ContractOperationHook<
  IGetTokenBalanceParams,
  BigNumber
> = () => {
  const { account, provider } = useWeb3React();

  const call = useCallback(
    async (params: IGetTokenBalanceParams): Promise<BigNumber> => {
      logger.debug('useTokenBalance', params);

      if (account && provider) {
        const { contractAddress } = params;
        const contract = getContract(contractAddress, ERC20ABIJson.abi, provider, account);
        const balance = await contract.balanceOf(account, {
          from: account
        });
        return new BigNumber(balance.toString());
      }

      return new BigNumber('0');
    },
    [account, provider],
  );

  return {
    call: call,
    dAppType: DAppType.ERC20,
    operationName: 'Get Token Balance',
  };
};

export default useTokenBalance;
