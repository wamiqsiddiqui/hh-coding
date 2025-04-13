import { JSX } from "react";
import { MarginRightType } from "../../../types/generalTypes";

type TabHeaderProps = {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSelected: boolean;
  headerText: string;
  chipText?: string | number;
  rightIcon?: JSX.Element;
  mr?: MarginRightType;
};
const TabHeader = ({
  onClick,
  isSelected,
  headerText,
  chipText,
  rightIcon,
  mr = "mr-5",
}: TabHeaderProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col w-fit ${mr} ${
        onClick !== undefined && "cursor-pointer"
      }`}
    >
      <div className="flex-1"></div>
      <div className="flex gap-x-2 w-max items-center">
        <p
          className={`flex-[3] text-xl pt-2 pb-1 ${
            isSelected
              ? "text-primary-color font-bold"
              : " text-hhGrayShades-tabHeader font-medium"
          }`}
        >
          {headerText}
        </p>
        {rightIcon && rightIcon}
        {chipText && (
          <p
            className={`${
              isSelected ? "bg-secondary-color" : " bg-grayShades-customGray"
            } rounded-[4px] px-1 text-white font-semibold text-base h-min`}
          >
            {chipText}
          </p>
        )}
      </div>
      <div
        className={`${
          isSelected ? "w-full" : "w-0"
        } transition-[width] h-[4px] bg-primary-color`}
      ></div>
    </div>
  );
};

export default TabHeader;
