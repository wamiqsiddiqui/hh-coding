import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_ROUTES, POST_ROUTES } from "./routes";
import {
  getUnapprovedServiceProviders,
  postApproveServiceProvider,
} from "./requests";
import { ListingRequestCommonProps } from "../../types/generalTypes";
import {
  AccountApprovalStatusType,
  isApprovedType,
} from "../../types/serviceProviderTypes";

export const useGetUnapprovedServiceProviders = ({
  pageNumber,
  searchBy,
  searchText,
  sortData,
  isApproved,
  accountApprovalStatus,
}: ListingRequestCommonProps & {
  isApproved: isApprovedType;
  accountApprovalStatus: AccountApprovalStatusType;
}) => {
  return useQuery({
    queryKey: [
      GET_ROUTES.getUnapprovedServiceProviders,
      accountApprovalStatus,
      isApproved,
      pageNumber,
      searchText,
    ],
    queryFn: () =>
      getUnapprovedServiceProviders({
        pageNumber,
        searchBy,
        searchText,
        sortData,
        isApproved,
        accountApprovalStatus,
      }),
  });
};

export const usePostApproveServiceProvider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [POST_ROUTES.approveServiceProvider],
    mutationFn: ({
      serviceProviderId,
      isApproved,
    }: {
      serviceProviderId: string;
      isApproved: boolean;
    }) =>
      postApproveServiceProvider({
        serviceProviderId,
        isApproved,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          GET_ROUTES.getUnapprovedServiceProviders,
          "PENDING",
          "false",
        ],
      });
    },
  });
};
