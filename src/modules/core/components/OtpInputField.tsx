import { useFormikContext } from "formik";
import { useRef, useState } from "react";

type OtpInputFieldProps = { fieldName: string };

const OtpInputField = ({ fieldName }: OtpInputFieldProps) => {
  const OTP_LENGTH = 4;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setFieldValue } = useFormikContext();
  const [otpValue, setOtpValue] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otpValue];
      newOtp[index] = value;
      setOtpValue(newOtp);
      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[index]?.blur();
      }

      if (newOtp.every((digit) => digit !== "")) {
        setFieldValue(fieldName, newOtp.join(""));
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otpValue];

      if (otpValue[index] !== "") {
        newOtp[index] = "";
        setOtpValue(newOtp);
        setFieldValue(fieldName, newOtp.join(""));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtpValue(newOtp);
        setFieldValue(fieldName, newOtp.join(""));
      }
    }
  };

  return (
    <div className="flex gap-x-4">
      {Array.from({ length: OTP_LENGTH }).map((_, index) => {
        return (
          <div
            key={index}
            className={`flex items-center bg-white h-20 w-20 border-[1px] shadow-input-field-light rounded-lg border-hhGrayShades-borderGray focus-within:border-custom-green`}
          >
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otpValue[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="text-4xl font-semibold px-7 rounded-lg w-full h-full outline-none placeholder:text-xs placeholder:text-grayShades-textGray text-text-black bg-white text-center"
            />
          </div>
        );
      })}
    </div>
  );
};

export default OtpInputField;
