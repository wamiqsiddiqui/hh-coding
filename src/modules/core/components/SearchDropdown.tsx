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
  useRef,
  useState,
} from "react";
import { hasScrolledtoEnd } from "../../../utils/helpers";
import { IoIosArrowUp, IoIosCloseCircle } from "../../../utils/icons";
import { CustomInputFieldProps } from "./CustomInputField";
import CustomTooltip from "./CustomTooltip";
import DetectOutsideClickWrapper from "./DetectOutsideClickWrapper";
import HelperText from "./HelperText";
import IconButton from "./IconButton";
import DropdownSkeleton from "./loaders/DropdownSkeleton";
import { GetListingResponse } from "../../../types/generalTypes";
import Tag from "./CustomTag";

const SearchDropdown = ({
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
  options,
  isMultiselect,
  tooltip,
  disabled,
  isFloating,
}: CustomInputFieldProps & {
  isMultiselect?: boolean;
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
  const [tags, setTags] = useState<
    {
      name: string;
      id: string;
    }[]
  >([]);
  useEffect(() => {
    if (isMultiselect) {
      const metaData: FieldMetaProps<{ id: string; name: string }[]> =
        getFieldMeta(fullfieldName!);
      if (metaData && metaData.value.every((value) => Boolean(value.id))) {
        const selectedOptions = options?.filter((option) =>
          metaData.value.find(
            (data) => data.id === option.id || data.name === option.name
          )
        );
        if (selectedOptions && tags.length === 0) {
          setTags(selectedOptions);
        } else {
          if (allowFetch) {
            fetchNextPage && fetchNextPage();
          }
        }
      }
    } else {
      const metaData: FieldMetaProps<{ id: string; name: string }> =
        getFieldMeta(fullfieldName!);
      if (metaData && metaData.value.id) {
        const selectedOption = options?.find(
          (option) =>
            option.id === metaData.value.id ||
            option.name === metaData.value.name
        );
        if (selectedOption) {
          setDropdownValue({
            id: selectedOption?.id,
            name: selectedOption?.name,
          });
        } else {
          if (allowFetch) {
            fetchNextPage && fetchNextPage();
          }
        }
      }
    }
  }, [
    tags.length,
    fullfieldName,
    getFieldMeta,
    allowFetch,
    fetchNextPage,
    isMultiselect,
    options,
  ]);

  const [dropdownValue, setDropdownValue] = useState<{
    name: string;
    id: string;
  } | null>(null);

  const filterDd = useCallback(
    (selectedTags: string[]) => {
      const filterArr = options?.filter((x) => !selectedTags.includes(x.id));
      return filterArr ?? [];
    },
    [options]
  );

  const [isOpen, setOpen] = useState(false);
  const [hasOpenedFirst, setHasOpenedFirst] = useState(false); // Being used as onblur is not working efficiently with this customInputDropdown

  useEffect(() => {
    if (
      (options && options.length < 3) ||
      filterDd(tags.map((x) => x.id)).length < 3
    ) {
      if (allowFetch) {
        fetchNextPage && fetchNextPage();
      }
    }
  }, [options, allowFetch, fetchNextPage, filterDd, tags]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedIndex]);
  return (
    <DetectOutsideClickWrapper
      onClick={() => setOpen(false)}
      className="relative flex flex-col items-start w-full mb-6"
    >
      {label && !isFloating && (
        <div className="flex items-center gap-x-4">
          <p className={`text-sm font-medium text-grayShades-bgTooltip mb-2`}>
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
        className={`flex items-center h-10 border-[1px] border-grayShades-datagrid focus-within:border-custom-green bg-white w-full rounded-lg`}
      >
        <input
          onKeyDown={(e) => {
            if (options && options.length > 0) {
              switch (e.key) {
                case "Escape":
                  setOpen(false);
                  break;
                case "ArrowDown":
                  if (!isOpen) {
                    setOpen(true);
                    return;
                  }
                  if (isMultiselect) {
                    const filteredOptions = filterDd(tags.map((x) => x.id));
                    setFocusedIndex((prevIndex) => {
                      const newIndex =
                        prevIndex === filteredOptions.length - 1
                          ? 0
                          : prevIndex + 1;
                      return newIndex > filteredOptions.length - 1
                        ? filteredOptions.length - 1
                        : newIndex;
                    });
                  } else {
                    setFocusedIndex((prevIndex) => {
                      const newIndex =
                        prevIndex === options.length - 1 ? 0 : prevIndex + 1;
                      return newIndex;
                    });
                  }
                  break;
                case "ArrowUp":
                  if (isMultiselect) {
                    const filteredOptions = filterDd(tags.map((x) => x.id));
                    setFocusedIndex((prevIndex) => {
                      const newIndex =
                        prevIndex <= 0
                          ? filteredOptions.length - 1
                          : prevIndex - 1;
                      return newIndex > filteredOptions.length - 1
                        ? filteredOptions.length - 1
                        : newIndex;
                    });
                  } else {
                    setFocusedIndex((prevIndex) => {
                      const newIndex =
                        prevIndex <= 0 ? options.length - 1 : prevIndex - 1;
                      return newIndex;
                    });
                  }
                  break;
                case "Enter":
                  if (!isOpen) {
                    setOpen(true);
                    return;
                  }
                  if (focusedIndex !== -1) {
                    if (isMultiselect && isOpen) {
                      const filteredOptions = filterDd(tags.map((x) => x.id));
                      if (focusedIndex > filteredOptions.length - 1) return;
                      const newTags = [
                        ...tags,
                        {
                          id: filteredOptions[focusedIndex].id,
                          name: filteredOptions[focusedIndex].name,
                        },
                      ];
                      setTags(newTags);
                      setFieldValue(fullfieldName!, [
                        ...tags,
                        {
                          name: filteredOptions[focusedIndex].name,
                          id: filteredOptions[focusedIndex].id,
                        },
                      ]);
                    } else if (
                      !isMultiselect &&
                      options &&
                      options.length > 0
                    ) {
                      const selectedOption = options[focusedIndex];
                      setDropdownValue({
                        id: selectedOption.id,
                        name: selectedOption.name,
                      });
                      setFieldValue(fullfieldName!, {
                        id: selectedOption.id,
                        name: selectedOption.name,
                      });
                      setOpen(false);
                    }
                  }
                  break;
                default:
                  break;
              }
            }
          }}
          className={`text-xs px-2 w-full h-full outline-none placeholder:text-xs placeholder:text-grayShades-textGray text-text-black bg-transparent`}
          disabled={dropdownValue !== null || disabled}
          value={dropdownValue ? dropdownValue.name : searchText}
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
        {dropdownValue && (
          <IconButton
            disabled={disabled}
            onClick={() => {
              setSearch && setSearch("");
              setDropdownValue(null);
              setFieldValue(fullfieldName!, { id: "", name: "" });
              setOpen(false);
            }}
            mr="mr-4"
            icon={<IoIosCloseCircle />}
          />
        )}
        {(isMultiselect || !dropdownValue) && (
          <IconButton
            disabled={disabled}
            mr="mr-4"
            onClick={() => setOpen(!isOpen)}
            rotate={isOpen ? "rotate-0" : "rotate-180"}
            customIconColor={isOpen ? "text-custom-green" : undefined}
            icon={<IoIosArrowUp />}
          />
        )}
      </div>
      {isMultiselect && (
        <div className="flex flex-wrap w-full mt-2">
          {tags.map((tag, index) => (
            <Tag
              tagName={tag.name}
              onCloseClick={() => {
                if (tags.length > 0) {
                  const updatedTags = tags.filter(
                    (_tag, tagIndex) => tagIndex !== index
                  );
                  setTags(updatedTags);
                  setFieldValue(fullfieldName!, updatedTags);
                }
              }}
            />
          ))}
        </div>
      )}
      {isOpen && (
        <div
          onScroll={(event: React.UIEvent<HTMLDivElement, UIEvent>) => {
            if (fetchNextPage) {
              if (hasScrolledtoEnd(event, allowFetch)) {
                fetchNextPage();
              }
            }
          }}
          className={`absolute z-20 bg-white max-h-32 h-min overflow-auto top-full mt-1 w-full shadow-md`}
        >
          <div
            className={`flex flex-col w-full items-start ${
              focusedIndex === 0
                ? "border-t-[0px] border-x-[1px] border-b-[1px]"
                : "border-[1px]"
            } border-custom-green rounded-lg`}
          >
            {isMultiselect && options && options.length > 0 ? (
              filterDd(tags.map((x) => x.id)).length > 0 ? (
                filterDd(tags.map((x) => x.id)).map((option, index) => {
                  const isFocused = index === focusedIndex;
                  return (
                    <div
                      ref={isFocused ? scrollRef : undefined}
                      onMouseEnter={() => setFocusedIndex(index)}
                      onClick={() => {
                        const newTags = [
                          ...tags,
                          { id: option.id, name: option.name },
                        ];
                        setTags(newTags);
                        setFieldValue(fullfieldName!, [
                          ...tags,
                          { name: option.name, id: option.id },
                        ]);
                      }}
                      className={`w-full px-4 rounded-lg ${
                        index === 0 &&
                        focusedIndex === 0 &&
                        "border-t-[1px] border-t-custom-green"
                      } ${
                        index === filterDd(tags.map((x) => x.id)).length - 1 &&
                        focusedIndex ===
                          filterDd(tags.map((x) => x.id)).length - 1 &&
                        "border-b-[1px] border-b-custom-green"
                      } py-2 ${
                        isFocused && "bg-custom-light-green"
                      } cursor-pointer`}
                    >
                      <p
                        className={`text-start text-sm rounded-lg font-normal text-grayShades-customGray  ${
                          isFocused ? "font-medium" : "font-normal"
                        } text-grayShades-bgTooltip`}
                      >
                        {option.name}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div
                  className={`w-full px-4 rounded-lg ${
                    focusedIndex === 0 && "border-t-[1px] border-t-custom-green"
                  }`}
                >
                  <p className="ml-5 py-2 text-start text-sm text-grayShades-bgTooltip">
                    No Data Found
                  </p>
                </div>
              )
            ) : !isMultiselect && options && options.length > 0 ? (
              options?.map((option, index) => {
                const isFocused = index === focusedIndex;
                return (
                  <div
                    ref={isFocused ? scrollRef : undefined}
                    onMouseEnter={() => setFocusedIndex(index)}
                    onClick={() => {
                      setDropdownValue({
                        id: option.id,
                        name: option.name,
                      });
                      setFieldValue(fullfieldName!, {
                        id: option.id,
                        name: option.name,
                      });
                      setOpen(false);
                    }}
                    className={`w-full px-4 rounded-lg ${
                      index === 0 &&
                      focusedIndex === 0 &&
                      "border-t-[1px] border-t-custom-green"
                    } ${index === 0 ? "py-2" : "py-2"} cursor-pointer ${
                      isFocused && "bg-custom-light-green"
                    }`}
                  >
                    <p
                      className={`text-start text-sm rounded-lg ${
                        isFocused ? "font-medium" : "font-normal"
                      } text-grayShades-bgTooltip`}
                    >
                      {option.name}
                    </p>
                  </div>
                );
              })
            ) : (
              !isLoading && (
                <p className="ml-5 py-2 text-start text-sm text-grayShades-bgTooltip">
                  No Data Found
                </p>
              )
            )}
            {isLoading && <DropdownSkeleton />}
          </div>
        </div>
      )}
      {helperText && <HelperText helperText={helperText} />}
    </DetectOutsideClickWrapper>
  );
};

export default SearchDropdown;
