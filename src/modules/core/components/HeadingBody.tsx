type HeadingBodyProps = {
  heading: string;
  body: string;
};
const HeadingBody = ({ heading, body }: HeadingBodyProps) => {
  return (
    <div className="flex flex-1 flex-col gap-y-2 items-start">
      <p className="text-lg text-hhGrayShades-label">{heading}</p>
      <p className="text-base font-medium text-text-black">
        {body.length > 0 ? body : "-"}
      </p>
    </div>
  );
};

export default HeadingBody;
