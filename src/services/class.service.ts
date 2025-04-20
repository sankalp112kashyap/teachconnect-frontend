// src/services/class.service.ts
import { Class, ClassRequest } from '../models/class';

// Mock data initialization
const initMockData = () => {
  // Mock upcoming classes
  if (!localStorage.getItem('upcomingClasses')) {
    const upcomingClasses = [
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
        dateTime: new Date('2025-04-21T11:00:00').toISOString(),
        duration: 60,
        status: 'scheduled',
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
        dateTime: new Date('2025-04-22T14:00:00').toISOString(),
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
        dateTime: new Date('2025-04-23T09:00:00').toISOString(),
        duration: 60,
        status: 'scheduled',
        enrolledStudents: ['student1'],
      },
    ];
    localStorage.setItem('upcomingClasses', JSON.stringify(upcomingClasses));
  }

  // Mock class requests
  if (!localStorage.getItem('classRequests')) {
    const classRequests = [
      {
        id: '1',
        subject: { id: 'computer_science', name: 'COMPUTER SCIENCE', color: 'green-600', topics: [], level: [] },
        topic: 'Understanding Recursion',
        requestedBy: [],
        dateRequested: new Date('2025-04-18').toISOString(),
        studentsRequested: 7,
      },
      {
        id: '2',
        subject: { id: 'chemistry', name: 'CHEMISTRY', color: 'green-600', topics: [], level: [] },
        topic: 'Organic Reaction Mechanisms',
        requestedBy: [],
        dateRequested: new Date('2025-04-17').toISOString(),
        studentsRequested: 12,
      },
      {
        id: '3',
        subject: { id: 'philosophy', name: 'PHILOSOPHY', color: 'green-600', topics: [], level: [] },
        topic: 'Introduction to Ethics',
        requestedBy: [],
        dateRequested: new Date('2025-04-19').toISOString(),
        studentsRequested: 3,
      },
    ];
    localStorage.setItem('classRequests', JSON.stringify(classRequests));
  }

  // Mock discover classes
  if (!localStorage.getItem('discoverClasses')) {
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
        dateTime: new Date('2025-04-22T13:00:00').toISOString(),
        duration: 60,
        status: 'scheduled',
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
        dateTime: new Date('2025-04-25T15:00:00').toISOString(),
        duration: 60,
        status: 'scheduled',
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
        dateTime: new Date('2025-04-28T16:00:00').toISOString(),
        duration: 60,
        status: 'scheduled',
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
        dateTime: new Date('2025-04-30T14:00:00').toISOString(),
        duration: 60,
        status: 'scheduled',
        enrolledStudents: [],
      },
    ];

    const discoverClasses = [...mathClasses, ...csClasses];
    localStorage.setItem('discoverClasses', JSON.stringify(discoverClasses));
  }
};

// Initialize data
initMockData();

// Helper functions
const getUpcomingClassesData = (): Class[] => {
  const classesJson = localStorage.getItem('upcomingClasses');
  const classes = classesJson ? JSON.parse(classesJson) : [];
  
  // Convert dateTime strings back to Date objects
  return classes.map((c: any) => ({
    ...c,
    dateTime: new Date(c.dateTime)
  }));
};

const getClassRequestsData = (): ClassRequest[] => {
  const requestsJson = localStorage.getItem('classRequests');
  const requests = requestsJson ? JSON.parse(requestsJson) : [];
  
  // Convert date strings back to Date objects
  return requests.map((r: any) => ({
    ...r,
    dateRequested: new Date(r.dateRequested)
  }));
};

const getDiscoverClassesData = (): Class[] => {
  const classesJson = localStorage.getItem('discoverClasses');
  const classes = classesJson ? JSON.parse(classesJson) : [];
  
  // Convert dateTime strings back to Date objects
  return classes.map((c: any) => ({
    ...c,
    dateTime: new Date(c.dateTime)
  }));
};

// Service functions
export const getUpcomingClasses = async (userId: string): Promise<Class[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const classes = getUpcomingClassesData();
  
  // Filter classes where user is enrolled or is the tutor
  return classes.filter(c => 
    c.enrolledStudents.includes(userId) || c.tutor.id === userId
  );
};

export const getClassById = async (id: string): Promise<Class> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allClasses = [
    ...getUpcomingClassesData(),
    ...getDiscoverClassesData()
  ];
  
  const classData = allClasses.find(c => c.id === id);
  
  if (!classData) {
    throw new Error('Class not found');
  }
  
  return classData;
};

