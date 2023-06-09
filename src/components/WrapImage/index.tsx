import { CDN_URL } from '@/configs';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WrapImage({ src, className, alt }: { src?: string; className: any; alt: any }) {
  const defaultImage = CDN_URL + '/default.png';
  return <img alt={alt} className={className} loading="lazy" src={src || defaultImage} />;
}

export default React.memo(WrapImage);
