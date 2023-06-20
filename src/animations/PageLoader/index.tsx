import React, { useRef, useContext, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { AnimateContext } from "@/contexts/animate-context";
import { PAGE_LOADED, PAGE_ENTER } from "@Constants/common";
import s from "./styles.module.scss";

interface IProcessing {
  value: number;
  delta: number;
  onHold: number;
  persen: number;
  loaded: boolean;
}

export const PageLoader: React.FC = () => {
  const { setPageStatus, getLoaderCounter } = useContext(AnimateContext);
  const refLoading = useRef<HTMLDivElement>(null);
  const refPersent = useRef<HTMLSpanElement>(null);
  const processing = useRef<IProcessing>({
    value: 0,
    delta: 1,
    onHold: 0,
    persen: 0,
    loaded: false,
  });

  const loadingComplete = useCallback(() => {
    setPageStatus(PAGE_LOADED);
    gsap.to(refLoading.current, {
      opacity: 0,
      delay: 0.2,
      ease: "power3.inOut",
      duration: 0.3,
      onComplete: () => {
        if (refLoading.current) {
          refLoading.current.style.display = "none";
        }
        document.body.classList.remove("is-loading");
      },
    });

    setTimeout(() => setPageStatus(PAGE_ENTER), 500);
  }, [setPageStatus]);

  const looper = () => {
    if (!processing.current || !refPersent.current) return;

    processing.current.persen +=
      processing.current.delta + processing.current.onHold;
    processing.current.persen = Math.min(processing.current.persen, 100);

    refPersent.current.textContent = `${Math.floor(
      processing.current.persen
    )}%`;

    if (processing.current.persen >= 100) {
      gsap.ticker.remove(looper);
      loadingComplete();
    }

    if (getLoaderCounter() > 0) {
      processing.current.delta *= 0.8;
      processing.current.onHold += 0.0001;
      if (processing.current.onHold >= 1) {
        processing.current.onHold = 0;
      }
    } else {
      processing.current.delta = 5;
      processing.current.onHold = 0;
    }
  };

  useEffect(() => {
    document.body.classList.add("is-loading", "hide-scroller");
    const loadContent = gsap.context(() => {
      gsap.ticker.add(looper);
    }, refLoading);

    return () => {
      document.body.classList.remove("is-loading");
      gsap.ticker.remove(looper);
      loadContent.revert();
    };
  }, []);

  return (
    <div ref={refLoading} className={s.pageLoader}>
      <div className={s.pageLoader_inner}>
        <span ref={refPersent}>0%</span>
      </div>
    </div>
  );
};
