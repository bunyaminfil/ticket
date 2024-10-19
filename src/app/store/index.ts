import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/users";
import locationsReducer from "./reducers/locations";
import journeysReducer from "./reducers/journeys";

export const store = configureStore({
    reducer: {
        usersReducer,
        locationsReducer,
        journeysReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
