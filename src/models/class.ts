import { EducationLevel } from "./user";

export interface Class {
    id: string;
    subject: Subject;
    topic: string;
    title: string;
    description: string;
    tutor: {
      id: string;
      firstName: string;
      lastName: string;
      profilePicture?: string;
      rating: number;
    };
    dateTime: Date;
    duration: number; // in minutes
    status: ClassStatus;
    enrolledStudents: string[]; // array of student IDs
  }
  
  export interface ClassRequest {
    id: string;
    subject: Subject;
    topic: string;
    requestedBy: string[];
    dateRequested: Date;
    studentsRequested: number;
  }
  
  export type ClassStatus = 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  
  export interface Subject {
    id: string;
    name: string;
    color: string;
    topics: Topic[];
    level: EducationLevel[];        
  }
  
  export interface Topic {
    id: string;
    name: string;
  }