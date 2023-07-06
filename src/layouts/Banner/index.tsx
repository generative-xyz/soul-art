import Button from '@/components/Button';
import { Feature } from '@/constants/feature';
import { ROUTE_PATH } from '@/constants/route-path';
import { GM_TOKEN_PAGE } from '@/constants/url';
import { AssetsContext } from '@/contexts/assets-context';
import Link from 'next/link';
import { useContext } from 'react';
import s from './style.module.scss';

const Banner: React.FC = (): React.ReactElement => {
  const { ownerTokenId, gmToUnlockNextFeature, nextUnlockFeatureId } =
    useContext(AssetsContext);

  return (
    <div className={s.banner}>
      <p className={s.bannerText}>
        {ownerTokenId ? (
          <>
            Top up <span id="gm-unlock">{gmToUnlockNextFeature} GM</span> to
            unlock the {Object.values(Feature)[nextUnlockFeatureId as number]}{' '}
            effect
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
        </Link>
      </Button>
    </div>
  );
};

export default Banner;
