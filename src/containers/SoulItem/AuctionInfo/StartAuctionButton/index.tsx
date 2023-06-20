import { ITokenDetail } from "@/interfaces/api/marketplace";
import React, { useEffect, useState } from "react";
import s from './styles.module.scss';
import Button from "@/components/Button";
import useContractOperation from "@/hooks/contract-operations/useContractOperation";
import useCreateAuction from "@/hooks/contract-operations/soul/useCreateAuction";
import logger from "@/services/logger";
import { showToastError } from "@/utils/toast";
import { Transaction } from 'ethers';
import { useSelector } from "react-redux";
import { getUserSelector } from "@/state/user/selector";
import { useWeb3React } from "@web3-react/core";
import { toStorageKey } from "@/utils";

interface IProps {
  data: ITokenDetail;
}

const StartAuctionButton: React.FC<IProps> = ({ data }: IProps): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const [processing, setProcessing] = useState(false);
  const [inscribing, setInscribing] = useState(false);
  const {
    operationName,
  } = useCreateAuction();
  const { run: createAuction } = useContractOperation({
    operation: useCreateAuction,
    inscribeable: true
  });
  const { provider } = useWeb3React();

  const onTxSuccessCallback = async (tx: Transaction | null): Promise<void> => {
    if (!tx || !user?.walletAddress) return;
    const key = toStorageKey(operationName, user.walletAddress);
    const txHash = tx.hash;
    if (!txHash) return;
    localStorage.setItem(key, txHash);
  }

  const handleStartAuction = async () => {
    if (processing) return;

    try {
      setProcessing(true);
      await createAuction({
        tokenId: Number(data.tokenId),
        txSuccessCallback: onTxSuccessCallback
      });
    } catch (err: unknown) {
      logger.error(err);
      showToastError({
        message: (err as Error).message,
      })
    } finally {
      setProcessing(false);
    }
  }

  useEffect(() => {
    if (!user?.walletAddress || !provider) return;

    const key = toStorageKey(operationName, user.walletAddress);
    const txHash = localStorage.getItem(key);

    if (!txHash) return;

    setInscribing(true);

    const fetchTransactionStatus = async () => {
      try {
        const receipt = await provider.getTransactionReceipt(
          txHash
        );

        if (receipt.status === 1) {
          logger.info('tx done');
          localStorage.removeItem(key);
        }
      } catch (error) {
        logger.error('Error retrieving transaction receipt:', error);
      }
    };

    fetchTransactionStatus();

    const intervalId = setInterval(() => {
      fetchTransactionStatus();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [user, provider]);

  return (
    <Button
      disabled={processing || inscribing}
      className={s.startAuctionButton}
      onClick={handleStartAuction}
    >
      {(processing || inscribing) ? 'Processing...' : 'Start auction'}
    </Button>
  )
}

export default React.memo(StartAuctionButton);
