import { useState } from "react";
import TabHeader from "../../../../../core/components/TabHeader";
import { TabParent } from "../../../../../core/components/TabParent";
import { useTranslation } from "react-i18next";
import PendingServiceProviderListing from "./PendingServiceProviderListing";
import RegisteredServiceProviderListing from "./RegisteredServiveProviderListing";
import RejectedServiceProviderListing from "./RejectedServiceProviderListing";
import { CustomModalVSecondary } from "../../../../../core/components/CustomModal";
import CancelConfirmationModal from "../../../../../core/components/CancelConfirmationModal";
import {
  useApproveOrRejectServiceProvider,
  // usePendingApprovedRejectedServiceProviderListing,
} from "../../logic/hooks";
import Loader from "../../../../../core/components/Loader";

const ServiceProviderListingLayout = () => {
  const { t } = useTranslation();
  const [selectedSection, setSelectedSection] = useState(0);
  const customCSS: React.CSSProperties = {
    overflowY: "auto",
    padding: "0px",
  };
  const [selectedRow, setSelectedRow] = useState<{
    id: string;
    status: "Approve" | "Reject";
  } | null>(null);
  // const { refetchServiceProviders } =
  //   usePendingApprovedRejectedServiceProviderListing({
  //     hookListingType: "PENDING",
  //   });
  const {
    approveOrRejectServiceProvider,
    isPending,
    isApproveConfirmModalOpen,
    setApproveConfirmModalOpen,
  } = useApproveOrRejectServiceProvider(() => {
    // refetchServiceProviders();
  });
  return (
    <div>
      {isPending && <Loader />}
      <div className="flex w-full justify-center gap-x-8 mb-4">
        <TabHeader
          headerText={t("registeredALL_CAPS")}
          onClick={() => setSelectedSection(0)}
          isSelected={selectedSection === 0}
        />
        <TabHeader
          headerText={t("pendingALL_CAPS")}
          onClick={() => setSelectedSection(1)}
          isSelected={selectedSection === 1}
        />
        <TabHeader
          headerText={t("rejectedALL_CAPS")}
          onClick={() => setSelectedSection(2)}
          isSelected={selectedSection === 2}
        />
      </div>
      <div className={`flex overflow-hidden`}>
        <TabParent
          index={0}
          fullHeight
          addStepsToDOM
          noTranslateX={false}
          noPadding
          disAllowHeightReduce
          selectedSection={selectedSection}
          customCSS={customCSS}
        >
          <RegisteredServiceProviderListing />
        </TabParent>
        <TabParent
          index={1}
          disAllowHeightReduce
          fullHeight
          addStepsToDOM
          noTranslateX={false}
          selectedSection={selectedSection}
          customCSS={customCSS}
        >
          <PendingServiceProviderListing
            setSelectedRow={setSelectedRow}
            setApproveConfirmModalOpen={setApproveConfirmModalOpen}
          />
        </TabParent>
        <TabParent
          index={2}
          fullHeight
          addStepsToDOM
          noTranslateX={false}
          disAllowHeightReduce
          selectedSection={selectedSection}
          customCSS={customCSS}
        >
          <RejectedServiceProviderListing />
        </TabParent>
      </div>
      {isApproveConfirmModalOpen && selectedRow !== null && (
        <CustomModalVSecondary
          withOutcoreHeading
          className="w-[562px] shadow-modal flex flex-col justify-between items-center bg-white rounded-2xl h-fit max-sm:h-[728px]"
          setOpen={setApproveConfirmModalOpen}
        >
          <CancelConfirmationModal
            text={t(
              selectedRow.status === "Approve"
                ? "areYouSureYouWantToApproveThisUser"
                : "areYouSureYouWantToRejectThisUser"
            )}
            description={t("thisActionCannotBeUndone")}
            cancel={() => setApproveConfirmModalOpen(false)}
            proceed={() => {
              if (selectedRow !== null) {
                approveOrRejectServiceProvider({
                  isApproved: selectedRow.status === "Approve",
                  serviceProviderId: selectedRow.id,
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

export default ServiceProviderListingLayout;
