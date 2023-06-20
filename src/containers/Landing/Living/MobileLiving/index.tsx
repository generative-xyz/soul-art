import { Container } from 'react-bootstrap';
import s from './style.module.scss';
import { mobileLiving } from '@/constants/asset';
import TextAnimate from '@/components/TextAnimate';

const MobileLiving = () => {
  return (
    <div className={s.mobileLiving}>
      <div className={s.image}>
        <img src={mobileLiving} alt="background image" />
      </div>
      <Container className={s.container}>
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
      </Container>
    </div>
  );
};

export default MobileLiving;
