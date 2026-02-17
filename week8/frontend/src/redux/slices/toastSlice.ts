
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction  } from "@reduxjs/toolkit";

type ToastState = {
  message: string | null;
};

const initialState: ToastState = {
  message: null
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    hideToast: (state) => {
      state.message = null;
    }
  }
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
