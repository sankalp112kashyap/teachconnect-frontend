import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      fullWidth = false,
      helperText,
      className = '',
      containerClassName = '',
      labelClassName = '',
      inputClassName = '',
      errorClassName = '',
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const containerClasses = `
      ${fullWidth ? 'w-full' : ''}
      ${containerClassName}
    `;

    const inputClasses = `
      block px-4 py-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm 
      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
      ${error ? 'border-red-500' : ''}
      ${fullWidth ? 'w-full' : ''}
      ${inputClassName}
    `;

    return (
      <div className={containerClasses}>
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className={`mt-1 text-sm text-red-600 ${errorClassName}`}
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;