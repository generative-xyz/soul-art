import { ROUTE_PATH } from '@/constants/route-path';
import { AssetsContext } from '@/contexts/assets-context';
import cs from 'classnames';
import Link from 'next/link';
import { Fragment, useContext } from 'react';
import Banner from '../Banner';
import s from './SubHeader.module.scss';

const SubHeader = ({ theme = 'light' }: { theme?: string }) => {
  const { ownerTokenId } = useContext(AssetsContext);

  const SUBHEADER_LINKS = [
    {
      title: 'Story',
      link: ROUTE_PATH.STORY,
    },
    {
      title: 'GM',
      link: ROUTE_PATH.GM,
    },
    {
      title: 'Orphanage',
      link: `${ROUTE_PATH.GALLERY}?is_orphan=1`,
    },
    {
      title: 'Your Soul',
      link: `${ROUTE_PATH.HOME}/${ownerTokenId}`,
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
          <Fragment key={`subheader-${index}`}>
            {!item.hide && <Link href={item.link}>{item.title}</Link>}
          </Fragment>
        ))}
      </div>
      <div>
        <Banner />
      </div>
    </div>
  );
};

export default SubHeader;
