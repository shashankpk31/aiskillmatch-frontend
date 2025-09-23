import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthLayout from '../components/layouts/AuthLayout';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { authService } from '../../services/authService';

const schema = yup.object({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
}).required();

const PasswordResetPage = () => {
  const [isValidating, setIsValidating] = useState(true);
  const [tokenError, setTokenError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setTokenError('No reset token provided');
        setIsValidating(false);
        return;
      }

      const { isValid, error } = await authService.validateResetToken(token);
      
      if (!isValid) {
        setTokenError(error);
        setTimeout(() => {
          navigate('/forgot-password');
        }, 3000);
      }
      
      setIsValidating(false);
    };

    validateToken();
  }, [token, navigate]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      methods.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    await resetUserPassword(token, data.password);
  };

  if (isValidating) {
    return (
      <AuthLayout title="Validating Reset Token">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      </AuthLayout>
    );
  }

  if (tokenError) {
    return (
      <AuthLayout title="Invalid Reset Token">
        <div className="text-center">
          <p className="text-red-600 mb-4">{tokenError}</p>
          <p className="text-gray-600">Redirecting to password reset request...</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <Hero />
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white dark:bg-[var(--color-background)] shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 text-center">
              Reset Password
            </h2>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                <InputField
                  name="password"
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  required
                />
                <InputField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm new password"
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm mb-4" role="alert">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-green-500 text-sm mb-4" role="alert">
                    {success}
                  </p>
                )}
                <Button type="submit" isLoading={isLoading}>
                  Reset Password
                </Button>
                <p className="mt-4 text-sm text-[var(--color-text)] text-center">
                  Back to{' '}
                  <Link to="/login" className="text-[var(--color-primary)] hover:underline">
                    Login
                  </Link>
                </p>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;