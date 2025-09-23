import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import MainLayout from '../components/layout/MainLayout';

// Lazy load pages
const HomePage = lazy(() => import('../pages/common/HomePage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const JobPage = lazy(() => import('../pages/jobs/JobPage'));
const PasswordResetRequestPage = lazy(() => import('../pages/auth/PasswordResetRequestPage'));
const PasswordResetPage = lazy(() => import('../pages/auth/PasswordResetPage'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<PasswordResetRequestPage />} />
          <Route path="/reset-password/:token" element={<PasswordResetPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/jobs/:id" element={<JobPage />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;