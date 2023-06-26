import SoulAbiJson from '@/abis/soul.json';
import { SOUL_CONTRACT } from '@/configs';
import { useContract } from '@/hooks/useContract';
import {
  ContractOperationHook,
  DAppType,
} from '@/interfaces/contract-operation';
import logger from '@/services/logger';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

const useGetBalanceOf: ContractOperationHook<void, BigNumber> = () => {
  const { account } = useWeb3React();
  const contract = useContract(SOUL_CONTRACT, SoulAbiJson.abi, true);

  const call = useCallback(
    async (): Promise<BigNumber> => {
      if (account && contract) {
        logger.debug('useGetBalanceOf')

        const balance = await contract
          .balanceOf(account, {
            from: account
          });

        return new BigNumber(balance.toString());
      }

      return new BigNumber('0');
    },
    [account, contract]
  );

  return {
    call: call,
    dAppType: DAppType.SOUL,
    operationName: 'Get Balance Of',
  };
};

export default useGetBalanceOf;
