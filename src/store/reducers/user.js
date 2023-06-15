import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "services/user";

const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem("user")),
  reducers: {
    saveToken: (state, action) => {
      localStorage.setItem("user", JSON.stringify({ token: action.payload }));
      return JSON.parse(localStorage.getItem("user"));
    },
    deleteUser: () => {
      localStorage.removeItem("user");
      return null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const tokenSliceReducer = userSlice.reducer;
export const { saveToken, deleteUser } = userSlice.actions;
export default tokenSliceReducer;
