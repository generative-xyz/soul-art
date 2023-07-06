import Header from '@/layouts/Header';
import s from './style.module.scss';
import { HEADER_HEIGHT } from '@/layouts';
import { Col, Container } from 'react-bootstrap';
import { CDN_URL } from '@/configs';
import Text from '@/animations/Text';
import Headline from './Headline';
import Link from 'next/link';
import IconSVG from '@/components/IconSVG';
import { WHITEPAPER } from '@Constants/url';

const TechLandingPage = () => {
  return (
    <div className={s.techLandingPage}>
      <Header height={HEADER_HEIGHT} isAnimation={false} theme={''} />

      <Container className={s.container}>
        <Col className={s.column} lg={{ span: 10, offset: 1 }}>
          <div className={s.wrapContent}>
            <Headline
              url={`${CDN_URL}/atom.svg`}
              title={'The Souls Cryptoart Protocol'}
            />

            <div className={`${s.wrapContent_content} ${s.wrapContent_flex}`}>
              <div className={s.leftContent}>
                <Text as={'p'} size={'24'} className={s.content_desc}>
                  The Souls protocol is designed to provide an ever-lasting
                  infrastructure to support the Souls artworks. At the core of
                  the protocol is a set of Solidity smart contracts running on
                  Bitcoin via the Trustless Computer protocol.
                </Text>
                <Text as={'p'} size={'24'} className={s.content_desc}>
                  These smart contracts act as the central coordinator,
                  orchestrating the interactions between Souls and their
                  collectors. These smart contracts ensure the smooth
                  functioning of the Souls collection, handling interactions
                  such as Souls adoption, Souls visualization, and DAO
                  governance.
                </Text>
                <Text as={'p'} size={'24'} className={s.content_desc}>
                  The Souls DAO serves as a decentralized governance mechanism,
                  allowing collectors to make decisions and steer the direction
                  of the Souls protocol. Through the DAO, collectors can propose
                  and vote on important matters, including changes to the Soul
                  orphanage rules, community initiatives, and resource
                  allocation.
                </Text>
              </div>

              <div className={s.rightContent}>
                <img src={`${CDN_URL}/tech/tech1(1).png`} alt="image" />
              </div>
            </div>

            <div className={s.wrapContent_bottom}>
              <img src={`${CDN_URL}/tech/Dark%20(1).jpg`} alt="image" />
              <Text className={s.bottomText} size={'24'}>
                To provide a user-friendly interface and seamless experience,
                the Soul system also includes a dedicated website. This website
                serves as a hub for information about the Souls collection,
                allowing users to explore, adopt, and interact with Souls. It
                provides access to the Soul orphanage, where users can browse
                available Souls, submit adoption proposals, and view their
                adopted Souls.
              </Text>
            </div>
          </div>

          <div className={`${s.wrapContent} ${s.wrapContentBottom}`}>
            <Headline
              url={`${CDN_URL}/tech/heart-circle.svg`}
              title={'Souls live on Bitcoin forever'}
            />

            <Text size={'24'} className={`${s.text} ${s.mb_60}`}>
              The Souls collection embraces the concept of being fully on-chain,
              revolutionizing the way digital art is created and shared. At the
              heart of this innovation is the utilization of on-chain libraries,
              starting with the integration of the p5.js and web3.js libraries.
            </Text>

            <div className={s.imgMedium}>
              <img src={`${CDN_URL}/tech/tech3(1).png`} alt="image" />
            </div>
            <Text size={'24'} className={`${s.text} ${s.mb_32}`}>
              The Souls collection embraces the concept of being fully on-chain,
              revolutionizing the way digital art is created and shared. At the
              heart of this innovation is the utilization of on-chain libraries,
              starting with the integration of the p5.js and web3.js libraries.
            </Text>

            <div className={s.imgFull}>
              <img src={`${CDN_URL}/tech/code_01(1).jpg`} alt="image" />
            </div>
            <Text size={'24'} className={`${s.text} ${s.mb_32}`}>
              p5.js—a powerful JavaScript library for creative coding—enables
              artists and creators to express their vision through generative
              art and interactive visuals. By bringing p5.js onto the Bitcoin
              blockchain, the Souls collection introduces a new era of artistic
              possibilities. Artists can utilize the expressive capabilities of
              p5.js to create unique and captivating generative art, showcasing
              their creativity and pushing the boundaries of digital art.
            </Text>

            <div className={s.imgFull}>
              <img src={`${CDN_URL}/tech/code_02(1).jpg`} alt="image" />
            </div>

            <Text size={'24'} className={`${s.text}`}>
              {` But the innovation doesn't stop there. The Souls collection also
              embraces the power of the Trussless Computer protocol, allowing
              for the integration of other on-chain libraries in the future.
              Artists and developers can bring their preferred libraries, such
              as three.js or other powerful frameworks, onto the Bitcoin
              blockchain, expanding the creative palette and opening up endless
              possibilities for future gen-art collections.`}
            </Text>
          </div>

          <Link href={WHITEPAPER} target="_blank" className={s.bottomButton}>
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

export default TechLandingPage;
