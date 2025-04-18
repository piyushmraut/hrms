// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';
// import {
//   HomeIcon,
//   ClipboardIcon,
//   InboxIcon,
//   CalendarIcon,
//   FolderIcon,
//   UserGroupIcon,
//   ClockIcon,
//   CurrencyDollarIcon,
//   UserPlusIcon,
//   ChartBarIcon,
//   CogIcon,
//   QuestionMarkCircleIcon,
//   PowerIcon,
// } from '@heroicons/react/24/outline';

// const EmployeeSidebar = () => {
//   const { currentUser, userName } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Read enabled modules from localStorage, default to empty object if none
//   const enabledModules = JSON.parse(localStorage.getItem('enabledModules')) || {};

//   const menuItems = [
//     { name: 'Dashboard', icon: HomeIcon, path: '/employee/dashboard' },
//     { name: 'Tasks', icon: ClipboardIcon, path: '/employee/tasks' },
//     { name: 'Calendar', icon: CalendarIcon, path: '/employee/calendar' },
//     { name: 'Projects', icon: FolderIcon, path: '/employee/projects' },
//     { name: 'Attendance', icon: ClockIcon, path: '/employee/attendance' },
//     { name: 'Payroll', icon: CurrencyDollarIcon, path: '/employee/payroll' },
//     { name: 'Reports', icon: ChartBarIcon, path: '/employee/reports' },
//     { name: 'Employees', icon: UserGroupIcon, path: '/employee/employees' },
//     { name: 'Hiring', icon: UserPlusIcon, path: '/employee/hiring' },
//     { name: 'Help', icon: QuestionMarkCircleIcon, path: '/employee/help' },
//   ];

//   // Filter menu items to show only enabled modules
//   const filteredMenuItems = menuItems.filter((item) => enabledModules[item.name]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate('/');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   return (
//     <div className="w-64 h-screen bg-white shadow-md flex flex-col border-r-2 border-violet-800">
//       {/* Logo */}
//       <div className="p-4 flex items-center">
//         <span className="text-blue-500 text-2xl">+</span>
//         <span className="ml-2 text-black font-bold">Efficio</span>
//       </div>

//       {/* User Profile Section */}
//       <div className="p-4 flex items-center space-x-3 border-b">
//         <img
//           src={currentUser?.photoURL || 'https://th.bing.com/th/id/OIP.mmjVD2F3Bcidm7tmMFalpQHaHa?rs=1&pid=ImgDetMain'}
//           alt="Profile"
//           className="w-10 h-10 rounded-full"
//         />
//         <div>
//           <p className="text-black font-semibold">{userName || 'Employee'}</p>
//           <p className="text-gray-500 text-sm">{currentUser?.email}</p>
//         </div>
//         <span className="ml-auto text-gray-500">▼</span>
//       </div>

