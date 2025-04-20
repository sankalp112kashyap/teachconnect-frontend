export const setupMockProfiles = () => {
  const studentProfile = {
    aboutMe: 'Interested in learning advanced calculus and algorithms. Looking for challenging problems and clear explanations.',
    subjectsInterested: ['Computer Science', 'Mathematics', 'Physics'],
    educationLevel: 'Undergraduate',
    institution: 'UC Berkeley'
  };

  const tutorProfile = {
    aboutMe: 'I am a passionate tutor with experience helping students grasp complex mathematical concepts. My focus is on building foundational understanding.',
    currentInstitution: 'Stanford University (Postdoc)',
    education: [
      {
        degree: 'PhD in Applied Mathematics',
        institution: 'UC Davis',
        year: '2021'
      },
      {
        degree: 'BSc in Mathematics',
        institution: 'UC Berkeley',
        year: '2017'
      }
    ],
    experiences: [
      {
        title: 'Math Tutor',
        institution: 'UC Davis Academic Assistance',
        startDate: '2023-05-01',
        endDate: '2024-06-15',
        description: 'Tutored undergraduate students in Calculus I & II, and Linear Algebra. Received positive feedback for clarity and patience.'
      },
      {
        title: 'Graduate Teaching Assistant',
        institution: 'UC Davis Math Dept.',
        startDate: '2021-09-01',
        endDate: '2023-06-15',
        description: 'Led discussion sections for Applied Mathematics courses, graded assignments, and held office hours.'
      }
    ],
    subjectsTeaching: ['Mathematics', 'Applied Mathematics', 'Statistics'],
    teachingLevel: ['Undergraduate', 'Graduate', 'High School']
  };

  localStorage.setItem('studentProfile_user5', JSON.stringify(studentProfile));
  localStorage.setItem('tutorProfile_user5', JSON.stringify(tutorProfile));
}; 