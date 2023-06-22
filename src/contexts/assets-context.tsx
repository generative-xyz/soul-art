import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ICollectedUTXOResp,
  IFeeRate,
} from '@/interfaces/api/bitcoin';
import { useAppSelector } from '@/state/hooks';
import { getUserSelector } from '@/state/user/selector';
import {
  getCollectedUTXO,
  getFeeRate,
  getPendingUTXOs,
} from '@/services/bitcoin';
import { currentAssetsBuilder } from '@/utils/utxo';
import { useWeb3React } from '@web3-react/core';
import * as TC_SDK from 'trustless-computer-sdk';
import logger from '@/services/logger';
import useTokenBalance from '@/hooks/contract-operations/erc20/useTokenBalance';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useGetDepositBalance from '@/hooks/contract-operations/soul/useGetDepositBalance';
import { GM_ADDRESS } from '@/configs';

export interface IAssetsContext {
  btcBalance: string;
  tcBalance: string;
  gmBalance: string;
  gmDepositBalance: string;
  feeRate: IFeeRate;
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
  }
};

export const AssetsContext = React.createContext<IAssetsContext>(initialValue);

export const AssetsProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const user = useAppSelector(getUserSelector);
  const btcAddress = user?.btcAddress || '';
  const { provider, account: tcAddress } = useWeb3React();
  const [currentAssets, setCurrentAssets] = useState<
    ICollectedUTXOResp | undefined
  >();
  const [tcBalance, setTcBalance] = useState('0');
  const [gmBalance, setGmBalance] = useState('0');
  const [gmDepositBalance, setGmDepositBalance] = useState('0');
  const [feeRate, setFeeRate] = useState<IFeeRate>(initialValue.feeRate);
  const { run: getTokenBalance } = useContractOperation({
    operation: useTokenBalance,
    inscribeable: false
  })
  const { run: getDepositBalance } = useContractOperation({
    operation: useGetDepositBalance,
    inscribeable: false
  })

  const fetchAssets = useCallback(async (): Promise<ICollectedUTXOResp | undefined> => {
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
        contractAddress: GM_ADDRESS
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

  }, [fetchFeeRate, fetchTCBalance, getAvailableAssetsCreateTx, fetchGMBalance, fetchGMDepositBalance]);

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

  const contextValues = useMemo((): IAssetsContext => {
    return {
      btcBalance,
      feeRate,
      tcBalance,
      gmBalance,
      gmDepositBalance,
    };
  }, [
    btcBalance,
    feeRate,
    tcBalance,
    gmBalance,
    gmDepositBalance,
  ]);

  return (
    <AssetsContext.Provider value={contextValues}>
      {children}
    </AssetsContext.Provider>
  );
};
