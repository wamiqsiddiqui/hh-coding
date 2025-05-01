import { BiSolidError } from "react-icons/bi";
import { CancelConfirmationModalType } from "../../../types/generalTypes";
import CustomButton from "./CustomButton";

const CancelConfirmationModal = ({
  text = "Are you sure?",
  description,
  errorIcon = false,
  cancel,
  proceed,
  alternateImageSrc,
  proceedButtonText = "Confirm",
  cancelButtonText = "Cancel",
  proceedButtonColor = "green",
  confirmDisabled = false,
}: CancelConfirmationModalType) => {
  return (
    <div className="w-full h-full relative px-1 flex flex-col items-center bg-white justify-start rounded-2xl">
      <>
        {alternateImageSrc ? (
          <img alt="Confirm" src={alternateImageSrc} height={390} width={350} />
        ) : (
          errorIcon && (
            <div className="w-full justify-center flex mb-4">
              <BiSolidError className="text-6xl text-error" />
            </div>
          )
        )}
        <div className="mb-6 w-full flex flex-col items-center justify-center">
          <p className="text-3xl text-center text-text-black w-3/4 font-bold">
            {text}
          </p>
          <p className="text-lg font-medium mt-4 text-center w-3/4 text-hhGrayShades-textGray">
            {description}
          </p>
        </div>
        <div className="mt-3 flex w-full flex-col gap-3 items-center justify-center">
          <CustomButton
            width="w-full"
            disabled={confirmDisabled}
            variant={proceedButtonColor === "red" ? `error` : "primary"}
            onClick={proceed}
            text={proceedButtonText}
            size="medium"
          />
          <CustomButton
            width="w-full"
            variant="secondary"
            onClick={cancel}
            text={cancelButtonText}
            size="medium"
          />
        </div>
      </>
    </div>
  );
};

export default CancelConfirmationModal;
