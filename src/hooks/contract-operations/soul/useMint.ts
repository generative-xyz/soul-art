import SoulJson from '@/abis/soul.json';
import { SOUL_CONTRACT, TRANSFER_TX_SIZE } from '@/configs';
import { AssetsContext } from '@/contexts/assets-context';
import { useContract } from '@/hooks/useContract';
import {
  ContractOperationHook,
  DAppType,
} from '@/interfaces/contract-operation';
import logger from '@/services/logger';
import { formatBTCPrice } from '@/utils/format';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { Transaction } from 'ethers';
import { useCallback, useContext } from 'react';
import * as TC_SDK from 'trustless-computer-sdk';

export interface IClaimParams {
  address: string;
  totalGM: number;
  signature: string;

  txSuccessCallback?: (_tx: Transaction | null) => Promise<void>;
}

const useSoul: ContractOperationHook<IClaimParams, Transaction | null> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(SOUL_CONTRACT, SoulJson.abi, true);
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: IClaimParams): Promise<Transaction | null> => {
      if (account && provider && contract) {
        logger.debug('usePreserveChunks', params);

        const { address, txSuccessCallback } = params;

        const tcTxSizeByte = TRANSFER_TX_SIZE;

        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: tcTxSizeByte,
          feeRatePerByte: feeRate.hourFee,
        });

        const balanceInBN = new BigNumber(btcBalance);
        if (balanceInBN.isLessThan(estimatedFee.totalFee)) {
          throw Error(
            `Insufficient BTC balance. Please top up at least ${formatBTCPrice(
              estimatedFee.totalFee.toString()
            )} BTC.`
          );
        }

        const signatureBuff = Buffer.from(params.signature);

        const transaction = await contract
          .connect(provider.getSigner())
          .mint(address, params.totalGM, signatureBuff, {
            gasLimit: 500000,
          });

        if (txSuccessCallback) {
          await txSuccessCallback(transaction);
        }

        return transaction;
      }

      return null;
    },
    [account, provider, contract, btcBalance, feeRate]
  );

  return {
    call: call,

    dAppType: DAppType.SOUL,
    operationName: 'Soul',
  };
};

export default useSoul;
