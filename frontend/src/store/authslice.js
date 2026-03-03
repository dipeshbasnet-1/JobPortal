import { createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../api";

const STATUS = {
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: !!localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user")) || null, 
        token: localStorage.getItem("token") || "",
        loading: STATUS.IDLE,
        error: null,
    },
    
    reducers: {
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
        
        setUser(state, action) { 
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        
        setLoading(state, action) {
            state.loading = action.payload;
        },
        
        setError(state, action) {
            state.error = action.payload;
        },
        
        logoutUser(state) {
            state.isAuthenticated = false;
            state.user = null; // changed from data -> user
            state.token = "";
            state.loading = STATUS.IDLE;
            state.error = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const { setAuthenticated, setUser, setLoading, setError, setToken, logoutUser } = authSlice.actions;

export default authSlice.reducer;

// REGISTER USER
export function registerUser(userData) {
    return async function registerUserThunk(dispatch) {
        dispatch(setLoading(STATUS.LOADING));
        dispatch(setError(null));
        
        if (!userData.userEmail || !userData.userPassword || !userData.username || !userData.userRole) {
            dispatch(setError("All fields are required including role"));
            dispatch(setLoading(STATUS.ERROR));
            return;
        }
        
        try {
            const response = await apiClient.post("/api/auth/register", userData);
            
            if (response.status === 201) {
                dispatch(setLoading(STATUS.SUCCESS));
                alert("Registration successful! Please login.");
            } else {
                dispatch(setError("Registration failed"));
                dispatch(setLoading(STATUS.ERROR));
            }
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Something went wrong"));
            dispatch(setLoading(STATUS.ERROR));
        }
    };
}

//  LOGIN USER 
export function loginUser(userData) {
    return async function loginUserThunk(dispatch) {
        dispatch(setLoading(STATUS.LOADING));
        dispatch(setError(null));
        
        if (!userData.userEmail || !userData.userPassword) {
            dispatch(setError("Email and Password are required"));
            dispatch(setLoading(STATUS.ERROR));
            return;
        }
        
        try {
            const response = await apiClient.post("/api/auth/login", userData);
            
            if (response.status === 200) {
                dispatch(setUser(response.data.user)); // userRole included from backend
                dispatch(setToken(response.data.token));
                dispatch(setAuthenticated(true));
                dispatch(setLoading(STATUS.SUCCESS));
            } else {
                dispatch(setError("Invalid credentials"));
                dispatch(setLoading(STATUS.ERROR)); 
            }
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login failed"));
            dispatch(setLoading(STATUS.ERROR));
        }
    };
}