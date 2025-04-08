import { JSX, useEffect, useRef, useState } from "react";
import { ArrowDown } from "../../../utils/svgIcons";
import DetectOutsideClickWrapper from "./DetectOutsideClickWrapper";

type DropdownSelectOnlyProps = {
  options: { label: string; value: string; img?: JSX.Element }[];
  img?: JSX.Element;
  onSelect: (option: { label: string; value: string }) => void;
  selectedLabel?: string;
};
const DropdownSelectOnly = ({
  options,
  img,
  onSelect,
  selectedLabel,
}: DropdownSelectOnlyProps) => {
  if (options.length === 0) throw new Error("No options provided");
  const [isOpen, setOpen] = useState(false);
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
    <DetectOutsideClickWrapper onClick={() => setOpen(false)}>
      <div className="relative">
        <div
          onClick={() => setOpen(!isOpen)}
          className="flex rounded-lg border-[1px] py-1 px-2 items-center border-hhGrayShades-borderGray shadow-dropdown-field-light bg-white cursor-pointer gap-x-2"
        >
          {img && <span>{img}</span>}
          <p>{selectedLabel ?? options[0].label}</p>
          <ArrowDown />
        </div>
        {isOpen && (
          <div className="absolute w-full border-2 border-hhGrayShades-borderGray rounded-lg bg-white mt-1 z-10">
            {options.map((option, index) => {
              const isFocused = index === focusedIndex;
              return (
                <div
                  ref={isFocused ? scrollRef : undefined}
                  onMouseEnter={() => setFocusedIndex(index)}
                  key={option.value}
                  className={`rounded-md w-full py-1 px-2 flex items-center cursor-pointer ${
                    isFocused && "bg-secondary-green"
                  }`}
                  onClick={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                >
                  {option.img && <span>{option.img}</span>}
                  <p className="px-2 py-1 text-start">{option.label}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DetectOutsideClickWrapper>
  );
};

export default DropdownSelectOnly;
