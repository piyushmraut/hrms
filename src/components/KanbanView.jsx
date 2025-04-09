

import React, { useState } from 'react';
import { PlusIcon, Edit2Icon, Trash2Icon, ClockIcon, TagIcon, UserIcon } from 'lucide-react';

const KanbanView = ({ tasks, updateTaskStatus, startEditing, deleteTask }) => {
  // Group tasks by status
  const tasksByStatus = {
    pending: tasks.filter(task => task.status === 'pending'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    completed: tasks.filter(task => task.status === 'completed')
  };

  // State for tracking which task is being dragged
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // Function to determine the color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-rose-500';
      case 'medium': return 'border-l-4 border-amber-500';
      case 'low': return 'border-l-4 border-emerald-500';
      default: return '';
    }
  };

  // Check if a task is past due date
  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  // Render a task card
  const TaskCard = ({ task }) => (
    <div 
      className={`mb-3 p-4 bg-white rounded-lg shadow-sm ${getPriorityColor(task.priority)} 
        hover:shadow-md transition-all duration-300 ease-in-out 
        ${draggedTaskId === task.id ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', task.id.toString());
        setDraggedTaskId(task.id);
      }}
      onDragEnd={() => setDraggedTaskId(null)}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-800">{task.title}</h4>
        <div className="flex space-x-1">
          <button 
            onClick={() => startEditing(task.id)}
            className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
          >
            <Edit2Icon className="w-4 h-4" />
          </button>
          <button 
            onClick={() => deleteTask(task.id)}
            className="text-gray-400 hover:text-rose-600 transition-colors duration-200"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-800">
          <TagIcon className="w-3 h-3" />
          {task.category}
        </span>
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
          isOverdue(task.dueDate) 
            ? 'bg-rose-100 text-rose-800' 
            : 'bg-sky-100 text-sky-800'
        }`}>
          <ClockIcon className="w-3 h-3" />
          {task.dueDate}
        </span>
      </div>
      
      <div className="flex items-center justify-between mt-2 text-sm">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs text-white shadow-sm">
            {task.assignedTo.charAt(0).toUpperCase()}
          </div>
          <span className="ml-2 text-gray-600">{task.assignedTo}</span>
        </div>
      </div>
    </div>
  );

  // Handle dropping a task in a column
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    updateTaskStatus(taskId, newStatus);
    setDraggedTaskId(null);
  };

  // Allow dropping
  const allowDrop = (e) => {
    e.preventDefault();
  };

  // Handle drag enter for visual feedback
  const [activeColumn, setActiveColumn] = useState(null);

  // Column configurations with gradients and styling
  const columns = [
    { 
      id: 'pending', 
      title: 'Pending', 
      bgColor: 'bg-gradient-to-b from-amber-50 to-orange-50', 
      borderColor: 'border-amber-200',
      iconBg: 'bg-amber-500' 
    },
    { 
      id: 'in-progress', 
      title: 'In Progress', 
      bgColor: 'bg-gradient-to-b from-blue-50 to-indigo-50', 
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-500' 
    },
    { 
      id: 'completed', 
      title: 'Completed', 
      bgColor: 'bg-gradient-to-b from-emerald-50 to-green-50', 
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-500' 
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 overflow-x-auto p-4">
      {columns.map(column => (
        <div 
          key={column.id}
          className={`flex-1 min-w-[280px] ${column.bgColor} border ${column.borderColor} rounded-xl shadow-sm
            ${activeColumn === column.id ? 'ring-2 ring-indigo-300 ring-opacity-50' : ''}
            transition-all duration-300 ease-in-out`}
          onDrop={(e) => handleDrop(e, column.id)}
          onDragOver={allowDrop}
          onDragEnter={() => setActiveColumn(column.id)}
          onDragLeave={() => setActiveColumn(null)}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${column.iconBg} mr-2`}></div>
              <h3 className="font-semibold text-gray-700">{column.title}</h3>
            </div>
            <span className="bg-white text-gray-600 text-xs font-medium rounded-full px-2 py-1 shadow-sm">
              {tasksByStatus[column.id].length}
            </span>
          </div>
          
          <div className="p-4 h-[calc(100vh-280px)] overflow-y-auto">
            {tasksByStatus[column.id].map((task, index) => (
              <div 
                key={task.id} 
                className="animate-fadeIn" 
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TaskCard task={task} />
              </div>
            ))}
            
            {tasksByStatus[column.id].length === 0 && (
              <div className="text-center py-12 text-gray-400 animate-pulse">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                  <PlusIcon className="w-6 h-6 text-gray-400" />
                </div>
                <p>Drop tasks here</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default KanbanView;

