import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../parentRoutes";
import { setLogin, TLoginResponse } from "../../../redux/auth";
import { setToast } from "../../../redux/toastSlice";
import axiosInstance from "../../../services/axiosInstance";
import { KEY_NAMES } from "../../../utils/constants";
import {
  descryptPassword,
  displayErrorMessage,
  encryptPassword,
} from "../../../utils/helpers";
import { RiExchangeFill } from "../../../utils/icons";
import { LoginValidationSchema } from "../../../utils/validationSchema";
import CustomButton from "../components/CustomButton";
import CustomCheckbox from "../components/CustomCheckbox";
import { EmailField, PasswordField } from "../components/FormFields";
import { HappyHourLogoSvg } from "../../../utils/svgIcons";
import CustomChip from "../components/CustomChip";
import SubHeader from "../components/SubHeader";
import { useHeight } from "../../../utils/hooks";
import { jwtDecode } from "jwt-decode";
import { jwtPayload } from "../../../types/generalTypes";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader";

type TLogin = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const initialValues: TLogin = {
    email: Cookies.get(KEY_NAMES.emailAddress) ?? "",
    password: descryptPassword(Cookies.get(KEY_NAMES.password) ?? "") ?? "",
  };

  const loginOnSubmit = async (values: TLogin) => {
    const password =
      process.env.REACT_APP_IS_ALLOW_ENCRYPTION === "true"
        ? encryptPassword(values.password)
        : values.password;
    if (rememberMe) {
      Cookies.set(KEY_NAMES.rememberMe, "true");
      Cookies.set(KEY_NAMES.emailAddress, values.email);
      Cookies.set(KEY_NAMES.password, password);
    } else {
      Cookies.set(KEY_NAMES.rememberMe, "false");
      Cookies.set(KEY_NAMES.emailAddress, "");
      Cookies.set(KEY_NAMES.password, "");
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post<{ data: TLoginResponse }>(
        "/user/auth/login",
        {
          emailAddress: values.email,
          password: values.password,
        }
      );
      setLoading(false);
      const accessToken = response.data.data.authToken;
      const decodedAuthToken = jwtDecode<jwtPayload>(accessToken);
      const decodedRefreshToken = jwtDecode<jwtPayload>(
        decodedAuthToken.refreshToken
      );
      localStorage.setItem(KEY_NAMES.accessToken, accessToken);
      localStorage.setItem(
        KEY_NAMES.refreshToken,
        decodedAuthToken.refreshToken
      );
      dispatch(
        setLogin({
          isLoggedIn: true,
          accessToken: response.data.data.authToken,
          expiresIn: decodedAuthToken.exp,
          refreshToken: decodedAuthToken.refreshToken,
          refreshExpiresIn: decodedRefreshToken.exp,
          role: decodedAuthToken.role,
          user: decodedAuthToken,
        })
      );
      navigate(PARENT_ROUTES.serviceProvider);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        dispatch(
          setToast({
            text:
              displayErrorMessage(error?.response?.data.message!, [
                {
                  includes: "Unauthorized",
                  returnText: "Invalid email and password",
                },
                {
                  includes: "is not verified",
                  returnText: "Email is not verified",
                },
              ]) || "Something went wrong",
            variant: "error",
          })
        );
      }
    }
  };
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);
  const { t } = useTranslation();
  useHeight(elementRef, setHeight);
  return (
    <div
      ref={elementRef}
      className={`flex flex-col h-screen md:overflow-y-auto max-md:overflow-hidden items-center ${
        height <= 460
          ? "justify-start md:py-3"
          : "justify-center  md:overflow-y-auto  max-md:overflow-hidden"
      } text-custom-black relative w-full`}
    >
      {isLoading && <Loader />}
      <div
        className={`bg-custom-white md:shadow-md portrait:p-12 landscape:px-7 landscape:py-6 landscape:max-md:rounded-none rounded-xl w-full sm:w-[562px] xl:min-w-[310px] ${
          height <= 400
            ? "h-screen md:h-[130vh] max-md:overflow-y-auto"
            : "h-auto  max-md:h-screen max-md:overflow-hidden"
        } md:mb-[100px] landscape:max-md:w-full`}
      >
        <SubHeader noPadding noLogo />
        <div className="w-full flex items-center gap-y-4 flex-col justify-center">
          <HappyHourLogoSvg width="157.59" height="76.57" />
          <CustomChip text={t("serviceProvider")} />
        </div>
        <p className="text-4xl font-bold text-center mt-4">{t("SignIn")}</p>
        <p className="text-lg font-normal text-center text-hhGrayShades-textGray mb-8 mt-1">
          {t("SignInDescription")}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginValidationSchema}
          onSubmit={loginOnSubmit}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col w-full"
            >
              <div className="flex flex-col w-full gap-y-3">
                <EmailField
                  autoFocus
                  fieldName="email"
                  placeholder=""
                  label={t("email")}
                  fullWidth
                />
                <PasswordField
                  isLogin
                  isFloating
                  marginBottom="mb-0"
                  fieldName="password"
                  label={t("password")}
                  fullWidth
                  suffix={<RiExchangeFill />}
                />
              </div>
              <div className="w-full flex justify-between my-5">
                <CustomCheckbox
                  size="large"
                  isChecked={Cookies.get(KEY_NAMES.rememberMe) === "true"}
                  checkboxText={t("rememberMe")}
                  onChange={(isChecked) => setRememberMe(isChecked)}
                />
                <CustomButton
                  text={t("forgotPassword")}
                  noHover
                  size="medium"
                  fontSize="small"
                  textAlign="text-center"
                  noTextFlex
                  variant="text"
                  onClick={() => navigate(PARENT_ROUTES.forgotPassword)}
                />
              </div>
              <CustomButton type="submit" fontSize="large" text={t("SignIn")} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
