// import React from 'react';

// const ProjectsTable = ({ projects, tasks, employees, updateTaskStatus }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {projects.map(project => {
//             const projectTasks = tasks.filter(task => task.projectId === project.id);
            
//             return (
//               <React.Fragment key={project.id}>
//                 <tr className="bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//                         {project.name.charAt(0)}
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{project.name}</div>
//                         <div className="text-sm text-gray-500">{project.description}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
//                         project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
//                         'bg-yellow-100 text-yellow-800'}`}>
//                       {project.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${project.priority === 'High' ? 'bg-red-100 text-red-800' : 
//                         project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
//                         'bg-gray-100 text-gray-800'}`}>
//                       {project.priority}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {project.startDate} to {project.endDate}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ${project.budget.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {projectTasks.length} tasks
//                   </td>
//                 </tr>
//                 {projectTasks.map(task => {
//                   const assignee = employees.find(e => e.id === task.assignee);
                  
//                   return (
//                     <tr key={task.id} className="border-t border-gray-200">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 pl-16">
//                         {task.title}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
//                             task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
//                             'bg-yellow-100 text-yellow-800'}`}>
//                           {task.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {task.priority}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         Due: {task.dueDate}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {assignee ? assignee.name : 'Unassigned'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <select
//                           className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                           value={task.status}
//                           onChange={(e) => updateTaskStatus(task.id, e.target.value)}
//                         >
//                           <option value="Not Started">Not Started</option>
//                           <option value="In Progress">In Progress</option>
//                           <option value="Completed">Completed</option>
//                         </select>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </React.Fragment>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProjectsTable;

// import React from 'react';

// const ProjectsTable = ({ projects, tasks, employees, teams, updateProject, deleteProject, updateTask, deleteTask, updateTeam }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {projects.map(project => {
//             const projectTasks = tasks.filter(task => task.projectId === project.id);
//             const projectTeam = teams.find(team => team.projectId === project.id);
//             const teamMembers = projectTeam ? employees.filter(e => projectTeam.members.includes(e.id)) : [];
            
//             return (
//               <React.Fragment key={project.id}>
//                 <tr className="bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//                         {project.name.charAt(0)}
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{project.name}</div>
//                         <div className="text-sm text-gray-500">{project.description}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
//                         project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
//                         'bg-yellow-100 text-yellow-800'}`}>
//                       {project.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${project.priority === 'High' ? 'bg-red-100 text-red-800' : 
//                         project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
//                         'bg-gray-100 text-gray-800'}`}>
//                       {project.priority}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {project.startDate} to {project.endDate}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ${project.budget.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {projectTeam ? (
//                       <div>
//                         <div>{projectTeam.name}</div>
//                         <div className="text-xs text-gray-400">
//                           {teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''}
//                         </div>
//                       </div>
//                     ) : 'No team'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => {
//                           const updatedName = prompt('Edit project name:', project.name);
//                           const updatedDesc = prompt('Edit project description:', project.description);
//                           const updatedStart = prompt('Edit start date:', project.startDate);
//                           const updatedEnd = prompt('Edit end date:', project.endDate);
//                           const updatedStatus = prompt('Edit status (Not Started, In Progress, Completed):', project.status);
//                           const updatedPriority = prompt('Edit priority (Low, Medium, High):', project.priority);
//                           const updatedBudget = prompt('Edit budget:', project.budget);
                          
//                           if (updatedName !== null && updatedDesc !== null && updatedStart !== null && 
//                               updatedEnd !== null && updatedStatus !== null && updatedPriority !== null && 
//                               updatedBudget !== null) {
//                             updateProject({
//                               ...project,
//                               name: updatedName,
//                               description: updatedDesc,
//                               startDate: updatedStart,
//                               endDate: updatedEnd,
//                               status: updatedStatus,
//                               priority: updatedPriority,
//                               budget: parseFloat(updatedBudget)
//                             });
//                           }
//                         }}
//                         className="text-blue-600 hover:text-blue-900"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => {
//                           if (window.confirm('Are you sure you want to delete this project?')) {
//                             deleteProject(project.id);
//                           }
//                         }}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//                 {projectTasks.map(task => {
//                   const assignee = employees.find(e => e.id === task.assignee);
                  
//                   return (
//                     <tr key={task.id} className="border-t border-gray-200">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 pl-16">
//                         {task.title}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
//                             task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
//                             'bg-yellow-100 text-yellow-800'}`}>
//                           {task.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {task.priority}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         Due: {task.dueDate}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {assignee ? assignee.name : 'Unassigned'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {projectTeam ? projectTeam.name : 'No team'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-2">
//                           <select
//                             className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                             value={task.status}
//                             onChange={(e) => updateTaskStatus(task.id, e.target.value)}
//                           >
//                             <option value="Not Started">Not Started</option>
//                             <option value="In Progress">In Progress</option>
//                             <option value="Completed">Completed</option>
//                           </select>
//                           <button
//                             onClick={() => {
//                               const updatedTitle = prompt('Edit task title:', task.title);
//                               const updatedDesc = prompt('Edit task description:', task.description);
//                               if (updatedTitle !== null && updatedDesc !== null) {
//                                 updateTask({
//                                   ...task,
//                                   title: updatedTitle,
//                                   description: updatedDesc
//                                 });
//                               }
//                             }}
//                             className="text-blue-600 hover:text-blue-900"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => {
//                               if (window.confirm('Are you sure you want to delete this task?')) {
//                                 deleteTask(task.id);
//                               }
//                             }}
//                             className="text-red-600 hover:text-red-900"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </React.Fragment>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProjectsTable;


