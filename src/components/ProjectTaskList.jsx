// ProjectTaskList.jsx
import React, { useState } from 'react';
import { CheckCircle, Circle, Plus, Calendar, User } from 'lucide-react';

const ProjectTaskList = ({ projectId, tasks: initialTasks = [] }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now().toString(),
      projectId,
      title: newTask,
      completed: false,
      dueDate: null,
      assignee: null,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Project Tasks</h2>
      
      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>
      
      <div className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div 
              key={task.id}
              className={`p-3 border ${task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'} rounded-lg flex items-center justify-between`}
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`mr-3 ${task.completed ? 'text-green-500' : 'text-gray-400'} hover:text-green-600`}
                >
                  {task.completed ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </button>
                <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                  {task.title}
                </span>
              </div>
              
              <div className="flex gap-4 text-sm text-gray-500">
                {task.dueDate && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                )}
                
                {task.assignee && (
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{task.assignee}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No tasks yet. Add your first task above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTaskList;