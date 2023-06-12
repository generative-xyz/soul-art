import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export const useFrameTrigger = (
  star: number,
  end: number,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  comp: HTMLElement | HTMLDivElement | null
): any => {
  const refOptions = useRef({ isEnter: false });
  useLayoutEffect(() => {
    comp && gsap.set(comp, { opacity: 0 });
  }, [comp]);

  const handleProgressFrame = (frame: number): void => {
    if (frame > end && !refOptions.current.isEnter) {
      comp && gsap.to(comp, { opacity: 0, y: -50, ease: "power3.out" });
    } else if (frame > star) {
      comp && gsap.to(comp, { opacity: 1, y: 0, ease: "power3.out" });
    } else {
      comp && gsap.to(comp, { opacity: 0, y: 50, ease: "power3.out" });
    }
  };

  return handleProgressFrame;
};
