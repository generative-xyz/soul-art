import React, {
  PropsWithChildren, useCallback, useEffect, useMemo, useState,
} from 'react';
import s from './styles.module.scss';
import { CDN_URL } from '@/configs';

export interface ILightboxContext {
  handleShow: (imageUrl: string) => void;
  handleClose: () => void;
}

const initialValue: ILightboxContext = {
  handleShow: (_: string) => { return; },
  handleClose: () => { return; },
};

export const LightboxContext =
  React.createContext<ILightboxContext>(initialValue);

export const LightboxProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleShow = useCallback((url: string) => {
    setImage(url);
    setShow(true);

  }, [])

  const handleClose = useCallback(() => {
    setImage(null);
    setShow(false);
  }, [])

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.1);
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prevZoomLevel) => (prevZoomLevel > 0.5 ? prevZoomLevel - 0.1 : 0.5));
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [show]);


  const contextValues = useMemo((): ILightboxContext => {
    return {
      handleShow,
      handleClose
    }
  }, [
    handleShow,
    handleClose
  ])

  return (
    <LightboxContext.Provider value={contextValues}>
      {children}
      {(show && image) && (
        <div className={s.lightbox}>
          <div className={s.lightboxWrapper}>
            <div className={s.lightboxContent}>
              <img
                src={image}
                className={s.thumbnail}
                alt='Image'
                style={{ transform: `scale(${zoomLevel})` }}
              />
              <div className={s.controlWrapper}>
                <button className={s.controlBtn} onClick={handleZoomIn}>
                  <img src={`${CDN_URL}/search-plus.svg`} alt="zoom in" />
                </button>
                <button className={s.controlBtn} onClick={handleZoomOut}>
                  <img src={`${CDN_URL}/search-minus.svg`} alt="zoom out" />
                </button>
                <button className={s.controlBtn} onClick={handleClose}>
                  <img src={`${CDN_URL}/times.svg`} alt="close" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
};
