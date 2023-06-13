import React, {
    createContext,
    SetStateAction,
    useState,
    useEffect,
    useCallback,
    useRef, PropsWithChildren, FC,
} from "react";
// import {PageLoader} from "@Animations/PageLoader";
import {pageScrollTop} from "@Services/Animate/AnimateMathUtil";
import Lenis from "@studio-freight/lenis";
import {PAGE_LOADING} from "@Constants/animation";

interface IAnimateContext {
    registerLoader: () => void;
    unRegisterLoader: () => void;
    getLoaderCounter: () => number;

    pageStatus: string;
    setPageStatus: React.Dispatch<SetStateAction<"PAGE_ENTER" | "PAGE_LOADED" | "PAGE_LOADING">>;

    isPageScrolling: boolean;

    isHideHeader: boolean;
    setIsHideHeader: React.Dispatch<SetStateAction<boolean>>;

    lenis: Lenis | null;
    setLenis: React.Dispatch<SetStateAction<Lenis | null>>;

    setIsHideFooter: React.Dispatch<SetStateAction<boolean>>;
    isHideFooter: boolean;
}

export const AnimateContext = createContext<IAnimateContext>({
    registerLoader: () => {
        return
    },
    unRegisterLoader: () => {
        return
    },
    getLoaderCounter: () => 1,

    pageStatus: PAGE_LOADING,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setPageStatus: _ => {
        return
    },
    isPageScrolling: false,

    isHideHeader: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setIsHideHeader: _ => {
        return
    },

    lenis: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLenis: _ => {
        return
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setIsHideFooter: _ => {
        return
    },
    isHideFooter: false,
});

export const AnimateProvider: FC<PropsWithChildren> = ({children}) => {
    const refOption = useRef<any>({counter: 0});
    const [isPageScrolling, setIsPageScrolling] = useState<boolean>(false);
    const [isHideHeader, setIsHideHeader] = useState<boolean>(false);
    const [isHideFooter, setIsHideFooter] = useState<boolean>(false);
    const [lenis, setLenis] = useState<Lenis | null>(null);

    const [pageStatus, setPageStatus] = useState<"PAGE_ENTER" | "PAGE_LOADED" | "PAGE_LOADING">(PAGE_LOADING);

    const registerLoader = useCallback(() => {
        refOption.current.counter += 1;
    }, [refOption.current]);

    const unRegisterLoader = useCallback(() => {
        refOption.current.counter -= 1;
    }, [refOption.current]);

    const getLoaderCounter = useCallback((): number => {
        return refOption.current.counter;
    }, [refOption.current]);

    const handlePageScroll = () => {
        if (pageScrollTop() > 100) {
            setIsPageScrolling(true);
        } else {
            setIsPageScrolling(false);
        }
    };

    const fix100VhOnPhone = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    useEffect(() => {
        fix100VhOnPhone();
        window.addEventListener("scroll", handlePageScroll);
        return () => {
            setIsPageScrolling(false);
            window.removeEventListener("scroll", handlePageScroll);
        };
    }, []);

    useEffect(() => {
        if (pageStatus === 'PAGE_ENTER') {
            lenis?.start();
        }
    }, [pageStatus, lenis])

    const contextValues = {
        registerLoader,
        unRegisterLoader,
        getLoaderCounter,

        pageStatus,
        setPageStatus,

        isPageScrolling,

        isHideHeader,
        setIsHideHeader,

        lenis,
        setLenis,
        isHideFooter,
        setIsHideFooter,
    };
    return (
        <AnimateContext.Provider value={contextValues}>
            {/*<PageLoader/>*/}
            {children}
        </AnimateContext.Provider>
    );
};
