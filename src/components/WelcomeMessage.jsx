// src/components/WelcomeMessage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const WelcomeMessage = () => {
  const { currentUser } = useAuth();
  const userName = currentUser?.displayName || 'Arnold Smith';
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="p-4 flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold">Hallo, {userName}</h1>
        <p className="text-gray-500">{today}</p>
        <div className="bg-blue-500 text-white p-4 rounded-lg mt-4">
          <p>Optimize your Efficio experience—track attendance, manage teams, and streamline HR operations effortlessly!</p>
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Export</button>
    </div>
  );
};

export default WelcomeMessage;