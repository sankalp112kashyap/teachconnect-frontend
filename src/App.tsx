// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentHome from './pages/Home/StudentHome';
import TutorHome from './pages/Home/TutorHome';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-indigo-600">TeachConnect</h1>
          </div>
        </header>
        <main className="py-10">
          <Routes>
            <Route path="/student" element={<StudentHome />} />
            <Route path="/tutor" element={<TutorHome />} />
            <Route path="/" element={<StudentHome />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;