// import React, { ForwardedRef, useImperativeHandle, useRef } from 'react';

// export interface IRef {
//   reloadIframe: () => void;
//   getHtmlIframe: () => HTMLIFrameElement | null;
// }
// interface IProps {
//   url: string | undefined;
//   onLoaded?: () => void;
// }

// const Explorer = (props: IProps, ref: ForwardedRef<IRef>) => {
//   const { url, onLoaded } = props;

//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   const reloadIframe = () => {
//     if (iframeRef.current) {
//       // eslint-disable-next-line no-self-assign
//       iframeRef.current.src = iframeRef.current.src;
//     }
//   };

//   const getHtmlIframe = (): HTMLIFrameElement | null => {
//     return iframeRef.current;
//   };

//   useImperativeHandle(ref, () => ({
//     reloadIframe,
//     getHtmlIframe,
//   }));

//   if (!url) return <></>;

//   return (
//     <iframe
//       ref={iframeRef}
//       className={styles.explorer}
//       sandbox={'allow-same-origin allow-scripts'}
//       onLoad={onLoaded}
//       src={url}
//       id="frame-art"
//     />
//   );
// };

// export default Explorer;

import React, { ForwardedRef, useImperativeHandle, useRef } from 'react';
import styles from './style.module.scss';
import ClientOnly from '../Utils/ClientOnly';

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
      <ClientOnly>
        <iframe
          ref={iframeRef}
          className={styles.explorer}
          src={url}
          onLoad={onLoaded}
          style={{ overflow: 'hidden' }}
        ></iframe>
      </ClientOnly>
    );
  }
);

export default Explorer;
Explorer.displayName = 'Explorer';
