import Button from '@/components/Button';
import s from './style.module.scss';
import cs from 'classnames';

const Introduce: React.FC = () => {
  return (
    <div className={s.introduce}>
      <div className={s['introduce-box']}>
        <h1 className={s['introduce-box_title']}>Lorem ipsum dolor sit amet</h1>
        <p className={s['introduce-box_desc']}>
          Once upon a time, in the magical land of New Bitcoin City, there was a
          unique and extraordinary force known as GM tokens. They were more than just
          digital assets—they were the embodiment of belief and hope for a brighter
          future.
        </p>

        <div className={s['introduce-box_buttons']}>
          <Button className={cs(s.button, s.init)}>Example</Button>
          <Button className={cs(s.button, s.trans)}>Example</Button>
        </div>

        <div className={s['introduce-video']}>
          <h5 className={s['introduce-video_title']}>Watch video story</h5>
          <div className={s['wrap-video']}></div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
