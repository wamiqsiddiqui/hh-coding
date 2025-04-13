import { JwtPayload } from "jwt-decode";

import { FileWithPath } from "react-dropzone";

export type ToastType = {
  text: string;
  variant: "success" | "error" | "warning";
};
export type WizardStepType = {
  title: string;
  countTitle: string;
  fieldNames: string[];
  customValidation: () => boolean;
};
export type ColumnsType = {
  name: string;
  bgColor?: string;
  maxWidth?: string;
  columnsSpan?: boolean;
  textStart?: boolean;
  sortKey?: string;
  textColor?: "text-custom-green" | "text-text-black";
}[];

export type ChipColorVariant = "blue" | "green" | "gray" | "gold";
export enum SortOrder {
  Ascending = 1,
  Descending = -1,
}
export type FileInfoProps = {
  fileId?: string;
  src?: string;
  filename: string;
  fileWithPath?: FileWithPath | undefined;
  size: string;
  onDeleteClick?: () => void;
};

export type ImageExtensionType =
  | ".png"
  | ".pdf"
  | ".jpeg"
  | ".jpg"
  | ".pptx"
  | ".docs"
  | ".docx"
  | undefined;

export type GetListingResponse<T, TCounts = undefined> = {
  rows: T;
  total: number;
  size: number;
  page: number;
  counts?: TCounts;
};

export type SortType = {
  field: string;
  order: SortOrder;
};

export type MediaTypeResponse = {
  message: MediaType[];
  isSuccessful: boolean;
};

export type MediaType = {
  filename: string;
  fileId: string;
  uploadedFileName: string;
  code: number;
  message: string;
};

export enum RoleEnum {
  SERVICE_PROVIDER = "SERVICE_PROVIDER",
}
export type DropdownType = { id: string; name: string };
export type MultiSelectDropdownType = { id: string; name: string }[];

export type RegisterUserResponse = {
  userId: string;
  message: string;
};

export type attributesType = {
  [key: string]: Object;
};

export type currencyType = string;

export type InputFieldType =
  | "email"
  | "password"
  | "text"
  | "number"
  | "dropdown"
  | "tel";

export type jwtPayload = {
  userId: string;
  role: string;
  refreshToken: string;
  iat: number;
  exp: number;
} & JwtPayload;

export type ImageFileType = {
  imageId?: string;
  fileWithPath?: FileWithPath;
  src?: string;
  name?: string;
  size?: string;
} | null;

export type GeneralModalType = ButtonFunctionType & {
  text: string;
  proceedButtonText: string;
  proceedButtonColor: "green" | "red";
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  closeModal: () => void;
  reset: () => void;
  successText: string;
  errorText?: string;
  retry?: boolean;
};

export type CancelConfirmationModalType = ButtonFunctionType & {
  text?: string;
  proceedButtonText?: string;
  proceedButtonColor?: "green" | "red";
  confirmDisabled?: boolean;
  cancelButtonText?: string;
  errorIcon?: boolean;
};

export type ButtonFunctionType = {
  cancel: () => void;
  proceed?: () => void;
};

export type PaddingType =
  | "p-0"
  | "p-1"
  | "p-2"
  | "p-3"
  | "p-4"
  | "p-5"
  | "p-6"
  | "p-7"
  | "p-8"
  | "p-9"
  | "p-10"
  | "p-12"
  | "p-14"
  | "p-16"
  | "p-20"
  | "p-24"
  | "p-28"
  | "p-32"
  | "p-36"
  | "p-40"
  | "p-44"
  | "p-48"
  | "p-52"
  | "p-56"
  | "p-60"
  | "p-64"
  | "p-72"
  | "p-80"
  | "p-96"
  | "p-[10%]"
  | "p-[20%]"
  | "p-[30%]"
  | "p-[40%]"
  | "p-[50%]"
  | "p-[60%]"
  | "p-[70%]"
  | "p-[80%]"
  | "p-[85%]"
  | "p-[90%]"
  | "p-full"
  | "p-screen"
  | "p-auto"
  | "px-0"
  | "px-1"
  | "px-2"
  | "px-3"
  | "px-4"
  | "px-5"
  | "px-6"
  | "px-7"
  | "px-8"
  | "px-9"
  | "px-10"
  | "px-12"
  | "px-14"
  | "px-16"
  | "px-20"
  | "px-24"
  | "px-28"
  | "px-32"
  | "px-36"
  | "px-40"
  | "px-44"
  | "px-48"
  | "px-52"
  | "px-56"
  | "px-60"
  | "px-64"
  | "px-72"
  | "px-80"
  | "px-96"
  | "px-[10%]"
  | "px-[20%]"
  | "px-[30%]"
  | "px-[40%]"
  | "px-[50%]"
  | "px-[60%]"
  | "px-[70%]"
  | "px-[80%]"
  | "px-[85%]"
  | "px-[90%]"
  | "px-full"
  | "px-screen"
  | "px-auto"
  | "p-0"
  | "py-1"
  | "py-2"
  | "py-3"
  | "py-4"
  | "py-5"
  | "py-6"
  | "py-7"
  | "py-8"
  | "py-9"
  | "py-10"
  | "py-12"
  | "py-14"
  | "py-16"
  | "py-20"
  | "py-24"
  | "py-28"
  | "py-32"
  | "py-36"
  | "py-40"
  | "py-44"
  | "py-48"
  | "py-52"
  | "py-56"
  | "py-60"
  | "py-64"
  | "py-72"
  | "py-80"
  | "py-96"
  | "py-[10%]"
  | "py-[20%]"
  | "py-[30%]"
  | "py-[40%]"
  | "py-[50%]"
  | "py-[60%]"
  | "py-[70%]"
  | "py-[80%]"
  | "py-[85%]"
  | "py-[90%]"
  | "py-full"
  | "py-screen"
  | "py-auto";
