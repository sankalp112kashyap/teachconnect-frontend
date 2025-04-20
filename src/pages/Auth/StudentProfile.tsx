import React from 'react';
import StudentProfileForm from '../../components/auth/StudentProfileForm';

const StudentProfile: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Student Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tell us more about yourself so we can help you find the right classes
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <StudentProfileForm />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;