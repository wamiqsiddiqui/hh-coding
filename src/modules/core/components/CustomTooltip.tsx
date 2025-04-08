import IconButton from "./IconButton";
import info from "../../../assets/icons/info.png";

export const CustomToolTipBox = ({
  tooltip,
  tooltipDirection = "top",
  top = "-top-10",
}: CustomTooltipBoxProps) => {
  return (
    <div
      className={`absolute z-[1000000] group-hover:block hidden ${
        tooltipDirection === "top"
          ? top
          : tooltipDirection === "left"
          ? "right-20"
          : tooltipDirection === "bottom"
          ? "-bottom-24 max-lg:-bottom-20"
          : "left-52"
      } bg-grayShades-bgTooltip py-2 px-3 rounded-lg`}
    >
      <p className="text-white text-sm font-medium">{tooltip}</p>
    </div>
  );
};
export type CustomTooltipBoxProps = {
  tooltip: string;
  tooltipDirection?: "top" | "right" | "left" | "bottom";
  top?: "-top-10" | "-top-20" | "-top-14" | "-top-16" | "-top-12";
};
const CustomTooltip = ({ ...rest }: CustomTooltipBoxProps) => {
  return (
    <div className="flex group mb-2">
      <IconButton icon={info} onClick={() => {}} />
      <CustomToolTipBox {...rest} />
    </div>
  );
};

export default CustomTooltip;
