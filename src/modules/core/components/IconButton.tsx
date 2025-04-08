import React, { JSX } from "react";
import { CustomToolTipBox } from "./CustomTooltip";
import { LoaderCircle } from "./Loader";

type IconButtonProps = {
  hasCircleBorder?: boolean;
  onClick?: () => void;
  icon: string | JSX.Element;
  height?: string;
  width?: string;
  mr?: string;
  ml?: string;
  mb?: string;
  noHover?: boolean;
  customClassName?: string;
  customIconColor?: string;
  rotate?: "rotate-0" | "rotate-180" | "rotate-90" | "rotate-[270deg]";
  tooltip?: string;
  borderColor?: "border-grayShades-borderLightGray" | "border-heartPink";
  size?: "size-10" | "size-12" | "size-9";
  tooltipDirection?: "top" | "right" | "left" | "bottom";
  top?: "-top-10" | "-top-20" | "-top-14" | "-top-16" | "-top-12";
  disabled?: boolean;
  isLoading?: boolean;
  text?: string;
  textClass?: string;
};
const IconButton = ({
  tooltip,
  tooltipDirection,
  onClick,
  size = "size-12",
  hasCircleBorder,
  customClassName,
  customIconColor,
  noHover,
  icon,
  isLoading,
  borderColor = "border-grayShades-borderLightGray",
  rotate = "rotate-0",
  mb = "mb-0",
  height = "h-5",
  width = "h-5",
  mr = "mr-0",
  ml = "ml-0",
  top = "-top-16",
  disabled,
  text = "",
  textClass,
}: IconButtonProps) => {
  return isLoading ? (
    <LoaderCircle
      size="size-9"
      rightBorder="border-r-[2px]"
      topBorder="border-t-[3px]"
    />
  ) : (
    <div
      onClick={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        event.stopPropagation();
        onClick && !disabled && onClick();
      }}
      className={`relative ${!disabled && `cursor-pointer`} ${
        tooltip && "group"
      } flex items-center justify-center ${mr} ${ml} ${mb} ${
        !noHover &&
        !disabled &&
        "hover:bg-grayShades-borderLightGray hover:bg-opacity-50"
      } rounded-full ${
        hasCircleBorder ? `border-2 ${borderColor} ${size}` : "w-10 h-10"
      }`}
    >
      {tooltip && (
        <CustomToolTipBox
          top={top}
          tooltip={tooltip}
          tooltipDirection={tooltipDirection}
        />
      )}
      <div>
        {typeof icon === "string" ? (
          <div className="flex gap-2 items-center">
            <img
              alt="icon"
              src={icon}
              className={`${height} ${width} ${customClassName} ${
                !disabled && "hover:scale-[1.041] cursor-pointer"
              }`}
            />
            {text && <p className={textClass ?? " "}>{text}</p>}
          </div>
        ) : (
          React.cloneElement(icon, {
            className: `${height} ${width} ${customClassName} ${
              customIconColor ?? "text-grayShades-customGray"
            } h-5 w-5 ${
              !disabled && `cursor-pointer hover:scale-[1.041]`
            } transition-all ${rotate}`,
            onClick: (event: MouseEvent) => {
              event.stopPropagation();
              onClick && !disabled && onClick();
            },
          })
        )}
      </div>
    </div>
  );
};

export default IconButton;
