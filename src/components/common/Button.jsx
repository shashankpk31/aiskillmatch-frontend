import React from 'react';

const Button = ({ children, type = 'button', variant = 'primary', disabled = false, isLoading = false }) => {
  const baseStyles = 'px-6 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  const variantStyles =
    variant === 'primary'
      ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 focus:ring-[var(--color-primary)]'
      : 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary)]/90 focus:ring-[var(--color-secondary)]';
  const disabledStyles = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles} ${disabledStyles}`}
      aria-disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;