import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PublicRoute = () => {
  const { loggedin } = useAuth();
  return !loggedin ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;