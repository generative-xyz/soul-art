import { FC } from 'react';
import s from './style.module.scss';
import ImageFrame from '@/components/ImageFrame';
import Text from '@Animations/Text';

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
        <Text as={'h5'} animOption={{offset: .1, screen: 0, type: 'paragraph'}}  className={s['item-content_title']}>{title}</Text>
        <p className={s['item-content_desc']}>{content}</p>
      </div>
      <div className={s['item-img']}>
        <ImageFrame>
          <img
            src={`https://storage.googleapis.com/generative-static-prod/soul-art/techitem-${id}.jpg`}
            alt="img"
          />
        </ImageFrame>
      </div>
    </div>
  );
};

export default TechItem;
