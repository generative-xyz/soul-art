import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Spinner from '@/components/Spinner';
import { SOUL_CONTRACT } from '@/configs';
import { IToken, ITokenDetail } from '@/interfaces/api/marketplace';
import { getCollectionNFTList } from '@/services/marketplace';
import AuctionInfo from '../Item/AuctionInfo';
import Info from '../Item/Info';
import DetailImg from '../Item/DetailImg';
import MoreSection from './MoreSection';
import s from './style.module.scss';

const SoulItem = ({ data: soulDetail }: { data: ITokenDetail }) => {
  const [_isFetchingMoreItems, setIsFetchingMoreItems] = useState(false);
  const [souls, setSouls] = useState<IToken[]>([]);

  const fetchSouls = useCallback(async (page = 1, isFetchMore = false) => {
    try {
      setIsFetchingMoreItems(true);

      const query: {
        page: number;
        limit: number;
        sort?: number;
      } = {
        page,
        limit: 4,
        sort: 1,
      };

      const data = await getCollectionNFTList({
        contract_address: SOUL_CONTRACT,
        ...query,
      });

      if (isFetchMore) {
        setSouls(prev => [...prev, ...data.items]);
      } else {
        setSouls(data.items);
      }
    } catch (error) {
    } finally {
      setIsFetchingMoreItems(false);
    }
  }, []);

  useEffect(() => {
    fetchSouls();
  }, []);

  if (!soulDetail) {
    return (
      <div className="grid-center h-full-view">
        <Spinner></Spinner>;
      </div>
    );
  }

  return (
    <div className={s.artDetail}>
      <Container>
        <Row>
          <Col lg={4}>
            <AuctionInfo data={soulDetail} />
          </Col>
          <Col lg={5}>
            <DetailImg
              animationUrl={soulDetail.animationFileUrl}
              imgCapture={soulDetail?.imageCapture}
            />
          </Col>
          <Col lg={3}>
            <Info data={soulDetail} />
          </Col>
        </Row>
      </Container>

      <MoreSection soulItems={souls} />
    </div>
  );
};

export default React.memo(SoulItem);
