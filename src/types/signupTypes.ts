import { FileWithPath } from "react-dropzone";
import { attributesType } from "./generalTypes";

export type BusinessCategoriesListingType = {
  data: {
    label: string;
    value: string;
  }[];
};

export type SignupRequestType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
  companyName: string;
  type: "merchant" | "seller" | string;
  attributes: { company: attributesType }; //SignupAttributesType
};

export type SignupFormType = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword?: string;
  phoneNo: string;
  businessNameEng: string;
  businessNameAr: string;
  businessCategory: string;
  ownerName: string;
  contactNo: string;
  location: {
    coordinates: number;
  }[];
  businessLicenseDoc: { fileWithPath: FileWithPath; src: string } | null;
  isAgreedOnTerms: boolean;
  securityQuestion: string;
  securityQuestionAns: string;
  commercialRegNo: string;
  taxId: string;
  bankAccountNo: string;
  boxOrBuilding: string;
  facebookLink: string;
  instagramLink: string;
  websiteLink: string;
  tiktokLink: string;
};
export type SignupAttributesType = {
  crNumber: string;
  companySize: string;
  companyLegalName: string;
  investedCapital: number | null;
  investedCapitalUnit: string;
  crDocument: { fileWithPath: FileWithPath; src: string } | null;
  licenseDocument: { fileWithPath: FileWithPath; src: string } | null;
};
export enum SignupFieldNames {
  firstName = "firstName",
  lastName = "lastName",
  emailAddress = "emailAddress",
  password = "password",
  confirmPassword = "confirmPassword",
  phoneNo = "phoneNo",
  businessNameEng = "businessNameEng",
  businessNameAr = "businessNameAr",
  businessCategory = "businessCategory",
  ownerName = "ownerName",
  contactNo = "contactNo",
  location = "location",
  businessLicenseDoc = "businessLicenseDoc",
  isAgreedOnTerms = "isAgreedOnTerms",
  securityQuestion = "securityQuestion",
  securityQuestionAns = "securityQuestionAns",
  commercialRegNo = "commercialRegNo",
  taxId = "taxId",
  bankAccountNo = "bankAccountNo",
  boxOrBuilding = "boxOrBuilding",
  facebookLink = "facebookLink",
  instagramLink = "instagramLink",
  websiteLink = "websiteLink",
  tiktokLink = "tiktokLink",
}
