import { mobileFlare } from '@/constants/asset';
import s from './style.module.scss';
import { Container } from 'react-bootstrap';
import TextAnimate from '@/components/TextAnimate';

const MobileFlare = () => {
  return (
    <div className={s.mobileFlare}>
      <div className={s.image}>
        <img src={mobileFlare} alt="background image" />
      </div>
      <Container className={s.container}>
        <div className={s.wrapSectionContent}>
          <div className={s.wrapSectionContent_inner}>
            <p className={s.sectionContent}>
              {`In the world of SOULS, ownership takes on a unique meaning. Souls cannot be sold or transferred—representing a deep personal connection to your beliefs. When a Soul feels a decline in your attention, it seeks a new connection with someone whose belief burns bright. `}
            </p>

            <p className={s.sectionContent}>
              {`The adoption process allows you to welcome a Soul into your digital realm, with the funds going to the SOULS DAO. This decentralized, autonomous organization supports the community and future projects. `}
            </p>
          </div>
          <div className={s.tag}>
            <TextAnimate>
              <span>A one-of-a-kind ownership system</span>
            </TextAnimate>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MobileFlare;
