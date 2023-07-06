import React, { useContext, useState } from 'react';
import s from './styles.module.scss';
import Button from '@/components/Button';
import ModalBid from '../ModalBid';
import SonarWaveCircle from '@/components/SonarWaveCircle';
import CountdownText from '@/components/CountdownText';
import { AuctionContext } from '@/contexts/auction-context';
import { formatEthPrice } from '@/utils/format';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useGetBalanceOf from '@/hooks/contract-operations/soul/useGetBalanceOf';
import logger from '@/services/logger';
import ModalError from '../ModalError';

interface IProps {
  tokenId: string;
  imageCapture: string;
}

const CreateBidButton: React.FC<IProps> = ({ tokenId, imageCapture }: IProps): React.ReactElement => {
  const { auction, auctionEndTime, biddable } = useContext(AuctionContext);
  const { run: getBalanceOf } = useContractOperation({
    operation: useGetBalanceOf,
    inscribable: false,
  });
  const [showBidModal, setShowBidModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const handleCloseBidModal = () => setShowBidModal(false);

  const handleShowBidModal = async () => {
    try {
      const tokenBalanceBN = await getBalanceOf();
      if (tokenBalanceBN.isGreaterThan(0)) {
        setShowErrorModal(true);
        return;
      }
      setShowBidModal(true);
    } catch (err: unknown) {
      logger.error(err);
    }
  }

  const handleCloseErrorModal = () => setShowErrorModal(false);

  if (!auction) {
    return <></>;
  }

  return (
    <>
      <div>
        <div className={s.content_auction}>
          <div className={s.content_auctionLeft}>
            <p className={s.content_auctionLeft_title}>
              Highest amount
            </p>
            <p className={s.content_auctionLeft_price}>
              {`${formatEthPrice(auction.highestBid)} GM`}
            </p>
          </div>
          {auctionEndTime && (
            <div className={s.content_auctionRight}>
              <SonarWaveCircle />
              <p className={s.content_auctionRight_time}>
                <CountdownText countDownTo={auctionEndTime} />
              </p>
            </div>
          )}
        </div>
        <Button
          disabled={!biddable}
          className={s.content_auction_adoptButton}
          onClick={handleShowBidModal}
        >
          {biddable ? 'Adopt' : 'Bidding period ended'}
        </Button>
      </div>
      <ModalBid
        show={showBidModal}
        handleClose={handleCloseBidModal}
        tokenId={tokenId}
        imageCapture={imageCapture}
      />
      <ModalError
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
      />
    </>
  )
}

export default React.memo(CreateBidButton);
