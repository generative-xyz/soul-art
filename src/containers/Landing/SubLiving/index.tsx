import TextAnimate from '@/components/TextAnimate';
import s from './style.module.scss';
import { Container, Col } from 'react-bootstrap';

const SubLiving = () => {
  return (
    <div className={s.subLivingSection}>
      <Container className={s.container}>
        <Col lg={{ span: 4, offset: 1 }} className={s.column}>
          <div className={s.wrapContent}>
            <p className={s.sectionContent}>
              Each Solaris blossomed into a breathtaking artwork, where the
              sun&apos;s essence danced and flourished. The more GM tokens were
              acquired, the brighter the sun shone, illuminating the path of
              those who dared to dream.
            </p>
            <a href="" className={s.tag}>
              <TextAnimate>
                <span>Lorem ipsum dolor</span>
              </TextAnimate>
            </a>
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default SubLiving;
