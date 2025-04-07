import React, { useState, useEffect } from 'react';
import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';
import TaskFilter from '../../components/TaskFilter';
import TaskStatistics from '../../components/TaskStatistics';
import { PlusIcon, XIcon } from 'lucide-react';

// Main Tasks component
function Tasks() {
  // State for tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('hrms-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, title: 'Complete employee onboarding', description: 'Finish documentation for new hires', status: 'pending', priority: 'high', assignedTo: 'John Doe', dueDate: '2025-04-15', category: 'HR', created: '2025-04-01' },
      { id: 2, title: 'Review payroll reports', description: 'Check monthly payroll calculations', status: 'in-progress', priority: 'medium', assignedTo: 'Jane Smith', dueDate: '2025-04-10', category: 'Finance', created: '2025-04-02' },
      { id: 3, title: 'Update employee handbook', description: 'Add new policies and procedures', status: 'completed', priority: 'low', assignedTo: 'Alex Johnson', dueDate: '2025-04-05', category: 'HR', created: '2025-03-25' }
    ];
  });

  // State for form visibility and filters
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    assignedTo: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('hrms-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      created: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Update task status
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Update task details
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  // Get unique values for filter dropdowns
  const getUniqueValues = (property) => {
    return ['all', ...new Set(tasks.map(task => task[property]))];
  };

  // Filter tasks based on current filters and search
  const filteredTasks = tasks.filter(task => {
    return (filters.status === 'all' || task.status === filters.status) &&
           (filters.priority === 'all' || task.priority === filters.priority) &&
           (filters.category === 'all' || task.category === filters.category) &&
           (filters.assignedTo === 'all' || task.assignedTo === filters.assignedTo) &&
           (searchQuery === '' || 
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  // Task statistics
  const statistics = {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'pending').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length,
    highPriority: tasks.filter(task => task.priority === 'high').length,
    dueSoon: tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const threeDaysLater = new Date();
      threeDaysLater.setDate(today.getDate() + 3);
      return dueDate >= today && dueDate <= threeDaysLater && task.status !== 'completed';
    }).length
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-9xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showForm ? (
              <>
                <XIcon className="w-5 h-5 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <PlusIcon className="w-5 h-5 mr-2" />
                New Task
              </>
            )}
          </button>
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="mb-6 bg-white p-6 rounded-lg shadow">
            <TaskForm 
              addTask={addTask} 
              categories={getUniqueValues('category').filter(c => c !== 'all')}
              users={getUniqueValues('assignedTo').filter(u => u !== 'all')}
            />
          </div>
        )}

        {/* Statistics */}
        <div className="mb-6">
          <TaskStatistics statistics={statistics} />
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <TaskFilter 
            filters={filters}
            setFilters={setFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusOptions={getUniqueValues('status')}
            priorityOptions={getUniqueValues('priority')}
            categoryOptions={getUniqueValues('category')}
            assignedToOptions={getUniqueValues('assignedTo')}
          />
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <TaskList 
            tasks={filteredTasks} 
            deleteTask={deleteTask} 
            updateTaskStatus={updateTaskStatus}
            updateTask={updateTask}
          />
        </div>
      </div>
    </div>
  );
}

export default Tasks;