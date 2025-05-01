import { useState } from "react";
import {
  useGetUnapprovedServiceProviders,
  usePostApproveServiceProvider,
} from "../../../../../api/serviceProvider/reactQueryHooks";
import { SortOrder, SortType } from "../../../../../types/generalTypes";
import { useSuccessError } from "../../../../../utils/hooks";

export const useApproveServiceProvider = () => {
  const {
    mutate: approveServiceProvider,
    error,
    isError,
    isSuccess,
    isPending,
  } = usePostApproveServiceProvider();
  useSuccessError({
    error: error,
    isError: isError,
    isSuccess: isSuccess,
    successMessage: "Service Provider has been approved!",
  });
  return { approveServiceProvider, isPending };
};
export const useUnapprovedServiceProviderListing = () => {
  const [isApproveConfirmModalOpen, setApproveConfirmModalOpen] =
    useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortData, setSortData] = useState<SortType | null>({
    field: "firstName",
    order: SortOrder.Ascending,
  });
  const [page, setPage] = useState(1);
  const {
    data: unapprovedServiceProvidersData,
    isLoading: isUnapprovedServiceProvidersLoading,
  } = useGetUnapprovedServiceProviders({
    pageNumber: page,
    // searchBy,
    // searchText:
    //   selectedJoiningDate !== "NaN-NaN-NaN" && selectedJoiningDate !== null
    //     ? convertFormattedDateToISODate(selectedJoiningDate.toString())
    //     : searchText,
    sortData: sortData,
  });
  console.log("data = ", unapprovedServiceProvidersData);
  const total = unapprovedServiceProvidersData?.data.pagination.totalCount ?? 0;
  //   const navigate = useNavigate();
  //   const [selectedIndex, setSelectedIndex] = useState(0);
  //   useEffect(() => {
  //     setSearch("");
  //   }, [selectedIndex, setSelectedIndex]);
  //   const [receivedPage, setReceivedPage] = useState(1);
  //   const [search, setSearch] = useState("");
  //   const {
  //     data: submittedDisputeListingData,
  //     isLoading: isSubmittedDisputeLoading,
  //   } = useViewDisputes({
  //     isSubmittedDispute: true,
  //     page: submittedPage,
  //     search,
  //   });
  //   const {
  //     data: receivedDisputeListingData,
  //     isLoading: isReceivedDisputeLoading,
  //   } = useViewDisputes({
  //     isSubmittedDispute: false,
  //     page: receivedPage,
  //     search,
  //   });
  //   const [sortData, setSortData] = useState<SortType | null>(null);
  //   const submittedTotal = submittedDisputeListingData?.total ?? 0;
  //   const receivedTotal = receivedDisputeListingData?.total ?? 0;
  //   const submittedDisputes = submittedDisputeListingData?.rows
  //     ? submittedDisputeListingData.rows
  //     : [];
  //   const receivedDisputes = receivedDisputeListingData?.rows
  //     ? receivedDisputeListingData.rows
  //     : [];
  //   return {
  //     selectedIndex,
  //     setSelectedIndex,
  //     submittedPage,
  //     setSubmittedPage,
  //     receivedPage,
  //     setReceivedPage,
  //     search,
  //     setSearch,
  //     submittedDisputes,
  //     receivedDisputes,
  //     submittedTotal,
  //     receivedTotal,
  //     setSortData,
  //     sortData,
  //     navigate,
  //     isReceivedDisputeLoading,
  //     isSubmittedDisputeLoading,
  //     isAllowedCreate,
  //   };
  const unapprovedServiceProviders = unapprovedServiceProvidersData?.data
    ? unapprovedServiceProvidersData.data.rows
    : [];
  return {
    unapprovedServiceProviders,
    isUnapprovedServiceProvidersLoading,
    page,
    setPage,
    total,
    sortData,
    setSortData,
    isApproveConfirmModalOpen,
    setApproveConfirmModalOpen,
    selectedId,
    setSelectedId,
  };
};
