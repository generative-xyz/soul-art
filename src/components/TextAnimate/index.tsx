import { FC, PropsWithChildren } from 'react';
import s from './style.module.scss';
import IconSVG from '../IconSVG';

const TextAnimate: FC<PropsWithChildren> = (props) => {
  const icon1 =
    'https://storage.googleapis.com/generative-static-prod/soul-art/textIcon1.svg';
  const icon2 =
    'https://storage.googleapis.com/generative-static-prod/soul-art/textIcon2.svg';
  return (
    <div className={s.textAnimate}>
      <IconSVG src={icon1} maxWidth={'46'} maxHeight={'20'} className={s.icon1} />
      {props.children}
      <IconSVG src={icon2} maxWidth={'46'} maxHeight={'20'} className={s.icon2} />
    </div>
  );
};

export default TextAnimate;
