import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import {useAuth} from '../hooks/useAuth';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const PasswordResetRequestPage = () => {
  const methods = useForm();
  const { requestPasswordResetEmail, isLoading, error, success, clearAuthMessages, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    return () => clearAuthMessages();
  }, [user, navigate, clearAuthMessages]);

  const onSubmit = async (data) => {
    await requestPasswordResetEmail(data.email);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <Hero />
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white dark:bg-[var(--color-background)] shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 text-center">
              Request Password Reset
            </h2>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm mb-4" role="alert">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-green-500 text-sm mb-4" role="alert">
                    {success || 'If an account exists, a reset email was sent.'}
                  </p>
                )}
                <Button type="submit" isLoading={isLoading}>
                  Send Reset Email
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

export default PasswordResetRequestPage;