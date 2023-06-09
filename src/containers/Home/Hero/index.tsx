import Text from '@Animations/Text';
import s from './style.module.scss';
import cs from 'classnames';
import ImageFrame from '@/components/ImageFrame';
import IconSVG from '@/components/IconSVG';
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
import HeroModal from "@/containers/Landing/Introduce/Modal";
import { WHITEPAPER } from "@Constants/url";

const HomeHero: React.FC = () => {
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
                    <div className={s['introduceBox']}>
                        <Text
                            as={'div'}
                            size={'48'}
                            color={'white-primary'}
                            className={`${s['introduceBox-title']}`}
                        >
                            Souls and GM are two halves of a single artwork. Souls is the
                            cryptoart protocol and GM is the native cryptocurrency powering the
                            artwork.
                        </Text>

                        <div className={s['introduceBox-buttons']}>
                            <Link href={ROUTE_PATH.CLAIM} className={cs(s.button, s.init)}>
                                Adopt a Soul
                                {renderCountdown}
                            </Link>
                            <Link
                                href={ROUTE_PATH.GM}
                                className={cs(s.button, s.trans)}
                            >
                                Get GM
                            </Link>
                        </div>

                        <div className={s.introduce_actions}>
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
                                            window.open(
                                                WHITEPAPER
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
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Container>
            <HeroModal showModal={isShow} closeModal={handleCloseModal} />
        </div>
    );
};

export default HomeHero;
