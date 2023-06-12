import Button from './Button';
import s from './style.module.scss';

const Introduce: React.FC = () => {
  return (
    <div>
      <div className={s['hero-box']}>
        <h1 className={s['hero-box_title']}>Lorem ipsum dolor sit amet</h1>
        <p className={s['hero-box_desc']}>
          Once upon a time, in the magical land of New Bitcoin City, there was a
          unique and extraordinary force known as GM tokens. They were more than just
          digital assets—they were the embodiment of belief and hope for a brighter
          future.
        </p>

        <div className={s['hero-box_buttons']}>
          <Button />
          <Button />
        </div>

        <div className={s['hero-video']}>
          <h5 className={s['hero-video_title']}>Watch video story</h5>
          <div className={s['wrap-video']}></div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
