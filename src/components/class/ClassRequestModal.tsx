// src/components/class/ClassRequestModal.tsx
import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { createClassRequest } from '../../services/class.service';
import { useAuth } from '../../hooks/useAuth';

interface ClassRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (requestData: any) => void;
}

const ClassRequestModal: React.FC<ClassRequestModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    level: '',
    preferredDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to request a class');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const requestData = {
        topic: formData.title,
        subject: formData.subject,
        level: formData.level,
        preferredDate: formData.preferredDate,
        requestedBy: [user.id],
      };
      
      // In a real app, this would call your API
      console.log('Creating class request:', requestData);
      // await createClassRequest(requestData);
      
      // Success
      if (onSuccess) {
        onSuccess(requestData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to create class request:', error);
      setError('Failed to create class request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const subjects = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'computer_science', label: 'Computer Science' },
    { value: 'history', label: 'History' },
    { value: 'philosophy', label: 'Philosophy' },
  ];

  const levels = [
    { value: 'primary', label: 'Primary School' },
    { value: 'secondary', label: 'Secondary School' },
    { value: 'high_school', label: 'High School' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'postgraduate', label: 'Postgraduate' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request a New Class"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Class Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
          placeholder="e.g., Advanced Calculus Techniques"
        />
        
        <Select
          label="Subject"
          name="subject"
          options={subjects}
          value={formData.subject}
          onChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
          required
          fullWidth
        />
        
        <Select
          label="Education Level"
          name="level"
          options={levels}
          value={formData.level}
          onChange={(value) => setFormData(prev => ({ ...prev, level: value }))}
          required
          fullWidth
        />
        
        <Input
          label="Preferred Date (Optional)"
          name="preferredDate"
          type="date"
          value={formData.preferredDate}
          onChange={handleChange}
          fullWidth
        />
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ClassRequestModal;