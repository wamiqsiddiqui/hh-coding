import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import {
  getFieldHelperText,
  hasBothArrayFieldAndIndex,
} from "../../../utils/helpers";
import { FaEyeSlash, IoEyeOutline } from "../../../utils/icons";
import {
  confirmPassword,
  validateCalendlyLink,
  validateContractDuration,
  validateCRNumber,
  validateEmail,
  validateMaximumNumber,
  validateMinimumNumber,
  validateNumber,
  validatePassword,
  validateString,
} from "../../../utils/validations";
import CustomCheckbox, { CustomCheckboxProps } from "./CustomCheckbox";
import CustomInputField, { CustomInputFieldProps } from "./CustomInputField";
import DropdownInputField from "./DropdownInputField";
import SearchDropdown from "./SearchDropdown";
import TagInputField from "./TagInputField";
import TagSearchDropdown from "./TagSerchDropdown";

export type RenderFieldProps = {
  validationLabel?: string;
  isZeroNotAllowed?: boolean;
  mustBeGreaterThanOne?: boolean;
  dontValidate?: boolean;
  allowInvalidInput?: boolean;
  isMultiselect?: boolean;
  allowFetch?: boolean;
  isLoading?: boolean;
  searchText?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<Object, unknown>, Error>
  >;
  fieldName: string;
  arrayField?: string;
  subArrayField?: string;
  subIndex?: number;
  index?: number;
  isTagField?: boolean;
  isSearchDropdown?: boolean;
  bgColor?: string;
  isTagAndMultiselect?: boolean;
  validateFn?: (
    value:
      | { name: string; id: string }
      | { name: string; id: string }[]
      | string[]
      | string
      | number
      | null,
    isOptional?: boolean
  ) => string | null;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
};
const RenderField = ({
  fieldName,
  arrayField,
  subArrayField,
  subIndex,
  index,
  options,
  type,
  isTagField,
  isSearchDropdown,
  validateFn,
  fullfieldName,
  isTagAndMultiselect,
  ...rest
}: RenderFieldProps & CustomInputFieldProps) => {
  const { errors, touched } = useFormikContext();
  hasBothArrayFieldAndIndex({ arrayField, index });
  const name =
    subArrayField !== undefined && subIndex !== undefined
      ? `${arrayField}[${index}].${subArrayField}[${subIndex}]`
      : arrayField
      ? `${arrayField}[${index}].${fieldName}`
      : fieldName;
  const helperText = getFieldHelperText({
    subArrayField,
    subIndex,
    errors,
    touched,
    fieldName,
    arrayField,
    index,
  });
  return (
    <Field
      className={`text-xs px-2 w-full h-full outline-none placeholder:text-xs placeholder:text-grayShades-textGray`}
      as={
        isTagAndMultiselect
          ? TagSearchDropdown
          : isSearchDropdown
          ? SearchDropdown
          : isTagField
          ? TagInputField
          : type === "dropdown"
          ? DropdownInputField
          : CustomInputField
      }
      name={name}
      validate={validateFn}
      helperText={helperText}
      fullfieldName={name}
      type={type}
      options={options}
      {...rest}
    />
  );
};

export default RenderField;

export const SearchDropdownField = (
  props: RenderFieldProps & CustomInputFieldProps
) => {
  return (
    <RenderField
      {...props}
      isSearchDropdown
      fullfieldName={props.name}
      validateFn={(value) => {
        if (props.isMultiselect) {
          if (
            !props.isOptional &&
            ((value as { name: string; id: string }[] | null) === null ||
              (value as { name: string; id: string }[])?.length === 0)
          ) {
            return `Please select ${
              props.validationLabel ?? props.label ?? props.placeholder
            } dropdown`;
          }
        } else {
          if (
            !props.isOptional &&
            ((value as { name: string; id: string } | null) === null ||
              (value as { name: string; id: string })?.id?.length === 0)
          ) {
            return `Please select ${
              props.validationLabel ?? props.label ?? props.placeholder
            } dropdown`;
          }
        }
        return null;
      }}
      disabled={props.disabled ? props.disabled : false}
    />
  );
};

export const TagSearchDropdownField = (
  props: RenderFieldProps & CustomInputFieldProps
) => {
  return (
    <RenderField
      {...props}
      isTagAndMultiselect
      fullfieldName={props.name}
      validateFn={(value) => {
        if (
          (value as string[] | null) === null ||
          (value as string[])?.length === 0
        ) {
          return `Please select ${
            props.validationLabel ?? props.label ?? props.placeholder
          } dropdown`;
        }

        return null;
      }}
    />
  );
};

export const TagFormField = (
  props: RenderFieldProps & CustomInputFieldProps
) => {
  return (
    <RenderField
      {...props}
      isTagField
      validateFn={(value) => {
        if (
          ((value as string[] | null) === null ||
            (value as string[])?.length === 0) &&
          !props.isOptional
        ) {
          return `Please add at least one ${
            props.label ?? props.placeholder
          } tag`;
        }
        return null;
      }}
    />
  );
};

