// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // This should now work
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
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
// } from "@heroicons/react/24/outline";

// const Sidebar = () => {
//   const { currentUser, userName } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   const menuItems = [
//     {
//       category: "Main Menu",
//       items: [
//         { name: "Dashboard", icon: HomeIcon, path: "/admin/dashboard" },
//         { name: "Tasks", icon: ClipboardIcon, path: "/admin/tasks" },
//         { name: "Inbox", icon: InboxIcon, path: "/admin/inbox" },
//         { name: "Calendar", icon: CalendarIcon, path: "/admin/calendar" },
//         { name: "Projects", icon: FolderIcon, path: "/admin/projects" },
//       ],
//     },
//     {
//       category: "HR Management",
//       items: [
//         { name: "Employees", icon: UserGroupIcon, path: "/admin/employees" },
//         { name: "Attendance", icon: ClockIcon, path: "/admin/attendance" },
//         { name: "Payroll", icon: CurrencyDollarIcon, path: "/admin/payroll" },
//         { name: "Hiring", icon: UserPlusIcon, path: "/admin/hiring" },
//       ],
//     },
//     {
//       category: "Analytics & Reports",
//       items: [
//         { name: "Reports", icon: ChartBarIcon, path: "/admin/reports" },
//       ],
//     },
//     {
//       category: "Additional",
//       items: [
//         { name: "Settings", icon: CogIcon, path: "/admin/settings" },
//         { name: "Help & Support", icon: QuestionMarkCircleIcon, path: "/admin/help" },
//       ],
//     },
//   ];

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
//           src={currentUser?.photoURL || "https://th.bing.com/th/id/OIP.mmjVD2F3Bcidm7tmMFalpQHaHa?rs=1&pid=ImgDetMain"}
//           alt="Profile"
//           className="w-10 h-10 rounded-full"
//         />
//         <div>
//           <p className="text-black font-semibold">{userName || "Admin"}</p>
//           <p className="text-gray-500 text-sm">{currentUser?.email}</p>
//         </div>
//         <span className="ml-auto text-gray-500">▼</span>
//       </div>

//       {/* Menu Items */}
//       <div className="flex-1 overflow-y-auto">
//         {menuItems.map((section, index) => (
//           <div key={index} className="mt-4">
//             <h3 className="px-4 text-gray-500 text-xs font-semibold uppercase">
//               {section.category}
//             </h3>
//             <ul className="mt-2">
//               {section.items.map((item) => (
//                 <li key={item.name}>
//                   <Link
//                     to={item.path}
//                     className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
//                       location.pathname === item.path
//                         ? "bg-gray-100 border-l-4 border-blue-500"
//                         : ""
//                     }`}
//                   >
//                     <item.icon className="w-5 h-5 mr-3 text-gray-500" />
//                     {item.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
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


