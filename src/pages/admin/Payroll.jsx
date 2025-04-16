

// import React, { useState } from 'react';
// import { FiHome, FiDollarSign, FiUsers, FiFileText, FiSettings, FiPieChart } from 'react-icons/fi';
// import EmployeeSalaryManagement from '../../components/EmployeeSalaryManagement';
// import ProcessPayroll from '../../components/ProcessPayroll';
// import PayslipGenerator from '../../components/PayslipGenerator';
// import PayrollReports from '../../components/PayrollReports';
// import TaxSettings from '../../components/TaxSettings';
// import PayrollDashboard from '../../components/PayrollDashboard';

// const Payroll = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const tabs = [
//     { id: 'dashboard', label: 'Dashboard', icon: FiHome },
//     { id: 'salary', label: 'Employee Salaries', icon: FiUsers },
//     { id: 'process', label: 'Process Payroll', icon: FiDollarSign },
//     { id: 'payslips', label: 'Payslips', icon: FiFileText },
//     { id: 'reports', label: 'Reports', icon: FiPieChart },
//     { id: 'tax', label: 'Tax Settings', icon: FiSettings },
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <PayrollDashboard />;
//       case 'salary':
//         return <EmployeeSalaryManagement />;
//       case 'process':
//         return <ProcessPayroll />;
//       case 'payslips':
//         return <PayslipGenerator />;
//       case 'reports':
//         return <PayrollReports />;
//       case 'tax':
//         return <TaxSettings />;
//       default:
//         return <PayrollDashboard />;
//     }
//   };

//   return (
//     <div className="h-screen bg-gray-50 flex flex-col">
//       <header className="bg-white shadow-md">
//         <div className="p-4 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-gray-800">Payroll Module</h2>
//           <nav className="flex space-x-4">
//             {tabs.map(tab => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-4 py-2 flex items-center text-gray-600 hover:text-blue-600 ${
//                   activeTab === tab.id ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50' : ''
//                 }`}
//               >
//                 <tab.icon className="mr-2" />
//                 {tab.label}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </header>
//       <main className="flex-1 overflow-auto p-8">
//         {renderTabContent()}
//       </main>
//     </div>
//   );
// };

// export default Payroll;

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   HomeIcon, 
//   BanknotesIcon, 
//   UsersIcon, 
//   DocumentTextIcon, 
//   CogIcon, 
//   ChartPieIcon,
//   BellIcon,
//   MagnifyingGlassIcon,
//   UserCircleIcon
// } from '@heroicons/react/24/outline';
// import EmployeeSalaryManagement from '../../components/EmployeeSalaryManagement';
// import ProcessPayroll from '../../components/ProcessPayroll';
// import PayslipGenerator from '../../components/PayslipGenerator';
// import PayrollReports from '../../components/PayrollReports';
// import TaxSettings from '../../components/TaxSettings';
// import PayrollDashboard from '../../components/PayrollDashboard';

// const Payroll = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const tabs = [
//     { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, color: 'from-purple-500 to-indigo-600' },
//     { id: 'salary', label: 'Employee Salaries', icon: UsersIcon, color: 'from-blue-500 to-cyan-500' },
//     { id: 'process', label: 'Process Payroll', icon: BanknotesIcon, color: 'from-emerald-500 to-teal-500' },
//     { id: 'payslips', label: 'Payslips', icon: DocumentTextIcon, color: 'from-orange-500 to-amber-500' },
//     { id: 'reports', label: 'Reports', icon: ChartPieIcon, color: 'from-red-500 to-pink-500' },
//     { id: 'tax', label: 'Tax Settings', icon: CogIcon, color: 'from-gray-600 to-gray-700' },
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'dashboard': return <PayrollDashboard />;
//       case 'salary': return <EmployeeSalaryManagement />;
//       case 'process': return <ProcessPayroll />;
//       case 'payslips': return <PayslipGenerator />;
//       case 'reports': return <PayrollReports />;
//       case 'tax': return <TaxSettings />;
//       default: return <PayrollDashboard />;
//     }
//   };

