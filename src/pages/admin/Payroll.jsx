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

//   const getTabTitle = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return 'Dashboard';
//       case 'salary':
//         return 'Employee Salaries';
//       case 'process':
//         return 'Process Payroll';
//       case 'payslips':
//         return 'Payslips';
//       case 'reports':
//         return 'Reports';
//       case 'tax':
//         return 'Tax Settings';
//       default:
//         return 'Dashboard';
//     }
//   };

//   const getTabDescription = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return 'Overview of your payroll process';
//       case 'salary':
//         return 'Manage employee salaries and compensation';
//       case 'process':
//         return 'Run and manage payroll processing';
//       case 'payslips':
//         return 'Generate and manage employee payslips';
//       case 'reports':
//         return 'View payroll reports and analytics';
//       case 'tax':
//         return 'Configure tax settings and deductions';
//       default:
//         return 'Overview of your payroll process';
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md">
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800">Payroll Module</h2>
//         </div>
//         <nav className="mt-4">
//           <button
//             onClick={() => setActiveTab('dashboard')}
//             className={`flex items-center w-full px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
//               activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
//             }`}
//           >
//             <FiHome className="mr-3" />
//             Dashboard
//           </button>
//           <button
//             onClick={() => setActiveTab('salary')}
//             className={`flex items-center w-full px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
//               activeTab === 'salary' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
//             }`}
//           >
//             <FiUsers className="mr-3" />
//             Employee Salaries
//           </button>
//           <button
//             onClick={() => setActiveTab('process')}
//             className={`flex items-center w-full px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
//               activeTab === 'process' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
//             }`}
//           >
//             <FiDollarSign className="mr-3" />
//             Process Payroll
//           </button>
//           <button
//             onClick={() => setActiveTab('payslips')}
//             className={`flex items-center w-full px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
//               activeTab === 'payslips' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
//             }`}
//           >
//             <FiFileText className="mr-3" />
//             Payslips
//           </button>
//           <button
//             onClick={() => setActiveTab('reports')}
//             className={`flex items-center w-full px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
//               activeTab === 'reports' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
//             }`}
//           >
//             <FiPieChart className="mr-3" />
//             Reports
//           </button>
//           <button
//             onClick={() => setActiveTab('tax')}
//             className={`flex items-center w-full px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
//               activeTab === 'tax' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
//             }`}
//           >
//             <FiSettings className="mr-3" />
//             Tax Settings
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto p-8">
//         <div className="mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">{getTabTitle()}</h2>
//           <p className="text-gray-600">{getTabDescription()}</p>
//         </div>
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// export default Payroll;

import React, { useState } from 'react';
import { FiHome, FiDollarSign, FiUsers, FiFileText, FiSettings, FiPieChart } from 'react-icons/fi';
import EmployeeSalaryManagement from '../../components/EmployeeSalaryManagement';
import ProcessPayroll from '../../components/ProcessPayroll';
import PayslipGenerator from '../../components/PayslipGenerator';
import PayrollReports from '../../components/PayrollReports';
import TaxSettings from '../../components/TaxSettings';
import PayrollDashboard from '../../components/PayrollDashboard';

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'salary', label: 'Employee Salaries', icon: FiUsers },
    { id: 'process', label: 'Process Payroll', icon: FiDollarSign },
    { id: 'payslips', label: 'Payslips', icon: FiFileText },
    { id: 'reports', label: 'Reports', icon: FiPieChart },
    { id: 'tax', label: 'Tax Settings', icon: FiSettings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <PayrollDashboard />;
      case 'salary':
        return <EmployeeSalaryManagement />;
      case 'process':
        return <ProcessPayroll />;
      case 'payslips':
        return <PayslipGenerator />;
      case 'reports':
        return <PayrollReports />;
      case 'tax':
        return <TaxSettings />;
      default:
        return <PayrollDashboard />;
    }
  };

  const getTabTitle = () => {
    const tab = tabs.find(t => t.id === activeTab);
    return tab ? tab.label : 'Dashboard';
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Overview of your payroll process';
      case 'salary':
        return 'Manage employee salaries and compensation';
      case 'process':
        return 'Run and manage payroll processing';
      case 'payslips':
        return 'Generate and manage employee payslips';
      case 'reports':
        return 'View payroll reports and analytics';
      case 'tax':
        return 'Configure tax settings and deductions';
      default:
        return 'Overview of your payroll process';
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-md">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Payroll Module</h2>
          <nav className="flex space-x-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 flex items-center text-gray-600 hover:text-blue-600 ${
                  activeTab === tab.id ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50' : ''
                }`}
              >
                <tab.icon className="mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{getTabTitle()}</h2>
          <p className="text-gray-600">{getTabDescription()}</p>
        </div>
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Payroll;