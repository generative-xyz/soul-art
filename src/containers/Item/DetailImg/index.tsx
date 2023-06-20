import Explorer from '@/components/Explorer';
import IconSVG from '@/components/IconSVG';
import { detailExpand, detailRefresh } from '@/constants/asset';
import { FC, memo, useCallback } from 'react';
import s from './style.module.scss';

type DetailImgProps = {
  animationUrl: string | undefined;
  imgCapture?: string | undefined;
};

const DetailImg: FC<DetailImgProps> = ({ animationUrl, imgCapture }) => {
  const handleExpand = useCallback(() => {
    window.open(animationUrl, '_blank');
  }, [animationUrl]);

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
          onClick={handleExpand}
        />
      </div>
    </div>
  );
};

export default memo(DetailImg);
