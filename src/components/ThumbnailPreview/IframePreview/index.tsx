import React, { ForwardedRef, useImperativeHandle, useRef } from 'react';
import { StyledIFramePreview } from './IFramePreview.styled';

interface IRef {
  reloadIframe: () => void;
  getHtmlIframe: () => HTMLIFrameElement | null;
}

interface IProps {
  url: string;
  onLoaded?: () => void;
}

const IFramePreview = React.forwardRef<IRef, IProps>((props: IProps, ref: ForwardedRef<IRef>) => {
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
    <StyledIFramePreview className={'iframePreview'}>
      <iframe
        ref={iframeRef}
        className={'iframeContainer'}
        src={url}
        onLoad={onLoaded}
        style={{ overflow: 'hidden' }}
      ></iframe>
    </StyledIFramePreview>
  );
});

export default IFramePreview;
IFramePreview.displayName = 'IFramePreview';
