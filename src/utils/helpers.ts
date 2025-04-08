import { AxiosError } from "axios";
import CryptoJS from "crypto-js";
// import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { refreshTokenAPI } from "../api/auth";
// import { GET_ROUTES } from "../api/media/routes";
import { PARENT_ROUTES } from "../parentRoutes";
import { setLogin, setLogout, updateAccessToken } from "../redux/auth";
import { store } from "../redux/store";
// import {
//   ActivitiesType,
//   ActivityTimelineKeysType,
// } from "../types/dashboardTypes";
import {
  ErrorMessageIncludesType,
  GeneralErrorType,
  // GetListingResponse,
  InputFieldType,
  jwtPayload,
} from "../types/generalTypes";
// import { JobByIdResponseType } from "../types/jobTypes";
// import { GetRatingsType } from "../types/ratingTypes";
// import { WorkExperiences } from "../types/sellerTypes";
import { KEY_NAMES, MONTH_NAMES } from "./constants";
import { isValidTimestamp } from "./validations";

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

export const hasBothDropdownTypeAndOptions = ({
  options,
  type,
}: {
  type: InputFieldType;
  options: { name: string; value?: string }[] | undefined;
}) => {
  if (type === "dropdown" && options === undefined) {
    throw new Error(`Please pass options if you're passing type = ${type}`);
  }
  if (options !== undefined && type !== "dropdown") {
    throw new Error(
      `Don't pass options unnecessarily if you're passing type = ${type}`
    );
  }
};
export const convertByteToMB = (byte: number): string => {
  const mbs = byte / (1000 * 1000);
  // if (mbs < 1) return 0.5;
  // else return mbs;
  return mbs.toPrecision(2);
};

// export function sortActivitiesByTimeline(
//   activities: ActivitiesType
// ): Record<string, ActivitiesType> {
//   const sortedActivities: Record<ActivityTimelineKeysType, ActivitiesType> = {
//     today: [],
//     yesterday: [],
//     twoDaysAgo: [],
//     withinAWeek: [],
//     oneWeekAgoOrMore: [],
//     oneMonthAgo: [],
//     moreThanAMonth: [],
//     oneYearAgo: [],
//     moreThanAYear: [],
//   };

//   activities.forEach((activity) => {
//     const category = getDateDifferenceDescription(activity.createdAt);
//     switch (category) {
//       case "today":
//         sortedActivities.today.push(activity);
//         break;
//       case "yesterday":
//         sortedActivities.yesterday.push(activity);
//         break;
//       case "twoDaysAgo":
//         sortedActivities.twoDaysAgo.push(activity);
//         break;
//       case "withinAWeek":
//         sortedActivities.withinAWeek.push(activity);
//         break;
//       case "oneWeekAgoOrMore":
//         sortedActivities.oneWeekAgoOrMore.push(activity);
//         break;
//       case "oneMonthAgo":
//         sortedActivities.oneMonthAgo.push(activity);
//         break;
//       case "moreThanAMonth":
//         sortedActivities.moreThanAMonth.push(activity);
//         break;
//       case "oneYearAgo":
//         sortedActivities.oneYearAgo.push(activity);
//         break;
//       default:
//         sortedActivities.moreThanAYear.push(activity);
//     }
//   });

//   return sortedActivities;
// }
// function getDateDifferenceDescription(
//   inputDate: string | Date
// ): ActivityTimelineKeysType {
//   const today = new Date();
//   const givenDate = new Date(inputDate);

//   // Calculate the difference in time
//   const diffInTime = today.getTime() - givenDate.getTime();

//   // Calculate the difference in days
//   const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

