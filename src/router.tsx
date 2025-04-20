import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useUserRole } from './hooks/useUserRole';

import MainLayout from './layouts/MainLayout';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import StudentProfile from './pages/Auth/StudentProfile';
import TutorProfile from './pages/Auth/TutorProfile';

// Home Pages
import StudentHome from './pages/Home/StudentHome';
import TutorHome from './pages/Home/TutorHome';

// Class Pages
import ClassDetails from './pages/Class/ClassDetails';

// Search Pages
import SearchResults from './pages/Search/SearchResults';

// Protected route component
const ProtectedRoute: React.FC<{ 
  element: React.ReactElement; 
  requiredRole?: 'student' | 'tutor' | null;
}> = ({ element, requiredRole }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { activeRole } = useUserRole();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && activeRole !== requiredRole) {
    return <Navigate to="/home" replace />;
  }
  
  return element;
};

// Role-based home redirect component
const HomeRedirect: React.FC = () => {
  const { activeRole } = useUserRole();
  
  if (activeRole === 'student') {
    return <StudentHome />;
  }
  
  return <TutorHome />;
};

// Create router
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/complete-student-profile',
        element: <ProtectedRoute element={<StudentProfile />} />,
      },
      {
        path: '/complete-tutor-profile',
        element: <ProtectedRoute element={<TutorProfile />} />,
      },
      {
        path: '/home',
        element: <ProtectedRoute element={<HomeRedirect />} />,
      },
      {
        path: '/class/:id',
        element: <ProtectedRoute element={<ClassDetails />} />,
      },
      {
        path: '/search',
        element: <ProtectedRoute element={<SearchResults />} />,
      },
      {
        path: '*',
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]);
