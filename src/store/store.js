import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenSliceReducer from "./reducers/user";
import gamesSliceReducers from "./reducers/games";
import languagesSliceReducers from "./reducers/languages";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  languages: languagesSliceReducers,
  user: tokenSliceReducer,
  games: gamesSliceReducers
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};
