import React, { ForwardedRef, useImperativeHandle, useRef } from 'react';
import styles from './style.module.scss';

interface IRef {
  reloadIframe: () => void;
  getHtmlIframe: () => HTMLIFrameElement | null;
}

interface IProps {
  url: string;
  onLoaded?: () => void;
}

const Explorer = React.forwardRef<IRef, IProps>(
  (props: IProps, ref: ForwardedRef<IRef>) => {
    const { url, onLoaded } = props;
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const reloadIframe = () => {
      if (iframeRef.current) {
        // eslint-disable-next-line no-self-assign
        iframeRef.current.src = iframeRef.current.src;
      }
    };

    const getHtmlIframe = (): HTMLIFrameElement | null => {
      return iframeRef.current;
    };

    useImperativeHandle(ref, () => ({
      reloadIframe,
      getHtmlIframe,
    }));

    return (
      <iframe
        ref={iframeRef}
        className={styles.explorer}
        src={url}
        style={{ overflow: 'hidden' }}
        onLoad={onLoaded}
      ></iframe>
    );
  }
);

export default Explorer;
Explorer.displayName = 'Explorer';
