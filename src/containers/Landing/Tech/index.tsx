import { Container, Row, Col } from 'react-bootstrap';
import TechItem from './TechItem';
import Text from '@Animations/Text';
import s from './style.module.scss';
import { contentItem } from './TechItem';
import { techOverlay } from '@/constants/asset';
import { CDN_URL } from '@/configs';
import Link from 'next/link';
import IconSVG from '@/components/IconSVG';

const Tech: React.FC = () => {
  const contentArray: contentItem[] = [
    {
      id: 2,
      title: 'Sun Size',
      img: `${CDN_URL}/art/soul-sunSize-final.gif`,
      content:
        'The size of the sun in the artwork is directly influenced by the GM balance. As the GM balance increases, the sun expands, symbolizing the growing strength and significance of the Souls within the New Bitcoin City',
    },
    {
      id: 5,
      title: 'Brushwork',
      img: `${CDN_URL}/solagif/Brushwork.gif`,
      content: `The brushwork in the artwork reflects the owner's GM token journey. Holding GM tokens for a longer time results in stable brushwork, while frequent trading leads to wilder strokes. The brushwork captures the owner's commitment and trading style.`,
    },
    {
      id: 1,
      title: 'Sun Height',
      img: `${CDN_URL}/art/soul-sunHeight-final.gif`,
      content:
        'When the GM token price rises, the Souls soar higher in the sky, symbolizing the collective optimism and excitement within the community.',
    },
    {
      id: 3,
      title: 'Weather',
      img: `${CDN_URL}/art/soul-weather-final.gif`,
      content: `The artwork's weather reflects the community's emotions. Fear (FUD) brings stormy clouds, caution, and uncertainty. Belief (HOLD) creates a clear and sunny sky, representing optimism. In moments of greed (FOMO), enchanting effects like rainbows, sun flares, and sun pillars appear, adding excitement to the scene.
`,
    },
    {
      id: 6,
      title: 'Soul Departure',
      img: `${CDN_URL}/solagif/SoulDeparture.gif`,
      content: `When a Soul is about to leave its owner, indicated by the GM balance falling below a threshold (currently set at 1 $GM), a remarkable transformation takes place. The sun disappears, leaving behind a momentary void and the artwork undergoes a glitch effect. A reminder of the transient nature of ownership and the need for active engagement and care in nurturing the Souls.`,
    },
  ];

  return (
    <>
      <div className={s.techSection}>
        <div className={s['background']}>
          <img src={techOverlay} alt="background" />
        </div>
        <Container className={s.container}>
          <Row>
            <Col className={`${s.leftContainer}`} xs={12} md={5} lg={4}>
              <div className={s.wrapLeftContainer}>
                <Text
                  size={'d0'}
                  color={'primary-white'}
                  animOption={{ screen: 0, offset: 0, type: 'heading' }}
                  className={s['leftContainer-title']}
                >
                  $GM: Empowering Ownership and Influence
                </Text>

                <Text
                  as={'p'}
                  size={'24'}
                  color={'primary-white'}
                  animOption={{ screen: 0, offset: 0, type: 'paragraph' }}
                  className={s['leftContainer-subTitle']}
                >
                  $GM serves as the native currency and a fundamental element
                  within the Souls ecosystem. As the first smart contract on
                  Bitcoin, these tokens not only represent ownership of a Soul
                  but also grant holders a unique level of influence on the
                  artwork. It empowers users to shape the artistic expression of
                  the Souls and significantly influences the direction and
                  evolution of the entire ecosystem.
                </Text>

                <Link
                  href={`https://newbitcoincity.com/gm`}
                  className={s.leftContainerButton}
                >
                  Learn more about GM
                  <IconSVG
                    src={`${CDN_URL}/bannerArrow.svg`}
                    maxWidth="12"
                    maxHeight="8"
                    className={s.icon}
                  />
                </Link>
              </div>
            </Col>
            <Col
              className={s['right-container']}
              xs={12}
              md={7}
              lg={{ span: 7, offset: 1 }}
            >
              {contentArray.map(item => (
                <TechItem key={item.id} item={item} />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Tech;
