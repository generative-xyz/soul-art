import Text from '@Animations/Text';
import { AnimFade } from '@Animations/Fade';
import s from './style.module.scss';
import cs from 'classnames';
import ImageFrame from '@/components/ImageFrame';
import IconSVG from '@/components/IconSVG';
import HeroModal from './Modal';
import { useContext, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { AnimateContext } from '@/contexts/animate-context';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route-path';
import { CDN_URL } from '@/configs';
import classNames from 'classnames';
import { modalPlay } from '@Constants/asset';
import SonarWaveCircle from '@/components/SonarWaveCircle';
import CountdownText from '@/components/CountdownText';

const Introduce: React.FC = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { setAudioPlaying, lenis, setIsShowProgress } =
    useContext(AnimateContext);

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

  return (
    <div className={`${s.introduce} ${isShow ? s.popupOpen : ''}`}>
      <Container className={s.container}>
        <Col
          xs={{ span: 11, offset: 0 }}
          sm={{ span: 6, offset: 0 }}
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
              className={`${s['introduceBox-title']} text-uppercase`}
            >
              Souls
            </Text>
            <Text
              as={'p'}
              size={'28'}
              color={'white-primary'}
              fontWeight="regular"
              animOption={{ screen: 0.3, offset: 0, type: 'paragraph' }}
              className={s['introduceBox-subTitle']}
            >
              The first-ever cryptoart protocol powering a new kind of art.
            </Text>
            <div className={s['introduceBox-desc-wrapper']}>
              <Text
                as={'p'}
                size={'20'}
                color={'white-primary'}
                animOption={{ screen: 0.3, offset: 0, type: 'paragraph' }}
                className={s['introduceBox-desc']}
              >
                Managed by the community-run DAO and powered by the
                cryptocurrency GM, Souls is a revolutionary cryptoart protocol
                for experiencing art on Bitcoin.
              </Text>
              <Text
                as={'p'}
                size={'20'}
                color={'white-primary'}
                animOption={{ screen: 0.3, offset: 0, type: 'paragraph' }}
                className={s['introduceBox-desc']}
              >
                Souls are soulbound artworks that can’t be bought or sold. As
                on-chain living art, a nurtured Soul will stay with you forever,
                but a neglected Soul might leave you and find a new home.
              </Text>
              <Text
                as={'p'}
                size={'20'}
                color={'white-primary'}
                animOption={{ screen: 0.3, offset: 0, type: 'paragraph' }}
                className={s['introduceBox-desc']}
              >
                But above all, Souls are interconnected and perform their
                ever-changing artworks not as one but collectively.
              </Text>
            </div>

            <AnimFade className={s['introduceBox-buttons']} screen={0.6}>
              <Link href={ROUTE_PATH.CLAIM} className={cs(s.button, s.init)}>
                Adopt a Soul
                <span className={s.countdown}>
                  <SonarWaveCircle />
                  <CountdownText />
                </span>
              </Link>
              <Link
                href={'https://newbitcoincity.com/gm '}
                className={cs(s.button, s.trans)}
                target="_blank"
              >
                Get GM
              </Link>
            </AnimFade>

            <div className={s.introduce_actions}>
              <div className={s.introduce_actions_item}>
                <AnimFade className={s['introduceVideo']} screen={1}>
                  <h5 className={s['introduceVideo-title']}>Watch the film</h5>
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
                      window.open(
                        `https://newbitcoincity.com/souls/whitepaper.pdf`
                      );
                    }}
                  >
                    <ImageFrame type={'small'}>
                      <div className={s.content}>
                        <IconSVG
                          src={`${CDN_URL}/icon-pdf-s.svg`}
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

export default Introduce;
