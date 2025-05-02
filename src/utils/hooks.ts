import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import { setToast } from "../redux/toastSlice";
import { AxiosError } from "axios";
import { setScroll } from "../redux/scrollSlice";
import { hasScrolledtoEnd } from "./helpers";
import { KEY_NAMES } from "./cons";
import axiosInstance from "../services/axiosInstance";
import { setLogout } from "../redux/auth";
import { PARENT_ROUTES } from "../parentRoutes";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem(KEY_NAMES.refreshToken);

  const logout = async () => {
    try {
      await axiosInstance.post("/security/logout", {
        refreshToken: refreshToken,
      });
      localStorage.removeItem(KEY_NAMES.accessToken);
      localStorage.removeItem(KEY_NAMES.refreshToken);
      localStorage.removeItem(KEY_NAMES.permissions);
      localStorage.removeItem(KEY_NAMES.userId);
      dispatch(setLogout());
      navigate(PARENT_ROUTES.login);
    } catch (error) {
      localStorage.removeItem(KEY_NAMES.accessToken);
      localStorage.removeItem(KEY_NAMES.refreshToken);
      localStorage.removeItem(KEY_NAMES.permissions);
      localStorage.removeItem(KEY_NAMES.userId);
      dispatch(setLogout());
      navigate(PARENT_ROUTES.login);
    }
    dispatch(
      setToast({
        text: "You've been logged out successfully!",
        variant: "success",
      })
    );
  };
  return logout;
};

export const useSuccessError = ({
  error,
  isSuccess,
  isError,
  successMessage,
  successFunction,
}: {
  error: Error | null;
  isSuccess: boolean;
  isError: boolean;
  successMessage: string;
  successFunction?: () => void;
}) => {
  const dispatch = useDispatch();
  // const { t } = useTranslation();
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setToast({
          text: successMessage,
          variant: "success",
        })
      );
      successFunction && successFunction();
    }
  }, [isSuccess, dispatch, successMessage, successFunction]);
  useEffect(() => {
    if (isError) {
      dispatch(
        setToast({
          text:
            (
              (error as AxiosError).response?.data as {
                message: string;
              }
            )?.message ?? "Something went wrong",
          variant: "error",
        })
      );
    }
  }, [isError, dispatch, error, successMessage]);
};

export const useHeight = (
  elementRef: RefObject<HTMLDivElement | null>,
  setHeight: Dispatch<SetStateAction<number>>
) => {
  // Function to update height
  const updateHeight = useCallback(
    (
      elementRef: RefObject<HTMLDivElement | null>,
      setHeight: Dispatch<SetStateAction<number>>
    ) => {
      if (elementRef.current) {
        const newHeight = elementRef.current.offsetHeight;
        setHeight(newHeight);
      }
    },
    []
  );
  // Add event listeners on mount and clean up on unmount
  useEffect(() => {
    window.addEventListener("resize", () => {
      updateHeight(elementRef, setHeight);
    }); // Update height on resize
    updateHeight(elementRef, setHeight); // Initial height calculation

    return () => {
      window.removeEventListener("resize", () => {
        updateHeight(elementRef, setHeight);
      });
    };
  }, [updateHeight, elementRef, setHeight]);
};

export const useDetectScroll = ({
  customCondition,
  onScrollEnd,
}: {
  customCondition: boolean;
  onScrollEnd: () => void;
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setScroll({
        onScroll: (event) => {
          if (hasScrolledtoEnd(event, customCondition)) {
            onScrollEnd();
          }
        },
      })
    );
    return () => {
      dispatch(setScroll({ onScroll: null }));
    };
  }, [customCondition, onScrollEnd, dispatch]);
};
