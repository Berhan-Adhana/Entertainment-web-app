import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { accessToken } = useSelector((state) => state.loggedUser.user);
  let location = useLocation();
  if (!accessToken) {
    return <Navigate to="auth/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoutes;