// import React from 'react';

// const ProjectsTable = ({
//   projects,
//   tasks,
//   employees,
//   teams,
//   updateProject,
//   deleteProject,
//   updateTask,
//   deleteTask,
//   updateTeam,
//   setSelectedProject,
//   setIsProjectFormOpen,
//   setSelectedTask,
//   setIsTaskFormOpen,
// }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {projects.map((project) => {
//             const projectTasks = tasks.filter((task) => task.projectId === project.id);
//             const projectTeam = teams.find((team) => team.projectId === project.id);
//             const teamMembers = projectTeam ? employees.filter((e) => projectTeam.members.includes(e.id)) : [];

//             return (
//               <React.Fragment key={project.id}>
//                 <tr className="bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//                         {project.name.charAt(0)}
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{project.name}</div>
//                         <div className="text-sm text-gray-500">{project.description}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         project.status === 'Completed'
//                           ? 'bg-green-100 text-green-800'
//                           : project.status === 'In Progress'
//                           ? 'bg-blue-100 text-blue-800'
//                           : 'bg-yellow-100 text-yellow-800'
//                       }`}
//                     >
//                       {project.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         project.priority === 'High'
//                           ? 'bg-red-100 text-red-800'
//                           : project.priority === 'Medium'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : 'bg-gray-100 text-gray-800'
//                       }`}
//                     >
//                       {project.priority}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {project.startDate} to {project.endDate}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ${project.budget.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {projectTeam ? (
//                       <div>
//                         <div>{projectTeam.name}</div>
//                         <div className="text-xs text-gray-400">
//                           {teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''}
//                         </div>
//                       </div>
//                     ) : (
//                       'No team'
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => {
//                           setSelectedProject(project);
//                           setIsProjectFormOpen(true);
//                         }}
//                         className="text-blue-600 hover:text-blue-900"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => {
//                           if (window.confirm('Are you sure you want to delete this project?')) {
//                             deleteProject(project.id);
//                           }
//                         }}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//                 {projectTasks.map((task) => {
//                   const assignee = employees.find((e) => e.id === task.assignee);
//                   return (
//                     <tr key={task.id} className="border-t border-gray-200">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 pl-16">{task.title}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <span
//                           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             task.status === 'Completed'
//                               ? 'bg-green-100 text-green-800'
//                               : task.status === 'In Progress'
//                               ? 'bg-blue-100 text-blue-800'
//                               : 'bg-yellow-100 text-yellow-800'
//                           }`}
//                         >
//                           {task.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.priority}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Due: {task.dueDate}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {assignee ? assignee.name : 'Unassigned'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {projectTeam ? projectTeam.name : 'No team'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-2">
//                           <select
//                             className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                             value={task.status}
//                             onChange={(e) => updateTask({ ...task, status: e.target.value })}
//                           >
//                             <option value="Not Started">Not Started</option>
//                             <option value="In Progress">In Progress</option>
//                             <option value="Completed">Completed</option>
//                           </select>
//                           <button
//                             onClick={() => {
//                               setSelectedTask(task);
//                               setIsTaskFormOpen(true);
//                             }}
//                             className="text-blue-600 hover:text-blue-900"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => {
//                               if (window.confirm('Are you sure you want to delete this task?')) {
//                                 deleteTask(task.id);
//                               }
//                             }}
//                             className="text-red-600 hover:text-red-900"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </React.Fragment>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProjectsTable;

import React from 'react';

const ProjectsTable = ({
  projects,
  tasks,
  employees,
  teams,
  updateProject,
  deleteProject,
  updateTask,
  deleteTask,
  updateTeam,
  setSelectedProject,
  setIsProjectFormOpen,
  setSelectedTask,
  setIsTaskFormOpen,
  setSelectedTeam,
  setIsTeamFormOpen,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => {
            const projectTasks = tasks.filter((task) => task.projectId === project.id);
            const projectTeam = teams.find((team) => team.projectId === project.id);
            const teamMembers = projectTeam ? employees.filter((e) => projectTeam.members.includes(e.id)) : [];

            return (
              <React.Fragment key={project.id}>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {project.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500">{project.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.priority === 'High'
                          ? 'bg-red-100 text-red-800'
                          : project.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.startDate} to {project.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${project.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {projectTeam ? (
                      <div>
                        <div>{projectTeam.name}</div>
                        <div className="text-xs text-gray-400">
                          {teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    ) : (
                      'No team'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setIsProjectFormOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this project?')) {
                            deleteProject(project.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                      {projectTeam ? (
                        <button
                          onClick={() => {
                            setSelectedTeam(projectTeam);
                            setIsTeamFormOpen(true);
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Edit Team
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedTeam({ projectId: project.id });
                            setIsTeamFormOpen(true);
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Add Team
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {projectTasks.map((task) => {
                  const assignee = employees.find((e) => e.id === task.assignee);
                  return (
                    <tr key={task.id} className="border-t border-gray-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 pl-16">{task.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            task.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : task.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.priority}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Due: {task.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assignee ? assignee.name : 'Unassigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {projectTeam ? projectTeam.name : 'No team'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <select
                            className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={task.status}
                            onChange={(e) => updateTask({ ...task, status: e.target.value })}
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <button
                            onClick={() => {
                              setSelectedTask(task);
                              setIsTaskFormOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this task?')) {
                                deleteTask(task.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;