import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  DollarSign, Users, FileText, Calendar,
  Zap, FileOutput, BarChart2, Gift,
  Activity, AlertTriangle, CheckCircle, Bell
} from 'lucide-react';

const PayrollDashboard = () => {
  const [animateIcons, setAnimateIcons] = useState(false);
  
  useEffect(() => {
    setAnimateIcons(true);
  }, []);

  const stats = [
    { 
      title: 'Total Payroll This Month', 
      value: '₹ 85,420', 
      icon: <DollarSign className={`text-indigo-600 ${animateIcons ? 'animate-bounce' : ''}`} size={24} />, 
      change: '+12% from last month',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
      borderColor: 'border-indigo-600'
    },
    { 
      title: 'Employees Paid', 
      value: '142', 
      icon: <Users className={`text-emerald-600 ${animateIcons ? 'animate-pulse' : ''}`} size={24} />, 
      change: '+5 new employees',
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-600'
    },
    { 
      title: 'Pending Payslips', 
      value: '8', 
      icon: <FileText className={`text-amber-600 ${animateIcons ? 'animate-ping' : ''}`} size={24} />, 
      change: '2 awaiting approval',
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-600'
    },
    { 
      title: 'Upcoming Payroll', 
      value: 'May 30, 2025', 
      icon: <Calendar className={`text-violet-600 ${animateIcons ? 'animate-pulse' : ''}`} size={24} />, 
      change: '3 days remaining',
      bgColor: 'bg-violet-100',
      textColor: 'text-violet-600',
      borderColor: 'border-violet-600'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'Payroll processed for April 2025', date: 'May 12, 2025', user: 'Admin User', status: 'completed', icon: <CheckCircle size={16} className="text-emerald-500" /> },
    { id: 2, action: 'Salary updated for John Doe', date: 'April 14, 2025', user: 'HR Manager', status: 'updated', icon: <Activity size={16} className="text-blue-500" /> },
    { id: 3, action: 'New tax rule added', date: 'April 12, 2025', user: 'Finance Team', status: 'warning', icon: <AlertTriangle size={16} className="text-amber-500" /> },
    { id: 4, action: 'Bonus paid to 25 employees', date: 'April 10, 2025', user: 'Admin User', status: 'notification', icon: <Bell size={16} className="text-violet-500" /> }
  ];

  const payrollTrends = [
    { name: 'Jan', amount: 65000 },
    { name: 'Feb', amount: 68000 },
    { name: 'Mar', amount: 72000 },
    { name: 'Apr', amount: 75000 },
    { name: 'May', amount: 79000 },
    { name: 'Jun', amount: 85420 },
  ];

  return (
    <div className="p-6 bg-slate-50 border border-purple-700">
      <div className="max-w-9xl mx-auto ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Payroll Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`rounded-xl shadow-sm border ${stat.borderColor} ${stat.bgColor} p-6 flex items-start transform transition-all duration-300 hover:shadow-md hover:scale-105`}
            >
              <div className="mr-4 p-3 bg-white bg-opacity-70 rounded-full shadow-inner">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-600">{stat.title}</h3>
                <p className={`text-2xl font-bold ${stat.textColor} mt-1`}>{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 ">
          <div className="lg:col-span-2 border-2 border-dotted border-red-500">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800">Payroll Trends</h2>
              </div>
              <div className="p-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={payrollTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#4f46e5" 
                      strokeWidth={2}
                      dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
                      activeDot={{ fill: '#4f46e5', strokeWidth: 0, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className='border-2 border-dotted border-red-500'>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800">Recent Activities</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors duration-200">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">{activity.icon}</div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                        <p className="text-xs text-slate-500 mt-1">By {activity.user}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{activity.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      
        <div className="bg-white rounded-xl shadow-sm border-2 border-dotted border-red-500 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-indigo-50 border border-indigo-500 hover:bg-indigo-100 text-indigo-600 py-4 px-4 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-md">
              <Zap className={`${animateIcons ? 'animate-pulse' : ''}`} size={18} />
              <span>Process Payroll</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-emerald-50 border border-emerald-500 hover:bg-emerald-100 text-emerald-600 py-4 px-4 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-md">
              <FileOutput className={`${animateIcons ? 'animate-pulse' : ''}`} size={18} />
              <span>Generate Payslips</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-violet-50 border border-violet-500  hover:bg-violet-100 text-violet-600 py-4 px-4 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-md">
              <BarChart2 className={`${animateIcons ? 'animate-pulse' : ''}`} size={18} />
              <span>Run Reports</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-amber-50 border border-amber-500 hover:bg-amber-100 text-amber-600 py-4 px-4 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-md">
              <Gift className={`${animateIcons ? 'animate-pulse' : ''}`} size={18} />
              <span>Add Bonus</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollDashboard;