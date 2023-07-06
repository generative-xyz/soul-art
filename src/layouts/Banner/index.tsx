import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import s from './style.module.scss';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route-path';
import { CDN_URL } from '@/configs';
import { useContext } from 'react';
import { AssetsContext } from '@/contexts/assets-context';
import { GM_TOKEN_PAGE } from '@/constants/url';

const Banner: React.FC = (): React.ReactElement => {
  const { ownerTokenId, gmToUnlockNextFeature } = useContext(AssetsContext);

  // const getFeatureNameByIndex = () => {}

  return (
    <div className={s.banner}>
      <p className={s.bannerText}>
        {ownerTokenId ? (
          <>
            Top up <span id="gm-unlock">{gmToUnlockNextFeature} GM</span> to
            unlock the effect
          </>
        ) : (
          'The first-ever cryptoart protocol & a new kind of art.'
        )}
      </p>
      <Button borderRadius="100px" className={s.bannerButton}>
        <Link
          href={ownerTokenId ? GM_TOKEN_PAGE : ROUTE_PATH.CLAIM}
          className={s.banner_link}
          target={ownerTokenId ? '_blank' : '_self'}
        >
          {ownerTokenId ? 'Buy GM' : 'Adopt Souls'}
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
