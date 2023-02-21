import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "./base";

export const fetchRankings = createAsyncThunk(
    "rankings/fetchRankings",
    async payload => {
        let url = `${baseUrl}/rankings/?language=${payload.language}`;
        let page = 1;
    
        if (payload.user) {
            url += `&user=${payload.user}`
        }
    
        if (payload.page) {
            url += `&page=${payload.page}`;
            page = payload.page;
        }

        const response = await fetch(url);
        const data = await response.json();
        data.page = page;
        return data;
    }
);