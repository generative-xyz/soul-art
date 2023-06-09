import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import SoulCard from '@/components/SoulCard';
import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { IToken } from '@/interfaces/api/marketplace';
import Link from 'next/link';
import { FC, memo } from 'react';
import { Container } from 'react-bootstrap';
import moreSectionStyles from './moreSection.module.scss';

type MoreSectionProps = {
  soulItems: IToken[];
};

const MoreSection: FC<MoreSectionProps> = ({ soulItems }) => {
  return (
    <Container className={moreSectionStyles.container}>
      <h4 className={moreSectionStyles.heading}>
        Meet more Souls
        <Button className={moreSectionStyles.button}>
          <Link
            href={`${ROUTE_PATH.GALLERY}`}
            className={moreSectionStyles.link}
          >
            View Gallery
            <IconSVG
              src={`${CDN_URL}/bannerArrow.svg`}
              maxWidth="12"
              maxHeight="8"
            />
          </Link>
        </Button>
      </h4>
      <div className={moreSectionStyles.grid}>
        {soulItems?.map(({ tokenId, image, imageCapture, owner, name }) => (
          <SoulCard
            key={`token-${tokenId}`}
            href={`/souls/${tokenId}`}
            image={imageCapture ?? image}
            tokenId={tokenId}
            title={!!name ? name : `Soul #${tokenId}`}
            ownerAddr={owner}
          />
        ))}
      </div>
    </Container>
  );
};

export default memo(MoreSection);
