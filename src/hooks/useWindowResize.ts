import { useState, useEffect } from "react";

interface IDimension {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  scrollHeight: number;
}

const useWindowResize = (): IDimension => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const listener = () => {
    setWidth(window.innerWidth || document.body.clientWidth || 0);
    setHeight(window.innerHeight || document.body.clientHeight || 0);
    setScrollHeight(document.body.scrollHeight);
  };

  useEffect(() => {
    // set width + height on initial because window "resize" does not invoke on first load
    listener();

    window?.addEventListener?.("resize", listener);

    return () => {
      window?.removeEventListener?.("resize", listener);
    };
  }, []);

  return {
    width,
    height,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1279,
    isDesktop: width > 1280,
    scrollHeight,
  };
};

export default useWindowResize;
