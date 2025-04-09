
// import React, { useState, useEffect } from 'react';
// const TaskForm = ({ task, addTask, updateTask, onClose, projects, employees }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     projectId: projects.length > 0 ? projects[0].id : '',
//     assignee: employees.length > 0 ? employees[0].id : '',
//     status: 'Not Started',
//     priority: 'Medium',
//     dueDate: '',
//   });

//   useEffect(() => {
//     if (task) {
//       setFormData(task);
//     } else {
//       setFormData({
//         title: '',
//         description: '',
//         projectId: projects.length > 0 ? projects[0].id : '',
//         assignee: employees.length > 0 ? employees[0].id : '',
//         status: 'Not Started',
//         priority: 'Medium',
//         dueDate: '',
//       });
//     }
//   }, [task, projects, employees]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'projectId' || name === 'assignee') {
//       setFormData({ ...formData, [name]: parseInt(value, 10) });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (task) {
//       updateTask({ ...formData, id: task.id });
//     } else {
//       addTask(formData);
//     }
//     onClose();
//   };

//   return (
//     <div className="fixed z-10 inset-0 overflow-y-auto">
//       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>
//         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
//           &#8203;
//         </span>
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//               {task ? 'Edit Task' : 'Add New Task'}
//             </h3>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//                   Task Title
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="title"
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                   Description
//                 </label>
//                 <textarea
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectId">
//                     Project
//                   </label>
//                   <select
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="projectId"
//                     name="projectId"
//                     value={formData.projectId}
//                     onChange={handleChange}
//                     required
//                   >
//                     {projects.map((project) => (
//                       <option key={project.id} value={project.id}>
//                         {project.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignee">
//                     Assignee
//                   </label>
//                   <select
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="assignee"
//                     name="assignee"
//                     value={formData.assignee}
//                     onChange={handleChange}
//                     required
//                   >
//                     {employees.map((employee) => (
//                       <option key={employee.id} value={employee.id}>
//                         {employee.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
//                     Status
//                   </label>
//                   <select
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="status"
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                   >
//                     <option value="Not Started">Not Started</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
//                     Priority
//                   </label>
//                   <select
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="priority"
//                     name="priority"
//                     value={formData.priority}
//                     onChange={handleChange}
//                   >
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
//                   Due Date
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="dueDate"
//                   type="date"
//                   name="dueDate"
//                   value={formData.dueDate}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="submit"
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskForm;

import React, { useState, useEffect } from 'react';
import { Calendar, User, CheckCircle, Clock, Bookmark, FileText, X, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskFormForProject = ({ task, addTask, updateTask, onClose, projects, employees }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: projects.length > 0 ? projects[0].id : '',
    assignee: employees.length > 0 ? employees[0].id : '',
    status: 'Not Started',
    priority: 'Medium',
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        title: '',
        description: '',
        projectId: projects.length > 0 ? projects[0].id : '',
        assignee: employees.length > 0 ? employees[0].id : '',
        status: 'Not Started',
        priority: 'Medium',
        dueDate: '',
      });
    }
  }, [task, projects, employees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'projectId' || name === 'assignee') {
      setFormData({ ...formData, [name]: parseInt(value, 10) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      updateTask({ ...formData, id: task.id });
    } else {
      addTask(formData);
    }
    onClose();
  };

  const priorityColors = {
    Low: 'bg-blue-50 text-blue-600 border-blue-200',
    Medium: 'bg-amber-50 text-amber-600 border-amber-200',
    High: 'bg-rose-50 text-rose-600 border-rose-200',
  };

  const statusColors = {
    'Not Started': 'bg-slate-50 text-slate-600 border-slate-200',
    'In Progress': 'bg-indigo-50 text-indigo-600 border-indigo-200',
    'Completed': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div className="bg-gradient-to-br from-sky-50 to-white px-6 pt-6 pb-6">
            <div className="flex justify-between items-center mb-6">
              <motion.h3 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-semibold text-sky-800"
              >
                {task ? 'Edit Task' : 'Create New Task'}
              </motion.h3>
              <motion.button
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-5"
              >
                <label className="flex items-center text-sky-700 text-sm font-medium mb-2" htmlFor="title">
                  <Bookmark size={18} className="mr-2 text-sky-500" />
                  Task Title
                </label>
                <input
                  className="w-full py-2 px-3 text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all"
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  required
                />
              </motion.div>
              
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-5"
              >
                <label className="flex items-center text-sky-700 text-sm font-medium mb-2" htmlFor="description">
                  <FileText size={18} className="mr-2 text-sky-500" />
                  Description
                </label>
                <textarea
                  className="w-full py-2 px-3 text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all min-h-24"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the task details"
                  required
                />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="flex items-center text-sky-700 text-sm font-medium mb-2" htmlFor="projectId">
                    <Bookmark size={18} className="mr-2 text-sky-500" />
                    Project
                  </label>
                  <select
                    className="w-full py-2 px-3 text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all appearance-none"
                    id="projectId"
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    required
                  >
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </motion.div>
                
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="flex items-center text-sky-700 text-sm font-medium mb-2" htmlFor="assignee">
                    <User size={18} className="mr-2 text-sky-500" />
                    Assignee
                  </label>
                  <select
                    className="w-full py-2 px-3 text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all appearance-none"
                    id="assignee"
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleChange}
                    required
                  >
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="flex items-center text-sky-700 text-sm font-medium mb-2" htmlFor="status">
                    <CheckCircle size={18} className="mr-2 text-sky-500" />
                    Status
                  </label>
                  <select
                    className={`w-full py-2 px-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all appearance-none ${statusColors[formData.status]}`}
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </motion.div>
                
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="flex items-center text-sky-700 text-sm font-medium mb-2" htmlFor="priority">
                    <Clock size={18} className="mr-2 text-sky-500" />
                    Priority
                  </label>
                  <select
                    className={`w-full py-2 px-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all appearance-none ${priorityColors[formData.priority]}`}
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-6"
              >
                <label className="flex items-center text-sky-700 text-sm font-medium mb-2" htmlFor="dueDate">
                  <Calendar size={18} className="mr-2 text-sky-500" />
                  Due Date
                </label>
                <input
                  className="w-full py-2 px-3 text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all"
                  id="dueDate"
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex justify-end space-x-3 mt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={onClose}
                  className="flex items-center px-4 py-2 border border-slate-200 rounded-lg text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <X size={18} className="mr-2" />
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg hover:from-sky-600 hover:to-indigo-600 transition-all shadow-md"
                >
                  <Save size={18} className="mr-2" />
                  {task ? 'Update Task' : 'Create Task'}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskFormForProject;