

// import React from 'react';

// const StatsOverview = ({ projects, tasks, employees, teams }) => {
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
//             <h3 className="text-gray-500 text-sm font-medium">Teams</h3>
//             <p className="text-2xl font-semibold text-gray-700">{teams.length}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatsOverview;

// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';

// const StatsOverview = ({ projects, tasks, employees, teams }) => {
//   const completedProjects = projects.filter(p => p.status === 'Completed').length;
//   const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;
//   const notStartedProjects = projects.filter(p => p.status === 'Not Started').length;

//   const completedTasks = tasks.filter(t => t.status === 'Completed').length;
//   const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
//   const notStartedTasks = tasks.filter(t => t.status === 'Not Started').length;

//   const highPriorityTasks = tasks.filter(t => t.priority === 'High' || t.priority === 'Critical').length;

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: i => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     })
//   };

//   const iconVariants = {
//     initial: { scale: 0 },
//     animate: { 
//       scale: 1,
//       transition: { 
//         type: "spring",
//         stiffness: 260,
//         damping: 20,
//         delay: 0.2
//       }
//     }
//   };

//   const numberVariants = {
//     initial: { opacity: 0 },
//     animate: { 
//       opacity: 1,
//       transition: { duration: 0.5, delay: 0.3 }
//     }
//   };

//   const statCards = [
//     {
//       title: "Total Projects",
//       value: projects.length,
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
//         </svg>
//       ),
//       bgColor: "bg-gradient-to-br from-blue-500 to-indigo-600",
//       iconBg: "bg-white/20",
//       textColor: "text-white"
//     },
//     {
//       title: "Completed Projects",
//       value: completedProjects,
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//         </svg>
//       ),
//       bgColor: "bg-gradient-to-br from-emerald-500 to-green-600",
//       iconBg: "bg-white/20",
//       textColor: "text-white"
//     },
//     {
//       title: "In Progress Projects",
//       value: inProgressProjects,
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//         </svg>
//       ),
//       bgColor: "bg-gradient-to-br from-amber-400 to-yellow-500",
//       iconBg: "bg-white/20",
//       textColor: "text-white"
//     },
//     {
//       title: "High Priority Tasks",
//       value: highPriorityTasks,
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
//         </svg>
//       ),
//       bgColor: "bg-gradient-to-br from-rose-500 to-red-600",
//       iconBg: "bg-white/20",
//       textColor: "text-white"
//     },
//     {
//       title: "Team Members",
//       value: employees.length,
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
//         </svg>
//       ),
//       bgColor: "bg-gradient-to-br from-violet-500 to-purple-600",
//       iconBg: "bg-white/20",
//       textColor: "text-white"
//     },
//     {
//       title: "Total Tasks",
//       value: tasks.length,
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
//         </svg>
//       ),
//       bgColor: "bg-gradient-to-br from-fuchsia-500 to-pink-600",
//       iconBg: "bg-white/20",
//       textColor: "text-white"
//     },
//     {
//       title: "Completed Tasks",
//       value: completedTasks,
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//         </svg>
//       ),
//       bgColor: "bg-gradient-to-br from-cyan-500 to-blue-600",
//       iconBg: "bg-white/20",
//       textColor: "text-white"
//     },
//     {
//       title: "Teams",
//       value: teams.length,
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//         </svg>
//       ),
//       bgColor: "bg-gradient-to-br from-teal-500 to-emerald-600",
//       iconBg: "bg-white/20",
//       textColor: "text-white"
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//       {statCards.map((card, index) => (
//         <motion.div
//           key={index}
//           custom={index}
//           initial="hidden"
//           animate="visible"
//           variants={cardVariants}
//           className={`${card.bgColor} shadow-lg rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
//         >
//           <div className="flex items-center">
//             <motion.div 
//               className={`p-3 rounded-full ${card.iconBg} ${card.textColor}`}
//               variants={iconVariants}
//               initial="initial"
//               animate="animate"
//             >
//               {card.icon}
//             </motion.div>
//             <div className="ml-5">
//               <h3 className={`${card.textColor} text-sm font-medium opacity-90`}>{card.title}</h3>
//               <motion.p 
//                 className={`text-3xl font-bold ${card.textColor}`}
//                 variants={numberVariants}
//                 initial="initial"
//                 animate="animate"
//               >
//                 {card.value}
//               </motion.p>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default StatsOverview;

