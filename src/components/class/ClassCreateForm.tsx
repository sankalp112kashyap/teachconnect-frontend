import React, { useState } from 'react';

interface ClassCreateFormProps {
  onSubmit: (classData: {
    title: string;
    description: string;
    schedule: string;
    capacity: number;
    subject: string;
    level: string;
  }) => void;
}

const ClassCreateForm: React.FC<ClassCreateFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    schedule: '',
    capacity: '',
    subject: '',
    level: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      capacity: Number(formData.capacity)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Class</h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Class Title
          </label>
          <input
            required
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            required
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">
              Schedule
            </label>
            <input
              required
              id="schedule"
              name="schedule"
              type="text"
              value={formData.schedule}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
              Capacity
            </label>
            <input
              required
              id="capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              required
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Subject</option>
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="english">English</option>
              <option value="history">History</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <select
              required
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
        >
          Create Class
        </button>
      </div>
    </form>
  );
};

export default ClassCreateForm; 