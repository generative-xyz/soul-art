import { PropsWithChildren, ReactNode } from 'react';
import s from './style.module.scss';

interface IProps {
  subTitle?: string;
  heading?: string;
  children: ReactNode;
  btns?: ReactNode;
  iframe?: ReactNode;
  isImageRight?: boolean;
  imgUrl?: string;
  className?: string;
  id?: string;
  isContain?: boolean;
  [key: string]: unknown;
}
const RowContent: React.FC<PropsWithChildren<IProps>> = ({
  id,
  subTitle,
  heading,
  children,
  btns,
  iframe,
  isImageRight = false,
  imgUrl,
  className,
  isContain = false,
  ...rest
}: IProps): JSX.Element => {
  return (
    <div
      id={id}
      className={`${s.rowContent} ${isImageRight ? s.isRight : ''
        } ${className}`}
      {...rest}
    >
      <div className={` ${s.rowContent_left} ${isContain ? s.isContain : ''}`}>
        <div className={s.rowContent_left_inner}>
          {iframe ? iframe : <img src={imgUrl} alt="Rectangle%2034624186" />}
        </div>
      </div>
      <div className={` ${s.rowContent_right}`}>
        <div className={s.rowContent_content}>
          {subTitle && <p className={s.subtitle}>{subTitle}</p>}

          {heading && (
            <h2
              className={`${s.heading}`}
            >
              {heading}
            </h2>
          )}
          <p
            className={s.content}
          >
            {children}
          </p>
          {btns}
        </div>
      </div>
    </div>
  );
};

export default RowContent;
