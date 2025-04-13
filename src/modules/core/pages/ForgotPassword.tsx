import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { EmailField } from "../components/FormFields";
import SubHeader from "../components/SubHeader";
import OtpInputField from "../components/OtpInputField";
import {
  useCheckEmailAndSendOtp,
  useVerifyOtp,
} from "../../../api/security/reactQueryHooks";
import Loader from "../components/Loader";
import { useEffect, useRef, useState } from "react";
import { PARENT_ROUTES } from "../../../parentRoutes";
import ResetPassword from "./ResetPassword";
import { useHeight } from "../../../utils/hooks";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const checkEmailInitialValues = {
    emailAddress: "",
  };
  const verifyOtpInitialValues = {
    otpCode: "",
  };
  const navigate = useNavigate();
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const {
    data: sendOtpResponse,
    mutate: checkEmailAndSendOtp,
    isSuccess: isSendOtpSuccess,
    isPending: isSendOtpPending,
  } = useCheckEmailAndSendOtp();
  const {
    mutate: verifyOtp,
    isSuccess: isVerifyOtpSuccess,
    isPending: isVerifyOtpPending,
  } = useVerifyOtp();
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  useHeight(elementRef, setHeight);
  useEffect(() => {
    if (isVerifyOtpSuccess) {
      setIsResettingPassword(true);
    }
  }, [setIsResettingPassword, isVerifyOtpSuccess]);
  const { t } = useTranslation();
  return (
    <div
      ref={elementRef}
      className={`flex flex-col h-screen md:overflow-y-auto max-md:overflow-hidden items-center ${
        height <= 460
          ? "justify-start md:py-3"
          : "justify-center  md:overflow-y-auto  max-md:overflow-hidden"
      } text-custom-black relative w-full`}
    >
      <div
        className={`bg-custom-white md:shadow-md portrait:p-12 landscape:px-7 landscape:py-6 landscape:max-md:rounded-none rounded-xl w-full sm:w-[562px] xl:min-w-[310px] ${
          height <= 400
            ? "h-screen md:h-[130vh] max-md:overflow-y-auto"
            : "h-auto  max-md:h-screen max-md:overflow-hidden"
        } md:mb-[100px] landscape:max-md:w-full`}
      >
        {isResettingPassword &&
        sendOtpResponse &&
        sendOtpResponse.data.data._id ? (
          <>
            <ResetPassword userId={sendOtpResponse?.data.data._id} />
          </>
        ) : (
          <>
            <SubHeader noPadding />
            <p className="text-4xl font-bold text-center mt-4">
              {t("emailVerification")}
            </p>
            <p className="text-lg font-normal text-center text-hhGrayShades-textGray mb-8 mt-1">
              {t("enterEmailToReceiveOTP")}
            </p>
            {(isSendOtpPending || isVerifyOtpPending) && <Loader />}
            <>
              <Formik
                initialValues={checkEmailInitialValues}
                onSubmit={(values: { emailAddress: string }) => {
                  checkEmailAndSendOtp({ emailAddress: values.emailAddress });
                }}
              >
                {() => (
                  <Form className="flex flex-col 2xl:space-y-2 w-full">
                    <EmailField
                      autoFocus
                      isFloating
                      fieldName="emailAddress"
                      label={t("email")}
                      fullWidth
                      disabled={isSendOtpSuccess}
                    />
                    {!isSendOtpSuccess && (
                      <div className="flex flex-col items-center w-full gap-y-4">
                        <CustomButton
                          text={t("next")}
                          width="w-full"
                          type="submit"
                        />
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </>
            {isSendOtpSuccess && (
              <>
                <Formik
                  initialValues={verifyOtpInitialValues}
                  onSubmit={({ otpCode }: { otpCode: string }) => {
                    verifyOtp({
                      otpCode: otpCode,
                      userId: sendOtpResponse?.data.data._id,
                    });
                  }}
                >
                  {() => (
                    <Form className="flex items-center flex-col w-full">
                      <div className="mb-8 2xl:mb-6">
                        <p className="text-lg font-medium text-center">
                          {t("enterOTPYouReceived")}
                        </p>
                      </div>
                      <OtpInputField fieldName="otpCode" />
                      <div className="flex flex-col mt-6 items-center w-full gap-y-4">
                        <CustomButton
                          text={t("next")}
                          width="w-full"
                          type="submit"
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            )}
            <div className="flex w-full justify-center items-center">
              <CustomButton
                noHover
                text={t("back")}
                onClick={() => {
                  navigate(PARENT_ROUTES.login);
                }}
                variant="text"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
