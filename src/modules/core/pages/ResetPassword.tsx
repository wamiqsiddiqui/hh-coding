import { Form, Formik } from "formik";
import { ConfirmPasswordField, PasswordField } from "../components/FormFields";
import resetPasswordImg from "../../../assets/images/resetPassword.png";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../parentRoutes";
import { useResetPassword } from "../../../api/security/reactQueryHooks";
import Loader from "../components/Loader";
import SubHeader from "../components/SubHeader";
import { useSuccessError } from "../../../utils/hooks";
import { useTranslation } from "react-i18next";

const ResetPassword = ({ userId }: { userId: string }) => {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    mutateAsync: resetPassword,
    isSuccess,
    isPending,
    error: resetPasswordError,
    isError: isResetPasswordError,
  } = useResetPassword();
  useSuccessError({
    error: resetPasswordError,
    isSuccess,
    isError: isResetPasswordError,
    successMessage: t("passwordUpdatedSuccessfully"),
  });
  return (
    <>
      {isSuccess ? (
        <div className="flex flex-col gap-y-2 items-center justify-center w-full">
          <img alt="w" width={254} height={349} src={resetPasswordImg} />
          <p className="text-3xl mt-4 font-bold text-text-black">
            {t("yourPasswordHasBeenChanged")}
          </p>
          <p className="text-lg font-medium mb-4 text-hhGrayShades-textGray">
            {t("loginAgainWithYourNewPassword")}
          </p>
          <CustomButton
            text={t("backToLogin")}
            onClick={() => navigate(PARENT_ROUTES.login)}
          />
        </div>
      ) : (
        <>
          {isPending && <Loader />}
          <SubHeader noPadding />
          <p className="text-3xl font-bold text-text-black">
            {t("newPassword")}
          </p>
          <p className="text-lg mb-4 font-medium text-hhGrayShades-textGray">
            {t("createNewPasswordForYourAccount")}
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: {
              password: string;
              confirmPassword: string;
            }) => {
              resetPassword({
                userId: userId,
                updatedPassword: values.password,
                updatedConfirmPassword: values.confirmPassword,
              });
            }}
          >
            {({ values }) => (
              <Form className="flex flex-col 2xl:space-y-2 w-full">
                <PasswordField
                  fullWidth
                  label={t("password")}
                  fieldName={"password"}
                />
                <ConfirmPasswordField
                  fullWidth
                  passwordFieldValue={values.password}
                  label={t("confirmPassword")}
                  fieldName={"confirmPassword"}
                />
                <div className="flex flex-col mt-4 gap-y-4">
                  <CustomButton text={t("updatePassword")} type="submit" />
                  <CustomButton
                    text={t("cancel")}
                    onClick={() => {
                      navigate(PARENT_ROUTES.login);
                    }}
                    variant="secondary"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default ResetPassword;
