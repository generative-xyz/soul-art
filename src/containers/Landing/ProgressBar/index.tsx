import IconSVG from '@Components/IconSVG';
import s from './style.module.scss';
import { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { AnimateContext } from '@Context/Animate';
import { MathMap } from '@Services/Animate/AnimateMathUtil';
import { progressPlay, progressPoint, progressZoom } from '@/constants/asset';
import { AnimFade } from '@Animations/Fade';
import { MAIN_AUDIO } from '@Constants/common';
import { Container } from 'react-bootstrap';

const ProgressBar = () => {
  const { lenis, audioPlaying, setAudioPlaying } = useContext(AnimateContext);

  const [po, setPo] = useState<number>(0);
  const [rote, setRote] = useState<number>(0);
  const refAudio = useRef<HTMLAudioElement | null>(null);

  const getPo = useCallback(() => {
    setPo(lenis?.progress || 0);
    setRote(rote + 1);
  }, [lenis, rote]);

  useEffect(() => {
    lenis?.on('scroll', getPo);
    return () => {
      lenis?.off('scroll', getPo);
    };
  }, [lenis, getPo]);

  useEffect(() => {
    if (audioPlaying) {
      refAudio.current?.play();
    } else {
      refAudio.current?.pause();
    }
  }, [audioPlaying]);

  const toggleAudio = useCallback(() => {
    setAudioPlaying(!audioPlaying);
  }, [audioPlaying, setAudioPlaying]);

  return (
    <div
      className={s.progressBar}
      style={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '--rote': `${MathMap(po, 0, 1, 0, 360)}deg`,
      }}
    >
      <Container>
        <AnimFade screen={1} className={s.progressBar_inner}>
          <IconSVG
            src={progressPlay}
            maxWidth={'48'}
            maxHeight={'48'}
            className={`${s.playBtn}`}
          />
          <div
            className={s.progress}
            style={{
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              '--po': `${po * 100}%`,
            }}
          >
            <IconSVG
              src={progressPoint}
              maxWidth={'20'}
              maxHeight={'20'}
              className={s.point}
            />
            <div className={s.line} />
            <div className={s.line_po} />
          </div>

          <div className={s.audioBtn} onClick={toggleAudio}>
            <IconSVG
              src={progressZoom}
              maxWidth={'36'}
              maxHeight={'36'}
              className={s.audioIcon}
            />

            <div
              className={`${s.audioIconAnimate} ${
                audioPlaying ? s.activeAnimation : ''
              }`}
            >
              <span className={s.audioIconAnimate_line1}></span>
              <span className={s.audioIconAnimate_line2}></span>
              <span className={s.audioIconAnimate_line3}></span>
            </div>
          </div>
        </AnimFade>
      </Container>
      <audio ref={refAudio} src={MAIN_AUDIO} />
    </div>
  );
};

export default ProgressBar;
