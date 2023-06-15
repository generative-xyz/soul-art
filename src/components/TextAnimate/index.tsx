import { FC, PropsWithChildren } from 'react';
import s from './style.module.scss';
import IconSVG from '../IconSVG';
import { textAnimateIcon1, textAnimateIcon2 } from '@/constants/asset';

const TextAnimate: FC<PropsWithChildren> = (props) => {
  return (
    <div className={s.textAnimate}>
      <IconSVG
        src={textAnimateIcon1}
        maxWidth={'46'}
        maxHeight={'20'}
        className={s.icon1}
      />
      {props.children}
      <IconSVG
        src={textAnimateIcon2}
        maxWidth={'46'}
        maxHeight={'20'}
        className={s.icon2}
      />
    </div>
  );
};

export default TextAnimate;
