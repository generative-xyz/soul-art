import { ARROW_URL } from '@/constants/asset';
import Button from '../Button';
import IconSVG from '../IconSVG';
import s from './style.module.scss';

const Banner = () => {
  return (
    <div className={s.banner}>
      <p className={s.bannerText}>
        Posuere dolor adipiscing est et potenti odio condimentum euismod lobortis.{' '}
      </p>
      <Button borderRadius="100px" className={s.bannerButton}>
        Claim Souls
        <IconSVG src={ARROW_URL} maxWidth="12" maxHeight="8" />
      </Button>
    </div>
  );
};

export default Banner;
