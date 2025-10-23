
import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
    employeeID: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

interface RegisterPayload {
    employeeID: string;
    name: string;
    email: string;
    password: string;
}

interface LoginPayload {
    employeeID: string;
    password: string;
}


const API_URL = "https://your-backend.com/api/auth"; 

const registerUser = async (data: RegisterPayload) => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
};

const loginUser = async (data: LoginPayload) => {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
};



const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};


export const register = createAsyncThunk(
    "auth/register",
    async (payload: RegisterPayload, { rejectWithValue }) => {
        try {
            return await registerUser(payload);
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Registration failed");
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (payload: LoginPayload, { rejectWithValue }) => {
        try {
            return await loginUser(payload);
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