//   // Categorize the date difference
//   if (diffInDays === 0) {
//     return "today";
//   } else if (diffInDays === 1) {
//     return "yesterday";
//   } else if (diffInDays === 2) {
//     return "twoDaysAgo";
//   } else if (diffInDays > 2 && diffInDays < 7) {
//     return `withinAWeek`;
//   } else if (diffInDays >= 7 && diffInDays < 30) {
//     return "oneWeekAgoOrMore";
//   } else if (diffInDays === 31 || diffInDays === 30) {
//     return "oneMonthAgo";
//   } else if (diffInDays > 31 && diffInDays < 365) {
//     return "moreThanAMonth";
//   } else if (diffInDays === 365) {
//     return "oneYearAgo";
//   } else {
//     return "moreThanAYear";
//   }
// }

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
// export const getImageSrcFromMedia = (imageId: string) =>
//   `${process.env.REACT_APP_API_BASE_URL}${GET_ROUTES.getMedia}${imageId}`;

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
      const newAccessToken = response.data.access_token;
      const newRefreshToken = response.data.refresh_token;
      localStorage.setItem(KEY_NAMES.accessToken, newAccessToken);
      localStorage.setItem(KEY_NAMES.refreshToken, newRefreshToken);

      const decoded = jwtDecode<jwtPayload>(newAccessToken);
      dispatch(
        setLogin({
          isLoggedIn: true,
          accessToken: response.data.access_token,
          expiresIn: response.data.expires_in,
          refreshToken: response.data.refresh_token,
          refreshExpiresIn: response.data.refresh_expires_in,
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

export const getDuration = ({
  endDateMonth,
  endDateYear,
  startDateMonth,
  startDateYear,
}: {
  endDateMonth: string;
  endDateYear: string;
  startDateMonth: string;
  startDateYear: string;
}) => {
  if (endDateMonth.length === 0 || endDateYear.length === 0) {
    const monthIndex = MONTH_NAMES.indexOf(startDateMonth);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthsDifference = currentMonth - monthIndex;
    const yearsDifference = currentYear - Number(startDateYear);
    const totalMonths = yearsDifference * 12 + monthsDifference;
    return `${startDateMonth} ${startDateYear} - Present (${totalMonths} ${
      totalMonths > 1 ? "months" : "month"
    })`;
  } else {
    return `${startDateMonth} ${startDateYear} - ${endDateMonth} ${endDateYear}`;
  }
};
export const getStartingMonths = (startingYear: string) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const months = ["Please select month", ...MONTH_NAMES];
  if (!Number.isNaN(startingYear) && Number(startingYear) === currentYear) {
    const filteredMonths: {
      id: string;
      name: string;
    }[] = [];
    months.forEach((month, startingindex) => {
      if (startingindex <= currentMonth) {
        filteredMonths.push({ id: month, name: month });
      }
    });
    return filteredMonths;
  } else {
    return months.map((name) => {
      return { id: name, name: name };
    });
  }
};

export const getEndingMonths = ({
  endingYear,
  startingMonth,
  startingYear,
}: {
  startingMonth: string;
  startingYear: string;
  endingYear: string | undefined;
}) => {
  const months = ["Please select month", ...MONTH_NAMES];
  const monthsObj = months.map((name) => {
    return { id: name, name: name };
  });
  if (
    !startingMonth.includes("Please select") &&
    !startingYear.includes("Please select") &&
    endingYear !== undefined &&
    !endingYear.includes("Please select") &&
    startingYear === endingYear
  ) {
    const startingMonthIndex = months.indexOf(startingMonth);
    const filteredMonths: {
      id: string;
      name: string;
    }[] = [];
    monthsObj.forEach((month, endingMonthIndex) => {
      if (endingMonthIndex >= startingMonthIndex) {
        filteredMonths.push(month);
      }
    });
    return filteredMonths;
  } else {
    return monthsObj;
  }
};

export const getStartingYears = () => {
  const startYear = 1972;
  const currentYear = new Date().getFullYear();
  const endYear = currentYear;

  const years: number[] = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }
  const yearsObj = [
    {
      id: "Please select year",
      name: "Please select year",
    },
    ...years.map((year) => {
      return {
        id: year.toString(),
        name: year.toString(),
      };
    }),
  ];
  return yearsObj;
};

export const getEndingYears = (startingYear: number) => {
  const startYear = 1972;
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + 10;

  const years: number[] = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }
  const filteredYears: number[] = startingYear ? [] : years;
  years.forEach((year) => {
    if (startingYear <= year) {
      filteredYears.push(year);
    }
  });
  const filteredYearsObj = [
    {
      id: "Please select year",
      name: "Please select year",
    },
    ...filteredYears.map((year) => {
      return {
        id: year.toString(),
        name: year.toString(),
      };
    }),
  ];
  return filteredYearsObj;
};

