import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_ROUTES, POST_ROUTES } from "./routes";
import {
  getUnapprovedServiceProviders,
  postApproveServiceProvider,
} from "./requests";
import { ListingRequestCommonProps } from "../../types/generalTypes";

export const useGetUnapprovedServiceProviders = ({
  pageNumber,
  searchBy,
  searchText,
  sortData,
}: ListingRequestCommonProps) => {
  return useQuery({
    queryKey: [
      GET_ROUTES.getUnapprovedServiceProviders,
      pageNumber,
      searchText,
      sortData?.field,
      sortData?.order,
    ],
    queryFn: () =>
      getUnapprovedServiceProviders({
        pageNumber,
        searchBy,
        searchText,
        sortData,
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
        queryKey: [GET_ROUTES.getUnapprovedServiceProviders],
      });
    },
  });
};
