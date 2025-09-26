import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PublicRoute = () => {
  const { user } = useAuth();  
  return !user || user==null ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;