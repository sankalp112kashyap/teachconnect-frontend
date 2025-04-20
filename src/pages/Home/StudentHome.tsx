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
    // Same initialization code as before...
    
    // Fetch data code...

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
      {classRequests.map((requestItem) => (
        <ClassRequestCard
          key={requestItem.id}
          request={{
            id: requestItem.id,
            studentName: user ? `${user.firstName} ${user.lastName}` : "Student",
            studentEmail: user ? user.email : "student@example.com",
            className: requestItem.topic,
            requestDate: new Date(requestItem.dateRequested).toISOString(),
            status: "pending"
          }}
          onApprove={() => {}} // Add empty function
          onReject={() => {}} // Add empty function
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
                          level: "Intermediate", // Default value
                          imageUrl: undefined,
                          rating: classItem.tutor.rating,
                          reviewCount: 10, // Default value
                          price: 49.99 // Default value
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