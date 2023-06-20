import TextAnimate from '@/components/TextAnimate';
import s from './style.module.scss';
import { Container, Col } from 'react-bootstrap';
import { useWindowSize } from '@trustless-computer/dapp-core';
import MobileSubLiving from './MobileSubLiving';

const SubLiving = () => {
  const { mobileScreen } = useWindowSize();

  const DescktopSubLiving = () => {
    return (
      <div className={s.subLivingSection}>
        <Container className={s.container}>
          <Col
            xs={{ span: 10, offset: 1 }}
            sm={{ span: 8, offset: 1 }}
            md={{ span: 7 }}
            lg={{ span: 6 }}
            className={s.column}
          >
            <div className={s.wrapContent}>
              <p className={s.sectionContent}>
                {`Souls react to the owner's GM balance and trading behavior. As the owner acquires more GM tokens, the Soul grows in size. It also mimics the patterns of the owner's trading style, whether it's a steady hand guiding the brushstrokes or a flurry of dynamic lines.`}
              </p>
              <div className={s.tag}>
                <TextAnimate>
                  <span>Each Soul familiarizes itself to its owner</span>
                </TextAnimate>
              </div>
            </div>
          </Col>
        </Container>
      </div>
    );
  };

  return <>{mobileScreen ? <MobileSubLiving /> : <DescktopSubLiving />}</>;
};

export default SubLiving;
