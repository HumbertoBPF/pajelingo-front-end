import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "./base";

export const fetchLanguages = createAsyncThunk(
    "languages/fetchLanguages",
    async () => {
        let response =  await fetch(`${baseUrl}/languages`);
        const data = await response.json();
        return data;
    })