import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

type UserRole = 'student' | 'tutor';

interface UserRoleContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  availableRoles: UserRole[];
}

export const UserRoleContext = createContext<UserRoleContextType>({
  activeRole: 'student',
  setActiveRole: () => {},
  availableRoles: ['student'],
});

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [availableRoles, setAvailableRoles] = useState<UserRole[]>(['student']);

  useEffect(() => {
    if (user) {
      const roles: UserRole[] = [];
      
      if (user.role === 'student' || user.role === 'both') {
        roles.push('student');
      }
      
      if (user.role === 'tutor' || user.role === 'both') {
        roles.push('tutor');
      }
      
      setAvailableRoles(roles);
      
      // Set default active role
      if (roles.length > 0 && !roles.includes(activeRole)) {
        setActiveRole(roles[0]);
      }
    }
  }, [user, activeRole]);

  return (
    <UserRoleContext.Provider
      value={{
        activeRole,
        setActiveRole,
        availableRoles,
      }}
    >
      {children}
    </UserRoleContext.Provider>
  );
};