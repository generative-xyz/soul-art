import Text from '@Animations/Text';
import { AnimFade } from '@Animations/Fade';
import s from './style.module.scss';
import cs from 'classnames';
import ImageFrame from '@/components/ImageFrame';
import IconSVG from '@/components/IconSVG';
import HeroModal from './Modal';
import { useContext, useMemo, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { AnimateContext } from '@/contexts/animate-context';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route-path';
import { CDN_URL, CLAIM_START_TIME } from '@/configs';
import classNames from 'classnames';
import { modalPlay } from '@Constants/asset';
import SonarWaveCircle from '@/components/SonarWaveCircle';
import CountdownText from '@/components/CountdownText';
import useTimeComparison from '@/hooks/useTimeComparison';
import { WHITEPAPER } from '@Constants/url';

const Introduce: React.FC = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { setAudioPlaying, lenis, setIsShowProgress } =
    useContext(AnimateContext);
  const claimingStartComparisonResult = useTimeComparison(CLAIM_START_TIME);
  const isEventStarted =
    claimingStartComparisonResult !== null && claimingStartComparisonResult > 0;

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

  const renderCountdown = useMemo(() => {
    return (
      <>
        {!isEventStarted && (
          <span className={s.countdown}>
            <SonarWaveCircle />
            <CountdownText countDownTo={CLAIM_START_TIME} />
          </span>
        )}
      </>
    );
  }, [isEventStarted]);

  return (
    <div className={`${s.introduce} ${isShow ? s.popupOpen : ''}`}>
      <Container className={s.container}>
        <Col
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 6, offset: 0 }}
          md={{ span: 6, offset: 1 }}
          lg={{ span: 6, offset: 1 }}
          className={s.column}
        >
          <AnimFade className={s['introduceBox']} screen={0.1}>
            <AnimFade className={s['introduceVideo']} screen={0.1}>
              <Text
                as={'p'}
                size={'24'}
                color={'white-primary'}
                className={`${s['introduceBox-title']}`}
              >
                GM and Souls are two halves of a single artwork that is the
                historical symbol of New Bitcoin City.
                <br />
                <br />
                Souls is a revolutionary cryptoart protocol for experiencing art
                in an entirely new way. GM is the native cryptocurrency powering
                the protocol.
                <br />
                <br />
                The final artworks are soulbound. Souls are interconnected and
                perform their ever-changing artworks not as one but
                collectively.
                <br />
              </Text>
            </AnimFade>
            <AnimFade className={s['introduceBox-buttons']} screen={0.6}>
              <Link href={ROUTE_PATH.CLAIM} className={cs(s.button, s.init)}>
                Adopt a Soul
                {renderCountdown}
              </Link>
              <Link href={ROUTE_PATH.GM} className={cs(s.button, s.trans)}>
                Get GM
              </Link>
            </AnimFade>
            <AnimFade className={s.introduce_actions} screen={1}>
              <div className={s.introduce_actions_item}>
                <div className={s['introduceVideo']}>
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
                </div>
              </div>
              <div
                className={classNames(
                  s.introduce_actions_item,
                  s.introduce_actions_item__pdf
                )}
              >
                <div className={s['introduceVideo']}>
                  <h5 className={s['introduceVideo-title']}>
                    Read the Whitepaper
                  </h5>
                  <div
                    className={classNames(s['wrap-video'], s['wrap-pdf'])}
                    onClick={() => {
                      window.open(WHITEPAPER);
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
                </div>
              </div>
              <div
                className={classNames(
                  s.introduce_actions_item,
                  s.introduce_actions_item__pdf
                )}
              >
                <div className={s['introduceVideo']}>
                  <h5 className={s['introduceVideo-title']}>View Gallery</h5>
                  <div className={classNames(s['wrap-video'])}>
                    <ImageFrame type={'small'}>
                      <Link
                        href={ROUTE_PATH.GALLERY}
                        className={`${s.content} ${s.content_gallery}`}
                      >
                        <img
                          src={`${CDN_URL}/img-view-gallery.png`}
                          alt="view gallery thumbnail"
                          width={'115px'}
                          height={'86px'}
                          className={`${s.content_gallery_item} ${s.modalPlay}`}
                        />
                        {/* <IconSVG
                          src={`${CDN_URL}/icon-gallery1.svg`}
                          maxWidth={'115'}
                          maxHeight={'86'}
                          className={s.modalPlay}
                        /> */}
                      </Link>
                    </ImageFrame>
                  </div>
                </div>
              </div>
            </AnimFade>
          </AnimFade>
        </Col>
      </Container>
      <HeroModal showModal={isShow} closeModal={handleCloseModal} />
    </div>
  );
};

export default Introduce;
