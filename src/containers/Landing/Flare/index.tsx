import TextAnimate from '@/components/TextAnimate';
import s from './style.module.scss';

const Flare = () => {
  return (
    <div className={s.flareSection}>
      <div className={s.wrapContent}>
        <p className={s.sectionContent}>
          But beware, for as with any tale, there were challenges along the way. When
          doubt and uncertainty clouded the hearts of the believers, the sun&apos;s
          radiance waned, casting shadows upon the artworks.
        </p>
        <a href="" className={s.tag}>
          <TextAnimate>
            <span>Lorem ipsum dolor</span>
          </TextAnimate>
        </a>
      </div>
    </div>
  );
};

export default Flare;
