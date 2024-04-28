import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    signinFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signinFail, signinStart, signinSuccess } = userSlice.actions;
export default userSlice.reducer;
