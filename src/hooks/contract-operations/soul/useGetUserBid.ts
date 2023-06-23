import SoulAbiJson from '@/abis/soul.json';
import { SOUL_CONTRACT } from '@/configs';
import { useContract } from '@/hooks/useContract';
import {
  ContractOperationHook,
  DAppType,
} from '@/interfaces/contract-operation';
import logger from '@/services/logger';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import BigNumber from 'bignumber.js';

interface IGetUserBidParams {
  tokenId: string;
  auctionId: string;
}

const useGetUserBid: ContractOperationHook<IGetUserBidParams, BigNumber> = () => {
  const { account } = useWeb3React();
  const contract = useContract(SOUL_CONTRACT, SoulAbiJson.abi, true);

  const call = useCallback(
    async (params: IGetUserBidParams): Promise<BigNumber> => {
      if (account && contract) {
        logger.debug('useGetUserBid', params)
        const { tokenId, auctionId } = params;

        const balance = await contract
          ._bidderAuctions(tokenId, auctionId, account, {
            from: account
          });

        return new BigNumber(balance.toString(0));
      }

      return new BigNumber('0');
    },
    [account, contract]
  );

  return {
    call: call,
    dAppType: DAppType.SOUL,
    operationName: 'Get User Bid',
  };
};

export default useGetUserBid;
