import React, { CSSProperties, ElementType, PropsWithChildren, useRef } from 'react';
import cs from 'classnames';
import { useTextAnim } from '@Hooks/useTextAnim';
import s from './styles.module.scss';

type TText = {
  as?: ElementType;
  fontWeight?: 'bold' | 'semibold' | 'medium' | 'regular' | 'light';
  style?: CSSProperties;
  size?:
    | '18'
    | '20'
    | '26'
    | '30'
    | '40'
    | 'd0'
    | 'd1'
    | 'd2'
    | 'd3'
    | 'd-table'
    | 'supper';
  color?: string;
  className?: string;
  animOption?: {
    screen: number;
    offset: number;
    type: 'heading' | 'random' | 'paragraph';
  };
  onClick?: () => void;
  htmlFor?: string;
};

const Text: React.FC<PropsWithChildren<TText>> = ({
  as = 'h1',
  children,
  fontWeight = 'regular',
  size = '16',
  style,
  color,
  className,
  animOption = undefined,
  onClick,
  ...props
}) => {
  const TextTag = as;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const comp = useRef<HTMLElement>(null);
  useTextAnim(comp, animOption);

  return (
    <TextTag
      {...props}
      ref={comp}
      className={cs(
        s.text,
        s[`size-${size}`],
        `font-${fontWeight}`,
        `text-${color}`,
        className,
      )}
      style={{ ...style }}
      onClick={onClick}
    >
      {children}
    </TextTag>
  );
};

export default Text;
