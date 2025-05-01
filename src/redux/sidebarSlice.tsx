import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SidebarSliceType = {
  isSidebarOpen: boolean;
};
const initialState: SidebarSliceType = {
  isSidebarOpen: false,
};
export const sidebarSlice = createSlice({
  name: "SidebarSlice",
  initialState: initialState,
  reducers: {
    setSidebarOpen: (_, action: PayloadAction<SidebarSliceType>) => {
      return {
        isSidebarOpen: action.payload.isSidebarOpen,
      };
    },
  },
});

export const { setSidebarOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
