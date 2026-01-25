import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    
    initialState: {
    isAuthenticated: false,
    data: [],
    loading: "idle",
},

reducers: {
    setAuthenticated(state, action) {
        state.isAuthenticated = action.payload;
    },

    setData(state, action) {
        state.data = action.payload;
    },

    setLoading(state, action) {
        state.loading = action.payload;
    },
},
});

export const { setAuthenticated, setData, setLoading } = authSlice.actions;

export default authSlice.reducer;
