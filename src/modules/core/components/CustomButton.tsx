import { JSX } from "react";

type CustomButtonProps = {
  text: string;
  onClick?: (e?: any) => void;
  disabled?: boolean;
  label?: string;
  icon?: string | JSX.Element;
  noHover?: boolean;
  leftIcon?: string | JSX.Element;
  textAlign?: "text-start" | "text-center" | "text-end";
  justifyContent?: "justify-between" | "justify-center" | "justify-end";
  type?: "submit" | "button";
  variant?: "primary" | "secondary" | "error" | "error-secondary" | "text";
  textVariant?: "green" | "gray" | "red" | "link-blue";
  textUnderline?: boolean;
  size?: "medium" | "large";
  fontFamily?: string;
  textVariantFontWeight?:
    | "font-thin"
    | "font-semibold"
    | "font-medium"
    | "font-normal";
  fontSize?: "medium" | "large" | "small" | "extraLarge";
  textLeftPadding?:
    | "pl-2"
    | "pl-3"
    | "pl-0"
    | "pl-6"
    | "pl-7"
    | "pl-8"
    | "pl-9"
    | "pl-10";
  width?: string;
  textColor?: string;
  borderColor?: string;
  noTextFlex?: boolean;
  noHoverScale?: boolean;
  italic?: boolean;
  className?: string;
  secondaryText?: string;
  primaryBg?:
    | "bg-primary-color border-primary-color hover:border-dark-primary border-2 hover:bg-dark-primary"
    | "bg-transparent hover:bg-badge-green hover:border-primary-color border-2 border-transparent";
};
const CustomButton = ({
  text,
  italic,
  label,
  icon,
  noHover,
  noHoverScale,
  textUnderline,
  textAlign = "text-center",
  justifyContent = "justify-center",
  textVariant = "green",
  type = "button",
  variant = "primary",
  primaryBg = "bg-primary-color border-primary-color hover:border-dark-primary border-2 hover:bg-dark-primary",
  size = "large",
  fontSize = "large",
  fontFamily = "",
  textLeftPadding = "pl-0",
  disabled,
  textVariantFontWeight = "font-normal",
  onClick,
  leftIcon,
  width,
  textColor,
  borderColor,
  noTextFlex,
  className,
  secondaryText,
}: CustomButtonProps) => {
  if (type === "button" && onClick === undefined) {
    throw new Error("onClick function required if type is button");
  }
  return (
    <>
      {label && variant === "text" && (
        <p className="mt-3 mb-1 text-grayShades-customGray text-base font-normal">
          {label}
        </p>
      )}
      <button
        className={`${
          (icon || leftIcon) && `flex ${justifyContent} items-center gap-1`
        } ${
          disabled
            ? `${
                variant !== "text"
                  ? "bg-grayShades-borderLightGray border-2 border-grayShades-borderLightGray"
                  : ""
              } cursor-default`
            : `${
                variant === "primary"
                  ? `${primaryBg}`
                  : variant === "secondary"
                  ? `bgwhite ${
                      !noHover && "hover:bg-grayShades-secondaryHoverGray"
                    } border-2 ${
                      borderColor ?? "border-grayShades-borderLightGray"
                    }`
                  : variant === "error"
                  ? "bg-error hover:bg-errorSecondary"
                  : variant === "error-secondary"
                  ? "bg-secondary-bg-white border-2 hover:border-errorSecondary border-error"
                  : variant === "text"
                  ? `${size === "large" && "mt-2 mb-1 "} bg-transparent ${
                      !noHover && "hover:bg-grayShades-secondaryHoverGray"
                    } ${textColor ? textColor : "text-primary-color"}`
                  : ""
              }`
        } rounded-lg ${
          variant === "text"
            ? `${size === "large" && "py-1"} ${width}`
            : `${
                size === "large" && !width
                  ? "min-w-64 max-sm:max-w-full max-sm:min-w-fit max-sm:px-4"
                  : width ?? "w-28"
              } px-1 py-1`
        } ${className}`}
        type={type}
        onClick={type === "button" && !disabled ? onClick : undefined}
        disabled={disabled}
      >
        {leftIcon &&
          (typeof leftIcon === "string" ? (
            <img className="w-7 h-7" alt="left icon" src={leftIcon} />
          ) : (
            <>{leftIcon}</>
          ))}
        <p
          className={` ${fontFamily} ${italic ? "italic" : "not-italic"} ${
            !noTextFlex && "flex-1"
          } ${textAlign} ${textLeftPadding} ${
            disabled
              ? `text-grayShades-disabledText ${
                  fontSize === "small"
                    ? "text-sm"
                    : fontSize === "medium"
                    ? "text-base"
                    : fontSize === "large"
                    ? "text-lg"
                    : "text-xl"
                }`
              : variant === "primary"
              ? `${
                  primaryBg ===
                  "bg-transparent hover:bg-badge-green hover:border-primary-color border-2 border-transparent"
                    ? "text-grayShades-customGray hover:text-primary-color"
                    : "text-white"
                } font-light ${
                  fontSize === "small"
                    ? "text-sm"
                    : fontSize === "medium"
                    ? "text-base"
                    : fontSize === "large"
                    ? "text-lg"
                    : "text-xl"
                }`
              : variant === "secondary"
              ? `font-light ${
                  fontSize === "small"
                    ? "text-sm"
                    : fontSize === "medium"
                    ? "text-base"
                    : fontSize === "large"
                    ? "text-lg"
                    : "text-xl"
                } ${textColor ?? "text-grayShades-customGray"}`
              : variant === "error"
              ? `text-white font-light  ${
                  fontSize === "small"
                    ? "text-sm"
                    : fontSize === "medium"
                    ? "text-base"
                    : fontSize === "large"
                    ? "text-lg"
                    : "text-xl"
                }`
              : variant === "error-secondary"
              ? `text-error font-semibold  ${
                  fontSize === "small"
                    ? "text-sm"
                    : fontSize === "medium"
                    ? "text-base"
                    : fontSize === "large"
                    ? "text-lg"
                    : "text-xl"
                }`
              : variant === "text"
              ? `${textUnderline && "underline"} ${
                  textVariant === "green"
                    ? `text-primary-color ${
                        !noHoverScale &&
                        "hover:text-primary-color hover:font-medium"
                      }`
                    : textVariant === "red"
                    ? "text-errorSecondary"
                    : textVariant === "link-blue"
                    ? "text-linkBlue hover:font-medium"
                    : "text-grayShades-customGray"
                } ${textVariantFontWeight}  ${
                  fontSize === "small"
                    ? "text-sm"
                    : fontSize === "medium"
                    ? "text-base"
                    : fontSize === "large"
                    ? "text-lg"
                    : "text-xl"
                }`
              : ""
          }`}
        >
          {text}
          {secondaryText && (
            <>
              <br />
              {secondaryText}
            </>
          )}
        </p>
        {icon &&
          (typeof icon === "string" ? (
            <img className="w-7 h-7 ml-2" alt="icon" src={icon} />
          ) : (
            <>{icon}</>
          ))}
      </button>
    </>
  );
};

export default CustomButton;
