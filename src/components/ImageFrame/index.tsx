import s from './style.module.scss';

type IImageFrameProps = {
  children: React.ReactNode;
  type?: string;
};

const ImageFrame: React.FC<IImageFrameProps> = ({ children, type }) => {
  return (
    <div className={`${s.imageFrame} ${type === 'small' ? s.small : ''}`}>
      {children}
      <span className={s['top-left']}></span>
      <span className={s['top-right']}></span>
      <span className={s['bottom-left']}></span>
      <span className={s['bottom-right']}></span>
    </div>
  );
};

export default ImageFrame;