export const createClass = async (classData: Partial<Class>): Promise<Class> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const classes = getUpcomingClassesData();
  
  const newClass = {
    ...classData,
    id: `class_${Date.now()}`,
    status: 'scheduled',
    enrolledStudents: [],
  } as Class;
  
  const updatedClasses = [...classes, newClass];
  localStorage.setItem('upcomingClasses', JSON.stringify(updatedClasses));
  
  return newClass;
};

export const enrollInClass = async (classId: string, userId: string): Promise<any> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const classes = getUpcomingClassesData();
  
  const classIndex = classes.findIndex(c => c.id === classId);
  if (classIndex === -1) {
    throw new Error('Class not found');
  }
  
  // Avoid duplicate enrollment
  if (!classes[classIndex].enrolledStudents.includes(userId)) {
    classes[classIndex].enrolledStudents.push(userId);
  }
  
  localStorage.setItem('upcomingClasses', JSON.stringify(classes));
  
  return classes[classIndex];
};

export const getClassRequests = async (): Promise<ClassRequest[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return getClassRequestsData();
};

export const createClassRequest = async (requestData: Partial<ClassRequest>): Promise<ClassRequest> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const requests = getClassRequestsData();
  
  const newRequest = {
    ...requestData,
    id: `request_${Date.now()}`,
    requestedBy: requestData.requestedBy || [],
    dateRequested: new Date(),
    studentsRequested: requestData.requestedBy ? requestData.requestedBy.length : 0
  } as ClassRequest;
  
  const updatedRequests = [...requests, newRequest];
  localStorage.setItem('classRequests', JSON.stringify(updatedRequests));
  
  return newRequest;
};

export const requestClass = async (
  classRequestId: string, 
  userId: string
): Promise<any> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const requests = getClassRequestsData();
  
  const requestIndex = requests.findIndex(r => r.id === classRequestId);
  if (requestIndex === -1) {
    throw new Error('Class request not found');
  }
  
  // Avoid duplicate requests
  if (!requests[requestIndex].requestedBy.includes(userId)) {
    requests[requestIndex].requestedBy.push(userId);
    requests[requestIndex].studentsRequested = requests[requestIndex].requestedBy.length;
  }
  
  localStorage.setItem('classRequests', JSON.stringify(requests));
  
  return requests[requestIndex];
};

export const getDiscoverClasses = async (subjects?: string[]): Promise<Class[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const classes = getDiscoverClassesData();
  
  if (subjects && subjects.length > 0) {
    return classes.filter(c => subjects.includes(c.subject.id));
  }
  
  return classes;
};

export const getReviewsForTutor = async (tutorId: string): Promise<any[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock reviews
  return [
    {
      id: '1',
      userId: 'user1',
      tutorId: tutorId,
      classId: 'class1',
      rating: 5,
      comment: 'Excellent teacher, very patient and explains concepts clearly.',
      date: new Date('2025-04-15'),
      firstName: 'Michael',
      lastName: 'B.',
    },
    {
      id: '2',
      userId: 'user2',
      tutorId: tutorId,
      classId: 'class2',
      rating: 5,
      comment: 'Great at breaking down complex topics into understandable parts.',
      date: new Date('2025-04-10'),
      firstName: 'Jessica',
      lastName: 'L.',
    },
    {
      id: '3',
      userId: 'user3',
      tutorId: tutorId,
      classId: 'class3',
      rating: 4,
      comment: 'Very knowledgeable, sometimes moves a bit fast but overall excellent.',
      date: new Date('2025-04-05'),
      firstName: 'Sam',
      lastName: 'T.',
    }
  ];
};

export const createReview = async (reviewData: any): Promise<any> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, we would store this in localStorage
  return {
    ...reviewData,
    id: `review_${Date.now()}`,
    date: new Date()
  };
};

export const searchClasses = async (query: string): Promise<Class[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allClasses = [
    ...getUpcomingClassesData(),
    ...getDiscoverClassesData()
  ];
  
  const lowercaseQuery = query.toLowerCase();
  
  return allClasses.filter(c => 
    c.title.toLowerCase().includes(lowercaseQuery) ||
    c.description.toLowerCase().includes(lowercaseQuery) ||
    c.subject.name.toLowerCase().includes(lowercaseQuery) ||
    c.topic.toLowerCase().includes(lowercaseQuery)
  );
};