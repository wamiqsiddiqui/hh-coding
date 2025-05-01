import { Dispatch, SetStateAction } from "react";
import CoreHeading from "./CoreHeading";
import DetectOutsideClickWrapper from "./DetectOutsideClickWrapper";
import IconButton from "./IconButton";
import { IoIosCloseCircle } from "../../../utils/icons";

type CustomModalProps = {
  children: React.ReactNode;
  className: string;
  disallowOutsideClick?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>> | (() => void);
};
const CustomModal = ({
  children,
  setOpen,
  className,
  disallowOutsideClick,
}: CustomModalProps) => {
  return (
    <div
      className={`h-screen w-full p-5 z-50 top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 fixed flex justify-center items-center`}
    >
      <DetectOutsideClickWrapper
        className={className}
        disallowOutsideClick={disallowOutsideClick}
        onClick={() => setOpen(false)}
      >
        {children}
      </DetectOutsideClickWrapper>
    </div>
  );
};

export default CustomModal;

export type CustomModalPropsSecondary = CustomModalProps & {
  title?: string;
  description?: string;
  withOutcoreHeading?: boolean;
};
export const CustomModalVSecondary = ({
  children,
  title,
  description,
  setOpen,
  className,
  disallowOutsideClick,
  withOutcoreHeading = false,
}: CustomModalPropsSecondary) => {
  const customCSS = `${className} p-5 max-w-7xl max-h-fit`;
  return (
    <div
      className={`h-screen w-full p-5 z-50 top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 fixed flex justify-center items-center`}
    >
      <DetectOutsideClickWrapper
        className={customCSS}
        disallowOutsideClick={disallowOutsideClick}
        onClick={() => setOpen(false)}
      >
        {!withOutcoreHeading && (
          <CoreHeading
            heading={title!}
            description={description}
            topRightButton={
              <IconButton
                onClick={() => setOpen(false)}
                icon={<IoIosCloseCircle className="text-xl" />}
              />
            }
          />
        )}
        {children}
      </DetectOutsideClickWrapper>
    </div>
  );
};
