import { FC } from 'react';
import s from './style.module.scss';

export type contentItem = {
  id: number;
  title: string;
  content: string;
};

type TechItemProps = {
  item: contentItem;
};

const TechItem: FC<TechItemProps> = ({ item }) => {
  const { id, title, content } = item;

  return (
    <div className={s.techItem}>
      <div className={s['item-content']}>
        <h5 className={s['item-content_title']}>{title}</h5>
        <p className={s['item-content_desc']}>{content}</p>
      </div>
      <div className={s['item-img']}>
        <img
          src={`https://storage.googleapis.com/generative-static-prod/soul-art/techitem-${id}.jpg`}
          alt="img"
        />
        <span className={s['top-left']}></span>
        <span className={s['top-right']}></span>
        <span className={s['bottom-left']}></span>
        <span className={s['bottom-right']}></span>
      </div>
    </div>
  );
};

export default TechItem;
