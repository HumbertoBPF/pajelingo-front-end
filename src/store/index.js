import { configureStore } from "@reduxjs/toolkit";
import languagesSliceReducers from "./reducers/languages";
import tokenSliceReducer from "./reducers/user";

const store = configureStore({
    reducer: {
        languages: languagesSliceReducers,
        user: tokenSliceReducer
    }
});

export default store;