import axiosInstance from "../../services/axiosInstance";
import {
  GetListingResponse,
  ListingRequestCommonProps,
} from "../../types/generalTypes";
import {
  AccountApprovalStatusType,
  GetServiceProviderListingResponseType,
  isApprovedType,
} from "../../types/serviceProviderTypes";
import { getListingParams } from "../../utils/apiHelpers";
import { GET_ROUTES, POST_ROUTES } from "./routes";

export const getUnapprovedServiceProviders = async ({
  pageNumber,
  searchBy,
  searchText,
  sortData,
  accountApprovalStatus,
  isApproved,
}: ListingRequestCommonProps & {
  isApproved: isApprovedType;
  accountApprovalStatus: AccountApprovalStatusType;
}) => {
  return await axiosInstance.get<
    GetListingResponse<GetServiceProviderListingResponseType>
  >(
    GET_ROUTES.getUnapprovedServiceProviders,
    getListingParams({
      pageNumber,
      searchBy,
      searchText,
      sortData,
      customParamKey: "isApproved",
      customParamValue: isApproved,
      secondaryCustomParamKey: "accountApprovalStatus",
      secondaryCustomParamValue: accountApprovalStatus,
    })
  );
};

export const postApproveServiceProvider = async ({
  serviceProviderId,
  isApproved,
}: {
  serviceProviderId: string;
  isApproved: boolean;
}) => {
  return await axiosInstance.post(POST_ROUTES.approveServiceProvider, {
    serviceProviderId,
    isApproved,
  });
};
