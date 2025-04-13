import { JSX, useState } from "react";
import {
  InputFieldType,
  MarginBottomType,
  MarginTopType,
} from "../../../types/generalTypes";
import CustomTooltip from "./CustomTooltip";
import HelperText from "./HelperText";

export type CustomInputFieldProps = {
  placeholder?: string;
  noBorder?: boolean;
  fullWidth?: boolean;
  transparentLabel?: boolean;
  options?: { name: string; id: string }[];
  nameOptions?: string[];
  fullfieldName?: string;
  isOptional?: boolean;
  defaultValue?: string | number;
  label?: string;
  tooltip?: string;
  bottomLabel?: string;
  rows?: number;
  disabled?: boolean;
  bgColor?: string;
  tooltipDirection?: "top" | "right";
  marginTop?: MarginTopType;
  marginBottom?: MarginBottomType;
  helperText?: string | null;
  type?: InputFieldType;
  suffix?: JSX.Element;
  prefix?: JSX.Element;
  suffixClick?: () => void;
  prefixClick?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?:
    | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onDropdownChange?: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  maxLength?: number;
  dontShowTextToMaxLengthRatio?: boolean;
  width?: string;
  isFloating?: boolean;
  isLogin?: boolean;
  autoFocus?: boolean;
  min?: number;
  max?: number;
  isArabic?: boolean;
};
const CustomInputField = ({
  bottomLabel,
  placeholder,
  fullWidth,
  fullfieldName,
  isOptional,
  rows,
  label,
  tooltip,
  transparentLabel,
  helperText,
  noBorder,
  tooltipDirection = "top",
  marginTop = "mt-0",
  marginBottom = "mb-4",
  type = "text",
  maxLength = 500,
  dontShowTextToMaxLengthRatio,
  onChange,
  onBlur,
  disabled,
  suffix,
  prefix,
  defaultValue,
  suffixClick,
  prefixClick,
  bgColor,
  name,
  width,
  isFloating,
  autoFocus,
  min,
  max,
  isArabic,
  ...rest
}: CustomInputFieldProps) => {
  const [text, setText] = useState(defaultValue ? defaultValue.toString() : "");
  if ((label === undefined || label.length === 0) && tooltip !== undefined) {
    throw new Error("You need to pass label IF tooltip is passed");
  }
  return (
    <div
      className={`relative flex flex-col items-start ${marginTop} ${marginBottom} ${
        fullWidth ? "w-full" : width ? width : "w-72"
      }`}
    >
      {label && (
        <div className="flex items-center mb-1 gap-x-4">
          <p
            className={`text-sm font-normal ${
              transparentLabel
                ? "text-transparent select-none"
                : "text-hhGrayShades-label"
            } mb-1`}
          >
            {label}
          </p>
          {tooltip && (
            <CustomTooltip
              tooltip={tooltip}
              tooltipDirection={tooltipDirection}
            />
          )}
        </div>
      )}
      {rows ? (
        <div className="flex flex-col items-end w-full">
          <div
            className={`flex flex-col pb-3 pt-4 items-end ${
              bgColor ? bgColor : "bg-white"
            } w-full rounded-lg border-[1px] shadow-input-field-light border-hhGrayShades-borderGray focus-within:border-custom-green`}
          >
            <textarea
              className={`bg-transparent text-xs px-2 w-full h-full outline-none placeholder:text-xs placeholder:text-grayShades-textGray`}
              {...rest}
              rows={rows}
              autoFocus={autoFocus ? autoFocus : false}
              disabled={disabled}
              placeholder={placeholder}
              defaultValue={defaultValue}
              maxLength={maxLength}
              name={name ?? fullfieldName}
              onChange={(e: any) => {
                setText(e.target.value);
                onChange && onChange(e);
              }}
              onBlur={(e) => {
                onBlur && onBlur(e);
              }}
            />
            {!dontShowTextToMaxLengthRatio && (
              <p className="mr-2 mb-1 text-base font-semibold text-grayShades-customGray">
                {text.length} / {maxLength}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`flex items-center ${
            !noBorder &&
            `${
              bgColor ? bgColor : "bg-white"
            } h-10 border-[1px] shadow-input-field-light border-hhGrayShades-borderGray focus-within:border-custom-green`
          } w-full rounded-lg`}
        >
          {prefix && (
            <div
              className={`ml-2 flex-1 ${
                prefixClick !== undefined && "cursor-pointer"
              }`}
              onClick={prefixClick}
            >
              {prefix}
            </div>
          )}
          <input
            dir={type === "number" ? "ltr" : isArabic ? "rtl" : "ltr"}
            className={`text-xs rounded-lg px-2 ${
              prefix ? "w-full" : "w-full"
            } h-full outline-none placeholder:text-xs placeholder:text-grayShades-textGray text-text-black bg-white`}
            type={type}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (
                type === "number" &&
                (event.code === "Minus" ||
                  event.key === "e" ||
                  event.key === "E")
              ) {
                event.preventDefault();
              }
            }}
            min={type === "number" ? 0 : undefined}
            disabled={disabled}
            defaultValue={defaultValue}
            value={isArabic ? text : defaultValue}
            placeholder={placeholder}
            name={name ?? fullfieldName}
            onChange={(e: any) => {
              let value = e.target.value;
              if (isArabic) {
                // Remove English letters (a-z, A-Z)
                value = value.replace(/[A-Za-z]/g, "");
              }
              setText(value);
              onChange && onChange(e);
            }}
            onBlur={(e) => {
              onBlur && onBlur(e);
            }}
          />
          {suffix && (
            <div
              className={`mr-2 ${
                suffixClick !== undefined && "cursor-pointer"
              }`}
              onClick={suffixClick}
            >
              {suffix}
            </div>
          )}
        </div>
      )}
      {bottomLabel && (
        <p
          className={`text-base text-start font-normal text-textBoxGreen mt-3`}
        >
          {bottomLabel}
        </p>
      )}
      {helperText && <HelperText helperText={helperText} />}
    </div>
  );
};

export default CustomInputField;
