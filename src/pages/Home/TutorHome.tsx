// src/pages/Home/TutorHome.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getUpcomingClasses, 
  getClassRequests, 
  createClass
} from '../../services/class.service';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import ClassCard from '../../components/class/ClassCard';
import ClassRequestCard from '../../components/class/ClassRequestCard';
import ClassCreateModal from '../../components/class/ClassCreateModal';
import { Class, ClassRequest } from '../../models/class';
import { mockTutorClasses, mockStudentRequests } from '../../mockData';

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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [initialFormData, setInitialFormData] = useState<{
    subject?: string;
    topic?: string;
    level?: string;
  } | undefined>(undefined);

  useEffect(() => {
    // Set mock data instead of calling APIs
    setUpcomingClasses(mockTutorClasses || []);
    setClassRequests(mockStudentRequests || []);
    
    setLoading({
      upcoming: false,
      requests: false,
    });
    
    // Uncomment when backend is ready
    // fetchData();
  }, [user]);

  const handleCreateClass = () => {
    setInitialFormData(undefined);
    setIsCreateModalOpen(true);
  };

  const handleCreateFromRequest = (requestId: string) => {
    const request = classRequests.find((req) => req.id === requestId);
    if (request) {
      setInitialFormData({
        subject: request.subject.id,
        topic: request.topic,
        level: 'undergraduate', // Default level, would come from request in real app
      });
      setIsCreateModalOpen(true);
    }
  };

  const handleSubmitClass = async (classData: any) => {
    try {
      if (user) {
        const newClass = {
          ...classData,
          tutor: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture,
            rating: 5.0, // Default rating for new tutors
          },
          status: 'scheduled',
          enrolledStudents: [],
        };
        
        // In a real app, this would call your API
        console.log('Creating class:', newClass);
        // const createdClass = await createClass(newClass);
        
        // For now, just add it to the state
        setUpcomingClasses(prev => [
          ...prev, 
          { 
            ...newClass, 
            id: `class_${Date.now()}`,
            subject: { 
              id: classData.subject, 
              name: classData.subject.toUpperCase(), 
              color: 'indigo-600', 
              topics: [], 
              level: [] 
            },
            dateTime: new Date(classData.dateTime),
          } as Class
        ]);
      }
    } catch (error) {
      console.error('Failed to create class:', error);
    }
  };

  const handleManageClass = (classId: string) => {
    navigate(`/class/${classId}/manage`);
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
      {/* My Upcoming Classes Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Upcoming Classes</h2>
          <Button
            variant="primary"
            onClick={handleCreateClass}
          >
            + Create New Class
          </Button>
        </div>
        
        {loading.upcoming ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : upcomingClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingClasses.map((classItem) => (
              <ClassCard
                key={classItem.id}
                title={classItem.title}
                description={classItem.description}
                schedule={new Date(classItem.dateTime).toLocaleString()}
                capacity={30} // Mock value
                enrolled={classItem.enrolledStudents.length}
                onEnroll={() => handleManageClass(classItem.id)}
                buttonText="Manage Class"
                isInstructorView={true}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">You haven't created any classes yet.</p>
            <p className="text-gray-600 mt-2">
              Click the "Create New Class" button to get started!
            </p>
          </div>
        )}
      </section>
      
      {/* Student Class Requests Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Class Requests</h2>
        
        {loading.requests ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : classRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classRequests.map((request) => (
              <ClassRequestCard
                key={request.id}
                classRequest={request}
                tutorView={true}
                onCreateClass={handleCreateFromRequest}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">No student requests available.</p>
            <p className="text-gray-600 mt-2">
              Students haven't requested any classes yet. Check back later!
            </p>
          </div>
        )}
      </section>
      
      {/* Class Creation Modal */}
      <ClassCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        initialData={initialFormData}
        onSubmit={handleSubmitClass}
      />
    </div>
  );
};

export default TutorHome;