import React, { useState } from 'react';
import { Trash2Icon, Edit2Icon, CheckIcon, XIcon, ClockIcon } from 'lucide-react';
import TaskEditForm from './TaskEditForm';

const TaskList = ({ tasks, deleteTask, updateTaskStatus, updateTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Function to determine the background color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to determine the background color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Check if a task is past due date
  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() ? 'text-red-600 font-medium' : '';
  };

  // Start editing a task
  const startEditing = (taskId) => {
    setEditingTaskId(taskId);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTaskId(null);
  };

  // Save edited task
  const saveTask = (task) => {
    updateTask(task);
    setEditingTaskId(null);
  };

  return (
    <div className="overflow-x-auto">
      {tasks.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No tasks found. Create a new task to get started.
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map(task => (
              editingTaskId === task.id ? (
                <tr key={task.id} className="bg-blue-50">
                  <td colSpan="7" className="px-6 py-4">
                    <TaskEditForm 
                      task={task} 
                      saveTask={saveTask} 
                      cancelEditing={cancelEditing} 
                    />
                  </td>
                </tr>
              ) : (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{task.title}</span>
                      <span className="text-sm text-gray-500">{task.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{task.assignedTo}</td>
                  <td className={`px-6 py-4 text-sm ${isOverdue(task.dueDate)}`}>
                    {task.dueDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{task.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      {task.status !== 'completed' && (
                        <button 
                          onClick={() => updateTaskStatus(task.id, 'completed')}
                          className="text-green-600 hover:text-green-900"
                          title="Mark as Completed"
                        >
                          <CheckIcon className="w-5 h-5" />
                        </button>
                      )}
                      {task.status === 'pending' && (
                        <button 
                          onClick={() => updateTaskStatus(task.id, 'in-progress')}
                          className="text-blue-600 hover:text-blue-900"
                          title="Mark as In Progress"
                        >
                          <ClockIcon className="w-5 h-5" />
                        </button>
                      )}
                      {task.status === 'completed' && (
                        <button 
                          onClick={() => updateTaskStatus(task.id, 'in-progress')}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Reopen as In Progress"
                        >
                          <XIcon className="w-5 h-5" />
                        </button>
                      )}
                      <button 
                        onClick={() => startEditing(task.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit Task"
                      >
                        <Edit2Icon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Task"
                      >
                        <Trash2Icon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;