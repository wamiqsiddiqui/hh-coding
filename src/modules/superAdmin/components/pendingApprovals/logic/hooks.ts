import { useEffect, useState } from "react";
import {
  useGetUnapprovedServiceProviders,
  usePostApproveServiceProvider,
} from "../../../../../api/serviceProvider/reactQueryHooks";
import { SortOrder, SortType } from "../../../../../types/generalTypes";
// import { useSuccessError } from "../../../../../utils/hooks";
import {
  GetServiceProviderResponseType,
  ServiceProviderListingType,
} from "../../../../../types/serviceProviderTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_ROUTES } from "../../../routes";

export const useApproveOrRejectServiceProvider = (
  successFunction?: () => void
) => {
  const [isApproveConfirmModalOpen, setApproveConfirmModalOpen] =
    useState(false);
  const [status, setStatus] = useState<"Approve" | "Reject" | null>();
  const {
    mutate: approveOrRejectServiceProvider,
    // error,
    // isError,
    isSuccess,
    isPending,
  } = usePostApproveServiceProvider();
  // useSuccessError({
  //   error: error,
  //   isError: isError,
  //   isSuccess: isSuccess,
  //   successMessage:
  //     status === "Approve"
  //       ? "serviceProviderHasBeenApproved"
  //       : "serviceProviderHasBeenRejected",
  //   successFunction: successFunction,
  // });
  useEffect(() => {
    if (isSuccess) {
      successFunction && successFunction();
    }
  }, [isSuccess, successFunction]);
  return {
    approveOrRejectServiceProvider,
    isPending,
    status,
    setStatus,
    isApproveConfirmModalOpen,
    setApproveConfirmModalOpen,
  };
};

export const usePendingApprovedRejectedServiceProviderListing = ({
  hookListingType,
}: {
  hookListingType: ServiceProviderListingType;
}) => {
  const navigate = useNavigate();

  const [serviceProviderDetails, setServiceProviderDetails] =
    useState<GetServiceProviderResponseType | null>(null);
  const [sortData, setSortData] = useState<SortType | null>({
    field: "",
    order: SortOrder.Ascending,
  });
  const [page, setPage] = useState(1);
  const {
    data: serviceProvidersData,
    isLoading: isServiceProvidersLoading,
    refetch: refetchServiceProviders,
  } = useGetUnapprovedServiceProviders({
    pageNumber: page,
    sortData: sortData,
    isApproved:
      hookListingType === "PENDING" || hookListingType === "REJECTED"
        ? "false"
        : "true",
    accountApprovalStatus:
      hookListingType === "REGISTERED" ? "APPROVED" : hookListingType,
  });
  const total = serviceProvidersData?.data.pagination.totalCount ?? 0;
  const serviceProviders = serviceProvidersData?.data
    ? serviceProvidersData.data.rows
    : [];

  const { t } = useTranslation();
  useEffect(() => {
    if (serviceProviderDetails !== null) {
      navigate(ADMIN_ROUTES.view, { state: serviceProviderDetails });
    }
  }, [navigate, serviceProviderDetails]);
  return {
    t,
    serviceProviders,
    isServiceProvidersLoading,
    page,
    setPage,
    total,
    sortData,
    setSortData,
    setServiceProviderDetails,
    refetchServiceProviders,
  };
};

export const useViewServiceProviders = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const serviceProviderDetails: GetServiceProviderResponseType =
    location.state as GetServiceProviderResponseType;

  return {
    serviceProviderDetails,
    navigate,
    t,
  };
};
