import React, { useContext, useRef } from 'react';
import { AnimateContext } from '@Context/Animate';
import { Frames } from '@Animations/Frames';
import s from './styles.module.scss';
import Living from '../Living';
import SubLiving from '../SubLiving';
import classNames from 'classnames';
import { useFrameProcessing } from '@/hooks/useFrameProcessing';
import { CDN_URL } from '@/configs';
import Introduce from '../Introduce';

export const FrameTop: React.FC = () => {
  const { registerLoader, unRegisterLoader } = useContext(AnimateContext);

  const elMain = useRef<HTMLDivElement>(null);
  const lPart1 = useRef<HTMLDivElement>(null);
  const lPart2 = useRef<HTMLDivElement>(null);
  const lPart3 = useRef<HTMLDivElement>(null);

  const part1Frame = useFrameProcessing(lPart1, 10, 20, 33, 43);
  const part2Frame = useFrameProcessing(lPart2, 43, 53, 76, 86);
  const part3Frame = useFrameProcessing(lPart2, 87, 97, 119, 129);

  const processing = (frame: number) => {
    part1Frame(frame);
    part2Frame(frame);
    part3Frame(frame);
  };

  return (
    <div className={s.main} ref={elMain}>
      {
        <Frames
          width={1920}
          height={1080}
          className={s.info_main}
          urlFrame={`${CDN_URL}/sould-frames/%d.jpg`}
          // webmFrame={`https://cdn.generative.xyz/pages/home/block-3-2/block-3-v2-%d.png.webp`}
          totalFrames={129}
          onProcessing={processing}
          start={registerLoader}
          end={unRegisterLoader}
        >
          <div ref={lPart1} className={classNames(s.hero, s.contentItem)}>
            <Introduce />
          </div>
          <div ref={lPart2} className={classNames(s.livingArt, s.contentItem)}>
            <Living />
          </div>
          <div ref={lPart3} className={classNames(s.subLiving, s.contentItem)}>
            <SubLiving />
          </div>
        </Frames>
      }
    </div>
  );
};
