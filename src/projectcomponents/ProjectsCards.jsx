// // ProjectsCards.jsx
// import React from 'react';

// const ProjectsCards = ({ projects, tasks, employees, setSelectedProject, setShowProjectForm, deleteProject, setSelectedTask, setShowTaskForm }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {projects.map(project => {
//         const projectTasks = tasks.filter(t => t.projectId === project.id);
//         return (
//           <div key={project.id} className="bg-white shadow rounded-lg p-6">
//             <div className="flex justify-between items-start">
//               <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
//               <div className="flex space-x-2">
//                 <button onClick={() => { setSelectedProject(project); setShowProjectForm(true); }} className="text-indigo-600 hover:text-indigo-900">Edit</button>
//                 <button onClick={() => { if (window.confirm('Are you sure?')) deleteProject(project.id); }} className="text-red-600 hover:text-red-900">Delete</button>
//               </div>
//             </div>
//             <p className="mt-2 text-sm text-gray-500">{project.description}</p>
//             <div className="mt-4 grid grid-cols-2 gap-4">
//               <div><p className="text-sm font-medium text-gray-500">Status</p><p className="mt-1 text-sm text-gray-900">{project.status}</p></div>
//               <div><p className="text-sm font-medium text-gray-500">Priority</p><p className="mt-1 text-sm text-gray-900">{project.priority}</p></div>
//               <div><p className="text-sm font-medium text-gray-500">Timeline</p><p className="mt-1 text-sm text-gray-900">{project.startDate} - {project.endDate}</p></div>
//               <div><p className="text-sm font-medium text-gray-500">Budget</p><p className="mt-1 text-sm text-gray-900">${project.budget.toLocaleString()}</p></div>
//             </div>
//             <div className="mt-4"><p className="text-sm font-medium text-gray-500">Assigned Employees</p><p className="mt-1 text-sm text-gray-900">{project.employees?.length > 0 ? project.employees.map(id => employees.find(e => e.id === id)?.name || 'Unknown').join(', ') : 'None'}</p></div>
//             <div className="mt-4"><p className="text-sm font-medium text-gray-500">Tasks ({projectTasks.length})</p></div>
//             <div className="mt-4 flex justify-end">
//               <button onClick={() => { setSelectedTask({ projectId: project.id }); setShowTaskForm(true); }} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">Add Task</button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProjectsCards;

import React, { useState } from 'react';
import { Motion, spring } from 'react-motion';
import { Calendar, DollarSign, Users, CheckSquare, Clock, AlertTriangle, Award, Edit, Trash2, Plus } from 'lucide-react';

const ProjectsCards = ({ projects, tasks, employees, setSelectedProject, setShowProjectForm, deleteProject, setSelectedTask, setShowTaskForm }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Status color mapping
  const getStatusColor = (status) => {
    const statusColors = {
      'Not Started': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'On Hold': 'bg-amber-100 text-amber-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  // Priority color mapping
  const getPriorityColor = (priority) => {
    const priorityColors = {
      'Low': 'bg-blue-50 text-blue-700',
      'Medium': 'bg-amber-50 text-amber-700',
      'High': 'bg-red-50 text-red-700',
      'Critical': 'bg-red-100 text-red-700 font-medium'
    };
    return priorityColors[priority] || 'bg-gray-50 text-gray-700';
  };

  // Priority icon mapping
  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'Low': return <AlertTriangle size={16} className="text-blue-600" />;
      case 'Medium': return <AlertTriangle size={16} className="text-amber-600" />;
      case 'High': return <AlertTriangle size={16} className="text-red-600" />;
      case 'Critical': return <AlertTriangle size={16} className="text-red-600" />;
      default: return <AlertTriangle size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => {
        const projectTasks = tasks.filter(t => t.projectId === project.id);
        const isHovered = hoveredCard === project.id;
        
        const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
        const completionPercentage = projectTasks.length > 0 
          ? Math.round((completedTasks / projectTasks.length) * 100) 
          : 0;

        return (
          <Motion
            key={project.id}
            defaultStyle={{ y: 20, opacity: 0 }}
            style={{ 
              y: spring(0), 
              opacity: spring(1),
              scale: spring(isHovered ? 1.02 : 1)
            }}
          >
            {style => (
              <div 
                style={{
                  transform: `translateY(${style.y}px) scale(${style.scale})`,
                  opacity: style.opacity
                }}
                className="bg-white border border-gray-100 shadow-lg rounded-xl p-6 transition-all duration-300 ease-in-out"
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => { setSelectedProject(project); setShowProjectForm(true); }} 
                      className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-full transition-colors duration-200"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => { if (window.confirm('Are you sure you want to delete this project?')) deleteProject(project.id); }} 
                      className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <p className="mt-2 text-sm text-gray-600">{project.description}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getPriorityColor(project.priority)}`}>
                    {getPriorityIcon(project.priority)} {project.priority}
                  </span>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock size={16} className="mr-2 text-indigo-600" />
                    <span className="text-gray-700">{project.startDate} - {project.endDate}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <DollarSign size={16} className="mr-2 text-emerald-600" />
                    <span className="text-gray-700">${project.budget.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Users size={16} className="mr-2 text-blue-600" />
                    <span className="text-gray-700">
                      {project.employees?.length > 0 
                        ? project.employees.map(id => employees.find(e => e.id === id)?.name || 'Unknown').join(', ') 
                        : 'None'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm">
                      <CheckSquare size={16} className="mr-2 text-violet-600" />
                      <span className="font-medium text-gray-700">Tasks ({projectTasks.length})</span>
                    </div>
                    <span className="text-sm text-gray-600">{completionPercentage}% Complete</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <Motion
                      defaultStyle={{ width: 0 }}
                      style={{ width: spring(completionPercentage) }}
                    >
                      {style => (
                        <div 
                          className="bg-violet-600 h-2 rounded-full" 
                          style={{ width: `${style.width}%` }}
                        ></div>
                      )}
                    </Motion>
                  </div>
                </div>
                
                <div className="mt-5 flex justify-end">
                  <button 
                    onClick={() => { setSelectedTask({ projectId: project.id }); setShowTaskForm(true); }} 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Task
                  </button>
                </div>
              </div>
            )}
          </Motion>
        );
      })}
    </div>
  );
};

export default ProjectsCards;