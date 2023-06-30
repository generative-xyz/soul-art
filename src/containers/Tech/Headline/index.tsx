import IconSVG from '@/components/IconSVG';
import s from './style.module.scss';
import Text from '@/animations/Text';
type IHeadlineProps = {
  url: string;
  title: string;
};

const Headline: React.FC<IHeadlineProps> = ({ url, title }) => {
  return (
    <div className={s.wrapContent_headline}>
      <IconSVG
        src={url}
        className={s.headline_icon}
        maxWidth={'50px'}
        maxHeight={'50px'}
      />
      <Text as={'h2'} size={'48'} className={s.headline_title}>
        {title}
      </Text>
    </div>
  );
};

export default Headline;
