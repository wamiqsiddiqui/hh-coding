import { Dispatch, SetStateAction } from "react";
import CustomButton from "./CustomButton";
import { CustomPagination } from "./CustomPagination";

type CustomPaginationBoxProps = {
  rowsLength: number;
  selectedCount: number;
  setSelectedCount: Dispatch<SetStateAction<number>>;
};
/**
 * A component that renders a pagination box for a table.
 *
 * @param {object} props
 * @prop {number} rowsLength The total number of rows in the table.
 * @prop {number} selectedCount The current selected row.
 * @prop {function} setSelectedCount A function to update the selected row.
 * @prop {number} rowEntries The number of rows being displayed on each page.
 *
 * @example
 * <CustomPaginationBox
 *   rowsLength={10}
 *   selectedCount={1}
 *   setSelectedCount={(newSelectedCount) => setSelectedCount(newSelectedCount)}
 *   rowEntries={10}
 * />
 */
const CustomPaginationBox = ({
  rowsLength,
  setSelectedCount,
  selectedCount,
}: CustomPaginationBoxProps) => {
  return (
    <div className="flex justify-between w-full items-center pt-7 mb-3">
      {/* <p className="text-[14px] hidden lg:block">
        Showing {selectedCount} to {rowEntries ?? 10} of {rowsLength} entries
      </p> */}
      <div />
      <div className="flex items-center">
        <div className="mr-6">
          <CustomButton
            text="First"
            variant="text"
            fontSize="medium"
            noHover
            disabled={selectedCount <= 1}
            onClick={() => setSelectedCount(1)}
          />
        </div>
        <div className="mr-1">
          <CustomButton
            text="Previous"
            variant="text"
            fontSize="medium"
            noHover
            disabled={selectedCount <= 1}
            onClick={() => setSelectedCount(selectedCount - 1)}
          />
        </div>
        <CustomPagination
          count={rowsLength}
          selectedCount={selectedCount}
          setSelectedIndex={setSelectedCount}
        />
        <div className="mr-6">
          <CustomButton
            text="Next"
            variant="text"
            fontSize="medium"
            noHover
            disabled={selectedCount >= rowsLength}
            onClick={() => setSelectedCount(selectedCount + 1)}
          />
        </div>
        <div className="mr-0">
          <CustomButton
            text="Last"
            variant="text"
            fontSize="medium"
            noHover
            disabled={selectedCount >= rowsLength}
            onClick={() => setSelectedCount(rowsLength)}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomPaginationBox;
