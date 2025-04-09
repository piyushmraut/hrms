// import React, { useState, useEffect } from 'react';

// const ProjectForm = ({ project, addProject, updateProject, onClose, employees, teams }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     startDate: '',
//     endDate: '',
//     status: 'Not Started',
//     priority: 'Medium',
//     budget: 0,
//   });

//   useEffect(() => {
//     if (project) {
//       setFormData(project);
//     } else {
//       setFormData({
//         name: '',
//         description: '',
//         startDate: '',
//         endDate: '',
//         status: 'Not Started',
//         priority: 'Medium',
//         budget: 0,
//       });
//     }
//   }, [project]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (project) {
//       updateProject({ ...formData, id: project.id });
//     } else {
//       addProject(formData);
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
//               {project ? 'Edit Project' : 'Add New Project'}
//             </h3>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                   Project Name
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="name"
//                   type="text"
//                   name="name"
//                   value={formData.name}
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
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
//                     Start Date
//                   </label>
//                   <input
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="startDate"
//                     type="date"
//                     name="startDate"
//                     value={formData.startDate}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
//                     End Date
//                   </label>
//                   <input
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="endDate"
//                     type="date"
//                     name="endDate"
//                     value={formData.endDate}
//                     onChange={handleChange}
//                     required
//                   />
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
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
//                   Budget ($)
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="budget"
//                   type="number"
//                   name="budget"
//                   value={formData.budget}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="submit"
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

// export default ProjectForm;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clipboard, 
  Calendar, 
  FileText, 
  Tag, 
  DollarSign, 
  Save, 
  X, 
  ChevronDown,
  Clock
} from 'lucide-react';

const ProjectFormForProject = ({ project, addProject, updateProject, onClose, employees, teams }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Not Started',
    priority: 'Medium',
    budget: 0,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'Not Started',
        priority: 'Medium',
        budget: 0,
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (project) {
        updateProject({ ...formData, id: project.id });
      } else {
        addProject(formData);
      }
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  // Get priority color based on selection
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Low': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'High': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  // Get status color based on selection
  const getStatusColor = (status) => {
    switch(status) {
      case 'Not Started': return 'bg-gray-100 text-gray-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-40 backdrop-blur-sm transition-opacity">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl overflow-hidden shadow-2xl transform w-full max-w-2xl"
        >
          <div className="relative">
            {/* Decorative header gradient */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-teal-400"></div>
            
            <div className="px-6 py-8">
              <motion.h3 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center"
              >
                <Clipboard size={24} className="mr-2 text-blue-500" />
                {project ? 'Edit Project Details' : 'Create New Project'}
              </motion.h3>
              
              <motion.form 
                variants={formVariants}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit}
              >
                <motion.div variants={itemVariants} className="mb-5">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                    Project Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag size={18} className="text-blue-500" />
                    </div>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition-all duration-200"
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter project name"
                      required
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-5">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
                    Description
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FileText size={18} className="text-blue-500" />
                    </div>
                    <textarea
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition-all duration-200"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Brief description of the project"
                      required
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="startDate">
                      Start Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-blue-500" />
                      </div>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition-all duration-200"
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="endDate">
                      End Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-blue-500" />
                      </div>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition-all duration-200"
                        id="endDate"
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="status">
                      Status
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock size={18} className="text-blue-500" />
                      </div>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 p-2.5 transition-all duration-200 appearance-none"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown size={18} className="text-gray-400" />
                      </div>
                      <div className={`absolute right-10 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full ${
                        formData.status === 'Not Started' ? 'bg-gray-400' :
                        formData.status === 'In Progress' ? 'bg-blue-500' : 'bg-green-500'
                      }`}></div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="priority">
                      Priority
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag size={18} className="text-blue-500" />
                      </div>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 p-2.5 transition-all duration-200 appearance-none"
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown size={18} className="text-gray-400" />
                      </div>
                      <div className={`absolute right-10 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full ${
                        formData.priority === 'Low' ? 'bg-green-500' :
                        formData.priority === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="budget">
                    Budget ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={18} className="text-blue-500" />
                    </div>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition-all duration-200"
                      id="budget"
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex space-x-3 mt-8"
                >
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
                  >
                    <X size={18} className="mr-2" />
                    Cancel
                  </button>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg hover:from-blue-600 hover:to-teal-500 transition-all duration-200 font-medium"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Save size={18} className="mr-2" />
                    )}
                    {isSubmitting ? 'Saving...' : 'Save Project'}
                  </motion.button>
                </motion.div>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectFormForProject;

