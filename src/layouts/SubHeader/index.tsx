import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { AssetsContext } from '@/contexts/assets-context';
import cs from 'classnames';
import Link from 'next/link';
import { useContext } from 'react';
import Banner from '../Banner';
import s from './SubHeader.module.scss';

const SubHeader = ({ theme = 'light' }: { theme?: string }) => {
  const { ownerTokenId, availableFeatures } = useContext(AssetsContext);
  const SUBHEADER_LINKS = [
    {
      title: 'Souls',
      link: ROUTE_PATH.STORY,
    },
    {
      title: 'GM',
      link: ROUTE_PATH.GM,
    },
    {
      title: 'Gallery',
      link: `${ROUTE_PATH.GALLERY}`,
    },
    // TODO: uncomment when orphanage is ready
    {
      title: 'Orphanage',
      link: `${ROUTE_PATH.GALLERY}?is_orphan=1`,
    },
    {
      title: 'Your Soul',
      link: `${ROUTE_PATH.HOME}/${ownerTokenId}`,
      newEffect: availableFeatures && availableFeatures?.length > 0,
      hide: !ownerTokenId,
    },
    {
      title: 'Tech',
      link: ROUTE_PATH.TECH,
    },
    {
      title: 'Art',
      link: ROUTE_PATH.ART,
    },
  ];

  return (
    <div className={cs(s.wrapper, s[theme])}>
      <div className={s.links}>
        {SUBHEADER_LINKS.map((item, index) => (
          <div key={`subheader-${index}`} className={s.links_item}>
            {item.newEffect && (
              <div className={s.new_effect}>
                <IconSVG
                  src={`${CDN_URL}/ic-sparkles.svg`}
                  maxWidth="12"
                  maxHeight="12"
                />
                <span>New Effect</span>
              </div>
            )}
            {!item.hide && <Link href={item.link}>{item.title}</Link>}
          </div>
        ))}
      </div>
      <Banner />
    </div>
  );
};

export default SubHeader;