export const CheckboxField = ({
  fieldName,
  arrayField,
  index,
  title,
}: RenderFieldProps & { title: string }) => {
  hasBothArrayFieldAndIndex({ arrayField, index });
  const name = arrayField ? `${arrayField}[${index}].${fieldName}` : fieldName;
  return (
    <div className="flex items-center mt-7">
      <Field
        name={name}
        type="checkbox"
        className={`bg-green-500 text-green-500 w-5 h-5`}
      />
      <p className="ml-3 text-text-black text-lg">{title}</p>
    </div>
  );
};

export const CustomCheckboxField = ({
  isChecked,
  checkboxText,
  fieldName,
  index,
  size,
  arrayField,
  linkText,
  errorText,
  link,
  onChange,
}: CustomCheckboxProps & RenderFieldProps) => {
  const name = arrayField ? `${arrayField}[${index}].${fieldName}` : fieldName;
  const { setFieldValue } = useFormikContext();
  return (
    <Field
      size={size}
      checkboxText={checkboxText}
      isChecked={isChecked}
      errorText={errorText}
      name={name}
      fullFieldName={name}
      linkText={linkText}
      link={link}
      onChange={(isChecked: boolean) => {
        onChange && onChange(isChecked);
        setFieldValue(name, isChecked);
      }}
      as={CustomCheckbox}
    />
  );
};

export const StringField = (
  props: RenderFieldProps & CustomInputFieldProps
) => {
  const name =
    props.subArrayField !== undefined && props.subIndex !== undefined
      ? `${props.arrayField}[${props.index}].${props.subArrayField}[${props.subIndex}]`
      : props.arrayField
      ? `${props.arrayField}[${props.index}].${props.fieldName}`
      : props.fieldName;
  const { getFieldMeta } = useFormikContext();
  const val = getFieldMeta(name);
  return (
    <RenderField
      {...props}
      type="text"
      defaultValue={val.value as string}
      validateFn={(value) =>
        validateString(
          value as string | null,
          props.isOptional,
          props.validationLabel ?? props.label ?? props.placeholder,
          props.allowInvalidInput
        )
      }
    />
  );
};

export const CalendlyField = (
  props: RenderFieldProps & CustomInputFieldProps
) => {
  const name =
    props.subArrayField !== undefined && props.subIndex !== undefined
      ? `${props.arrayField}[${props.index}].${props.subArrayField}[${props.subIndex}]`
      : props.arrayField
      ? `${props.arrayField}[${props.index}].${props.fieldName}`
      : props.fieldName;
  const { getFieldMeta } = useFormikContext();
  const val = getFieldMeta(name);
  return (
    <RenderField
      {...props}
      type="text"
      defaultValue={val.value as string}
      validateFn={(value) =>
        validateCalendlyLink(
          value as string | null,
          props.isOptional,
          props.validationLabel ?? props.label
        )
      }
    />
  );
};

export const MinimumNumberField = (
  props: RenderFieldProps &
    CustomInputFieldProps & {
      maximumValue: number | null;
    }
) => {
  const name =
    props.subArrayField !== undefined && props.subIndex !== undefined
      ? `${props.arrayField}[${props.index}].${props.subArrayField}[${props.subIndex}]`
      : props.arrayField
      ? `${props.arrayField}[${props.index}].${props.fieldName}`
      : props.fieldName;
  const { getFieldMeta } = useFormikContext();
  const val = getFieldMeta(name);
  return (
    <RenderField
      {...props}
      type="number"
      defaultValue={val.value as string}
      validateFn={(value) =>
        validateMinimumNumber(
          props.maximumValue,
          value as number | null,
          props.isOptional,
          props.validationLabel ?? props.label
        )
      }
    />
  );
};
export const MaximumNumberField = (
  props: RenderFieldProps &
    CustomInputFieldProps & {
      minimumValue: number | null;
    }
) => {
  const name =
    props.subArrayField !== undefined && props.subIndex !== undefined
      ? `${props.arrayField}[${props.index}].${props.subArrayField}[${props.subIndex}]`
      : props.arrayField
      ? `${props.arrayField}[${props.index}].${props.fieldName}`
      : props.fieldName;
  const { getFieldMeta } = useFormikContext();
  const val = getFieldMeta(name);
  return (
    <RenderField
      {...props}
      type="number"
      defaultValue={val.value as string}
      validateFn={(value) =>
        validateMaximumNumber(
          props.minimumValue,
          value as number | null,
          props.isOptional,
          props.validationLabel ?? props.label
        )
      }
    />
  );
};

