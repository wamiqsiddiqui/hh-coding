import React, { Dispatch, JSX, SetStateAction } from "react";
import CustomChip from "./CustomChip";
import { SortDownArrow, SortUpArrow } from "../../../utils/svgIcons";
import {
  ChipColorVariant,
  ColumnsType,
  SortOrder,
  SortType,
} from "../../../types/generalTypes";
import { DealStatus } from "../../../types/generalTypes";

type DatagridProps = {
  columns: ColumnsType;
  noBorder?: boolean;
  noTableShadow?: boolean;
  noTableRadius?: boolean;
  hasHeaderShadow?: boolean;
  noTablePadding?: boolean;
  sortData?: SortType | null;
  setSortData?: Dispatch<SetStateAction<SortType | null>>;
  isLoading?: boolean;
  onRowClick?: (index: number) => void;
  rows: {
    [key: string]: {
      text: string;
      fontWeight?: "font-normal" | "font-semibold" | "font-medium";
      textColor?:
        | "text-grayShades-datagrid"
        | "text-text-black"
        | "text-grayShades-customGray";
      textStart?: boolean;
      secondaryText?: string;
      displayType?: "chip" | "text" | "actions" | "customAction" | "dealChip";
      chipColor?: ChipColorVariant;
      customActionButton?: JSX.Element;
      icons?: {
        onIconClick?: (index: number) => void;
        iconSrc: string | JSX.Element;
        heightWidth?: string;
        openModal?: boolean;
        noHover?: boolean;
      }[];
    };
  }[];
  borderBottomColor?: string;
};
const Datagrid = ({
  columns,
  rows,
  noBorder,
  isLoading,
  noTableRadius,
  noTableShadow,
  noTablePadding,
  hasHeaderShadow,
  setSortData,
  sortData,
  borderBottomColor,
  onRowClick,
}: DatagridProps) => {
  const loadingRows = new Array(10).fill(columns.length);
  return (
    <div
      className={`w-full ${!noTableRadius && "rounded-md"} ${
        !noTablePadding && "p-2"
      } ${!noTableShadow && "shadow-datagrid"} h-fit overflow-x-auto`}
    >
      <table className="w-full">
        <thead className={`${hasHeaderShadow && "shadow-datagrid"}`}>
          <tr
            className={`${
              !noBorder &&
              `${
                borderBottomColor ?? "border-b-grayShades-datagrid-border"
              } border-b-2`
            }`}
          >
            {columns.map((column, index) => (
              <th
                onClick={() => {
                  column.sortKey !== undefined &&
                    setSortData &&
                    setSortData({
                      field: column.sortKey,
                      order:
                        sortData && sortData.order === SortOrder.Ascending
                          ? SortOrder.Descending
                          : SortOrder.Ascending,
                    });
                }}
                className={`${
                  index === 0
                    ? `pl-4 ${!column.columnsSpan && "text-start"}`
                    : "px-4"
                } ${
                  column.name === "Actions"
                    ? "text-transparent"
                    : "text-column-header-text"
                } py-3 ${column.textStart && "text-start"} ${
                  column.columnsSpan && "px-4 bg-custom-light-green"
                } ${column.bgColor ? column.bgColor : "bg-transparent"} ${
                  column.maxWidth
                    ? ` max-w-10 max-md:max-w-[20%]`
                    : "min-w-[10%]"
                }  max-md:w-[20%]`}
              >
                <span
                  className={`flex justify-between items-center ${
                    column.sortKey && "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (column.sortKey && setSortData)
                      setSortData({
                        field: column.sortKey,
                        order:
                          sortData && sortData?.order === SortOrder.Ascending
                            ? SortOrder.Descending
                            : SortOrder.Ascending,
                      });
                  }}
                >
                  <p
                    className={`w-full ${
                      column.textColor ? column.textColor : "text-text-black"
                    }`}
                  >
                    {column.name}
                  </p>
                  <span>
                    {sortData &&
                      sortData.field === column.sortKey &&
                      (sortData.order === SortOrder.Ascending ? (
                        <SortDownArrow />
                      ) : (
                        <SortUpArrow />
                      ))}
                  </span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? loadingRows.map((_) => {
                return (
                  <tr>
                    {columns.map((__) => {
                      return (
                        <td className="z-[100000] animate-blink bg-grayShades-borderLightGray border-[6px] border-white m-4 py-2 px-4 h-8 w-[95%] text-transparent"></td>
                      );
                    })}
                  </tr>
                );
              })
            : rows.length > 0 &&
              rows.map((row, rowIndex) => {
                return (
                  <tr
                    className={`${
                      Boolean(onRowClick) &&
                      "hover:bg-custom-light-green cursor-pointer"
                    } ${
                      rowIndex !== rows.length - 1 &&
                      !noBorder &&
                      "border-b-grayShades-datagrid-border border-b-2"
                    }`}
                    onClick={() => onRowClick && onRowClick(rowIndex)}
                  >
                    {Object.values(row).map((rowData, keyIndex) => {
                      if (rowData.displayType === "customAction") {
                        if (!rowData.customActionButton) {
                          throw new Error(
                            "For displayType = customAction, pass customActionButton"
                          );
                        } else {
                          return (
                            <td className="py-4">
                              <span className="flex max-md:flex-col items-center justify-center">
                                {rowData.customActionButton}
                              </span>
                            </td>
                          );
                        }
                      }
                      if (rowData.displayType === "actions") {
                        if (!rowData.icons || rowData.icons.length === 0) {
                          throw new Error(
                            "For displayType = actions, pass at least 1 icon"
                          );
                        } else {
                          return (
                            <td className="py-4">
                              <span className="flex max-md:flex-col items-center justify-center">
                                {rowData.icons.map((icon, index) => {
                                  return (
                                    <span
                                      className={`w-8 h-8 cursor-pointer mx-1 flex items-center justify-center ${
                                        !icon.noHover &&
                                        "hover:bg-grayShades-secondaryHoverGray hover:bg-opacity-70 hover:shadow-md"
                                      }  rounded-full ${index === 0 && "mr-2"}`}
                                    >
                                      {typeof icon.iconSrc === "string" ? (
                                        <img
                                          alt="icon"
                                          onClick={(e) => {
                                            if (
                                              icon.onIconClick &&
                                              icon.openModal
                                            ) {
                                              e.stopPropagation();
                                              icon.onIconClick(-1);
                                            } else {
                                              icon.onIconClick &&
                                                icon.onIconClick(
                                                  rowIndex && rowIndex
                                                );
                                            }
                                          }}
                                          className={`cursor-pointer ${
                                            icon.heightWidth
                                              ? icon.heightWidth
                                              : "h-5 w-5"
                                          }`}
                                          src={icon.iconSrc}
                                        />
                                      ) : (
                                        <span
                                          onClick={(
                                            e: React.MouseEvent<
                                              HTMLImageElement,
                                              MouseEvent
                                            >
                                          ) => {
                                            if (
                                              icon.onIconClick &&
                                              icon.openModal
                                            ) {
                                              e.stopPropagation();
                                              icon.onIconClick(-1);
                                            } else {
                                              icon.onIconClick &&
                                                icon.onIconClick(
                                                  rowIndex && rowIndex
                                                );
                                            }
                                          }}
                                        >
                                          {icon.iconSrc}
                                        </span>
                                      )}
                                    </span>
                                  );
                                })}
                              </span>
                            </td>
                          );
                        }
                      }
                      if (rowData.displayType === "chip") {
                        return (
                          <td className="flex justify-center py-4 max-md:mx-3">
                            <CustomChip
                              chipColorVariant={rowData.chipColor}
                              text={rowData.text}
                            />
                          </td>
                        );
                      }
                      if (rowData.displayType === "dealChip") {
                        return (
                          <td className="flex justify-center py-4 max-md:mx-3">
                            <CustomChip text={rowData.text as DealStatus} />
                          </td>
                        );
                      }
                      if (rowData.secondaryText) {
                        return (
                          <td
                            className={`${
                              keyIndex === 0 && "pl-4"
                            } py-4 max-md:mx-3`}
                          >
                            <span>
                              <p
                                className={`text-start ${
                                  rowData.textColor
                                    ? rowData.textColor
                                    : "text-grayShades-datagrid"
                                } ${
                                  rowData.fontWeight
                                    ? "font-semibold"
                                    : "font-medium"
                                } text-base`}
                              >
                                {rowData.text}
                              </p>
                              <p className="text-start text-sm font-normal text-grayShades-datagrid-secondary">
                                {rowData.secondaryText}
                              </p>
                            </span>
                          </td>
                        );
                      }
                      return (
                        <td
                          className={`${
                            rowData.textStart && "pl-4"
                          } py-4 max-md:mx-3 px-5`}
                        >
                          <p
                            className={`${
                              rowData.textStart ? "text-start" : "text-center"
                            } ${
                              rowData.textColor
                                ? rowData.textColor
                                : "text-grayShades-datagrid"
                            } ${
                              rowData.fontWeight
                                ? rowData.fontWeight
                                : "font-medium"
                            } text-base`}
                          >
                            {rowData.text}
                          </p>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
        </tbody>
      </table>
      {rows.length === 0 && !isLoading && (
        <p className="mt-4 text-xl text-text-black font-semibold">
          No Data Found!
        </p>
      )}
    </div>
  );
};

export default Datagrid;
