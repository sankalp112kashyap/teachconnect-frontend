// src/components/auth/StudentProfileForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateStudentProfile } from '../../services/auth.service';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import Input from '../common/Input';
import Textarea from '../common/TextArea';
import Select from '../common/Select';

const educationLevels = [
  { value: 'primary', label: 'Primary School' },
  { value: 'secondary', label: 'Secondary School' },
  { value: 'high_school', label: 'High School' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'postgraduate', label: 'Postgraduate' },
];

// Simplified list of subjects
const subjects = [
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
  { value: 'computer_science', label: 'Computer Science' },
  { value: 'history', label: 'History' },
  { value: 'geography', label: 'Geography' },
  { value: 'english', label: 'English' },
  { value: 'literature', label: 'Literature' },
  { value: 'philosophy', label: 'Philosophy' },
  { value: 'economics', label: 'Economics' },
  { value: 'psychology', label: 'Psychology' },
];

const StudentProfileForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    aboutMe: '',
    subjectsInterested: [] as string[],
    educationLevel: '',
    institution: '',
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      subjectsInterested: selectedOptions
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.aboutMe.trim()) {
      newErrors.aboutMe = 'Please tell us about yourself';
    } else if (formData.aboutMe.length > 500) {
      newErrors.aboutMe = 'About me should be less than 500 characters';
    }

    if (formData.subjectsInterested.length === 0) {
      newErrors.subjectsInterested = 'Please select at least one subject';
    }

    if (!formData.educationLevel) {
      newErrors.educationLevel = 'Please select your education level';
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'Please enter your institution';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (user) {
        await updateStudentProfile({
          userId: user.id,
          aboutMe: formData.aboutMe,
          subjectsInterested: formData.subjectsInterested,
          educationLevel: formData.educationLevel,
          institution: formData.institution,
        });
        
        // If user is "both" type, they need to also complete the tutor profile
        if (user.role === 'both') {
          navigate('/complete-tutor-profile');
        } else {
          navigate('/home');
        }
      }
    } catch (error) {
      setErrors({
        form: 'Failed to update profile. Please try again.',
      });
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Textarea
        label="About Me"
        name="aboutMe"
        id="aboutMe"
        value={formData.aboutMe}
        onChange={handleChange}
        error={errors.aboutMe}
        required
        fullWidth
        placeholder="Tell us a bit about yourself, your learning goals, and what you hope to achieve..."
        rows={4}
        helperText={`${formData.aboutMe.length}/500 characters`}
      />

      <div>
        <label htmlFor="subjectsInterested" className="block text-sm font-medium text-gray-700 mb-1">
          Subjects Interested In
        </label>
        <select
          id="subjectsInterested"
          name="subjectsInterested"
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          multiple
          size={5}
          value={formData.subjectsInterested}
          onChange={handleSubjectChange}
        >
          {subjects.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {subject.label}
            </option>
          ))}
        </select>
        {errors.subjectsInterested && (
          <p className="mt-1 text-sm text-red-600">{errors.subjectsInterested}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Hold Ctrl (or Cmd on Mac) to select multiple subjects
        </p>
      </div>

      <Select
        label="Education Level"
        name="educationLevel"
        id="educationLevel"
        options={educationLevels}
        value={formData.educationLevel}
        onChange={(value) => 
          setFormData((prev) => ({ ...prev, educationLevel: value }))
        }
        error={errors.educationLevel}
        required
        fullWidth
      />

      <Input
        label="Institution"
        type="text"
        name="institution"
        id="institution"
        value={formData.institution}
        onChange={handleChange}
        error={errors.institution}
        required
        fullWidth
        placeholder="Your school, college, or university"
      />

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
          {isLoading ? 'Saving Profile...' : 'Save Profile'}
        </Button>
      </div>
    </form>
  );
};

export default StudentProfileForm;
