import TextAnimate from '@/components/TextAnimate';
import s from './style.module.scss';
import { Container, Col } from 'react-bootstrap';

const SubLiving = () => {
  return (
    <div className={s.subLivingSection}>
      <Container className={s.container}>
        <Col
          xs={{ span: 10, offset: 1 }}
          md={{ span: 7 }}
          lg={{ span: 6 }}
          className={s.column}
        >
          <div className={s.wrapContent}>
            <p className={s.sectionContent}>
              {`Souls interact with the owner's GM balance and trading patterns.  The Soul expands in size as the owner gains more GM tokens. Additionally, it imitates the patterns of the owner's trading approach, whether that be a steady hand directing the brushstrokes or a flurry of dynamic lines.`}
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

export default SubLiving;