//   // Enhanced animation variants
//   const iconVariants = {
//     hover: { 
//       scale: 1.15,
//       rotate: 5,
//       transition: { type: "spring", stiffness: 400, damping: 10 }
//     }
//   };
  
//   const contentVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.5,
//         ease: "easeOut" 
//       }
//     }
//   };

//   const pageTransition = {
//     initial: { opacity: 0, x: 20 },
//     animate: { 
//       opacity: 1, 
//       x: 0,
//       transition: {
//         duration: 0.4,
//         ease: "easeInOut"
//       }
//     },
//     exit: { opacity: 0, x: -20 }
//   };

//   return (
//     <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col">
//       {/* Enhanced Header */}
//       <header className="bg-white shadow-md">
//         <div className="max-w-9xl mx-auto">
//           <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//             <div className="flex items-center space-x-3">
//               <motion.div 
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-gradient-to-r from-indigo-600 to-blue-500 p-2 rounded-lg shadow-lg"
//               >
//                 <BanknotesIcon className="h-6 w-6 text-white" />
//               </motion.div>
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent">
//                 Payroll Module
//               </h2>
//             </div>
            
//             <div className="flex items-center space-x-6">
//               {/* Search Bar */}
//               <div className="relative hidden md:block">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
//                 </div>
//                 <input
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   type="text"
//                   placeholder="Search..."
//                 />
//               </div>
              
//               {/* Notifications */}
//               <motion.div 
//                 whileHover={{ scale: 1.1 }}
//                 className="relative"
//               >
//                 <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors duration-300">
//                   <BellIcon className="h-6 w-6" />
//                   <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
//                 </button>
//               </motion.div>
              
//               {/* User Profile */}
//               <motion.div 
//                 whileHover={{ scale: 1.05 }}
//                 className="flex items-center space-x-2 cursor-pointer"
//               >
//                 <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full p-0.5">
//                   <div className="bg-white rounded-full p-0.5">
//                     <UserCircleIcon className="h-8 w-8 text-indigo-600" />
//                   </div>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 hidden md:block">Admin</span>
//               </motion.div>
//             </div>
//           </div>
          
//           {/* Enhanced Navigation */}
//           <nav className="flex px-4 sm:px-6 lg:px-8 border-t border-gray-100 overflow-x-auto bg-white/90 backdrop-blur-sm">
//             {tabs.map(tab => (
//               <motion.button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-5 py-3 flex items-center text-sm font-medium transition-all duration-300 ${
//                   activeTab === tab.id 
//                     ? 'border-b-2 border-indigo-500 text-indigo-600' 
//                     : 'text-gray-500 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
//                 }`}
//                 whileHover={{ y: -1 }}
//               >
//                 <motion.div 
//                   className={`mr-2 rounded-full p-1.5 ${
//                     activeTab === tab.id 
//                       ? `bg-gradient-to-r ${tab.color} shadow-md` 
//                       : 'bg-gray-100'
//                   }`}
//                   whileHover="hover"
//                   variants={iconVariants}
//                 >
//                   <tab.icon 
//                     className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-500'}`} 
//                   />
//                 </motion.div>
//                 {tab.label}
//               </motion.button>
//             ))}
//           </nav>
//         </div>
//       </header>
      
//       {/* Enhanced Main Content */}
//       <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-slate-50 to-slate-200">
//         <div className="max-w-9xl mx-auto">
//           <motion.div 
//             key={activeTab}
//             variants={pageTransition}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100"
//           >
//             <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-100">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {tabs.find(tab => tab.id === activeTab)?.label}
//               </h3>
//             </div>
            
//             <motion.div 
//               variants={contentVariants}
//               initial="hidden"
//               animate="visible"
//               className="p-6"
//             >
//               {renderTabContent()}
//             </motion.div>
//           </motion.div>
//         </div>
//       </main>
      
