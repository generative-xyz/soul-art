import { Container } from 'react-bootstrap';
import s from './style.module.scss';
import { mobileSubLiving } from '@/constants/asset';
import TextAnimate from '@/components/TextAnimate';

const MobileSubLiving = () => {
  return (
    <div className={s.mobileSubLiving}>
      <div className={s.image}>
        <img src={mobileSubLiving} alt="background image" />
      </div>
      <Container className={s.container}>
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
      </Container>
    </div>
  );
};

export default MobileSubLiving;
