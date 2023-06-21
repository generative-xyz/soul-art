import { ITokenDetail } from '@/interfaces/api/marketplace';
import React, { useContext, useMemo, useState } from 'react';
import s from './styles.module.scss';
import Button from '@/components/Button';
import ModalBid from '../ModalBid';
import SonarWaveCircle from '@/components/SonarWaveCircle';
import CountdownText from '@/components/CountdownText';
import { AuctionContext } from '@/contexts/auction-context';
import { formatEthPrice } from '@/utils/format';

interface IProps {
  data: ITokenDetail;
}

const CreateBidButton: React.FC<IProps> = ({ data }: IProps): React.ReactElement => {
  const { auction, auctionEndTime, biddable } = useContext(AuctionContext);
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!auction) {
    return <></>;
  }

  return (
    <>
      <div>
        <div className={s.content_auction}>
          <div className={s.content_auctionLeft}>
            <p className={s.content_auctionLeft_title}>
              Highest bid
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
          // disabled={!biddable}
          className={s.content_auction_adoptButton}
          onClick={handleShow}
        >
          {biddable ? 'Bid' : 'Bidding period ended'}
        </Button>
      </div>
      <ModalBid
        show={show}
        handleClose={handleClose}
        data={data}
      />
    </>
  )
}

export default React.memo(CreateBidButton);