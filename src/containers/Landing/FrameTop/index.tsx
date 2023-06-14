import React, { useContext, useMemo, useRef } from "react";
import { AnimateContext } from "@Context/Animate";
import { Frames } from "@Animations/Frames";
import { useFrameProcessing } from "@Hooks/useFrameProcessing";
import s from "./Parts.module.scss";
import useWindowResize from "@Hooks/useWindowResize";

export const FrameTop: React.FC = React.memo(() => {
    const { registerLoader, unRegisterLoader } = useContext(AnimateContext);

    const lHeading = useRef<HTMLDivElement>(null);
    const elPart = useRef<HTMLDivElement>(null);
    const elMain = useRef<HTMLDivElement>(null);

    const lPart1 = useRef<HTMLDivElement>(null);
    const lPart2 = useRef<HTMLDivElement>(null);
    const lPart3 = useRef<HTMLDivElement>(null);
    const lPart4 = useRef<HTMLDivElement>(null);

    const headingFrame = useFrameProcessing(lHeading, 10, 20);
    const part1Frame = useFrameProcessing(lPart1, 55, 65, 100, 110);
    const part2Frame = useFrameProcessing(lPart2, 130, 140, 170, 180);
    const part3Frame = useFrameProcessing(lPart3, 200, 210, 245, 255);
    const part4Frame = useFrameProcessing(lPart4, 270, 280);

    const processing = frame => {
        headingFrame(frame);
        part1Frame(frame);
        part2Frame(frame);
        part3Frame(frame);
        part4Frame(frame);
    };

    // const onProgress = useCallback(
    //     self => {
    //         if (elMain && elMain.current) {
    //             const opacity = MathMap(self.progress, 0.5, 1, 0, 1);
    //             elMain.current.style.setProperty("opacity", `${Math.min(opacity, 1)}`);
    //         }
    //     },
    //     [elPart]
    // );

    // useScrollTrigger({
    //     trigger: elPart,
    //     // markers: true,
    //     start: "top bottom",
    //     end: "top+=50% top+=50%",
    //     onUpdate: onProgress,
    // });

    const { isDesktop } = useWindowResize();
    const urlFrame = useMemo((): string => {
        return !isDesktop
            ? `https://storage.googleapis.com/generative-static-prod/soul-art/sould-frames/%d.jpg`
            : `https://storage.googleapis.com/generative-static-prod/soul-art/sould-frames/%d.jpg`;
    }, [isDesktop]);

    return (
        <div ref={elMain}>
            <Frames
                width={!isDesktop ? 1080 : 1920}
                height={!isDesktop ? 1920 : 1080}
                className={s.info_main}
                urlFrame={urlFrame}
                // webmFrame={`https://cdn.generative.xyz/pages/home/block-3-2/block-3-v2-%d.png.webp`}
                totalFrames={296}
                onProcessing={processing}
                start={registerLoader}
                end={unRegisterLoader}
            >

            </Frames>
        </div>
    );
});
