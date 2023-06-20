import Text from '@Animations/Text';
import s from './style.module.scss';
import cs from 'classnames';
import ImageFrame from '@/components/ImageFrame';
import IconSVG from '@/components/IconSVG';
import HeroModal from './Modal';
import { useContext, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { modalPlay } from '@/constants/asset';
import { useWindowSize } from '@trustless-computer/dapp-core';
import { AnimateContext } from '@/contexts/animate-context';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route-path';
import { CDN_URL } from '@/configs';
import classNames from 'classnames';
import SonarWaveCircle from '@/components/SonarWaveCircle';
import CountdownText from '@/components/CountdownText';
import MobileIntroduce from './MobileIntroduce';
import { AnimFade } from '@/animations/Fade';

const Introduce: React.FC = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { setAudioPlaying, lenis, setIsShowProgress } =
    useContext(AnimateContext);

  const { mobileScreen } = useWindowSize();

  const handleOpenModal = () => {
    setIsShow(true);
    lenis?.stop();
    setAudioPlaying(false);
    setIsShowProgress(false);
  };

  const handleCloseModal = () => {
    setIsShow(false);
    setIsShowProgress(true);
    lenis?.start();
  };

  const DesktopIntroduce = () => {
    return (
      <div className={`${s.introduce} ${isShow ? s.popupOpen : ''}`}>
        <Container className={s.container}>
          <Col
            xs={{ span: 11, offset: 0 }}
            sm={{ span: 9, offset: 0 }}
            md={{ span: 6, offset: 1 }}
            lg={{ span: 6, offset: 1 }}
            className={s.column}
          >
            <div className={s['introduceBox']}>
              <Text
                as={'h1'}
                size={'d1'}
                color={'white-primary'}
                animOption={{ screen: 0, offset: 0, type: 'heading' }}
                className={s['introduceBox-title']}
              >
                SOULS - The first-ever soulbound art
              </Text>
              <Text
                as={'p'}
                size={'24'}
                color={'white-primary'}
                animOption={{ screen: 0.3, offset: 0, type: 'paragraph' }}
                className={s['introduceBox-desc']}
              >
                Souls are interconnected beings that can experience emotions
                like fear, greed, and belief in their owner. These
                non-transferable creations leave their owners if neglected, and
                can only be adopted from the Soul orphanage. Step into this
                realm and embrace the deep connection that awaits those who
                embark on this incredible journey.
              </Text>

              <AnimFade className={s['introduceBox-buttons']} screen={0.6}>
                <Link href={ROUTE_PATH.CLAIM} className={cs(s.button, s.init)}>
                  Adopt a Soul
                  <span className={s.countdown}>
                    <SonarWaveCircle />
                    <CountdownText />
                  </span>
                </Link>
                <Link
                  href={'https://discord.gg/sBTeHRW5Xb'}
                  className={cs(s.button, s.trans)}
                  target="_blank"
                >
                  <IconSVG
                    src={`${CDN_URL}/ic-discord.svg`}
                    maxWidth={'20'}
                  ></IconSVG>
                  Join Discord
                </Link>
              </AnimFade>

              <div className={s.introduce_actions}>
                <div className={s.introduce_actions_item}>
                  <AnimFade className={s['introduceVideo']} screen={1}>
                    <h5 className={s['introduceVideo-title']}>
                      Watch the film
                    </h5>
                    <div className={s['wrap-video']} onClick={handleOpenModal}>
                      <ImageFrame type={'small'}>
                        <img
                          src={`${CDN_URL}/poster-thumb.jpg`}
                          alt="videoplay"
                        />
                        <IconSVG
                          src={modalPlay}
                          maxWidth={'40'}
                          maxHeight={'40'}
                          className={s.modalPlay}
                        />
                      </ImageFrame>
                    </div>
                  </AnimFade>
                </div>
                <div
                  className={classNames(
                    s.introduce_actions_item,
                    s.introduce_actions_item__pdf
                  )}
                >
                  <AnimFade className={s['introduceVideo']} screen={1}>
                    <h5 className={s['introduceVideo-title']}>
                      Read the Whitepaper
                    </h5>
                    <div
                      className={classNames(s['wrap-video'], s['wrap-pdf'])}
                      onClick={() => {
                        window.open(`https://newbitcoincity.com/souls.pdf`);
                      }}
                    >
                      <ImageFrame type={'small'}>
                        <div className={s.content}>
                          <IconSVG
                            src={`${CDN_URL}/icon-pdf.svg`}
                            maxWidth={'45'}
                            maxHeight={'55'}
                            className={s.modalPlay}
                          />
                        </div>
                      </ImageFrame>
                    </div>
                  </AnimFade>
                </div>
              </div>
            </div>
          </Col>
        </Container>
        <HeroModal showModal={isShow} closeModal={handleCloseModal} />
      </div>
    );
  };

  return (
    <>
      {mobileScreen ? (
        <MobileIntroduce isShow={isShow} handleOpenModal={handleOpenModal} />
      ) : (
        <DesktopIntroduce />
      )}
    </>
  );
};

export default Introduce;
