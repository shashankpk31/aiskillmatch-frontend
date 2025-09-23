//Login Form
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';    
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {     
        e.preventDefault();
        setError(null);
        try {
            await dispatch(login({ email, password })).unwrap();
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;

// Prompt for Generating a React Application for Authentication Pages
// You are tasked with creating a complete React frontend application for authentication-related pages (Login, Register, Password Reset Request, and Password Reset Confirmation) that integrates with a Spring Boot backend. The application should be modern, responsive, and inspired by the clean, professional design of job portals like Naukri.com, LinkedIn, or Indeed. The frontend should use the provided project setup and adhere to the following requirements.
// Project Setup

// Framework: React 18 with Vite as the build tool.
// Styling: Tailwind CSS with a custom theme defined in src/styles/tailwind.css:@tailwind base;
// @tailwind components;
// @tailwind utilities;

// :root {
//   --color-primary: #4A90E2; /* Primary Blue */
//   --color-secondary: #50E3C2; /* Teal */
//   --color-accent: #9013FE; /* Purple */
//   --color-background: #F5F7FA; /* Light Gray */
//   --color-text: #4A4A4A; /* Dark Gray */
// }

// :dark {
//   --color-primary: #1E3A8A; /* Darker Blue */
//   --color-secondary: #0D9488; /* Darker Teal */
//   --color-accent: #7C3AED; /* Darker Purple */
//   --color-background: #111827; /* Dark Gray */
//   --color-text: #D1D5DB; /* Light Gray */
// }


// Dependencies: 
// @reduxjs/toolkit, react-redux for state management.
// axios for API calls.
// react-hook-form for form handling and validation.
// react-router-dom for routing.
// react-dropzone (optional for future file uploads, e.g., resume).
// tailwindcss, autoprefixer, postcss for styling.
// @vitejs/plugin-react for Vite React plugin.


// Vite Configuration: Proxy API requests to http://localhost:8080:import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': 'http://localhost:8080',
//     },
//   },
// });


// Project Structure:src/
// ├── api/
// │   └── axiosInstance.js (empty)
// ├── assets/
// │   └── hero-image.png
// ├── components/
// │   ├── Hero.jsx
// │   ├── JobCard.jsx
// │   ├── JobList.jsx
// │   ├── Navbar.jsx
// ├── features/
// │   ├── auth/
// │   │   ├── authSlice.js
// │   │   ├── LoginForm.jsx
// │   ├── jobs/
// │   │   ├── JobDetails.jsx
// │   │   ├── jobSlice.js
// ├── hooks/
// │   └── useAuth.js
// ├── pages/
// │   ├── HomePage.jsx
// │   │   ├── JobPage.jsx
// ├── store/
// │   └── store.js
// ├── styles/
// │   └── tailwind.css
// ├── App.jsx
// ├── index.css
// ├── main.jsx


// Existing Components: Assume Navbar.jsx and Hero.jsx exist and can be reused. Others (e.g., JobCard.jsx, JobList.jsx) are job-specific and not relevant for auth pages.
// API Endpoints:
// POST /api/login: Expects { username, password }, returns { success: boolean, message: string (JWT token or error message) }.
// POST /api/register: Expects the full schema:{
//   "username": "string",
//   "email": "string",
//   "password": "string",
//   "role": "string",
//   "fullName": "string",
//   "headline": "string",
//   "bio": "string",
//   "skills": ["string"],
//   "experience": [{ "organization": "string", "role": "string", "duration": "string", "responsibilities": ["string"] }],
//   "education": [{ "institution": "string", "degree": "string", "fieldOfStudy": "string", "duration": "string" }],
//   "projects": [{ "projectName": "string", "description": "string", "technologies": "string", "duration": "string" }]
// }

// Returns { success: boolean, message: string }.
// POST /api/password-reset-request: Expects { email: string }, returns { success: boolean, message: string }.
// POST /api/password-reset: Expects { token: string, password: string }, returns { success: boolean, message: string }.



// Requirements

// Pages:
// Login Page (/login):
// Form with username and password fields.
// Use react-hook-form for validation (username and password required).
// Submit to /api/login using Axios.
// Store JWT token in Redux and localStorage (via useAuth.js).
// Display error messages for invalid credentials.
// Include a "Forgot Password?" link to /password-reset-request.
// Redirect to / (HomePage) on success.


// Register Page (/register):
// Multi-step form (e.g., 3 steps: Basic Info, Experience/Education, Skills/Projects) for the full schema.
// Use react-hook-form for validation (username, email, password, fullName, role required; others optional).
// Allow adding multiple experiences, educations, and projects dynamically (add/remove functionality).
// Submit to /api/register using Axios.
// Display success/error messages (e.g., "Username already taken").
// Redirect to /login on success.


// Password Reset Request Page (/password-reset-request):
// Form with email field.
// Use react-hook-form for validation (valid email required).
// Submit to /api/password-reset-request.
// Display success message ("If account exists, a reset email was sent").


// Password Reset Confirmation Page (/reset-password):
// Form with password and confirm password fields.
// Extract token from URL query (?token=...).
// Use react-hook-form for validation (password required, min 8 chars, passwords must match).
// Submit to /api/password-reset.
// Display success/error messages (e.g., "Token expired").
// Redirect to /login on success.




// Design:
// Inspiration: Emulate the clean, professional look of Naukri.com/LinkedIn:
// Minimalist layout with a white/light gray background (--color-background).
// Blue/purple accents (--color-primary, --color-accent) for buttons and links.
// Responsive design for mobile and desktop.
// Smooth transitions and hover effects.
// Use Tailwind CSS classes for styling.


// Components:
// Reuse Navbar.jsx for navigation (links to Home, Login, Register).
// Reuse Hero.jsx for a welcome banner on Login/Register pages.
// Create reusable form components (e.g., InputField.jsx, Button.jsx) in components/.
// Use a card layout for forms (centered, shadow, rounded corners).


// Dark Mode: Support dark mode using the :dark theme variables.


// State Management:
// Use Redux Toolkit (authSlice.js) to manage:
// User authentication state (logged in, JWT token, username).
// Error/success messages from API responses.


// Update useAuth.js to handle login/logout and token storage.


// Routing:
// Use react-router-dom to set up routes in App.jsx:
// / → HomePage.jsx (existing).
// /login → LoginPage.jsx.
// /register → RegisterPage.jsx.
// /password-reset-request → PasswordResetRequestPage.jsx.
// /reset-password → PasswordResetPage.jsx.


// Protect routes (e.g., redirect to /login if not authenticated).


// API Integration:
// Configure axiosInstance.js with a base URL of /api and JWT token in headers (if available).
// Handle API errors gracefully (e.g., display error messages in forms).


// Accessibility:
// Ensure forms are accessible (ARIA labels, keyboard navigation).
// Use semantic HTML and Tailwind's sr-only for screen readers.


// File Structure:
// Place new page components in pages/ (e.g., LoginPage.jsx, RegisterPage.jsx).
// Place new form components in components/ (e.g., InputField.jsx, Button.jsx).
// Update authSlice.js and useAuth.js in their respective directories.
// Update axiosInstance.js in api/.



// Deliverables
// Generate the following files, ensuring all code is complete, functional, and follows React best practices (functional components, hooks, etc.):

// api/axiosInstance.js: Axios instance with base URL and token interceptor.
// features/auth/authSlice.js: Redux slice for auth state (token, user, error/success messages).
// hooks/useAuth.js: Custom hook for login, logout, and token management.
// components/InputField.jsx: Reusable input component with Tailwind styling and react-hook-form integration.
// components/Button.jsx: Reusable button component with Tailwind styling (primary, secondary variants).
// pages/LoginPage.jsx: Login page with form and error handling.
// pages/RegisterPage.jsx: Multi-step registration form with dynamic fields.
// pages/PasswordResetRequestPage.jsx: Password reset request form.
// pages/PasswordResetPage.jsx: Password reset confirmation form.
// App.jsx: Updated router with all routes.
// main.jsx: Entry point with Redux Provider and Router.

// Additional Notes

// Use modern JavaScript (ES6+) and JSX syntax.
// Avoid <form> onSubmit due to sandbox restrictions; use react-hook-form's handleSubmit instead.
// Use className for Tailwind classes, not class.
// Ensure all forms validate input as per backend requirements (e.g., email format, required fields).
// Use the provided Tailwind theme colors (--color-primary, etc.) for consistency.
// Include loading states for API calls (e.g., disable button, show spinner).
// Handle edge cases (e.g., network errors, invalid tokens).
// Use CDN-hosted React and dependencies only if explicitly required (not needed here since Vite handles bundling).

// Output Format
// For each file, wrap the content in an <xaiArtifact> tag with:

// A unique artifact_id (UUID).
// title as the filename (e.g., LoginPage.jsx).
// contentType as text/javascript for .jsx files or text/javascript for .js files.
// Example:<xaiArtifact artifact_id="777d27a1-cf01-479d-a087-a8331f6857a5" artifact_version_id="77685872-d5f0-4ad9-8fb6-06946c1859e0" title="LoginPage.jsx" contentType="text/javascript">
// // Code here


