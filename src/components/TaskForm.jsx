import React, { useState } from 'react';

const TaskForm = ({ addTask, categories = [], users = [] }) => {
  const initialState = {
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    assignedTo: users.length > 0 ? users[0] : '',
    dueDate: new Date().toISOString().split('T')[0],
    category: categories.length > 0 ? categories[0] : 'HR'
  };

  const [taskData, setTaskData] = useState(initialState);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addTask(taskData);
      setTaskData(initialState); // Reset form
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title*
          </label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Task title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category*
          </label>
          <div className="relative">
            <select
              name="category"
              value={taskData.category}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              {categories.length > 0 ? (
                categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))
              ) : (
                <>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="IT">IT</option>
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Marketing</option>
                </>
              )}
            </select>
          </div>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description*
        </label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          rows="3"
          className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          placeholder="Task description"
        ></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned To*
          </label>
          <div className="relative">
            <select
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border ${errors.assignedTo ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              {users.length > 0 ? (
                users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))
              ) : (
                <>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Alex Johnson">Alex Johnson</option>
                  <option value="Sarah Williams">Sarah Williams</option>
                </>
              )}
            </select>
          </div>
          {errors.assignedTo && <p className="mt-1 text-sm text-red-600">{errors.assignedTo}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date*
          </label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.dueDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;