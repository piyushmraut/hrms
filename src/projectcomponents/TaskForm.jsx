// import React, { useState } from 'react';

// const TaskForm = ({ addTask, projects, employees }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [task, setTask] = useState({
//     title: '',
//     description: '',
//     projectId: projects.length > 0 ? projects[0].id : '',
//     assignee: employees.length > 0 ? employees[0].id : '',
//     status: 'Not Started',
//     priority: 'Medium',
//     dueDate: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTask({ ...task, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addTask(task);
//     setTask({
//       title: '',
//       description: '',
//       projectId: projects.length > 0 ? projects[0].id : '',
//       assignee: employees.length > 0 ? employees[0].id : '',
//       status: 'Not Started',
//       priority: 'Medium',
//       dueDate: ''
//     });
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//       >
//         Add Task
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
//                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Task</h3>
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//                       Task Title
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="title"
//                       type="text"
//                       name="title"
//                       value={task.title}
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
//                       value={task.description}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectId">
//                         Project
//                       </label>
//                       <select
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="projectId"
//                         name="projectId"
//                         value={task.projectId}
//                         onChange={handleChange}
//                         required
//                       >
//                         {projects.map(project => (
//                           <option key={project.id} value={project.id}>{project.name}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignee">
//                         Assignee
//                       </label>
//                       <select
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="assignee"
//                         name="assignee"
//                         value={task.assignee}
//                         onChange={handleChange}
//                         required
//                       >
//                         {employees.map(employee => (
//                           <option key={employee.id} value={employee.id}>{employee.name}</option>
//                         ))}
//                       </select>
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
//                         value={task.status}
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
//                         value={task.priority}
//                         onChange={handleChange}
//                       >
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                         <option value="Critical">Critical</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
//                       Due Date
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="dueDate"
//                       type="date"
//                       name="dueDate"
//                       value={task.dueDate}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                     <button
//                       type="submit"
//                       className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
//                     >
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsOpen(false)}
//                       className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

// export default TaskForm;

// import React, { useState } from 'react';

// const TaskForm = ({ addTask, projects, employees }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [task, setTask] = useState({
//     title: '',
//     description: '',
//     projectId: projects.length > 0 ? projects[0].id : '',
//     assignee: employees.length > 0 ? employees[0].id : '',
//     status: 'Not Started',
//     priority: 'Medium',
//     dueDate: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTask({ ...task, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addTask(task);
//     setTask({
//       title: '',
//       description: '',
//       projectId: projects.length > 0 ? projects[0].id : '',
//       assignee: employees.length > 0 ? employees[0].id : '',
//       status: 'Not Started',
//       priority: 'Medium',
//       dueDate: ''
//     });
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//       >
//         Add Task
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
//                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Task</h3>
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//                       Task Title
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="title"
//                       type="text"
//                       name="title"
//                       value={task.title}
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
//                       value={task.description}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectId">
//                         Project
//                       </label>
//                       <select
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="projectId"
//                         name="projectId"
//                         value={task.projectId}
//                         onChange={handleChange}
//                         required
//                       >
//                         {projects.map(project => (
//                           <option key={project.id} value={project.id}>{project.name}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignee">
//                         Assignee
//                       </label>
//                       <select
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="assignee"
//                         name="assignee"
//                         value={task.assignee}
//                         onChange={handleChange}
//                         required
//                       >
//                         {employees.map(employee => (
//                           <option key={employee.id} value={employee.id}>{employee.name}</option>
//                         ))}
//                       </select>
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
//                         value={task.status}
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
//                         value={task.priority}
//                         onChange={handleChange}
//                       >
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                         <option value="Critical">Critical</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
//                       Due Date
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="dueDate"
//                       type="date"
//                       name="dueDate"
//                       value={task.dueDate}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                     <button
//                       type="submit"
//                       className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
//                     >
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsOpen(false)}
//                       className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

// export default TaskForm;


import React, { useState, useEffect } from 'react';

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
//     setFormData({ ...formData, [name]: value });
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

const TaskForm = ({ task, addTask, updateTask, onClose, projects, employees }) => {
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
              {task ? 'Edit Task' : 'Add New Task'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Task Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
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
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectId">
                    Project
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignee">
                    Assignee
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                  Due Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dueDate"
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default TaskForm;