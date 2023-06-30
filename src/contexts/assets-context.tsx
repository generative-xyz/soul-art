import { GM_ADDRESS, SOUL_CONTRACT } from '@/configs';
import web3Instance from '@/connections/custom-web3-provider';
import { FeatureStatus } from '@/constants/feature';
import useTokenBalance from '@/hooks/contract-operations/erc20/useTokenBalance';
import useCheckFeatureStatus from '@/hooks/contract-operations/soul/useCheckFeatureStatus';
import useGetDepositBalance from '@/hooks/contract-operations/soul/useGetDepositBalance';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { ICollectedUTXOResp, IFeeRate } from '@/interfaces/api/bitcoin';
import {
  getCollectedUTXO,
  getFeeRate,
  getPendingUTXOs,
} from '@/services/bitcoin';
import logger from '@/services/logger';
import { getCollectionNFTList } from '@/services/marketplace';
import { useAppSelector } from '@/state/hooks';
import {
  getIsAuthenticatedSelector,
  getUserSelector,
} from '@/state/user/selector';
import { currentAssetsBuilder } from '@/utils/utxo';
import { useWeb3React } from '@web3-react/core';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import * as TC_SDK from 'trustless-computer-sdk';
import useAsyncEffect from 'use-async-effect';

export interface IAssetsContext {
  btcBalance: string;
  tcBalance: string;
  gmBalance: string;
  gmDepositBalance: string;
  feeRate: IFeeRate;
  availableFeatures: number[] | null;
  ownerTokenId?: string;
  setAvailableFeatures: React.Dispatch<React.SetStateAction<number[] | null>>;
}

const initialValue: IAssetsContext = {
  btcBalance: '0',
  tcBalance: '0',
  gmBalance: '0',
  gmDepositBalance: '0',
  feeRate: {
    fastestFee: 25,
    halfHourFee: 20,
    hourFee: 15,
  },
  availableFeatures: null,
  ownerTokenId: '',
  setAvailableFeatures: () => {
    return;
  },
};

export const AssetsContext = React.createContext<IAssetsContext>(initialValue);

