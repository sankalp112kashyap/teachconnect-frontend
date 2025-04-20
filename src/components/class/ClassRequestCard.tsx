// src/components/class/ClassRequestCard.tsx
import React, { useState, useEffect } from 'react';
import { ClassRequest } from '../../models/class';
import { useAuth } from '../../hooks/useAuth';
import { requestClass } from '../../services/class.service';

interface ClassRequestCardProps {
  classRequest: ClassRequest;
  tutorView: boolean;
  onCreateClass?: (requestId: string) => void;
}

const ClassRequestCard: React.FC<ClassRequestCardProps> = ({
  classRequest,
  tutorView,
  onCreateClass
}) => {
  const { user } = useAuth();
  const [hasRequested, setHasRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if the current user has already requested this class
  useEffect(() => {
    if (user && classRequest.requestedBy) {
      setHasRequested(classRequest.requestedBy.includes(user.id));
    }
  }, [user, classRequest]);
  
  const formattedDate = new Date(classRequest.dateRequested).toLocaleDateString();
  
  const handleRequest = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // In a real app, this would call your API
      console.log(`User ${user.id} requesting class ${classRequest.id}`);
      
      // Mock the API call for now
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state to show the button as requested
      setHasRequested(true);
      
      // Add user to the requestedBy array
      if (!classRequest.requestedBy.includes(user.id)) {
        classRequest.requestedBy.push(user.id);
        classRequest.studentsRequested += 1;
      }
    } catch (error) {
      console.error('Failed to request class:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreateClass = () => {
    if (onCreateClass) {
      onCreateClass(classRequest.id);
    }
  };

  // Get education level (this would come from the API in a real app)
  const level = classRequest.level || "Undergraduate";

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-xs font-medium uppercase tracking-wide text-emerald-600 mb-1">
        {classRequest.subject.name}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        {classRequest.topic}
      </h3>
      
      {/* Education level tag */}
      <div className="mt-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {level}
        </span>
      </div>
      
      <div className="mt-3 flex items-center space-x-2">
        <div className="flex items-center">
          <svg 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="ml-1 text-sm text-gray-600">
            Requested: {formattedDate}
          </span>
        </div>
        
        <div className="flex items-center">
          <svg 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="ml-1 text-sm text-gray-600">
            {classRequest.studentsRequested} students requested
          </span>
        </div>
      </div>
      
      <div className="mt-4">
        {tutorView ? (
          <button
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleCreateClass}
          >
            Create a Class
          </button>
        ) : (
          // Don't show the button if user has created this class request themselves
          user && classRequest.requestedBy.includes(user.id) && classRequest.requestedBy.length === 1 ? null : (
            <button
              className={`w-full py-2 px-4 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                hasRequested 
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                  : 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500'
              }`}
              disabled={hasRequested || isLoading}
              onClick={handleRequest}
            >
              {isLoading 
                ? 'Processing...' 
                : hasRequested 
                  ? 'Requested' 
                  : '+1 Request'}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ClassRequestCard;