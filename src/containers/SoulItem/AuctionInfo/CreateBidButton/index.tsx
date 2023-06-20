import { ITokenDetail } from '@/interfaces/api/marketplace';
import React, { useMemo, useState } from 'react';
import s from './styles.module.scss';
import Button from '@/components/Button';
import ModalBid from '../ModalBid';
import SonarWaveCircle from '@/components/SonarWaveCircle';
import CountdownText from '@/components/CountdownText';

interface IProps {
  data: ITokenDetail;
}

const CreateBidButton: React.FC<IProps> = ({ data }: IProps): React.ReactElement => {
  const [show, setShow] = useState<boolean>(false);
  const [auction, setAuction] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const auctionEndTime = useMemo(() => {

  }, []);

  return (
    <>
      <div>
        <div className={s.content_auction}>
          <div className={s.content_auctionLeft}>
            <p className={s.content_auctionLeft_title}>
              Highest bid
            </p>
            <p className={s.content_auctionLeft_price}>
              1.5 GM
            </p>
          </div>
          <div className={s.content_auctionRight}>
            <SonarWaveCircle />
            <p className={s.content_auctionRight_time}>
              <CountdownText countDownTo={'2023-06-28 00:00:00'} />
            </p>
          </div>
        </div>
        <Button
          className={s.content_auction_adoptButton}
          onClick={handleShow}
        >
          Bid
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