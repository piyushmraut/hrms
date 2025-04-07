// // Projects.jsx
// import React, { useState, useEffect } from 'react';
// import ProjectList from '../../components/ProjectList';
// import ProjectForm from '../../components/ProjectForm';
// import ProjectDetail from '../../components/ProjectDetail';
// import ProjectTaskList from '../../components/ProjectTaskList';
// import ProjectDashboard from '../../components/ProjectDashboard';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { ChartPieIcon, ListTodo, FileText, LayoutDashboard } from 'lucide-react';

// function Projects() {
//   // Sample data - In a real app, this would come from an API
//   const [projects, setProjects] = useState([
//     {
//       id: '1',
//       name: 'HR System Redesign',
//       description: 'Complete overhaul of the current HR management system with improved UX/UI and additional features.',
//       startDate: '2025-01-15',
//       endDate: '2025-06-30',
//       status: 'In Progress',
//       progress: 35,
//       teamSize: 5,
//       duration: '5.5 months',
//       deadline: '2025-06-30',
//       teamMembers: [
//         { id: '101', name: 'John Doe', role: 'Project Manager', avatar: null },
//         { id: '102', name: 'Jane Smith', role: 'Lead Developer', avatar: null },
//       ],
//       budget: 45000,
//       clientId: '1',
//       clientName: 'Internal',
//       priority: 'High'
//     },
//     {
//       id: '2',
//       name: 'Employee Training Portal',
//       description: 'Development of interactive training modules for new employee onboarding.',
//       startDate: '2025-02-01',
//       endDate: '2025-04-15',
//       status: 'In Progress',
//       progress: 65,
//       teamSize: 3,
//       duration: '2.5 months',
//       deadline: '2025-04-15',
//       teamMembers: [
//         { id: '103', name: 'Michael Johnson', role: 'Training Specialist', avatar: null },
//         { id: '104', name: 'Emily Williams', role: 'Content Developer', avatar: null },
//       ],
//       budget: 28000,
//       clientId: '1',
//       clientName: 'Internal',
//       priority: 'Medium'
//     },
//     {
//       id: '3',
//       name: 'Payroll System Integration',
//       description: 'Integration of the HR system with third-party payroll processing software.',
//       startDate: '2024-11-10',
//       endDate: '2025-01-20',
//       status: 'Completed',
//       progress: 100,
//       teamSize: 4,
//       duration: '2 months',
//       deadline: '2025-01-20',
//       teamMembers: [
//         { id: '105', name: 'Robert Brown', role: 'System Analyst', avatar: null },
//         { id: '106', name: 'Sarah Miller', role: 'Finance Specialist', avatar: null },
//       ],
//       budget: 35000,
//       clientId: '2',
//       clientName: 'Finance Department',
//       priority: 'High'
//     }
//   ]);

//   // Sample tasks
//   const [tasks, setTasks] = useState([
//     { id: '1', projectId: '1', title: 'Design user interface wireframes', completed: true, dueDate: '2025-02-15', assignee: 'Jane Smith' },
//     { id: '2', projectId: '1', title: 'Develop authentication module', completed: false, dueDate: '2025-03-01', assignee: 'John Doe' },
//     { id: '3', projectId: '1', title: 'Set up database schema', completed: true, dueDate: '2025-02-10', assignee: 'Jane Smith' },
//     { id: '4', projectId: '2', title: 'Create training content outline', completed: true, dueDate: '2025-02-20', assignee: 'Emily Williams' },
//     { id: '5', projectId: '2', title: 'Develop interactive quizzes', completed: false, dueDate: '2025-03-10', assignee: 'Michael Johnson' }
//   ]);

//   const [view, setView] = useState('list'); // 'list', 'form', 'detail'
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [activeTab, setActiveTab] = useState('dashboard');

//   // Handle adding a new project
//   const handleAddProject = () => {
//     setSelectedProject(null);
//     setView('form');
//   };

//   // Handle saving a project (create or update)
//   const handleSaveProject = (project) => {
//     if (project.id && projects.some(p => p.id === project.id)) {
//       // Update existing project
//       setProjects(projects.map(p => p.id === project.id ? project : p));
//     } else {
//       // Add new project
//       setProjects([...projects, project]);
//     }
//     setView('list');
//   };

//   // Handle editing a project
//   const handleEditProject = (project) => {
//     setSelectedProject(project);
//     setView('form');
//   };

//   // Handle viewing project details
//   const handleViewProject = (project) => {
//     setSelectedProject(project);
//     setView('detail');
//     setActiveTab('overview');
//   };

//   // Handle deleting a project
//   const handleDeleteProject = (projectId) => {
//     setProjects(projects.filter(p => p.id !== projectId));
//     setView('list');
//   };

//   // Return to the project list
//   const handleBackToList = () => {
//     setView('list');
//     setSelectedProject(null);
//   };

//   // Filter tasks for the selected project
//   const projectTasks = tasks.filter(task => task.projectId === selectedProject?.id);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col gap-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">Project Management</h1>
//         </div>

//         {view === 'list' && (
//           <ProjectDashboard projects={projects} />
//         )}

//         {view === 'list' && (
//           <ProjectList 
//             projects={projects} 
//             onAddClick={handleAddProject} 
//             onProjectClick={handleViewProject}
//           />
//         )}

//         {view === 'form' && (
//           <ProjectForm 
//             project={selectedProject} 
//             onSave={handleSaveProject} 
//             onCancel={handleBackToList} 
//           />
//         )}

//         {view === 'detail' && selectedProject && (
//           <div className="space-y-6">
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList className="mb-6">
//                 <TabsTrigger value="overview" className="flex items-center gap-2">
//                   <FileText className="w-4 h-4" />
//                   <span>Overview</span>
//                 </TabsTrigger>
//                 <TabsTrigger value="tasks" className="flex items-center gap-2">
//                   <ListTodo className="w-4 h-4" />
//                   <span>Tasks</span>
//                 </TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="overview">
//                 <ProjectDetail 
//                   project={selectedProject} 
//                   onBack={handleBackToList} 
//                   onEdit={handleEditProject} 
//                   onDelete={handleDeleteProject} 
//                 />
//               </TabsContent>
              
//               <TabsContent value="tasks">
//                 <ProjectTaskList 
//                   projectId={selectedProject.id} 
//                   tasks={projectTasks} 
//                 />
//               </TabsContent>
//             </Tabs>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Projects;

import React, { useState, useEffect } from 'react';
import ProjectList from '../../components/ProjectList';
import ProjectForm from '../../components/ProjectForm';
import ProjectDetail from '../../components/ProjectDetail';
import ProjectTaskList from '../../components/ProjectTaskList';
import ProjectDashboard from '../../components/ProjectDashboard';
import { Tab } from '@headlessui/react'; // Import Headless UI Tab
import { ChartPieIcon, ListTodo, FileText, LayoutDashboard } from 'lucide-react';

