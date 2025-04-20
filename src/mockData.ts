// src/mockData.ts

import { Class, ClassRequest } from './models/class';

// Mock upcoming classes
export const mockUpcomingClasses: Class[] = [
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
];

// Mock class requests
export const mockClassRequests: ClassRequest[] = [
  {
    id: '1',
    subject: { id: 'computer_science', name: 'COMPUTER SCIENCE', color: 'green-600', topics: [], level: [] },
    topic: 'Understanding Recursion',
    requestedBy: [],
    dateRequested: new Date('2025-04-18'),
    studentsRequested: 22,
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
    studentsRequested: 32,
  },
];

// Mock discover classes - Mathematics
export const mockMathClasses: Class[] = [
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

// Mock discover classes - Computer Science
export const mockCSClasses: Class[] = [
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
    topic: 'Operating Systems',
    title: 'Operating Systems',
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

// For TutorHome
export const mockTutorClasses: Class[] = [
  {
    id: '8',
    subject: { id: 'mathematics', name: 'MATHEMATICS', color: 'indigo-600', topics: [], level: [] },
    topic: 'Calculus: Integration Techniques',
    title: 'Calculus: Integration Techniques',
    description: 'Advanced methods for solving integrals, including substitution, parts, trigonometric techniques, and partial fractions.',
    tutor: {
      id: 'tutor1',
      firstName: 'Evelyn',
      lastName: 'Reed',
      profilePicture: undefined,
      rating: 4.9,
    },
    dateTime: new Date('2025-04-24T10:00:00'),
    duration: 90,
    status: 'scheduled' as const,
    enrolledStudents: ['student1', 'student2', 'student3'],
  },
  {
    id: '9',
    subject: { id: 'computer_science', name: 'COMPUTER SCIENCE', color: 'indigo-600', topics: [], level: [] },
    topic: 'Web Development Fundamentals',
    title: 'Web Development Fundamentals',
    description: 'Introduction to HTML, CSS, and JavaScript for building modern, responsive websites.',
    tutor: {
      id: 'tutor1',
      firstName: 'Evelyn',
      lastName: 'Reed',
      profilePicture: undefined,
      rating: 4.9,
    },
    dateTime: new Date('2025-04-26T13:00:00'),
    duration: 120,
    status: 'scheduled' as const,
    enrolledStudents: ['student4', 'student5'],
  },
];

// Mock student requests for tutor view
export const mockStudentRequests: ClassRequest[] = [
  {
    id: '4',
    subject: { id: 'physics', name: 'PHYSICS', color: 'green-600', topics: [], level: [] },
    topic: 'Quantum Mechanics Basics',
    requestedBy: ['student1', 'student2', 'student3', 'student4'],
    dateRequested: new Date('2025-04-15'),
    studentsRequested: 4,
  },
  {
    id: '5',
    subject: { id: 'mathematics', name: 'MATHEMATICS', color: 'green-600', topics: [], level: [] },
    topic: 'Number Theory Introduction',
    requestedBy: ['student5', 'student6'],
    dateRequested: new Date('2025-04-16'),
    studentsRequested: 2,
  },
  {
    id: '6',
    subject: { id: 'computer_science', name: 'COMPUTER SCIENCE', color: 'green-600', topics: [], level: [] },
    topic: 'Machine Learning Fundamentals',
    requestedBy: ['student7', 'student8', 'student9', 'student10', 'student11'],
    dateRequested: new Date('2025-04-18'),
    studentsRequested: 5,
  },
];

// Mock users
export const users = [
  {
    id: 'student1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'student@example.com',
    role: 'student'
  },
  {
    id: 'tutor1',
    firstName: 'Evelyn',
    lastName: 'Reed',
    email: 'tutor@example.com',
    profilePicture: undefined,
    rating: 4.9,
    role: 'tutor'
  }
];