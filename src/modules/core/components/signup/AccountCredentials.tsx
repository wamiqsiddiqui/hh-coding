import { useFormikContext } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../../parentRoutes";
import {
  SignupFieldNames,
  SignupRequestType,
} from "../../../../types/signupTypes";
import CustomButton from "../CustomButton";
import {
  ConfirmPasswordField,
  CustomCheckboxField,
  PasswordField,
  StringField,
} from "../FormFields";
import DropdownInputField from "../DropdownInputField";
import { useGetAllSecurityQuestions } from "../../../../api/general/reactQueryHooks";
type PersonalInfoProps = {
  fieldNames: SignupFieldNames[];
  setSelectedSection: Dispatch<SetStateAction<number>>;
  type: string;
  isPending: boolean;
  selectedSection: number;
  email?: string;
  checkError: boolean;
  setCheckError?: Dispatch<SetStateAction<boolean>>;
};
const AccountCredentials = ({
  setSelectedSection,
  //   fieldNames,
  //   type,
  //   isPending,
  selectedSection,
  email,
  checkError,
  setCheckError,
}: PersonalInfoProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSection]);
  const {
    // setFieldTouched,
    // validateField,
    values,
    // setErrors,
    // errors,
    setFieldValue,
    // isSubmitting,
  } = useFormikContext<SignupRequestType>();

  useEffect(() => {
    if (email) {
      setFieldValue("email", email);
    }
  }, [email, setFieldValue]);
  console.log("values = ", values);
  const { data: securityQuestions } = useGetAllSecurityQuestions();

  return (
    <>
      <div className="overflow-x-hidden flex flex-col items-center pb-10 px-10">
        <div className="grid gap-x-4 md:grid-cols-2 max-md:grid-cols-1 w-full">
          <PasswordField fullWidth label="Password" fieldName={"password"} />
          <ConfirmPasswordField
            fullWidth
            passwordFieldValue={values.password}
            label="Confirm Password"
            fieldName={"confirmPassword"}
          />
          {securityQuestions && (
            <DropdownInputField
              label="Security Questions"
              fieldName={SignupFieldNames.securityQuestion}
              fullWidth
              isOptional={false}
              options={[
                { name: "Select Security Question", id: "" },
                ...securityQuestions.data.map((question) => {
                  return { name: question.label, id: question.value };
                }),
              ]}
            />
          )}
          <StringField
            label="Answer"
            fullWidth
            fieldName={SignupFieldNames.securityQuestionAns}
          />
        </div>
        <div className=" flex flex-col gap-4 mb-4 w-full">
          <CustomCheckboxField
            className=" "
            size="small"
            fieldName={"terms"}
            checkboxText={
              "You agree to our Terms of Use, Scan Fee Commission, and Service Commitments, and commit to providing genuine, time-limited offers as per the agreement."
            }
            linkText="Terms of Service"
            link={() => navigate(PARENT_ROUTES.commingSoon)}
            isChecked={values.terms}
            errorText={checkError ? "Please accept terms and conditions" : ""}
            onChange={(isChecked) => {
              if (setCheckError)
                isChecked ? setCheckError(false) : setCheckError(true);
            }}
          />
        </div>
        <div className="mt-0">
          <CustomButton
            onClick={() => () => setSelectedSection(1)}
            text={"Continue"}
            fontFamily=" "
            fontSize="large"
            variant="primary"
          />

          <div className="flex flex-wrap justify-center mt-5 mb-8">
            <p className="text-grayShades-customGray text-center font-normal   text-base px-1">
              {`Already have an account? `}
              <CustomButton
                text=" Sign in"
                variant="text"
                size="medium"
                fontSize="medium"
                noHover
                onClick={() => navigate(PARENT_ROUTES.login)}
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountCredentials;
