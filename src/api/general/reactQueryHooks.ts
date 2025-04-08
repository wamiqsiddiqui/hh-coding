import { useQuery } from "@tanstack/react-query";
import { GET_ROUTES } from "./routes";
import { getAllBusinessCategories, getAllSecurityQuestions } from "./requests";

export const useGetAllBusinessCategories = () => {
  return useQuery({
    queryKey: [GET_ROUTES.getAllBusinessCategories],
    queryFn: () => getAllBusinessCategories(),
  });
};

export const useGetAllSecurityQuestions = () => {
  return useQuery({
    queryKey: [GET_ROUTES.getAllSecurityQuestions],
    queryFn: () => getAllSecurityQuestions(),
  });
};
