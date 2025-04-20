// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'tutor' | 'both';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate getting user from localStorage
    const mockUser: User = {
      id: 'user5',
      name: 'User user5',
      email: 'user5@example.com',
      role: 'both'
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    // Clear local storage
    localStorage.clear();
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    logout
  };
};
