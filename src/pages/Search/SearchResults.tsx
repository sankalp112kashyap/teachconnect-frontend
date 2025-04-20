// src/pages/Search/SearchResults.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchClasses } from '../../services/class.service';
import { useUserRole } from '../../hooks/useUserRole';
import SearchBar from '../../components/search/searchBar';
import ClassCard from '../../components/class/ClassCard';
import ClassRequestCard from '../../components/class/ClassRequestCard';
import { Class, ClassRequest } from '../../models/class';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeRole } = useUserRole();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  const [classResults, setClassResults] = useState<Class[]>([]);
  const [requestResults, setRequestResults] = useState<ClassRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchClasses(searchQuery);
        
        // Filter based on role
        if (activeRole === 'student') {
          // Show scheduled classes and class requests matching the query
          setClassResults(data);
          setRequestResults([]); // We'll need a separate API call for requests
        } else {
          // For tutors, only show student class requests matching the query
          setRequestResults([]); // We'll need a separate API call for requests
        }
      } catch (error) {
        console.error('Search error:', error);
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    // Mock data for development
    if (activeRole === 'student') {
      setClassResults([
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
          enrolledStudents: [],
        },
        {
          id: '2',
          subject: { id: 'mathematics', name: 'MATHEMATICS', color: 'indigo-600', topics: [], level: [] },
          topic: 'Limits and Continuity',
          title: 'Limits and Continuity',
          description: 'Understanding limits, computing limits, infinite limits, and continuity of functions.',
          tutor: {
            id: 'tutor1',
            firstName: 'Evelyn',
            lastName: 'Reed',
            profilePicture: undefined,
            rating: 4.9,
          },
          dateTime: new Date('2025-04-25T13:00:00'),
          duration: 60,
          status: 'scheduled',
          enrolledStudents: [],
        },
      ]);
    }

    setRequestResults([
      {
        id: '1',
        subject: { id: 'mathematics', name: 'MATHEMATICS', color: 'green-600', topics: [], level: [] },
        topic: 'Understanding Limits (Calculus I)',
        requestedBy: [],
        dateRequested: new Date('2025-04-12'),
        studentsRequested: 9,
      },
      {
        id: '2',
        subject: { id: 'mathematics', name: 'MATHEMATICS', color: 'green-600', topics: [], level: [] },
        topic: 'Advanced Integration Techniques (Calculus II)',
        requestedBy: [],
        dateRequested: new Date('2025-04-15'),
        studentsRequested: 5,
      },
    ]);

    setIsLoading(false);

    // Uncomment to fetch actual data from API
    // fetchSearchResults();
  }, [searchQuery, activeRole]);

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      );
    }

    if (!searchQuery.trim()) {
      return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-600">Please enter a search term to find classes or requests.</p>
        </div>
      );
    }

    const hasResults = (activeRole === 'student' && classResults.length > 0) || requestResults.length > 0;

    if (!hasResults) {
      return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-600">No results found for "{searchQuery}".</p>
          <p className="text-gray-600 mt-2">
            Try a different search term or browse the available classes.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {activeRole === 'student' && classResults.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Available Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classResults.map((classItem) => (
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
          </section>
        )}

        {requestResults.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {activeRole === 'student' ? 'Requested Classes' : 'Student Requests'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requestResults.map((request) => (
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
                  onApprove={() => console.log('Approve request:', request.id)}
                  onReject={() => console.log('Reject request:', request.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl mx-auto">
        <SearchBar
          onSearch={handleSearch}
          initialValue={searchQuery}
          placeholder={activeRole === 'student' 
            ? 'Search for classes or topics...' 
            : 'Search for student requests...'}
        />
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Search'}
        </h1>
        <p className="text-gray-600 mt-2">
          {activeRole === 'student'
            ? 'Find classes to join or see if others have requested similar topics'
            : 'Find student requests that match your teaching expertise'}
        </p>
      </div>

      {renderContent()}
    </div>
  );
};

export default SearchResults;