import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Spinner from '@/components/Spinner';
import { SOUL_CONTRACT } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { IToken } from '@/interfaces/api/marketplace';
import logger from '@/services/logger';
import { getCollectionNFTList } from '@/services/marketplace';
import { getSoulDetail } from '@/services/soul';
import { useRouter } from 'next/router';
import AuctionInfo from '../Item/AuctionInfo';
import Info from '../Item/Info';
import DetailImg from '../Item/MiddleImg';
import MoreSection from './MoreSection';
import s from './style.module.scss';

const SoulItem = () => {
  const router = useRouter();
  const [_isFetchingMoreItems, setIsFetchingMoreItems] = useState(false);
  const [souls, setSouls] = useState<IToken[]>([]);
  const { tokenId } = router.query as {
    tokenId: string;
  };
  const [soulDetail, setSoulDetail] = useState<IToken | undefined>();

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
    fetchSoulDetail();
    fetchSouls();
  }, []);

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
            <AuctionInfo img={soulDetail?.image} />
          </Col>
          <Col lg={5}>
            <DetailImg img={soulDetail?.animationFileUrl} />
          </Col>
          <Col lg={3}>
            <Info />
          </Col>
        </Row>
      </Container>

      <MoreSection soulItems={souls} />
    </div>
  );
};

export default React.memo(SoulItem);
