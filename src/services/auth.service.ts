// src/services/auth.service.ts
import { User } from '../models/user';

// Mock users data
const MOCK_USERS = [
  {
    id: 'user1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'student@example.com',
    password: 'password123',
    role: 'student',
    profilePicture: undefined
  },
  {
    id: 'user2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'tutor@example.com',
    password: 'password123',
    role: 'tutor',
    profilePicture: undefined
  },
  {
    id: 'user3',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'both@example.com',
    password: 'password123',
    role: 'both',
    profilePicture: undefined
  }
];

// Save mock users to localStorage on first load
const initMockUsers = () => {
  if (!localStorage.getItem('mockUsers')) {
    localStorage.setItem('mockUsers', JSON.stringify(MOCK_USERS));
  }
};

// Call this function immediately
initMockUsers();

// Get users from localStorage
const getUsers = (): any[] => {
  const usersJson = localStorage.getItem('mockUsers');
  return usersJson ? JSON.parse(usersJson) : [];
};

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Filter out the password before returning the user
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: 'student' | 'tutor' | 'both'
): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const users = getUsers();
  
  // Check if user already exists
  if (users.some(u => u.email === email)) {
    throw new Error('User with this email already exists');
  }

  // Create new user
  const newUser = {
    id: `user${users.length + 1}`,
    firstName,
    lastName,
    email,
    password,
    role,
    profilePicture: undefined
  };

  // Add to localStorage
  localStorage.setItem('mockUsers', JSON.stringify([...users, newUser]));

  // Filter out the password before returning the user
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword as User;
};

export const logout = async (): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return Promise.resolve();
};

export const updateStudentProfile = async (profile: any): Promise<any> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Store profile in localStorage
  localStorage.setItem(`studentProfile_${profile.userId}`, JSON.stringify(profile));
  
  return profile;
};

export const updateTutorProfile = async (profile: any): Promise<any> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Store profile in localStorage
  localStorage.setItem(`tutorProfile_${profile.userId}`, JSON.stringify(profile));
  
  return profile;
};

export const getStudentProfile = async (userId: string): Promise<any> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const profileJson = localStorage.getItem(`studentProfile_${userId}`);
  if (!profileJson) {
    throw new Error('Profile not found');
  }
  
  return JSON.parse(profileJson);
};

export const getTutorProfile = async (userId: string): Promise<any> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const profileJson = localStorage.getItem(`tutorProfile_${userId}`);
  if (!profileJson) {
    throw new Error('Profile not found');
  }
  
  return JSON.parse(profileJson);
};