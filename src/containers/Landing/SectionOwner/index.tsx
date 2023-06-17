import TextAnimate from '@/components/TextAnimate';
import s from './style.module.scss';
import { Container } from 'react-bootstrap';
const Owner: React.FC = () => {

  return (
    <div className={s.ownerSection}>
      <Container className={s.container}>
        <div className={s.wrapContent}>
          <p className={s.sectionContent}>
            {
              `In the world of SOULS, ownership takes on a unique meaning. Souls cannot be sold or transferred—representing a deep personal connection to your beliefs. When a Soul feels a decline in your attention, it seeks a new connection with someone whose belief burns bright.`
            }
          </p>
          <a href='' className={s.tag}>
            <TextAnimate>
              <span>Lorem ipsum dolor</span>
            </TextAnimate>
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Owner;
