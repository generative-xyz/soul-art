import { MutableRefObject, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { MathMap } from '@Services/Animate/AnimateMathUtil';

export const useFrameProcessing = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comp: MutableRefObject<any>,
  motion: {
    startIn?: number,
    endIn?: number,
    startOut?: number,
    endOut?: number
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {

  const {startIn, endIn, startOut, endOut} = motion;

  useLayoutEffect(() => {
    if(startIn && endIn) {
      comp && gsap.set(comp.current, { opacity: 0 });
    }
    return () => {
      comp && gsap.set(comp.current, { opacity: 1 });
    };
  }, [comp]);

  const handleProgressFrame = (frame: number): void => {
    const tmpCom = comp;
    if (tmpCom && tmpCom.current) {
      if (startIn && endIn) {
        const poIn = MathMap(frame, startIn, endIn, 0, 1);
        if (poIn <= 1) {
          tmpCom.current.style.opacity = `${Math.min(poIn, 1)}`;
        }
      }
      if (startOut && endOut) {
        const poOut = MathMap(frame, startOut, endOut, 1, 0);
        if (poOut <= 1) {
          tmpCom.current.style.opacity = `${Math.max(poOut, 0)}`;
        }
      }
    }
  };

  return handleProgressFrame;
};
