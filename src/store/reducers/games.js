import { createSlice } from "@reduxjs/toolkit";
import { fetchGames } from "services/games";

const gamesSlice = createSlice({
    name: "games",
    initialState: {},
    extraReducers(builder) {
        builder
            .addCase(fetchGames.fulfilled, (state, action) => {
                const newState = {};
                const games = action.payload;

                games.forEach(game => {
                    newState[game.id] = game;
                });

                return newState;
            })
    }
});

const gamesSliceReducers = gamesSlice.reducer;

export default gamesSliceReducers;