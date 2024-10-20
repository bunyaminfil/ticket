import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { InitLocation } from "../../types/location.types";
import type { ISessionPayload } from "../../types/user.types";

// Initial State
const initialState: InitLocation = {
    loading: false,
    error: null,
    busLocations: [],
};

export const getBusLocations = createAsyncThunk("location/getBusLocations", async (payload: ISessionPayload) => {
    try {
        const response = await fetch("/api/location/getbuslocations", {
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

export const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBusLocations.pending, (state) => {
                state.loading = false;
            })
            .addCase(getBusLocations.fulfilled, (state, action) => {
                state.loading = true;
                state.busLocations = action.payload.data;
            })
            .addCase(getBusLocations.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default locationsSlice.reducer;
