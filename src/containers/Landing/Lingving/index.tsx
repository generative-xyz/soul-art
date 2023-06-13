import s from './style.module.scss';

const Living = () => {
  return (
    <div className={s.livingArtSection}>
      <div className={s.wrapContent}>
        <p className={s.sectionContent}>
          Each Solaris blossomed into a breathtaking artwork, where the sun&apos;s
          essence danced and flourished. The more GM tokens were acquired, the
          brighter the sun shone, illuminating the path of those who dared to dream.
        </p>
        <p className={s.tag}>Breathtaking artwork</p>
      </div>
    </div>
  );
};

export default Living;
