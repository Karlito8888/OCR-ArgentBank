// src/redux/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

// Actions asynchrones
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });
      return response.data.body.token; // Retourner le token
    } catch (error) {
      return rejectWithValue(error.response.data.message); // Retourner le message d'erreur
    }
  }
);

// Action pour récupérer le profil utilisateur
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Utiliser le token pour l'appel API
        },
      });
      console.log("User Profile Response:", response.data.body);
      return response.data.body; // Retourner les infos utilisateur (userName, firstName, etc.)
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  userName: "",
  firstName: "",
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = "";
      state.firstName = "";
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        // Mettre à jour les informations utilisateur
        state.userName = action.payload.userName;
        state.firstName = action.payload.firstName;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
