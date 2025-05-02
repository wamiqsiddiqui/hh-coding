import { usePendingApprovedRejectedServiceProviderListing } from "../../logic/hooks";
import Datagrid from "../../../../../core/components/Datagrid";
import { useTranslation } from "react-i18next";
import CustomPaginationBox from "../../../../../core/components/CustomPaginationBox";
import { getPagesLength } from "../../../../../../utils/helpers";
import { NoRecordsPage } from "../../../../../core/components/NoRecordsPage";
import {
  CheckCircleSvg,
  CloseIconSvg,
  SearchSvg,
  VisibilitySvg,
} from "../../../../../../utils/svgIcons";
import { PAGE_LIMIT } from "../../../../../../utils/apiHelpers";
import Loader from "../../../../../core/components/Loader";
import CustomInputField from "../../../../../core/components/CustomInputField";
import { Dispatch, SetStateAction } from "react";

type PendingServiceProviderListingProps = {
  setSelectedRow: Dispatch<
    SetStateAction<{
      id: string;
      status: "Approve" | "Reject";
    } | null>
  >;
  setApproveConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
};
const PendingServiceProviderListing = ({
  setSelectedRow,
  setApproveConfirmModalOpen,
  isPending,
}: PendingServiceProviderListingProps) => {
  const {
    serviceProviders,
    isServiceProvidersLoading,
    page,
    setPage,
    total,
    setSortData,
    sortData,
    setServiceProviderDetails,
  } = usePendingApprovedRejectedServiceProviderListing({
    hookListingType: "PENDING",
  });
  const { t } = useTranslation();
  return (
    <div className="flex flex-col px-1">
      {isPending && <Loader />}
      <div className="w-full flex justify-end">
        <CustomInputField
          placeholder={t("search")}
          onChange={() => {}}
          suffix={<SearchSvg />}
        />
      </div>
      {(serviceProviders && serviceProviders.length > 0) ||
      isServiceProvidersLoading ? (
        <>
          <Datagrid
            isLoading={isServiceProvidersLoading}
            setSortData={setSortData}
            sortData={sortData}
            columns={[
              {
                name: t("businessNameInEnglish"),
                sortKey: "creation",
                columnsSpan: true,
              },
              {
                name: t("businessNameInArabic"),
                sortKey: "job",
              },
              {
                name: t("managerName"),
                sortKey: "seller",
              },
              {
                name: t("businessCategory"),
                sortKey: "status",
              },
              {
                name: t("contactNumber"),
                sortKey: "status",
              },
              {
                name: t("actions"),
                sortKey: "status",
              },
            ]}
            rows={serviceProviders.map((serviceProvider) => {
              return {
                0: {
                  text: serviceProvider.businessNameEn,
                },
                1: {
                  text: serviceProvider.businessNameAr,
                },
                2: {
                  text: serviceProvider.managerName,
                },
                3: {
                  text: serviceProvider.businessCategory,
                },
                4: {
                  text: serviceProvider.phoneNo,
                },
                5: {
                  text: "",
                  icons: [
                    {
                      iconSrc: <VisibilitySvg />,
                      onIconClick: () =>
                        setServiceProviderDetails(serviceProvider),
                      noHover: true,
                    },
                    {
                      iconSrc: <CheckCircleSvg />,
                      onIconClick: () => {
                        setSelectedRow({
                          id: serviceProvider._id,
                          status: "Approve",
                        });
                        setApproveConfirmModalOpen(true);
                      },
                      noHover: true,
                    },
                    {
                      iconSrc: <CloseIconSvg />,
                      onIconClick: () => {
                        setSelectedRow({
                          id: serviceProvider._id,
                          status: "Reject",
                        });
                        setApproveConfirmModalOpen(true);
                      },
                      noHover: true,
                    },
                  ],
                  displayType: "actions",
                },
              };
            })}
          />
          <CustomPaginationBox
            rowsLength={getPagesLength(total, PAGE_LIMIT)}
            selectedCount={page}
            setSelectedCount={setPage}
          />
        </>
      ) : (
        <NoRecordsPage
          title={t("noServiceProvidersLeftToApprove")}
          text=""
          height="h-[calc(100vh-32vh)]"
        />
      )}
    </div>
  );
};

export default PendingServiceProviderListing;
