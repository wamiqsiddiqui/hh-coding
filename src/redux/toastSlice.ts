import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastType } from "../types/generalTypes";

const initialState: ToastType = {
  text: "",
  variant: "success",
};
export const toastSlice = createSlice({
  name: "ToastSlice",
  initialState: initialState,
  reducers: {
    setToast: (_, action: PayloadAction<ToastType>) => {
      return {
        text: action.payload.text,
        variant: action.payload.variant,
      };
    },
  },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
