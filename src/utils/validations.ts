export const isEmpty = (
  value: string | number | null,
  isOptional?: boolean
) => {
  if (!value && !isOptional) {
    return "cannot be empty";
  }
  return null;
};
export const validateString = (
  value: string | null,
  isOptional?: boolean,
  label?: string,
  allowInvalidInput?: boolean
) => {
  const emptyError = isEmpty(value, isOptional);
  if (emptyError) {
    return label ? `${label} ${emptyError}` : `Field ${emptyError}`;
  }

  // Updated regex without the `u` flag for emoji support
  if (
    !allowInvalidInput &&
    value &&
    !/^(?! )[a-zA-Z0-9\s\u0600-\u06FF]+$/.test(value)
  ) {
    return "Invalid Input";
  }
  return null;
};

export const validateContractDuration = ({
  value,
  ...rest
}: {
  isZeroNotAllowed?: boolean;
  mustBeGreaterThanOne?: boolean;
  value: number | null;
  isOptional?: boolean;
  label?: string;
}) => {
  const validateNumberError = validateNumber({ value, ...rest });
  if (validateNumberError) return validateNumberError;
  if (value! > 1000) {
    return "Contract Duration cannot be more than 1000 months (83 years)";
  }
  return null;
};

export const validateCRNumber = ({
  value,
  isOptional,
  ...rest
}: {
  isZeroNotAllowed?: boolean;
  mustBeGreaterThanOne?: boolean;
  value: number | null;
  isOptional?: boolean;
  label?: string;
}) => {
  const validateNumberError = validateNumber({ value, isOptional, ...rest });
  if (validateNumberError) return validateNumberError;
  if (value!.toString().length !== 10 && !isOptional) {
    return "CR Number must be 10 digits";
  }
  return null;
};

export const validateNumber = ({
  value,
  isOptional,
  label,
  isZeroNotAllowed,
  mustBeGreaterThanOne,
}: {
  isZeroNotAllowed?: boolean;
  mustBeGreaterThanOne?: boolean;
  value: number | null;
  isOptional?: boolean;
  label?: string;
}): string | null => {
  if (
    (value === undefined || value === null || value?.toString().length === 0) &&
    !isOptional
  )
    return label ? `${label} cannot be empty` : "This field cannot be empty";
  else if (value && isNaN(value)) {
    return "Value must be a number";
  } else if (value && value < 0) {
    return "Number must be positive";
  } else if (value === 0 && isZeroNotAllowed) {
    return "Number must be greater than 0";
  } else if (
    value !== undefined &&
    value !== null &&
    value.toString() !== "" &&
    value <= 1 &&
    mustBeGreaterThanOne
  ) {
    return "Number must be greater than 1";
  }
  return null;
};

export const validateCalendlyLink = (
  value: string | null,
  isOptional?: boolean,
  label?: string
) => {
  const validatedString = validateString(value, isOptional, label, true);
  if (validatedString !== null) return validatedString;
  if (value && !/https:\/\/calendly\.com\/[a-zA-Z0-9_-]+/.test(value)) {
    return "Invalid Calendly Link";
  }
  return null;
};

export const validateMinimumNumber = (
  maximumValue: number | null,
  value: number | null,
  isOptional?: boolean,
  label?: string
): string | null => {
  const validateNumberError = validateNumber({ value, isOptional, label });
  if (validateNumberError) return validateNumberError;
  if (maximumValue && value! > maximumValue) {
    return "Minimum value cannot be greater than Maximum value";
  }
  return null;
};
export const validateMaximumNumber = (
  minimumValue: number | null,
  value: number | null,
  isOptional?: boolean,
  label?: string
): string | null => {
  const validateNumberError = validateNumber({ value, isOptional, label });
  if (validateNumberError) return validateNumberError;
  if (minimumValue && value! < minimumValue) {
    return "Maximum value cannot be less than Minimum value";
  }
  return null;
};

export const validateEmail = (value: string | null, isOptional?: boolean) => {
  const emptyError = isEmpty(value, isOptional);
  if (emptyError) return `Email ${emptyError}`;
  if (value && !/^[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return "Invalid Email";
  }
  return null;
};
export const confirmPassword = ({
  confirmValue,
  passwordValue,
}: {
  confirmValue: string;
  passwordValue: string;
}) => {
  const emptyError = isEmpty(confirmValue);
  if (emptyError) return `Password ${emptyError}`;

  if (confirmValue.trim() !== passwordValue.trim()) {
    return "Confirm Password must be equal to Password";
  }
  return null;
};
export const validatePassword = (value: string) => {
  const emptyError = isEmpty(value);
  if (emptyError) return `Password ${emptyError}`;

  if (value.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (
    !/^(?=.*[a-z\u0600-\u06FF])(?=.*[A-Z\u0600-\u06FF])(?=.*\d)(?=.*[^\da-zA-Z\u0600-\u06FF]).{8,}$/.test(
      value
    )
  ) {
    return "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
  }

  if (value.includes(" ")) {
    return "Password cannot contain empty spaces";
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
