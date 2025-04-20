import React, { createContext, useContext, useState, useEffect } from 'react';
import * as mockData from '../mockData';
import { User } from '../models/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage or cookie)
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('teachconnect_user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // For demo purposes, auto-login as student
          const demoUser = mockData.users[0];
          setUser(demoUser as User);
          localStorage.setItem('teachconnect_user', JSON.stringify(demoUser));
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockData.users.find(u => u.email === email);
      
      if (foundUser) {
        setUser(foundUser as User);
        localStorage.setItem('teachconnect_user', JSON.stringify(foundUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('teachconnect_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 