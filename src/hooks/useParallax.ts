import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { AnimateContext } from "@Context/Animate";
import { useScrollTrigger } from "@Hooks/useScrollTrigger";
import { pageScrollTop } from "@Services/Animate/AnimateMathUtil";

export const useParallax = (
  box: HTMLElement | null,
  el: HTMLDivElement | null,
  offset: number
): void => {
  const refEl = el;
  const { lenis } = useContext(AnimateContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refOg = useRef<any>({ top: 0 });

  const [isReadyHandleScroller, setIsReadyHandleScroller] = useState<boolean>(
    false
  );
  const scroller = ({ scroll }) => {
    let disTop = scroll - refOg.current.top;
    disTop = offset > 0 ? Math.max(disTop, 0) : Math.min(disTop, 0);
    if (refEl) {
      refEl.style.transform = `translate(0px, ${disTop * offset}px)`;
    }
  };

  const getBoxProp = () => {
    if (box) {
      const { top } = box?.getBoundingClientRect();
      refOg.current.top = top + Math.abs(pageScrollTop());
    }
  };

  const onToggle = useCallback((self):void => {
    setIsReadyHandleScroller(self.isActive);
  }, []);

  useScrollTrigger({
    trigger: box,
    markers: false,
    onToggle,
  });

  useEffect(() => {
    if (box && el && lenis && isReadyHandleScroller) {
      getBoxProp();
      lenis.on("scroll", scroller);
    } else if (!isReadyHandleScroller && lenis) {
      lenis.off("scroll", scroller);
    }

    return () => {
      lenis && lenis.off("scroll", scroller);
    };
  }, [el, box, lenis, isReadyHandleScroller]);
};