import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
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
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const { currentUser, userName } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);

  useEffect(() => {
    setLoaded(true);
    // Auto-expand the section containing the current path
    menuItems.forEach((section, index) => {
      section.items.forEach(item => {
        if (location.pathname === item.path) {
          setExpandedSection(index);
        }
      });
    });
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    {
      category: "Main Menu",
      items: [
        { name: "Dashboard", icon: HomeIcon, path: "/admin/dashboard" },
        { name: "Tasks", icon: ClipboardIcon, path: "/admin/tasks" },
        { name: "Inbox", icon: InboxIcon, path: "/admin/inbox" },
        { name: "Calendar", icon: CalendarIcon, path: "/admin/calendar" },
        { name: "Projects", icon: FolderIcon, path: "/admin/projects" },
      ],
    },
    {
      category: "HR Management",
      items: [
        { name: "Employees", icon: UserGroupIcon, path: "/admin/employees" },
        { name: "Attendance", icon: ClockIcon, path: "/admin/attendance" },
        { name: "Payroll", icon: CurrencyDollarIcon, path: "/admin/payroll" },
        { name: "Hiring", icon: UserPlusIcon, path: "/admin/hiring" },
      ],
    },
    {
      category: "Analytics & Reports",
      items: [
        { name: "Reports", icon: ChartBarIcon, path: "/admin/reports" },
      ],
    },
    {
      category: "Additional",
      items: [
        { name: "Settings", icon: CogIcon, path: "/admin/settings" },
        { name: "Help & Support", icon: QuestionMarkCircleIcon, path: "/admin/help" },
      ],
    },
  ];

  return (
    <div 
      className={`h-screen bg-gradient-to-b from-indigo-900 to-purple-900 shadow-xl flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Toggle button */}
      <button 
        className="absolute -right-3 top-12 w-6 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-r-md flex items-center justify-center cursor-pointer shadow-md z-10 transition-transform hover:scale-105"
        onClick={toggleSidebar}
      >
        <svg 
          className={`w-4 h-4 text-white transform transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Logo */}
      <div className={`p-4 flex items-center justify-center ${isCollapsed ? 'justify-center' : 'justify-start'} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-center bg-white bg-opacity-20 rounded-xl p-2 backdrop-blur-sm transition-all duration-300 hover:scale-105">
          <span className="text-cyan-300 text-2xl font-bold">+</span>
          {!isCollapsed && <span className="ml-2 text-white font-bold transition-all duration-300">Efficio</span>}
        </div>
      </div>

      {/* User Profile Section */}
      <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} space-x-3 border-b border-indigo-800/50 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '100ms' }}>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img
            src={currentUser?.photoURL || "https://th.bing.com/th/id/OIP.mmjVD2F3Bcidm7tmMFalpQHaHa?rs=1&pid=ImgDetMain"}
            alt="Profile"
            className="relative w-10 h-10 rounded-full border-2 border-white/50 transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        {!isCollapsed && (
          <>
            <div className="transition-opacity duration-300">
              <p className="text-white font-semibold">{userName || "Admin"}</p>
              <p className="text-indigo-200 text-xs">{currentUser?.email}</p>
            </div>
            <span className="ml-auto text-indigo-200 transition-transform duration-300 hover:rotate-180 cursor-pointer">▼</span>
          </>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((section, index) => (
          <div key={index} className={`mt-4 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${200 + index * 100}ms` }}>
            {!isCollapsed && (
              <h3 
                className="px-4 text-indigo-300 text-xs font-semibold uppercase tracking-wider cursor-pointer flex items-center"
                onClick={() => toggleSection(index)}
              >
                <span>{section.category}</span>
                <svg 
                  className={`ml-auto w-4 h-4 transform transition-transform duration-300 ${expandedSection === index ? 'rotate-180' : 'rotate-0'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
            )}
            
            <ul className={`mt-2 transition-all duration-300 overflow-hidden ${
              expandedSection === index || isCollapsed ? 'max-h-96' : 'max-h-0'
            } ${isCollapsed ? 'space-y-2' : ''}`}>
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li 
                    key={item.name}
                    onMouseEnter={() => setHoverItem(item.name)}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Link
                      to={item.path}
                      className={`group flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} px-4 py-3 hover:bg-white/10 transition-all duration-300 relative overflow-hidden ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-l-4 border-cyan-400' 
                          : 'border-l-4 border-transparent'
                      }`}
                    >
                      {/* Background hover effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 transform transition-transform duration-500 ${hoverItem === item.name ? 'scale-x-100' : 'scale-x-0'} origin-left`}></div>
                      
                      {/* Icon with animated background */}
                      <div className={`relative flex items-center justify-center ${isActive ? 'text-cyan-300' : 'text-indigo-300'} group-hover:text-cyan-300 transition-all duration-300`}>
                        <div className={`absolute inset-0 rounded-full bg-white/5 transform transition-transform duration-300 ${hoverItem === item.name ? 'scale-100' : 'scale-0'}`}></div>
                        <item.icon className={`w-5 h-5 z-10 transform transition-transform duration-300 ${hoverItem === item.name ? 'scale-110' : 'scale-100'}`} />
                      </div>
                      
                      {/* Text label */}
                      {!isCollapsed && (
                        <span className={`ml-3 whitespace-nowrap ${isActive ? 'text-white' : 'text-indigo-200'} group-hover:text-white transition-all duration-300 relative z-10`}>
                          {item.name}
                        </span>
                      )}
                      
                      {/* Active indicator dot */}
                      {isCollapsed && isActive && (
                        <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      )}
                      
                      {/* Tooltip for collapsed mode */}
                      {isCollapsed && (
                        <div className={`absolute left-full ml-2 whitespace-nowrap bg-indigo-900 text-white text-sm py-1 px-2 rounded shadow-lg transform transition-all duration-300 ${
                          hoverItem === item.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                        }`}>
                          {item.name}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className={`p-4 border-t border-indigo-800/50 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
        <button
          onClick={handleLogout}
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} text-indigo-200 hover:text-red-400 transition-all duration-300 w-full py-2 px-3 rounded-lg group hover:bg-white/5`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full transform scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <PowerIcon className="w-5 h-5 relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
          </div>
          {!isCollapsed && <span className="ml-3">Log Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;