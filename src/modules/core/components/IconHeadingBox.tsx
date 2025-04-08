import React, { JSX } from "react";
import { CustomRadioButton } from "./CustomRadioButton";

type IconHeadingBoxProps = {
  iconSrc: string | JSX.Element;
  heading: string;
  subHeading: string;
  onClick?: () => void;
  setType?: () => void;
  type?: boolean;
  sizeVariant?: "medium" | "large";
};
const IconHeadingBox = ({
  iconSrc,
  subHeading,
  heading,
  onClick,
  type,
  setType,
  sizeVariant = "large",
}: IconHeadingBoxProps) => {
  return (
    <div
      onClick={onClick && onClick}
      className={`flex flex-col  rounded-lg cursor-pointer hover:scale-[1.005] hover:border-secondary-green border-gray-500 border-[1px] ${
        sizeVariant === "large" ? "p-1" : "px-8 py-6"
      } max-md:py-4 max-md:px-2 flex-1 w-60`}
    >
      <div className="p-1 flex flex-direction-row w-full  justify-end">
        <CustomRadioButton
          isSelected={type ?? false}
          text=""
          noGap
          onClick={() => {
            setType && setType();
          }}
          checkedCircle
          outHeight="h-5"
          outWidth="w-5"
          inHeight="h-3"
          inWidth="w-3"
        />
      </div>
      <div className=" pb-3 px-2">
        {typeof iconSrc === "string" ? (
          <img
            alt="icon"
            height={"220px"}
            width={"25px"}
            className="pb-3 select-none"
            src={iconSrc}
          />
        ) : (
          React.cloneElement(iconSrc)
        )}
        <p
          className={`${
            sizeVariant === "large" ? "text-md" : "text-sm"
          } select-none max-md:text-lg max-sm:text-base    text-start`}
        >
          {heading}
        </p>
        <p
          className={`${
            sizeVariant === "large" ? "text-md" : "text-sm"
          } select-none max-md:text-lg max-sm:text-base    text-start`}
        >
          {subHeading}
        </p>
      </div>
    </div>
  );
};

export default IconHeadingBox;
