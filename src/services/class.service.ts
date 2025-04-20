import { Class, ClassRequest } from '../models/class';
import { apiClient } from './api';

export const getUpcomingClasses = async (userId: string): Promise<Class[]> => {
  return apiClient.get(`/classes/upcoming/${userId}`);
};

export const getClassById = async (id: string): Promise<Class> => {
  return apiClient.get(`/classes/${id}`);
};

export const createClass = async (classData: Partial<Class>): Promise<Class> => {
  return apiClient.post('/classes', classData);
};

export const enrollInClass = async (classId: string, userId: string): Promise<any> => {
  return apiClient.post(`/classes/${classId}/enroll`, { userId });
};

export const getClassRequests = async (): Promise<ClassRequest[]> => {
  return apiClient.get('/class-requests');
};

export const createClassRequest = async (requestData: Partial<ClassRequest>): Promise<ClassRequest> => {
  return apiClient.post('/class-requests', requestData);
};

export const requestClass = async (
  classRequestId: string, 
  userId: string
): Promise<any> => {
  return apiClient.post(`/class-requests/${classRequestId}/request`, { userId });
};

export const getDiscoverClasses = async (subjects?: string[]): Promise<Class[]> => {
  const queryParams = subjects?.length
    ? `?subjects=${subjects.join(',')}`
    : '';
  return apiClient.get(`/classes/discover${queryParams}`);
};

export const getReviewsForTutor = async (tutorId: string): Promise<any[]> => {
  return apiClient.get(`/reviews/tutor/${tutorId}`);
};

export const createReview = async (reviewData: any): Promise<any> => {
  return apiClient.post('/reviews', reviewData);
};

export const searchClasses = async (query: string): Promise<Class[]> => {
  return apiClient.get(`/classes/search?q=${encodeURIComponent(query)}`);
};