//       {/* Enhanced Footer */}
//       <footer className="bg-white border-t border-gray-200 py-4">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-sm text-gray-500 mb-2 md:mb-0">
//               © 2025 Payroll Management System. All rights reserved.
//             </p>
//             <div className="flex space-x-4 text-xs text-gray-400">
//               <a href="#" className="hover:text-indigo-600 transition-colors duration-300">Privacy Policy</a>
//               <a href="#" className="hover:text-indigo-600 transition-colors duration-300">Terms of Service</a>
//               <a href="#" className="hover:text-indigo-600 transition-colors duration-300">Support</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Payroll;

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   HomeIcon, 
//   BanknotesIcon, 
//   UsersIcon, 
//   DocumentTextIcon, 
//   CogIcon, 
//   ChartPieIcon,
//   BellIcon,
//   MagnifyingGlassIcon,
//   UserCircleIcon
// } from '@heroicons/react/24/outline';
// import EmployeeSalaryManagement from '../../components/EmployeeSalaryManagement';
// import ProcessPayroll from '../../components/ProcessPayroll';
// import PayslipGenerator from '../../components/PayslipGenerator';
// import PayrollReports from '../../components/PayrollReports';
// import TaxSettings from '../../components/TaxSettings';
// import PayrollDashboard from '../../components/PayrollDashboard';

// const Payroll = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const tabs = [
//     { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, color: 'from-purple-500 to-indigo-600' },
//     { id: 'salary', label: 'Employee Salaries', icon: UsersIcon, color: 'from-blue-500 to-cyan-500' },
//     { id: 'process', label: 'Process Payroll', icon: BanknotesIcon, color: 'from-emerald-500 to-teal-500' },
//     { id: 'payslips', label: 'Payslips', icon: DocumentTextIcon, color: 'from-orange-500 to-amber-500' },
//     { id: 'reports', label: 'Reports', icon: ChartPieIcon, color: 'from-red-500 to-pink-500' },
//     { id: 'tax', label: 'Tax Settings', icon: CogIcon, color: 'from-gray-600 to-gray-700' },
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'dashboard': return <PayrollDashboard />;
//       case 'salary': return <EmployeeSalaryManagement />;
//       case 'process': return <ProcessPayroll />;
//       case 'payslips': return <PayslipGenerator />;
//       case 'reports': return <PayrollReports />;
//       case 'tax': return <TaxSettings />;
//       default: return <PayrollDashboard />;
//     }
//   };

//   const iconVariants = {
//     hover: { 
//       scale: 1.15,
//       rotate: 5,
//       transition: { type: "spring", stiffness: 400, damping: 10 }
//     }
//   };
  
//   const contentVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.5,
//         ease: "easeOut" 
//       }
//     }
//   };

//   const pageTransition = {
//     initial: { opacity: 0, x: 20 },
//     animate: { 
//       opacity: 1, 
//       x: 0,
//       transition: {
//         duration: 0.4,
//         ease: "easeInOut"
//       }
//     },
//     exit: { opacity: 0, x: -20 }
//   };

//   return (
//     <div className="h-screen flex flex-col overflow-auto">
//       {/* Header */}
//       <header className="bg-white shadow-md">
//         <div className="max-w-9xl mx-auto">
//           <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//             <div className="flex items-center space-x-3">
//               <motion.div 
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-gradient-to-r from-indigo-600 to-blue-500 p-2 rounded-lg shadow-lg"
//               >
//                 <BanknotesIcon className="h-6 w-6 text-white" />
//               </motion.div>
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent">
//                 Payroll Module
//               </h2>
//             </div>
            
//             <div className="flex items-center space-x-6">
//               <div className="relative hidden md:block">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
//                 </div>
//                 <input
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   type="text"
//                   placeholder="Search..."
//                 />
//               </div>
              
//               <motion.div 
//                 whileHover={{ scale: 1.1 }}
//                 className="relative"
//               >
//                 <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors duration-300">
//                   <BellIcon className="h-6 w-6" />
//                   <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
//                 </button>
//               </motion.div>
              
