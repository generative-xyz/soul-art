import { useContext, useEffect, useRef, useState, useCallback, MutableRefObject } from "react";
import { AnimateContext } from "@/contexts/animate-context";
import { useScrollTrigger } from "@Hooks/useScrollTrigger";
import { pageScrollTop } from "@Services/Animate/AnimateMathUtil";

export const useParallax = (
    box: MutableRefObject<HTMLElement | null>,
    el: MutableRefObject<HTMLElement | null>,
    offset: number
): void => {
    const { lenis } = useContext(AnimateContext);
    const refOg = useRef<any>({ top: 0 });

    const [isReadyHandleScroller, setIsReadyHandleScroller] = useState<boolean>(
        false
    );
    const scroller = ({ scroll }: any) => {
        let disTop = scroll - refOg.current.top;
        disTop = offset > 0 ? Math.max(disTop, 0) : Math.min(disTop, 0);
        if (el.current) {
            el.current?.style.setProperty('transform', `translate(0px, ${disTop * offset}px)`);
        }
    };

    const getBoxProp = () => {
        if (box.current) {
            const { top } = box.current?.getBoundingClientRect();
            refOg.current.top = top + Math.abs(pageScrollTop());
        }
    };

    const onToggle = useCallback((self: any) => {
        setIsReadyHandleScroller(self.isActive);
    }, []);

    useScrollTrigger({
        trigger: box,
        markers: false,
        onToggle,
    }, [box, el]);

    useEffect(() => {
        if (box.current && el.current && lenis && isReadyHandleScroller) {
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
