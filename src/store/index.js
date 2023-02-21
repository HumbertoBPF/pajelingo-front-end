import { configureStore } from "@reduxjs/toolkit";
import languagesSliceReducers from "./reducers/languages";
import rankingsSliceReducers from "./reducers/ranking";

const store = configureStore({
    reducer: {
        languages: languagesSliceReducers,
        ranking: rankingsSliceReducers
    }
});

export default store;