//               <motion.div 
//                 whileHover={{ scale: 1.05 }}
//                 className="flex items-center space-x-2 cursor-pointer"
//               >
//                 <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full p-0.5">
//                   <div className="bg-white rounded-full p-0.5">
//                     <UserCircleIcon className="h-8 w-8 text-indigo-600" />
//                   </div>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 hidden md:block">Admin</span>
//               </motion.div>
//             </div>
//           </div>
          
//           <nav className="flex px-4 sm:px-6 lg:px-8 border-t border-gray-100 overflow-x-auto bg-white/90 backdrop-blur-sm">
//             {tabs.map(tab => (
//               <motion.button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-5 py-3 flex items-center text-sm font-medium transition-all duration-300 ${
//                   activeTab === tab.id 
//                     ? 'border-b-2 border-indigo-500 text-indigo-600' 
//                     : 'text-gray-500 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
//                 }`}
//                 whileHover={{ y: -1 }}
//               >
//                 <motion.div 
//                   className={`mr-2 rounded-full p-1.5 ${
//                     activeTab === tab.id 
//                       ? `bg-gradient-to-r ${tab.color} shadow-md` 
//                       : 'bg-gray-100'
//                   }`}
//                   whileHover="hover"
//                   variants={iconVariants}
//                 >
//                   <tab.icon 
//                     className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-500'}`} 
//                   />
//                 </motion.div>
//                 {tab.label}
//               </motion.button>
//             ))}
//           </nav>
//         </div>
//       </header>
      
//       {/* Main Content */}
//       <main className="flex-1 min-h-0 p-6 bg-gradient-to-br from-slate-50 to-slate-200">
//         <div className="max-w-9xl mx-auto h-full">
//           <motion.div 
//             key={activeTab}
//             variants={pageTransition}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 h-full"
//           >
            
            
//             <motion.div 
//               variants={contentVariants}
//               initial="hidden"
//               animate="visible"
//               className="p-6 overflow-auto h-[calc(100%-72px)]" // Adjust height to account for header
//             >
//               {renderTabContent()}
//             </motion.div>
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Payroll;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  BanknotesIcon, 
  UsersIcon, 
  DocumentTextIcon, 
  CogIcon, 
  ChartPieIcon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import EmployeeSalaryManagement from '../../components/EmployeeSalaryManagement';
import ProcessPayroll from '../../components/ProcessPayroll';
import PayslipGenerator from '../../components/PayslipGenerator';
import PayrollReports from '../../components/PayrollReports';
import TaxSettings from '../../components/TaxSettings';
import PayrollDashboard from '../../components/PayrollDashboard';

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, color: 'from-purple-500 to-indigo-600' },
    { id: 'salary', label: 'Employee Salaries', icon: UsersIcon, color: 'from-blue-500 to-cyan-500' },
    { id: 'process', label: 'Process Payroll', icon: BanknotesIcon, color: 'from-emerald-500 to-teal-500' },
    { id: 'payslips', label: 'Payslips', icon: DocumentTextIcon, color: 'from-orange-500 to-amber-500' },
    { id: 'reports', label: 'Reports', icon: ChartPieIcon, color: 'from-red-500 to-pink-500' },
    { id: 'tax', label: 'Tax Settings', icon: CogIcon, color: 'from-gray-600 to-gray-700' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <PayrollDashboard />;
      case 'salary': return <EmployeeSalaryManagement />;
      case 'process': return <ProcessPayroll />;
      case 'payslips': return <PayslipGenerator />;
      case 'reports': return <PayrollReports />;
      case 'tax': return <TaxSettings />;
      default: return <PayrollDashboard />;
    }
  };

  // Enhanced animation variants
  const iconVariants = {
    hover: { 
      scale: 1.15,
      rotate: 5,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  const pageTransition = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col">
      {/* Enhanced Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-9xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-indigo-600 to-blue-500 p-2 rounded-lg shadow-lg"
              >
                <BanknotesIcon className="h-6 w-6 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent">
                Payroll Management
              </h2>
            </div>
            <nav className="flex px-4 sm:px-6 lg:px-8 border-t border-gray-100 overflow-x-auto bg-white/90 backdrop-blur-sm">
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 flex items-center text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
                }`}
                whileHover={{ y: -1 }}
              >
                <motion.div 
                  className={`mr-2 rounded-full p-1.5 ${
                    activeTab === tab.id 
                      ? `bg-gradient-to-r ${tab.color} shadow-md` 
                      : 'bg-gray-100'
                  }`}
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <tab.icon 
                    className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-500'}`} 
                  />
                </motion.div>
                {tab.label}
              </motion.button>
            ))}
          </nav>
            
          </div>
          
          {/* Enhanced Navigation */}
          
        </div>
      </header>
      
      {/* Enhanced Main Content */}
      <main className=" bg-gradient-to-br from-slate-50 to-slate-200">
        <div className="max-w-9xl mx-auto">
          <motion.div 
            key={activeTab}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100"
          >
            
            
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="p-6"
            >
              {renderTabContent()}
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      
    </div>
  );
};

