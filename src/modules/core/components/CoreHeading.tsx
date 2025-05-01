import { IoArrowBackSharp } from "react-icons/io5";
import IconButton from "./IconButton";

type CoreHeadingProps = {
  onBackButtonClick?: () => void;
  heading: string;
  description?: string;
  topRightButton?: React.ReactNode;
  isResponsive?: boolean;
  extraChild?: React.ReactNode;
};
const CoreHeading = ({
  onBackButtonClick,
  description,
  heading,
  topRightButton,
  isResponsive,
  extraChild,
}: CoreHeadingProps) => {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex max-sm:flex-col justify-between max-sm:justify-start items-start max-sm:gap-4 w-full">
        <div className="flex justify-start w-full">
          {onBackButtonClick && (
            <IconButton
              icon={<IoArrowBackSharp />}
              onClick={onBackButtonClick}
            />
          )}
          <p
            className={`${
              onBackButtonClick && "ml-4"
            } text-start text-3xl font-semibold text-grayShades-customGray`}
          >
            {heading}
          </p>
        </div>
        {
          <div className={`${isResponsive && "max-sm:hidden"}`}>
            {topRightButton}
          </div>
        }
      </div>
      {description && (
        <p
          className={`${
            onBackButtonClick ? "ml-14" : "mt-1"
          } text-lg text-start text-grayShades-customGray max-sm:mt-4`}
        >
          {description}
        </p>
      )}
      {isResponsive && (
        <div className="hidden max-sm:flex w-full">{topRightButton}</div>
      )}
      {extraChild}
      <div className="bg-custom-green relative transition-all duration-500 ease-out h-[2px] mt-4 w-full rounded-full mb-5" />
    </div>
  );
};

export default CoreHeading;