import React, { useState, useEffect } from 'react';

const StatsOverview = ({ projects, tasks, employees, teams }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;
  const notStartedProjects = projects.filter(p => p.status === 'Not Started').length;

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const notStartedTasks = tasks.filter(t => t.status === 'Not Started').length;

  const highPriorityTasks = tasks.filter(t => t.priority === 'High' || t.priority === 'Critical').length;

  // Card style with gradient backgrounds and improved shadows
  const cards = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: (
        <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      ),
      bgGradient: "from-blue-100 to-blue-150",
      iconBg: "bg-blue-200",
      iconColor: "text-blue-600",
      borderColor: "border-blue-500"
    },
    {
      title: "Completed Projects",
      value: completedProjects,
      icon: (
        <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      bgGradient: "from-green-100 to-green-150",
      iconBg: "bg-green-200",
      iconColor: "text-green-600",
      borderColor: "border-green-500"
    },
    {
      title: "In Progress Projects",
      value: inProgressProjects,
      icon: (
        <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      bgGradient: "from-yellow-100 to-yellow-150",
      iconBg: "bg-yellow-200",
      iconColor: "text-yellow-600",
      borderColor: "border-yellow-500"
    },
    {
      title: "High Priority Tasks",
      value: highPriorityTasks,
      icon: (
        <svg className="w-8 h-8 animate-ping" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      ),
      bgGradient: "from-red-100 to-red-150",
      iconBg: "bg-red-200",
      iconColor: "text-red-600",
      borderColor: "border-red-500"
    },
    {
      title: "Team Members",
      value: employees.length,
      icon: (
        <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      bgGradient: "from-indigo-100 to-indigo-150",
      iconBg: "bg-indigo-200",
      iconColor: "text-indigo-600",
      borderColor: "border-indigo-500"
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: (
        <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      ),
      bgGradient: "from-purple-100 to-purple-150",
      iconBg: "bg-purple-200",
      iconColor: "text-purple-600",
      borderColor: "border-purple-500"
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: (
        <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      bgGradient: "from-pink-100 to-pink-150",
      iconBg: "bg-pink-200",
      iconColor: "text-pink-600",
      borderColor: "border-pink-500"
    },
    {
      title: "Teams",
      value: teams.length,
      icon: (
        <svg className="w-8 h-8 animate-spin slow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
      bgGradient: "from-orange-100 to-orange-150",
      iconBg: "bg-orange-200",
      iconColor: "text-orange-600",
      borderColor: "border-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <div 
          key={index}
          className={`
            rounded-xl p-6 border transform transition-all duration-500
            hover:shadow-lg hover:scale-105 cursor-pointer
            bg-gradient-to-br ${card.bgGradient} border ${card.borderColor}
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
          style={{ 
            transitionDelay: `${index * 100}ms`,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)"
          }}
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${card.iconBg} ${card.iconColor}`}>
              {card.icon}
            </div>
            <div className="ml-5">
              <h3 className="text-gray-600 text-sm font-medium">{card.title}</h3>
              <div className="flex items-end">
                <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                {/* <span className="text-xs ml-2 text-gray-500">{Math.round(Math.random() * 20) - 10}% from last week</span> */}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1 w-full bg-gray-200 rounded-full">
              <div 
                className={`h-1 rounded-full ${card.iconBg}`} 
                style={{ 
                  width: `${Math.min(100, Math.max(15, card.value * 5))}%`,
                  transition: "width 1s ease-in-out"
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Adding a custom animation class
const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin.slow {
    animation: spin-slow 3s linear infinite;
  }
`;
document.head.appendChild(style);

export default StatsOverview;