import { Dispatch, SetStateAction } from "react";

type CustomPaginationProps = {
  count: number;
  selectedCount: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
};
export const CustomPagination = ({
  count,
  selectedCount,
  setSelectedIndex,
}: CustomPaginationProps) => {
  const pageLabels: number[] = [];

  const isSelectedOnLeftPanel = () => selectedCount < 4;

  const isSelectedOnMiddlePanel = () =>
    selectedCount >= 4 && selectedCount < count - 3;

  const isSelectedOnRightPanel = () => selectedCount >= count - 4;

  const isLeftPanelAllowed = () =>
    count > 6 &&
    (isSelectedOnMiddlePanel() ||
      (selectedCount >= count - 5 && selectedCount > 3));

  const isRightPanelAllowed = () =>
    count > 6 && (isSelectedOnMiddlePanel() || isSelectedOnLeftPanel());

  if (count > 6) {
    if (isSelectedOnLeftPanel()) {
      pageLabels.push(1, 2, 3, 4, 5);
    } else if (isSelectedOnMiddlePanel()) {
      pageLabels.push(selectedCount - 1, selectedCount, selectedCount + 1);
    } else if (isSelectedOnRightPanel()) {
      pageLabels.push(count - 4, count - 3, count - 2, count - 1, count);
    }
  } else {
    for (let i = 1; i <= count; i++) {
      pageLabels.push(i);
    }
  }
  const getBackgroundColor = (displayedCount: number) =>
    selectedCount === displayedCount
      ? "bg-primary-color hover:bg-dark-primary"
      : "bg-transparent hover:bg-secondary-color";
  const getPageNumberColor = (displayedCount: number) =>
    selectedCount === displayedCount ? "text-white" : "text-black";

  return (
    <div className="flex mx-3">
      {isLeftPanelAllowed() && (
        <div className="flex">
          <PaginationDot
            pageNumberColor={getPageNumberColor(1)}
            backgroundColor={getBackgroundColor(1)}
            pageNumber={1}
            onClick={() => setSelectedIndex(1)}
          />
          <p className="text-[#242d37] text-[14px] mx-3">...</p>
        </div>
      )}
      {pageLabels.map((pageNumber, index) => (
        <PaginationDot
          key={index}
          pageNumberColor={getPageNumberColor(pageNumber)}
          backgroundColor={getBackgroundColor(pageNumber)}
          pageNumber={pageNumber}
          onClick={() => setSelectedIndex(pageNumber)}
        />
      ))}
      {isRightPanelAllowed() && (
        <div className="flex">
          <div>...</div>
          <PaginationDot
            pageNumberColor={getPageNumberColor(count)}
            backgroundColor={getBackgroundColor(count)}
            pageNumber={count}
            onClick={() => setSelectedIndex(count)}
          />
        </div>
      )}
    </div>
  );
};

const PaginationDot = ({
  backgroundColor,
  pageNumber,
  pageNumberColor,
  onClick,
}: {
  pageNumberColor: string;
  backgroundColor: string;
  pageNumber: number;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className={`cursor-pointer flex justify-center items-center w-8 h-8 text-grayShades-datagrid mx-1 rounded-[50%] group ${backgroundColor}
      `}
      onClick={onClick}
    >
      <p className={`${pageNumberColor} group-hover:text-white`}>
        {pageNumber}
      </p>
    </div>
  );
};
