export interface Review {
    id: string;
    userId: string;
    tutorId: string;
    classId: string;
    rating: number;
    comment: string;
    date: Date;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  }