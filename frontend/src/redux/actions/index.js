// import axios from "axios";

// export const login = (email, password) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:3001/api/v1/user/login",
//       { email, password }
//     );
//     dispatch({ type: "LOGIN_SUCCESS", payload: response.data.body.token });
//   } catch (error) {
//     dispatch({ type: "LOGIN_FAILURE", payload: error.message });
//   }
// };

// export const logout = () => ({ type: "LOGOUT" });
