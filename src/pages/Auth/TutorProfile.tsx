import React from 'react';
import TutorProfileForm from '../../components/auth/TutorProfileForm';

const TutorProfile: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Tutor Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Share your expertise and experience to help students find you
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <TutorProfileForm />
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;