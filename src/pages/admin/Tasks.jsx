
import React, { useState, useEffect } from 'react';
import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';
import TaskFilter from '../../components/TaskFilter';
import TaskStatistics from '../../components/TaskStatistics';
import TaskViewSelector from '../../components/TaskViewSelector';
import KanbanView from '../../components/KanbanView';
import { PlusIcon, XIcon, ArrowUpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Tasks() {
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('hrms-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, title: 'Complete employee onboarding', description: 'Finish documentation for new hires', status: 'pending', priority: 'high', assignedTo: 'John Doe', dueDate: '2025-04-15', category: 'HR', created: '2025-04-01' },
      { id: 2, title: 'Review payroll reports', description: 'Check monthly payroll calculations', status: 'in-progress', priority: 'medium', assignedTo: 'Jane Smith', dueDate: '2025-04-10', category: 'Finance', created: '2025-04-02' },
      { id: 3, title: 'Update employee handbook', description: 'Add new policies and procedures', status: 'completed', priority: 'low', assignedTo: 'Alex Johnson', dueDate: '2025-04-05', category: 'HR', created: '2025-03-25' },
      { id: 4, title: 'Upgrade office WiFi', description: 'Install new routers in all departments', status: 'pending', priority: 'medium', assignedTo: 'IT Team', dueDate: '2025-04-20', category: 'IT', created: '2025-04-03' },
      { id: 5, title: 'Plan company retreat', description: 'Research venues and activities', status: 'in-progress', priority: 'low', assignedTo: 'Sarah Williams', dueDate: '2025-05-15', category: 'Events', created: '2025-04-01' },
      { id: 6, title: 'Create social media campaign', description: 'Develop content for Q2 marketing', status: 'pending', priority: 'high', assignedTo: 'Marketing Team', dueDate: '2025-04-12', category: 'Marketing', created: '2025-04-02' },
      { id: 7, title: 'Order office supplies', description: 'Restock stationery and pantry items', status: 'pending', priority: 'low', assignedTo: 'Admin Team', dueDate: '2025-04-08', category: 'Operations', created: '2025-04-03' }
    ];
  });

  // State for form visibility, filters, and view
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    assignedTo: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('table');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('hrms-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle scroll for showing "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    if (editingTaskId === taskId) {
      setEditingTaskId(null);
    }
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
    setEditingTaskId(null);
  };

  // Start editing a task
  const startEditing = (taskId) => {
    setEditingTaskId(taskId);
    if (currentView === 'kanban') {
      setCurrentView('table');
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTaskId(null);
  };

  // Get unique values for filter dropdowns
  const getUniqueValues = (property) => {
    const values = new Set(tasks.map(task => task[property]));
    
    // For categories, include some default options
    if (property === 'category') {
      const defaultCategories = ['HR', 'Finance', 'IT', 'Marketing', 'Operations', 'Events'];
      defaultCategories.forEach(cat => values.add(cat));
    }
    
    return ['all', ...values];
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

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-4">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-6 bg-white p-6 rounded-xl shadow-sm"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex items-center">
            <span className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Task Management
            </h1>
          </div>
          <motion.button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
          </motion.button>
        </motion.div>

        {/* Task Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              className="mb-6 bg-white p-6 rounded-xl shadow-md"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <TaskForm 
                addTask={addTask} 
                categories={getUniqueValues('category').filter(c => c !== 'all')}
                users={getUniqueValues('assignedTo').filter(u => u !== 'all')}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Statistics */}
        <motion.div 
          className="mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <TaskStatistics statistics={statistics} />
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="mb-6 bg-white p-4 rounded-xl shadow-md"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
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
        </motion.div>

        {/* View Selector */}
        <motion.div 
          className="mb-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <TaskViewSelector 
            currentView={currentView} 
            setCurrentView={setCurrentView} 
          />
        </motion.div>

        {/* Task List or Kanban View */}
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {currentView === 'table' ? (
            <TaskList 
              tasks={filteredTasks} 
              deleteTask={deleteTask} 
              updateTaskStatus={updateTaskStatus}
              editingTaskId={editingTaskId}
              startEditing={startEditing}
              cancelEditing={cancelEditing}
              updateTask={updateTask}
            />
          ) : (
            <KanbanView 
              tasks={filteredTasks}
              updateTaskStatus={updateTaskStatus}
              startEditing={startEditing}
              deleteTask={deleteTask}
            />
          )}
        </motion.div>
        
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg z-50"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUpCircle className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Tasks;