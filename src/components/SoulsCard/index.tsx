import { IMAGE_TYPE } from '../NFTDisplayBox/constant';

import soulsCardStyles from './soulscard.module.scss';

import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import cs from 'classnames';

export interface INFTCard {
  href: string;
  image?: string;
  thumbnail?: string;
  contract?: string;
  tokenId?: string;
  contentType?: IMAGE_TYPE;
  title1?: string;
  fileSize?: number;
  className?: string;
}

const NFTCard = ({ href, image, className }: INFTCard) => {
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
        <Card.Body>
          <Card.Text className={soulsCardStyles.card_label}>
            Highest bid
          </Card.Text>
          <div
            className={cs(
              'd-flex justify-content-between align-items-center',
              soulsCardStyles.card_body__content
            )}
          >
            <Card.Text>1.5 BTC</Card.Text>

            <Card.Text>2d : 16h : 12m</Card.Text>
          </div>
        </Card.Body>
      </Card.Link>
    </Card>
  );
};

export default NFTCard;
