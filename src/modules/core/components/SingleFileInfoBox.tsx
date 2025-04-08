import deleteIcon from "../../../assets/icons/delete.png";
import { FileInfoProps } from "../../../types/generalTypes";
import {
  convertByteToMB,
  //   handleDownload,
  truncateText,
} from "../../../utils/helpers";
import IconButton from "./IconButton";
// import { downloadDocumentById } from "../../../api/media/requests";
import { FaCloudDownloadAlt } from "../../../utils/icons";
// import CustomImage from "./CustomImage";

export type SingleFileInfoBoxProps = {
  file: FileInfoProps;
  allowDownload?: boolean;
  noTooltip?: boolean;
  notDeletable?: boolean;
};
const SingleFileInfoBox = ({
  file,
  allowDownload,
  noTooltip,
  notDeletable,
}: SingleFileInfoBoxProps) => {
  const hasDownloadIcon = () =>
    allowDownload &&
    ((file.fileId && file.fileId.length > 0) ||
      file.fileWithPath !== undefined);
  return (
    <div className="flex w-full items-center px-2 mb-2 rounded-lg border-grayShades-bgTooltip border-[1px]">
      <div className="flex max-sm:flex-col flex-[3] items-center">
        {/* <CustomImage
          variant="small"
          noShadow
          my="my-1"
          mx="mx-3"
          imageId={file.fileId ?? undefined}
          src={!file.fileId ? file.src : undefined}
        /> */}
        <p className="text-filename text-sm font-medium">
          {truncateText(file.filename, 25)}
        </p>
        <p className="text-filename text-sm font-normal sm:hidden">
          {convertByteToMB(Number(file.size))} MB
        </p>
      </div>
      <div className="flex items-center">
        <p className="text-filename text-sm font-normal max-sm:hidden">
          {convertByteToMB(Number(file.size))} MB
        </p>
        <div className="flex items-center ml-2 mr-1 max-sm:flex-col">
          {hasDownloadIcon() && (
            <IconButton
              tooltipDirection={noTooltip ? undefined : "top"}
              tooltip={noTooltip ? undefined : "Download this file"}
              //   onClick={() =>
              //     file.fileId
              //       ? downloadDocumentById(file.fileId!, file.filename)
              //       : handleDownload(file.fileWithPath!)
              //   }
              icon={<FaCloudDownloadAlt />}
            />
          )}
          {file.onDeleteClick && !notDeletable && (
            <IconButton
              mr="mr-2"
              ml={hasDownloadIcon() ? "ml-0" : "ml-4"}
              icon={deleteIcon}
              onClick={file.onDeleteClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleFileInfoBox;
