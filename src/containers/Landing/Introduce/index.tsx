import Text from '@Animations/Text';
import { AnimFade } from '@Animations/Fade';
import s from './style.module.scss';
import cs from 'classnames';
import ImageFrame from '@/components/ImageFrame';
import IconSVG from '@/components/IconSVG';
import HeroModal from './Modal';
import { useContext, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { IMG_HERO_URL, mobileIntroduce, modalPlay } from '@/constants/asset';
import { AnimateContext } from '@/contexts/Animate';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route-path';
import { useWindowSize } from '@trustless-computer/dapp-core';

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

  const MobileIntroduce = () => {
    return (
      <div className={`${s.mobileIntroduce} ${isShow ? s.popupOpen : ''}`}>
        <Container className={s.container}>
          <div className={s.mobileImg}>
            <img src={mobileIntroduce} alt="background image" />
          </div>

          <div className={s.wrapContent}>
            <Text
              as={'h1'}
              size={'d1'}
              color={'white-primary'}
              className={s['introduceBox-title']}
            >
              SOULS - The first - ever soulbound art
            </Text>
            <Text
              as={'p'}
              size={'24'}
              color={'white-primary'}
              className={s['introduceBox-desc']}
            >
              Souls are interconnected beings that can experience emotions like
              fear, greed, and belief in their owner. These non-transferable
              creations leave their owners if neglected, and can only be adopted
              from the Soul orphanage. Step into this realm and embrace the deep
              connection that awaits those who embark on this incredible
              journey.
            </Text>
            <div className={s.wrapContent_btns}>
              <Link href={ROUTE_PATH.ART} className={cs(s.button, s.init)}>
                Adopt
              </Link>
              <Link href={ROUTE_PATH.CLAIM} className={cs(s.button, s.trans)}>
                Explore Art
              </Link>
            </div>
            <div className={s.wrapContent_video}>
              <h5 className={s['introduceVideo-title']}>Watch video story</h5>
              <div className={s['wrap-video']} onClick={handleOpenModal}>
                <ImageFrame type={'small'}>
                  <img src={IMG_HERO_URL} alt="videoplay" />
                  <IconSVG
                    src={modalPlay}
                    maxWidth={'40'}
                    maxHeight={'40'}
                    className={s.modalPlay}
                  />
                </ImageFrame>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
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
                <Link href={ROUTE_PATH.ART} className={cs(s.button, s.init)}>
                  Explore art
                </Link>
                <Link href={ROUTE_PATH.CLAIM} className={cs(s.button, s.trans)}>
                  Claim Souls
                </Link>
              </AnimFade>

              <AnimFade className={s['introduceVideo']} screen={1}>
                <h5 className={s['introduceVideo-title']}>Watch video story</h5>
                <div className={s['wrap-video']} onClick={handleOpenModal}>
                  <ImageFrame type={'small'}>
                    <img src={IMG_HERO_URL} alt="videoplay" />
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
          </Col>
        </Container>
        <HeroModal showModal={isShow} closeModal={handleCloseModal} />
      </div>
    );
  };

  return <>{mobileScreen ? <MobileIntroduce /> : <DesktopIntroduce />}</>;
};

export default Introduce;
