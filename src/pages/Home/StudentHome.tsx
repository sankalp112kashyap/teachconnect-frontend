import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getUpcomingClasses, 
  getClassRequests, 
  getDiscoverClasses,
  requestClass
} from '../../services/class.service';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import ClassCard from '../../components/class/ClassCard';
import ClassRequestCard from '../../components/class/ClassRequestCard';
import DiscoverClassCard from '../../components/class/DiscoverClassCard';
import { Class, ClassRequest } from '../../models/class';

const StudentHome: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);
  const [classRequests, setClassRequests] = useState<ClassRequest[]>([]);
  const [discoverClasses, setDiscoverClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState({
    upcoming: true,
    requests: true,
    discover: true,
  });
  const [error, setError] = useState<string | null>(null);

  // Mock data groupings for discover section
  const [discoverSections, setDiscoverSections] = useState<{
    id: string;
    name: string;
    classes: Class[];
  }[]>([
    { id: 'mathematics', name: 'Mathematics', classes: [] },
    { id: 'computer_science', name: 'Computer Science', classes: [] },
  ]);

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

        // Fetch discover classes
        const discoverData = await getDiscoverClasses();
        setDiscoverClasses(discoverData);

        // Group discover classes by subject
        const grouped = discoverSections.map(section => ({
          ...section,
          classes: discoverData.filter(
            (c) => c.subject.id === section.id
          ),
        }));
        setDiscoverSections(grouped);
        setLoading(prev => ({ ...prev, discover: false }));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        setLoading({
          upcoming: false,
          requests: false,
          discover: false,
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
        status: 'scheduled' as const,
        enrolledStudents: ['student1'],
      },
      {
        id: '2',
        subject: { id: 'history', name: 'HISTORY', color: 'indigo-600', topics: [], level: [] },
        topic: 'The Roman Republic',
        title: 'The Roman Republic',
        description: 'An overview of the rise and fall of the Roman Republic, key figures, and major political developments.',
        tutor: {
          id: 'tutor2',
          firstName: 'James',
          lastName: 'Peterson',
          profilePicture: undefined,
          rating: 4.7,
        },
        dateTime: new Date('2025-04-22T14:00:00'),
        duration: 60,
        status: 'scheduled' as const,
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
        status: 'scheduled' as const,
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

    const mathClasses = [
      {
        id: '4',
        subject: { id: 'mathematics', name: 'MATHEMATICS', color: 'indigo-600', topics: [], level: [] },
        topic: 'Linear Algebra Basics',
        title: 'Linear Algebra Basics',
        description: 'Vectors, matrices, and solving systems of linear equations. Essential for many STEM fields.',
        tutor: {
          id: 'tutor1',
          firstName: 'Evelyn',
          lastName: 'Reed',
          profilePicture: undefined,
          rating: 4.9,
        },
        dateTime: new Date('2025-04-22T13:00:00'),
        duration: 60,
        status: 'scheduled' as const,
        enrolledStudents: [],
      },
      {
        id: '5',
        subject: { id: 'mathematics', name: 'MATHEMATICS', color: 'indigo-600', topics: [], level: [] },
        topic: 'Probability Fundamentals',
        title: 'Probability Fundamentals',
        description: 'Understanding sample spaces, events, conditional probability, and Bayes\' theorem.',
        tutor: {
          id: 'tutor3',
          firstName: 'Anita',
          lastName: 'Sharma',
          profilePicture: undefined,
          rating: 5.0,
        },
        dateTime: new Date('2025-04-25T15:00:00'),
        duration: 60,
        status: 'scheduled' as const,
        enrolledStudents: [],
      },
    ];

    const csClasses = [
      {
        id: '6',
        subject: { id: 'computer_science', name: 'COMPUTER SCIENCE', color: 'indigo-600', topics: [], level: [] },
        topic: 'Data Structures: Trees',
        title: 'Data Structures: Trees',
        description: 'Introduction to binary trees, binary search trees, traversal algorithms (inorder, preorder, postorder), and basic tree operations.',
        tutor: {
          id: 'tutor2',
          firstName: 'James',
          lastName: 'Peterson',
          profilePicture: undefined,
          rating: 4.7,
        },
        dateTime: new Date('2025-04-28T16:00:00'),
        duration: 60,
        status: 'scheduled' as const,
        enrolledStudents: [],
      },
      {
        id: '7',
        subject: { id: 'computer_science', name: 'COMPUTER SCIENCE', color: 'indigo-600', topics: [], level: [] },
        topic: 'Intro to Operating Systems',
        title: 'Intro to Operating Systems',
        description: 'Core concepts: processes, threads, memory management, and concurrency. Understanding how modern operating systems work.',
        tutor: {
          id: 'tutor1',
          firstName: 'Evelyn',
          lastName: 'Reed',
          profilePicture: undefined,
          rating: 4.9,
        },
        dateTime: new Date('2025-04-30T14:00:00'),
        duration: 60,
        status: 'scheduled' as const,
        enrolledStudents: [],
      },
    ];

    setDiscoverSections([
      { id: 'mathematics', name: 'Mathematics', classes: mathClasses },
      { id: 'computer_science', name: 'Computer Science', classes: csClasses },
    ]);

    setLoading({
      upcoming: false,
      requests: false,
      discover: false,
    });

    // Uncomment to fetch actual data from API
    // fetchData();
  }, [user]);

  const handleRequestClass = () => {
    navigate('/request-class');
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
      {/* Upcoming Classes Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Classes</h2>
        
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
                instructor={`${classItem.tutor.firstName} ${classItem.tutor.lastName}`}
                schedule={new Date(classItem.dateTime).toLocaleString()}
                capacity={30} // Mock value
                enrolled={classItem.enrolledStudents.length}
                onEnroll={() => navigate(`/class/${classItem.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">You haven't enrolled in any classes yet.</p>
            <p className="text-gray-600 mt-2">
              Explore the Discover section below to find classes that interest you.
            </p>
          </div>
        )}
      </section>
      
      {/* Requested Classes Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Requested Classes</h2>
          <Button
            variant="success"
            size="sm"
            onClick={handleRequestClass}
          >
            + Request a New Class
          </Button>
        </div>
        
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
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">No class requests available.</p>
            <p className="text-gray-600 mt-2">
              Be the first to request a class on a topic you're interested in!
            </p>
          </div>
        )}
      </section>
      
      {/* Discover Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Discover</h2>
        
        {loading.discover ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : discoverSections.some(section => section.classes.length > 0) ? (
          <div className="space-y-10">
            {discoverSections.map((section) => 
              section.classes.length > 0 && (
                <div key={section.id} className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">{section.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.classes.map((classItem) => (
                      <DiscoverClassCard
                        key={classItem.id}
                        classData={{
                          id: classItem.id,
                          title: classItem.title,
                          description: classItem.description,
                          instructor: `${classItem.tutor.firstName} ${classItem.tutor.lastName}`,
                          subject: classItem.subject.name,
                          level: "Intermediate", // Mock value
                          rating: classItem.tutor.rating,
                          reviewCount: 10, // Mock value
                          price: 49.99 // Mock value
                        }}
                        onViewDetails={(id) => navigate(`/class/${id}`)}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">No classes available for discovery at the moment.</p>
            <p className="text-gray-600 mt-2">
              Check back later for new classes!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentHome;
