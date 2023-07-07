import Spinner from '@/components/Spinner';
import { SOUL_CONTRACT } from '@/configs';
import { AuctionProvider } from '@/contexts/auction-context';
import { IToken, ITokenDetail } from '@/interfaces/api/marketplace';
import { getCollectionNFTList } from '@/services/marketplace';
import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AuctionInfo from './AuctionInfo';
import DetailImg from './DetailImg';
import MoreSection from './MoreSection';
import TabsComponent from './Tabs';
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
        <Row className={s.row} id="soul-detail-main-section">
          <Col xs={12} md={4} className={s.left_col}>
            <AuctionProvider>
              <AuctionInfo data={soulDetail} />
              <TabsComponent data={soulDetail} />
            </AuctionProvider>
          </Col>
          <Col
            md={{ span: 8, order: 'last' }}
            xs={{ span: 12, order: 'first' }}
            className={s.right_col}
          >
            <DetailImg
              animationUrl={soulDetail.animationFileUrl}
              imgCapture={soulDetail?.imageCapture}
            />
          </Col>
        </Row>
      </Container>

      <MoreSection soulItems={souls} />
    </div>
  );
};

export default React.memo(SoulItem);
