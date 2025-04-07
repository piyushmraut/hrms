import React from 'react';
import { SearchIcon } from 'lucide-react';

const TaskFilter = ({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
  statusOptions,
  priorityOptions,
  categoryOptions,
  assignedToOptions
}) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      category: 'all',
      assignedTo: 'all'
    });
    setSearchQuery('');
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-700">Filter Tasks</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search tasks..."
            />
          </div>
        </div>
        
        {/* Status Filter */}
        <div>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>
                {option === 'all' ? 'All Statuses' : option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Priority Filter */}
        <div>
          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {priorityOptions.map(option => (
              <option key={option} value={option}>
                {option === 'all' ? 'All Priorities' : option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Category Filter */}
        <div>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {categoryOptions.map(option => (
              <option key={option} value={option}>
                {option === 'all' ? 'All Categories' : option}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Assigned To Filter */}
        <div className="md:col-span-2">
          <select
            name="assignedTo"
            value={filters.assignedTo}
            onChange={handleFilterChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {assignedToOptions.map(option => (
              <option key={option} value={option}>
                {option === 'all' ? 'All Assignees' : option}
              </option>
            ))}
          </select>
        </div>
        
        {/* Clear Filters Button */}
        <div className="md:col-span-1 md:col-start-5">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;