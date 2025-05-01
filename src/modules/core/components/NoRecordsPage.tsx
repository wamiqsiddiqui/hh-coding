import { useNavigate } from "react-router-dom";
import { IoBulbSharp } from "../../../utils/icons";
import CustomButton from "./CustomButton";

type NoRecordsPageProps = {
  title: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  contentClassName?: string;
  height?:
    | "h-[calc(100vh-15vh)]"
    | "h-[calc(100vh-32vh)]"
    | "h-[calc(100vh-44vh)]";
};

export const NoRecordsPage = ({
  title,
  text,
  buttonText,
  buttonLink,
  height = "h-[calc(100vh-32vh)]",
  contentClassName,
  onButtonClick,
}: NoRecordsPageProps) => {
  if (
    (buttonLink && onButtonClick) ||
    (!buttonLink && !onButtonClick && buttonText)
  ) {
    throw new Error("Pass either buttonLink OR onButtonClick");
  }
  const navigate = useNavigate();
  return (
    <div className={`relative ${height}`}>
      {/* <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${noOfferingBg})` }}
      ></div> */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className={`flex flex-col items-center justify-center ${contentClassName}`}
        >
          {!text && (
            <IoBulbSharp className="text-grayShades-dottedGray w-20 h-20" />
          )}
          <h1
            className={`text-3xl font-bold text-center ${
              !text && "text-grayShades-dottedGray"
            } mt-2`}
          >
            {title}
          </h1>
          {text && (
            <p className="text-2xl text-center font-normal mb-8 text-secondary-green">
              {text}
            </p>
          )}
          {(buttonLink || onButtonClick) && buttonText && (
            <CustomButton
              text={buttonText}
              onClick={
                onButtonClick
                  ? onButtonClick
                  : buttonLink
                  ? () => navigate(buttonLink)
                  : undefined
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
