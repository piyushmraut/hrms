import React, { useState } from 'react';
import { 
  Calendar, CheckCircle, Clock, Flag, Layers, 
  Users, FileText, AlertCircle, ChevronDown, X
} from 'lucide-react';
import { motion } from 'framer-motion';

const TaskEditForm = ({ task, saveTask, cancelEditing }) => {
  const [taskData, setTaskData] = useState({...task});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!taskData.title.trim()) newErrors.title = 'Title is required';
    if (!taskData.description.trim()) newErrors.description = 'Description is required';
    if (!taskData.assignedTo.trim()) newErrors.assignedTo = 'Assignee is required';
    if (!taskData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!taskData.category.trim()) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        saveTask(taskData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
    >
      <form onSubmit={handleSubmit}>
        <motion.div variants={fadeIn} className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Layers className="text-blue-500 mr-2" size={28} />
            <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Edit Task
            </h2>
          </div>
          <button
            type="button"
            onClick={cancelEditing}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div variants={fadeIn} className="relative">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FileText className="mr-2" size={16} />
              Title*
            </label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
              placeholder="Enter task title"
            />
            {errors.title && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="mt-1 flex items-center text-sm text-red-600"
              >
                <AlertCircle className="mr-1" size={14} />
                {errors.title}
              </motion.p>
            )}
          </motion.div>
          
          <motion.div variants={fadeIn} className="relative">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Layers className="mr-2" size={16} />
              Category*
            </label>
            <div className="relative">
              <input
                type="text"
                name="category"
                value={taskData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                placeholder="Enter category"
              />
              {errors.category && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="mt-1 flex items-center text-sm text-red-600"
                >
                  <AlertCircle className="mr-1" size={14} />
                  {errors.category}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
        
        <motion.div variants={fadeIn} className="mb-6">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FileText className="mr-2" size={16} />
            Description*
          </label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
            placeholder="Describe the task in detail..."
          ></textarea>
          {errors.description && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="mt-1 flex items-center text-sm text-red-600"
            >
              <AlertCircle className="mr-1" size={14} />
              {errors.description}
            </motion.p>
          )}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div variants={fadeIn} className="relative">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Flag className={`mr-2 ${getPriorityColor(taskData.priority)}`} size={16} />
              Priority
            </label>
            <div className="relative">
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-300"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={18} />
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="relative">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <CheckCircle className="mr-2 text-blue-500" size={16} />
              Status
            </label>
            <div className="relative">
              <select
                name="status"
                value={taskData.status}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-300"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={18} />
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="relative">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Users className="mr-2 text-blue-500" size={16} />
              Assigned To*
            </label>
            <div className="relative">
              <input
                type="text"
                name="assignedTo"
                value={taskData.assignedTo}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.assignedTo ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                placeholder="Enter assignee name"
              />
              {errors.assignedTo && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="mt-1 flex items-center text-sm text-red-600"
                >
                  <AlertCircle className="mr-1" size={14} />
                  {errors.assignedTo}
                </motion.p>
              )}
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="relative">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="mr-2 text-blue-500" size={16} />
              Due Date*
            </label>
            <div className="relative">
              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.dueDate ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
              />
              <Clock className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={18} />
            </div>
            {errors.dueDate && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="mt-1 flex items-center text-sm text-red-600"
              >
                <AlertCircle className="mr-1" size={14} />
                {errors.dueDate}
              </motion.p>
            )}
          </motion.div>
        </div>
        
        <motion.div 
          variants={fadeIn}
          className="flex justify-end space-x-4"
        >
          <motion.button
            type="button"
            onClick={cancelEditing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 flex items-center ${isSubmitting ? 'opacity-70' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2" size={18} />
                Save Changes
              </>
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default TaskEditForm;