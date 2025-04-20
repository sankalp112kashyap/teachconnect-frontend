import { User } from '../models/user';
import { apiClient } from './api';

export const login = async (email: string, password: string): Promise<User> => {
  const data = await apiClient.post('/auth/login', { email, password });
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data.user;
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: 'student' | 'tutor' | 'both'
): Promise<User> => {
  const data = await apiClient.post('/auth/register', {
    firstName,
    lastName,
    email,
    password,
    role,
  });
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data.user;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('token');
  return Promise.resolve();
};

export const updateStudentProfile = async (profile: any): Promise<any> => {
  return apiClient.put('/profiles/student', profile);
};

export const updateTutorProfile = async (profile: any): Promise<any> => {
  return apiClient.put('/profiles/tutor', profile);
};

export const getStudentProfile = async (userId: string): Promise<any> => {
  return apiClient.get(`/profiles/student/${userId}`);
};

export const getTutorProfile = async (userId: string): Promise<any> => {
  return apiClient.get(`/profiles/tutor/${userId}`);
};
