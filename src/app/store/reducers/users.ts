import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api";
import { initStateUsers, userDetailsType } from "../../types/userTypes";

// Constants
const initialState: initStateUsers = {
    loading: false,
    error: null,
    busLocations: { data: [], totalPages: 0, totalRecords: 0 },
    isUserLogin: false,
    currentUserDetail: null,
};
export const getSession = createAsyncThunk("location/getSession", async () => {
    const response = await axiosInstance.post(
        `/client/getsession`,
        {
            type: 1,
            connection: {
                "ip-address": "165.114.41.21",
                port: "5117",
            },
            browser: {
                name: "Chrome",
                version: "47.0.0.12",
            },
        },
        {
            headers: {
                Authorization: true,
            },
        },
    );
    try {
        return response;
    } catch (error: any) {
        return error.response;
    }
});
export const getBusLocations = createAsyncThunk("location/getBusLocations", async () => {
    const response = await axiosInstance.post(
        `/location/getbuslocations`,
        {
            data: null,
            "device-session": {
                "session-id": "QQk4IznuOP4y0BsrmamI1tYyuYCMj29+kPBhpCVcr/U=",
                "device-id": "11BBqme8k08euOz+SQeGfuwOwsPBoOBuw6t62Jj1A7o=",
            },
            date: "2024-10-10T11:33:00",
            language: "tr-TR",
        },
        {
            headers: {
                Authorization: true,
            },
        },
    );
    try {
        return response;
    } catch (error: any) {
        return error.response;
    }
});

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentUserDetails: (state, action: PayloadAction<userDetailsType>) => {
            state.currentUserDetail = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBusLocations.pending, (state) => {
                state.loading = false;
            })
            .addCase(getBusLocations.fulfilled, (state, action) => {
                state.loading = true;
                state.busLocations = action.payload;
            })
            .addCase(getBusLocations.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});
export const { setCurrentUserDetails } = usersSlice.actions;
export default usersSlice.reducer;
