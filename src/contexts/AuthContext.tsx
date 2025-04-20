import React, { createContext, useEffect, useState } from 'react';
import { User } from '../models/user';
import { login, register, logout } from '../services/auth.service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (firstName: string, lastName: string, email: string, password: string, role: 'student' | 'tutor' | 'both') => Promise<User>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => Promise.resolve({} as User),
  register: () => Promise.resolve({} as User),
  logout: () => Promise.resolve(),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage or a token in cookies)
    const checkAuthStatus = async () => {
      try {
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const userData = JSON.parse(userJson);
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to restore auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await login(email, password);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (firstName: string, lastName: string, email: string, password: string, role: 'student' | 'tutor' | 'both') => {
    try {
      const user = await register(firstName, lastName, email, password, role);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
