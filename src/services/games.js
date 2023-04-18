import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "./base";

export const fetchGames = createAsyncThunk(
    "games/fetchLanguages",
    async () => {
        let response =  await fetch(`${baseUrl}/games`);
        const data = await response.json();
        return data;
    })