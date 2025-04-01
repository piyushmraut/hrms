// src/components/Header.jsx
import React from 'react';
import { MagnifyingGlassIcon, Cog6ToothIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Cog6ToothIcon className="h-6 w-6 text-gray-600" />
        <BellIcon className="h-6 w-6 text-gray-600" />
        <UserCircleIcon className="h-6 w-6 text-gray-600" />
      </div>
    </div>
  );
};

export default Header;