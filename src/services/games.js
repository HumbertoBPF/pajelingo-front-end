import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGames } from "api/games";

export const fetchGames = createAsyncThunk("games/fetchGames", getGames);
