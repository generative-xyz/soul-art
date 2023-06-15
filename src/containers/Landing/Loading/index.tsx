import s from './style.module.scss';
import classNames from "classnames";
import Text from "@Animations/Text";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {AnimateContext} from "@Context/Animate";
import {PAGE_ENTER, PAGE_LOADED, PAGE_READY} from "@Constants/common";
import {gsap} from "gsap";
import loadImage from 'image-promise';
// import {useParallax} from "@Hooks/useParallax";

interface IProcessing {
    value: number;
    delta: number;
    onHold: number;
    persen: number;
    loaded: boolean;
    imageInLoaded: boolean;
}


export const Loading = (): JSX.Element => {

    const {setPageStatus, getLoaderCounter, registerLoader, unRegisterLoader} = useContext(AnimateContext);

    const refLoadingWrapper = useRef<HTMLDivElement | null>(null);
    const refMain = useRef<HTMLDivElement | null>(null);
    const refPara = useRef<HTMLImageElement | null>(null);

    const refLoading = useRef<HTMLDivElement | null>(null);
    const refPersent = useRef<HTMLSpanElement | null>(null);
    const processing = useRef<IProcessing>({
        value: 0,
        delta: 1,
        onHold: 0,
        persen: 0,
        loaded: false,
        imageInLoaded: false
    });

    const [isReady, setIsReady] = useState<boolean>(false);

    // useParallax(refMain, refPara, .5);
    const loadingComplete = useCallback(() => {
        setPageStatus(PAGE_LOADED);
        gsap.to(refLoading.current, {
            opacity: 0,
            delay: 0.2,
            ease: "power3.inOut",
            duration: 0.3,
            onComplete: () => {
                if (refLoading.current) {
                    refLoading.current?.style.setProperty('display', "none");
                }
                document.body.classList.remove("is-loading");
            },
        });

        setTimeout(() => setPageStatus(PAGE_ENTER), 500);
    }, [setPageStatus]);

    const looper = () => {

        if (!processing.current || !refPersent.current || !processing.current.imageInLoaded) return;

        processing.current.persen +=
            processing.current.delta + processing.current.onHold;
        processing.current.persen = Math.min(processing.current.persen, 100);

        if (refPersent.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            refPersent.current.textContent = `${Math.floor(
                processing.current.persen
            )}%`;
        }

        if (processing.current.persen >= 100) {
            gsap.ticker.remove(looper);
            loadingComplete();
        }

        // console.log('___getLoaderCounter()', getLoaderCounter())
        if (getLoaderCounter() > 0) {
            processing.current.delta *= 0.8;
            processing.current.onHold += 0.0001;
            if (processing.current.onHold >= 1) {
                processing.current.onHold = 0;
            }
        } else {
            processing.current.delta = 5;
            processing.current.onHold = 0;
        }
    };

    useEffect(() => {
        document.body.classList.add("is-loading", "hide-scroller");
        const loadContent = gsap.context(() => {
            gsap.ticker.add(looper);
        }, refLoading);


        registerLoader();
        if(refLoadingWrapper.current){
            const img = refLoadingWrapper.current?.querySelectorAll('img');
            loadImage(img).finally(() => {
                document.body.classList.add("is-loading-ready");
                processing.current.imageInLoaded = true;
                setIsReady(true);
                setPageStatus(PAGE_READY);
                // console.log('___PAGE_READY');
                unRegisterLoader();
            });
        }

        return () => {
            unRegisterLoader();
            document.body.classList.remove("is-loading");
            gsap.ticker.remove(looper);
            loadContent.revert();
        };
    }, [refLoadingWrapper]);

    return <div ref={refLoadingWrapper} className={classNames(s.loading, isReady ? s.isReady : '')}>
        <div ref={refMain} className={s.loading_bg}>
            <img ref={refPara} src="https://storage.googleapis.com/generative-static-prod/soul-art/hero-bg-min.jpeg"
                 alt="loading"/>
        </div>
        <div className={s.loading_wrapper} ref={refLoading}>
            <div className={classNames(s.loading_over)}>
                <img src="https://storage.googleapis.com/generative-static-prod/soul-art/loading-left-min.png"
                     alt="loading-left-min"/>
            </div>
            <div className={classNames(s.loading_over, s.loading_over__right)}>
                <img src="https://storage.googleapis.com/generative-static-prod/soul-art/loading-right-min.png"
                     alt="loading-right-min"/>
            </div>
            <img className={s.loading_over_overlay}
                 src="https://storage.googleapis.com/generative-static-prod/soul-art/overlay-hero-min.png"
                 alt="overlay-hero-min"/>
            <div className="container">
                <div className={s.container_inner}>
                    <div className={s.loading_icon}>
                    <span className={s.loading_icon_text}>
                        <span>Loading...</span><span className={classNames(s.loading_icon_text_counter, 'text-black')}
                                                     ref={refPersent}>0%</span>
                    </span>
                        <div className={s.loading_icon_inner}>
                            <img
                                src="https://storage.googleapis.com/generative-static-prod/soul-art/ic-loading-dark.svg"
                                alt="ic-loading"/>
                        </div>
                    </div>
                    <div className={s.loading_inner}>
                        <Text as={'p'} size={'d2'} className={'mb-1_16'}>
                            Welcome to New Bitcoin City
                        </Text>
                        <Text as={'p'} size={'20'} className={'text-'}>
                            Let the tale of Souls inspire you.
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    </div>
}