export const getContractEndDate = (durationInMonths: number) => {
  const currentDate = new Date();

  // Add the given duration (in months) to the current date
  const endDate = new Date(
    currentDate.setMonth(currentDate.getMonth() + durationInMonths)
  );

  // Return the end date in a readable format (e.g., YYYY-MM-DD)
  return getFormatedDateToDDMMYYYY(endDate);
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

// export const formatJobTerritory = (jobData: JobByIdResponseType) => {
//   const countries = jobData?.teritory?.countries
//     ? jobData?.teritory?.countries.map((country) => country.countryName)
//     : [];
//   const cities = jobData?.teritory?.cities
//     ? jobData?.teritory?.cities.map((city) => city.cityName)
//     : [];

//   const countryString = countries.length > 0 ? countries.join(", ") : "-";
//   const cityString = cities.length > 0 ? cities.join(", ") : "-";

//   return `${countryString} / ${cityString}`;
// };

/**
 * Toggles the state of a modal, given its current state and a setter function
 * for that state.
 *
 * @param {boolean} currentState - The current state of the modal
 * @param {Dispatch<SetStateAction<boolean>>} toggleModal - The setter
 * function for the modal's state
 */
export const toggleModalState = (
  currentState: boolean,
  toggleModal: Dispatch<SetStateAction<boolean>>
) => {
  toggleModal(!currentState);
};

export const formatNumber = (num: number): number | string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num;
};

export enum VideoToFramesMethod {
  fps,
  totalFrames,
}

export class VideoToFrames {
  /**
   * Extracts frames from the video and returns them as an array of imageData
   * @param videoUrl url to the video file (html5 compatible format) eg: mp4
   * @param amount number of frames per second or total number of frames that you want to extract
   * @param type [fps, totalFrames] The method of extracting frames: Number of frames per second of video or the total number of frames acros the whole video duration. defaults to fps
   */
  public static getFrames(
    videoUrl: string,
    type: VideoToFramesMethod = VideoToFramesMethod.fps
  ): Promise<string> {
    return new Promise(
      (resolve: (frames: string) => void, _reject: (error: string) => void) => {
        let frames: string = "";
        let canvas: HTMLCanvasElement = document.createElement("canvas");
        let context = canvas.getContext("2d") as CanvasRenderingContext2D;
        // let duration: number;

        let video = document.createElement("video");
        video.preload = "auto";
        let that = this;
        video.addEventListener("loadeddata", async function () {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          // duration = video.duration;

          // let totalFrames: number = amount;
          if (type === VideoToFramesMethod.fps) {
            // totalFrames = duration * amount;
          }
          frames = await that.getVideoFrame(video, context, canvas, 1);
          resolve(frames);
        });
        video.src = videoUrl;
        video.load();
      }
    );
  }

  private static getVideoFrame(
    video: HTMLVideoElement,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    time: number
  ): Promise<string> {
    return new Promise(
      (resolve: (frame: string) => void, _reject: (error: string) => void) => {
        let eventCallback = () => {
          video.removeEventListener("seeked", eventCallback);
          this.storeFrame(video, context, canvas, resolve);
        };
        video.addEventListener("seeked", eventCallback);
        video.currentTime = time;
      }
    );
  }

  private static storeFrame(
    video: HTMLVideoElement,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    resolve: (frame: string) => void
  ) {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    resolve(canvas.toDataURL("image/png"));
  }
}

/**
 * Calculates the total years of experience from the given work experiences.
 * @param workExperiences array of work experiences, each containing startDate and endDate.
 * @returns a string representing the total years of experience, with one decimal place.
 * @example
 * const workExperiences = [
 *   { startDate: { year: 2015, month: 1 }, endDate: { year: 2017, month: 12 } },
 *   { startDate: { year: 2018, month: 1 } },
 * ];
 * useCalculateExperienceInYears(workExperiences); // returns "3.0"
 */
