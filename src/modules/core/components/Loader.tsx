type LoaderProps = {
  size?: "size-40" | "size-10" | "size-9" | "size-24" | "size-28" | "size-20";
  topBorder?: "border-t-[5px]" | "border-t-[3px]";
  rightBorder?: "border-r-[3px]" | "border-r-[2px]" | "border-r-[1px]";
  className?: string;
};
export const LoaderCircle = ({
  size = "size-40",
  topBorder = "border-t-[5px]",
  rightBorder = "border-r-[3px]",
}: LoaderProps) => (
  <div
    className={`rounded-[50%] ${size} ml-2 bg-transparent border-transparent ${topBorder} ${rightBorder} border-r-custom-green border-t-custom-green animate-spin`}
  />
);
const Loader = ({ className, ...rest }: LoaderProps) => {
  return (
    <div
      className={`h-screen w-[100%] z-[1000000000000] top-0 bottom-0 left-0 right-0 bg-grayShades-datagrid bg-opacity-20 fixed flex justify-center items-center ${className}`}
    >
      <LoaderCircle {...rest} />
    </div>
  );
};

export default Loader;
