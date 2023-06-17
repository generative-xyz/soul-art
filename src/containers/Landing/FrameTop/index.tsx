import React, {useContext, useRef} from 'react';
import {AnimateContext} from '@Context/Animate';
import {Frames} from '@Animations/Frames';
import s from './styles.module.scss';
import Living from '../Living';
import SubLiving from '../SubLiving';
import classNames from 'classnames';
import {useFrameProcessing} from '@/hooks/useFrameProcessing';
import {CDN_URL} from '@/configs';
import Introduce from '../Introduce';
import Owner from "@/containers/Landing/SectionOwner";
import {Loading} from "@/containers/Landing/Loading";

export const FrameTop: React.FC = () => {
    const {registerLoader, unRegisterLoader} = useContext(AnimateContext);

    const elMain = useRef<HTMLDivElement>(null);
    const lPart1 = useRef<HTMLDivElement>(null);
    const lPart2 = useRef<HTMLDivElement>(null);
    const lPart3 = useRef<HTMLDivElement>(null);
    const lPart4 = useRef<HTMLDivElement>(null);

    const part1Frame = useFrameProcessing(lPart1, {
        startIn: 0,
        endIn: 0,
        startOut: 45,
        endOut: 55
    });
    const part2Frame = useFrameProcessing(lPart2,
        {
            startIn: 65,
            endIn: 75,
            startOut: 100,
            endOut: 110
        });
    const part3Frame = useFrameProcessing(lPart3, {
            startIn: 120,
            endIn: 130,
            startOut: 155,
            endOut: 165
        }
    );
    const part4Frame = useFrameProcessing(lPart4, {startIn: 175, endIn: 185, startOut: 210, endOut: 230});

    const processing = (frame: number) => {
        part1Frame(frame);
        part2Frame(frame);
        part3Frame(frame);
        part4Frame(frame);
    };

    return (
        <div className={s.main} ref={elMain}>
            <Loading/>
            {
                <Frames
                    width={1920}
                    height={1080}
                    className={s.info_main}
                    urlFrame={`${CDN_URL}/block-1/block-1_%d.jpg`}
                    // webmFrame={`https://cdn.generative.xyz/pages/home/block-3-2/block-3-v2-%d.png.webp`}
                    totalFrames={234}
                    onProcessing={processing}
                    start={registerLoader}
                    end={unRegisterLoader}
                >

                    <div ref={lPart1} className={classNames(s.hero, s.contentItem)}>
                        <Introduce/>
                    </div>
                    <div ref={lPart2} className={classNames(s.livingArt, s.contentItem)}>
                        <Living/>
                    </div>
                    <div ref={lPart3} className={classNames(s.subLiving, s.contentItem)}>
                        <SubLiving/>
                    </div>
                    <div ref={lPart4} className={classNames(s.subOwner, s.contentItem)}>
                        <Owner/>
                    </div>
                </Frames>
            }
        </div>
    );
};
