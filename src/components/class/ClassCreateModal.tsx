// src/components/class/ClassCreateModal.tsx
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/TextArea';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

interface ClassCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    subject?: string;
    topic?: string;
    level?: string;
  };
  onSubmit: (classData: any) => void;
}

const ClassCreateModal: React.FC<ClassCreateModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    level: '',
    date: '',
    time: '',
    capacity: '30',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when modal opens with initialData
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: initialData?.topic || '',
        description: '',
        subject: initialData?.subject || '',
        level: initialData?.level || '',
        date: '',
        time: '',
        capacity: '30',
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      // Create a new class request object
      const newClassRequest = {
        id: `request_${Date.now()}`, // Generate a temporary ID
        topic: formData.title,
        subject: {
          id: formData.subject,
          name: formData.subject.toUpperCase(),
          color: 'green-600',
          topics: [],
          level: []
        },
        requestedBy: [user.id],
        dateRequested: new Date(),
        studentsRequested: 1, // Start with 1 student (the current user)
        level: formData.level // Store the education level
      };
      
      // In a real app, this would call your API
      console.log('Creating class request:', newClassRequest);
      
      // Use onSubmit instead of onSuccess
      onSubmit(newClassRequest);
      
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
    { value: 'geography', label: 'Geography' },
    { value: 'english', label: 'English' },
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
      title="Create New Class"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Class Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
          placeholder="e.g., Introduction to Derivatives"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            label="Level"
            name="level"
            options={levels}
            value={formData.level}
            onChange={(value) => setFormData(prev => ({ ...prev, level: value }))}
            required
            fullWidth
          />
        </div>
        
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          fullWidth
          rows={4}
          placeholder="Provide a detailed description of the class content, goals, and what students will learn..."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <Input
            label="Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <Input
            label="Capacity"
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            required
            fullWidth
            min="1"
            max="100"
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="primary"
          >
            Create Class
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ClassCreateModal;