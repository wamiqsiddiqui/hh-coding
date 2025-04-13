import { useFormikContext } from "formik";
import { useState } from "react";
import { IoMdSend } from "../../../utils/icons";
import { CustomInputFieldProps } from "./CustomInputField";
import HelperText from "./HelperText";
import IconButton from "./IconButton";
import Tag from "./CustomTag";

const TagInputField = ({
  placeholder,
  fullfieldName,
  helperText,
  label,
  disabled,
}: CustomInputFieldProps) => {
  const [text, setText] = useState("");
  const { setFieldValue, setFieldTouched, validateField, getFieldMeta } =
    useFormikContext();
  const metaData = getFieldMeta(fullfieldName!);
  const existingTags = metaData.value as string[];
  const [tags, setTags] = useState<string[]>(existingTags ?? []);

  const addTag = () => {
    if (text) {
      setTags((prevTags) => [...prevTags, text]);
      setText("");
      setFieldValue(fullfieldName!, [...tags, text]).then((_) => {
        validateField(fullfieldName!);
      });
    }
  };
  return (
    <div
      className={`flex flex-col items-start w-full
      `}
    >
      {label && (
        <p className="text-sm font-medium text-grayShades-bgTooltip mb-3">
          {label}
        </p>
      )}
      <div
        className={`flex items-center  border-[1px] border-grayShades-datagrid focus-within:border-black bg-white w-full h-11 rounded-lg`}
      >
        <input
          className={`bg-transparent text-xs placeholder:text-xs placeholder:text-grayShades-textGray px-2 w-full h-full outline-none`}
          disabled={disabled}
          onBlur={() => setFieldTouched(fullfieldName!, true)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            e.key === "Enter" && addTag();
          }}
          placeholder={placeholder}
          value={text}
          onChange={(e: any) => setText(e.target.value)}
        />
        <IconButton onClick={addTag} mr="mr-5" icon={<IoMdSend />} />
      </div>
      <div className="flex flex-wrap w-full mt-2">
        {tags.map((tag, index) => (
          <Tag
            tagName={tag}
            onCloseClick={() => {
              const updatedTags = tags.filter(
                (_tag, tagIndex) => tagIndex !== index
              );
              setTags(updatedTags);
              setFieldValue(fullfieldName!, updatedTags).then((_) => {
                validateField(fullfieldName!);
              });
            }}
          />
        ))}
      </div>
      {helperText && <HelperText helperText={helperText} />}
    </div>
  );
};

export default TagInputField;
