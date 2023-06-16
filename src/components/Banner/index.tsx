import Button from '../Button';
import IconSVG from '../IconSVG';
import s from './style.module.scss';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route-path';
import { CDN_URL } from '@/configs';

type IBannerProps = {
  type: string;
};

const Banner: React.FC<IBannerProps> = ({ type }) => {
  return (
    <div className={s.banner}>
      {type === 'claim' ? (
        <p className={s.bannerText}>
          Experience the first soulbound art on-chain
        </p>
      ) : (
        <p className={s.bannerText}>
          Posuere dolor adipiscing est et potenti odio condimentum euismod
          lobortis.
        </p>
      )}
      <Button borderRadius="100px" className={s.bannerButton}>
        <Link href={`${ROUTE_PATH.CLAIM}`} className={s.banner_link}>
          Claim Souls
          <IconSVG
            src={`${CDN_URL}/bannerArrow.svg`}
            maxWidth="11"
            maxHeight="8"
          />
        </Link>
      </Button>
    </div>
  );
};

export default Banner;
