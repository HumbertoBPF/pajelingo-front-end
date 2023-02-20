import { configureStore } from "@reduxjs/toolkit";
import languagesSliceReducers from "./reducers/languages";

const store = configureStore({
    reducer: {
        languages: languagesSliceReducers
    }
});

export default store;