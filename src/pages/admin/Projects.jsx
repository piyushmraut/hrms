// import React, { useState, useEffect } from 'react';
// import ProjectsTable from '../../projectcomponents/ProjectsTable';
// import ProjectForm from '../../projectcomponents/ProjectForm';
// import TaskForm from '../../projectcomponents/TaskForm';
// import EmployeeForm from '../../projectcomponents/EmployeeForm';
// import StatsOverview from '../../projectcomponents/StatsOverview';
// import ProjectTimeline from '../../projectcomponents/ProjectTimeline';
// import StatusPieChart from '../../projectcomponents/StatusPieChart';
// import PriorityChart from '../../projectcomponents/PriorityChart';

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [filters, setFilters] = useState({
//     status: 'all',
//     priority: 'all',
//     assignee: 'all',
//   });

//   // Load sample data
//   useEffect(() => {
//     const sampleEmployees = [
//       { id: 1, name: 'John Doe', position: 'Frontend Developer', email: 'john@example.com' },
//       { id: 2, name: 'Jane Smith', position: 'Backend Developer', email: 'jane@example.com' },
//       { id: 3, name: 'Mike Johnson', position: 'UI/UX Designer', email: 'mike@example.com' },
//       { id: 4, name: 'Sarah Williams', position: 'Project Manager', email: 'sarah@example.com' },
//     ];

//     const sampleProjects = [
//       { 
//         id: 1, 
//         name: 'Website Redesign', 
//         description: 'Complete redesign of company website', 
//         startDate: '2023-06-01', 
//         endDate: '2023-08-15', 
//         status: 'In Progress', 
//         priority: 'High',
//         budget: 15000
//       },
//       { 
//         id: 2, 
//         name: 'Mobile App Development', 
//         description: 'Build cross-platform mobile application', 
//         startDate: '2023-07-10', 
//         endDate: '2023-10-30', 
//         status: 'Not Started', 
//         priority: 'Medium',
//         budget: 25000
//       },
//       { 
//         id: 3, 
//         name: 'CRM System Upgrade', 
//         description: 'Upgrade existing CRM to latest version', 
//         startDate: '2023-05-15', 
//         endDate: '2023-07-20', 
//         status: 'Completed', 
//         priority: 'High',
//         budget: 18000
//       },
//     ];

//     const sampleTasks = [
//       { id: 1, projectId: 1, title: 'Design Homepage', description: 'Create new homepage design', assignee: 3, status: 'In Progress', priority: 'High', dueDate: '2023-06-15' },
//       { id: 2, projectId: 1, title: 'Develop Header Component', description: 'Code responsive header', assignee: 1, status: 'Completed', priority: 'Medium', dueDate: '2023-06-10' },
//       { id: 3, projectId: 2, title: 'API Architecture', description: 'Design backend API structure', assignee: 2, status: 'Not Started', priority: 'High', dueDate: '2023-07-20' },
//       { id: 4, projectId: 3, title: 'Data Migration', description: 'Migrate existing customer data', assignee: 2, status: 'In Progress', priority: 'Critical', dueDate: '2023-06-30' },
//     ];

//     setEmployees(sampleEmployees);
//     setProjects(sampleProjects);
//     setTasks(sampleTasks);
//   }, []);

//   // Add new project
//   const addProject = (project) => {
//     setProjects([...projects, { ...project, id: projects.length + 1 }]);
//   };

//   // Add new task
//   const addTask = (task) => {
//     setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
//   };

//   // Add new employee
//   const addEmployee = (employee) => {
//     setEmployees([...employees, { ...employee, id: employees.length + 1 }]);
//   };

//   // Update task status
//   const updateTaskStatus = (taskId, newStatus) => {
//     setTasks(tasks.map(task => 
//       task.id === taskId ? { ...task, status: newStatus } : task
//     ));
//   };

//   // Filter projects based on selected filters
//   const filteredProjects = projects.filter(project => {
//     if (filters.status !== 'all' && project.status !== filters.status) return false;
//     if (filters.priority !== 'all' && project.priority !== filters.priority) return false;
//     return true;
//   });

//   // Filter tasks based on selected filters
//   const filteredTasks = tasks.filter(task => {
//     if (filters.status !== 'all' && task.status !== filters.status) return false;
//     if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
//     if (filters.assignee !== 'all' && task.assignee !== parseInt(filters.assignee)) return false;
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900">Project Management Dashboard</h1>
//           <div className="flex space-x-4">
//             <button 
//               onClick={() => setActiveTab('dashboard')}
//               className={`px-4 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//             >
//               Dashboard
//             </button>
//             <button 
//               onClick={() => setActiveTab('projects')}
//               className={`px-4 py-2 rounded-md ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//             >
//               Projects
//             </button>
//             <button 
//               onClick={() => setActiveTab('tasks')}
//               className={`px-4 py-2 rounded-md ${activeTab === 'tasks' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//             >
//               Tasks
//             </button>
//             <button 
//               onClick={() => setActiveTab('team')}
//               className={`px-4 py-2 rounded-md ${activeTab === 'team' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//             >
//               Team
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         {/* Filters */}
//         <div className="bg-white shadow rounded-lg p-4 mb-6">
//           <h2 className="text-lg font-medium mb-4">Filters</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <select
//                 className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={filters.status}
//                 onChange={(e) => setFilters({...filters, status: e.target.value})}
//               >
//                 <option value="all">All Statuses</option>
//                 <option value="Not Started">Not Started</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//               <select
//                 className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={filters.priority}
//                 onChange={(e) => setFilters({...filters, priority: e.target.value})}
//               >
//                 <option value="all">All Priorities</option>
//                 <option value="Critical">Critical</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
//               <select
//                 className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={filters.assignee}
//                 onChange={(e) => setFilters({...filters, assignee: e.target.value})}
//               >
//                 <option value="all">All Assignees</option>
//                 {employees.map(employee => (
//                   <option key={employee.id} value={employee.id}>{employee.name}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Dashboard View */}
//         {activeTab === 'dashboard' && (
//           <div className="space-y-6">
//             <StatsOverview projects={projects} tasks={tasks} employees={employees} />
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-white shadow rounded-lg p-4">
//                 <h2 className="text-lg font-medium mb-4">Project Status Distribution</h2>
//                 <StatusPieChart projects={projects} />
//               </div>
//               <div className="bg-white shadow rounded-lg p-4">
//                 <h2 className="text-lg font-medium mb-4">Task Priority Distribution</h2>
//                 <PriorityChart tasks={tasks} />
//               </div>
//             </div>
            
//             <div className="bg-white shadow rounded-lg p-4">
//               <h2 className="text-lg font-medium mb-4">Project Timeline</h2>
//               <ProjectTimeline projects={projects} />
//             </div>
//           </div>
//         )}

//         {/* Projects View */}
//         {activeTab === 'projects' && (
//           <div className="space-y-6">
//             <div className="bg-white shadow rounded-lg p-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-medium">Projects</h2>
//                 <ProjectForm addProject={addProject} />
//               </div>
//               <ProjectsTable 
//                 projects={filteredProjects} 
//                 tasks={tasks} 
//                 employees={employees} 
//                 updateTaskStatus={updateTaskStatus}
//               />
//             </div>
//           </div>
//         )}

//         {/* Tasks View */}
//         {activeTab === 'tasks' && (
//           <div className="space-y-6">
//             <div className="bg-white shadow rounded-lg p-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-medium">Tasks</h2>
//                 <TaskForm addTask={addTask} projects={projects} employees={employees} />
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredTasks.map(task => {
//                       const project = projects.find(p => p.id === task.projectId);
//                       const assignee = employees.find(e => e.id === task.assignee);
                      
//                       return (
//                         <tr key={task.id}>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="font-medium text-gray-900">{task.title}</div>
//                             <div className="text-sm text-gray-500">{task.description}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {project ? project.name : 'N/A'}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {assignee ? assignee.name : 'Unassigned'}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                               ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
//                                 task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
//                                 'bg-yellow-100 text-yellow-800'}`}>
//                               {task.status}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                               ${task.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
//                                 task.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
//                                 task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
//                                 'bg-gray-100 text-gray-800'}`}>
//                               {task.priority}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {task.dueDate}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                             <select
//                               className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                               value={task.status}
//                               onChange={(e) => updateTaskStatus(task.id, e.target.value)}
//                             >
//                               <option value="Not Started">Not Started</option>
//                               <option value="In Progress">In Progress</option>
//                               <option value="Completed">Completed</option>
//                             </select>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Team View */}
//         {activeTab === 'team' && (
//           <div className="space-y-6">
//             <div className="bg-white shadow rounded-lg p-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-medium">Team Members</h2>
//                 <EmployeeForm addEmployee={addEmployee} />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {employees.map(employee => (
//                   <div key={employee.id} className="border rounded-lg p-4">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//                         {employee.name.charAt(0)}
//                       </div>
//                       <div>
//                         <h3 className="font-medium text-gray-900">{employee.name}</h3>
//                         <p className="text-sm text-gray-500">{employee.position}</p>
//                         <p className="text-sm text-blue-600">{employee.email}</p>
//                       </div>
//                     </div>
//                     <div className="mt-4">
//                       <h4 className="text-sm font-medium text-gray-700">Assigned Tasks</h4>
//                       <p className="text-sm text-gray-500">
//                         {tasks.filter(t => t.assignee === employee.id).length} tasks
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Projects;

/*
 *  Preferred response
 */
// import React, { useState, useEffect } from 'react';
// import ProjectsTable from '../../projectcomponents/ProjectsTable';
// import ProjectsCardView from '../../projectcomponents/ProjectsCardView';
// import ProjectForm from '../../projectcomponents/ProjectForm';
// import TaskForm from '../../projectcomponents/TaskForm';
// import EmployeeForm from '../../projectcomponents/EmployeeForm';
// import TeamForm from '../../projectcomponents/TeamForm';
// import StatsOverview from '../../projectcomponents/StatsOverview';
// import ProjectTimeline from '../../projectcomponents/ProjectTimeline';
// import StatusPieChart from '../../projectcomponents/StatusPieChart';
// import PriorityChart from '../../projectcomponents/PriorityChart';

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [teams, setTeams] = useState([]);
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [projectViewMode, setProjectViewMode] = useState('table'); // 'table' or 'card'
//   const [filters, setFilters] = useState({
//     status: 'all',
//     priority: 'all',
//     assignee: 'all',
//     team: 'all'
//   });

//   // Load data from localStorage
//   useEffect(() => {
//     const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
//     const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
//     const savedTeams = JSON.parse(localStorage.getItem('teams')) || [];

//     setProjects(savedProjects);
//     setTasks(savedTasks);
//     setEmployees(savedEmployees);
//     setTeams(savedTeams);
//   }, []);

//   // Save data to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('projects', JSON.stringify(projects));
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     localStorage.setItem('employees', JSON.stringify(employees));
//     localStorage.setItem('teams', JSON.stringify(teams));
//   }, [projects, tasks, employees, teams]);

//   // Add new project
//   const addProject = (project) => {
//     setProjects([...projects, { ...project, id: Date.now() }]);
//   };

//   // Update project
//   const updateProject = (updatedProject) => {
//     setProjects(projects.map(project => 
//       project.id === updatedProject.id ? updatedProject : project
//     ));
//   };

//   // Delete project
//   const deleteProject = (projectId) => {
//     setProjects(projects.filter(project => project.id !== projectId));
//     // Also delete associated tasks
//     setTasks(tasks.filter(task => task.projectId !== projectId));
//   };

//   // Add new task
//   const addTask = (task) => {
//     setTasks([...tasks, { ...task, id: Date.now() }]);
//   };

//   // Update task
//   const updateTask = (updatedTask) => {
//     setTasks(tasks.map(task => 
//       task.id === updatedTask.id ? updatedTask : task
//     ));
//   };

//   // Delete task
//   const deleteTask = (taskId) => {
//     setTasks(tasks.filter(task => task.id !== taskId));
//   };

//   // Add new employee
//   const addEmployee = (employee) => {
//     setEmployees([...employees, { ...employee, id: Date.now() }]);
//   };

//   // Update employee
//   const updateEmployee = (updatedEmployee) => {
//     setEmployees(employees.map(employee => 
//       employee.id === updatedEmployee.id ? updatedEmployee : employee
//     ));
//   };

//   // Delete employee
//   const deleteEmployee = (employeeId) => {
//     setEmployees(employees.filter(employee => employee.id !== employeeId));
//     // Remove employee from teams
//     setTeams(teams.map(team => ({
//       ...team,
//       members: team.members.filter(memberId => memberId !== employeeId)
//     })));
//     // Unassign tasks from this employee
//     setTasks(tasks.map(task => 
//       task.assignee === employeeId ? { ...task, assignee: null } : task
//     ));
//   };

//   // Add new team
//   const addTeam = (team) => {
//     setTeams([...teams, { ...team, id: Date.now() }]);
//   };

//   // Update team
//   const updateTeam = (updatedTeam) => {
//     setTeams(teams.map(team => 
//       team.id === updatedTeam.id ? updatedTeam : team
//     ));
//   };

//   // Delete team
//   const deleteTeam = (teamId) => {
//     setTeams(teams.filter(team => team.id !== teamId));
//   };

//   // Update task status
//   const updateTaskStatus = (taskId, newStatus) => {
//     setTasks(tasks.map(task => 
//       task.id === taskId ? { ...task, status: newStatus } : task
//     ));
//   };

//   // Filter projects based on selected filters
//   const filteredProjects = projects.filter(project => {
//     if (filters.status !== 'all' && project.status !== filters.status) return false;
//     if (filters.priority !== 'all' && project.priority !== filters.priority) return false;
//     if (filters.team !== 'all') {
//       const projectTeam = teams.find(team => team.projectId === project.id);
//       if (!projectTeam || !projectTeam.members.length) return false;
//     }
//     return true;
//   });

//   // Filter tasks based on selected filters
//   const filteredTasks = tasks.filter(task => {
//     if (filters.status !== 'all' && task.status !== filters.status) return false;
//     if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
//     if (filters.assignee !== 'all' && task.assignee !== parseInt(filters.assignee)) return false;
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900">Project Management Dashboard</h1>
//           <div className="flex space-x-4">
//             <button 
//               onClick={() => setActiveTab('dashboard')}
//               className={`px-4 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//             >
//               Dashboard
//             </button>
//             <button 
//               onClick={() => setActiveTab('projects')}
//               className={`px-4 py-2 rounded-md ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//             >
//               Projects
//             </button>
//             <button 
//               onClick={() => setActiveTab('tasks')}
//               className={`px-4 py-2 rounded-md ${activeTab === 'tasks' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//             >
//               Tasks
//             </button>
//             <button 
//               onClick={() => setActiveTab('team')}
//               className={`px-4 py-2 rounded-md ${activeTab === 'team' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//             >
//               Team
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         {/* Filters */}
//         <div className="bg-white shadow rounded-lg p-4 mb-6">
//           <h2 className="text-lg font-medium mb-4">Filters</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <select
//                 className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={filters.status}
//                 onChange={(e) => setFilters({...filters, status: e.target.value})}
//               >
//                 <option value="all">All Statuses</option>
//                 <option value="Not Started">Not Started</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//               <select
//                 className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={filters.priority}
//                 onChange={(e) => setFilters({...filters, priority: e.target.value})}
//               >
//                 <option value="all">All Priorities</option>
//                 <option value="Critical">Critical</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
//               <select
//                 className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={filters.assignee}
//                 onChange={(e) => setFilters({...filters, assignee: e.target.value})}
//               >
//                 <option value="all">All Assignees</option>
//                 {employees.map(employee => (
//                   <option key={employee.id} value={employee.id}>{employee.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
//               <select
//                 className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={filters.team}
//                 onChange={(e) => setFilters({...filters, team: e.target.value})}
//               >
//                 <option value="all">All Teams</option>
//                 {teams.map(team => (
//                   <option key={team.id} value={team.id}>{team.name}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Dashboard View */}
//         {activeTab === 'dashboard' && (
//           <div className="space-y-6">
//             <StatsOverview projects={projects} tasks={tasks} employees={employees} teams={teams} />
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-white shadow rounded-lg p-4">
//                 <h2 className="text-lg font-medium mb-4">Project Status Distribution</h2>
//                 <StatusPieChart projects={projects} />
//               </div>
//               <div className="bg-white shadow rounded-lg p-4">
//                 <h2 className="text-lg font-medium mb-4">Task Priority Distribution</h2>
//                 <PriorityChart tasks={tasks} />
//               </div>
//             </div>
            
//             <div className="bg-white shadow rounded-lg p-4">
//               <h2 className="text-lg font-medium mb-4">Project Timeline</h2>
//               <ProjectTimeline projects={projects} />
//             </div>
//           </div>
//         )}

//         {/* Projects View */}
//         {/* {activeTab === 'projects' && (
//           <div className="space-y-6">
//             <div className="bg-white shadow rounded-lg p-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-medium">Projects</h2>
//                 <div className="flex space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => setProjectViewMode('table')}
//                       className={`p-2 rounded-md ${projectViewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
//                       title="Table View"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M5 4a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1H5zm0 7a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H5zm7-7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V5zm0 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => setProjectViewMode('card')}
//                       className={`p-2 rounded-md ${projectViewMode === 'card' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
//                       title="Card View"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                       </svg>
//                     </button>
//                   </div>
//                   <ProjectForm 
//                     addProject={addProject} 
//                     employees={employees} 
//                     teams={teams} 
//                   />
//                 </div>
//               </div>
//               {projectViewMode === 'table../../projectcomponents/
//                   projects={filteredProjects} 
//                   tasks={tasks} 
//                   employees={employees} 
//                   teams={teams}
//                   updateTaskStatus={updateTaskStatus}
//                   updateProject={updateProject}
//                   deleteProject={deleteProject}
//                   updateTask={updateTask}
//                   deleteTask={deleteTask}
//                   updateTeam={updateTeam}
//                 />
//               ) : (
//                 <ProjectsCardView 
//                   projects={filteredProjects} 
//                   tasks={tasks} 
//                   employees={employees} 
//                   teams={teams}
//                   updateTaskStatus={updateTaskStatus}
//                   updateProject={updateProject}
//                   deleteProject={deleteProject}
//                   updateTask={updateTask}
//                   deleteTask={deleteTask}
//                   updateTeam={updateTeam}
//                 />
//               )}
//             </div>
//           </div>
//         )} */}
//         {activeTab === 'projects' && (
//   <div className="space-y-6">
//     <div className="bg-white shadow rounded-lg p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-medium">Projects</h2>
//         <div className="flex space-x-4">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => setProjectViewMode('table')}
//               className={`p-2 rounded-md ${projectViewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
//               title="Table View"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M5 4a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1H5zm0 7a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H5zm7-7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V5zm0 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" clipRule="evenodd" />
//               </svg>
//             </button>
//             <button
//               onClick={() => setProjectViewMode('card')}
//               className={`p-2 rounded-md ${projectViewMode === 'card' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
//               title="Card View"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//               </svg>
//             </button>
//           </div>
//           <ProjectForm 
//             addProject={addProject} 
//             employees={employees} 
//             teams={teams} 
//           />
//         </div>
//       </div>
//       {projectViewMode === 'table' ? (
//         <ProjectsTable
//           projects={filteredProjects}
//           tasks={tasks}
//           employees={employees}
//           teams={teams}
//           updateTaskStatus={updateTaskStatus}
//           updateProject={updateProject}
//           deleteProject={deleteProject}
//           updateTask={updateTask}
//           deleteTask={deleteTask}
//           updateTeam={updateTeam}
//         />
//       ) : (
//         <ProjectsCardView
//           projects={filteredProjects}
//           tasks={tasks}
//           employees={employees}
//           teams={teams}
//           updateTaskStatus={updateTaskStatus}
//           updateProject={updateProject}
//           deleteProject={deleteProject}
//           updateTask={updateTask}
//           deleteTask={deleteTask}
//           updateTeam={updateTeam}
//         />
//       )}
//     </div>
//   </div>
// )}

//         {/* Tasks View */}
//         {activeTab === 'tasks' && (
//           <div className="space-y-6">
//             <div className="bg-white shadow rounded-lg p-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-medium">Tasks</h2>
//                 <TaskForm 
//                   addTask={addTask} 
//                   projects={projects} 
//                   employees={employees} 
//                 />
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredTasks.map(task => {
//                       const project = projects.find(p => p.id === task.projectId);
//                       const assignee = employees.find(e => e.id === task.assignee);
                      
//                       return (
//                         <tr key={task.id}>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="font-medium text-gray-900">{task.title}</div>
//                             <div className="text-sm text-gray-500">{task.description}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {project ? project.name : 'N/A'}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {assignee ? assignee.name : 'Unassigned'}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                               ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
//                                 task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
//                                 'bg-yellow-100 text-yellow-800'}`}>
//                               {task.status}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                               ${task.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
//                                 task.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
//                                 task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
//                                 'bg-gray-100 text-gray-800'}`}>
//                               {task.priority}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {task.dueDate}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
//                             <select
//                               className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                               value={task.status}
//                               onChange={(e) => updateTaskStatus(task.id, e.target.value)}
//                             >
//                               <option value="Not Started">Not Started</option>
//                               <option value="In Progress">In Progress</option>
//                               <option value="Completed">Completed</option>
//                             </select>
//                             <button
//                               onClick={() => {
//                                 const updatedTitle = prompt('Edit task title:', task.title);
//                                 const updatedDesc = prompt('Edit task description:', task.description);
//                                 if (updatedTitle !== null && updatedDesc !== null) {
//                                   updateTask({
//                                     ...task,
//                                     title: updatedTitle,
//                                     description: updatedDesc
//                                   });
//                                 }
//                               }}
//                               className="text-blue-600 hover:text-blue-900"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => {
//                                 if (window.confirm('Are you sure you want to delete this task?')) {
//                                   deleteTask(task.id);
//                                 }
//                               }}
//                               className="text-red-600 hover:text-red-900"
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Team View */}
//         {activeTab === 'team' && (
//           <div className="space-y-6">
//             <div className="bg-white shadow rounded-lg p-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-medium">Team Members</h2>
//                 <div className="flex space-x-4">
//                   <EmployeeForm 
//                     addEmployee={addEmployee} 
//                   />
//                   <TeamForm 
//                     addTeam={addTeam} 
//                     employees={employees} 
//                     projects={projects} 
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                 {employees.map(employee => (
//                   <div key={employee.id} className="border rounded-lg p-4">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//                         {employee.name.charAt(0)}
//                       </div>
//                       <div>
//                         <h3 className="font-medium text-gray-900">{employee.name}</h3>
//                         <p className="text-sm text-gray-500">{employee.position}</p>
//                         <p className="text-sm text-blue-600">{employee.email}</p>
//                       </div>
//                     </div>
//                     <div className="mt-4">
//                       <h4 className="text-sm font-medium text-gray-700">Assigned Tasks</h4>
//                       <p className="text-sm text-gray-500">
//                         {tasks.filter(t => t.assignee === employee.id).length} tasks
//                       </p>
//                     </div>
//                     <div className="mt-4 flex space-x-2">
//                       <button
//                         onClick={() => {
//                           const updatedName = prompt('Edit employee name:', employee.name);
//                           const updatedPosition = prompt('Edit employee position:', employee.position);
//                           const updatedEmail = prompt('Edit employee email:', employee.email);
//                           if (updatedName !== null && updatedPosition !== null && updatedEmail !== null) {
//                             updateEmployee({
//                               ...employee,
//                               name: updatedName,
//                               position: updatedPosition,
//                               email: updatedEmail
//                             });
//                           }
//                         }}
//                         className="text-sm text-blue-600 hover:text-blue-900"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => {
//                           if (window.confirm('Are you sure you want to delete this employee?')) {
//                             deleteEmployee(employee.id);
//                           }
//                         }}
//                         className="text-sm text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <h2 className="text-lg font-medium mb-4">Teams</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {teams.map(team => {
//                   const project = projects.find(p => p.id === team.projectId);
//                   const teamMembers = employees.filter(e => team.members.includes(e.id));
                  
//                   return (
//                     <div key={team.id} className="border rounded-lg p-4">
//                       <h3 className="font-medium text-gray-900">{team.name}</h3>
//                       <p className="text-sm text-gray-500 mb-2">
//                         Project: {project ? project.name : 'No project assigned'}
//                       </p>
//                       <div className="mt-2">
//                         <h4 className="text-sm font-medium text-gray-700">Team Members</h4>
//                         <ul className="text-sm text-gray-500">
//                           {teamMembers.length > 0 ? (
//                             teamMembers.map(member => (
//                               <li key={member.id}>{member.name} ({member.position})</li>
//                             ))
//                           ) : (
//                             <li>No members in this team</li>
//                           )}
//                         </ul>
//                       </div>
//                       <div className="mt-4 flex space-x-2">
//                         <button
//                           onClick={() => {
//                             const updatedName = prompt('Edit team name:', team.name);
//                             const projectOptions = projects.map(p => `${p.id}: ${p.name}`).join('\n');
//                             const updatedProjectId = prompt(`Edit project (current: ${team.projectId})\nAvailable projects:\n${projectOptions}`, team.projectId);
//                             const memberOptions = employees.map(e => `${e.id}: ${e.name}`).join('\n');
//                             const updatedMembers = prompt(`Edit team members (current: ${team.members.join(', ')})\nAvailable employees:\n${memberOptions}`, team.members.join(', '));
                            
//                             if (updatedName !== null && updatedProjectId !== null && updatedMembers !== null) {
//                               updateTeam({
//                                 ...team,
//                                 name: updatedName,
//                                 projectId: parseInt(updatedProjectId),
//                                 members: updatedMembers.split(',').map(id => parseInt(id.trim()))
//                               });
//                             }
//                           }}
//                           className="text-sm text-blue-600 hover:text-blue-900"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => {
//                             if (window.confirm('Are you sure you want to delete this team?')) {
//                               deleteTeam(team.id);
//                             }
//                           }}
//                           className="text-sm text-red-600 hover:text-red-900"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Projects;

import React, { useState, useEffect } from 'react';
import ProjectsTable from '../../projectcomponents/ProjectsTable';
import ProjectsCardView from '../../projectcomponents/ProjectsCardView';
import ProjectForm from '../../projectcomponents/ProjectForm';
import TaskForm from '../../projectcomponents/TaskForm';
import EmployeeForm from '../../projectcomponents/EmployeeForm';
import TeamForm from '../../projectcomponents/TeamForm';
import StatsOverview from '../../projectcomponents/StatsOverview';
import ProjectTimeline from '../../projectcomponents/ProjectTimeline';
import StatusPieChart from '../../projectcomponents/StatusPieChart';
import PriorityChart from '../../projectcomponents/PriorityChart';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projectViewMode, setProjectViewMode] = useState('table');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all',
    team: 'all',
  });

  // Form control states
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEmployeeFormOpen, setIsEmployeeFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Dummy data
  const dummyProjects = [
    {
      id: 1,
      name: 'Project Alpha',
      description: 'Description for Project Alpha',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'In Progress',
      priority: 'High',
      budget: 100000,
    },
    {
      id: 2,
      name: 'Project Beta',
      description: 'Description for Project Beta',
      startDate: '2024-03-01',
      endDate: '2024-09-30',
      status: 'Not Started',
      priority: 'Medium',
      budget: 50000,
    },
    {
      id: 3,
      name: 'Project Gamma',
      description: 'Description for Project Gamma',
      startDate: '2024-06-01',
      endDate: '2024-12-31',
      status: 'Completed',
      priority: 'Low',
      budget: 75000,
    },
  ];

  const dummyEmployees = [
    { id: 1, name: 'John Doe', position: 'Developer', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', position: 'Designer', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', position: 'Manager', email: 'mike@example.com' },
    { id: 4, name: 'Emily Brown', position: 'Tester', email: 'emily@example.com' },
  ];

  const dummyTeams = [
    { id: 1, name: 'Team A', projectId: 1, members: [1, 2] },
    { id: 2, name: 'Team B', projectId: 2, members: [3, 4] },
  ];

  const dummyTasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      projectId: 1,
      assignee: 1,
      status: 'In Progress',
      priority: 'High',
      dueDate: '2024-02-15',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      projectId: 1,
      assignee: 2,
      status: 'Not Started',
      priority: 'Medium',
      dueDate: '2024-03-01',
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for Task 3',
      projectId: 2,
      assignee: 3,
      status: 'Not Started',
      priority: 'Low',
      dueDate: '2024-04-01',
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description for Task 4',
      projectId: 3,
      assignee: 4,
      status: 'Completed',
      priority: 'Medium',
      dueDate: '2024-12-15',
    },
  ];

  // Load data from localStorage or use dummy data if empty
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(savedProjects.length > 0 ? savedProjects : dummyProjects);

    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks.length > 0 ? savedTasks : dummyTasks);

    const savedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    setEmployees(savedEmployees.length > 0 ? savedEmployees : dummyEmployees);

    const savedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
    setTeams(savedTeams.length > 0 ? savedTeams : dummyTeams);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [projects, tasks, employees, teams]);

  // CRUD Functions (unchanged except for visibility in forms)
  const addProject = (project) => {
    setProjects([...projects, { ...project, id: Date.now() }]);
  };

  const updateProject = (updatedProject) => {
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
  };

  const deleteProject = (projectId) => {
    setProjects(projects.filter((p) => p.id !== projectId));
    setTasks(tasks.filter((t) => t.projectId !== projectId));
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now() }]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map((e) => (e.id === updatedEmployee.id ? updatedEmployee : e)));
  };

  const deleteEmployee = (employeeId) => {
    setEmployees(employees.filter((e) => e.id !== employeeId));
    setTeams(
      teams.map((t) => ({
        ...t,
        members: t.members.filter((m) => m !== employeeId),
      }))
    );
    setTasks(tasks.map((t) => (t.assignee === employeeId ? { ...t, assignee: null } : t)));
  };

  const addTeam = (team) => {
    setTeams([...teams, { ...team, id: Date.now() }]);
  };

  const updateTeam = (updatedTeam) => {
    setTeams(teams.map((t) => (t.id === updatedTeam.id ? updatedTeam : t)));
  };

  const deleteTeam = (teamId) => {
    setTeams(teams.filter((t) => t.id !== teamId));
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  // Filtering logic (unchanged)
  const filteredProjects = projects.filter((project) => {
    if (filters.status !== 'all' && project.status !== filters.status) return false;
    if (filters.priority !== 'all' && project.priority !== filters.priority) return false;
    if (filters.team !== 'all') {
      const projectTeam = teams.find((t) => t.projectId === project.id);
      if (!projectTeam || !projectTeam.members.length) return false;
    }
    return true;
  });

  const filteredTasks = tasks.filter((task) => {
    if (filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.assignee !== 'all' && task.assignee !== parseInt(filters.assignee)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Project Management Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-md ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-4 py-2 rounded-md ${activeTab === 'team' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Team
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 rounded-md ${activeTab === 'tasks' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Tasks
            </button>
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-9xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Filters */}
        {(activeTab === 'projects' || activeTab === 'tasks') && (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-lg font-medium mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
    </div>
  )}

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <StatsOverview projects={projects} tasks={tasks} employees={employees} teams={teams} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-medium mb-4">Project Status Distribution</h2>
                <StatusPieChart projects={projects} />
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-medium mb-4">Task Priority Distribution</h2>
                <PriorityChart tasks={tasks} />
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Project Timeline</h2>
              <ProjectTimeline projects={projects} />
            </div>
          </div>
        )}

        {/* Projects View */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Projects</h2>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setProjectViewMode('table')}
                      className={`p-2 rounded-md ${projectViewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                      title="Table View"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 4a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1H5zm0 7a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H5zm7-7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V5zm0 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setProjectViewMode('card')}
                      className={`p-2 rounded-md ${projectViewMode === 'card' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                      title="Card View"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setIsProjectFormOpen(true);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Project
                  </button>
                </div>
              </div>
              {projectViewMode === 'table' ? (
                <ProjectsTable
                  projects={filteredProjects}
                  tasks={tasks}
                  employees={employees}
                  teams={teams}
                  updateTaskStatus={updateTaskStatus}
                  updateProject={updateProject}
                  deleteProject={deleteProject}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  updateTeam={updateTeam}
                  setSelectedProject={setSelectedProject}
                  setIsProjectFormOpen={setIsProjectFormOpen}
                  setSelectedTask={setSelectedTask}
                  setIsTaskFormOpen={setIsTaskFormOpen}
                />
              ) : (
                <ProjectsCardView
                  projects={filteredProjects}
                  tasks={tasks}
                  employees={employees}
                  teams={teams}
                  updateTaskStatus={updateTaskStatus}
                  updateProject={updateProject}
                  deleteProject={deleteProject}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  updateTeam={updateTeam}
                  setSelectedProject={setSelectedProject}
                  setIsProjectFormOpen={setIsProjectFormOpen}
                  setSelectedTask={setSelectedTask}
                  setIsTaskFormOpen={setIsTaskFormOpen}
                />
              )}
            </div>
          </div>
        )}

        {/* Tasks View */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Tasks</h2>
                <button
                  onClick={() => {
                    setSelectedTask(null);
                    setIsTaskFormOpen(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add Task
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTasks.map((task) => {
                      const project = projects.find((p) => p.id === task.projectId);
                      const assignee = employees.find((e) => e.id === task.assignee);
                      return (
                        <tr key={task.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{task.title}</div>
                            <div className="text-sm text-gray-500">{task.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {project ? project.name : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {assignee ? assignee.name : 'Unassigned'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                task.priority === 'Critical'
                                  ? 'bg-red-100 text-red-800'
                                  : task.priority === 'High'
                                  ? 'bg-orange-100 text-orange-800'
                                  : task.priority === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {task.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                            <select
                              className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={task.status}
                              onChange={(e) => updateTaskStatus(task.id, e.target.value)}
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
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Team View */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Team Members</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setSelectedEmployee(null);
                      setIsEmployeeFormOpen(true);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Add Employee
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTeam(null);
                      setIsTeamFormOpen(true);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Add Team
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {employees.map((employee) => (
                  <div key={employee.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{employee.name}</h3>
                        <p className="text-sm text-gray-500">{employee.position}</p>
                        <p className="text-sm text-blue-600">{employee.email}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700">Assigned Tasks</h4>
                      <p className="text-sm text-gray-500">
                        {tasks.filter((t) => t.assignee === employee.id).length} tasks
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setIsEmployeeFormOpen(true);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this employee?')) {
                            deleteEmployee(employee.id);
                          }
                        }}
                        className="text-sm text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <h2 className="text-lg font-medium mb-4">Teams</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => {
                  const project = projects.find((p) => p.id === team.projectId);
                  const teamMembers = employees.filter((e) => team.members.includes(e.id));
                  return (
                    <div key={team.id} className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">{team.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Project: {project ? project.name : 'No project assigned'}
                      </p>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700">Team Members</h4>
                        <ul className="text-sm text-gray-500">
                          {teamMembers.length > 0 ? (
                            teamMembers.map((member) => (
                              <li key={member.id}>
                                {member.name} ({member.position})
                              </li>
                            ))
                          ) : (
                            <li>No members in this team</li>
                          )}
                        </ul>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedTeam(team);
                            setIsTeamFormOpen(true);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this team?')) {
                              deleteTeam(team.id);
                            }
                          }}
                          className="text-sm text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Form Modals */}
        {isProjectFormOpen && (
          <ProjectForm
            project={selectedProject}
            addProject={addProject}
            updateProject={updateProject}
            onClose={() => setIsProjectFormOpen(false)}
            employees={employees}
            teams={teams}
          />
        )}
        {isTaskFormOpen && (
          <TaskForm
            task={selectedTask}
            addTask={addTask}
            updateTask={updateTask}
            onClose={() => setIsTaskFormOpen(false)}
            projects={projects}
            employees={employees}
          />
        )}
        {isEmployeeFormOpen && (
          <EmployeeForm
            employee={selectedEmployee}
            addEmployee={addEmployee}
            updateEmployee={updateEmployee}
            onClose={() => setIsEmployeeFormOpen(false)}
          />
        )}
        {isTeamFormOpen && (
          <TeamForm
            team={selectedTeam}
            addTeam={addTeam}
            updateTeam={updateTeam}
            onClose={() => setIsTeamFormOpen(false)}
            employees={employees}
            projects={projects}
          />
        )}
      </main>
    </div>
  );
};

export default Projects;
