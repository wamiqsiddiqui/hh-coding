const ComingSoon = ({ height }: { height?: string }) => {
  return (
    <div
      className={`${
        height ? height : "min-h-screen"
      }  bg-white text-custom-black flex flex-col items-center justify-center`}
    >
      <h1 className="text-5xl text-custom-green font-bold mb-8 animate-pulse">
        Coming Soon
      </h1>
      <p className="text-custom-black text-lg mb-8 font-semibold">
        {`We're working hard to bring you something amazing. Stay tuned!`}
      </p>
    </div>
  );
};

export default ComingSoon;
