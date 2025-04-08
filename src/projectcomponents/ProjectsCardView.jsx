import React from 'react';

const ProjectsCardView = ({ projects, tasks, employees, teams, updateProject, deleteProject, updateTask, deleteTask, updateTeam }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => {
        const projectTasks = tasks.filter(task => task.projectId === project.id);
        const projectTeam = teams.find(team => team.projectId === project.id);
        const teamMembers = projectTeam ? employees.filter(e => projectTeam.members.includes(e.id)) : [];
        
        return (
          <div key={project.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                  ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {project.status}
                </span>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Start: {project.startDate}</span>
                  <span>End: {project.endDate}</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Priority:</span> 
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full 
                    ${project.priority === 'High' ? 'bg-red-100 text-red-800' : 
                      project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {project.priority}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <span className="font-medium">Budget:</span> ${project.budget.toLocaleString()}
                </div>
              </div>
              
              {projectTeam && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Team Members</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {teamMembers.map(member => (
                      <span key={member.id} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        {member.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Tasks ({projectTasks.length})</h4>
                <ul className="mt-2 space-y-2">
                  {projectTasks.slice(0, 3).map(task => {
                    const assignee = employees.find(e => e.id === task.assignee);
                    return (
                      <li key={task.id} className="text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">{task.title}</span>
                          <span className={`text-xs px-2 py-1 rounded-full 
                            ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                              task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {task.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {assignee ? `Assigned to: ${assignee.name}` : 'Unassigned'} | Due: {task.dueDate}
                        </div>
                      </li>
                    );
                  })}
                  {projectTasks.length > 3 && (
                    <li className="text-xs text-gray-500">+ {projectTasks.length - 3} more tasks</li>
                  )}
                </ul>
              </div>
              
              <div className="mt-4 flex justify-between pt-4 border-t">
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      const updatedName = prompt('Edit project name:', project.name);
                      const updatedDesc = prompt('Edit project description:', project.description);
                      const updatedStart = prompt('Edit start date:', project.startDate);
                      const updatedEnd = prompt('Edit end date:', project.endDate);
                      const updatedStatus = prompt('Edit status (Not Started, In Progress, Completed):', project.status);
                      const updatedPriority = prompt('Edit priority (Low, Medium, High):', project.priority);
                      const updatedBudget = prompt('Edit budget:', project.budget);
                      
                      if (updatedName !== null && updatedDesc !== null && updatedStart !== null && 
                          updatedEnd !== null && updatedStatus !== null && updatedPriority !== null && 
                          updatedBudget !== null) {
                        updateProject({
                          ...project,
                          name: updatedName,
                          description: updatedDesc,
                          startDate: updatedStart,
                          endDate: updatedEnd,
                          status: updatedStatus,
                          priority: updatedPriority,
                          budget: parseFloat(updatedBudget)
                        });
                      }
                    }}
                    className="text-sm text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this project?')) {
                        deleteProject(project.id);
                      }
                    }}
                    className="text-sm text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
                {projectTeam ? (
                  <button
                    onClick={() => {
                      const memberOptions = employees.map(e => `${e.id}: ${e.name}`).join('\n');
                      const updatedMembers = prompt(`Edit team members (current: ${projectTeam.members.join(', ')})\nAvailable employees:\n${memberOptions}`, projectTeam.members.join(', '));
                      
                      if (updatedMembers !== null) {
                        updateTeam({
                          ...projectTeam,
                          members: updatedMembers.split(',').map(id => parseInt(id.trim()))
                        });
                      }
                    }}
                    className="text-sm text-green-600 hover:text-green-900"
                  >
                    Edit Team
                  </button>
                ) : (
                  <span className="text-sm text-gray-500">No team assigned</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsCardView;