import { ChipColorVariant } from "../../../types/generalTypes";

type ChipProps = {
  text: string;
  chipColorVariant?: ChipColorVariant;
};
const CustomChip = ({ text, chipColorVariant = "green" }: ChipProps) => {
  if (!text) {
    return <span />;
  }
  return (
    <span
      className={`flex justify-center py-1 px-2 w-max border-[1px] rounded-lg ${
        chipColorVariant === "green"
          ? "bg-secondary-green"
          : chipColorVariant === "blue"
          ? "bg-chipBgBlue border-chipBorderBlue"
          : chipColorVariant === "gold"
          ? "border-custom-yellow bg-custom-yellow"
          : "bg-grayShades-borderLightGray"
      }`}
    >
      <p
        className={`${
          chipColorVariant === "green"
            ? "text-custom-green"
            : chipColorVariant === "blue"
            ? "text-chipTextBlue"
            : chipColorVariant === "gold"
            ? "text-main-bg-white"
            : "text-text-black"
        } text-sm font-medium`}
      >
        {text}
      </p>
    </span>
  );
};

export default CustomChip;
