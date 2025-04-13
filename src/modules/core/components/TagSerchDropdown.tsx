import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { FieldMetaProps, useFormikContext } from "formik";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IoIosArrowUp, IoIosCloseCircle, IoMdSend } from "../../../utils/icons";
import { CustomInputFieldProps } from "./CustomInputField";
import CustomTooltip from "./CustomTooltip";
import HelperText from "./HelperText";
import IconButton from "./IconButton";
import DropdownSkeleton from "./loaders/DropdownSkeleton";
import { hasScrolledtoEnd } from "../../../utils/helpers";
import DetectOutsideClickWrapper from "./DetectOutsideClickWrapper";
import { GetListingResponse } from "../../../types/generalTypes";

const TagSearchDropdown = ({
  label,
  helperText,
  fetchNextPage,
  searchText,
  setSearch,
  isLoading,
  tooltipDirection,
  placeholder,
  fullfieldName,
  allowFetch,
  nameOptions,
  tooltip,
}: CustomInputFieldProps & {
  allowFetch?: boolean;
  isLoading?: boolean;
  searchText?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<GetListingResponse<any[]>, unknown>,
      Error
    >
  >;
}) => {
  const { setFieldValue, setFieldTouched, validateField, getFieldMeta } =
    useFormikContext();
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    const metaData: FieldMetaProps<string[]> = getFieldMeta(fullfieldName!);
    if (metaData && metaData.value.length > 0) {
      setTags(metaData.value);
      if (allowFetch) {
        fetchNextPage && fetchNextPage();
      }
    }
  }, [fullfieldName, getFieldMeta, allowFetch, fetchNextPage, nameOptions]);

  const filterDd = useCallback(
    (selectedTags: string[]) => {
      const filterArr = nameOptions?.filter((x) => !selectedTags.includes(x));
      return filterArr ?? [];
    },
    [nameOptions]
  );

  const [isOpen, setOpen] = useState(false);
  const [hasOpenedFirst, setHasOpenedFirst] = useState(false); // Being used as onblur is not working efficiently with this customInputDropdown

  useEffect(() => {
    if (
      (nameOptions && nameOptions.length < 3) ||
      filterDd(tags.map((x) => x)).length < 3
    ) {
      if (allowFetch) {
        fetchNextPage && fetchNextPage();
      }
    }
  }, [nameOptions, allowFetch, fetchNextPage, filterDd, tags]);
  return (
    <DetectOutsideClickWrapper
      onClick={() => setOpen(false)}
      className="flex flex-col items-start w-full mb-6"
    >
      {label && (
        <div className="flex items-center gap-x-4">
          <p
            className={`text-base font-normal text-grayShades-customGray mb-3`}
          >
            {label}
          </p>
          {tooltip && (
            <CustomTooltip
              tooltip={tooltip}
              tooltipDirection={tooltipDirection}
            />
          )}
        </div>
      )}
      <div
        className={`flex flex-col items-center w-full border-[1px] border-grayShades-borderGray rounded-2xl p-1`}
      >
        {tags.length > 0 && (
          <div className="flex flex-wrap w-full px-2 py-2">
            {tags.map((tag, index) => (
              <div className="mr-2 flex justify-center items-center h-10 overflow-clip py-1 mb-2 px-2 w-max  bg-badge-green border-badge-border-green border-2 rounded-lg">
                <p className="text-badge-text-green text-sm font-medium mr-2">
                  {tag}
                </p>
                <IoIosCloseCircle
                  onClick={() => {
                    if (tags.length > 0) {
                      const updatedTags = tags.filter(
                        (_tag, tagIndex) => tagIndex !== index
                      );
                      setTags(updatedTags);
                      setFieldValue(fullfieldName!, updatedTags);
                    }
                  }}
                  className="h-5 w-5 cursor-pointer text-badge-text-green"
                />
              </div>
            ))}
          </div>
        )}
        <div className="relative flex justify-between w-full items-center">
          <input
            className={`bg-transparent text-lg px-2 w-full h-full outline-none placeholder:text-xl caret-grayShades-borderGray placeholder:text-grayShades-borderGray`}
            value={searchText}
            onClick={() => {
              setOpen(!isOpen);
              setHasOpenedFirst(true);
              if (hasOpenedFirst) {
                setFieldTouched(fullfieldName!, true, false).then((_) => {
                  validateField(fullfieldName!);
                });
              }
            }}
            placeholder={placeholder}
            onChange={(e: any) => setSearch && setSearch(e.target.value)}
          />
          <div className="flex justify-end">
            {searchText && (
              <IconButton
                onClick={() => {
                  setSearch && setSearch("");
                  setFieldValue(fullfieldName!, { id: "", name: "" });
                  setOpen(false);
                }}
                mr="mr-0"
                icon={<IoIosCloseCircle />}
              />
            )}
            {searchText && (
              <IconButton
                onClick={() => {
                  if (searchText) {
                    setTags([...tags, searchText]);
                    setSearch && setSearch("");
                    setOpen(false);
                    setFieldValue(fullfieldName!, [...tags, searchText]);
                  }
                }}
                mr="mr-0"
                icon={<IoMdSend />}
              />
            )}
            <IconButton
              mr="mr-4"
              onClick={() => setOpen(!isOpen)}
              rotate={isOpen ? "rotate-0" : "rotate-180"}
              icon={<IoIosArrowUp />}
            />
          </div>
          {isOpen && (
            <div
              onScroll={(event: React.UIEvent<HTMLDivElement, UIEvent>) => {
                if (fetchNextPage) {
                  if (hasScrolledtoEnd(event, allowFetch)) {
                    fetchNextPage();
                  }
                }
              }}
              className={`absolute z-[10000000000000] max-h-32 h-min overflow-auto ${
                helperText ? "top-20" : "top-14"
              } flex flex-col items-center bg-white w-full shadow-md`}
            >
              <div className="flex flex-col w-full items-start">
                {filterDd(tags.map((x) => x)).map((option, index) => {
                  return (
                    <div
                      onClick={() => {
                        const newTags = [...tags, option];
                        setTags(newTags);
                        setFieldValue(fullfieldName!, [...tags, option]);
                      }}
                      className={`w-full px-4 ${
                        index === 0 ? "py-2" : "py-2"
                      } hover:bg-custom-light-green cursor-pointer`}
                    >
                      <p className="text-start text-lg font-normal text-grayShades-customGray">
                        {option}
                      </p>
                    </div>
                  );
                })}
                {isLoading && <DropdownSkeleton />}
              </div>
            </div>
          )}
        </div>
      </div>
      {helperText && <HelperText helperText={helperText} />}
    </DetectOutsideClickWrapper>
  );
};

export default TagSearchDropdown;
