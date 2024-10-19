import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initStateUsers } from "../../types/userTypes";

// Constants
const initialState: initStateUsers = {
    loading: false,
    error: null,
    sessions: { status: "" },
};
export const getSession = createAsyncThunk("location/getSession", async (data: any) => {
    try {
        const response = await fetch("/api/client/getsession", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${process.env.REACT_APP_API_CLIENT_TOKEN}`,
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res;
    } catch (error: any) {
        return error.response;
    }
});

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSession.pending, (state) => {
                state.loading = false;
            })
            .addCase(getSession.fulfilled, (state, action) => {
                state.loading = true;
                state.sessions = action.payload;
            })
            .addCase(getSession.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});
export default usersSlice.reducer;
