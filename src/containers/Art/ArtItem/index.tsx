import s from './style.module.scss';
import Text from '@/animations/Text';

type IArtItemProps = {
  url: string;
  title: string;
  desc: string;
};

const ArtItem: React.FC<IArtItemProps> = ({ url, title, desc }) => {
  return (
    <div className={s.artItem}>
      <div className={s.left}>
        <img src={url} alt="" />
      </div>

      <div className={s.right}>
        <Text as={'p'} size={'24'} className={s.title}>
          {title}
        </Text>
        <Text as={'p'} size={'24'} className={s.desc}>
          {desc}
        </Text>
      </div>
    </div>
  );
};

export default ArtItem;