function Projects() {
  // Sample data - In a real app, this would come from an API
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'HR System Redesign',
      description: 'Complete overhaul of the current HR management system with improved UX/UI and additional features.',
      startDate: '2025-01-15',
      endDate: '2025-06-30',
      status: 'In Progress',
      progress: 35,
      teamSize: 5,
      duration: '5.5 months',
      deadline: '2025-06-30',
      teamMembers: [
        { id: '101', name: 'John Doe', role: 'Project Manager', avatar: null },
        { id: '102', name: 'Jane Smith', role: 'Lead Developer', avatar: null },
      ],
      budget: 45000,
      clientId: '1',
      clientName: 'Internal',
      priority: 'High'
    },
    {
      id: '2',
      name: 'Employee Training Portal',
      description: 'Development of interactive training modules for new employee onboarding.',
      startDate: '2025-02-01',
      endDate: '2025-04-15',
      status: 'In Progress',
      progress: 65,
      teamSize: 3,
      duration: '2.5 months',
      deadline: '2025-04-15',
      teamMembers: [
        { id: '103', name: 'Michael Johnson', role: 'Training Specialist', avatar: null },
        { id: '104', name: 'Emily Williams', role: 'Content Developer', avatar: null },
      ],
      budget: 28000,
      clientId: '1',
      clientName: 'Internal',
      priority: 'Medium'
    },
    {
      id: '3',
      name: 'Payroll System Integration',
      description: 'Integration of the HR system with third-party payroll processing software.',
      startDate: '2024-11-10',
      endDate: '2025-01-20',
      status: 'Completed',
      progress: 100,
      teamSize: 4,
      duration: '2 months',
      deadline: '2025-01-20',
      teamMembers: [
        { id: '105', name: 'Robert Brown', role: 'System Analyst', avatar: null },
        { id: '106', name: 'Sarah Miller', role: 'Finance Specialist', avatar: null },
      ],
      budget: 35000,
      clientId: '2',
      clientName: 'Finance Department',
      priority: 'High'
    }
  ]);

  // Sample tasks
  const [tasks, setTasks] = useState([
    { id: '1', projectId: '1', title: 'Design user interface wireframes', completed: true, dueDate: '2025-02-15', assignee: 'Jane Smith' },
    { id: '2', projectId: '1', title: 'Develop authentication module', completed: false, dueDate: '2025-03-01', assignee: 'John Doe' },
    { id: '3', projectId: '1', title: 'Set up database schema', completed: true, dueDate: '2025-02-10', assignee: 'Jane Smith' },
    { id: '4', projectId: '2', title: 'Create training content outline', completed: true, dueDate: '2025-02-20', assignee: 'Emily Williams' },
    { id: '5', projectId: '2', title: 'Develop interactive quizzes', completed: false, dueDate: '2025-03-10', assignee: 'Michael Johnson' }
  ]);

  const [view, setView] = useState('list'); // 'list', 'form', 'detail'
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // Use index for Headless UI

  // Handle adding a new project
  const handleAddProject = () => {
    setSelectedProject(null);
    setView('form');
  };

  // Handle saving a project (create or update)
  const handleSaveProject = (project) => {
    if (project.id && projects.some(p => p.id === project.id)) {
      setProjects(projects.map(p => p.id === project.id ? project : p));
    } else {
      setProjects([...projects, project]);
    }
    setView('list');
  };

  // Handle editing a project
  const handleEditProject = (project) => {
    setSelectedProject(project);
    setView('form');
  };

  // Handle viewing project details
  const handleViewProject = (project) => {
    setSelectedProject(project);
    setView('detail');
    setActiveTab(0); // Default to first tab (overview)
  };

  // Handle deleting a project
  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
    setView('list');
  };

  // Return to the project list
  const handleBackToList = () => {
    setView('list');
    setSelectedProject(null);
  };

  // Filter tasks for the selected project
  const projectTasks = tasks.filter(task => task.projectId === selectedProject?.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Project Management</h1>
        </div>

        {view === 'list' && (
          <ProjectDashboard projects={projects} />
        )}

        {view === 'list' && (
          <ProjectList 
            projects={projects} 
            onAddClick={handleAddProject} 
            onProjectClick={handleViewProject}
          />
        )}

        {view === 'form' && (
          <ProjectForm 
            project={selectedProject} 
            onSave={handleSaveProject} 
            onCancel={handleBackToList} 
          />
        )}

        {view === 'detail' && selectedProject && (
          <div className="space-y-6">
            <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
              <Tab.List className="mb-6 flex space-x-1 bg-gray-100 p-1 rounded">
                <Tab
                  className={({ selected }) =>
                    `flex items-center gap-2 px-4 py-2 rounded ${
                      selected ? 'bg-white text-gray-800' : 'text-gray-600'
                    } focus:outline-none`
                  }
                >
                  <FileText className="w-4 h-4" />
                  <span>Overview</span>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `flex items-center gap-2 px-4 py-2 rounded ${
                      selected ? 'bg-white text-gray-800' : 'text-gray-600'
                    } focus:outline-none`
                  }
                >
                  <ListTodo className="w-4 h-4" />
                  <span>Tasks</span>
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  <ProjectDetail 
                    project={selectedProject} 
                    onBack={handleBackToList} 
                    onEdit={handleEditProject} 
                    onDelete={handleDeleteProject} 
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <ProjectTaskList 
                    projectId={selectedProject.id} 
                    tasks={projectTasks} 
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;