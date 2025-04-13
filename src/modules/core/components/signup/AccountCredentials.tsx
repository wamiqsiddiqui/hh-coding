import { useFormikContext } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../../parentRoutes";
import {
  SignupFieldNames,
  SignupFormType,
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
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { t } from "i18next";
type AccountCredentialsProps = {
  fieldNames: SignupFieldNames[];
  setSelectedSection: Dispatch<SetStateAction<number>>;
  isPending: boolean;
  selectedSection: number;
  email?: string;
  checkError: boolean;
  setCheckError?: Dispatch<SetStateAction<boolean>>;
};
const AccountCredentials = ({
  selectedSection,
  checkError,
  setCheckError,
}: AccountCredentialsProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSection]);
  const { values } = useFormikContext<SignupFormType>();

  const { data: securityQuestions } = useGetAllSecurityQuestions();
  const { language } = useSelector(
    (state: RootState) => state.centeralizedStateData.user
  );
  return (
    <>
      <div className="overflow-x-hidden flex flex-col items-center pb-10 px-10">
        <div className="grid gap-x-4 md:grid-cols-2 max-md:grid-cols-1 w-full">
          <PasswordField
            fullWidth
            label={t("password")}
            fieldName={SignupFieldNames.password}
          />
          <ConfirmPasswordField
            fullWidth
            passwordFieldValue={values.password}
            label={t("confirmPassword")}
            fieldName={SignupFieldNames.confirmPassword}
          />
          {securityQuestions && (
            <DropdownInputField
              label={t("securityQuestions")}
              fieldName={SignupFieldNames.securityQuestion}
              fullWidth
              isOptional={false}
              options={[
                { name: t("selectSecurityQuestion"), id: "" },
                ...securityQuestions.data.data.map((question) => {
                  return {
                    name:
                      language === "en" ? question.labelEn : question.labelAr,
                    id: question.value,
                  };
                }),
              ]}
            />
          )}
          <StringField
            label={t("answer")}
            fullWidth
            fieldName={SignupFieldNames.securityQuestionAns}
          />
        </div>
        <div className=" flex flex-col gap-4 mb-4 w-full">
          <CustomCheckboxField
            size="small"
            fieldName={SignupFieldNames.isAgreedOnTerms}
            customSpan={
              <span>
                {t("youAgreeToOur")}
                <span
                  className="text-secondary-green underline"
                  onClick={() => navigate(PARENT_ROUTES.commingSoon)}
                >
                  {t("termsOfUse")}
                </span>
                ,{" "}
                <span
                  className="text-secondary-green underline"
                  onClick={() => navigate(PARENT_ROUTES.commingSoon)}
                >
                  {t("scanFeeCommission")}
                </span>
                , {t("and")}{" "}
                <span
                  className="text-secondary-green underline"
                  onClick={() => navigate(PARENT_ROUTES.commingSoon)}
                >
                  {t("serviceCommitments")}
                </span>
                {t(
                  "commitToProvidingGenuineTimeLimitedOffersAsPerTheAgreement"
                )}
              </span>
            }
            isChecked={values.isAgreedOnTerms}
            errorText={checkError ? t("pleaseAcceptTermsAndConditions") : ""}
            onChange={(isChecked) => {
              if (setCheckError)
                isChecked ? setCheckError(false) : setCheckError(true);
            }}
          />
        </div>
        <div className="mt-0 w-full">
          <CustomButton
            text={t("submit")}
            width="w-full"
            type="submit"
            fontSize="large"
            variant="primary"
          />
          <div className="flex flex-wrap justify-center mt-5 mb-8">
            <p className="text-grayShades-customGray text-center font-normal   text-base px-1">
              {t("alreadyHaveAccount")}
              <CustomButton
                text={t("space_SignIn")}
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
