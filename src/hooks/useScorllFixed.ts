import { MutableRefObject } from 'react';
import { useScrollTrigger } from '@Hooks/useScrollTrigger';

export const useScrollFixed = (
  el: MutableRefObject<HTMLElement | null>,
  endSize: number,
  onUpdate?: (self: ScrollTrigger) => void,
  start = 'center center',
  toggle?: (self: ScrollTrigger) => void,
): void => {
  let timeClear: any = null;

  useScrollTrigger({
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
        toggle && toggle(self);
      }, 100);
    },
  }, [el, endSize, start]);
};
