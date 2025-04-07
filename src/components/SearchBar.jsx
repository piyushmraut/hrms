import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="p-4 border-b bg-white sticky top-0 z-10 shadow-sm">
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search emails..."
          className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>
    </div>
  );
};

export default SearchBar;