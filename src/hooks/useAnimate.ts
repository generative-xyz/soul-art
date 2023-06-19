import {
    useRef,
    useCallback,
    useContext,
    useLayoutEffect, MutableRefObject,
} from "react";
import { AnimateContext } from "@/contexts/animate-context";
import { useScrollTrigger } from "@Hooks/useScrollTrigger";
import { PAGE_ENTER } from "@Constants/common";

export const useAnimate = (
    el: MutableRefObject<HTMLDivElement | HTMLElement | HTMLHeadingElement | null>,
    onEnter: () => void,
    offsetPercent = 0,
    onSetter?: () => void,
    clearSetter?: () => void
): void => {
    const { pageStatus } = useContext(AnimateContext);
    let refScroller: ScrollTrigger | null = null;
    const refOption = useRef({ isActive: false, pageStatus: "PAGE_LOADING" });

    const onEnterCallBack = useCallback((target: ScrollTrigger) => {
        if (
            refOption.current.pageStatus === PAGE_ENTER &&
            refOption.current.isActive
        ) {
            onEnter();
            target.kill();
        }
    }, []);

    const onToggle = useCallback((self: any) => {
        refOption.current.isActive = self.isActive;
    }, []);

    refScroller = useScrollTrigger({
        trigger: el,
        // markers: true,
        onToggle,
        onEnter: onEnterCallBack,
        onEnterBack: onEnterCallBack,
        start: `${offsetPercent}% bottom`,
    });

    useLayoutEffect(() => {
        onSetter && onSetter();
        return () => {
            clearSetter && clearSetter();
        };
    }, []);

    useLayoutEffect(() => {
        refOption.current.pageStatus = pageStatus;
        if (pageStatus === PAGE_ENTER && refOption.current.isActive) {
            onEnter();
            refScroller && refScroller.kill();
        }
    }, [pageStatus]);
};
