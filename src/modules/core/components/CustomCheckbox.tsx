import { JSX, useEffect, useState } from "react";

import { FaCheck } from "../../../utils/icons";
import { setToast } from "../../../redux/toastSlice";
import { useDispatch } from "react-redux";
import HelperText from "./HelperText";

export type CustomCheckboxProps = {
  isChecked?: boolean;
  checkboxText?: string;
  fullFieldName?: string;
  disabledText?: string;
  size?: "large" | "medium" | "small" | "xlarge";
  containerClassName?: string;
  className?: string;
  checkSize?: number;
  checkClassName?: string;
  linkText?: string;
  link?: () => void;
  id?: string;
  errorText?: string;
  customSpan?: JSX.Element;
  onChange?: (isChecked: boolean) => string | null | void;
};
const CustomCheckbox = ({
  isChecked,
  checkboxText,
  size = "large",
  className,
  errorText,
  checkSize,
  checkClassName,
  containerClassName,
  customSpan,
  linkText,
  link,
  onChange,
  id,
}: CustomCheckboxProps) => {
  const [checked, setChecked] = useState(isChecked ?? false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isChecked !== undefined) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  return (
    <>
      <div
        id={id}
        className={` cursor-pointer h-auto flex ${
          size === "large" ? "gap-x-3" : "gap-x-2"
        } items-start ${containerClassName}`}
      >
        <div
          className={`relative flex items-center justify-center mt-1 ${
            size === "xlarge"
              ? "size-8 rounded-[6px]"
              : size === "large"
              ? "size-5 rounded-[4px]"
              : size === "medium"
              ? "size-4 rounded-[3px]"
              : "size-[14px] rounded-[2px]"
          } hover:border-grayShades-datagrid border-grayShades-borderGray border-[1px] bg-white ${className}`}
          onClick={() => {
            const disabledText = onChange ? onChange(!checked) : null;
            if (disabledText && !checked) {
              dispatch(setToast({ text: disabledText, variant: "warning" }));
            } else {
              setChecked(!checked);
            }
          }}
        >
          {checked && (
            <FaCheck
              {...(checkSize && { size: checkSize })}
              className={`text-primary-color hover:text-dark-green ${checkClassName}`}
            />
          )}
        </div>
        <p
          className={`${
            size === "large"
              ? "text-lg"
              : size === "medium"
              ? "text-base"
              : "text-sm"
          } text-hhGrayShades-tabHeader font-medium text-start`}
        >
          {customSpan ? (
            customSpan
          ) : (
            <>
              {checkboxText}{" "}
              {linkText && link && (
                <span
                  className="text-secondary-color underline"
                  onClick={() => link()}
                >
                  {linkText}{" "}
                </span>
              )}
            </>
          )}
        </p>
      </div>
      {errorText && <HelperText helperText={errorText} />}
    </>
  );
};

export default CustomCheckbox;
