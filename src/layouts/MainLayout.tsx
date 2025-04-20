// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import { useAuth } from 'hooks/useAuth';

const MainLayout: React.FC = () => {
  // const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header showSearch={isAuthenticated} /> */}
      <Header />
      <main className="py-6">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-indigo-600">Teachsy</h3>
              <p className="mt-2 text-sm text-gray-500">
                Connecting passionate teachers with eager students.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
                  For Students
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Find Classes
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Request a Class
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Student Resources
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
                  For Tutors
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Create Classes
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Tutor Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Teaching Resources
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 text-center">
              &copy; {new Date().getFullYear()} Teachsy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;