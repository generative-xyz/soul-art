import Lenis from "@studio-freight/lenis";
import { useContext, useLayoutEffect, useRef } from "react";
import { AnimateContext } from "@Context/Animate";

export const useSmoothScroll = (): void => {
  const { setLenis } = useContext(AnimateContext);
  const refCog = useRef<any>({ lenis: null, requestAnimation: null });

  const raf = (time: number) => {
    refCog.current.lenis.raf(time);
    refCog.current.requestAnimation = requestAnimationFrame(raf);
  };

  useLayoutEffect(() => {
    refCog.current.lenis = new Lenis({
      duration: 1.2,
      // eslint-disable-next-line no-restricted-properties
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: "vertical", // vertical, horizontal
      gestureDirection: "vertical", // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    refCog.current.requestAnimation = requestAnimationFrame(raf);
    setLenis(refCog.current.lenis);

    return () => {
      cancelAnimationFrame(refCog.current.requestAnimation);
      refCog.current.lenis.stop();
      refCog.current.lenis.destroy();
    };
  }, []);
};
