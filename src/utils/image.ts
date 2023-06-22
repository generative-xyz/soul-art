export const isSvgUrl = async (url: string) => {
  const r = await fetch(url, { method: 'HEAD' });
  return r.headers.get('content-type') === 'image/svg+xml';
};

export const isValidImage = (url: string): Promise<boolean> =>
  new Promise(resolve => {
    const img = new Image();

    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
