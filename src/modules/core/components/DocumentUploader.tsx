import { useFormikContext } from "formik";
import { useCallback, useEffect, useState } from "react";
import {
  Accept,
  FileRejection,
  FileWithPath,
  useDropzone,
} from "react-dropzone";
import addImage from "../../../assets/icons/addImage.png";
import { ImageFileType } from "../../../types/generalTypes";
import { hasBothArrayFieldAndIndex } from "../../../utils/helpers";
import HelperText from "./HelperText";
import SingleFileInfoBox from "./SingleFileInfoBox";
import { UploadCloud } from "../../../utils/svgIcons";
import { useTranslation } from "react-i18next";
export type DocumentUploaderProps = {
  title: string;
  fieldName: string;
  arrayField?: string;
  index?: number;
  onlyImages?: boolean;
};
const DocumentUploader = <T,>({
  title,
  arrayField,
  fieldName,
  index,
  onlyImages,
}: DocumentUploaderProps) => {
  const acceptedFileTypes: Accept = {
    "application/pdf": [".pdf"],
  };

  const maxFileSize: number = 10 * 1024 * 1024; // 10 MB in bytes

  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string | number;
    fileWithPath: FileWithPath | null;
    imageId?: string | null;
    src?: string;
  } | null>(null);

  const name = arrayField
    ? `${arrayField}[${index === -1 ? 0 : index}].${fieldName}`
    : fieldName;
  const [error, setError] = useState("");
  const { setFieldValue, getFieldMeta } = useFormikContext();
  useEffect(() => {
    const metaData = getFieldMeta(name);
    const imageIdMetaData = getFieldMeta<T>(`${name}.imageId`);
    const srcMetaData = getFieldMeta<T>(`${name}.src`);
    const nameMetaData = getFieldMeta<T>(`${name}.name`);
    const sizeMetaData = getFieldMeta<T>(`${name}.size`);
    if (metaData.value === null) {
      setUploadedFile(null);
    } else if (
      metaData.value !== null &&
      nameMetaData.value !== null &&
      sizeMetaData.value !== null &&
      imageIdMetaData.value !== null &&
      uploadedFile === null
    ) {
      setUploadedFile({
        name: (nameMetaData.value as string) ?? "",
        size: (sizeMetaData.value as string) ?? "",
        fileWithPath: null,
        src: srcMetaData.value as string,
        imageId: imageIdMetaData.value as string,
      });
    }
  }, [name, getFieldMeta, uploadedFile]);
  hasBothArrayFieldAndIndex({ arrayField, index });
  const { t } = useTranslation();
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 1 || acceptedFiles.length > 1) {
        setError(t("uploadOnlyOneFile"));
      } else if (
        fileRejections.length > 0 &&
        fileRejections[0].errors[0].code === "file-too-large"
      ) {
        setError(t("fileSizeError"));
      } else if (fileRejections.length > 0) {
        setError(`${fileRejections[0].errors[0].message}`);
      } else if (acceptedFiles.length > 0) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setError("");
          setUploadedFile({
            name: acceptedFiles[0].name,
            size: acceptedFiles[0].size,
            fileWithPath: acceptedFiles[0],
            src: reader.result?.toString(),
          });
          const imageData: ImageFileType = {
            fileWithPath: acceptedFiles[0],
            src: reader.result?.toString(),
            name: acceptedFiles[0].name,
            size: acceptedFiles[0].size.toString(),
          };
          setFieldValue(name, imageData);
        };
        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
    [name, setFieldValue, t]
  );
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      maxSize: maxFileSize,
      maxFiles: 1,
      accept: acceptedFileTypes,
    });
  return (
    <div className="flex w-full flex-col items-start">
      {uploadedFile ? (
        <>
          <p className={`text-sm font-normal text-hhGrayShades-label mb-2`}>
            {title}
          </p>
          <SingleFileInfoBox
            allowDownload
            file={{
              fileWithPath: uploadedFile.fileWithPath
                ? uploadedFile.fileWithPath
                : undefined,
              fileId: uploadedFile.imageId ?? "",
              src: uploadedFile.src,
              filename: uploadedFile.name,
              size: uploadedFile?.size ? uploadedFile?.size.toString() : "",
              onDeleteClick: () => {
                setUploadedFile(null);
                const imageData: ImageFileType = null;
                setFieldValue(name, imageData);
              },
            }}
          />
        </>
      ) : onlyImages ? (
        <div className="flex flex-col w-full items-start cursor-pointer">
          {title && (
            <p className="text-sm font-normal text-hhGrayShades-label mb-2">
              {title}
            </p>
          )}
          <div
            {...getRootProps()}
            className={`flex w-full flex-col rounded-md justify-center items-center h-32 border-dashed border-2 ${
              isDragActive
                ? "border-secondary-color"
                : "border-grayShades-bgTooltip"
            } py-3 ${isDragActive && "bg-grayShades-disabledGray"}`}
          >
            <input {...getInputProps()} />
            <img className="h-9 w-9 mb-2" alt="add" src={addImage} />
            {isDragActive ? (
              <>
                <p className="text-text-black text-lg font-semibold">
                  {t("dropFilesHere")}
                </p>
              </>
            ) : isDragReject ? (
              <>{t("fileRejected")}</>
            ) : (
              <div className="flex items-center gap-1 px-2">
                <p className="text-text-black text-xs sm:text-base font-medium">
                  <span className="text-secondary-color text-xs sm:text-base font-medium">
                    {t("uploadFile")} &nbsp;
                  </span>
                  {t("orDirectlyDragAndDropHere")}
                </p>
              </div>
            )}
            <p className="mt-1 text-grayShades-datagrid-secondary text-xs sm:text-base">
              {"PNG, JPG, GIF up to 10MB"}
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className={`text-sm font-normal text-hhGrayShades-label mb-2`}>
            {title}
          </p>
          <div
            {...getRootProps()}
            className={`flex items-center p-2 cursor-pointer justify-between
                 h-11 border-[1px] shadow-input-field-light border-hhGrayShades-borderGray focus-within:border-black w-full rounded-lg ${
                   isDragActive ? "bg-grayShades-disabledGray" : "bg-white"
                 }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <>
                <p className="text-sm font-normal text-hhGrayShades-label">
                  {t("dropFilesHere")}
                </p>
              </>
            ) : isDragReject ? (
              <p className="text-error text-sm font-normal">
                {t("fileRejected")}
              </p>
            ) : (
              <p className="text-sm font-normal text-hhGrayShades-label">
                <span className="text-primary-color text-sm font-normal">
                  {t("uploadFile")}&nbsp;
                </span>
                {t("orDirectlyDragAndDropHere")}
              </p>
            )}
            <UploadCloud />
          </div>
        </>
      )}
      {error && <HelperText mt="mt-2" helperText={error} />}
    </div>
  );
};

export default DocumentUploader;
