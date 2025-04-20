// src/pages/Home/TutorHome.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getTutorClasses,
  getTutorClassRequests,
  createClass
} from '../../services/class.service';
import { useAuth } from '../../hooks/useAuth';
import ClassCard from '../../components/class/ClassCard';
import ClassRequestCard from '../../components/class/ClassRequestCard';
import ClassCreateForm from '../../components/class/ClassCreateForm';
import { Class, ClassRequest, RequestStatus } from '../../models/class';

const TutorHome: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);
  const [classRequests, setClassRequests] = useState<ClassRequest[]>([]);
  const [loading, setLoading] = useState({
    upcoming: true,
    requests: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch upcoming classes for tutor
        setLoading(prev => ({ ...prev, upcoming: true }));
        const classesData = await getTutorClasses();
        setUpcomingClasses(classesData);
        setLoading(prev => ({ ...prev, upcoming: false }));

        // Fetch class requests assigned to this tutor
        setLoading(prev => ({ ...prev, requests: true }));
        const requestsData = await getTutorClassRequests();
        setClassRequests(requestsData);
        setLoading(prev => ({ ...prev, requests: false }));
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading({
          upcoming: false,
          requests: false,
        });
      }
    };

    fetchData();
  }, []);

  const handleCreateClass = async (classData: any) => {
    try {
      const newClass = await createClass({
        ...classData,
        tutorId: user?.id
      });
      
      // Add the new class to the list
      setUpcomingClasses(prev => [...prev, newClass]);
      
      // Close the form
      setIsCreateFormOpen(false);
    } catch (err) {
      setError('Failed to create class. Please try again.');
    }
  };

  const handleClassRequest = (requestId: string, approve: boolean) => {
    // Update the request status
    const updatedRequests = classRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: (approve ? 'approved' : 'rejected') as RequestStatus
        };
      }
      return request;
    });
    
    setClassRequests(updatedRequests);
    
    // If approved, you could also create a new class based on the request
    if (approve) {
      // Implementation would depend on your application flow
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Scheduled Classes Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Scheduled Classes</h2>
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
            onClick={() => setIsCreateFormOpen(!isCreateFormOpen)}
          >
            {isCreateFormOpen ? 'Cancel' : '+ Create New Class'}
          </button>
        </div>
        
        {isCreateFormOpen && (
          <div className="mb-8">
            <ClassCreateForm onSubmit={handleCreateClass} />
          </div>
        )}
        
        {loading.upcoming ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : upcomingClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingClasses.map((classItem) => (
              <ClassCard
                key={classItem.id}
                title={classItem.title}
                description={classItem.description}
                instructor={`${classItem.tutor?.firstName || 'You'} ${classItem.tutor?.lastName || ''}`}
                schedule={new Date(classItem.dateTime).toLocaleString()}
                capacity={classItem.capacity}
                enrolled={classItem.enrolledStudents?.length || 0}
                onEnroll={() => navigate(`/class/${classItem.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">You haven't scheduled any classes yet.</p>
            <p className="text-gray-600 mt-2">
              Click the "Create New Class" button to get started.
            </p>
          </div>
        )}
      </section>
      
      {/* Class Requests Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Class Requests</h2>
        
        {loading.requests ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : classRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classRequests.map((requestItem) => (
              <ClassRequestCard
                key={requestItem.id}
                request={{
                  id: requestItem.id,
                  studentName: requestItem.studentName || 'Student',
                  studentEmail: requestItem.studentEmail || 'student@example.com',
                  className: requestItem.className || '',
                  requestDate: requestItem.dateRequested,
                  status: requestItem.status
                }}
                onApprove={() => handleClassRequest(requestItem.id, true)}
                onReject={() => handleClassRequest(requestItem.id, false)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">No class requests available.</p>
            <p className="text-gray-600 mt-2">
              Students will send requests for classes they'd like you to teach.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TutorHome;