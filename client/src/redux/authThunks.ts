import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/Axios";

interface RegisterPayload {
  user: string;
  email: string;
  password: string;
}
interface LoginPayload {
  email: string;
  password: string;
}
interface AuthResponse {
  message: string;
  token: string;
  user: string;
}

const AUTH_URL = "/auth";

// REGISTER
export const registerUser = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: string }>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await API.post<AuthResponse>(`${AUTH_URL}/register`, data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || "Register failed");
  }
});

// LOGIN
export const loginUser = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: string }>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await API.post<AuthResponse>(`${AUTH_URL}/login`, data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || "Login failed");
  }
});

// LOGOUT
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await API.post(`${AUTH_URL}/logout`);
  localStorage.removeItem("token");
  return {};
});
