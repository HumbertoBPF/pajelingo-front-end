import { configureStore } from "@reduxjs/toolkit";
import languagesSliceReducers from "./reducers/languages";
import tokenSliceReducer from "./reducers/user";
import gamesSliceReducers from "./reducers/games";

const store = configureStore({
  reducer: {
    languages: languagesSliceReducers,
    user: tokenSliceReducer,
    games: gamesSliceReducers,
  },
});

export default store;
