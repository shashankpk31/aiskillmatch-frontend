import React from 'react';
import { useFormContext } from 'react-hook-form';

const InputField = ({ name, label, type = 'text', placeholder, required = false }) => {
  const formContext = useFormContext();
  console.log(formContext); // This should not be null

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-[var(--color-text)] mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name, {
          required: required ? `${label} is required` : false,
          ...(type === 'email' && {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          }),
          ...(type === 'password' && {
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }),
        })}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors ${
          errors[name] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        }`}
        aria-invalid={errors[name] ? 'true' : 'false'}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default InputField;