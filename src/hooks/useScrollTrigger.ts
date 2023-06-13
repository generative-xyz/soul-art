import {gsap} from "gsap";
import {MutableRefObject, useEffect, useRef} from "react";
import {default as ScrollTrigger} from "gsap/ScrollTrigger";

interface IProp {
    trigger: any;
    start?: string | number | ((self: ScrollTrigger) => string | number);
    end?: string | number | ((self: ScrollTrigger) => string | number);
    pin?: boolean | string | HTMLElement;
    anticipatePin?: number;
    markers?: boolean;
    scrub?: number | boolean;
    onEnter?: (self: ScrollTrigger) => void;
    onEnterBack?: (self: ScrollTrigger) => void;
    onLeave?: () => void;
    onLeaveBack?: () => void;
    onToggle?: (self: ScrollTrigger) => void;
    onUpdate?: (self: ScrollTrigger) => void;
}

export const useScrollTrigger = (
    {
        trigger,
        start,
        end,
        pin,
        anticipatePin,
        markers,
        scrub,
        onEnter,
        onEnterBack,
        onLeave,
        onLeaveBack,
        onToggle,
        onUpdate,
    }: IProp,
    deep = new Array<any>()
): any => {
    const refOg = useRef<any>({scorller: null, timeOut: null});
    useEffect(() => {
        if (trigger && trigger.current) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
            const ScrollTrigger = require("gsap/ScrollTrigger").default;
            gsap.registerPlugin(ScrollTrigger);
            refOg.current.id = (Math.random() * 1000000000).toString();
            refOg.current.scorller && refOg.current.scorller.refresh();
            refOg.current.scorller = ScrollTrigger.create({
                trigger: trigger.current,
                id: refOg.current.id,
                start,
                markers,
                end,
                scrub,
                pin,
                anticipatePin,
                onUpdate,
                onToggle,
                onEnter,
                onEnterBack,
                onLeave,
                onLeaveBack,
            });
        }
        return () => {
            if (refOg.current.scorller) {
                refOg.current.scorller.refresh();
                refOg.current.scorller && refOg.current.scorller.kill();
            }
        };
    }, [...[trigger, end], ...deep]);

    return refOg.current.scorller;
};
