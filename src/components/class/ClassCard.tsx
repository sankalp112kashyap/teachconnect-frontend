import React from 'react';

interface ClassCardProps {
  title: string;
  description: string;
  instructor: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  onEnroll?: () => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  description,
  instructor,
  schedule,
  capacity,
  enrolled,
  onEnroll
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-2 max-w-sm">
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mb-4">
          <p className="text-sm mb-1">
            <strong>Instructor:</strong> {instructor}
          </p>
          <p className="text-sm mb-1">
            <strong>Schedule:</strong> {schedule}
          </p>
          <p className="text-sm mb-1">
            <strong>Enrollment:</strong> {enrolled}/{capacity}
          </p>
        </div>
        <button 
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
          onClick={onEnroll}
          disabled={enrolled >= capacity}
        >
          {enrolled >= capacity ? 'Class Full' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
};

export default ClassCard; 