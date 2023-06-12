import { useState, useEffect } from "react";

interface IDimension {
  scrollTop: number;
  scrollLeft: number;
}

const useWindowScroll = (): IDimension => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const listener = () => {
    setScrollLeft(window.scrollX);
    setScrollTop(window.scrollY);
  };

  useEffect(() => {
    // set width + height on initial because window "resize" does not invoke on first load
    listener();

    window?.addEventListener?.("scroll", listener);

    return () => {
      window?.removeEventListener?.("scroll", listener);
    };
  }, []);

  return {
    scrollTop,
    scrollLeft,
  };
};

export default useWindowScroll;
