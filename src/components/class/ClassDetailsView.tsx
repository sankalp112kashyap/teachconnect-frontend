import React from 'react';

interface ClassDetailsViewProps {
  classData: {
    id: string;
    title: string;
    description: string;
    instructor: string;
    schedule: string;
    capacity: number;
    enrolled: number;
    subject: string;
    level: string;
    prerequisites?: string[];
    materials?: string[];
  };
  onEnroll?: () => void;
}

const ClassDetailsView: React.FC<ClassDetailsViewProps> = ({ classData, onEnroll }) => {
  return (
    <div className="bg-white p-6 max-w-3xl mx-auto my-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        {classData.title}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <h2 className="text-xl font-semibold mb-2">
            About this Class
          </h2>
          <p className="mb-6">
            {classData.description}
          </p>
          
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">
              Class Information
            </h2>
            <ul className="divide-y divide-gray-200">
              <li className="py-2">
                <div>
                  <span className="font-medium">Instructor</span>
                  <p className="text-gray-600">{classData.instructor}</p>
                </div>
              </li>
              <li className="py-2">
                <div>
                  <span className="font-medium">Schedule</span>
                  <p className="text-gray-600">{classData.schedule}</p>
                </div>
              </li>
              <li className="py-2">
                <div>
                  <span className="font-medium">Subject</span>
                  <p className="text-gray-600">{classData.subject}</p>
                </div>
              </li>
              <li className="py-2">
                <div>
                  <span className="font-medium">Level</span>
                  <p className="text-gray-600">{classData.level}</p>
                </div>
              </li>
              <li className="py-2">
                <div>
                  <span className="font-medium">Enrollment</span>
                  <p className="text-gray-600">{`${classData.enrolled}/${classData.capacity} students`}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Enrollment Status
            </h2>
            <p className="mb-4">
              {classData.enrolled >= classData.capacity 
                ? 'Class is full' 
                : `${classData.capacity - classData.enrolled} spots remaining`}
            </p>
            <button
              className={`w-full py-2 px-4 rounded-md text-white font-medium 
                ${classData.enrolled >= classData.capacity 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'}`}
              onClick={onEnroll}
              disabled={classData.enrolled >= classData.capacity}
            >
              {classData.enrolled >= classData.capacity ? 'Class Full' : 'Enroll Now'}
            </button>
          </div>
        </div>
      </div>

      {classData.prerequisites && classData.prerequisites.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Prerequisites
          </h2>
          <ul className="list-disc pl-5">
            {classData.prerequisites.map((prereq, index) => (
              <li key={index} className="py-1">
                {prereq}
              </li>
            ))}
          </ul>
        </div>
      )}

      {classData.materials && classData.materials.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Required Materials
          </h2>
          <ul className="list-disc pl-5">
            {classData.materials.map((material, index) => (
              <li key={index} className="py-1">
                {material}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClassDetailsView; 