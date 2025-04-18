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