export default Payroll;

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   HomeIcon, 
//   BanknotesIcon, 
//   UsersIcon, 
//   DocumentTextIcon, 
//   CogIcon, 
//   ChartPieIcon
// } from '@heroicons/react/24/outline';
// import EmployeeSalaryManagement from '../../components/EmployeeSalaryManagement';
// import ProcessPayroll from '../../components/ProcessPayroll';
// import PayslipGenerator from '../../components/PayslipGenerator';
// import PayrollReports from '../../components/PayrollReports';
// import TaxSettings from '../../components/TaxSettings';
// import PayrollDashboard from '../../components/PayrollDashboard';

// const Payroll = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const tabs = [
//     { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
//     { id: 'salary', label: 'Employee Salaries', icon: UsersIcon },
//     { id: 'process', label: 'Process Payroll', icon: BanknotesIcon },
//     { id: 'payslips', label: 'Payslips', icon: DocumentTextIcon },
//     { id: 'reports', label: 'Reports', icon: ChartPieIcon },
//     { id: 'tax', label: 'Tax Settings', icon: CogIcon },
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'dashboard': return <PayrollDashboard />;
//       case 'salary': return <EmployeeSalaryManagement />;
//       case 'process': return <ProcessPayroll />;
//       case 'payslips': return <PayslipGenerator />;
//       case 'reports': return <PayrollReports />;
//       case 'tax': return <TaxSettings />;
//       default: return <PayrollDashboard />;
//     }
//   };

//   const contentVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.5,
//         ease: "easeOut" 
//       }
//     }
//   };

//   const pageTransition = {
//     initial: { opacity: 0, x: 20 },
//     animate: { 
//       opacity: 1, 
//       x: 0,
//       transition: {
//         duration: 0.4,
//         ease: "easeInOut"
//       }
//     },
//     exit: { opacity: 0, x: -20 }
//   };

//   return (
//     <div className="bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col">
//       <header className="bg-violet-50 shadow-md border-2 rounded-lg border-gray-300">
//         <div className="max-w-9xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
//           <div className="flex items-center space-x-3">
//             <div className="animate-pulse text-violet-700">
//               <BanknotesIcon className="h-8 w-8" />
//             </div>
//             <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-indigo-800">
//               Payroll Module
//             </h1>
//           </div>
//           <div className="flex space-x-3">
//             {tabs.map(tab => (
//               <motion.button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 ${
//                   activeTab === tab.id 
//                     ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' 
//                     : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
//                 }`}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
//                 <span>{tab.label}</span>
//               </motion.button>
//             ))}
//           </div>
//         </div>
//       </header>
      
//       <main className="bg-gradient-to-br from-slate-50 to-slate-200">
//         <div className="max-w-9xl mx-auto py-6 sm:px-6 lg:px-8">
//           <motion.div 
//             key={activeTab}
//             variants={pageTransition}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100"
//           >
//             <motion.div 
//               variants={contentVariants}
//               initial="hidden"
//               animate="visible"
//               className="p-6"
//             >
//               {renderTabContent()}
//             </motion.div>
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Payroll;