export const ContractDurationField = (
  props: RenderFieldProps & CustomInputFieldProps
) => {
  const name =
    props.subArrayField !== undefined && props.subIndex !== undefined
      ? `${props.arrayField}[${props.index}].${props.subArrayField}[${props.subIndex}]`
      : props.arrayField
      ? `${props.arrayField}[${props.index}].${props.fieldName}`
      : props.fieldName;
  const { getFieldMeta } = useFormikContext();
  const val = getFieldMeta(name);
  return (
    <RenderField
      {...props}
      defaultValue={val.value as string}
      type="number"
      validateFn={(value) => {
        if (props.dontValidate) {
          return null;
        }
        return validateContractDuration({
          value: value as number | null,
          isOptional: props.isOptional,
          label: props.validationLabel ?? props.label,
          isZeroNotAllowed: props.isZeroNotAllowed,
          mustBeGreaterThanOne: props.mustBeGreaterThanOne,
        });
      }}
    />
  );
};

export const CRNumberField = (
  props: RenderFieldProps & CustomInputFieldProps
) => {
  const name =
    props.subArrayField !== undefined && props.subIndex !== undefined
      ? `${props.arrayField}[${props.index}].${props.subArrayField}[${props.subIndex}]`
      : props.arrayField
      ? `${props.arrayField}[${props.index}].${props.fieldName}`
      : props.fieldName;
  const { getFieldMeta } = useFormikContext();
  const val = getFieldMeta(name);
  return (
    <RenderField
      {...props}
      type="number"
      defaultValue={val.value as string}
      validateFn={(value) => {
        if (props.dontValidate) {
          return null;
        }
        return validateCRNumber({
          value: value as number | null,
          isOptional: props.isOptional,
          label: props.validationLabel ?? props.label,
          isZeroNotAllowed: props.isZeroNotAllowed,
          mustBeGreaterThanOne: props.mustBeGreaterThanOne,
        });
      }}
    />
  );
};

export const NumberField = (
  props: RenderFieldProps & CustomInputFieldProps
) => {
  const name =
    props.subArrayField !== undefined && props.subIndex !== undefined
      ? `${props.arrayField}[${props.index}].${props.subArrayField}[${props.subIndex}]`
      : props.arrayField
      ? `${props.arrayField}[${props.index}].${props.fieldName}`
      : props.fieldName;
  const { getFieldMeta } = useFormikContext();
  const val = getFieldMeta(name);
  return (
    <RenderField
      {...props}
      type="number"
      defaultValue={val.value as string}
      validateFn={(value) => {
        if (props.dontValidate) {
          return null;
        }
        return validateNumber({
          value: value as number | null,
          isOptional: props.isOptional,
          label: props.validationLabel ?? props.label,
          isZeroNotAllowed: props.isZeroNotAllowed,
          mustBeGreaterThanOne: props.mustBeGreaterThanOne,
        });
      }}
    />
  );
};

export const EmailField = (props: RenderFieldProps & CustomInputFieldProps) => {
  const name =
    props.subArrayField !== undefined && props.subIndex !== undefined
      ? `${props.arrayField}[${props.index}].${props.subArrayField}[${props.subIndex}]`
      : props.arrayField
      ? `${props.arrayField}[${props.index}].${props.fieldName}`
      : props.fieldName;
  const { getFieldMeta } = useFormikContext();
  const val = getFieldMeta(name);
  return (
    <RenderField
      {...props}
      type="email"
      defaultValue={val.value as string}
      name={name}
      validateFn={(value) => validateEmail(value as string | null)}
    />
  );
};

export const PasswordField = (
  props: RenderFieldProps & CustomInputFieldProps & { isLogin?: boolean }
) => {
  const [isObscured, setObscured] = useState(true);

  const validateFn = (
    value:
      | string
      | number
      | { name: string; id: string }
      | { name: string; id: string }[]
      | string[]
      | null
  ) => {
    if (props.isLogin) {
      return null;
    }
    if (typeof value === "string") {
      return validatePassword(value);
    }
    return null;
  };

  return (
    <RenderField
      {...props}
      type={isObscured ? "password" : "text"}
      suffix={isObscured ? <IoEyeOutline /> : <FaEyeSlash />}
      suffixClick={() => setObscured(!isObscured)}
      validateFn={validateFn}
    />
  );
};
export const ConfirmPasswordField = (
  props: RenderFieldProps &
    CustomInputFieldProps & { passwordFieldValue: string }
) => {
  const [isObscured, setObscured] = useState(true);
  return (
    <RenderField
      {...props}
      type={isObscured ? "password" : "text"}
      suffix={isObscured ? <IoEyeOutline /> : <FaEyeSlash />}
      suffixClick={() => setObscured(!isObscured)}
      validateFn={(value) =>
        confirmPassword({
          confirmValue: value as string,
          passwordValue: props.passwordFieldValue as string,
        })
      }
    />
  );
};
