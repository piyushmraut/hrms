// import React, { useState } from 'react';
// import { Trash2Icon, Edit2Icon, CheckIcon, XIcon, ClockIcon } from 'lucide-react';
// import TaskEditForm from './TaskEditForm';

// const TaskList = ({ tasks, deleteTask, updateTaskStatus, updateTask }) => {
//   const [editingTaskId, setEditingTaskId] = useState(null);

//   // Function to determine the background color based on priority
//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'bg-red-100 text-red-800';
//       case 'medium': return 'bg-yellow-100 text-yellow-800';
//       case 'low': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Function to determine the background color based on status
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'completed': return 'bg-green-100 text-green-800';
//       case 'in-progress': return 'bg-blue-100 text-blue-800';
//       case 'pending': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Check if a task is past due date
//   const isOverdue = (dueDate) => {
//     return new Date(dueDate) < new Date() ? 'text-red-600 font-medium' : '';
//   };

//   // Start editing a task
//   const startEditing = (taskId) => {
//     setEditingTaskId(taskId);
//   };

//   // Cancel editing
//   const cancelEditing = () => {
//     setEditingTaskId(null);
//   };

//   // Save edited task
//   const saveTask = (task) => {
//     updateTask(task);
//     setEditingTaskId(null);
//   };

//   return (
//     <div className="overflow-x-auto">
//       {tasks.length === 0 ? (
//         <div className="p-8 text-center text-gray-500">
//           No tasks found. Create a new task to get started.
//         </div>
//       ) : (
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {tasks.map(task => (
//               editingTaskId === task.id ? (
//                 <tr key={task.id} className="bg-blue-50">
//                   <td colSpan="7" className="px-6 py-4">
//                     <TaskEditForm 
//                       task={task} 
//                       saveTask={saveTask} 
//                       cancelEditing={cancelEditing} 
//                     />
//                   </td>
//                 </tr>
//               ) : (
//                 <tr key={task.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <div className="flex flex-col">
//                       <span className="font-medium text-gray-900">{task.title}</span>
//                       <span className="text-sm text-gray-500">{task.description}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
//                       {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
//                       {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{task.assignedTo}</td>
//                   <td className={`px-6 py-4 text-sm ${isOverdue(task.dueDate)}`}>
//                     {task.dueDate}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{task.category}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     <div className="flex space-x-2">
//                       {task.status !== 'completed' && (
//                         <button 
//                           onClick={() => updateTaskStatus(task.id, 'completed')}
//                           className="text-green-600 hover:text-green-900"
//                           title="Mark as Completed"
//                         >
//                           <CheckIcon className="w-5 h-5" />
//                         </button>
//                       )}
//                       {task.status === 'pending' && (
//                         <button 
//                           onClick={() => updateTaskStatus(task.id, 'in-progress')}
//                           className="text-blue-600 hover:text-blue-900"
//                           title="Mark as In Progress"
//                         >
//                           <ClockIcon className="w-5 h-5" />
//                         </button>
//                       )}
//                       {task.status === 'completed' && (
//                         <button 
//                           onClick={() => updateTaskStatus(task.id, 'in-progress')}
//                           className="text-yellow-600 hover:text-yellow-900"
//                           title="Reopen as In Progress"
//                         >
//                           <XIcon className="w-5 h-5" />
//                         </button>
//                       )}
//                       <button 
//                         onClick={() => startEditing(task.id)}
//                         className="text-indigo-600 hover:text-indigo-900"
//                         title="Edit Task"
//                       >
//                         <Edit2Icon className="w-5 h-5" />
//                       </button>
//                       <button 
//                         onClick={() => deleteTask(task.id)}
//                         className="text-red-600 hover:text-red-900"
//                         title="Delete Task"
//                       >
//                         <Trash2Icon className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default TaskList;

// import React from 'react';
// import { Trash2Icon, Edit2Icon, CheckIcon, XIcon, ClockIcon } from 'lucide-react';
// import TaskEditForm from './TaskEditForm';

// const TaskList = ({ 
//   tasks, 
//   deleteTask, 
//   updateTaskStatus, 
//   editingTaskId, 
//   startEditing, 
//   cancelEditing, 
//   updateTask 
// }) => {
//   // Function to determine the background color based on priority
//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'bg-red-100 text-red-800';
//       case 'medium': return 'bg-yellow-100 text-yellow-800';
//       case 'low': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Function to determine the background color based on status
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'completed': return 'bg-green-100 text-green-800';
//       case 'in-progress': return 'bg-blue-100 text-blue-800';
//       case 'pending': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Check if a task is past due date
//   const isOverdue = (dueDate) => {
//     return new Date(dueDate) < new Date() ? 'text-red-600 font-medium' : '';
//   };

//   // Save edited task
//   const saveTask = (task) => {
//     updateTask(task);
//   };

//   return (
//     <div className="overflow-x-auto">
//       {tasks.length === 0 ? (
//         <div className="p-8 text-center text-gray-500">
//           No tasks found. Create a new task to get started.
//         </div>
//       ) : (
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {tasks.map(task => (
//               editingTaskId === task.id ? (
//                 <tr key={task.id} className="bg-blue-50">
//                   <td colSpan="7" className="px-6 py-4">
//                     <TaskEditForm 
//                       task={task} 
//                       saveTask={saveTask} 
//                       cancelEditing={cancelEditing} 
//                     />
//                   </td>
//                 </tr>
//               ) : (
//                 <tr key={task.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <div className="flex flex-col">
//                       <span className="font-medium text-gray-900">{task.title}</span>
//                       <span className="text-sm text-gray-500">{task.description}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
//                       {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
//                       {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{task.assignedTo}</td>
//                   <td className={`px-6 py-4 text-sm ${isOverdue(task.dueDate)}`}>
//                     {task.dueDate}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{task.category}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     <div className="flex space-x-2">
//                       {task.status !== 'completed' && (
//                         <button 
//                           onClick={() => updateTaskStatus(task.id, 'completed')}
//                           className="text-green-600 hover:text-green-900"
//                           title="Mark as Completed"
//                         >
//                           <CheckIcon className="w-5 h-5" />
//                         </button>
//                       )}
//                       {task.status === 'pending' && (
//                         <button 
//                           onClick={() => updateTaskStatus(task.id, 'in-progress')}
//                           className="text-blue-600 hover:text-blue-900"
//                           title="Mark as In Progress"
//                         >
//                           <ClockIcon className="w-5 h-5" />
//                         </button>
//                       )}
//                       {task.status === 'completed' && (
//                         <button 
//                           onClick={() => updateTaskStatus(task.id, 'in-progress')}
//                           className="text-yellow-600 hover:text-yellow-900"
//                           title="Reopen as In Progress"
//                         >
//                           <XIcon className="w-5 h-5" />
//                         </button>
//                       )}
//                       <button 
//                         onClick={() => startEditing(task.id)}
//                         className="text-indigo-600 hover:text-indigo-900"
//                         title="Edit Task"
//                       >
//                         <Edit2Icon className="w-5 h-5" />
//                       </button>
//                       <button 
//                         onClick={() => deleteTask(task.id)}
//                         className="text-red-600 hover:text-red-900"
//                         title="Delete Task"
//                       >
//                         <Trash2Icon className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default TaskList;

import React from 'react';
import { 
  Trash2, Edit2, CheckCircle, X, Clock, 
  AlertTriangle, Calendar, Tag, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskEditForm from './TaskEditForm';

const TaskList = ({ 
  tasks, 
  deleteTask, 
  updateTaskStatus, 
  editingTaskId, 
  startEditing, 
  cancelEditing, 
  updateTask 
}) => {
  // Function to determine the background color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-300',
        icon: <AlertTriangle size={14} className="mr-1 text-red-600" />
      };
      case 'medium': return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-300',
        icon: <AlertTriangle size={14} className="mr-1 text-yellow-600" />
      };
      case 'low': return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-300',
        icon: <Tag size={14} className="mr-1 text-green-600" />
      };
      default: return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        border: 'border-gray-300',
        icon: <Tag size={14} className="mr-1 text-gray-600" />
      };
    }
  };

  // Function to determine the background color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-300',
        icon: <CheckCircle size={14} className="mr-1 text-green-600" />
      };
      case 'in-progress': return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-300',
        icon: <Clock size={14} className="mr-1 text-blue-600" />
      };
      case 'pending': return {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        border: 'border-orange-300',
        icon: <Clock size={14} className="mr-1 text-orange-600" />
      };
      default: return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        border: 'border-gray-300',
        icon: <Clock size={14} className="mr-1 text-gray-600" />
      };
    }
  };

  // Check if a task is past due date
  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  // Save edited task
  const saveTask = (task) => {
    updateTask(task);
  };

  // Animation variants
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.07 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
    >
      {tasks.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-12 text-center"
        >
          <div className="flex flex-col items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Calendar size={64} className="text-gray-300 mb-4" />
            </motion.div>
            <p className="text-gray-500 text-lg font-medium">No tasks found</p>
            <p className="text-gray-400">Create a new task to get started</p>
          </div>
        </motion.div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <AnimatePresence>
              <motion.tbody 
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                className="bg-white divide-y divide-gray-100"
              >
                {tasks.map(task => (
                  editingTaskId === task.id ? (
                    <motion.tr 
                      key={`edit-${task.id}`}
                      initial={{ opacity: 0, backgroundColor: "rgba(219, 234, 254, 0)" }}
                      animate={{ 
                        opacity: 1, 
                        backgroundColor: "rgba(219, 234, 254, 1)",
                        transition: { duration: 0.3 }
                      }}
                      className="bg-blue-50"
                    >
                      <td colSpan="7" className="px-6 py-4">
                        <TaskEditForm 
                          task={task} 
                          saveTask={saveTask} 
                          cancelEditing={cancelEditing} 
                        />
                      </td>
                    </motion.tr>
                  ) : (
                    <motion.tr 
                      key={task.id}
                      variants={rowVariants}
                      exit="exit"
                      className="hover:bg-gray-50 transition-colors duration-150"
                      whileHover={{ 
                        backgroundColor: "rgba(249, 250, 251, 1)",
                        transition: { duration: 0.1 }
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{task.title}</span>
                          <span className="text-sm text-gray-500 mt-1">{task.description}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 inline-flex items-center text-xs leading-5 font-semibold rounded-full border ${getStatusColor(task.status).border} ${getStatusColor(task.status).bg} ${getStatusColor(task.status).text}`}>
                          {getStatusColor(task.status).icon}
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 inline-flex items-center text-xs leading-5 font-semibold rounded-full border ${getPriorityColor(task.priority).border} ${getPriorityColor(task.priority).bg} ${getPriorityColor(task.priority).text}`}>
                          {getPriorityColor(task.priority).icon}
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <User size={16} className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">{task.assignedTo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center text-sm ${isOverdue(task.dueDate) ? 'text-red-600' : 'text-gray-600'}`}>
                          <Calendar size={16} className={`mr-2 ${isOverdue(task.dueDate) ? 'text-red-500' : 'text-gray-400'}`} />
                          <span className={isOverdue(task.dueDate) ? 'font-medium' : ''}>
                            {task.dueDate}
                          </span>
                          {isOverdue(task.dueDate) && (
                            <motion.span 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded"
                            >
                              Overdue
                            </motion.span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Tag size={16} className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">{task.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex space-x-1">
                          {task.status !== 'completed' && (
                            <motion.button 
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateTaskStatus(task.id, 'completed')}
                              className="p-1.5 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors duration-150"
                              title="Mark as Completed"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </motion.button>
                          )}
                          {task.status === 'pending' && (
                            <motion.button 
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateTaskStatus(task.id, 'in-progress')}
                              className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-150"
                              title="Mark as In Progress"
                            >
                              <Clock className="w-4 h-4" />
                            </motion.button>
                          )}
                          {task.status === 'completed' && (
                            <motion.button 
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateTaskStatus(task.id, 'in-progress')}
                              className="p-1.5 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors duration-150"
                              title="Reopen as In Progress"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          )}
                          <motion.button 
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => startEditing(task.id)}
                            className="p-1.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors duration-150"
                            title="Edit Task"
                          >
                            <Edit2 className="w-4 h-4" />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteTask(task.id)}
                            className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-150"
                            title="Delete Task"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                ))}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default TaskList;