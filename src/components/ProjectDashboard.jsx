// ProjectDashboard.jsx
import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProjectDashboard = ({ projects }) => {
  // Calculate statistics
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;
  const onHoldProjects = projects.filter(p => p.status === 'On Hold').length;
  const cancelledProjects = projects.filter(p => p.status === 'Cancelled').length;
  
  const averageProgress = projects.length > 0 
    ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) 
    : 0;
  
  // Data for status distribution chart
  const statusData = [
    { name: 'Completed', value: completedProjects },
    { name: 'In Progress', value: inProgressProjects },
    { name: 'On Hold', value: onHoldProjects },
    { name: 'Cancelled', value: cancelledProjects },
  ];
  
  const statusColors = ['#4CAF50', '#2196F3', '#FFC107', '#F44336'];
  
  // Data for priority distribution
  const priorityDistribution = [
    { name: 'Low', value: projects.filter(p => p.priority === 'Low').length },
    { name: 'Medium', value: projects.filter(p => p.priority === 'Medium').length },
    { name: 'High', value: projects.filter(p => p.priority === 'High').length },
    { name: 'Critical', value: projects.filter(p => p.priority === 'Critical').length },
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Project Dashboard</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-700">Total Projects</h4>
          <p className="text-2xl font-bold text-blue-800">{totalProjects}</p>
        </div>
        
        <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-700">Completed</h4>
          <p className="text-2xl font-bold text-green-800">{completedProjects}</p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-700">In Progress</h4>
          <p className="text-2xl font-bold text-yellow-800">{inProgressProjects}</p>
        </div>
        
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-indigo-700">Avg. Progress</h4>
          <p className="text-2xl font-bold text-indigo-800">{averageProgress}%</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Project Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={statusColors[index % statusColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Project Priority Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={priorityDistribution}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Projects</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.slice(0, 5).map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{project.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                        project.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{project.progress}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{project.endDate || 'Not set'}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;