import { useRef, useCallback, MutableRefObject } from "react";
import { gsap } from "gsap";
import { debounce } from "lodash";
import SplitType from "split-type";
import { useAnimate } from "@Hooks/useAnimate";
import {
  getDelay,
  getRandomArbitrary,
  getRandomArbitraryFloat,
} from "@Services/Animate/AnimateMathUtil";

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
  animOption?: IAnimOption,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  comp: MutableRefObject<any>
): void => {
  const refDom = useRef<IProRefDom>({});

  const onRunAnimate = useCallback(() => {
    if (comp && comp.current) {
      const delay = getDelay(animOption?.screen || 0, animOption?.offset || 0);
      refDom.current.runned = true;
      switch (animOption?.type || "") {
        case "heading":
          gsap.to(refDom.current.texts?.chars || [], {
            opacity: 1,
            ease: "power3.inOut",
            duration: 0.8,
            delay,
            stagger: {
              amount: 0.6,
              from: "random",
            },
            onComplete: () => {
              if (comp && comp.current)
                refDom.current.resizeObserver?.unobserve(comp.current);
            },
          });
          break;
        case "random":
          comp.current.setProperty("textContent", "");
          refDom.current?.arrText?.forEach((el: string, key: number) => {
            if (
              el === " " &&
              refDom.current.finalRunTexts &&
              refDom.current.finalRunTexts[key]
            ) {
              refDom.current.finalRunTexts[key] = el;
              return;
            }
            const fal = { value: 0 };
            gsap.to(fal, {
              delay: delay + getRandomArbitraryFloat(0, 0.4),
              value: 100,
              ease: "power3.out",
              duration: 0.6,
              onUpdate: () => {
                if (
                  Math.floor(fal.value) % 2 === 0 &&
                  refDom.current.finalRunTexts &&
                  refDom.current.chars
                ) {
                  refDom.current.finalRunTexts[key] =
                    refDom.current.chars[
                      getRandomArbitrary(0, refDom.current.chars.length - 1)
                    ];
                  comp.current.setProperty(
                    "textContent",
                    refDom.current.finalRunTexts.toString().replaceAll(",", "")
                  );
                }
              },
              onComplete: () => {
                if (refDom.current.finalRunTexts) {
                  refDom.current.finalRunTexts[key] = el;
                  comp.current.setProperty(
                    "textContent",
                    refDom.current.finalRunTexts.toString().replaceAll(",", "")
                  );
                }
              },
            });
          });
          break;

        default:
          gsap.to(comp.current, {
            opacity: 1,
            y: 0,
            ease: "power3.out",
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
        case "heading":
          comp.current.classList.add(`is-handle`);
          refDom.current.texts = new SplitType(comp.current, {
            types: "words, chars",
          });

          refDom.current.resizeObserver = new ResizeObserver(
            debounce(() => {
              if (refDom.current.texts && !refDom.current.runned) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                refDom.current.texts?.split();
                gsap.killTweensOf(refDom.current.texts.chars);
                gsap.set(refDom.current.texts.chars, { opacity: "0" });
              }
            }, 100)
          );
          refDom.current.resizeObserver.observe(comp.current);
          break;

        case "random":
          comp.current.classList.add(`is-handle`);
          refDom.current.text = comp.current.textContent || "";
          comp.current.setProperty("textContent", "");

          refDom.current.arrText = refDom?.current?.text?.split("");

          refDom.current.finalRunTexts = [];
          refDom.current.chars = "@#$%&qaertyuiopasdfghjklzxcvbnm".split("");

          break;

        default:
          comp.current.classList.add(`is-handle`);
          gsap.set(comp.current, { opacity: "0", y: 50 });
          break;
      }
    }
  }, [comp, animOption]);

  const onClearAnimate = useCallback(() => {
    if (comp && comp.current && animOption) {
      switch (animOption.type) {
        case "heading":
          comp.current.classList.remove(`is-handle`);
          refDom.current.texts?.revert();
          refDom.current.resizeObserver?.unobserve(comp.current);
          break;

        case "random":
          comp.current.classList.remove(`is-handle`);
          comp.current.setProperty("textContent", refDom.current.text || "");

          break;

        default:
          comp.current.classList.remove(`is-handle`);
          gsap.set(comp.current, { opacity: 1, y: 0 });
          break;
      }
    }
  }, [comp, animOption]);

  useAnimate(comp, onRunAnimate, 0, onSetAnimate, onClearAnimate);
};
