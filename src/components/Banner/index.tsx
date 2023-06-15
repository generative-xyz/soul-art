import { ARROW_URL } from '@/constants/asset';
import Button from '../Button';
import IconSVG from '../IconSVG';
import s from './style.module.scss';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route-path';

const Banner = () => {
  return (
    <div className={s.banner}>
      <p className={s.bannerText}>
        Posuere dolor adipiscing est et potenti odio condimentum euismod
        lobortis.{' '}
      </p>
      <Button borderRadius="100px" className={s.bannerButton}>
        <Link href={`${ROUTE_PATH.CLAIM}`} className={s.banner_link}>
          Claim Souls
          <IconSVG src={ARROW_URL} maxWidth="12" maxHeight="8" />
        </Link>
      </Button>
    </div>
  );
};

export default Banner;
