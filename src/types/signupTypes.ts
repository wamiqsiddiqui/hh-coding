import { FileWithPath } from "react-dropzone";

export type BusinessCategoriesListingType = {
  data: {
    labelEn: string;
    labelAr: string;
    value: string;
  }[];
};

export type SignupRequestType = {
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
  businessLicenseDoc: File;
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
  address: string;
};
export type SignupFormType = {
  emailAddress: string;
  password: string;
  phoneNo: string;
  businessNameEn: string;
  businessCategory: string;
  managerName: string;
  address: string;
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
  businessNameAr: string;
  tiktokLink: string;
  confirmPassword?: string;
};
export enum SignupFieldNames {
  emailAddress = "emailAddress",
  password = "password",
  phoneNo = "phoneNo",
  businessNameEn = "businessNameEn",
  businessCategory = "businessCategory",
  managerName = "managerName",
  address = "address",
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
  businessNameAr = "businessNameAr",
  tiktokLink = "tiktokLink",
  confirmPassword = "confirmPassword",
}
