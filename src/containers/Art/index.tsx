import { Col, Container } from 'react-bootstrap';
import s from './style.module.scss';
import cs from 'classnames';
import IconSVG from '@/components/IconSVG';
import Text from '@/animations/Text';
import { CDN_URL } from '@/configs';
import Header from '@/layouts/Header';
import { HEADER_HEIGHT } from '@/layouts';
import TechniqueItem from './Item';
import ArtItem from './ArtItem';
import Link from 'next/link';

const ArtLandingPage = () => {
  const itemTechniques = [
    {
      url: `${CDN_URL}/art/art-img1.jpg`,
      title:
        'The process begins by sampling the colors of specific pixels from the base drawing. These colors are then used to create a series of curve lines that are placed within the artwork.',
    },
    {
      url: `${CDN_URL}/art/art-img2.jpg`,
      title:
        'The process begins by sampling the colors of specific pixels from the base drawing. These colors are then used to create a series of curve lines that are placed within the artwork.',
    },
    {
      url: `${CDN_URL}/art/art-img3.jpg`,
      title:
        'The colors of these curve lines are subtly shifted, adding a touch of dynamism and richness to the overall composition.',
    },
  ];

  const itemArts = [
    {
      url: `${CDN_URL}/art/soul-cloud-final.gif`,
      title: 'Cloud',
      desc: 'The cloud layer adds a sense of atmosphere to the artwork. The shape, density, and arrangement of the clouds are carefully designed to evoke a specific mood or aesthetic.',
    },
    {
      url: `${CDN_URL}/art/soul-sunSize-final.gif`,
      title: 'The Sun',
      desc: 'The sun layer serves as the focal point of the artwork, radiating warmth and light. Its position, size, and color are thoughtfully determined to create a visually appealing and harmonious balance.',
    },
    {
      url: `${CDN_URL}/art/soul-weather-final.gif`,
      title: 'Weather and Sun Effects',
      desc: 'Additional layers are introduced to weather conditions and sun-related effects. These layers may include stormy clouds, raindrops, rainbows, sun flares, and sun pillars, etc.',
    },
    {
      url: `${CDN_URL}/art/soul-neighborhood.gif`,
      title: 'Neighborhood',
      desc: 'The neighborhood layer showcases a specific landscape from the new Bitcoin city, providing a sense of place and identity to the artwork. This layer may feature buildings, streets, trees, or other architectural and natural elements, adding depth and context to the composition.',
    },
    {
      url: `${CDN_URL}/art/soul-decor-final.gif`,
      title: 'Decoration and Special Objects',
      desc: 'This layer serves as an opportunity to add an extra touch of enchantment and surprise to the composition. It introduces various elements such as birds, airplanes, and other delightful objects that bring life and character to the artwork.',
    },
  ];

  return (
    <div className={s.artLandingPage}>
      <Header height={HEADER_HEIGHT} isAnimation={false} theme={''} />

      <Container className={s.container}>
        <Col className={s.column} lg={{ span: 10, offset: 1 }}>
          <div className={s.wrapContent}>
            <div className={s.wrapContent_headline}>
              <IconSVG
                src={`${CDN_URL}/art/code-square.svg`}
                className={s.headline_icon}
                maxWidth={'50px'}
                maxHeight={'50px'}
              />
              <Text as={'h2'} size={'48'} className={s.headline_title}>
                Oil paintings as code
              </Text>
            </div>

            <div className={cs(s.wrapContent_p1, s.mb_120)}>
              <div className={s.left}>
                <Text as={'p'} size={'24'} className={s.text}>
                  The Souls collection is a captivating testament to artistic
                  expression and symbolism, inviting viewers into a mesmerizing
                  world of generative art. Each Soul within the collection
                  presents a unique landscape that evokes emotions and conveys
                  profound meanings.
                </Text>
                <Text as={'p'} size={'24'} className={s.text}>
                  The art direction of the Souls collection embraces the
                  aesthetic of traditional oil paintings— meticulously crafted
                  to simulate the texture and brushwork of classical artworks.
                  Through the innovative use of generative algorithms, each Soul
                  becomes a living masterpiece, dynamically evolving and
                  reacting to various stimuli.
                </Text>
              </div>

              <div className={s.right}>
                <img src={`${CDN_URL}/art/art1.jpg`} alt="" />
              </div>
            </div>

            <div className={cs(s.wrapContent_p2, s.mb_120)}>
              <Text as={'p'} size={'24'} className={s.textHeadline}>
                {`Here's a breakdown of the technique:`}
              </Text>

              <div className={s.flexDiv}>
                {itemTechniques.map(({ title, url }) => (
                  <TechniqueItem key={title} url={url} title={title} />
                ))}
              </div>
            </div>

            <div className={cs(s.wrapContent_p3, s.mb_120)}>
              <Text as={'p'} size={'24'} className={s.textHeadline}>
                {`Here is the drawing function from the artwork source code:`}
              </Text>

              <div className={s.p3_img}>
                <img src={`${CDN_URL}/art/codeBlock.jpg`} alt="image" />
              </div>
            </div>

            <div className={s.wrapContent_p4}>
              <img src={`${CDN_URL}/art/art2.jpg`} alt="image" />
            </div>

            <div className={cs(s.wrapContent_p5, s.mb_120)}>
              <Text as={'p'} size={'24'} className={s.textHeadline}>
                {`In the creation of the base drawing, a combination of 4 to 12 layers is meticulously crafted, each layer contributing to the overall visual composition. The layers that make up the base drawing include:`}
              </Text>

              <div className={s.flexDiv}>
                {itemArts.map(({ title, url, desc }) => (
                  <ArtItem key={title} url={url} title={title} desc={desc} />
                ))}
              </div>
            </div>

            <div className={cs(s.wrapContent_p6, s.mb_120)}>
              <Text as={'p'} size={'24'} className={s.text}>
                All of these layers are programmatically generated using p5.js
                code, every layer within the artwork is inherently distinct,
                ensuring that no two layers are exactly alike throughout the
                entire collection.
              </Text>
              <Text as={'p'} size={'24'} className={s.text}>
                The colors of each layer adhere to a carefully selected color
                palette, creating a cohesive and harmonious visual experience.
                The contrast between the layers is meticulously adjusted to
                achieve a beautiful separation and depth, enhancing the overall
                aesthetic appeal of the artwork.
              </Text>
            </div>

            <div className={cs(s.wrapContent_p7)}>
              <div className={s.p7_img}>
                <img src={`${CDN_URL}/art/art3.png`} alt="image" />
              </div>

              <Text as={'p'} size={'24'} className={s.text}>
                The Souls artworks offer a unique and immersive experience that
                can be enjoyed in various aspect ratios, allowing viewers to
                explore and perceive the artwork in different ways. By
                experimenting with different screen dimensions and aspect
                ratios, viewers can unlock new perspectives and uncover hidden
                details within the composition.
              </Text>
            </div>
          </div>

          <Link
            href={'https://newbitcoincity.com/souls/whitepaper.pdf'}
            target="_blank"
            className={s.bottomButton}
          >
            Read the Whitepaper
            <IconSVG
              src={`${CDN_URL}/bannerArrow.svg`}
              maxWidth={'10.67'}
              maxHeight={'8'}
            ></IconSVG>
          </Link>
        </Col>
      </Container>
    </div>
  );
};

export default ArtLandingPage;
