import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { ISoul } from '@/interfaces/api/soul';
import Link from 'next/link';
import { FC, memo } from 'react';
import moreSectionStyles from './moreSection.module.scss';
import SoulsCard from '@/components/SoulCards';

type MoreSectionProps = {
  soulItems: ISoul[];
};

const MoreSection: FC<MoreSectionProps> = ({ soulItems }) => {
  return (
    <section className={'container'}>
      <h4 className={moreSectionStyles.heading}>
        More from this collection
        <Button className={moreSectionStyles.button}>
          <Link href={`${ROUTE_PATH.CLAIM}`} className={moreSectionStyles.link}>
            View all art
            <IconSVG
              src={`${CDN_URL}/bannerArrow.svg`}
              maxWidth="12"
              maxHeight="8"
            />
          </Link>
        </Button>
      </h4>
      <div className={moreSectionStyles.grid}>
        {soulItems?.map(({ tokenId, image }) => (
          <SoulsCard
            key={`token-${tokenId}`}
            href={`/${tokenId}`}
            image={image}
            tokenId={tokenId}
            title={`Souls #${tokenId}`}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(MoreSection);
