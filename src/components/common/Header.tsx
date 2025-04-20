// src/components/common/Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useUserRole } from '../../hooks/useUserRole';
import Button from './Button';
import UserProfileMenu from './UserProfileMenu';
import SearchBar from '../search/searchBar';

interface HeaderProps {
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showSearch = true }) => {
  const { isAuthenticated } = useAuth();
  const { activeRole, setActiveRole, availableRoles } = useUserRole();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Teachsy
            </Link>
          </div>

          {/* Only show search when authenticated and showSearch is true */}
          {isAuthenticated && showSearch && (
            <div className="flex-1 max-w-lg mx-8">
              <SearchBar onSearch={handleSearch} />
            </div>
          )}

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {availableRoles.length > 1 && (
                  <div className="mr-2">
                    <select
                      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={activeRole}
                      onChange={(e) => setActiveRole(e.target.value as 'student' | 'tutor')}
                    >
                      {availableRoles.map((role) => (
                        <option key={role} value={role}>
                          {role === 'student' ? 'Student View' : 'Tutor View'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <UserProfileMenu />
              </>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;