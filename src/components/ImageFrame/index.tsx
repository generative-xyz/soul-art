import { FC, PropsWithChildren } from 'react';
import s from './style.module.scss';

const ImageFrame: FC<PropsWithChildren> = (props) => {
  return (
    <div className={s.imageFrame}>
      {props.children}
      <span className={s['top-left']}></span>
      <span className={s['top-right']}></span>
      <span className={s['bottom-left']}></span>
      <span className={s['bottom-right']}></span>
    </div>
  );
};

export default ImageFrame;
