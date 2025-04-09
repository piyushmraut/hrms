

// import React, { useState, useEffect } from 'react';

// const TeamForm = ({ team, addTeam, updateTeam, onClose, employees, projects }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     projectId: projects.length > 0 ? projects[0].id : '',
//     members: [],
//   });

//   useEffect(() => {
//     setFormData({
//       name: team?.name || '',
//       projectId: team?.projectId || (projects.length > 0 ? projects[0].id : ''),
//       members: team?.members || [],
//     });
//   }, [team, projects]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleMemberChange = (e) => {
//     const options = e.target.options;
//     const selectedMembers = [];
//     for (let i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//         selectedMembers.push(parseInt(options[i].value));
//       }
//     }
//     setFormData({ ...formData, members: selectedMembers });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (team && team.id) {
//       updateTeam({ ...formData, id: team.id });
//     } else {
//       addTeam(formData);
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
//           ​
//         </span>
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//               {team && team.id ? 'Edit Team' : 'Add New Team'}
//             </h3>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                   Team Name
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
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectId">
//                   Project
//                 </label>
//                 <select
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="projectId"
//                   name="projectId"
//                   value={formData.projectId}
//                   onChange={handleChange}
//                   required
//                 >
//                   {projects.map((project) => (
//                     <option key={project.id} value={project.id}>
//                       {project.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="members">
//                   Team Members (Hold Ctrl/Cmd to select multiple)
//                 </label>
//                 <select
//                   multiple
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
//                   id="members"
//                   name="members"
//                   value={formData.members}
//                   onChange={handleMemberChange}
//                 >
//                   {employees.map((employee) => (
//                     <option key={employee.id} value={employee.id}>
//                       {employee.name} ({employee.position})
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="submit"
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

// export default TeamForm;

import React, { useState, useEffect } from 'react';
import { Users, Briefcase, X, Save, UserPlus, Flag } from 'lucide-react';
import { motion } from 'framer-motion';

const TeamForm = ({ team, addTeam, updateTeam, onClose, employees, projects }) => {
  const [formData, setFormData] = useState({
    name: '',
    projectId: projects.length > 0 ? projects[0].id : '',
    members: [],
  });

  useEffect(() => {
    setFormData({
      name: team?.name || '',
      projectId: team?.projectId || (projects.length > 0 ? projects[0].id : ''),
      members: team?.members || [],
    });
  }, [team, projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMemberChange = (e) => {
    const options = e.target.options;
    const selectedMembers = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedMembers.push(parseInt(options[i].value));
      }
    }
    setFormData({ ...formData, members: selectedMembers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (team && team.id) {
      updateTeam({ ...formData, id: team.id });
    } else {
      addTeam(formData);
    }
    onClose();
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
          <div className="bg-gradient-to-br from-violet-50 to-white px-6 pt-6 pb-6">
            <div className="flex justify-between items-center mb-6">
              <motion.h3 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-semibold text-violet-800 flex items-center"
              >
                <Users size={24} className="mr-2 text-violet-600" />
                {team && team.id ? 'Edit Team' : 'Create New Team'}
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
                <label className="flex items-center text-violet-700 text-sm font-medium mb-2" htmlFor="name">
                  <Flag size={18} className="mr-2 text-violet-500" />
                  Team Name
                </label>
                <input
                  className="w-full py-2 px-3 text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500 transition-all"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter team name"
                  required
                />
              </motion.div>
              
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-5"
              >
                <label className="flex items-center text-violet-700 text-sm font-medium mb-2" htmlFor="projectId">
                  <Briefcase size={18} className="mr-2 text-violet-500" />
                  Project
                </label>
                <select
                  className="w-full py-2 px-3 text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500 transition-all appearance-none"
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
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <label className="flex items-center text-violet-700 text-sm font-medium mb-2" htmlFor="members">
                  <UserPlus size={18} className="mr-2 text-violet-500" />
                  Team Members
                </label>
                <div className="relative">
                  <select
                    multiple
                    className="w-full py-3 px-3 text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500 transition-all h-48"
                    id="members"
                    name="members"
                    value={formData.members}
                    onChange={handleMemberChange}
                  >
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} ({employee.position})
                      </option>
                    ))}
                  </select>
                  <div className="text-xs text-slate-500 mt-2 italic flex items-center">
                    <motion.div 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="mr-1"
                    >
                      💡
                    </motion.div>
                    Hold Ctrl/Cmd to select multiple members
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
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
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg hover:from-violet-600 hover:to-purple-600 transition-all shadow-md"
                >
                  <Save size={18} className="mr-2" />
                  {team && team.id ? 'Update Team' : 'Create Team'}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamForm;