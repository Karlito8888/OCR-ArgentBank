import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const userToken = useSelector((state) => state.user.userToken);

  if (!userToken) {
    // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    return <Navigate to="/login" />;
  }

  return children; // Rendre les enfants si l'utilisateur est authentifié
};

export default ProtectedRoute;
