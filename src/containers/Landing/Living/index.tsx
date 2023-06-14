import s from './style.module.scss';
import TextAnimate from '@/components/TextAnimate';

const Living = () => {
  return (
    <div className={s.livingArtSection}>
      <div className={s.container}>
        <div className={s.wrapContent}>
          <p className={s.sectionContent}>
            Each Solaris blossomed into a breathtaking artwork, where the
            sun&apos;s essence danced and flourished. The more GM tokens were
            acquired, the brighter the sun shone, illuminating the path of those
            who dared to dream.
          </p>
          <a href="" className={s.tag}>
            <TextAnimate>
              <span>Breathtaking artwork</span>
            </TextAnimate>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Living;
