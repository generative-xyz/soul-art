import React, {useContext, useEffect, useMemo, useRef} from "react";
import {AnimateContext} from "@Context/Animate";
import {Frames} from "@Animations/Frames";
import s from "./styles.module.scss";
import useWindowResize from "@Hooks/useWindowResize";
import {PAGE_READY} from "@Constants/animation";
import {PAGE_LOADING} from "@Constants/common";

export const FrameTop: React.FC = React.memo(() => {
    const {registerLoader, unRegisterLoader, pageStatus} = useContext(AnimateContext);

    // const lHeading = useRef<HTMLDivElement>(null);
    const elMain = useRef<HTMLDivElement>(null);

    // const lPart1 = useRef<HTMLDivElement>(null);
    // const lPart2 = useRef<HTMLDivElement>(null);
    // const lPart3 = useRef<HTMLDivElement>(null);
    // const lPart4 = useRef<HTMLDivElement>(null);
    //
    // const headingFrame = useFrameProcessing(lHeading, 10, 20);
    // const part1Frame = useFrameProcessing(lPart1, 55, 65, 100, 110);
    // const part2Frame = useFrameProcessing(lPart2, 130, 140, 170, 180);
    // const part3Frame = useFrameProcessing(lPart3, 200, 210, 245, 255);
    // const part4Frame = useFrameProcessing(lPart4, 270, 280);

    const processing = frame => {
        console.log('___ok');
        // headingFrame(frame);
        // part1Frame(frame);
        // part2Frame(frame);
        // part3Frame(frame);
        // part4Frame(frame);
    };

    const {isDesktop} = useWindowResize();
    const urlFrame = useMemo((): string => {
        return !isDesktop
            ? `https://storage.googleapis.com/generative-static-prod/soul-art/sould-frames/%d.jpg`
            : `https://storage.googleapis.com/generative-static-prod/soul-art/sould-frames/%d.jpg`;
    }, [isDesktop]);

    useEffect(() => {
        registerLoader();
        return () => {
            unRegisterLoader();
        }
    });

    return (
        <div ref={elMain}>
            {pageStatus !== PAGE_LOADING && <Frames
                width={!isDesktop ? 1080 : 1920}
                height={!isDesktop ? 1920 : 1080}
                className={s.info_main}
                urlFrame={urlFrame}
                // webmFrame={`https://cdn.generative.xyz/pages/home/block-3-2/block-3-v2-%d.png.webp`}
                totalFrames={129}
                onProcessing={processing}
                start={registerLoader}
                end={unRegisterLoader}
            >
                dsdasdadadas
            </Frames>
            }
        </div>
    );
});
