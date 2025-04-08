import axiosInstance from "../../services/axiosInstance";
import { BusinessCategoriesListingType } from "../../types/signupTypes";
import { GET_ROUTES } from "./routes";

export const getAllBusinessCategories = async (
  pageParam?: number,
  search?: string
) => {
  const hasSearched = search && search.trim().length > 0;
  const pagingParam =
    (!hasSearched || search.trim().length === 0) && pageParam
      ? `size=9&page=${pageParam ?? 1}`
      : "nopaging=true";
  const searchParam = hasSearched ? `&title=${search}` : "";
  const { data } = await axiosInstance.get<BusinessCategoriesListingType>(
    `${GET_ROUTES.getAllBusinessCategories}?${pagingParam}${searchParam}`
  );
  return data;
};

export const getAllSecurityQuestions = async (
  pageParam?: number,
  search?: string
) => {
  const hasSearched = search && search.trim().length > 0;
  const pagingParam =
    (!hasSearched || search.trim().length === 0) && pageParam
      ? `size=9&page=${pageParam ?? 1}`
      : "nopaging=true";
  const searchParam = hasSearched ? `&title=${search}` : "";
  const { data } = await axiosInstance.get<BusinessCategoriesListingType>(
    `${GET_ROUTES.getAllSecurityQuestions}?${pagingParam}${searchParam}`
  );
  return data;
};
