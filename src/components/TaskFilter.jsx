
import React from 'react';
import { Search, Filter, X, Calendar, AlertTriangle, Tag, User, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

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

  // Custom Select Component with Animation
  const CustomSelect = ({ name, value, onChange, options, icon, width }) => (
    <div className="relative" style={{ width }}>
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        {icon}
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full pl-8 pr-8 py-2 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-200 appearance-none text-gray-700 text-sm"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option === 'all' ? `All ${name.charAt(0).toUpperCase() + name.slice(1)}` : 
             (name === 'assignedTo' ? option : option.charAt(0).toUpperCase() + option.slice(1))}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
        <ChevronDown size={14} />
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center text-sm">
          <Filter className="h-4 w-4 mr-2 text-blue-500" />
          Filter Tasks
        </h3>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearFilters}
          className="flex items-center px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <X className="h-3 w-3 mr-1" />
          Clear
        </motion.button>
      </div>
      
      <div className="flex flex-nowrap items-center space-x-3 overflow-x-auto py-1">
        {/* Search Input */}
        <motion.div 
          className="flex-shrink-0 w-80"
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative ml-4">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full pl-8 pr-8 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-200 text-sm"
              placeholder="Search tasks..."
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2 flex items-center"
              >
                <X className="h-3 w-3 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </motion.div>
        
        {/* Status Filter */}
        <motion.div whileHover={{ scale: 1.01 }} className="flex-shrink-0">
          <CustomSelect 
            name="status" 
            value={filters.status} 
            onChange={handleFilterChange} 
            options={statusOptions}
            icon={<Calendar className="h-4 w-4 text-blue-500" />}
            width="200px"
          />
        </motion.div>
        
        {/* Priority Filter */}
        <motion.div whileHover={{ scale: 1.01 }} className="flex-shrink-0">
          <CustomSelect 
            name="priority" 
            value={filters.priority} 
            onChange={handleFilterChange} 
            options={priorityOptions}
            icon={<AlertTriangle className="h-4 w-4 text-orange-500" />}
            width="200px"
          />
        </motion.div>
        
        {/* Category Filter */}
        <motion.div whileHover={{ scale: 1.01 }} className="flex-shrink-0">
          <CustomSelect 
            name="category" 
            value={filters.category} 
            onChange={handleFilterChange} 
            options={categoryOptions}
            icon={<Tag className="h-4 w-4 text-purple-500" />}
            width="200px"
          />
        </motion.div>
        
        {/* Assigned To Filter */}
        {/* <motion.div whileHover={{ scale: 1.01 }} className="flex-shrink-0">
          <CustomSelect 
            name="assignedTo" 
            value={filters.assignedTo} 
            onChange={handleFilterChange} 
            options={assignedToOptions}
            icon={<User className="h-4 w-4 text-green-500" />}
            width="200px"
          />
        </motion.div> */}
      </div>
    </motion.div>
  );
};

export default TaskFilter;