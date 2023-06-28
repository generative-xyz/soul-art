import React, {ForwardedRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
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
        const {url, onLoaded} = props;
        const iframeRef = useRef<HTMLIFrameElement>(null);
        const [isReady, setIsReady] = useState<boolean>(false);

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

        useEffect(() => {
            const rect = iframeRef.current?.getBoundingClientRect();
            if (rect?.width !== 0 && rect?.height !== 0) {
                setIsReady(true);
            }
        }, [iframeRef])

        return (
            <iframe
                ref={iframeRef}
                className={styles.explorer}
                src={isReady ? url : ''}
                style={{overflow: 'hidden'}}
                onLoad={onLoaded}
            ></iframe>
        );
    }
);

export default Explorer;
Explorer.displayName = 'Explorer';
