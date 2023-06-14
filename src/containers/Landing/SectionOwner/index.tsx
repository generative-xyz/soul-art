import TextAnimate from '@/components/TextAnimate';
import s from './style.module.scss';
import { AnimateContext } from '@/contexts/Animate';
import { Frames } from '@Animations/Frames';
import { useRef, useContext } from 'react';
import { useFrameProcessing } from '@/hooks/useFrameProcessing';
import { Container } from 'react-bootstrap';

const Owner: React.FC = () => {
  const { registerLoader, unRegisterLoader } = useContext(AnimateContext);

  const lPart1 = useRef<HTMLDivElement>(null);

  const part1Frame = useFrameProcessing(lPart1, 10, 20, 119, 129);

  const processing = (frame: number) => {
    part1Frame(frame);
  };
  return (
    <Frames
      width={1920}
      height={1080}
      className={s.info_main}
      urlFrame={
        'https://storage.googleapis.com/generative-static-prod/soul-art/sould-frames/%d.jpg'
      }
      // webmFrame={`https://cdn.generative.xyz/pages/home/block-3-2/block-3-v2-%d.png.webp`}
      totalFrames={129}
      onProcessing={processing}
      start={registerLoader}
      end={unRegisterLoader}
    >
      <div ref={lPart1} className={s.ownerSection}>
        <Container className={s.container}>
          <div className={s.wrapContent}>
            <p className={s.sectionContent}>
              But beware, for as with any tale, there were challenges along the
              way. When doubt and uncertainty clouded the hearts of the
              believers, the sun&apos;s radiance waned, casting shadows upon the
              artworks.
            </p>
            <a href="" className={s.tag}>
              <TextAnimate>
                <span>Lorem ipsum dolor</span>
              </TextAnimate>
            </a>
          </div>
        </Container>
      </div>
    </Frames>
  );
};

export default Owner;
