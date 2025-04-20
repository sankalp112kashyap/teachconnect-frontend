// src/App.tsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './contexts/AuthContext';
import { UserRoleProvider } from './contexts/UserRoleContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <UserRoleProvider>
          <RouterProvider router={router} />
        </UserRoleProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;