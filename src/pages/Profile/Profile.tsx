import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { setupMockProfiles } from '../../utils/mockData';
import './Profile.css';

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface TeachingExperience {
  title: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface StudentProfile {
  aboutMe: string;
  subjectsInterested: string[];
  educationLevel: string;
  institution: string;
}

interface TutorProfile {
  aboutMe: string;
  currentInstitution: string;
  education: Education[];
  experiences: TeachingExperience[];
  subjectsTeaching: string[];
  teachingLevel: string[];
}

const Profile: React.FC = () => {
  const [isEditingStudent, setIsEditingStudent] = useState(false);
  const [isEditingTutor, setIsEditingTutor] = useState(false);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [tutorProfile, setTutorProfile] = useState<TutorProfile | null>(null);

  useEffect(() => {
    // Set up mock data if it doesn't exist
    if (!localStorage.getItem('studentProfile_user5') || !localStorage.getItem('tutorProfile_user5')) {
      setupMockProfiles();
    }

    // Load profiles from localStorage
    const studentData = localStorage.getItem('studentProfile_user5');
    const tutorData = localStorage.getItem('tutorProfile_user5');

    if (studentData) {
      setStudentProfile(JSON.parse(studentData));
    }
    if (tutorData) {
      setTutorProfile(JSON.parse(tutorData));
    }
  }, []);

  const handleSaveStudentProfile = () => {
    if (studentProfile) {
      localStorage.setItem('studentProfile_user5', JSON.stringify(studentProfile));
      setIsEditingStudent(false);
    }
  };

  const handleSaveTutorProfile = () => {
    if (tutorProfile) {
      localStorage.setItem('tutorProfile_user5', JSON.stringify(tutorProfile));
      setIsEditingTutor(false);
    }
  };

  const renderSubjectTags = (subjects: string[]) => {
    return subjects.map((subject, index) => (
      <span
        key={index}
        className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-2 mb-2"
      >
        {subject}
      </span>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold mr-4">
          U5
        </div>
        <div>
          <h1 className="text-2xl font-bold">User user5</h1>
          <p className="text-gray-600">Member since April 2025</p>
        </div>
      </div>

      {/* Student Information */}
      {studentProfile && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Student Information</h2>
            <button
              onClick={() => {
                if (isEditingStudent) {
                  handleSaveStudentProfile();
                } else {
                  setIsEditingStudent(true);
                }
              }}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <FontAwesomeIcon icon={isEditingStudent ? faSave : faEdit} />
              <span className="ml-2">{isEditingStudent ? 'Save' : 'Edit'}</span>
            </button>
          </div>

          {isEditingStudent ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About Me
                </label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  value={studentProfile.aboutMe}
                  onChange={(e) =>
                    setStudentProfile({ ...studentProfile, aboutMe: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education Level
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={studentProfile.educationLevel}
                  onChange={(e) =>
                    setStudentProfile({
                      ...studentProfile,
                      educationLevel: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={studentProfile.institution}
                  onChange={(e) =>
                    setStudentProfile({
                      ...studentProfile,
                      institution: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjects Interested In
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Add subjects (comma-separated)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      setStudentProfile({
                        ...studentProfile,
                        subjectsInterested: [
                          ...studentProfile.subjectsInterested,
                          e.currentTarget.value.trim(),
                        ],
                      });
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <div className="mt-2">
                  {renderSubjectTags(studentProfile.subjectsInterested)}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">About Me</h3>
                <p className="text-gray-600">{studentProfile.aboutMe}</p>
              </div>
              <div>
                <h3 className="font-medium">Education Level</h3>
                <p className="text-gray-600">{studentProfile.educationLevel}</p>
              </div>
              <div>
                <h3 className="font-medium">Institution</h3>
                <p className="text-gray-600">{studentProfile.institution}</p>
              </div>
              <div>
                <h3 className="font-medium">Subjects Interested In</h3>
                <div className="mt-1">
                  {renderSubjectTags(studentProfile.subjectsInterested)}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tutor Information */}
      {tutorProfile && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Tutor Information</h2>
            <button
              onClick={() => {
                if (isEditingTutor) {
                  handleSaveTutorProfile();
                } else {
                  setIsEditingTutor(true);
                }
              }}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <FontAwesomeIcon icon={isEditingTutor ? faSave : faEdit} />
              <span className="ml-2">{isEditingTutor ? 'Save' : 'Edit'}</span>
            </button>
          </div>

          {isEditingTutor ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About Me (as Tutor)
                </label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  value={tutorProfile.aboutMe}
                  onChange={(e) =>
                    setTutorProfile({ ...tutorProfile, aboutMe: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Institution
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={tutorProfile.currentInstitution}
                  onChange={(e) =>
                    setTutorProfile({
                      ...tutorProfile,
                      currentInstitution: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teaching Level
                </label>
                <div className="mt-1">
                  {renderSubjectTags(tutorProfile.teachingLevel)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjects Teaching
                </label>
                <div className="mt-1">
                  {renderSubjectTags(tutorProfile.subjectsTeaching)}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Education</h3>
                {tutorProfile.education.map((edu, index) => (
                  <div key={index} className="mb-4 p-3 bg-gray-50 rounded-md">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md mb-2"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducation = [...tutorProfile.education];
                        newEducation[index] = { ...edu, degree: e.target.value };
                        setTutorProfile({
                          ...tutorProfile,
                          education: newEducation,
                        });
                      }}
                      placeholder="Degree"
                    />
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md mb-2"
                      value={edu.institution}
                      onChange={(e) => {
                        const newEducation = [...tutorProfile.education];
                        newEducation[index] = {
                          ...edu,
                          institution: e.target.value,
                        };
                        setTutorProfile({
                          ...tutorProfile,
                          education: newEducation,
                        });
                      }}
                      placeholder="Institution"
                    />
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={edu.year}
                      onChange={(e) => {
                        const newEducation = [...tutorProfile.education];
                        newEducation[index] = { ...edu, year: e.target.value };
                        setTutorProfile({
                          ...tutorProfile,
                          education: newEducation,
                        });
                      }}
                      placeholder="Year"
                    />
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Teaching Experience
                </h3>
                {tutorProfile.experiences.map((exp, index) => (
                  <div key={index} className="mb-4 p-3 bg-gray-50 rounded-md">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md mb-2"
                      value={exp.title}
                      onChange={(e) => {
                        const newExperiences = [...tutorProfile.experiences];
                        newExperiences[index] = { ...exp, title: e.target.value };
                        setTutorProfile({
                          ...tutorProfile,
                          experiences: newExperiences,
                        });
                      }}
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md mb-2"
                      value={exp.institution}
                      onChange={(e) => {
                        const newExperiences = [...tutorProfile.experiences];
                        newExperiences[index] = {
                          ...exp,
                          institution: e.target.value,
                        };
                        setTutorProfile({
                          ...tutorProfile,
                          experiences: newExperiences,
                        });
                      }}
                      placeholder="Institution"
                    />
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        className="p-2 border rounded-md"
                        value={exp.startDate}
                        onChange={(e) => {
                          const newExperiences = [...tutorProfile.experiences];
                          newExperiences[index] = {
                            ...exp,
                            startDate: e.target.value,
                          };
                          setTutorProfile({
                            ...tutorProfile,
                            experiences: newExperiences,
                          });
                        }}
                        placeholder="Start Date"
                      />
                      <input
                        type="text"
                        className="p-2 border rounded-md"
                        value={exp.endDate}
                        onChange={(e) => {
                          const newExperiences = [...tutorProfile.experiences];
                          newExperiences[index] = {
                            ...exp,
                            endDate: e.target.value,
                          };
                          setTutorProfile({
                            ...tutorProfile,
                            experiences: newExperiences,
                          });
                        }}
                        placeholder="End Date"
                      />
                    </div>
                    <textarea
                      className="w-full p-2 border rounded-md"
                      value={exp.description}
                      onChange={(e) => {
                        const newExperiences = [...tutorProfile.experiences];
                        newExperiences[index] = {
                          ...exp,
                          description: e.target.value,
                        };
                        setTutorProfile({
                          ...tutorProfile,
                          experiences: newExperiences,
                        });
                      }}
                      placeholder="Description"
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium">About Me (as Tutor)</h3>
                <p className="text-gray-600">{tutorProfile.aboutMe}</p>
              </div>
              <div>
                <h3 className="font-medium">Current Institution</h3>
                <p className="text-gray-600">{tutorProfile.currentInstitution}</p>
              </div>
              <div>
                <h3 className="font-medium">Teaching Level</h3>
                <div className="mt-1">
                  {renderSubjectTags(tutorProfile.teachingLevel)}
                </div>
              </div>
              <div>
                <h3 className="font-medium">Subjects Teaching</h3>
                <div className="mt-1">
                  {renderSubjectTags(tutorProfile.subjectsTeaching)}
                </div>
              </div>
              <div>
                <h3 className="font-medium">Education</h3>
                {tutorProfile.education.map((edu, index) => (
                  <div key={index} className="mt-2">
                    <p className="text-gray-800 font-medium">{edu.degree}</p>
                    <p className="text-gray-600">
                      {edu.institution} ({edu.year})
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-medium">Teaching Experience</h3>
                {tutorProfile.experiences.map((exp, index) => (
                  <div key={index} className="mt-3">
                    <p className="text-gray-800 font-medium">{exp.title}</p>
                    <p className="text-gray-600">{exp.institution}</p>
                    <p className="text-gray-500 text-sm">
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="text-gray-600 mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile; 