import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  message: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      (state.loading = false), (state.error = false);
    },
    signInFailure: (state, action) => {
      (state.loading = false),
        (state.error = action.payload.success),
        (state.message = action.payload.message);
    },
  },
});
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
