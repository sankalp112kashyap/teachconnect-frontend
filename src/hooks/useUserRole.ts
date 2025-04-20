import { useContext } from 'react';
import { UserRoleContext } from '../contexts/UserRoleContext';

export const useUserRole = () => {
  return useContext(UserRoleContext);
};