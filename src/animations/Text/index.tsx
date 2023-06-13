import React, { CSSProperties, PropsWithChildren, useRef } from "react";
import cs from "classnames";
import { useTextAnim } from "@Hooks/useTextAnim";
import s from "./styles.module.scss";

type TText = {
  as?:
    | "p"
    | "span"
    | "strong"
    | "em"
    | "sub"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "a"
    | "label";
  fontWeight?: "bold" | "semibold" | "medium" | "regular" | "light";
  style?: CSSProperties;
  size?:
    | "18"
    | "20"
    | "26"
    | "30"
    | "40"
    | "d0"
    | "d1"
    | "d2"
    | "d3"
    | "d-table"
    | "supper";
  color?: string;
  className?: string;
  animOption?: {
    screen: number;
    offset: number;
    type: "heading" | "random" | "paragraph";
  };
  onClick?: () => void;
  htmlFor?: string;
};

const Text: React.FC<PropsWithChildren<TText>> = ({
  as = "p",
  children,
  fontWeight = "regular",
  size = "16",
  style,
  color,
  className,
  animOption = undefined,
  onClick,
  ...props
}) => {
  const TextTag = as;
  const comp = useRef<HTMLElement | null>(null);
  useTextAnim(animOption, comp.current);

  return (
    <TextTag
      {...props}
      ref={comp}
      className={cs(
        s.text,
        s[`size-${size}`],
        `font-${fontWeight}`,
        `text-${color}`,
        className
      )}
      style={{ ...style }}
      onClick={onClick}
    >
      {children}
    </TextTag>
  );
};

export default Text;
