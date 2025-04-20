import { Subject } from "./class";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
    role: 'student' | 'tutor' | 'both';
  }
  
  export interface StudentProfile {
    userId: string;
    aboutMe: string;
    subjectsInterested: Subject[];
    educationLevel: EducationLevel;
    institution: string;
  }
  
  export interface TutorProfile {
    userId: string;
    aboutMe: string;
    teachingLevel: TeachingLevel[];
    experiences: Experience[];
    education: Education[];
    subjectsTeaching: Subject[];
    currentInstitution: string;
    rating: number;
    totalReviews: number;
  }
  
  export interface Experience {
    id: string;
    title: string;
    institution: string;
    startDate: Date;
    endDate?: Date;
    description: string;
  }
  
  export interface Education {
    id: string;
    degree: string;
    institution: string;
    field: string;
    year: number;
  }
  
  export type EducationLevel = 
    | 'primary'
    | 'secondary'
    | 'high_school'
    | 'undergraduate'
    | 'graduate'
    | 'postgraduate';
  
  export type TeachingLevel =
    | 'primary'
    | 'secondary'
    | 'high_school'
    | 'undergraduate'
    | 'graduate'
    | 'postgraduate';
  