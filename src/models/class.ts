import { EducationLevel } from "./user";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: 'student' | 'tutor' | 'both';
  profileImage?: string;
  rating?: number;
  bio?: string;
  subjects?: string[];
}

export interface Subject {
  id: string;
  name: string;
  slug?: string;
  image?: string;
}

export type ClassStatus = 'scheduled' | 'canceled' | 'completed';

export interface Class {
  id: string;
  title: string;
  description: string;
  tutor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    rating: number;
  };
  dateTime: string;
  duration: number;
  subject: {
    id: string;
    name: string;
  };
  level: string;
  capacity: number;
  enrolledStudents: { id: string; firstName: string; lastName: string; }[];
  materials?: string[];
  prerequisites?: string[];
  status?: ClassStatus;
  price?: number;
  imageUrl?: string;
  reviewCount?: number;
  topic?: string;
}

export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface ClassRequest {
  id: string;
  studentId?: string;
  studentName?: string;
  studentEmail?: string;
  topic?: string;
  className?: string;
  description?: string;
  preferredSchedule?: string;
  preferredLevel?: string;
  dateRequested: string;
  status: RequestStatus;
  subject?: Subject;
  requestedBy?: string[];
  studentsRequested?: number;
}