// export const useCalculateExperienceInYears = (
//   workExperiences: WorkExperiences[]
// ): string => {
//   return useMemo(() => {
//     const totalYears = workExperiences.reduce((sum, experience) => {
//       if (experience.startDate && experience.endDate) {
//         const start = dayjs(
//           `${experience.startDate.year}-${experience.startDate.month}`
//         );
//         const end = dayjs(
//           `${experience.endDate.year}-${experience.endDate.month}`
//         );
//         const differenceInYears = end.diff(start, "year", true);
//         return sum + differenceInYears;
//       } else if (experience.startDate && experience.endDate === undefined) {
//         const start = dayjs(
//           `${experience.startDate.year}-${experience.startDate.month}`
//         );
//         const end = dayjs();
//         const differenceInYears = end.diff(start, "year", true);
//         return sum + differenceInYears;
//       }
//       return sum;
//     }, 0);

//     return parseFloat(totalYears.toFixed(1)).toString();
//   }, [workExperiences]); // Memoize based on workExperiences
// };

export const generateRandom = () => {
  const min = 10000000;
  const max = 99999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Checks if the error message includes any of the strings in the conditions array
 * and returns the corresponding returnText if a match is found. If no match is
 * found, it returns the original error message.
 * @param error the original error message
 * @param conditions an array of objects containing the strings to be checked in
 * the error message and the corresponding text to be returned if a match is found.
 * If this parameter is not provided or is an empty array, the function returns the
 * original error message.
 * @example 
 * const error = displayErrorMessage(
                        typedError?.response?.data?.message!,
                        [
                          {
                            includes: "has been closed",
                            returnText: "This job is no longer active",
                          },
                        ]
                      )
 * @returns the error message if no match is found, otherwise the returnText
 * corresponding to the first match found.
 */
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

export const toggleModal = (
  currentState: boolean,
  toggleModal: Dispatch<SetStateAction<boolean>>
) => {
  toggleModal(!currentState);
};

/**
 * Combine multiple boolean loading states into a single boolean and an array of the original states.
 * @example
 * const { isLoading, loadingStates } = useCombinedLoadingStates(
 *   isFetchingJobs,
 *   isFetchingApplications,
 * )
 * // isLoading is true if any of the loading states are true, and loadingStates is [isFetchingJobs, isFetchingApplications]
 * @param {...boolean[]} loadingStates - Multiple boolean states to combine
 * @returns {{ isLoading: boolean, loadingStates: boolean[] }} - An object with isLoading and an array of the original states
 */
export const useCombinedLoadingStates = (...loadingStates: boolean[]) => {
  const isLoading = useMemo(
    () => loadingStates.some((state) => state),
    [loadingStates]
  );

  return useMemo(
    () => ({ isLoading, loadingStates }),
    [isLoading, loadingStates]
  );
};

/**
 * Takes an unknown error and attempts to convert it to an AxiosError<GeneralErrorType>
 * This can then be used with displayErrorMessage
 * @param error - The error to convert
 * @returns The converted error if it is an AxiosError<GeneralErrorType>, or null if it is not
 */
export const convertToGeneralError = (error: unknown) => {
  const typedError: AxiosError<GeneralErrorType> | null =
    error as AxiosError<GeneralErrorType> | null;

  return typedError;
};

/**
 * Generate an array of numbers from (pageNumber - 1) * 10 + 1 to pageNumber * 10
 * Used for generating indexes for different pages of pagination component
 *
 * For example, indexes will go from 10-19 if pageNumber is 2 and
 * number of items on a page is 9
 * @param pageNumber - The page number to generate the array for
 * @returns The array of numbers
 */
export const getListingIndexes = (pageNumber: number) => {
  const startIndex = (pageNumber - 1) * 9;
  return Array.from({ length: 10 }, (_, i) => startIndex + i + 1);
};

/**
 * Calculate the average rating from a list of ratings
 * @param data - The list of ratings. This should be a GetListingResponse
 *               where the rows are GetRatingsType objects
 * @returns An object with two properties: rating, which is the average
 *          rating, and count, which is the total number of ratings
 */
// export const calculateAverageRating = (
//   data: GetListingResponse<GetRatingsType[]>
// ): { rating: number; count: number } => {
//   const stars = data.rows.map((row) => row.stars); // Extract star ratings
//   const totalStars = stars.reduce((acc, curr) => acc + curr, 0); // Sum of all stars
//   const averageStars = totalStars / data.total; // Calculate average
//   return { rating: averageStars, count: data.total };
// };
