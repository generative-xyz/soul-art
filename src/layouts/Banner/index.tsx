import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import s from './style.module.scss';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route-path';
import { CDN_URL } from '@/configs';


const Banner: React.FC = (): React.ReactElement => {
  return (
    <div className={s.banner}>
      <p className={s.bannerText}>
        The first-ever cryptoart protocol & a new kind of art.
      </p>
      <Button borderRadius="100px" className={s.bannerButton}>
        <Link href={`${ROUTE_PATH.CLAIM}`} className={s.banner_link}>
          Adopt Souls
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
