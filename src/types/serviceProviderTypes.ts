import { RoleEnum } from "./generalTypes";

export type AccountApprovalStatusType = "APPROVED" | "PENDING" | "REJECTED";
export type ServiceProviderListingType = "REGISTERED" | "PENDING" | "REJECTED";
export type isApprovedType = "true" | "false";
export type GetServiceProviderListingResponseType =
  GetServiceProviderResponseType[];
export type GetServiceProviderResponseType = {
  location: {
    coordinates: number[];
    type: string;
  };
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  emailAddress: string;
  phoneNo: string;
  role: RoleEnum;
  accountApprovalStatus: ServiceProviderListingType;
  profileImage:
    | {
        _id: string;
        fileName: string;
        fileType: "image/png";
        fileSize: number;
        fileUrl: string; //"https://happyhourbucket21.s3.amazonaws.com/profile-images/491bf5ec-6ef3-43da-a4cb-16dc4a025ae7.png";
        fileKey: string;
        uploadedBy: string;
        uploadedAt: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      }
    | string
    | null;
  isActive: boolean;
  fcmToken: string;
  businessNameEn: string;
  businessNameAr: string;
  businessCategory: string;
  managerName: string;
  address: string;
  facebookLink: string;
  tikTokLink: string;
  instagramLink: string;
  websiteLink: string;
  boxOrBuilding: string;
  commercialRegNo: string;
  taxId: string;
  bankAccountNo: string;
  securityQuestion: string;
  securityQuestionAns: string;
  isAgreedOnTerms: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  businessCoverImg: null;
  businessDescEn: "";
  businessDescAr: "";
  businessTimings: [];
  businessLicenseDoc: {
    _id: string;
    fileName: string;
    fileType: "application/pdf";
    fileSize: number;
    fileUrl: string; //"https://happyhourbucket21.s3.amazonaws.com/legal-docs/c2ed75a7-ee76-485c-a043-8ea4408788dd.pdf";
    fileKey: string; //"legal-docs/c2ed75a7-ee76-485c-a043-8ea4408788dd.pdf";
    uploadedBy: string | null;
    uploadedAt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  } | null;
};
