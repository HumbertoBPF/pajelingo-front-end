import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLanguages } from "api/languages";

export const fetchLanguages = createAsyncThunk(
  "languages/fetchLanguages",
  getLanguages
);
