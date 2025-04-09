

// import React from 'react';

// const ProjectsCardView = ({
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
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {projects.map((project) => {
//         const projectTasks = tasks.filter((task) => task.projectId === project.id);
//         const projectTeam = teams.find((team) => team.projectId === project.id);
//         const teamMembers = projectTeam ? employees.filter((e) => projectTeam.members.includes(e.id)) : [];

//         return (
//           <div key={project.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//             <div className="p-4 bg-white">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
//                   <p className="text-sm text-gray-500">{project.description}</p>
//                 </div>
//                 <span
//                   className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                     project.status === 'Completed'
//                       ? 'bg-green-100 text-green-800'
//                       : project.status === 'In Progress'
//                       ? 'bg-blue-100 text-blue-800'
//                       : 'bg-yellow-100 text-yellow-800'
//                   }`}
//                 >
//                   {project.status}
//                 </span>
//               </div>
//               <div className="mt-4">
//                 <div className="flex justify-between text-sm text-gray-500">
//                   <span>Start: {project.startDate}</span>
//                   <span>End: {project.endDate}</span>
//                 </div>
//                 <div className="mt-2 text-sm">
//                   <span className="font-medium">Priority:</span>
//                   <span
//                     className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
//                       project.priority === 'High'
//                         ? 'bg-red-100 text-red-800'
//                         : project.priority === 'Medium'
//                         ? 'bg-yellow-100 text-yellow-800'
//                         : 'bg-gray-100 text-gray-800'
//                     }`}
//                   >
//                     {project.priority}
//                   </span>
//                 </div>
//                 <div className="mt-2 text-sm text-gray-500">
//                   <span className="font-medium">Budget:</span> ${project.budget.toLocaleString()}
//                 </div>
//               </div>
//               {projectTeam && (
//                 <div className="mt-4">
//                   <h4 className="text-sm font-medium text-gray-700">Team Members</h4>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {teamMembers.map((member) => (
//                       <span key={member.id} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
//                         {member.name}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <div className="mt-4">
//                 <h4 className="text-sm font-medium text-gray-700">Tasks ({projectTasks.length})</h4>
//                 <ul className="mt-2 space-y-2">
//                   {projectTasks.slice(0, 3).map((task) => {
//                     const assignee = employees.find((e) => e.id === task.assignee);
//                     return (
//                       <li key={task.id} className="text-sm">
//                         <div className="flex justify-between">
//                           <span className="font-medium">{task.title}</span>
//                           <span
//                             className={`text-xs px-2 py-1 rounded-full ${
//                               task.status === 'Completed'
//                                 ? 'bg-green-100 text-green-800'
//                                 : task.status === 'In Progress'
//                                 ? 'bg-blue-100 text-blue-800'
//                                 : 'bg-yellow-100 text-yellow-800'
//                             }`}
//                           >
//                             {task.status}
//                           </span>
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           {assignee ? `Assigned to: ${assignee.name}` : 'Unassigned'} | Due: {task.dueDate}
//                         </div>
//                       </li>
//                     );
//                   })}
//                   {projectTasks.length > 3 && (
//                     <li className="text-xs text-gray-500">+ {projectTasks.length - 3} more tasks</li>
//                   )}
//                 </ul>
//               </div>
//               <div className="mt-4 flex justify-between pt-4 border-t">
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => {
//                       setSelectedProject(project);
//                       setIsProjectFormOpen(true);
//                     }}
//                     className="text-sm text-blue-600 hover:text-blue-900"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (window.confirm('Are you sure you want to delete this project?')) {
//                         deleteProject(project.id);
//                       }
//                     }}
//                     className="text-sm text-red-600 hover:text-red-900"
//                   >
//                     Delete
//                   </button>
//                 </div>
//                 {projectTeam ? (
//                   <button
//                     onClick={() => {
//                       const memberOptions = employees.map((e) => `${e.id}: ${e.name}`).join('\n');
//                       const updatedMembers = prompt(
//                         `Edit team members (current: ${projectTeam.members.join(', ')})\nAvailable employees:\n${memberOptions}`,
//                         projectTeam.members.join(', ')
//                       );
//                       if (updatedMembers !== null) {
//                         updateTeam({
//                           ...projectTeam,
//                           members: updatedMembers.split(',').map((id) => parseInt(id.trim())),
//                         });
//                       }
//                     }}
//                     className="text-sm text-green-600 hover:text-green-900"
//                   >
//                     Edit Team
//                   </button>
//                 ) : (
//                   <span className="text-sm text-gray-500">No team assigned</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProjectsCardView;

// import React from 'react';

// const ProjectsCardView = ({
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
//   setSelectedTeam,
//   setIsTeamFormOpen,
// }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {projects.map((project) => {
//         const projectTasks = tasks.filter((task) => task.projectId === project.id);
//         const projectTeam = teams.find((team) => team.projectId === project.id);
//         const teamMembers = projectTeam ? employees.filter((e) => projectTeam.members.includes(e.id)) : [];

//         return (
//           <div key={project.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//             <div className="p-4 bg-white">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
//                   <p className="text-sm text-gray-500">{project.description}</p>
//                 </div>
//                 <span
//                   className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                     project.status === 'Completed'
//                       ? 'bg-green-100 text-green-800'
//                       : project.status === 'In Progress'
//                       ? 'bg-blue-100 text-blue-800'
//                       : 'bg-yellow-100 text-yellow-800'
//                   }`}
//                 >
//                   {project.status}
//                 </span>
//               </div>
//               <div className="mt-4">
//                 <div className="flex justify-between text-sm text-gray-500">
//                   <span>Start: {project.startDate}</span>
//                   <span>End: {project.endDate}</span>
//                 </div>
//                 <div className="mt-2 text-sm">
//                   <span className="font-medium">Priority:</span>
//                   <span
//                     className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
//                       project.priority === 'High'
//                         ? 'bg-red-100 text-red-800'
//                         : project.priority === 'Medium'
//                         ? 'bg-yellow-100 text-yellow-800'
//                         : 'bg-gray-100 text-gray-800'
//                     }`}
//                   >
//                     {project.priority}
//                   </span>
//                 </div>
//                 <div className="mt-2 text-sm text-gray-500">
//                   <span className="font-medium">Budget:</span> ${project.budget.toLocaleString()}
//                 </div>
//               </div>
//               {projectTeam && (
//                 <div className="mt-4">
//                   <h4 className="text-sm font-medium text-gray-700">Team Members</h4>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {teamMembers.map((member) => (
//                       <span key={member.id} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
//                         {member.name}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <div className="mt-4">
//                 <h4 className="text-sm font-medium text-gray-700">Tasks ({projectTasks.length})</h4>
//                 <ul className="mt-2 space-y-2">
//                   {projectTasks.slice(0, 3).map((task) => {
//                     const assignee = employees.find((e) => e.id === task.assignee);
//                     return (
//                       <li key={task.id} className="text-sm">
//                         <div className="flex justify-between">
//                           <span className="font-medium">{task.title}</span>
//                           <span
//                             className={`text-xs px-2 py-1 rounded-full ${
//                               task.status === 'Completed'
//                                 ? 'bg-green-100 text-green-800'
//                                 : task.status === 'In Progress'
//                                 ? 'bg-blue-100 text-blue-800'
//                                 : 'bg-yellow-100 text-yellow-800'
//                             }`}
//                           >
//                             {task.status}
//                           </span>
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           {assignee ? `Assigned to: ${assignee.name}` : 'Unassigned'} | Due: {task.dueDate}
//                         </div>
//                       </li>
//                     );
//                   })}
//                   {projectTasks.length > 3 && (
//                     <li className="text-xs text-gray-500">+ {projectTasks.length - 3} more tasks</li>
//                   )}
//                 </ul>
//               </div>
//               <div className="mt-4 flex justify-between pt-4 border-t">
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => {
//                       setSelectedProject(project);
//                       setIsProjectFormOpen(true);
//                     }}
//                     className="text-sm text-blue-600 hover:text-blue-900"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (window.confirm('Are you sure you want to delete this project?')) {
//                         deleteProject(project.id);
//                       }
//                     }}
//                     className="text-sm text-red-600 hover:text-red-900"
//                   >
//                     Delete
//                   </button>
//                 </div>
//                 {projectTeam ? (
//                   <button
//                     onClick={() => {
//                       setSelectedTeam(projectTeam);
//                       setIsTeamFormOpen(true);
//                     }}
//                     className="text-sm text-green-600 hover:text-green-900"
//                   >
//                     Edit Team
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => {
//                       setSelectedTeam({ projectId: project.id });
//                       setIsTeamFormOpen(true);
//                     }}
//                     className="text-sm text-green-600 hover:text-green-900"
//                   >
//                     Add Team
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProjectsCardView;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, Users, CheckCircle, AlertTriangle, BarChart2, Edit, Trash2, PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';

const ProjectsCardView = ({
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
  const [expandedProjects, setExpandedProjects] = useState({});

  const toggleProjectExpansion = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const getStatusStyles = (status) => {
    switch(status) {
      case 'Completed':
        return { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: <CheckCircle size={14} className="mr-1" /> };
      case 'In Progress':
        return { bg: 'bg-sky-100', text: 'text-sky-800', icon: <BarChart2 size={14} className="mr-1" /> };
      default:
        return { bg: 'bg-amber-100', text: 'text-amber-800', icon: <AlertTriangle size={14} className="mr-1" /> };
    }
  };

  const getPriorityStyles = (priority) => {
    switch(priority) {
      case 'High':
        return { bg: 'bg-rose-100', text: 'text-rose-800' };
      case 'Medium':
        return { bg: 'bg-amber-100', text: 'text-amber-800' };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-800' };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const projectTasks = tasks.filter((task) => task.projectId === project.id);
        const projectTeam = teams.find((team) => team.projectId === project.id);
        const teamMembers = projectTeam ? employees.filter((e) => projectTeam.members.includes(e.id)) : [];
        const isExpanded = expandedProjects[project.id];
        const statusStyle = getStatusStyles(project.status);
        const priorityStyle = getPriorityStyles(project.priority);

        return (
          <motion.div 
            key={project.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="p-5 bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800">{project.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{project.description}</p>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center px-3 py-1 text-xs font-medium rounded-full ${statusStyle.bg} ${statusStyle.text}`}
                >
                  {statusStyle.icon}
                  {project.status}
                </motion.div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex items-center text-sm text-slate-600">
                  <Calendar size={16} className="mr-2 text-indigo-500" />
                  <span>Start: {project.startDate}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Clock size={16} className="mr-2 text-indigo-500" />
                  <span>End: {project.endDate}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="flex items-center">
                    <AlertTriangle size={16} className="mr-2 text-indigo-500" />
                    <span>Priority:</span>
                    <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${priorityStyle.bg} ${priorityStyle.text}`}>
                      {project.priority}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <DollarSign size={16} className="mr-2 text-indigo-500" />
                  <span>${project.budget.toLocaleString()}</span>
                </div>
              </div>

              {projectTeam && (
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center mb-2">
                    <Users size={16} className="mr-2 text-indigo-500" />
                    <h4 className="text-sm font-medium text-slate-700">Team Members</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {teamMembers.map((member) => (
                      <motion.span 
                        key={member.id} 
                        whileHover={{ y: -2 }}
                        className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100"
                      >
                        {member.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="mr-2 text-indigo-500" />
                    <h4 className="text-sm font-medium text-slate-700">Tasks ({projectTasks.length})</h4>
                  </div>
                  {projectTasks.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleProjectExpansion(project.id)}
                      className="text-indigo-500 hover:text-indigo-700"
                    >
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </motion.button>
                  )}
                </div>

                <motion.ul 
                  className="mt-2 space-y-2"
                  initial={{ opacity: 1 }}
                  animate={{ height: isExpanded ? "auto" : projectTasks.length <= 3 ? "auto" : "120px" }}
                  transition={{ duration: 0.3 }}
                >
                  {projectTasks.slice(0, isExpanded ? projectTasks.length : 3).map((task) => {
                    const assignee = employees.find((e) => e.id === task.assignee);
                    const taskStatusStyle = getStatusStyles(task.status);
                    
                    return (
                      <motion.li 
                        key={task.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm bg-slate-50 p-2 rounded-lg border border-slate-100"
                      >
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-700">{task.title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full flex items-center ${taskStatusStyle.bg} ${taskStatusStyle.text}`}>
                            {taskStatusStyle.icon}
                            {task.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex items-center">
                          <Users size={12} className="mr-1" />
                          {assignee ? assignee.name : 'Unassigned'} 
                          <span className="mx-1">•</span>
                          <Calendar size={12} className="mr-1" />
                          {task.dueDate}
                        </div>
                      </motion.li>
                    );
                  })}
                  {!isExpanded && projectTasks.length > 3 && (
                    <motion.li 
                      whileHover={{ scale: 1.03 }}
                      onClick={() => toggleProjectExpansion(project.id)}
                      className="text-xs text-center text-indigo-600 cursor-pointer bg-indigo-50 py-2 rounded-lg"
                    >
                      + {projectTasks.length - 3} more tasks
                    </motion.li>
                  )}
                </motion.ul>
              </div>

              <motion.div 
                className="mt-4 flex justify-between pt-4 border-t border-slate-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedProject(project);
                      setIsProjectFormOpen(true);
                    }}
                    className="text-sm text-slate-600 hover:text-indigo-600 flex items-center"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this project?')) {
                        deleteProject(project.id);
                      }
                    }}
                    className="text-sm text-slate-600 hover:text-rose-600 flex items-center"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </motion.button>
                </div>
                {projectTeam ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedTeam(projectTeam);
                      setIsTeamFormOpen(true);
                    }}
                    className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit Team
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedTeam({ projectId: project.id });
                      setIsTeamFormOpen(true);
                    }}
                    className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center"
                  >
                    <PlusCircle size={14} className="mr-1" />
                    Add Team
                  </motion.button>
                )}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProjectsCardView;