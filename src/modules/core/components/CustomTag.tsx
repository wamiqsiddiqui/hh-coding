import { IoIosCloseCircle } from "../../../utils/icons";

type TagProps = {
  tagName: string;
  onCloseClick: () => void;
};
const Tag = ({ onCloseClick, tagName }: TagProps) => {
  return (
    <div className="mr-2 flex justify-center items-center h-10 overflow-clip py-1 mb-2 px-2 w-max  bg-badge-green border-custom-green border-[1px] rounded-lg">
      <p className="text-custom-green text-sm font-medium mr-2">{tagName}</p>
      <IoIosCloseCircle
        onClick={onCloseClick}
        className="h-5 w-5 cursor-pointer text-custom-green"
      />
    </div>
  );
};

export default Tag;
