import { ReactSVG } from "react-svg";
import React from "react";

type IProps = {
  svgUrl: string;
  className?: string;
  size?: number;
  onClick?: () => void;
};

const SvgInset: React.FC<IProps> = ({ svgUrl, className, size, onClick }) => {
  return (
    <ReactSVG
      onClick={onClick}
      className={className}
      src={svgUrl}
      beforeInjection={(svg: SVGSVGElement): void => {
        if (size && svg) {
          const refSVG = svg;
          refSVG.setAttribute("height", `${size}`);
          refSVG.setAttribute("width", `${size}`);
          refSVG.style.minWidth = `${size}`;
          refSVG.style.minHeight = `${size}`;
        }
      }}
    />
  );
};

export default SvgInset;
