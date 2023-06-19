import IconSVG from '@/components/IconSVG';
import s from './style.module.scss';
import { FC } from 'react';
import { detailExpand, detailRefresh } from '@/constants/asset';
import Explorer from '@/components/Explorer';

type DetailImgProps = {
  img: string | undefined;
};

const DetailImg: FC<DetailImgProps> = ({ img }) => {
  return (
    <div className={s.detailImg}>
      <div className={s.img}>
        {img && <Explorer url={img} />}
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