export type HeightType =
  | "h-0"
  | "h-1"
  | "h-2"
  | "h-3"
  | "h-4"
  | "h-5"
  | "h-6"
  | "h-7"
  | "h-8"
  | "h-9"
  | "h-10"
  | "h-12"
  | "h-14"
  | "h-16"
  | "h-20"
  | "h-24"
  | "h-28"
  | "h-32"
  | "h-36"
  | "h-40"
  | "h-44"
  | "h-48"
  | "h-52"
  | "h-56"
  | "h-60"
  | "h-64"
  | "h-72"
  | "h-80"
  | "h-96"
  | "h-[10%]"
  | "h-[20%]"
  | "h-[30%]"
  | "h-[40%]"
  | "h-[50%]"
  | "h-[60%]"
  | "h-[70%]"
  | "h-[80%]"
  | "h-[85%]"
  | "h-[90%]"
  | "h-full"
  | "h-screen"
  | "h-auto";

export type WidthType =
  | "w-0"
  | "w-1"
  | "w-2"
  | "w-3"
  | "w-4"
  | "w-5"
  | "w-6"
  | "w-7"
  | "w-8"
  | "w-9"
  | "w-10"
  | "w-12"
  | "w-14"
  | "w-16"
  | "w-20"
  | "w-24"
  | "w-28"
  | "w-32"
  | "w-36"
  | "w-40"
  | "w-44"
  | "w-48"
  | "w-52"
  | "w-56"
  | "w-60"
  | "w-64"
  | "w-72"
  | "w-80"
  | "w-96"
  | "w-[10%]"
  | "w-[20%]"
  | "w-[30%]"
  | "w-[40%]"
  | "w-[50%]"
  | "w-[60%]"
  | "w-[70%]"
  | "w-[80%]"
  | "w-[85%]"
  | "w-[85%] max-md:w-[75%]"
  | "w-[90%]"
  | "w-[95%]"
  | "w-full"
  | "w-screen"
  | "w-[20%] max-md:w-full"
  | "w-auto";

export type MarginTopType =
  | "mt-0"
  | "mt-1"
  | "mt-2"
  | "mt-3"
  | "mt-4"
  | "mt-5"
  | "mt-6"
  | "mt-7"
  | "mt-8"
  | "mt-9"
  | "mt-10"
  | "mt-12";

export type MarginVerticalType =
  | "my-0"
  | "my-1"
  | "my-2"
  | "my-3"
  | "my-4"
  | "my-5"
  | "my-6"
  | "my-7"
  | "my-8"
  | "my-9"
  | "my-10"
  | "my-12";
export type MarginHorizontalType =
  | "mx-0"
  | "mx-1"
  | "mx-2"
  | "mx-3"
  | "mx-4"
  | "mx-5"
  | "mx-6"
  | "mx-7"
  | "mx-8"
  | "mx-9"
  | "mx-10"
  | "mx-12";

export type MarginBottomType =
  | "mb-0"
  | "mb-1"
  | "mb-2"
  | "mb-3"
  | "mb-4"
  | "mb-5"
  | "mb-6"
  | "mb-7"
  | "mb-8"
  | "mb-9"
  | "mb-10"
  | "mb-12";
export type MarginRightType =
  | "mr-0"
  | "mr-1"
  | "mr-2"
  | "mr-3"
  | "mr-4"
  | "mr-5"
  | "mr-6"
  | "mr-7"
  | "mr-8"
  | "mr-9"
  | "mr-10"
  | "mr-12";
export type MarginLeftType =
  | "ml-0"
  | "ml-1"
  | "ml-2"
  | "ml-3"
  | "ml-4"
  | "ml-5"
  | "ml-6"
  | "ml-7"
  | "ml-8"
  | "ml-9"
  | "ml-10"
  | "ml-12";
export type SuccessAndErrorModalType = {
  text: string;
  loading: boolean;
  isSuccess: boolean;
  successButtonText?: string;
  isError: boolean;
  retry: () => void;
  retryButton?: boolean;
  proceed: () => void;
  cancel: () => void;
  buttonText?: string;
  subtext?: string;
  defaultText?: boolean;
};

export interface Attributes {
  [key: string]: string | Object;
}

export type ErrorMessageIncludesType = {
  includes: string;
  returnText: string;
};

export enum DealStatus {
  PENDING = "PENDING",
  INPROGRESS = "INPROGRESS",
  PROPOSALSENT = "PROPOSALSENT",
  PROPOSALREJECTED = "PROPOSALREJECTED",
  REVIEW = "REVIEW",
  REJECTED = "REJECTED",
  APPROVAL = "APPROVAL",
  DISAPPROVED = "DISAPPROVED",
  COMPLETED = "COMPLETED",
}

export type GeneralErrorType = {
  code: number;
  time: string;
  message: string;
};

export type TransactionDataType = {
  status?: TransactionStatus;
  amount?: number;
  currency?: string;
  entityType?: string;
  entityId?: string;
};

export enum TransactionStatus {
  PAID = "paid",
  FAILED = "failed",
}

export type SetFieldValueType = (
  field: string,
  value: any,
  shouldValidate?: boolean
) => void;

export enum PermissionsEnum {
  Create = "Create",
  View = "View",
  Edit = "Edit",
  Delete = "Delete",
}

export type LanguageType = "en" | "ar";
