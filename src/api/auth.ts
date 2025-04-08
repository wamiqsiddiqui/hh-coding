import { FileWithPath } from "react-dropzone";
import axiosInstance from "../services/axiosInstance";
import { RegisterUserResponse, RoleEnum } from "../types/generalTypes";
// import { SignupFormType } from "../types/signupTypes";
// import { uploadDocument } from "./media/requests";
import { TLoginResponse } from "../redux/auth";
import { encryptPassword } from "../utils/helpers";

export const registerUser = async (
  data: any, //SignupFormType,
  hasNoCompanyInfo: boolean
) => {
  delete data.confirmPassword;
  if (process.env.REACT_APP_IS_ALLOW_ENCRYPTION === "true") {
    const password: string = encryptPassword(data.password);
    data.password = password;
  }
  if (data.type === RoleEnum.MERCHANT) {
    const attr = data.attributes;

    const crDocument = attr.crDocument
      ? (attr.crDocument?.fileWithPath as FileWithPath)
      : null;
    const licenseDocument = attr.licenseDocument
      ? (attr.licenseDocument?.fileWithPath as FileWithPath)
      : null;
    const optionalDocuments = [];
    if (crDocument) {
      optionalDocuments.push(crDocument);
    }
    if (licenseDocument) {
      optionalDocuments.push(licenseDocument);
    }
    // let responseMessage;
    if (optionalDocuments.length > 0) {
      //   responseMessage = await uploadDocument(optionalDocuments);
    }
    return axiosInstance.post<RegisterUserResponse>(
      "/users/register",
      hasNoCompanyInfo
        ? {
            companyName: data.companyName,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            type: data.type,
          }
        : {
            ...data,
            // attributes: {
            //   company: {
            //     ...data.attributes,
            //     crNumber: data.attributes.crNumber.toString(),
            //     crDocument:
            //       responseMessage && crDocument
            //         ? responseMessage?.message[0].fileId
            //         : null,
            //     licenseDocument:
            //       responseMessage && optionalDocuments.length > 1
            //         ? responseMessage.message[1].fileId
            //         : responseMessage && licenseDocument
            //         ? responseMessage.message[0].fileId
            //         : null,
            //   },
            // },
          }
    );
  }
  return axiosInstance.post<RegisterUserResponse>("/users/register", {
    companyName: data.companyName,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    type: data.type,
    attributes: {
      roleId:
        data.type === RoleEnum.MERCHANT_REPRESENTATIVE ? data.roleId : null,
    },
  });
};
export const refreshTokenAPI = async (token: string | null) => {
  return await axiosInstance.post<TLoginResponse>("/security/refresh", {
    refreshToken: token,
  });
};
