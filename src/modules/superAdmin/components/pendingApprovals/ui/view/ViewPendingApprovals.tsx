import CustomButton from "../../../../../core/components/CustomButton";
import { ADMIN_ROUTES } from "../../../../routes";
import { BackArrow } from "../../../../../../utils/svgIcons";
import HeadingBody from "../../../../../core/components/HeadingBody";
import {
  useApproveOrRejectServiceProvider,
  useViewServiceProviders,
} from "../../logic/hooks";
import { CustomModalVSecondary } from "../../../../../core/components/CustomModal";
import CancelConfirmationModal from "../../../../../core/components/CancelConfirmationModal";
import Loader from "../../../../../core/components/Loader";
import { PARENT_ROUTES } from "../../../../../../parentRoutes";

const ViewPendingApprovals = () => {
  const { navigate, serviceProviderDetails, t } = useViewServiceProviders();
  const {
    approveOrRejectServiceProvider,
    isPending,
    isApproveConfirmModalOpen,
    setApproveConfirmModalOpen,
    setStatus,
    status,
  } = useApproveOrRejectServiceProvider(() => {
    navigate(PARENT_ROUTES.superAdmin + "/" + ADMIN_ROUTES.pendingApprovals);
  });
  return (
    <div className="flex flex-col mx-36">
      {isPending && <Loader />}
      <CustomButton
        variant="text"
        leftIcon={<BackArrow />}
        noHover
        noHoverScale
        text={t("backALL_CAPS")}
        textVariantFontWeight="font-bold"
        width="w-28"
        fontSize="extraLarge"
        onClick={() =>
          navigate(
            PARENT_ROUTES.superAdmin + "/" + ADMIN_ROUTES.pendingApprovals
          )
        }
      />
      <div className="bg-white rounded-2xl mt-4 p-9 flex flex-col w-full items-start">
        <p className="text-xl font-bold text-hhGrayShades-tabHeader">
          {t("businessInformationALL_CAPS")}
        </p>
        <div className="w-full mt-4 flex justify-between">
          <HeadingBody
            heading={t("businessNameInEnglish")}
            body={serviceProviderDetails.businessNameEn}
          />
          <HeadingBody
            heading={t("businessNameInArabic")}
            body={serviceProviderDetails.businessNameAr}
          />
        </div>
        <div className="w-full mt-4 flex justify-between">
          <HeadingBody
            heading={t("managerName")}
            body={serviceProviderDetails.managerName}
          />
          <HeadingBody
            heading={t("businessCategory")}
            body={serviceProviderDetails.businessCategory}
          />
        </div>
        <div className="w-full mt-4 flex justify-between">
          <HeadingBody
            heading={t("contactNumber")}
            body={serviceProviderDetails.phoneNo}
          />
          <HeadingBody
            heading={t("emailAddress")}
            body={serviceProviderDetails.emailAddress}
          />
        </div>
        <div className="w-full mt-4 flex justify-between">
          <HeadingBody
            heading={t("location")}
            body={serviceProviderDetails.address}
          />
          <HeadingBody
            heading={t("boxBuildingNumber")}
            body={serviceProviderDetails.boxOrBuilding}
          />
        </div>
        <div className="w-full mt-4 flex justify-between">
          <HeadingBody
            heading={t("websiteLink")}
            body={serviceProviderDetails.websiteLink}
          />
          <HeadingBody
            heading={t("facebookLink")}
            body={serviceProviderDetails.facebookLink}
          />
        </div>
        <div className="w-full mt-4 flex justify-between">
          <HeadingBody
            heading={t("instagramLink")}
            body={serviceProviderDetails.instagramLink}
          />
          <HeadingBody
            heading={t("tiktokLink")}
            body={serviceProviderDetails.tikTokLink}
          />
        </div>
        <p className="text-xl font-bold mt-4 text-hhGrayShades-tabHeader">
          {t("legalDetailsALL_CAPS")}
        </p>
        <div className="w-full mt-4 flex justify-between">
          <HeadingBody
            heading={t("commercialRegistrationNumber")}
            body={serviceProviderDetails.commercialRegNo}
          />
          <HeadingBody
            heading={t("taxIdNumber")}
            body={serviceProviderDetails.taxId}
          />
        </div>
        <div className="w-full mt-4 flex justify-between">
          <HeadingBody
            heading={t("businessLicenseDocument")}
            body={
              serviceProviderDetails.businessLicenseDoc
                ? serviceProviderDetails.businessLicenseDoc.fileName
                : "-"
            }
          />
          <HeadingBody
            heading={t("bankAccountNumber")}
            body={serviceProviderDetails.bankAccountNo}
          />
        </div>
        {serviceProviderDetails.accountApprovalStatus === "PENDING" && (
          <div className="flex w-full gap-x-4 mt-8 mb-4">
            <CustomButton
              text={"Reject"}
              width="w-full"
              onClick={() => {
                setApproveConfirmModalOpen(true);
                setStatus("Reject");
              }}
              variant="secondary"
            />
            <CustomButton
              text={"Approve"}
              width="w-full"
              onClick={() => {
                setApproveConfirmModalOpen(true);
                setStatus("Approve");
              }}
            />
          </div>
        )}
      </div>
      {isApproveConfirmModalOpen && status !== null && (
        <CustomModalVSecondary
          withOutcoreHeading
          className="w-[562px] shadow-modal flex flex-col justify-between items-center bg-white rounded-2xl h-fit max-sm:h-[728px]"
          setOpen={setApproveConfirmModalOpen}
        >
          <CancelConfirmationModal
            text={t(
              status === "Approve"
                ? "areYouSureYouWantToApproveThisUser"
                : "areYouSureYouWantToRejectThisUser"
            )}
            description={t("thisActionCannotBeUndone")}
            cancel={() => {
              setStatus(null);
              setApproveConfirmModalOpen(false);
            }}
            proceed={() => {
              if (status !== null) {
                approveOrRejectServiceProvider({
                  isApproved: status === "Approve",
                  serviceProviderId: serviceProviderDetails._id,
                });
              }
              setStatus(null);
              setApproveConfirmModalOpen(false);
            }}
          />
        </CustomModalVSecondary>
      )}
    </div>
  );
};

export default ViewPendingApprovals;
