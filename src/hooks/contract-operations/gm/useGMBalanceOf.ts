import Erc20AbiJson from '@/abis/erc20.json';
import { GM_CONTRACT } from '@/configs';
import { useContract } from '@/hooks/useContract';
import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

export interface IGetGMBalanceParams {
  address: string;
}

const useGMBalanceOf: ContractOperationHook<
  IGetGMBalanceParams,
  BigNumber
> = () => {
  const contract = useContract(GM_CONTRACT, Erc20AbiJson.abi, false);
  const { provider } = useWeb3React();

  const call = useCallback(async (params: IGetGMBalanceParams): Promise<BigNumber> => {
    if (provider && contract) {
      const { address } = params;
      const balanceBN = await contract.balanceOf(address);
      return new BigNumber(balanceBN.toString());
    }

    return new BigNumber('0');
  }, [provider, contract]);

  return {
    call,
    dAppType: DAppType.SOUL,
    operationName: 'Get GM Balance'
  };
};

export default useGMBalanceOf;
