import React, { ReactNode, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useAnimate } from "@Hooks/useAnimate";
import { getDelay } from "@Services/Animate/AnimateMathUtil";

interface IProps {
  children: ReactNode;
  offset?: number;
  screen?: number;
  className?: string;
  threshold?: number;
  type?: string
}

export const AnimFade = ({
  children,
  offset = 0,
  screen = 0,
  className = "",
  threshold = 0,
  type = '',
}: IProps): JSX.Element => {
  const comp = useRef<HTMLDivElement | null>(null);

  const onEnter = useCallback(() => {
    const delay = getDelay(screen || 0, offset || 0);
    gsap.to(comp.current, {
      opacity: 1,
      y: 0,
      delay,
      ease: "power3.out",
      duration: 0.5,
    });
  }, [comp]);

  const onSetter = useCallback(() => {
    switch (type) {
      case 'tran':
        gsap.set(comp.current, { opacity: 0, y: 40 });
        break;

      default:
        gsap.set(comp.current, { opacity: 0 });
        break;
    }

  }, [comp]);

  const onClear = useCallback(() => {
    gsap.set(comp.current, { opacity: 1, y: 0 });
  }, [comp]);

  useAnimate(comp, onEnter, threshold, onSetter, onClear);

  return (
    <div ref={comp} className={className}>
      {children}
    </div>
  );
};
