import {
  useApproveServiceProvider,
  useUnapprovedServiceProviderListing,
} from "../logic/hooks";
import Datagrid from "../../../../core/components/Datagrid";
import { useTranslation } from "react-i18next";
import CustomPaginationBox from "../../../../core/components/CustomPaginationBox";
import { getPagesLength } from "../../../../../utils/helpers";
import { NoRecordsPage } from "../../../../core/components/NoRecordsPage";
import {
  CheckCircleSvg,
  CloseIconSvg,
  SearchSvg,
  VisibilitySvg,
} from "../../../../../utils/svgIcons";
import { PAGE_LIMIT } from "../../../../../utils/apiHelpers";
import { CustomModalVSecondary } from "../../../../core/components/CustomModal";
import CancelConfirmationModal from "../../../../core/components/CancelConfirmationModal";
import Loader from "../../../../core/components/Loader";
import CustomInputField from "../../../../core/components/CustomInputField";

const UnapprovedServiceProviderListing = () => {
  const {
    unapprovedServiceProviders,
    isUnapprovedServiceProvidersLoading,
    page,
    setPage,
    total,
    setSortData,
    sortData,
    isApproveConfirmModalOpen,
    setApproveConfirmModalOpen,
    selectedId,
    setSelectedId,
  } = useUnapprovedServiceProviderListing();
  const { approveServiceProvider, isPending } = useApproveServiceProvider();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      {isPending && <Loader />}
      <div className="w-full flex justify-end">
        <CustomInputField
          placeholder={t("search")}
          onChange={() => {}}
          suffix={<SearchSvg />}
        />
      </div>
      {(unapprovedServiceProviders && unapprovedServiceProviders.length > 0) ||
      isUnapprovedServiceProvidersLoading ? (
        <>
          <Datagrid
            isLoading={isUnapprovedServiceProvidersLoading}
            setSortData={setSortData}
            sortData={sortData}
            columns={[
              {
                name: t("businessNameInEnglish"),
                bgColor: "bg-grayShades-datagridHeaderGray",
                sortKey: "creation",
                columnsSpan: true,
              },
              {
                name: t("businessNameInArabic"),
                bgColor: "bg-grayShades-datagridHeaderGray",
                sortKey: "job",
              },
              {
                name: t("managerName"),
                bgColor: "bg-grayShades-datagridHeaderGray",
                sortKey: "seller",
              },
              {
                name: t("businessCategory"),
                bgColor: "bg-grayShades-datagridHeaderGray",
                sortKey: "status",
              },
              {
                name: t("contactNumber"),
                bgColor: "bg-grayShades-datagridHeaderGray",
                sortKey: "status",
              },
              {
                name: t("actions"),
                bgColor: "bg-grayShades-datagridHeaderGray",
                sortKey: "status",
              },
            ]}
            rows={unapprovedServiceProviders.map(
              (unapprovedServiceProvider) => {
                return {
                  0: {
                    text: unapprovedServiceProvider.businessNameEn,
                  },
                  1: {
                    text: unapprovedServiceProvider.businessNameAr,
                  },
                  2: {
                    text: unapprovedServiceProvider.managerName,
                  },
                  3: {
                    text: unapprovedServiceProvider.businessCategory,
                  },
                  4: {
                    text: unapprovedServiceProvider.phoneNo,
                  },
                  5: {
                    text: "",
                    icons: [
                      {
                        iconSrc: <VisibilitySvg />,
                        onIconClick: () => {},
                        noHover: true,
                      },
                      {
                        iconSrc: <CheckCircleSvg />,
                        onIconClick: () => {
                          setSelectedId(unapprovedServiceProvider._id);
                          setApproveConfirmModalOpen(true);
                        },
                        noHover: true,
                      },
                      {
                        iconSrc: <CloseIconSvg />,
                        onIconClick: () => {},
                        noHover: true,
                      },
                    ],
                    displayType: "actions",
                  },
                };
              }
            )}
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
      {isApproveConfirmModalOpen && (
        <CustomModalVSecondary
          withOutcoreHeading
          className="w-[562px] shadow-modal flex flex-col justify-between items-center bg-white rounded-2xl h-fit max-sm:h-[728px]"
          setOpen={setApproveConfirmModalOpen}
        >
          <CancelConfirmationModal
            text={t("areYouSureYouWantToApproveThisUser")}
            description={t("thisActionCannotBeUndone")}
            cancel={() => setApproveConfirmModalOpen(false)}
            proceed={() => {
              if (selectedId) {
                approveServiceProvider({
                  isApproved: true,
                  serviceProviderId: selectedId,
                });
              }
              setApproveConfirmModalOpen(false);
            }}
          />
        </CustomModalVSecondary>
      )}
    </div>
  );
};

export default UnapprovedServiceProviderListing;
