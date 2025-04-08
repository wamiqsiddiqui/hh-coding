import { FaCheck } from "../../../utils/icons";

type RadioCircleProps = {
  onClick: () => void;
  isSelected: boolean;
  checkedCircle?: boolean;
  outHeight?: string;
  outWidth?: string;
  inWidth?: string;
  inHeight?: string;
  noGap?: boolean;
};
const RadioCircle = ({
  isSelected,
  onClick,
  outHeight,
  outWidth,
  inHeight,
  inWidth,
  checkedCircle,
}: RadioCircleProps) => {
  return (
    <div
      onClick={onClick}
      className={` cursor-pointer relative flex items-center justify-center ${
        outHeight ?? "h-6"
      } ${outWidth ?? "w-6"} rounded-full ${
        isSelected
          ? checkedCircle
            ? ""
            : "bg-custom-green hover:bg-dark-green"
          : "bg-white hover:border-grayShades-datagrid border-grayShades-borderGray border-[1px]"
      }`}
    >
      {isSelected && checkedCircle ? (
        <div
          className={`border-custom-green border-[1px] rounded-full ${
            outWidth ?? "w-6"
          } ${outHeight ?? "h-6"} flex justify-center items-center`}
        >
          <div
            className={`bg-custom-green rounded-full ${inWidth ?? "w-4"} ${
              inHeight ?? "h-4"
            } flex-shrink-0`}
          />
        </div>
      ) : (
        <FaCheck className="text-white text-sm hover:text-custom-white" />
      )}
    </div>
  );
};

export const CustomRadioButton = ({
  text,
  noGap,
  ...rest
}: RadioCircleProps & { text: string }) => {
  return (
    <div className={`flex ${!noGap && "gap-x-2"}`}>
      <RadioCircle {...rest} />
      <p className="text-lg text-text-black">{text}</p>
    </div>
  );
};
