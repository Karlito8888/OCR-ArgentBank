import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const userToken = useSelector((state) => state.user.userToken);

  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
