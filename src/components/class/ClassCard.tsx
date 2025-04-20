// src/components/class/ClassCard.tsx
import React from 'react';

interface ClassCardProps {
  title: string;
  description: string;
  instructor?: string; // Make instructor optional
  schedule: string;
  capacity: number;
  enrolled: number;
  onEnroll?: () => void;
  buttonText?: string; // For customizing the button text
  isInstructorView?: boolean; // Flag to indicate if this is the instructor's view
}

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  description,
  instructor,
  schedule,
  capacity,
  enrolled,
  onEnroll,
  buttonText = "Enroll Now",
  isInstructorView = false // Default to student view
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-2 max-w-sm">
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mb-4">
          {/* Only show instructor if not in instructor view and instructor exists */}
          {!isInstructorView && instructor && (
            <p className="text-sm mb-1">
              <strong>Instructor:</strong> {instructor}
            </p>
          )}
          <p className="text-sm mb-1">
            <strong>Schedule:</strong> {schedule}
          </p>
          <p className="text-sm mb-1">
            <strong>Enrollment:</strong> {enrolled}/{capacity}
          </p>
        </div>
        <button 
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:bg-gray-400"
          onClick={onEnroll}
          disabled={enrolled >= capacity}
        >
          {enrolled >= capacity ? 'Class Full' : buttonText}
        </button>
      </div>
    </div>
  );
};

export default ClassCard;