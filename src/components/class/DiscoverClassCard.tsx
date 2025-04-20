import React from 'react';

interface DiscoverClassCardProps {
  classData: {
    id: string;
    title: string;
    description: string;
    instructor: string;
    subject: string;
    level: string;
    imageUrl?: string;
    rating: number;
    reviewCount: number;
  };
  onViewDetails: (id: string) => void;
}

const DiscoverClassCard: React.FC<DiscoverClassCardProps> = ({
  classData,
  onViewDetails
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {classData.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={classData.imageUrl} 
            alt={classData.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{classData.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {classData.subject}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {classData.description}
        </p>
        
        <div className="mb-4">
          <p className="text-sm mb-1">
            <span className="font-medium">Instructor:</span> {classData.instructor}
          </p>
          <p className="text-sm mb-1">
            <span className="font-medium">Level:</span> {classData.level}
          </p>
          <div className="flex items-center">
            <div className="flex mr-1">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(classData.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {classData.rating.toFixed(1)} ({classData.reviewCount} reviews)
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          {/* <span className="text-xl font-bold">${classData.price.toFixed(2)}</span> */}
          <button 
            onClick={() => onViewDetails(classData.id)}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverClassCard;