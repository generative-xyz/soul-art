import Explorer from '@/components/Explorer';
import IconSVG from '@/components/IconSVG';
import { detailExpand, detailRefresh } from '@/constants/asset';
import { FC, memo, useCallback, useRef, useState } from 'react';
import s from './style.module.scss';

interface IRef {
  reloadIframe: () => void;
  getHtmlIframe: () => HTMLIFrameElement | null;
}

type DetailImgProps = {
  animationUrl: string | undefined;
  imgCapture?: string | undefined;
};

const DetailImg: FC<DetailImgProps> = ({ animationUrl, imgCapture }) => {
  const explorerRef = useRef<IRef>(null);
  const [previewSrc, setPreviewSrc] = useState<string | undefined>(
    animationUrl
  );

  const handleExpand = useCallback(() => {
    window.open(animationUrl, '_blank');
  }, [animationUrl]);

  const handleIframeLoaded = (): void => {
    if (explorerRef.current) {
      const iframe = explorerRef.current.getHtmlIframe();
      if (iframe) {
        setPreviewSrc(iframe.src);
      }
    }
  };

  const reloadIframe = (): void => {
    if (explorerRef.current) {
      explorerRef.current.reloadIframe();
    }
  };

  return (
    <div className={s.detailImg}>
      <div className={s.img}>
        {previewSrc ? (
          <Explorer
            url={previewSrc}
            ref={explorerRef}
            onLoaded={handleIframeLoaded}
          />
        ) : (
          <img src={imgCapture} alt="detailImg" />
        )}
      </div>

      <div className={s['detailImg-buttons']}>
        <IconSVG
          src={detailRefresh}
          maxHeight={'20'}
          maxWidth={'20'}
          className={s.button}
          onClick={reloadIframe}
        />
        <IconSVG
          src={detailExpand}
          maxHeight={'20'}
          maxWidth={'20'}
          className={s.button}
          onClick={handleExpand}
        />
      </div>
    </div>
  );
};

export default memo(DetailImg);
