import { gsap } from "gsap";
import { MutableRefObject, useLayoutEffect, useRef } from "react";

interface IProp {
  trigger: MutableRefObject<HTMLElement | null>;
  start?: string | number | ((self: ScrollTrigger) => string | number);
  end?: string | number | ((self: ScrollTrigger) => string | number);
  pin?: boolean | string | HTMLElement;
  anticipatePin?: number;
  markers?: boolean;
  scrub?: number | boolean;
}

export const useTimeLineScrollTrigger = (
  { trigger, start, end, pin, markers, scrub }: IProp,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deep = new Array<any>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refOg = useRef<any>({ tl: null, timeOut: null });
  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const ScrollTrigger = require("gsap/ScrollTrigger").default;
    gsap.registerPlugin(ScrollTrigger);

    if (trigger && trigger.current) {
      refOg.current.id = (Math.random() * 1000000000).toString();
      refOg.current.tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger.current,
          start,
          markers,
          end,
          scrub,
          pin,
        },
      });
    }
    return () => {
      refOg.current.tl && refOg.current.tl.kill();
    };
  }, [...[trigger, end], ...deep]);

  return refOg.current.tl;
};
