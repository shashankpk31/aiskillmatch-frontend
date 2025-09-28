import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const { loggedin, token } = useAuth();
  const localToken = localStorage.getItem('token');
  const isAuthenticated = loggedin || !!localToken;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
