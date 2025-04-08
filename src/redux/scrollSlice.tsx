import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ScrollSliceType = {
  onScroll: null | ((event: React.UIEvent<HTMLDivElement, UIEvent>) => void);
};
const initialState: ScrollSliceType = {
  onScroll: null,
};
export const scrollSlice = createSlice({
  name: "ScrollSlice",
  initialState: initialState,
  reducers: {
    setScroll: (_, action: PayloadAction<ScrollSliceType>) => {
      return {
        onScroll: action.payload.onScroll,
      };
    },
  },
});

export const { setScroll } = scrollSlice.actions;
export default scrollSlice.reducer;
