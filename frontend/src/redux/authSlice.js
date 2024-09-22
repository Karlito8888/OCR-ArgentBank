// src/redux/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

// Actions asynchrones
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });
      const token = response.data.body.token;
      localStorage.setItem("token", token); // Stockez le token ici
      // Récupérez le profil utilisateur avec le token
      await dispatch(getUserProfile(token)); // Assurez-vous d'utiliser dispatch ici
      return token; // Retourner le token
    } catch (error) {
      return rejectWithValue(error.response.data.message);
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
      return response.data.body; // Retourner les infos utilisateur (userName, firstName, etc.)
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Action pour mettre à jour le profil utilisateur
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ token, userName }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/user/profile`,
        { userName }, // Envoyer le nouveau nom d'utilisateur dans le corps de la requête
        {
          headers: {
            Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
          },
        }
      );
      return response.data.body; // Retourner les nouvelles informations du profil mises à jour
    } catch (error) {
      return rejectWithValue(error.response.data.message); // Gérer les erreurs
    }
  }
);

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"), // Vérifie la présence du token
  userName: "",
  firstName: "",
  lastName: "",
  token: localStorage.getItem("token"), // Stocke le token si présent
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
      state.lastName = "";
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;state.token = action.payload;
        localStorage.setItem("token", action.payload);
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Gestion de l'action updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
