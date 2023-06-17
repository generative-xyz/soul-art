import { FC } from 'react';
import s from './style.module.scss';
import ImageFrame from '@/components/ImageFrame';
import Text from '@Animations/Text';
import { AnimFade } from '@/animations/Fade';

export type contentItem = {
  id: number;
  title: string;
  img: string;
  content: string;
};

type TechItemProps = {
  item: contentItem;
};

const TechItem: FC<TechItemProps> = ({ item }) => {
  const { title, content, img } = item;

  return (
    <div className={s.techItem}>
      <div className={s['item-content']}>
        <Text
          as={'h5'}
          animOption={{ offset: 0.2, screen: 0, type: 'paragraph' }}
          className={s['item-content_title']}
        >
          {title}
        </Text>
        <Text
          as={'p'}
          animOption={{ offset: 0.3, screen: 0, type: 'paragraph' }}
          className={s['item-content_desc']}
        >
          {content}
        </Text>
      </div>
      <AnimFade offset={0.35} className={s['item-img']}>
        <ImageFrame type={'normal'}>
          <img src={img} alt="img" />
        </ImageFrame>
      </AnimFade>
    </div>
  );
};

export default TechItem;
