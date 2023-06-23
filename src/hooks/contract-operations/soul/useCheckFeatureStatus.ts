import SoulAbiJson from '@/abis/soul.json';
import { SOUL_CONTRACT } from '@/configs';
import { useContract } from '@/hooks/useContract';
import {
  ContractOperationHook,
  DAppType,
} from '@/interfaces/contract-operation';
import { useWeb3React } from '@web3-react/core';
import { Transaction } from 'ethers';
import { useCallback } from 'react';

export interface ICheckFeatureStatusParams {
  tokenId: string;
  featureList: string[];
  txSuccessCallback?: (_tx: Transaction | null) => Promise<void>;
}

const useCheckFeatureStatus: ContractOperationHook<
  ICheckFeatureStatusParams,
  number[] | null
> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(SOUL_CONTRACT, SoulAbiJson.abi, true);

  const call = useCallback(
    async (params: ICheckFeatureStatusParams): Promise<number[] | null> => {
      if (account && provider && contract) {
        const { tokenId, featureList } = params;

        const featureStatus = await Promise.all(
          featureList.map(async feature => {
            const checkCanUnlock = await contract.canUnlockFeature(
              tokenId,
              account,
              feature
            );

            if (checkCanUnlock) {
              const checkIsUnlocked = await contract._features(
                tokenId,
                account,
                feature
              );
              return checkIsUnlocked ? 1 : 2;
            }

            return 0;
          })
        );

        return featureStatus;
      }
      return null;
    },
    [contract, provider, account]
  );

  return {
    call: call,
    dAppType: DAppType.SOUL,
    operationName: 'Get Feature List Status',
  };
};

export default useCheckFeatureStatus;
