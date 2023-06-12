import { gsap } from "gsap";
import { useContext, useLayoutEffect } from "react";
import { AnimateContext } from "@Context/Animate";

export const useScrollFixed = (
  el: HTMLElement | null,
  endSize: number,
  onUpdate?: (self: ScrollTrigger) => void,
  start = "center center",
  toggle?: (self: ScrollTrigger) => void
): void => {
  const { setIsHideHeader } = useContext(AnimateContext);
  let timeClear: any = null;

  useLayoutEffect(() => {
    if (!el) return () => { return};

    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const ScrollTrigger = require("gsap/ScrollTrigger").default;
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        // markers: true,
        start,
        end: () => `+=${endSize}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate,
        onToggle: self => {
          if (timeClear) clearTimeout(timeClear);
          timeClear = setTimeout(() => {
            setIsHideHeader(true);
            toggle && toggle(self);
          }, 100);
        },
      },
      defaults: { ease: "none" },
    });

    return (): void => {
      tl && tl.kill();
    };
  }, [el, endSize, start, onUpdate, toggle]);
};
