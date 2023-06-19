import { shortenAddress } from '@/utils';
import soulsCardStyles from './soulscard.module.scss';

import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';

export interface INFTCard {
  href: string;
  image?: string;
  thumbnail?: string;
  tokenId?: string;
  className?: string;
  title?: string;
  ownerAddr?: string;
}

const NFTCard = ({ href, image, className, ownerAddr }: INFTCard) => {
  return (
    <Card className={className}>
      <Card.Link href={href} as={Link} className={soulsCardStyles.card_link}>
        <div className={soulsCardStyles.card_image__container}>
          <Card.Img
            variant="top"
            src={image}
            className={soulsCardStyles.card_image}
          />
        </div>
        <Card.Body className={soulsCardStyles.card_body}>
          {/* <Card.Text className={soulsCardStyles.card_label}>
            Highest bid
          </Card.Text> */}
          {/* <div
            className={cs(
              'd-flex justify-content-between align-items-center',
              soulsCardStyles.card_body__content
            )}
          >
            <Card.Text>1.5 BTC</Card.Text>

            <Card.Text>2d : 16h : 12m</Card.Text>
          </div> */}
          <div className={soulsCardStyles.hoverInfo}>
            <p>Soul #123</p>
            <div>
              {!!ownerAddr && (
                <>
                  <div className={soulsCardStyles.avatarWrapper}>
                    <Jazzicon
                      diameter={32}
                      seed={jsNumberForAddress(ownerAddr)}
                    />
                  </div>
                  <div className={soulsCardStyles.address}>
                    {shortenAddress(ownerAddr)}
                  </div>
                </>
              )}
            </div>
          </div>
        </Card.Body>
      </Card.Link>
    </Card>
  );
};

export default NFTCard;
