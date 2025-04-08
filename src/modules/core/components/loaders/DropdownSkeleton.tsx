const DropdownSkeleton = () => {
  return (
    <>
      <div className="z-[100000] animate-pulse bg-grayShades-borderLightGray my-2 mx-4 h-8 w-48 text-transparent"></div>
      <div className="z-[100000] animate-pulse bg-grayShades-borderLightGray my-2 mx-4 h-8 w-56 text-transparent"></div>
      <div className="z-[100000] animate-pulse bg-grayShades-borderLightGray my-2 mx-4 h-8 w-60 text-transparent"></div>
    </>
  );
};

export default DropdownSkeleton;
