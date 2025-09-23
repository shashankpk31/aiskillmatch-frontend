import React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

const InputField = ({
  label,
  name,
  type = 'text',
  autoComplete,
  required = false,
  className,
  ...props
}) => {
  const formContext = useFormContext();

  if (!formContext) {
    throw new Error('InputField must be used within a FormProvider');
  }

  const {
    register,
    formState: { errors },
  } = formContext;

  const error = errors[name];

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          id={name}
          type={type}
          autoComplete={autoComplete}
          className={clsx(
            'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm',
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
          )}
          {...register(name)}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputField;