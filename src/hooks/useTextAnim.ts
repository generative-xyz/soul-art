import {useRef, useCallback, MutableRefObject} from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { useAnimate } from '@Hooks/useAnimate';
import { getDelay } from '@Services/Animate/AnimateMathUtil';

interface IAnimOption {
  type: string;
  screen: number;
  offset: number;
}

interface IProRefDom {
  resizeObserver?: ResizeObserver;
  texts?: SplitType;
  text?: string;
  runned?: boolean;
  finalRunTexts?: string[];
  chars?: string[];
  arrText?: string[];
}

export const useTextAnim = (
  comp: MutableRefObject<HTMLElement | HTMLHeadingElement | null>,
  animOption?: IAnimOption,
): void => {
  const refDom = useRef<IProRefDom>({});
  const onRunAnimate = useCallback(() => {
    if (comp && comp.current) {
      const delay = getDelay(animOption?.screen || 0, animOption?.offset || 0);
      refDom.current.runned = true;
      switch (animOption?.type || '') {
        case 'heading':
          gsap.to(refDom.current.texts?.chars || [], {
            y: '0%',
            ease: 'power3.out',
            duration: 1,
            delay,
            stagger: 0.015,
            onComplete: () => {
              if (comp && comp.current)
                refDom.current.resizeObserver?.unobserve(comp.current as HTMLElement);
            },
          });
          break;

        default:
          gsap.to(comp.current, {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            duration: 0.8,
            delay,
          });
          break;
      }
    }
  }, [comp]);

  const onSetAnimate = useCallback(() => {
    if (comp && comp.current && animOption) {
      switch (animOption.type) {
        case 'heading':
          comp.current?.classList.add(`anim-heading`);
          comp.current?.classList.add(`is-handle`);

          if (comp && comp.current) {
            refDom.current.texts = new SplitType(comp.current as HTMLElement, {
              types: 'lines, chars',
            });

            refDom.current.resizeObserver = new ResizeObserver(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              () => {
                if (refDom.current.texts && !refDom.current.runned) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  refDom.current.texts?.split();
                  gsap.killTweensOf(refDom.current.texts.chars);
                  gsap.set(refDom.current.texts.chars, { y: '102%' });
                }
              },
            );
            refDom.current.resizeObserver.observe(comp.current as HTMLElement);
          }

          break;

        default:
          if (comp && comp.current) {
            comp.current?.classList.add(`is-handle`);
            gsap.set(comp.current, {opacity: '0', y: 50});
          }
          break;
      }
    }
  }, [comp, animOption]);

  const onClearAnimate = useCallback(() => {
    if (comp && comp.current && animOption) {
      switch (animOption.type) {
        case 'heading':
          if (refDom.current) {
            comp.current?.classList.remove(`is-handle`);
            refDom.current.texts?.revert();
            refDom.current.resizeObserver?.unobserve(comp.current as HTMLElement);
          }
          break;

        default:
          if (comp && comp.current) {
            comp.current?.classList.remove(`is-handle`);
            gsap.set(comp.current, { opacity: 1, y: 0 });
          }
          break;
      }
    }
  }, [comp, animOption]);

  useAnimate(comp, onRunAnimate, 0, onSetAnimate, onClearAnimate);
};
