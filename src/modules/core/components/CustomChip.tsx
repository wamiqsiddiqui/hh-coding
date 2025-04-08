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
      className={`flex justify-center py-2 px-4 w-max rounded-full ${
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
        } text-xl font-semibold`}
      >
        {text}
      </p>
    </span>
  );
};

export default CustomChip;
