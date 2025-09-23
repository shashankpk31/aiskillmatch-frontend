import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthLayout from '../../components/layout/AuthLayout';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

const schema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
}).required();

const LoginPage = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const { login, isLoading, error } = useAuth();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <AuthLayout 
      title="Sign in to your account"
      subtitle={
        <>
          Or{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-500">
            create a new account
          </Link>
        </>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            required
          />

          <InputField
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Sign in
          </Button>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default LoginPage;