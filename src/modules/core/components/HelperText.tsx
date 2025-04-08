import { MarginBottomType, MarginTopType } from "../../../types/generalTypes";

const HelperText = ({
  helperText,
  mt = "mt-1",
  mb = "mb-0",
}: {
  helperText: string;
  mt?: MarginTopType;
  mb?: MarginBottomType;
}) => {
  return (
    <p className={`text-error text-start text-xs ${mt} ${mb} `}>{helperText}</p>
  );
};

export default HelperText;
