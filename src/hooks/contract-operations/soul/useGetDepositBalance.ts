import SoulAbiJson from '@/abis/soul.json';
import { GM_ADDRESS, SOUL_CONTRACT } from '@/configs';
import { useContract } from '@/hooks/useContract';
import {
  ContractOperationHook,
  DAppType,
} from '@/interfaces/contract-operation';
import logger from '@/services/logger';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import BigNumber from 'bignumber.js';

const useGetDepositBalance: ContractOperationHook<void, BigNumber> = () => {
  const { account } = useWeb3React();
  const contract = useContract(SOUL_CONTRACT, SoulAbiJson.abi, true);

  const call = useCallback(
    async (): Promise<BigNumber> => {
      if (account && contract) {
        logger.debug('useGetDepositBalance')

        const transaction = await contract
          ._biddingBalance(account, GM_ADDRESS);

        return transaction;
      }

      return new BigNumber('0');
    },
    [account, contract]
  );

  return {
    call: call,
    dAppType: DAppType.SOUL,
    operationName: 'Get Deposit Balance',
  };
};

export default useGetDepositBalance;
