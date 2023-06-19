import IconSVG from '@/components/IconSVG';
import s from './style.module.scss';
import { FC } from 'react';
import { detailExpand, detailRefresh } from '@/constants/asset';
import { Explorer } from '@/components/Expoler';

type DetailImgProps = {
  animationUrl: string | undefined;
  imgCapture?: string | undefined;
};

const DetailImg: FC<DetailImgProps> = ({ animationUrl, imgCapture }) => {
  return (
    <div className={s.detailImg}>
      <div className={s.img}>
        {animationUrl ? (
          <Explorer url={animationUrl} />
        ) : (
          <img src={imgCapture} alt="detailImg" />
        )}
      </div>

      <div className={s['detailImg-buttons']}>
        <IconSVG
          src={detailRefresh}
          maxHeight={'20'}
          maxWidth={'20'}
          className={s.button}
        />
        <IconSVG
          src={detailExpand}
          maxHeight={'20'}
          maxWidth={'20'}
          className={s.button}
        />
      </div>
    </div>
  );
};

export default DetailImg;
