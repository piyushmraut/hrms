

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
//   setSelectedTeam,
//   setIsTeamFormOpen,
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
//                       {projectTeam ? (
//                         <button
//                           onClick={() => {
//                             setSelectedTeam(projectTeam);
//                             setIsTeamFormOpen(true);
//                           }}
//                           className="text-green-600 hover:text-green-900"
//                         >
//                           Edit Team
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => {
//                             setSelectedTeam({ projectId: project.id });
//                             setIsTeamFormOpen(true);
//                           }}
//                           className="text-green-600 hover:text-green-900"
//                         >
//                           Add Team
//                         </button>
//                       )}
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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ChevronUp, Check, AlertCircle, Clock, Calendar, DollarSign,
  Users, Edit, Trash2, PlusCircle, Award, CheckCircle, Briefcase, Star
} from 'lucide-react';

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
  const [expandedProjects, setExpandedProjects] = useState({});

  const toggleProject = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return <CheckCircle size={14} className="mr-1" />;
      case 'In Progress': return <Clock size={14} className="mr-1" />;
      default: return <AlertCircle size={14} className="mr-1" />;
    }
  };

  const getStatusColors = (status) => {
    switch(status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In Progress': return 'bg-sky-50 text-sky-700 border-sky-200';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const getPriorityColors = (priority) => {
    switch(priority) {
      case 'High': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };
  
  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'High': return <Star size={14} className="mr-1 text-rose-600" />;
      case 'Medium': return <Star size={14} className="mr-1 text-amber-600" />;
      default: return <Star size={14} className="mr-1 text-slate-600" />;
    }
  };

  const projectBgColor = (index) => {
    return index % 2 === 0 ? 'bg-indigo-50/30' : 'bg-white';
  };

  const taskBgColor = (index) => {
    return index % 2 === 0 ? 'bg-slate-50/50' : 'bg-white';
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <tr>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Project</th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Timeline</th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Budget</th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Team</th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {projects.map((project, pIndex) => {
            const projectTasks = tasks.filter((task) => task.projectId === project.id);
            const projectTeam = teams.find((team) => team.projectId === project.id);
            const teamMembers = projectTeam ? employees.filter((e) => projectTeam.members.includes(e.id)) : [];
            const isExpanded = expandedProjects[project.id];

            return (
              <React.Fragment key={project.id}>
                <motion.tr 
                  className={`${projectBgColor(pIndex)} cursor-pointer hover:bg-indigo-50/60 transition-colors duration-200`}
                  onClick={() => toggleProject(project.id)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: pIndex * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <motion.div 
                        className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {project.name.charAt(0).toUpperCase()}
                      </motion.div>
                      <div className="ml-4 flex items-center">
                        <div>
                          <div className="text-sm font-medium text-slate-800">{project.name}</div>
                          <div className="text-xs text-slate-500 max-w-xs truncate">{project.description}</div>
                        </div>
                        <motion.div 
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          className="ml-2 text-indigo-500"
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex items-center text-xs leading-5 font-medium rounded-full border ${getStatusColors(project.status)}`}>
                      {getStatusIcon(project.status)}
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex items-center text-xs leading-5 font-medium rounded-full border ${getPriorityColors(project.priority)}`}>
                      {getPriorityIcon(project.priority)}
                      {project.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600 flex items-center">
                      <Calendar size={14} className="mr-2 text-indigo-500" />
                      <span>{project.startDate} to {project.endDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600 flex items-center">
                      <DollarSign size={14} className="mr-2 text-indigo-500" />
                      <span>{project.budget.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {projectTeam ? (
                      <div className="flex items-center">
                        <Users size={14} className="mr-2 text-indigo-500" />
                        <div>
                          <div className="text-sm text-slate-700">{projectTeam.name}</div>
                          <div className="text-xs text-slate-500">
                            {teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500 flex items-center">
                        <Users size={14} className="mr-2 text-slate-400" />
                        No team
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                          setIsProjectFormOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center"
                      >
                        <Edit size={14} className="mr-1" />
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Are you sure you want to delete this project?')) {
                            deleteProject(project.id);
                          }
                        }}
                        className="text-rose-600 hover:text-rose-800 flex items-center"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Delete
                      </motion.button>
                      {projectTeam ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTeam(projectTeam);
                            setIsTeamFormOpen(true);
                          }}
                          className="text-emerald-600 hover:text-emerald-800 flex items-center"
                        >
                          <Edit size={14} className="mr-1" />
                          Team
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTeam({ projectId: project.id });
                            setIsTeamFormOpen(true);
                          }}
                          className="text-emerald-600 hover:text-emerald-800 flex items-center"
                        >
                          <PlusCircle size={14} className="mr-1" />
                          Team
                        </motion.button>
                      )}
                    </div>
                  </td>
                </motion.tr>
                
                <AnimatePresence>
                  {isExpanded && projectTasks.map((task, tIndex) => {
                    const assignee = employees.find((e) => e.id === task.assignee);
                    
                    return (
                      <motion.tr 
                        key={task.id} 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, delay: tIndex * 0.03 }}
                        className={`border-t border-slate-100 ${taskBgColor(tIndex)}`}
                      >
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-700 pl-16">
                          <div className="flex items-center">
                            <Briefcase size={14} className="mr-2 text-indigo-400" />
                            {task.title}
                          </div>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-medium rounded-full border ${getStatusColors(task.status)}`}>
                            {getStatusIcon(task.status)}
                            {task.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-medium rounded-full border ${getPriorityColors(task.priority)}`}>
                            {getPriorityIcon(task.priority)}
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-600 flex items-center">
                            <Calendar size={14} className="mr-1 text-indigo-400" />
                            Due: {task.dueDate}
                          </div>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-600 flex items-center">
                            <Users size={14} className="mr-1 text-indigo-400" />
                            {assignee ? assignee.name : 'Unassigned'}
                          </div>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-600">
                          {projectTeam ? (
                            <div className="flex items-center">
                              <Award size={14} className="mr-1 text-indigo-400" />
                              {projectTeam.name}
                            </div>
                          ) : 'No team'}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <select
                              className="text-xs border border-slate-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white py-1"
                              value={task.status}
                              onChange={(e) => updateTask({ ...task, status: e.target.value })}
                            >
                              <option value="Not Started">Not Started</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedTask(task);
                                setIsTaskFormOpen(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-800 flex items-center text-xs"
                            >
                              <Edit size={12} className="mr-1" />
                              Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this task?')) {
                                  deleteTask(task.id);
                                }
                              }}
                              className="text-rose-600 hover:text-rose-800 flex items-center text-xs"
                            >
                              <Trash2 size={12} className="mr-1" />
                              Delete
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;