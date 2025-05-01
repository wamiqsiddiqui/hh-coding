import CryptoJS from "crypto-js";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { refreshTokenAPI } from "../api/auth";
import { PARENT_ROUTES } from "../parentRoutes";
import { setLogin, setLogout, updateAccessToken } from "../redux/auth";
import { store } from "../redux/store";
import { ErrorMessageIncludesType, jwtPayload } from "../types/generalTypes";
import { KEY_NAMES, MONTH_NAMES } from "./cons";
import { isValidTimestamp } from "./validations";
import { jwtDecode } from "jwt-decode";

export const displayErrorMessage = (
  error: string,
  conditions?: ErrorMessageIncludesType[]
): string => {
  if (!conditions || conditions.length === 0) return error;

  for (const condition of conditions) {
    const match = error?.includes(condition.includes);

    switch (match) {
      case true:
        return condition.returnText;
    }
  }
  // Default return if no match is found
  return "Something went wrong";
};

export const getSingularOrPluralText = (
  premise: number | null,
  conclusion: string
) => {
  return `${premise ?? 0} ${
    premise !== null && premise > 1 ? conclusion + "s" : conclusion
  }`;
};
export const imageBasePath = () => {
  return `src/assets/images`;
};
export const isOptionalStringNotEmpty = (text?: string) =>
  text !== undefined && text.trim().length > 0;

export const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const getFieldHelperText = ({
  errors,
  fieldName,
  touched,
  arrayField,
  subArrayField,
  subIndex,
  index,
}: {
  touched: { [key: string]: any };
  errors: { [key: string]: any };
  fieldName: string;
  arrayField?: string;
  subArrayField?: string;
  parentField?: string;
  index?: number;
  subIndex?: number;
}) => {
  if (
    subArrayField &&
    typeof subIndex === "number" &&
    arrayField &&
    typeof index === "number"
  ) {
    return (
      touched?.[arrayField] &&
      touched?.[arrayField]?.[index] &&
      touched?.[arrayField]?.[index]?.[subArrayField]?.[subIndex] &&
      errors?.[arrayField] &&
      errors?.[arrayField]?.[index] &&
      errors?.[arrayField]?.[index]?.[subArrayField]?.[subIndex]
    );
  } else if (arrayField && typeof index === "number") {
    return (
      touched?.[arrayField] &&
      touched?.[arrayField]?.[index] &&
      touched?.[arrayField]?.[index]?.[fieldName] &&
      errors?.[arrayField] &&
      errors?.[arrayField]?.[index] &&
      errors?.[arrayField]?.[index]?.[fieldName]
    );
  } else if (fieldName.includes(".")) {
    const parentField = fieldName.split(".")[0];
    const childField = fieldName.split(".")[1];
    return (
      touched?.[parentField]?.[childField] &&
      errors?.[parentField]?.[childField]
    );
  } else {
    return touched?.[fieldName] && errors?.[fieldName];
  }
};

export const hasBothArrayFieldAndIndex = ({
  arrayField,
  index,
}: {
  arrayField?: string;
  index?: number;
}) => {
  if (arrayField && index === undefined) {
    throw new Error(
      `Please pass index if you're passing arrayField ${arrayField} index= ${index}`
    );
  }
  if (!arrayField && index) {
    throw new Error("Please pass arrayField if you're passing index");
  }
};

export const convertByteToMB = (byte: number): string => {
  const mbs = byte / (1000 * 1000);
  // if (mbs < 1) return 0.5;
  // else return mbs;
  return mbs.toPrecision(2);
};

export const getTimeDifference = (
  givenDate: Date | string,
  currentTime: Date,
  setTimeDifference: React.Dispatch<React.SetStateAction<string>>
) => {
  const now = currentTime;
  const inputDate =
    typeof givenDate === "string" ? new Date(givenDate) : givenDate;
  const diffInMilliseconds = now.getTime() - inputDate.getTime();

  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365));
  if (seconds < 60) {
    setTimeDifference(`${seconds} seconds ago`);
  } else if (minutes < 60) {
    setTimeDifference(`${minutes} minutes ago`);
  } else if (hours < 24) {
    setTimeDifference(`${hours} hours ago`);
  } else if (days < 6) {
    setTimeDifference(`${days} days ago`);
  } else if (days < 30) {
    setTimeDifference(`${months} months ago`);
  } else if (months < 12) {
    setTimeDifference(`${months} months ago`);
  } else {
    setTimeDifference(`${years} years ago`);
  }
};

