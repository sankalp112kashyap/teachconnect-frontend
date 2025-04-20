import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateTutorProfile } from '../../services/auth.service';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import Input from '../common/Input';
import Textarea from '../common/TextArea';
import Select from '../common/Select';

const teachingLevels = [
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

const TutorProfileForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    aboutMe: '',
    teachingLevels: [] as string[],
    subjectsTeaching: [] as string[],
    currentInstitution: '',
    experiences: [{ title: '', institution: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', institution: '', field: '', year: '' }],
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

  const handleMultiSelectChange = (name: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      [name]: selectedOptions
    }));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      experiences: newExperiences
    }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { title: '', institution: '', startDate: '', endDate: '', description: '' }
      ]
    }));
  };

  const removeExperience = (index: number) => {
    if (formData.experiences.length > 1) {
      const newExperiences = [...formData.experiences];
      newExperiences.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        experiences: newExperiences
      }));
    }
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: '', institution: '', field: '', year: '' }
      ]
    }));
  };

  const removeEducation = (index: number) => {
    if (formData.education.length > 1) {
      const newEducation = [...formData.education];
      newEducation.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        education: newEducation
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.aboutMe.trim()) {
      newErrors.aboutMe = 'Please tell us about yourself';
    } else if (formData.aboutMe.length > 500) {
      newErrors.aboutMe = 'About me should be less than 500 characters';
    }

    if (formData.teachingLevels.length === 0) {
      newErrors.teachingLevels = 'Please select at least one teaching level';
    }

    if (formData.subjectsTeaching.length === 0) {
      newErrors.subjectsTeaching = 'Please select at least one subject';
    }

    if (!formData.currentInstitution.trim()) {
      newErrors.currentInstitution = 'Please enter your current institution';
    }

    // Validate at least one experience entry is complete
    const isExperienceValid = formData.experiences.some(
      exp => exp.title && exp.institution && exp.startDate && exp.description
    );
    if (!isExperienceValid) {
      newErrors.experiences = 'Please add at least one complete experience';
    }

    // Validate at least one education entry is complete
    const isEducationValid = formData.education.some(
      edu => edu.degree && edu.institution && edu.field && edu.year
    );
    if (!isEducationValid) {
      newErrors.education = 'Please add at least one complete education entry';
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
        await updateTutorProfile({
          userId: user.id,
          aboutMe: formData.aboutMe,
          teachingLevel: formData.teachingLevels,
          experiences: formData.experiences.filter(exp => exp.title && exp.institution),
          education: formData.education.filter(edu => edu.degree && edu.institution),
          subjectsTeaching: formData.subjectsTeaching,
          currentInstitution: formData.currentInstitution,
        });
        
        navigate('/home');
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
        placeholder="Tell us about your teaching approach, experience, and specialties..."
        rows={4}
        helperText={`${formData.aboutMe.length}/500 characters`}
      />

      <div>
        <label htmlFor="teachingLevels" className="block text-sm font-medium text-gray-700 mb-1">
          Teaching Levels
        </label>
        <select
          id="teachingLevels"
          name="teachingLevels"
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          multiple
          size={4}
          value={formData.teachingLevels}
          onChange={handleMultiSelectChange('teachingLevels')}
        >
          {teachingLevels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
        {errors.teachingLevels && (
          <p className="mt-1 text-sm text-red-600">{errors.teachingLevels}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Hold Ctrl (or Cmd on Mac) to select multiple levels
        </p>
      </div>

      <div>
        <label htmlFor="subjectsTeaching" className="block text-sm font-medium text-gray-700 mb-1">
          Subjects I Teach
        </label>
        <select
          id="subjectsTeaching"
          name="subjectsTeaching"
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          multiple
          size={5}
          value={formData.subjectsTeaching}
          onChange={handleMultiSelectChange('subjectsTeaching')}
        >
          {subjects.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {subject.label}
            </option>
          ))}
        </select>
        {errors.subjectsTeaching && (
          <p className="mt-1 text-sm text-red-600">{errors.subjectsTeaching}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Hold Ctrl (or Cmd on Mac) to select multiple subjects
        </p>
      </div>

      <Input
        label="Current Institution"
        type="text"
        name="currentInstitution"
        id="currentInstitution"
        value={formData.currentInstitution}
        onChange={handleChange}
        error={errors.currentInstitution}
        required
        fullWidth
        placeholder="Your current school, college, or university"
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Experience</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={addExperience}
          >
            Add Experience
          </Button>
        </div>
        
        {errors.experiences && (
          <p className="text-sm text-red-600">{errors.experiences}</p>
        )}
        
        {formData.experiences.map((experience, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Experience {index + 1}</h4>
              {formData.experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
            
            <Input
              label="Title"
              type="text"
              value={experience.title}
              onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
              required
              fullWidth
              placeholder="e.g., Math Teacher, Tutor, etc."
            />
            
            <Input
              label="Institution"
              type="text"
              value={experience.institution}
              onChange={(e) => handleExperienceChange(index, 'institution', e.target.value)}
              required
              fullWidth
              placeholder="School or organization name"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={experience.startDate}
                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                required
                fullWidth
              />
              
              <Input
                label="End Date (leave blank if current)"
                type="date"
                value={experience.endDate}
                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                fullWidth
              />
            </div>
            
            <Textarea
              label="Description"
              value={experience.description}
              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              required
              fullWidth
              rows={3}
              placeholder="Describe your responsibilities and achievements"
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Education</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={addEducation}
          >
            Add Education
          </Button>
        </div>
        
        {errors.education && (
          <p className="text-sm text-red-600">{errors.education}</p>
        )}
        
        {formData.education.map((edu, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Education {index + 1}</h4>
              {formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
            
            <Input
              label="Degree"
              type="text"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              required
              fullWidth
              placeholder="e.g., Bachelor of Science, Master of Arts, PhD"
            />
            
            <Input
              label="Institution"
              type="text"
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
              required
              fullWidth
              placeholder="University or college name"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Field of Study"
                type="text"
                value={edu.field}
                onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                required
                fullWidth
                placeholder="e.g., Mathematics, Computer Science"
              />
              
              <Input
                label="Year of Completion"
                type="number"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                required
                fullWidth
                min="1900"
                max="2099"
                placeholder="YYYY"
              />
            </div>
          </div>
        ))}
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
          {isLoading ? 'Saving Profile...' : 'Save Profile'}
        </Button>
      </div>
    </form>
  );
};

export default TutorProfileForm;