//       {/* Menu Items */}
//       <div className="flex-1 overflow-y-auto">
//         <ul className="mt-4">
//           {filteredMenuItems.map((item) => (
//             <li key={item.name}>
//               <Link
//                 to={item.path}
//                 className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
//                   location.pathname === item.path ? 'bg-gray-100 border-l-4 border-blue-500' : ''
//                 }`}
//               >
//                 <item.icon className="w-5 h-5 mr-3 text-gray-500" />
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Logout Button */}
//       <div className="p-4 border-t">
//         <button
//           onClick={handleLogout}
//           className="flex items-center text-gray-700 hover:text-red-500"
//         >
//           <PowerIcon className="w-5 h-5 mr-3 text-gray-500" />
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmployeeSidebar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {
  HomeIcon,
  ClipboardIcon,
  InboxIcon,
  CalendarIcon,
  FolderIcon,
  UserGroupIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  PowerIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';

const EmployeeSidebar = () => {
  const { currentUser, userName } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Read enabled modules from localStorage, default to all true if none
  const defaultModules = {
    Dashboard: true,
    Tasks: true,
    Calendar: true,
    Projects: true,
    Attendance: true,
    Payroll: true,
    Reports: true,
    Employees: true,
    Hiring: true,
    Help: true,
  };
  
  const enabledModules = JSON.parse(localStorage.getItem('enabledModules')) || defaultModules;

  // Group menu items by category
  const menuCategories = [
    {
      name: "Main",
      items: [
        { name: 'Dashboard', icon: HomeIcon, path: '/employee/dashboard' },
        { name: 'Tasks', icon: ClipboardIcon, path: '/employee/tasks' },
        { name: 'Calendar', icon: CalendarIcon, path: '/employee/calendar' },
      ]
    },
    {
      name: "Work",
      items: [
        { name: 'Projects', icon: FolderIcon, path: '/employee/projects' },
        { name: 'Attendance', icon: ClockIcon, path: '/employee/attendance' },
        { name: 'Payroll', icon: CurrencyDollarIcon, path: '/employee/payroll' },
      ]
    },
    {
      name: "Team",
      items: [
        { name: 'Reports', icon: ChartBarIcon, path: '/employee/reports' },
        { name: 'Employees', icon: UserGroupIcon, path: '/employee/employees' },
        { name: 'Hiring', icon: UserPlusIcon, path: '/employee/hiring' },
      ]
    },
    {
      name: "Support",
      items: [
        { name: 'Help', icon: QuestionMarkCircleIcon, path: '/employee/help' },
      ]
    }
  ];

  // Filter menu items to show only enabled modules
  const filteredMenuCategories = menuCategories.map(category => ({
    ...category,
    items: category.items.filter(item => enabledModules[item.name])
  })).filter(category => category.items.length > 0);

  // Expanded sections state
  const [expandedSections, setExpandedSections] = useState(
    Object.fromEntries(filteredMenuCategories.map(cat => [cat.name, true]))
  );

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    // Set initial load animation
    setIsLoaded(true);
  }, []);

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} h-screen flex flex-col transition-all duration-300 relative overflow-hidden`}>
      {/* Glass-like overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900 opacity-95"></div>
      
      {/* Sidebar content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b border-indigo-700 bg-indigo-800 bg-opacity-30 backdrop-blur-sm ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
          <div className="flex items-center">
            <span className="text-cyan-400 text-2xl font-bold">+</span>
            {!collapsed && <span className="ml-2 text-white font-bold">Efficio</span>}
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="p-1 rounded-full bg-indigo-700 bg-opacity-50 hover:bg-indigo-600 text-white transition-all duration-300"
          >
            {collapsed ? 
              <ChevronRightIcon className="w-5 h-5" /> : 
              <ChevronLeftIcon className="w-5 h-5" />
            }
          </button>
        </div>

        {/* User Profile Section */}
        <div className={`p-4 flex items-center space-x-3 border-b border-indigo-700 bg-indigo-800 bg-opacity-20 backdrop-blur-sm ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 delay-100`}>
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-70 blur-sm animate-pulse"></div>
            <img
              src={currentUser?.photoURL || 'https://th.bing.com/th/id/OIP.mmjVD2F3Bcidm7tmMFalpQHaHa?rs=1&pid=ImgDetMain'}
              alt="Profile"
              className="relative w-10 h-10 rounded-full border-2 border-cyan-400"
            />
          </div>
          {!collapsed && (
            <div>
              <p className="text-white font-semibold">{userName || 'Employee'}</p>
              <p className="text-gray-300 text-sm truncate max-w-32">{currentUser?.email}</p>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {filteredMenuCategories.map((category, categoryIndex) => (
            <div key={category.name} className={`mt-2 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} style={{ transitionDelay: `${(categoryIndex + 2) * 100}ms` }}>
              {!collapsed && (
                <div 
                  className="px-4 py-2 text-xs font-semibold text-indigo-300 uppercase flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(category.name)}
                >
                  {category.name}
                  <ChevronRightIcon 
                    className={`w-4 h-4 transition-transform duration-300 ${expandedSections[category.name] ? 'rotate-90' : ''}`} 
                  />
                </div>
              )}
              
              {(expandedSections[category.name] || collapsed) && (
                <ul>
                  {category.items.map((item, itemIndex) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <li 
                        key={item.name}
                        className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}
                        style={{ transitionDelay: `${(categoryIndex * 100) + (itemIndex * 50) + 300}ms` }}
                      >
                        <Link
                          to={item.path}
                          className={`
                            flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 relative
                            hover:bg-indigo-700 hover:bg-opacity-50 
                            ${isActive ? 'bg-gradient-to-r from-indigo-700 to-indigo-600 border-l-4 border-cyan-400' : ''}
                            group transition-all duration-300
                          `}
                        >
                          <div className={`
                            relative p-2 rounded-lg
                            ${isActive ? 'bg-indigo-500 bg-opacity-50' : 'bg-indigo-800 bg-opacity-30'}
                            group-hover:scale-110 group-hover:bg-indigo-600
                            transition-all duration-300
                          `}>
                            <item.icon className={`
                              w-5 h-5 
                              ${isActive ? 'text-cyan-400' : 'text-gray-300'} 
                              group-hover:text-cyan-300
                              transition-all duration-300
                            `} />
                            {/* Glow effect */}
                            <div className={`absolute inset-0 rounded-lg ${isActive ? 'bg-cyan-400' : 'bg-indigo-500'} filter blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                          </div>
                          
                          {!collapsed && (
                            <span className={`
                              ml-3 ${isActive ? 'text-white font-medium' : 'text-gray-300'} 
                              group-hover:text-white transition-colors duration-300
                            `}>
                              {item.name}
                            </span>
                          )}
                          
                          {/* Tooltip for collapsed mode */}
                          {collapsed && (
                            <div className="absolute left-16 w-auto p-2 min-w-max rounded-md shadow-md bg-indigo-800 text-white text-xs font-bold opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 origin-left z-50 transition-all duration-300">
                              {item.name}
                            </div>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className={`p-4 border-t border-indigo-700 bg-indigo-800 bg-opacity-20 backdrop-blur-sm ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 delay-700`}>
          <button
            onClick={handleLogout}
            className={`
              flex items-center ${collapsed ? 'justify-center w-full' : ''} 
              text-gray-300 hover:text-red-400 group relative
              transition-all duration-300
            `}
          >
            <div className="p-2 rounded-lg bg-indigo-800 bg-opacity-50 group-hover:bg-red-500 group-hover:bg-opacity-30 transition-all duration-300 relative">
              <PowerIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-lg bg-red-500 filter blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            {!collapsed && <span className="ml-3">Log Out</span>}
            
            {/* Tooltip for collapsed mode */}
            {collapsed && (
              <div className="absolute left-16 w-auto p-2 min-w-max rounded-md shadow-md bg-indigo-800 text-white text-xs font-bold opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 origin-left z-50 transition-all duration-300">
                Log Out
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSidebar;