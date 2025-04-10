import React, { useState, useEffect } from 'react';
import ProjectsTable from '../../components/ProjectsTable';
import ProjectsCardView from '../../components/ProjectsCardView';
import ProjectForm from '../../components/ProjectFormForProject';
import TaskForm from '../../components/TaskFormForProject';
import EmployeeForm from '../../components/EmployeeForm';
import TeamForm from '../../components/TeamForm';
import StatsOverview from '../../components/StatsOverview';
import ProjectTimeline from '../../components/ProjectTimeline';
import StatusPieChart from '../../components/StatusPieChart';
import PriorityChart from '../../components/PriorityChart';

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

  // Dummy data (unchanged)
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

  // Load data from localStorage with error handling
  useEffect(() => {
    const loadData = (key, defaultData) => {
      try {
        const savedData = localStorage.getItem(key);
        const parsedData = savedData ? JSON.parse(savedData) : [];
        return Array.isArray(parsedData) && parsedData.length > 0 ? parsedData : defaultData;
      } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return defaultData;
      }
    };

    setProjects(loadData('projects', dummyProjects));
    setTasks(loadData('tasks', dummyTasks));
    // setEmployees(loadData('employees', dummyEmployees));
    setEmployees(loadData('projectEmployees', dummyEmployees));
    setTeams(loadData('teams', dummyTeams));
  }, []);

  // Save data to localStorage with error handling
  useEffect(() => {
    const saveData = (key, data) => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
      }
    };

    saveData('projects', projects);
    saveData('tasks', tasks);
    saveData('projectEmployees', employees);
    saveData('teams', teams);
  }, [projects, tasks, employees, teams]);

  // CRUD Functions (unchanged)
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

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    {/* Header with improved styling */}
    <header className="bg-violet-50 shadow-md border-2 rounded-lg border-gray-300 max-w-[1555px] ml-8">
      <div className="max-w-9xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="animate-pulse text-violet-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-indigo-800">Project Management</h1>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'dashboard' 
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === 'dashboard' ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'projects' 
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === 'projects' ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Projects</span>
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'team' 
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === 'team' ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Team</span>
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'tasks' 
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === 'tasks' ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 14l2 2 4-4" />
            </svg>
            <span>Tasks</span>
          </button>
        </div>
      </div>
    </header>

    {/* Main Content with improved styling */}
    <main className="max-w-10xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Filters with improved styling */}
      {(activeTab === 'projects' || activeTab === 'tasks') && (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 appearance-none bg-white shadow-sm"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="all">All Statuses</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 appearance-none bg-white shadow-sm"
                  value={filters.priority}
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                >
                  <option value="all">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard View with improved styling */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <StatsOverview projects={projects} tasks={tasks} employees={employees} teams={teams} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 shadow-lg rounded-xl p-4 border border-gray-400 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-violet-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                Project Status Distribution
              </h2>
              <StatusPieChart projects={projects} />
            </div>
            <div className="bg-red-50 shadow-lg rounded-xl p-4 border border-gray-400 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-violet-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Task Priority Distribution
              </h2>
              <PriorityChart tasks={tasks} />
            </div>
          </div>
          <div className="bg-red-50 shadow-lg rounded-xl p-6 border border-gray-400 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-violet-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Project Timeline
            </h2>
            <ProjectTimeline projects={projects} />
          </div>
        </div>
      )}

      {/* Projects View with improved styling */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                Projects
              </h2>
              <div className="flex space-x-4">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setProjectViewMode('table')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      projectViewMode === 'table' 
                        ? 'bg-violet-100 text-violet-600 shadow-sm' 
                        : 'bg-transparent text-gray-600 hover:bg-gray-200'
                    }`}
                    title="Table View"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${projectViewMode === 'table' ? 'animate-pulse' : ''}`}
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
                    className={`p-2 rounded-md transition-all duration-200 ${
                      projectViewMode === 'card' 
                        ? 'bg-violet-100 text-violet-600 shadow-sm' 
                        : 'bg-transparent text-gray-600 hover:bg-gray-200'
                    }`}
                    title="Card View"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${projectViewMode === 'card' ? 'animate-pulse' : ''}`}
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
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Project
                </button>
              </div>
            </div>
            <div className="transition-all duration-300">
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
                  setSelectedTeam={setSelectedTeam}
                  setIsTeamFormOpen={setIsTeamFormOpen}
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
                  setSelectedTeam={setSelectedTeam}
                  setIsTeamFormOpen={setIsTeamFormOpen}
                />
              )}
            </div>
          </div>
        </div>
      )}

       

{activeTab === 'tasks' && (
  <div className="space-y-6">
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Tasks
        </h2>
        <button
          onClick={() => {
            setSelectedTask(null);
            setIsTaskFormOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-transparent rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-violet-50 to-indigo-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b-2 border-violet-100">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b-2 border-violet-100">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b-2 border-violet-100">Assignee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b-2 border-violet-100">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b-2 border-violet-100">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b-2 border-violet-100">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b-2 border-violet-100">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map((task, index) => {
              const project = projects.find((p) => p.id === task.projectId);
              const assignee = employees.find((e) => e.id === task.assignee);
              return (
                <tr key={task.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-violet-50 transition-colors duration-150'}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project ? (
                      <span className="px-2 py-1 bg-violet-50 text-violet-700 rounded-md border border-violet-200">
                        {project.name}
                      </span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assignee ? (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-indigo-400 to-violet-500 flex items-center justify-center text-white font-medium text-sm">
                          {assignee.name.charAt(0)}
                        </div>
                        <div className="ml-3 text-sm text-gray-700">{assignee.name}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
                        task.status === 'Completed'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : task.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}
                    >
                      {task.status === 'Completed' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {task.status === 'In Progress' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      )}
                      {task.status === 'Not Started' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
                        task.priority === 'Critical'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : task.priority === 'High'
                          ? 'bg-orange-100 text-orange-800 border border-orange-200'
                          : task.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}
                    >
                      {task.priority === 'High' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                      {task.priority === 'Medium' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10h14M5 14h14" />
                        </svg>
                      )}
                      {task.priority === 'Low' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      )}
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {task.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <select
                          className="border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white"
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setIsTaskFormOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this task?')) {
                            deleteTask(task.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900 transition-colors duration-150"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <p className="text-lg font-medium mb-1">No tasks found</p>
                    <p className="text-sm">Try changing your filter settings or add a new task</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}

        
{activeTab === 'team' && (
  <div className="space-y-6">
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Team Members
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setSelectedEmployee(null);
              setIsEmployeeFormOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Add Employee
          </button>
          <button
            onClick={() => {
              setSelectedTeam(null);
              setIsTeamFormOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Team
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {employees.map((employee) => (
          <div key={employee.id} className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {employee.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{employee.name}</h3>
                <p className="text-sm text-gray-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {employee.position}
                </p>
                <p className="text-sm text-blue-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {employee.email}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Assigned Tasks
              </h4>
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
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this employee?')) {
                    deleteEmployee(employee.id);
                  }
                }}
                className="text-sm text-red-600 hover:text-red-800 flex items-center transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Teams
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => {
          const project = projects.find((p) => p.id === team.projectId);
          const teamMembers = employees.filter((e) => team.members.includes(e.id));
          return (
            <div key={team.id} className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="font-medium text-gray-900 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {team.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Project: {project ? project.name : 'No project assigned'}
              </p>
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Team Members
                </h4>
                <ul className="text-sm text-gray-500 mt-2 space-y-1">
                  {teamMembers.length > 0 ? (
                    teamMembers.map((member) => (
                      <li key={member.id} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {member.name} ({member.position})
                      </li>
                    ))
                  ) : (
                    <li className="flex items-center text-gray-400 italic">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      No members in this team
                    </li>
                  )}
                </ul>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedTeam(team);
                    setIsTeamFormOpen(true);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this team?')) {
                      deleteTeam(team.id);
                    }
                  }}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
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



{/* Form Modals - we keep functionality the same as requested */}
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