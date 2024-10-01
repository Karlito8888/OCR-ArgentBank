// authActions.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:3001/api/v1";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("Email:", email, "Password:", password);
      const { data } = await axios.post(
        `${backendURL}/user/login`,
        { email, password },
        config
      );
      console.log("Réponse de l'API:", data);
      localStorage.setItem("userToken", data.body.token);
      return data;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
       if (!token) throw new Error("Utilisateur non authentifié");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${backendURL}/user/profile`, config
    );

      console.log("Profil de l'utilisateur:", data);
      return data.body;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ userName }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Utilisateur non authentifié");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${backendURL}/user/profile`,
        { userName },
        config
      );

      return data.body;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// export const registerUser = createAsyncThunk(
//   "user/signup",
//   async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       await axios.post(
//         `${backendURL}/user/signup`,
//         { firstName, lastName, email, password },
//         config
//       );
//     } catch (error) {
//       // return custom error message from backend if present
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );


