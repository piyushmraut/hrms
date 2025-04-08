// import React, { useState } from 'react';

// const ProjectForm = ({ addProject }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [project, setProject] = useState({
//     name: '',
//     description: '',
//     startDate: '',
//     endDate: '',
//     status: 'Not Started',
//     priority: 'Medium',
//     budget: 0
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProject({ ...project, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addProject(project);
//     setProject({
//       name: '',
//       description: '',
//       startDate: '',
//       endDate: '',
//       status: 'Not Started',
//       priority: 'Medium',
//       budget: 0
//     });
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Add Project
//       </button>

//       {isOpen && (
//         <div className="fixed z-10 inset-0 overflow-y-auto">
//           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//             </div>

//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Project</h3>
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                       Project Name
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="name"
//                       type="text"
//                       name="name"
//                       value={project.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                       Description
//                     </label>
//                     <textarea
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="description"
//                       name="description"
//                       value={project.description}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
//                         Start Date
//                       </label>
//                       <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="startDate"
//                         type="date"
//                         name="startDate"
//                         value={project.startDate}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
//                         End Date
//                       </label>
//                       <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="endDate"
//                         type="date"
//                         name="endDate"
//                         value={project.endDate}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
//                         Status
//                       </label>
//                       <select
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="status"
//                         name="status"
//                         value={project.status}
//                         onChange={handleChange}
//                       >
//                         <option value="Not Started">Not Started</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Completed">Completed</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
//                         Priority
//                       </label>
//                       <select
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="priority"
//                         name="priority"
//                         value={project.priority}
//                         onChange={handleChange}
//                       >
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
//                       Budget ($)
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="budget"
//                       type="number"
//                       name="budget"
//                       value={project.budget}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                     <button
//                       type="submit"
//                       className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//                     >
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsOpen(false)}
//                       className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProjectForm;

// import React, { useState } from 'react';

// const ProjectForm = ({ addProject, employees, teams }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [project, setProject] = useState({
//     name: '',
//     description: '',
//     startDate: '',
//     endDate: '',
//     status: 'Not Started',
//     priority: 'Medium',
//     budget: 0
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProject({ ...project, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addProject(project);
//     setProject({
//       name: '',
//       description: '',
//       startDate: '',
//       endDate: '',
//       status: 'Not Started',
//       priority: 'Medium',
//       budget: 0
//     });
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Add Project
//       </button>

//       {isOpen && (
//         <div className="fixed z-10 inset-0 overflow-y-auto">
//           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//             </div>

//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Project</h3>
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                       Project Name
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="name"
//                       type="text"
//                       name="name"
//                       value={project.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                       Description
//                     </label>
//                     <textarea
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="description"
//                       name="description"
//                       value={project.description}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
//                         Start Date
//                       </label>
//                       <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="startDate"
//                         type="date"
//                         name="startDate"
//                         value={project.startDate}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
//                         End Date
//                       </label>
//                       <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="endDate"
//                         type="date"
//                         name="endDate"
//                         value={project.endDate}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
//                         Status
//                       </label>
//                       <select
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="status"
//                         name="status"
//                         value={project.status}
//                         onChange={handleChange}
//                       >
//                         <option value="Not Started">Not Started</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Completed">Completed</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
//                         Priority
//                       </label>
//                       <select
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="priority"
//                         name="priority"
//                         value={project.priority}
//                         onChange={handleChange}
//                       >
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
//                       Budget ($)
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="budget"
//                       type="number"
//                       name="budget"
//                       value={project.budget}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                     <button
//                       type="submit"
//                       className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//                     >
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsOpen(false)}
//                       className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProjectForm;

import React, { useState, useEffect } from 'react';

const ProjectForm = ({ project, addProject, updateProject, onClose, employees, teams }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Not Started',
    priority: 'Medium',
    budget: 0,
  });

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
    if (project) {
      updateProject({ ...formData, id: project.id });
    } else {
      addProject(formData);
    }
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {project ? 'Edit Project' : 'Add New Project'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Project Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                    Start Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                    End Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                    Priority
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
                  Budget ($)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="budget"
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;

