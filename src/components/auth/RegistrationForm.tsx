// src/components/auth/RegisterForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import Input from '../common/Input';

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'tutor' | 'both',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Registration form submitted');
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const user = await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.role
      );

      // Redirect to corresponding profile completion page
      if (user.role === 'student') {
        navigate('/complete-student-profile');
      } else if (user.role === 'tutor') {
        navigate('/complete-tutor-profile');
      } else if (user.role === 'both') {
        navigate('/complete-student-profile');
      }
    } catch (error) {
      setErrors({
        form: 'Registration failed. Email may already be in use.',
      });
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
          fullWidth
        />

        <Input
          label="Last Name"
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
          fullWidth
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        fullWidth
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
        fullWidth
        autoComplete="new-password"
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
        fullWidth
      />

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          I want to join as
        </label>
        <select
          id="role"
          name="role"
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
          <option value="both">Both Student and Tutor</option>
        </select>
      </div>

      {errors.form && (
        <div className="text-red-600 text-sm">
          {errors.form}
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </a>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
