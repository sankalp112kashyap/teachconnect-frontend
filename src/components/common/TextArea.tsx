import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  textareaClassName?: string;
  errorClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      fullWidth = false,
      helperText,
      className = '',
      containerClassName = '',
      labelClassName = '',
      textareaClassName = '',
      errorClassName = '',
      id,
      ...rest
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const containerClasses = `
      ${fullWidth ? 'w-full' : ''}
      ${containerClassName}
    `;

    const textareaClasses = `
      block w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm 
      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
      ${error ? 'border-red-500' : ''}
      ${fullWidth ? 'w-full' : ''}
      ${textareaClassName}
    `;

    return (
      <div className={containerClasses}>
        {label && (
          <label
            htmlFor={textareaId}
            className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
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

Textarea.displayName = 'Textarea';
export default Textarea;