export const getPagesLength = (
  itemsLength: number,
  totalItemsRequired: number
) => {
  const calculatedLength = Math.ceil(itemsLength / totalItemsRequired);
  return calculatedLength === 0 ? 1 : calculatedLength;
};

export const handleDownload = (file: File) => {
  const { extension, name } = getFileNameAndExtension(file.name);
  const fileUrl = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = name + "." + extension;
  link.target = "_blank";
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
};
export const getFileNameAndExtension = (fileName: string) => {
  const index = fileName.lastIndexOf(".");
  return {
    name: fileName.slice(0, index),
    extension: fileName.slice(index + 1),
  };
};

export const useHandleTokenExpiration = (
  expired: boolean,
  setExpired: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRefreshToken = async () => {
    try {
      const rf = localStorage.getItem(KEY_NAMES.refreshToken);
      const response = await refreshTokenAPI(rf);
      setExpired(!expired);
      const newAccessToken = response.data.data.authToken;
      const decoded = jwtDecode<jwtPayload>(newAccessToken);
      const newRefreshToken = decoded.refreshToken;
      localStorage.setItem(KEY_NAMES.accessToken, newAccessToken);
      localStorage.setItem(KEY_NAMES.refreshToken, newRefreshToken);

      dispatch(
        setLogin({
          isLoggedIn: true,
          accessToken: response.data.data.authToken,
          expiresIn: decoded.exp,
          refreshToken: decoded.refreshToken,
          refreshExpiresIn: decoded.exp,
          role: decoded.role,
          user: decoded,
        })
      );
    } catch (error) {
      dispatch(setLogout());
      navigate(PARENT_ROUTES.login);
    }
  };

  return handleRefreshToken;
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(KEY_NAMES.accessToken, token);
  store.dispatch(updateAccessToken(token));
};

export const getAmountFromPercentage = ({
  percentage,
  totalValue,
}: {
  percentage: number;
  totalValue: number;
}) => (percentage / 100) * totalValue;

export const encryptPassword = (password: string | Object) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(password),
    process.env.REACT_APP_SECRET_KEY || ""
  ).toString();
};

export const descryptPassword = (password: string) => {
  return CryptoJS.AES.decrypt(
    JSON.stringify(password),
    process.env.REACT_APP_SECRET_KEY || ""
  ).toString(CryptoJS.enc.Utf8);
};

export const hasScrolledtoEnd = (
  event: React.UIEvent<HTMLDivElement, UIEvent>,
  customCondition?: boolean
) => {
  const scrollHeight = event.currentTarget.scrollHeight; //220
  const scrollTop = event.currentTarget.scrollTop; //44
  const clientHeight = event.currentTarget.clientHeight; //176
  const difference = scrollHeight - scrollTop;
  if (Math.round(difference) === Math.round(clientHeight) && customCondition) {
    return true;
  }
};
export const getFullName = (
  firstName: string | undefined | null,
  lastName: string | undefined | null
) => {
  return `${firstName && firstName.length > 0 && firstName} ${
    lastName && lastName.length > 0 && lastName
  }`;
};
export const getDateFromTimestamp = (
  timestamp: string,
  includeTime?: boolean,
  separator?: string
) => {
  if (!isValidTimestamp(timestamp)) {
    return "Invalid Date";
  }

  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = MONTH_NAMES[date.getUTCMonth()];
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
  if (includeTime) {
    return `${day} ${month}, ${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  if (separator === "hyphen")
    return `${day} - ${date.getUTCMonth() + 1} - ${year}`;

  const formattedDate = `${day} ${month}, ${year}`;
  return formattedDate;
};

export const getCurrentFormattedDate = () =>
  getFormatedDateToDDMMYYYY(new Date());

export function formatTextToHTML(input: string): string {
  // Replace **...** with <b>...</b>
  let formattedText = input.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  // Replace *...* with <i>...</i>
  formattedText = formattedText.replace(/\*(.*?)\*/g, "<i>$1</i>");
  return formattedText;
}

export const convertStringToHTML = (htmlInString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlInString, "text/html");
  let sections: string[] = [];
  const elements = doc.getElementsByTagName("span");
  Array.from(elements).forEach((element) => {
    sections.push(element.outerHTML);
  });
  return sections;
};

export const getFormatedDateToDDMMYYYY = (date: Date): string => {
  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year: number = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
};

export const formatNumber = (num: number): number | string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num;
};

export const generateRandom = () => {
  const min = 10000000;
  const max = 99999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