export const AssetsProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const user = useAppSelector(getUserSelector);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const btcAddress = user?.btcAddress || '';
  const { provider, account: tcAddress } = useWeb3React();
  const [currentAssets, setCurrentAssets] = useState<
    ICollectedUTXOResp | undefined
  >();
  const [tcBalance, setTcBalance] = useState('0');
  const [gmBalance, setGmBalance] = useState('0');
  const [gmDepositBalance, setGmDepositBalance] = useState('0');
  const [feeRate, setFeeRate] = useState<IFeeRate>(initialValue.feeRate);
  const [ownerTokenId, setOwnerTokenId] = useState('');
  const [availableFeatures, setAvailableFeatures] = useState<number[] | null>(
    null
  );
  const { run: checkFeaturesStatus } = useContractOperation({
    operation: useCheckFeatureStatus,
    inscribable: false,
  });
  const { run: getTokenBalance } = useContractOperation({
    operation: useTokenBalance,
    inscribable: false,
  });
  const { run: getDepositBalance } = useContractOperation({
    operation: useGetDepositBalance,
    inscribable: false,
  });

  const fetchAssets = useCallback(async (): Promise<
    ICollectedUTXOResp | undefined
  > => {
    if (!btcAddress || !tcAddress) return undefined;
    try {
      const res = await getCollectedUTXO(btcAddress, tcAddress);
      return res;
    } catch (err) {
      logger.error(err);
    }
    return undefined;
  }, [btcAddress, tcAddress]);

  const fetchBtcAssets = useCallback(async () => {
    if (!btcAddress) return;

    const [assets, pendingUTXOs] = await Promise.all([
      await fetchAssets(),
      await getPendingUTXOs(btcAddress),
    ]);

    if (assets) {
      const currentAssets = currentAssetsBuilder({
        current: assets,
        pending: pendingUTXOs,
      });
      setCurrentAssets(currentAssets);
      return;
    }
    setCurrentAssets(undefined);
  }, [btcAddress, fetchAssets]);

  const fetchFeeRate = useCallback(async () => {
    try {
      const res = await getFeeRate();
      setFeeRate(res);
    } catch (error) {
      setFeeRate(initialValue.feeRate);
    }
  }, []);

  const fetchSoulToken = useCallback(async () => {
    if (!tcAddress) return;
    try {
      const ownerToken = await getCollectionNFTList({
        contract_address: SOUL_CONTRACT.toLowerCase(),
        owner: tcAddress,
      });
      if (ownerToken.items && ownerToken.items.length > 0) {
        setOwnerTokenId(ownerToken.items[0].tokenId);
      }
    } catch (error) {
      logger.error(error);
    }
  }, [tcAddress]);

  const getAvailableAssetsCreateTx = useCallback(async () => {
    if (!btcAddress) return;

    const [assets, pendingUTXOs] = await Promise.all([
      await fetchAssets(),
      await getPendingUTXOs(btcAddress),
    ]);

    if (assets) {
      const currentAssets = currentAssetsBuilder({
        current: assets,
        pending: pendingUTXOs,
      });
      setCurrentAssets(currentAssets);
      return;
    }

    setCurrentAssets(undefined);
    return undefined;
  }, [btcAddress, fetchAssets]);

  const btcBalance = React.useMemo(() => {
    if (btcAddress) {
      const balance = TC_SDK.getBTCBalance({
        utxos: currentAssets?.txrefs || [],
        inscriptions: currentAssets?.inscriptions_by_outputs || {},
      });
      return balance.toString();
    }
    return '0';
  }, [btcAddress, currentAssets]);

  const fetchTCBalance = useCallback(async () => {
    if (user?.walletAddress && provider) {
      const balance = await provider.getBalance(user.walletAddress);
      setTcBalance(balance.toString());
    }
  }, [user?.walletAddress, provider]);

  const fetchGMBalance = useCallback(async () => {
    if (!tcAddress) return;
    try {
      const gmBalance = await getTokenBalance({
        contractAddress: GM_ADDRESS,
      });
      setGmBalance(gmBalance.toString());
    } catch (err: unknown) {
      logger.error(err);
    }
  }, [tcAddress, getTokenBalance]);

  const fetchGMDepositBalance = useCallback(async () => {
    try {
      const depositBalance = await getDepositBalance();
      setGmDepositBalance(depositBalance.toString());
    } catch (err: unknown) {
      logger.error(err);
    }
  }, [getDepositBalance]);

  const fetchAssetsData = useCallback(() => {
    try {
      fetchFeeRate();
    } catch (err: unknown) {
      logger.error(err);
    }

    try {
      fetchTCBalance();
    } catch (err: unknown) {
      logger.error(err);
    }

    try {
      getAvailableAssetsCreateTx();
    } catch (err: unknown) {
      logger.error(err);
    }

    try {
      fetchGMBalance();
    } catch (err: unknown) {
      logger.error(err);
    }

    try {
      fetchGMDepositBalance();
    } catch (err: unknown) {
      logger.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFeeRate, fetchTCBalance, getAvailableAssetsCreateTx]);

  useEffect(() => {
    fetchBtcAssets();
  }, [fetchBtcAssets]);

  useEffect(() => {
    fetchAssetsData();

    const intervalId = setInterval(() => {
      fetchAssetsData();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchAssetsData]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchSoulToken();
  }, [fetchSoulToken, isAuthenticated]);

  useAsyncEffect(async () => {
    if (!isAuthenticated || !user?.walletAddress || !ownerTokenId) {
      setAvailableFeatures(null);
      // localStorage.removeItem('feature_available');
      return;
    }

    const settingFeatures = await web3Instance.getSettingFeatures();
    if (settingFeatures && settingFeatures.features.length > 0) {
      const featuresStatus = await checkFeaturesStatus({
        tokenId: ownerTokenId,
        owner: user.walletAddress,
        featureList: settingFeatures.features,
      });

      if (!featuresStatus) return;

      const featureAvailableIndex = featuresStatus.reduce(
        (acc, status, index) => {
          if (status === FeatureStatus['Available']) {
            acc.push(index);
          }
          return acc;
        },
        [] as number[]
      );

      setAvailableFeatures(featureAvailableIndex);
      // localStorage.setItem(
      //   'feature_available',
      //   JSON.stringify(featureAvailableIndex)
      // );
    }
  }, [isAuthenticated, ownerTokenId, user?.walletAddress]);

  const contextValues = useMemo((): IAssetsContext => {
    return {
      btcBalance,
      feeRate,
      tcBalance,
      gmBalance,
      gmDepositBalance,
      availableFeatures,
      ownerTokenId,
      setAvailableFeatures,
    };
  }, [
    btcBalance,
    feeRate,
    tcBalance,
    gmBalance,
    gmDepositBalance,
    availableFeatures,
    ownerTokenId,
    setAvailableFeatures,
  ]);

  return (
    <AssetsContext.Provider value={contextValues}>
      {children}
    </AssetsContext.Provider>
  );
};
