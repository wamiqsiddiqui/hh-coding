import { TFunction } from "react-i18next";

export const isEmpty = (
  value: string | number | null,
  t: TFunction<"translation", undefined>,
  isOptional?: boolean
) => {
  if (!value && !isOptional) {
    return t("cannotBeEmpty");
  }
  return null;
};
export const validateString = ({
  value,
  allowInvalidInput,
  isOptional,
  label,
  isArabic,
  t,
}: {
  value: string | null;
  isOptional?: boolean;
  label?: string;
  allowInvalidInput?: boolean;
  isArabic?: boolean;
  t: TFunction<"translation", undefined>;
}) => {
  const trimmedValue = value?.trim() || "";

  const emptyError = isEmpty(trimmedValue, t, isOptional);
  if (emptyError) {
    return label ? `${label} ${emptyError}` : `${t("field")} ${emptyError}`;
  }

  if (!allowInvalidInput && trimmedValue) {
    if (isArabic) {
      // Only allow Arabic characters and spaces
      if (!/^[\u0600-\u06FF\s]+$/.test(trimmedValue)) {
        return t("onlyArabicCharactersAllowed");
      }
    } else {
      // Allow English letters, numbers, Arabic, and spaces
      if (!/^(?! )[a-zA-Z0-9\s\u0600-\u06FF]+$/.test(trimmedValue)) {
        return t("invalidInput");
      }
    }
  }

  return null;
};

export const validateNumber = ({
  value,
  isOptional,
  label,
  isZeroNotAllowed,
  mustBeGreaterThanOne,
  t,
}: {
  isZeroNotAllowed?: boolean;
  mustBeGreaterThanOne?: boolean;
  value: number | null;
  isOptional?: boolean;
  label?: string;
  t: TFunction<"translation", undefined>;
}): string | null => {
  if (
    (value === undefined || value === null || value?.toString().length === 0) &&
    !isOptional
  )
    return label
      ? `${label} ${t("cannotBeEmpty")}`
      : t("thisFieldCannotBeEmpty");
  else if (value && isNaN(value)) {
    return t("valueMustBeNumber");
  } else if (value && value < 0) {
    return t("numberMustBePositive");
  } else if (value === 0 && isZeroNotAllowed) {
    return t("numberMustNotBeZero");
  } else if (
    value !== undefined &&
    value !== null &&
    value.toString() !== "" &&
    value <= 1 &&
    mustBeGreaterThanOne
  ) {
    return t("numberMustBeGreaterThan1");
  }
  return null;
};

export const validateSaudiMobile = ({
  phone,
  t,
  ...rest
}: {
  t: TFunction<"translation", undefined>;
  isZeroNotAllowed?: boolean;
  mustBeGreaterThanOne?: boolean;
  phone: number | null;
  isOptional?: boolean;
  label?: string;
}): string | null => {
  const validateNumberError = validateNumber({
    value: phone,
    t,
    ...rest,
  });
  if (validateNumberError) return validateNumberError;

  if (phone!.toString().trim().length !== 9) {
    return t("phoneNumberMustBe9Digits");
  }

  if (!/^5\d{8}$/.test(phone!.toString())) {
    return t("phoneNumberMustHave5AndOnlyDigits");
  }

  return null;
};

export const validateMinimumNumber = (
  maximumValue: number | null,
  value: number | null,
  t: TFunction<"translation", undefined>,
  isOptional?: boolean,
  label?: string
): string | null => {
  const validateNumberError = validateNumber({ value, isOptional, t, label });
  if (validateNumberError) return validateNumberError;
  if (maximumValue && value! > maximumValue) {
    return "Minimum value cannot be greater than Maximum value";
  }
  return null;
};
export const validateMaximumNumber = (
  minimumValue: number | null,
  value: number | null,
  t: TFunction<"translation", undefined>,
  isOptional?: boolean,
  label?: string
): string | null => {
  const validateNumberError = validateNumber({ value, t, isOptional, label });
  if (validateNumberError) return validateNumberError;
  if (minimumValue && value! < minimumValue) {
    return "Maximum value cannot be less than Minimum value";
  }
  return null;
};

export const validateEmail = (
  value: string | null,
  t: TFunction<"translation", undefined>,
  isOptional?: boolean
) => {
  const emptyError = isEmpty(value, t, isOptional);
  if (emptyError) return `${t("email")} ${emptyError}`;
  if (value && !/^[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return t("invalidEmail");
  }
  return null;
};
export const confirmPassword = ({
  confirmValue,
  passwordValue,
  t,
}: {
  confirmValue: string;
  passwordValue: string;
  t: TFunction<"translation", undefined>;
}) => {
  const emptyError = isEmpty(confirmValue, t);
  if (emptyError) return `${t("password")} ${emptyError}`;
  if (confirmValue.trim() !== passwordValue.trim()) {
    return t("confirmPasswordMustBeEqualToPassword");
  }
  return null;
};
export const validatePassword = (
  value: string,
  t: TFunction<"translation", undefined>
) => {
  const emptyError = isEmpty(value, t);
  if (emptyError) return `${t("password")} ${emptyError}`;

  if (value.length < 8) {
    return t("passwordMustBe8Characters");
  }

  if (
    !/^(?=.*[a-z\u0600-\u06FF])(?=.*[A-Z\u0600-\u06FF])(?=.*\d)(?=.*[^\da-zA-Z\u0600-\u06FF]).{8,}$/.test(
      value
    )
  ) {
    return t("passwordSpecialCharacterError");
  }

  if (value.includes(" ")) {
    return t("passwordEmptySpacesError");
  }
  return null;
};

export const isValidTimestamp = (timestamp: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  if (!regex.test(timestamp)) {
    return false;
  }

  const date = new Date(timestamp);
  return date instanceof Date;
};
