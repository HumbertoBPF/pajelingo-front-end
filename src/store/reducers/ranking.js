import { createSlice } from "@reduxjs/toolkit";
import { fetchRankings } from "services/rankings";

const rankingSlice = createSlice({
    name: "ranking",
    initialState: {
        page: 1,
        previous: null,
        next: null,
        count: 0,
        results: []
    },
    extraReducers(builder) {
        builder
            .addCase(fetchRankings.fulfilled, (state, action) => {
                return action.payload;
            })
    }
});

const rankingsSliceReducers = rankingSlice.reducer;
export default rankingsSliceReducers;