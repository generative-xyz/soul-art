import { ITokenDetail } from "@/interfaces/api/marketplace";
import React, { useContext, useEffect, useState } from "react";
import s from './styles.module.scss';
import Button from "@/components/Button";
import logger from "@/services/logger";
import { showToastError } from "@/utils/toast";
import { Transaction } from 'ethers';
import { useSelector } from "react-redux";
import { getUserSelector } from "@/state/user/selector";
import { useWeb3React } from "@web3-react/core";
import { sleep, toStorageKey } from "@/utils";
import useContractOperation from "@/hooks/contract-operations/useContractOperation";
import useSettleAuction from "@/hooks/contract-operations/soul/useSettleAuction";
import { AuctionContext } from "@/contexts/auction-context";

interface IProps {
  data: ITokenDetail;
}

const SettleAuctionButton: React.FC<IProps> = ({ data }: IProps): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const [processing, setProcessing] = useState(false);
  const [inscribing, setInscribing] = useState(false);
  const {
    operationName,
  } = useSettleAuction();
  const { run: createAuction } = useContractOperation({
    operation: useSettleAuction,
    inscribable: true
  });
  const { provider } = useWeb3React();
  const { fetchAuction } = useContext(AuctionContext);

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

    let intervalId: NodeJS.Timer | null = null;

    const fetchTransactionStatus = async () => {
      try {
        const receipt = await provider.getTransactionReceipt(
          txHash
        );

        if (receipt.status === 1) {
          logger.info('tx done');
          localStorage.removeItem(key);
          intervalId && clearInterval(intervalId);
          await sleep(60000);
          setInscribing(false);
          fetchAuction();
        }
      } catch (error) {
        logger.error('Error retrieving transaction receipt:', error);
      }
    };

    fetchTransactionStatus();

    intervalId = setInterval(() => {
      fetchTransactionStatus();
    }, 30000);

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [user, provider]);

  return (
    <Button
      disabled={processing || inscribing}
      className={s.startAuctionButton}
      onClick={handleStartAuction}
    >
      {(processing || inscribing) ? 'Processing...' : 'Settle auction'}
    </Button>
  )
}

export default React.memo(SettleAuctionButton);
