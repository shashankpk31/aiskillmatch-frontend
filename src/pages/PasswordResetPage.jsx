import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import {useAuth} from '../hooks/useAuth';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const PasswordResetPage = () => {
  const methods = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const { resetUserPassword, isLoading, error, success, clearAuthMessages, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    if (success) {
      navigate('/login');
    }
    return () => clearAuthMessages();
  }, [user, success, navigate, clearAuthMessages]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      methods.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    await resetUserPassword(token, data.password);
  };

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