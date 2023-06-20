import { Container, Col } from 'react-bootstrap';
import s from './style.module.scss';
import TextAnimate from '@/components/TextAnimate';
import { useWindowSize } from '@trustless-computer/dapp-core';
import MobileLiving from './MobileLiving';

const Living = () => {
  const { mobileScreen } = useWindowSize();

  const DesktopLiving = () => {
    return (
      <div className={s.livingArtSection}>
        <Container className={s.container}>
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 10, offset: 1 }}
            lg={{ span: 10, offset: 1 }}
            className={s.column}
          >
            <div className={s.wrapContent}>
              <p className={s.sectionContent}>
                {`Souls are not static art but dynamic entities that reflect human behavior. They react to market dynamics, mirroring feelings of fear, greed, and belief. The interconnected nature of the Souls is fascinating, as one soul's changes can affect another soul within the collective.`}
              </p>
              <div className={s.tag}>
                <TextAnimate>
                  <span>
                    Collective performance art that reflects human behavior
                  </span>
                </TextAnimate>
              </div>
            </div>
          </Col>
        </Container>
      </div>
    );
  };

  return <>{mobileScreen ? <MobileLiving /> : <DesktopLiving />}</>;
};

export default Living;
