import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitJourney } from "../../types/journeyTypes";
import { ISessionPayload } from "../../types/userTypes";

// Constants
const initialState: IInitJourney = {
    loading: false,
    error: null,
    journeys: [],
};

export const getJourneys = createAsyncThunk("location/getJourneys", async (payload: ISessionPayload) => {
    const response = await fetch("/api/journey/getbusjourneys", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.REACT_APP_API_CLIENT_TOKEN}`,
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();
    try {
        return data;
    } catch (error: any) {
        return error.response;
    }
});

export const locationsSlice = createSlice({
    name: "locations",
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

export default locationsSlice.reducer;
