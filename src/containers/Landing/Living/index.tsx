import { Container, Col } from 'react-bootstrap';
import s from './style.module.scss';
import TextAnimate from '@/components/TextAnimate';

const Living = () => {
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
              {`Souls are dynamic beings that reflect human behaviour, not static works of art. They react to market dynamics and illustrate emotions like fear, greed, and belief. It's phenomenal how closely connected the Souls are because changes in one Soul can have an impact on another Soul within the collective.`}
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

export default Living;
