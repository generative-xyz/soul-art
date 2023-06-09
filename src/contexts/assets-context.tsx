import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { ICollectedUTXOResp, ITxHistory, IFeeRate } from '@/interfaces/api/bitcoin';
import { useAppSelector } from '@/state/hooks';
import { getUserSelector } from '@/state/user/selector';
import { getCollectedUTXO, getFeeRate, getPendingUTXOs, getTokenRate } from '@/services/bitcoin';
import { comingAmountBuilder, currentAssetsBuilder } from '@/utils/utxo';
import debounce from 'lodash/debounce';
import { useWeb3React } from '@web3-react/core';
import * as TC_SDK from 'trustless-computer-sdk';

export interface IAssetsContext {
  btcBalance: string;
  juiceBalance: string;
  currentAssets: ICollectedUTXOResp | undefined;
  assets: ICollectedUTXOResp | undefined;
  isLoadingAssets: boolean;
  isLoadedAssets: boolean;
  history: ITxHistory[];
  feeRate: IFeeRate;
  comingAmount: number;
  eth2btcRate: number;
  fetchAssets: () => void;
  debounceFetchData: () => void;
  fetchFeeRate: () => Promise<IFeeRate | undefined>;
  getAvailableAssetsCreateTx: () => Promise<ICollectedUTXOResp | undefined>;
}

const initialValue: IAssetsContext = {
  btcBalance: '0',
  juiceBalance: '0',
  currentAssets: undefined,
  assets: undefined,
  isLoadingAssets: false,
  isLoadedAssets: false,
  history: [],
  feeRate: {
    fastestFee: 25,
    halfHourFee: 20,
    hourFee: 15,
  },
  comingAmount: 0,
  eth2btcRate: 0,
  fetchAssets: () => new Promise<void>(r => r()),
  debounceFetchData: () => new Promise<void>(r => r()),
  fetchFeeRate: () => new Promise<IFeeRate | undefined>(() => null),
  getAvailableAssetsCreateTx: () => new Promise<ICollectedUTXOResp | undefined>(() => null),
};

export const AssetsContext = React.createContext<IAssetsContext>(initialValue);

export const AssetsProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const user = useAppSelector(getUserSelector);
  const currentAddress = React.useMemo(() => {
    return user?.walletAddressBtcTaproot || '';
  }, [user?.walletAddressBtcTaproot]);
  const { provider, account: tcAddress } = useWeb3React();

  // UTXOs
  const [assets, setAssets] = useState<ICollectedUTXOResp | undefined>();
  const [currentAssets, setCurrentAssets] = useState<ICollectedUTXOResp | undefined>();
  const [isLoadingAssets, setIsLoadingAssets] = useState<boolean>(false);
  const [isLoadedAssets, setIsLoadedAssets] = useState<boolean>(false);
  // const [btcBalance, setBtcBalance] = useState('0');
  const [juiceBalance, setJuiceBalance] = useState('0');

  // History
  const [history, setHistory] = useState<ITxHistory[]>([]);

  // Fee rate
  const [feeRate, setFeeRate] = useState<IFeeRate>({
    fastestFee: 25,
    halfHourFee: 20,
    hourFee: 15,
  });
  const [comingAmount, setcomingAmount] = useState<number>(0);
  const [eth2btcRate, setEth2BtcRate] = useState<number>(0);

  const fetchAssets = async (): Promise<ICollectedUTXOResp | undefined> => {
    if (!currentAddress || !tcAddress) return undefined;
    let _assets = undefined;
    try {
      setIsLoadingAssets(true);
      _assets = await getCollectedUTXO(currentAddress, tcAddress);
      setAssets(_assets);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingAssets(false);
      setIsLoadedAssets(true);
    }
    return _assets;
  };

  const fetchData = async () => {
    const [assets, pendingUTXOs] = await Promise.all([await fetchAssets(), await getPendingUTXOs(currentAddress)]);

    // Current assets
    let _currentAssets = undefined;
    if (assets) {
      _currentAssets = currentAssetsBuilder({
        current: assets,
        pending: pendingUTXOs,
      });
    }
    setCurrentAssets(_currentAssets);

    // Coming amount...
    const _comingAmount = comingAmountBuilder(currentAddress, pendingUTXOs);
    setcomingAmount(_comingAmount);
  };

  const debounceFetchData = React.useCallback(debounce(fetchData, 300), [currentAddress, tcAddress]);

  const fetchFeeRate = async () => {
    let _feeRate = {
      fastestFee: 25,
      halfHourFee: 20,
      hourFee: 15,
    };
    try {
      _feeRate = await getFeeRate();
      setFeeRate(_feeRate);
    } catch (error) {
      setFeeRate(_feeRate);
    }
    return _feeRate;
  };

  const btcBalance = React.useMemo(() => {
    if (currentAddress) {
      // const utxos = await getBtcBalance(currentAddress);
      const balance = TC_SDK.getBTCBalance({
        utxos: currentAssets?.txrefs || [],
        inscriptions: currentAssets?.inscriptions_by_outputs || {},
      });
      // setBtcBalance(balance.toString());
      return balance.toString();
    }
    return '0';
  }, [currentAddress, currentAssets]);

  const fetchJuiceBalance = async () => {
    if (user?.walletAddress && provider) {
      const balance = await provider.getBalance(user.walletAddress);
      setJuiceBalance(balance.toString());
    }
  };

  const getAvailableAssetsCreateTx = async () => {
    const [assets, pendingUTXOs] = await Promise.all([await fetchAssets(), await getPendingUTXOs(currentAddress)]);
    // Current assets
    let _currentAssets = undefined;
    if (assets) {
      _currentAssets = currentAssetsBuilder({
        current: assets,
        pending: pendingUTXOs,
      });
    }
    setCurrentAssets(_currentAssets);

    return _currentAssets;
  };

  const getETH2BTCRate = async () => {
    try {
      const rate = await getTokenRate();
      setEth2BtcRate(rate);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssetsData = () => {
    try {
      fetchFeeRate();
    } catch (err) {
      console.log(err);
    }

    try {
      getETH2BTCRate();
    } catch (err) {
      console.log(err);
    }

    try {
      fetchJuiceBalance();
    } catch (err) {
      console.log(err);
    }

    // try {
    //   fetchBTCBalance();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    if (currentAddress) {
      debounceFetchData();
    } else {
      setHistory([]);
    }
  }, [user, provider, currentAddress, tcAddress]);

  useEffect(() => {
    fetchAssetsData();

    const intervalID = setInterval(() => {
      fetchAssetsData();
    }, 60000); // 1min

    return () => {
      clearInterval(intervalID);
    };
  }, [user, provider, currentAddress]);

  const contextValues = useMemo((): IAssetsContext => {
    return {
      btcBalance,
      currentAssets,
      assets,
      isLoadingAssets,
      isLoadedAssets,
      history,
      feeRate,
      comingAmount,
      debounceFetchData,
      eth2btcRate,
      juiceBalance,
      fetchAssets,
      fetchFeeRate,
      getAvailableAssetsCreateTx,
    };
  }, [
    juiceBalance,
    btcBalance,
    currentAssets,
    assets,
    isLoadingAssets,
    isLoadedAssets,
    history,
    feeRate,
    comingAmount,
    debounceFetchData,
    eth2btcRate,
    fetchAssets,
    fetchFeeRate,
    getAvailableAssetsCreateTx,
  ]);

  return <AssetsContext.Provider value={contextValues}>{children}</AssetsContext.Provider>;
};
