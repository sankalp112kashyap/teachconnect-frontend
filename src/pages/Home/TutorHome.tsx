// src/pages/Home/TutorHome.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getUpcomingClasses, 
  getClassRequests
} from '../../services/class.service';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import ClassCard from '../../components/class/ClassCard';
import ClassRequestCard from '../../components/class/ClassRequestCard';
import ClassCreateForm from '../../components/class/ClassCreateForm';
import { Class, ClassRequest } from '../../models/class';

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
  const [selectedRequest, setSelectedRequest] = useState<{
    id: string;
    subject: string;
    topic: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch upcoming classes
        const upcomingData = await getUpcomingClasses(user.id);
        setUpcomingClasses(upcomingData);
        setLoading(prev => ({ ...prev, upcoming: false }));

        // Fetch class requests
        const requestsData = await getClassRequests();
        setClassRequests(requestsData);
        setLoading(prev => ({ ...prev, requests: false }));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        setLoading({
          upcoming: false,
          requests: false,
        });
      }
    };

    // Use mock data for development
    setUpcomingClasses([
      {
        id: '1',
        subject: { id: 'mathematics', name: 'MATHEMATICS', color: 'indigo-600', topics: [], level: [] },
        topic: 'Introduction to Derivatives',
        title: 'Introduction to Derivatives',
        description: 'Understanding the concept of limits and the formal definition of a derivative. Basic differentiation rules and applications.',
        tutor: {
          id: 'tutor1',
          firstName: 'Evelyn',
          lastName: 'Reed',
          profilePicture: undefined,
          rating: 4.9,
        },
        dateTime: new Date('2025-04-21T11:00:00'),
        duration: 60,
        status: 'scheduled',
        enrolledStudents: ['student1'],
      },
      {
        id: '3',
        subject: { id: 'physics', name: 'PHYSICS', color: 'indigo-600', topics: [], level: [] },
        topic: 'Newton\'s Laws of Motion',
        title: 'Newton\'s Laws of Motion',
        description: 'Exploring inertia, force, acceleration, and action-reaction through examples and demonstrations.',
        tutor: {
          id: 'tutor3',
          firstName: 'Anita',
          lastName: 'Sharma',
          profilePicture: undefined,
          rating: 5.0,
        },
        dateTime: new Date('2025-04-23T09:00:00'),
        duration: 60,
        status: 'scheduled',
        enrolledStudents: ['student1'],
      },
    ]);

    setClassRequests([
      {
        id: '1',
        subject: { id: 'computer_science', name: 'COMPUTER SCIENCE', color: 'green-600', topics: [], level: [] },
        topic: 'Understanding Recursion',
        requestedBy: [],
        dateRequested: new Date('2025-04-18'),
        studentsRequested: 7,
      },
      {
        id: '2',
        subject: { id: 'chemistry', name: 'CHEMISTRY', color: 'green-600', topics: [], level: [] },
        topic: 'Organic Reaction Mechanisms',
        requestedBy: [],
        dateRequested: new Date('2025-04-17'),
        studentsRequested: 12,
      },
      {
        id: '3',
        subject: { id: 'philosophy', name: 'PHILOSOPHY', color: 'green-600', topics: [], level: [] },
        topic: 'Introduction to Ethics',
        requestedBy: [],
        dateRequested: new Date('2025-04-19'),
        studentsRequested: 3,
      },
    ]);

    setLoading({
      upcoming: false,
      requests: false,
    });

    // Uncomment to fetch actual data from API
    // fetchData();
  }, [user]);

  const handleCreateClass = () => {
    setSelectedRequest(null);
    setIsCreateModalOpen(true);
  };

  const handleCreateFromRequest = (requestId: string) => {
    const request = classRequests.find((req) => req.id === requestId);
    if (request) {
      setSelectedRequest({
        id: request.id,
        subject: request.subject.id,
        topic: request.topic,
      });
      setIsCreateModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setSelectedRequest(null);
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
              // Not passing instructor prop when in instructor view
              schedule={new Date(classItem.dateTime).toLocaleString()}
              capacity={30} // Mock value
              enrolled={classItem.enrolledStudents.length}
              onEnroll={() => handleManageClass(classItem.id)}
              buttonText="Manage Class" // Custom button text for tutor view
              isInstructorView={true} // Set to true for tutor view
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
                request={{
                  id: request.id,
                  studentName: "Student", // Mock value
                  studentEmail: "student@example.com", // Mock value
                  className: request.topic,
                  requestDate: new Date(request.dateRequested).toLocaleDateString(),
                  status: "pending" as "pending" | "approved" | "rejected"
                }}
                onApprove={() => handleCreateFromRequest(request.id)}
                onReject={() => console.log('Reject request:', request.id)}
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
      
      {/* Create Class Modal */}
      <ClassCreateForm
        onSubmit={(classData) => {
          console.log('Creating class:', classData);
          handleCloseModal();
        }}
      />
    </div>
  );
};

export default TutorHome;