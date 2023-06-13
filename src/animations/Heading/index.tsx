import React, { CSSProperties, PropsWithChildren, useRef } from 'react';
import cs from 'classnames';
import { useTextAnim } from '@Hooks/useTextAnim';
import s from './styles.module.scss';

type THeading = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontWeight?: 'bold' | 'semibold' | 'medium' | 'normal' | 'light' | 'regular';
  style?: CSSProperties;
  className?: string;
  color?: string;
  animOption?: {
    screen: number;
    offset: number;
    type: 'heading' | 'random' | 'paragraph';
  };
};
const Heading: React.FC<PropsWithChildren<THeading>> = ({
  as = 'h1',
  children,
  fontWeight = 'normal',
  style,
  color,
  className,
  animOption = undefined,
  ...props
}) => {
  const Text = as;

  const comp = useRef<HTMLHeadingElement>(null);
  useTextAnim(comp.current, animOption);

  return (
    <Text
      {...props}
      ref={comp}
      className={cs(className, s.heading, `font-${fontWeight}`, `text-${color}`)}
      style={{ ...style }}
    >
      {children}
    </Text>
  );
};

export default Heading;
