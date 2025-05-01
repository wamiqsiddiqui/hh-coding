import { ListingRequestCommonProps } from "../types/generalTypes";
export const PAGE_LIMIT = 9;
export const getListingParams = ({
  pageNumber,
  searchBy,
  searchText,
  customParamKey,
  customParamValue,
}: // sortData,
ListingRequestCommonProps) => {
  return {
    params:
      searchBy && searchText && searchText.trim().length > 0
        ? {
            page: pageNumber ?? 1,
            limit: PAGE_LIMIT,
            [customParamKey as string]: customParamValue,
            [searchBy]:
              searchBy === "createdAt" ? { from: searchText } : searchText,
            // businessCategory: "SALON",
            // sort: { [sortData?.field ?? ""]: sortData?.order },
          }
        : {
            page: pageNumber ?? 1,
            limit: PAGE_LIMIT,
            [customParamKey as string]: customParamValue,
            // businessCategory: "SALON",
            // sort: { [sortData?.field ?? ""]: sortData?.order },
          },
  };
};
