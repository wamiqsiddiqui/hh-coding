import { Regional } from "../utils/languageHelpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "../i18n/config";
import { jwtPayload, LanguageType, RoleEnum } from "../types/generalTypes";

export type TLoginResponse = {
  user: {
    location: {
      coordinates: number[];
      type: string;
    };
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    emailAddress: string;
    password: string | null;
    phoneNo: string;
    role: RoleEnum.SUPER_ADMIN;
    profileImage: string | null;
    isActive: boolean;
    fcmToken: string;
    businessNameEn: string;
    businessNameAr: string;
    businessCategory: string;
    managerName: string;
    address: string;
    facebookLink: string;
    tikTokLink: string;
    instagramLink: string;
    websiteLink: string;
    boxOrBuilding: string;
    commercialRegNo: string;
    taxId: string;
    bankAccountNo: string;
    businessLicenseDoc: string;
    securityQuestion: string;
    securityQuestionAns: string;
    isAgreedOnTerms: boolean;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  authToken: string;
};
type TAuth = {
  isLoggedIn: boolean;
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
  role: string;
  user: jwtPayload | null;
  subRole?: string;
  language?: LanguageType;
};
const INITIAL_STATE: TAuth = {
  isLoggedIn: false,
  accessToken: "",
  expiresIn: 0,
  refreshExpiresIn: 0,
  refreshToken: "",
  role: "",
  user: null,
  subRole: "",
  language: "en" as LanguageType,
  // Change to this when displaying RTL again
  //  language: i18n.language as LanguageType,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setLogin: (state, action: PayloadAction<TAuth>) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.expiresIn = action.payload.expiresIn;
      state.refreshExpiresIn = action.payload.refreshExpiresIn;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
      state.user = action.payload.user;
      state.subRole = action.payload.subRole;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = "";
      state.expiresIn = 0;
      state.refreshExpiresIn = 0;
      state.refreshToken = "";
      state.role = "";
      state.user = null;
    },
    updateAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setLanguage: (state, action: PayloadAction<any>) => {
      const language = action.payload;
      state.language = language;
      Regional.language.set(localStorage.getItem("i18nextLng") ?? "en");
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { setLogin, setLogout, updateAccessToken, setLanguage } =
  authSlice.actions;
export default authSlice.reducer;
