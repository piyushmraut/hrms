// ProjectsCards.jsx
import React from 'react';

const ProjectsCards = ({ projects, tasks, employees, setSelectedProject, setShowProjectForm, deleteProject, setSelectedTask, setShowTaskForm }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => {
        const projectTasks = tasks.filter(t => t.projectId === project.id);
        return (
          <div key={project.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
              <div className="flex space-x-2">
                <button onClick={() => { setSelectedProject(project); setShowProjectForm(true); }} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button onClick={() => { if (window.confirm('Are you sure?')) deleteProject(project.id); }} className="text-red-600 hover:text-red-900">Delete</button>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">{project.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div><p className="text-sm font-medium text-gray-500">Status</p><p className="mt-1 text-sm text-gray-900">{project.status}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Priority</p><p className="mt-1 text-sm text-gray-900">{project.priority}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Timeline</p><p className="mt-1 text-sm text-gray-900">{project.startDate} - {project.endDate}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Budget</p><p className="mt-1 text-sm text-gray-900">${project.budget.toLocaleString()}</p></div>
            </div>
            <div className="mt-4"><p className="text-sm font-medium text-gray-500">Assigned Employees</p><p className="mt-1 text-sm text-gray-900">{project.employees?.length > 0 ? project.employees.map(id => employees.find(e => e.id === id)?.name || 'Unknown').join(', ') : 'None'}</p></div>
            <div className="mt-4"><p className="text-sm font-medium text-gray-500">Tasks ({projectTasks.length})</p></div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => { setSelectedTask({ projectId: project.id }); setShowTaskForm(true); }} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">Add Task</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsCards;