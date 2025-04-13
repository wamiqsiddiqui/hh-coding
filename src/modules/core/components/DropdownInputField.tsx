import { Field, useFormikContext } from "formik";
import { getFieldHelperText } from "../../../utils/helpers";
import { CustomInputFieldProps } from "./CustomInputField";
import { RenderFieldProps } from "./FormFields";
import HelperText from "./HelperText";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const DropdownInputField = ({
  fullWidth,
  options,
  fieldName,
  arrayField,
  index,
  isOptional,
  placeholder,
  bgColor,
  width,
  disabled,
  label,
  transparentLabel,
  validationLabel,
  onDropdownChange,
  validateFn,
  onChange,
}: RenderFieldProps & CustomInputFieldProps) => {
  const { errors, touched, setFieldValue, validateField } = useFormikContext();
  const name = arrayField ? `${arrayField}[${index}].${fieldName}` : fieldName;
  const helperText = getFieldHelperText({
    errors,
    touched,
    fieldName,
    arrayField,
    index,
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (onChange) onChange(event as React.ChangeEvent<HTMLInputElement>);
    if (onDropdownChange) {
      onDropdownChange(event as React.ChangeEvent<HTMLSelectElement>);
    }
    setFieldValue(name, event.target.value);
  };
  const { t, i18n } = useTranslation();
  useEffect(() => {
    validateField(name);
  }, [t, i18n, name, validateField]);
  return (
    <div className="flex flex-col w-full items-start">
      {(label || transparentLabel) && (
        <div className="flex items-center gap-x-4 mb-1">
          <p
            className={`text-sm font-medium  ${
              transparentLabel
                ? "text-transparent select-none"
                : "text-grayShades-bgTooltip"
            } mb-1`}
          >
            {label ? label : "empty"}
          </p>
        </div>
      )}
      <div
        className={`${bgColor ? bgColor : `bg-white`} ${
          fullWidth ? "w-full" : width ? width : "w-72"
        } h-11 border-[1px] border-grayShades-datagrid focus-within:border-black rounded-lg overflow-hidden`}
      >
        <Field
          as="select"
          className={`text-xs !bg-white px-2 w-full h-full placeholder:text-xs placeholder:text-grayShades-textGray text-text-black ring-0 outline-none webkit-appearance-none z-50`}
          style={{
            backgroundColor: "white",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            paddingRight: "2rem",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24'%3E%3Cpath fill='%23212121' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.5rem center",
            backgroundSize: "1rem",
          }}
          name={name}
          disabled={disabled}
          id={name}
          onChange={handleChange}
          validate={
            validateFn
              ? validateFn
              : (value: string) => {
                  if (
                    !isOptional &&
                    (value?.length === 0 ||
                      (value && value.includes(t("pleaseSelect"))))
                  ) {
                    return `${t("pleaseSelect")} ${
                      validationLabel ?? label ?? placeholder ?? t("anyValue")
                    }`;
                  }
                  return null;
                }
          }
        >
          {options!.map((option) => (
            <option
              className="hover:bg-transparent rounded-none h-11 text-sm font-normal"
              value={option.id}
            >
              {option.name}
            </option>
          ))}
        </Field>
      </div>
      {helperText && <HelperText helperText={helperText} />}
    </div>
  );
};

export default DropdownInputField;
