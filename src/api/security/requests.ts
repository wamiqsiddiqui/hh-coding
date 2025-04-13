import axiosInstance from "../../services/axiosInstance";
import { POST_ROUTES } from "./routes";

export const checkEmailAndSendOtp = (emailAddress: string) => {
  return axiosInstance.post<{
    data: {
      _id: string;
      message: string;
    };
  }>(POST_ROUTES.checkEmailAndSendOtp, { emailAddress });
};
export const verifyOtp = ({
  otpCode,
  userId,
}: {
  otpCode: string;
  userId: string;
}) => {
  return axiosInstance.post<{
    id: string;
    message: string;
  }>(POST_ROUTES.verifyOtp, { otpCode, userId });
};
export const sendResetEmail = (email: string) => {
  return axiosInstance.post<{
    id: string;
    message: string;
  }>(POST_ROUTES.resetPassword + email);
};

export const checkEmailExists = (email: string) => {
  return axiosInstance.post<{ emailExist: boolean }>(
    POST_ROUTES.emailExists + email
  );
};

export const resetPassword = ({
  updatedConfirmPassword,
  updatedPassword,
  userId,
}: {
  userId: string;
  updatedPassword: string;
  updatedConfirmPassword: string;
}) => {
  return axiosInstance.post<{
    id: string;
    message: string;
  }>(POST_ROUTES.resetPassword, {
    updatedPassword,
    updatedConfirmPassword,
    userId,
  });
};
