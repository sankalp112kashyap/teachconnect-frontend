import React, { forwardRef } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  errorClassName?: string;
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      fullWidth = false,
      helperText,
      className = '',
      containerClassName = '',
      labelClassName = '',
      selectClassName = '',
      errorClassName = '',
      id,
      onChange,
      ...rest
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const containerClasses = `
      ${fullWidth ? 'w-full' : ''}
      ${containerClassName}
    `;

    const selectClasses = `
      block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm 
      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
      ${error ? 'border-red-500' : ''}
      ${fullWidth ? 'w-full' : ''}
      ${selectClassName}
    `;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className={containerClasses}>
        {label && (
          <label
            htmlFor={selectId}
            className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={selectClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          onChange={handleChange}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p
            id={`${selectId}-error`}
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

Select.displayName = 'Select';

export default Select;