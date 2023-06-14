import { ROUTE_PATH } from '@/constants/route-path';
import logger from '@/services/logger';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { ISoul } from '@/interfaces/api/soul';
import { getSoulDetail } from '@/services/soul';
import { Col, Container, Row } from 'react-bootstrap';
import AuctionInfo from '../Item/AuctionInfoo';
import DetailImg from '../Item/MiddleImg';
import Info from '../Item/Info';
import s from './style.module.scss';

const SoulItem = ({ data }: { data?: ISoul }) => {
  const router = useRouter();
  const { tokenId } = router.query as {
    tokenId: string;
  };
  const [soulDetail, setSoulDetail] = useState<ISoul | undefined>(data);

  useEffect(() => {
    if (!data) {
      fetchSoulDetail();
    }
  }, [data]);

  const fetchSoulDetail = async () => {
    try {
      const data = await getSoulDetail({
        tokenId: tokenId,
      });
      setSoulDetail(data);
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
          <Col lg={4}>
            <AuctionInfo />
          </Col>
          <Col lg={5}>
            <DetailImg img={soulDetail?.image} />
          </Col>
          <Col lg={3}>
            <Info />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(SoulItem);
