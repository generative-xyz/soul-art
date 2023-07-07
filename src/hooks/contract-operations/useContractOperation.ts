import { SupportedChainId } from '@/constants/chains';
import { ROUTE_PATH } from '@/constants/route-path';
import { ContractOperationHook } from '@/interfaces/contract-operation';
import { getIsAuthenticatedSelector, getUserSelector } from '@/state/user/selector';
import { capitalizeFirstLetter, switchChain } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import * as TC_SDK from 'trustless-computer-sdk';
import logger from '@/services/logger';
import { APP_ENV } from '@/configs';

interface IParams<P, R> {
  operation: ContractOperationHook<P, R>;
  inscribable?: boolean;
  chainId?: SupportedChainId;
}

interface IContractOperationReturn<P, R> {
  run: (p: P) => Promise<R>;
}

const useContractOperation = <P, R>(
  args: IParams<P, R>,
): IContractOperationReturn<P, R> => {
  const {
    operation,
    chainId = SupportedChainId.TRUSTLESS_COMPUTER,
    inscribable = true,
  } = args;
  const { call, dAppType, operationName } = operation();
  const { chainId: walletChainId } = useWeb3React();
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const user = useSelector(getUserSelector);
  const router = useRouter();

  const checkAndSwitchChainIfNecessary = async (): Promise<void> => {
    if (walletChainId !== chainId) {
      await switchChain(chainId);
    }
  };

  const run = async (params: P): Promise<R> => {
    try {
      // This function does not handle error
      // It delegates error to caller

      if (inscribable && (!isAuthenticated || !user?.walletAddress)) {
        router.push(`${ROUTE_PATH.CONNECT_WALLET}`);
        throw Error('Please connect wallet to continue.');
      }

      // Check & switch network if necessary
      await checkAndSwitchChainIfNecessary();

      if (!inscribable) {
        // Make TC transaction
        const tx: R = await call({
          ...params,
        });

        return tx;
      }

      // Make TC transaction
      const tx: R = await call({
        ...params,
      });

      if (tx === null) {
        throw Error('Rejected request.');
      }

      TC_SDK.signTransaction({
        method: `${operationName} ${dAppType}`,
        hash: Object(tx).hash,
        dappURL: window.location.href,
        isRedirect: true,
        target: '_blank',
        isMainnet: APP_ENV === 'production',
      });

      return tx;
    } catch (err: unknown) {
      logger.error(err)
      if (Object(err).reason) {
        throw Error(capitalizeFirstLetter(Object(err).reason));
      }
      throw err;
    }
  };

  return {
    run,
  };
};

export default useContractOperation;
