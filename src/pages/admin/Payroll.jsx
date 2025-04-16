

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