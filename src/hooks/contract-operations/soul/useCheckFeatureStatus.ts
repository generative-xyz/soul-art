import SoulAbiJson from '@/abis/soul.json';
import { SOUL_CONTRACT } from '@/configs';
import { FeatureStatus } from '@/constants/feature';
import { useContract } from '@/hooks/useContract';
import {
  ContractOperationHook,
  DAppType,
} from '@/interfaces/contract-operation';
import logger from '@/services/logger';
import { useWeb3React } from '@web3-react/core';
import { Transaction } from 'ethers';
import { useCallback } from 'react';

export interface ICheckFeatureStatusParams {
  tokenId: string;
  owner: string;
  featureList: string[];
  txSuccessCallback?: (_tx: Transaction | null) => Promise<void>;
}

const useCheckFeatureStatus: ContractOperationHook<
  ICheckFeatureStatusParams,
  number[] | null
> = () => {
  const { provider } = useWeb3React();
  const contract = useContract(SOUL_CONTRACT, SoulAbiJson.abi, true);

  const call = useCallback(
    async (params: ICheckFeatureStatusParams): Promise<number[] | null> => {
      if (provider && contract) {
        const { tokenId, owner, featureList } = params;

        const featureStatus = await Promise.all(
          featureList.map(async feature => {
            logger.debug(feature);
            const checkCanUnlock = await contract.canUnlockFeature(
              tokenId,
              owner,
              feature
            );
            const checkIsUnlocked = await contract._features(
              tokenId,
              owner,
              feature
            );

            if (!checkCanUnlock && checkIsUnlocked)
              return FeatureStatus['Unlocked'];
            if (checkCanUnlock && !checkIsUnlocked)
              return FeatureStatus['Available'];
            return FeatureStatus['Locked'];
          })
        );

        return featureStatus;
      }

      return null;
    },
    [contract, provider]
  );

  return {
    call: call,
    dAppType: DAppType.SOUL,
    operationName: 'Get Feature List Status',
  };
};

export default useCheckFeatureStatus;
