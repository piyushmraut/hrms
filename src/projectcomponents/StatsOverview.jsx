// import React from 'react';

// const StatsOverview = ({ projects, tasks, employees }) => {
//   const completedProjects = projects.filter(p => p.status === 'Completed').length;
//   const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;
//   const notStartedProjects = projects.filter(p => p.status === 'Not Started').length;

//   const completedTasks = tasks.filter(t => t.status === 'Completed').length;
//   const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
//   const notStartedTasks = tasks.filter(t => t.status === 'Not Started').length;

//   const highPriorityTasks = tasks.filter(t => t.priority === 'High' || t.priority === 'Critical').length;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex items-center">
//           <div className="p-3 rounded-full bg-blue-100 text-blue-600">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
//             </svg>
//           </div>
//           <div className="ml-5">
//             <h3 className="text-gray-500 text-sm font-medium">Total Projects</h3>
//             <p className="text-2xl font-semibold text-gray-700">{projects.length}</p>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex items-center">
//           <div className="p-3 rounded-full bg-green-100 text-green-600">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//             </svg>
//           </div>
//           <div className="ml-5">
//             <h3 className="text-gray-500 text-sm font-medium">Completed Projects</h3>
//             <p className="text-2xl font-semibold text-gray-700">{completedProjects}</p>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex items-center">
//           <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//             </svg>
//           </div>
//           <div className="ml-5">
//             <h3 className="text-gray-500 text-sm font-medium">In Progress Projects</h3>
//             <p className="text-2xl font-semibold text-gray-700">{inProgressProjects}</p>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex items-center">
//           <div className="p-3 rounded-full bg-red-100 text-red-600">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
//             </svg>
//           </div>
//           <div className="ml-5">
//             <h3 className="text-gray-500 text-sm font-medium">High Priority Tasks</h3>
//             <p className="text-2xl font-semibold text-gray-700">{highPriorityTasks}</p>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex items-center">
//           <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
//             </svg>
//           </div>
//           <div className="ml-5">
//             <h3 className="text-gray-500 text-sm font-medium">Team Members</h3>
//             <p className="text-2xl font-semibold text-gray-700">{employees.length}</p>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex items-center">
//           <div className="p-3 rounded-full bg-purple-100 text-purple-600">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
//             </svg>
//           </div>
//           <div className="ml-5">
//             <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
//             <p className="text-2xl font-semibold text-gray-700">{tasks.length}</p>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex items-center">
//           <div className="p-3 rounded-full bg-pink-100 text-pink-600">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//             </svg>
//           </div>
//           <div className="ml-5">
//             <h3 className="text-gray-500 text-sm font-medium">Completed Tasks</h3>
//             <p className="text-2xl font-semibold text-gray-700">{completedTasks}</p>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex items-center">
//           <div className="p-3 rounded-full bg-gray-100 text-gray-600">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//             </svg>
//           </div>
//           <div className="ml-5">
//             <h3 className="text-gray-500 text-sm font-medium">Not Started Tasks</h3>
//             <p className="text-2xl font-semibold text-gray-700">{notStartedTasks}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatsOverview;

import React from 'react';

const StatsOverview = ({ projects, tasks, employees, teams }) => {
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;
  const notStartedProjects = projects.filter(p => p.status === 'Not Started').length;

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const notStartedTasks = tasks.filter(t => t.status === 'Not Started').length;

  const highPriorityTasks = tasks.filter(t => t.priority === 'High' || t.priority === 'Critical').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <div className="ml-5">
            <h3 className="text-gray-500 text-sm font-medium">Total Projects</h3>
            <p className="text-2xl font-semibold text-gray-700">{projects.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="ml-5">
            <h3 className="text-gray-500 text-sm font-medium">Completed Projects</h3>
            <p className="text-2xl font-semibold text-gray-700">{completedProjects}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="ml-5">
            <h3 className="text-gray-500 text-sm font-medium">In Progress Projects</h3>
            <p className="text-2xl font-semibold text-gray-700">{inProgressProjects}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-red-100 text-red-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <div className="ml-5">
            <h3 className="text-gray-500 text-sm font-medium">High Priority Tasks</h3>
            <p className="text-2xl font-semibold text-gray-700">{highPriorityTasks}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div className="ml-5">
            <h3 className="text-gray-500 text-sm font-medium">Team Members</h3>
            <p className="text-2xl font-semibold text-gray-700">{employees.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <div className="ml-5">
            <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
            <p className="text-2xl font-semibold text-gray-700">{tasks.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-pink-100 text-pink-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="ml-5">
            <h3 className="text-gray-500 text-sm font-medium">Completed Tasks</h3>
            <p className="text-2xl font-semibold text-gray-700">{completedTasks}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-gray-100 text-gray-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div className="ml-5">
            <h3 className="text-gray-500 text-sm font-medium">Teams</h3>
            <p className="text-2xl font-semibold text-gray-700">{teams.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;