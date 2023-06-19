import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Spinner from '@/components/Spinner';
import { ROUTE_PATH } from '@/constants/route-path';
import { IInscription } from '@/interfaces/api/inscription';
import logger from '@/services/logger';
import { getNFTDetail } from '@/services/nft-explorer';
import s from './style.module.scss';
import { SOUL_CONTRACT } from '@/configs';
import { useRouter } from 'next/router';

const Inscription = ({ data }: { data?: IInscription }) => {
  const router = useRouter();

  const { tokenId } = router.query as {
    tokenId: string;
  };
  const [inscription, setInscription] = useState<IInscription | undefined>(
    data
  );

  useEffect(() => {
    if (!data) {
      fetchInscriptionDetail();
    }
  }, [data]);

  const fetchInscriptionDetail = async () => {
    try {
      const data = await getNFTDetail({
        contractAddress: SOUL_CONTRACT,
        tokenId: tokenId,
      });
      setInscription(data);
    } catch (error) {
      logger.error(error);
      router.push(ROUTE_PATH.NOT_FOUND);
    }
  };

  if (!inscription) {
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
          <Col lg={4}>{/* <AuctionInfo data={inscription} /> */}</Col>
          <Col lg={5}>
            {/* <DetailImg
              animationUrl={inscription.animationFileUrl}
              imgCapture={inscription?.imageCapture}
            /> */}
          </Col>
          <Col lg={3}>{/* <Info data={inscription} /> */}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(Inscription);
