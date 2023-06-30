import s from './style.module.scss';
import Text from '@/animations/Text';

type ITechniqueItemProps = {
  key: string;
  url: string;
  title: string;
};
const TechniqueItem: React.FC<ITechniqueItemProps> = ({ url, title }) => {
  return (
    <div className={s.itemTechnique}>
      <img src={url} alt="image" />
      <Text as={'p'} size={'24'} className={s.itemTitle}>
        {title}
      </Text>
    </div>
  );
};

export default TechniqueItem;
