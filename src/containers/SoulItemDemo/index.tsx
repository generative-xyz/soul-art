import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Spinner from '@/components/Spinner';
import { ROUTE_PATH } from '@/constants/route-path';
import { ISoul } from '@/interfaces/api/soul';
import { getDemoSoulsNfts, getSoulDemoDetail } from '@/services/demo-soul';
import logger from '@/services/logger';
import { useRouter } from 'next/router';
import MoreSection from './MoreSection';
import s from './style.module.scss';

const SoulItem = () => {
  const router = useRouter();
  const [_isFetchingMoreItems, setIsFetchingMoreItems] = useState(false);
  const [souls, setSouls] = useState<ISoul[]>([]);
  const { tokenId } = router.query as {
    tokenId: string;
  };
  const [soulDetail, setSoulDetail] = useState<ISoul | undefined>();

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

      const data = await getDemoSoulsNfts({
        ...query,
      });

      if (isFetchMore) {
        setSouls(prev => [...prev, ...data]);
      } else {
        setSouls(data);
      }
    } catch (error) {
    } finally {
      setIsFetchingMoreItems(false);
    }
  }, []);

  useEffect(() => {
    fetchSoulDetail();
    fetchSouls();
  }, []);

  const fetchSoulDetail = async () => {
    try {
      const data = await getSoulDemoDetail({
        tokenId,
      });
      setSoulDetail(data || undefined);
    } catch (error) {
      logger.error(error);
      router.push(ROUTE_PATH.NOT_FOUND);
    }
  };

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
          <Col lg={4}>{/* <AuctionInfo img={soulDetail?.image} /> */}</Col>
          <Col lg={5}>{/* <DetailImg img={soulDetail?.image} /> */}</Col>
          <Col lg={3}>{/* <Info /> */}</Col>
        </Row>
      </Container>

      <MoreSection soulItems={souls} />
    </div>
  );
};

export default React.memo(SoulItem);
