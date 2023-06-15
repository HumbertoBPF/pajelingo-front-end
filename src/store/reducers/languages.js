import { createSlice } from "@reduxjs/toolkit";
import { fetchLanguages } from "services/languages";

const languagesSlice = createSlice({
  name: "languages",
  initialState: [],
  extraReducers(builder) {
    builder.addCase(fetchLanguages.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

const languagesSliceReducers = languagesSlice.reducer;

export default languagesSliceReducers;
