import React from 'react';
import { FiDollarSign, FiUsers, FiFileText, FiCalendar } from 'react-icons/fi';

const PayrollDashboard = () => {
  // Sample data - replace with actual API calls
  const stats = [
    { title: 'Total Payroll This Month', value: '$85,420', icon: <FiDollarSign className="text-blue-500" size={24} />, change: '+12% from last month' },
    { title: 'Employees Paid', value: '142', icon: <FiUsers className="text-green-500" size={24} />, change: '+5 new employees' },
    { title: 'Pending Payslips', value: '8', icon: <FiFileText className="text-yellow-500" size={24} />, change: '2 awaiting approval' },
    { title: 'Upcoming Payroll', value: 'Jun 30, 2023', icon: <FiCalendar className="text-purple-500" size={24} />, change: '3 days remaining' }
  ];

  const recentActivities = [
    { id: 1, action: 'Payroll processed for June 2023', date: 'Jun 15, 2023', user: 'Admin User' },
    { id: 2, action: 'Salary updated for John Doe', date: 'Jun 14, 2023', user: 'HR Manager' },
    { id: 3, action: 'New tax rule added', date: 'Jun 12, 2023', user: 'Finance Team' },
    { id: 4, action: 'Bonus paid to 25 employees', date: 'Jun 10, 2023', user: 'Admin User' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Payroll Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 flex items-start">
            <div className="mr-4 p-3 bg-gray-100 rounded-full">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map(activity => (
            <div key={activity.id} className="px-6 py-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">By {activity.user}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.date}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 px-4 rounded-lg text-sm font-medium transition-colors">
            Process Payroll
          </button>
          <button className="bg-green-50 hover:bg-green-100 text-green-600 py-3 px-4 rounded-lg text-sm font-medium transition-colors">
            Generate Payslips
          </button>
          <button className="bg-purple-50 hover:bg-purple-100 text-purple-600 py-3 px-4 rounded-lg text-sm font-medium transition-colors">
            Run Reports
          </button>
          <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-600 py-3 px-4 rounded-lg text-sm font-medium transition-colors">
            Add Bonus
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayrollDashboard;

