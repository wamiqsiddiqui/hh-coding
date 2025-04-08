import { Regional } from "../utils/languageHelpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "../i18n/config";
import { jwtPayload, LanguageType, RoleEnum } from "../types/generalTypes";

export type TLoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  session_state: string;
  subRole?: string;
  merchantId?: string;
  permissions?: {
    [key: string]: string[];
  };
};
type TAuth = {
  isLoggedIn: boolean;
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
  role: RoleEnum | string;
  user: jwtPayload | null;
  subRole?: string;
  permissions?: {
    [key: string]: string[];
  };
  merchantId?: string;
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
  permissions: {},
  merchantId: "",
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
      state.permissions = action.payload.permissions;
      state.merchantId = action.payload.merchantId;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = "";
      state.expiresIn = 0;
      state.refreshExpiresIn = 0;
      state.refreshToken = "";
      state.role = "";
      state.user = null;
      state.permissions = {};
    },
    updateAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setLanguage: (state, action: PayloadAction<any>) => {
      const language = action.payload;
      state.language = language;
      Regional.language.set(localStorage.getItem("i18nextLng") ?? "en");
      // if (state.language !== action.payload) {
      i18n.changeLanguage(action.payload);

      // }
    },
  },
});

export const { setLogin, setLogout, updateAccessToken, setLanguage } =
  authSlice.actions;
export default authSlice.reducer;
