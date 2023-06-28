import { PLACEHOLDER_IMAGE } from '@/constants/common';
import React from 'react';

const ImageWrapper: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props: React.ImgHTMLAttributes<HTMLImageElement>): React.ReactElement => {
  const handleOnImgLoaded = (
    evt: React.SyntheticEvent<HTMLImageElement>
  ): void => {
    if (props.onLoad) {
      props.onLoad(evt);
    }

    const img = evt.target as HTMLImageElement;
    const naturalWidth = img.naturalWidth;
    if (naturalWidth < 100) {
      img.style.imageRendering = 'pixelated';
    }
  };

  const handleOnImgError = (
    evt: React.SyntheticEvent<HTMLImageElement>
  ): void => {
    if (props.onError) {
      props.onError(evt);
    }

    const img = evt.target as HTMLImageElement;
    img.src = PLACEHOLDER_IMAGE;
  };

  return (
    <img
      alt='image'
      {...props}
      onLoad={handleOnImgLoaded}
      onError={handleOnImgError}
    />
  );
}

export default ImageWrapper;
