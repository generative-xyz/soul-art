import { IMAGE_TYPE } from '../NFTDisplayBox/constant';

import soulsCardStyles from './soulscard.module.scss';

import Card from 'react-bootstrap/Card';
import Button from '../Button';
import Link from 'next/link';

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
      <Card.Link href={href} as={Link}>
        <div className={soulsCardStyles.card_image__container}>
          <Card.Img
            variant="top"
            src={image}
            className={soulsCardStyles.card_image}
          />
        </div>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk
            of the cards content.
          </Card.Text>
          <Button>Go somewhere</Button>
        </Card.Body>
      </Card.Link>
    </Card>
  );
};

export default NFTCard;
