import { useMutation } from "@tanstack/react-query";
import { POST_ROUTES } from "./routes";
import { checkEmailAndSendOtp, resetPassword, verifyOtp } from "./requests";

export const useCheckEmailAndSendOtp = () => {
  return useMutation({
    mutationKey: [POST_ROUTES.checkEmailAndSendOtp],
    mutationFn: ({ emailAddress }: { emailAddress: string }) =>
      checkEmailAndSendOtp(emailAddress),
  });
};
export const useVerifyOtp = () => {
  return useMutation({
    mutationKey: [POST_ROUTES.verifyOtp],
    mutationFn: ({ otpCode, userId }: { otpCode: string; userId: string }) =>
      verifyOtp({ otpCode, userId }),
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationKey: [POST_ROUTES.verifyOtp],
    mutationFn: ({
      updatedConfirmPassword,
      updatedPassword,
      userId,
    }: {
      userId: string;
      updatedPassword: string;
      updatedConfirmPassword: string;
    }) => resetPassword({ updatedConfirmPassword, updatedPassword, userId }),
  });
};
