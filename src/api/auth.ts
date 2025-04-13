import axiosInstance from "../services/axiosInstance";
import { RegisterUserResponse } from "../types/generalTypes";
import { SignupFieldNames, SignupFormType } from "../types/signupTypes";
import { TLoginResponse } from "../redux/auth";

export const registerUser = async (data: SignupFormType) => {
  delete data.confirmPassword;
  const formData = new FormData();

  // Append string fields
  formData.append(SignupFieldNames.emailAddress, data.emailAddress);
  formData.append(SignupFieldNames.password, data.password);
  formData.append(SignupFieldNames.phoneNo, data.phoneNo);
  formData.append(SignupFieldNames.businessNameEn, data.businessNameEn);
  formData.append(SignupFieldNames.businessNameAr, data.businessNameAr);
  formData.append(SignupFieldNames.businessCategory, data.businessCategory);
  formData.append(SignupFieldNames.managerName, data.managerName);
  formData.append(SignupFieldNames.address, data.address);
  formData.append(
    SignupFieldNames.isAgreedOnTerms,
    String(data.isAgreedOnTerms)
  );
  formData.append(SignupFieldNames.securityQuestion, data.securityQuestion);
  formData.append(
    SignupFieldNames.securityQuestionAns,
    data.securityQuestionAns
  );
  formData.append(SignupFieldNames.commercialRegNo, data.commercialRegNo);
  formData.append(SignupFieldNames.taxId, data.taxId);
  formData.append(SignupFieldNames.bankAccountNo, data.bankAccountNo);
  formData.append(SignupFieldNames.boxOrBuilding, data.boxOrBuilding);
  formData.append(SignupFieldNames.facebookLink, data.facebookLink);
  formData.append(SignupFieldNames.instagramLink, data.instagramLink);
  formData.append(SignupFieldNames.websiteLink, data.websiteLink);
  formData.append(SignupFieldNames.tiktokLink, data.tiktokLink);

  if (data.businessLicenseDoc) {
    formData.append(
      SignupFieldNames.businessLicenseDoc,
      data.businessLicenseDoc.fileWithPath as File
    );
  }

  formData.append(
    "location[coordinates][0]",
    data.location[0].coordinates.toString()
  );
  formData.append(
    "location[coordinates][1]",
    data.location[1].coordinates.toString()
  );

  return axiosInstance.post<RegisterUserResponse>(
    "/service-provider/auth/register-service-provider",
    formData
  );
};
export const refreshTokenAPI = async (token: string | null) => {
  return await axiosInstance.post<{ data: TLoginResponse }>(
    "/user/auth/refresh-session-token",
    {
      refreshToken: token,
    }
  );
};
