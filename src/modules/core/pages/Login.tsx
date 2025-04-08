import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../parentRoutes";
import { TLoginResponse } from "../../../redux/auth";
import { setToast } from "../../../redux/toastSlice";
import axiosInstance from "../../../services/axiosInstance";
// import { RoleEnum, jwtPayload } from "../../../types/generalTypes";
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

type TLogin = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const initialValues: TLogin = {
    email: Cookies.get(KEY_NAMES.emailAddress) ?? "",
    password: descryptPassword(Cookies.get(KEY_NAMES.password) ?? "") ?? "",
  };

  const loginOnSubmit = async (values: TLogin) => {
    console.log("values = ", values);
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
      const response = await axiosInstance.post<TLoginResponse>(
        "/user/auth/login",
        {
          // ...values,
          emailAddress: values.email,
          password: password,
        }
      );
      console.log("response = ", response);
      // const accessToken = response.data.access_token;
      // const refreshToken = response.data.refresh_token;
      // localStorage.setItem(KEY_NAMES.accessToken, accessToken);
      // localStorage.setItem(KEY_NAMES.refreshToken, refreshToken);
      // localStorage.setItem(
      //   KEY_NAMES.permissions,
      //   encryptPassword(response.data.permissions!)
      // );
      // localStorage.setItem(
      //   KEY_NAMES.merchantId,
      //   encryptPassword(response.data.merchantId!)
      // );

      // const decoded = jwtDecode<jwtPayload>(accessToken);
      // if (decoded.role === RoleEnum.MERCHANT_REPRESENTATIVE) {
      //   localStorage.setItem(
      //     KEY_NAMES.permissions,
      //     encryptPassword(response.data.permissions!)
      //   );
      //   localStorage.setItem(
      //     KEY_NAMES.merchantId,
      //     encryptPassword(response.data.merchantId!)
      //   );
      // }
      // dispatch(
      //   setLogin({
      //     isLoggedIn: true,
      //     accessToken: response.data.access_token,
      //     expiresIn: response.data.expires_in,
      //     refreshToken: response.data.refresh_token,
      //     refreshExpiresIn: response.data.refresh_expires_in,
      //     role: decoded.role,
      //     user: decoded,
      //     subRole: response.data.subRole,
      //     permissions: response.data.permissions,
      //     merchantId: response.data.merchantId,
      //   })
      // );
      // navigate(
      //   RoleEnum.MERCHANT === decoded?.role
      //     ? "/merchant"
      //     : RoleEnum.MERCHANT_REPRESENTATIVE === decoded?.role
      //     ? "/merchant"
      //     : "/deal-maker"
      // );
    } catch (error) {
      console.log("error");
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

  // Function to update height
  const updateHeight = () => {
    if (elementRef.current) {
      const newHeight = elementRef.current.offsetHeight;
      setHeight(newHeight);
    }
  };

  // Add event listeners on mount and clean up on unmount
  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    updateHeight(); // Initial height calculation

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);
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
        <SubHeader noPadding />
        <div className="w-full flex items-center gap-y-4 flex-col justify-center">
          <HappyHourLogoSvg width="157.59" height="76.57" />
          <CustomChip text="Service Provider" />
        </div>
        <p className="text-4xl font-bold text-center mt-4">Sign In</p>
        <p className="text-lg font-normal text-center text-hhGrayShades-textGray mb-8 mt-1">
          Please Sign In to continue to your account.
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
                  isFloating
                  fieldName="email"
                  placeholder=""
                  label="Email"
                  fullWidth
                />
                <PasswordField
                  isLogin
                  isFloating
                  marginBottom="mb-0"
                  fieldName="password"
                  placeholder=""
                  label="Password"
                  fullWidth
                  suffix={<RiExchangeFill />}
                />
              </div>
              <div className="w-full flex justify-between my-5">
                <CustomCheckbox
                  size="large"
                  isChecked={Cookies.get(KEY_NAMES.rememberMe) === "true"}
                  checkboxText="Keep me logged in"
                  onChange={(isChecked) => setRememberMe(isChecked)}
                />
                <CustomButton
                  text="Forgot password?"
                  noHover
                  size="medium"
                  fontSize="small"
                  textAlign="text-center"
                  noTextFlex
                  variant="text"
                  onClick={() => navigate(PARENT_ROUTES.forgotPassword)}
                />
              </div>
              <CustomButton type="submit" fontSize="large" text="Sign in" />
              <div className="flex flex-wrap justify-center mt-5 mb-8">
                <p className="text-grayShades-customGray text-center font-normal text-base px-1">
                  {`Don't have an account? `}
                  <CustomButton
                    text=" Sign Up"
                    variant="text"
                    size="medium"
                    fontSize="medium"
                    noHover
                    onClick={() => navigate(PARENT_ROUTES.signup)}
                  />
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
