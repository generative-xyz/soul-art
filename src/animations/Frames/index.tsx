import React, {ReactNode, useLayoutEffect, useRef} from 'react';
import classNames from 'classnames';
import {useScrollTrigger} from '@Hooks/useScrollTrigger';
import {MathLerp, MathMap, webpSupported} from '@Services/Animate/AnimateMathUtil';
import s from './Frames.module.scss';

interface IProps {
    className: string;
    urlFrame: string;
    webmFrame?: string;
    totalFrames: number;
    children: ReactNode;
    height: number;
    width: number;
    onProcessing?: (n: number) => void;
    onEnter?: () => void;
    start?: () => void;
    end?: () => void;
    formatFrameUrl?: (s: string, i: number) => string;
}

interface IRefDomFrames {
    currentFrame: number;
    images: { image: HTMLImageElement; frame: number; isError: boolean }[];
    lastFrame: number;
    progress: number;
    framesFirstLoad: number;
    currentUrlFrame?: string;
    ctx: CanvasRenderingContext2D | null;
    canvas?: HTMLCanvasElement;
    scroller?: any | null;
    scrollHeight?: number;
    timeOut?: any;
}

export const Frames: React.FC<IProps> = ({
                                             className = '',
                                             urlFrame = '',
                                             webmFrame = '',
                                             totalFrames = 0,
                                             children,
                                             height = 1080,
                                             width = 1920,
                                             onProcessing,
                                             onEnter,
                                             start,
                                             end,
                                             formatFrameUrl,
                                         }) => {
    const comp = useRef<HTMLDivElement | null>(null);
    const refCanvas = useRef<HTMLCanvasElement | null>(null);
    const refDom = useRef<IRefDomFrames>({
        currentFrame: 0,
        images: [],
        lastFrame: 1,
        progress: 0,
        framesFirstLoad: 25,
        ctx: null,
    });

    const loadImages = async () => {
        const promises: any = [];
        Promise.reject();

        if (!refDom.current.currentUrlFrame) {
            refDom.current.currentUrlFrame =
                (await webpSupported()) && webmFrame ? webmFrame : urlFrame;
        }
        for (let i = 1; i <= totalFrames; i += 1) {
            const url: string = formatFrameUrl
                ? formatFrameUrl(refDom.current.currentUrlFrame, i)
                : refDom.current.currentUrlFrame?.replace('%d', i.toString()).toString() || '';
            const promise = new Promise<void>((resolve, reject): any => {
                const image = new Image();
                refDom.current.images[i] = {image, frame: i, isError: false};

                image.onload = (): any => {
                    resolve();
                };
                image.onerror = () => {
                    resolve();
                    refDom.current.images[i].isError = true;
                    reject();
                };
                image.src = url;
            });

            promises.push(promise);
        }

        return Promise.all(promises);
    };

    const drawFrame = (image: HTMLImageElement) => {
        if (image.complete && image.naturalHeight !== 0) {
            refDom.current.ctx?.clearRect(
                0,
                0,
                refDom.current.canvas?.width || window.innerWidth,
                refDom.current.canvas?.height || window.innerHeight,
            );
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            refDom.current.ctx?.drawImage(image, 0, 0);
        }
    };

    const runFrame = () => {
        refDom.current.currentFrame = Math.max(
            Math.floor(
                MathLerp(refDom.current.currentFrame, refDom.current.lastFrame, 0.5),
            ),
            1,
        );

        if (
            refDom.current.images[refDom.current.currentFrame] &&
            !refDom.current.images[refDom.current.currentFrame].isError
        ) {
            drawFrame(refDom.current.images[refDom.current.currentFrame].image);
        }
    };

    const runCanvas = async () => {
        if (refCanvas && refCanvas.current && comp.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const rect: DOMRect | undefined = comp.current?.getBoundingClientRect();

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            refCanvas?.current?.setAttribute(
                'width',
                String(width || rect?.width || window.innerWidth),
            );
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            refCanvas?.current?.setAttribute(
                'height',
                String(height || rect?.width || window.innerWidth),
            );

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            refDom.current.ctx = refCanvas.current?.getContext('2d');
            runFrame();
        }
    };

    refDom.current.scroller = useScrollTrigger({
        trigger: comp.current,
        start: 'top top',
        end: `${MathMap(totalFrames, 0, 24, 0, 1000)}px bottom`,
        pin: true,
        // scrub: true, like lerp
        onUpdate: (self: ScrollTrigger) => {
            refDom.current.lastFrame = MathMap(self.progress, 0, 1, 1, totalFrames);
            onProcessing && onProcessing(Math.floor(refDom.current.lastFrame));
            runFrame();
        },
        onToggle: (self: ScrollTrigger) => {
            if (self.isActive) {
                onEnter && onEnter();
            }
        },
    });

    const preLoadFrame = async () => {
        start && start();
        loadImages().then(() => {
            refDom.current.lastFrame = 1;
            refDom.current.currentFrame = 1;
            runCanvas();
            end && end();
        });
    };

    useLayoutEffect(() => {
        if (refDom.current.timeOut) clearTimeout(refDom.current.timeOut);
        refDom.current.timeOut = setTimeout(async () => {
            await preLoadFrame();
            runCanvas();
        }, 200);
    }, [urlFrame]);

    return (
        <div className={classNames(className, s.frames)} ref={comp}>
            {children}
            <canvas ref={refCanvas}/>
        </div>
    );
};
