import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { InitJourney } from "../../types/journey.types";
import type { ISessionPayload } from "../../types/user.types";

// Initial State
const initialState: InitJourney = {
    loading: false,
    error: null,
    journeys: [],
};

export const getJourneys = createAsyncThunk("journey/getJourneys", async (payload: ISessionPayload) => {
    try {
        const response = await fetch("/api/journey/getbusjourneys", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${process.env.REACT_APP_API_CLIENT_TOKEN}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        return data;
    } catch (error: any) {
        return error.response;
    }
});

export const journeysSlice = createSlice({
    name: "journeys",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getJourneys.pending, (state) => {
                state.loading = false;
            })
            .addCase(getJourneys.fulfilled, (state, action) => {
                state.loading = true;
                state.journeys = action.payload.data;
            })
            .addCase(getJourneys.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default journeysSlice.reducer;
