import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import LandingPageLayout from "../components/layout/LandingPageLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import WelcomePage from "../pages/auth/WelcomePage";

// Lazy load pages
const HomePage = lazy(() => import("../pages/common/HomePage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const JobPage = lazy(() => import("../pages/jobs/JobPage"));
const PasswordResetRequestPage = lazy(() =>
  import("../pages/auth/PasswordResetRequestPage")
);
const PasswordResetPage = lazy(() => import("../pages/auth/PasswordResetPage"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<PasswordResetRequestPage />} />
        <Route path="/reset-password/:token" element={<PasswordResetPage />} />
      </Route>
      <Route element={<LandingPageLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route element={<DashboardLayout />}>
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/jobs/:id" element={<JobPage />} />
        </Route>
      </Route>
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
