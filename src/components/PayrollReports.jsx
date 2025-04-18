import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiCalendar, FiBarChart2, FiDollarSign, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PayrollReports = () => {
  const [reportType, setReportType] = useState('summary');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const iconAnimation = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.2, 1],
      transition: { duration: 1, repeat: Infinity, repeatDelay: 5 }
    }
  };

  const payrollSummaryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ 
      label: 'Total Payroll', 
      data: [65000, 69000, 72000, 71000, 75000, 85000], 
      backgroundColor: 'rgba(104, 171, 255, 0.6)', 
      borderColor: 'rgba(59, 130, 246, 1)', 
      borderWidth: 2,
      borderRadius: 5
    }],
  };

  const departmentDistributionData = {
    labels: ['Engineering', 'Marketing', 'HR', 'Finance', 'Operations'],
    datasets: [{ 
      data: [45, 20, 10, 15, 10], 
      backgroundColor: [
        'rgba(104, 171, 255, 0.8)', 
        'rgba(46, 204, 113, 0.8)', 
        'rgba(255, 177, 66, 0.8)', 
        'rgba(156, 110, 255, 0.8)', 
        'rgba(255, 107, 129, 0.8)'
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)', 
        'rgba(16, 185, 129, 1)', 
        'rgba(245, 158, 11, 1)', 
        'rgba(139, 92, 246, 1)', 
        'rgba(244, 63, 94, 1)'
      ],
      borderWidth: 2,
      hoverOffset: 15
    }],
  };

  const taxDistributionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { 
        label: 'Tax Deductions', 
        data: [9500, 10000, 10500, 10200, 11000, 12500], 
        fill: true, 
        backgroundColor: 'rgba(255, 107, 129, 0.2)', 
        borderColor: 'rgba(255, 107, 129, 1)', 
        tension: 0.4,
        pointBackgroundColor: 'rgba(255, 107, 129, 1)',
        pointBorderColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 7
      },
      { 
        label: 'Net Pay', 
        data: [55500, 59000, 61500, 60800, 64000, 72500], 
        fill: true, 
        backgroundColor: 'rgba(46, 204, 113, 0.2)', 
        borderColor: 'rgba(46, 204, 113, 1)', 
        tension: 0.4,
        pointBackgroundColor: 'rgba(46, 204, 113, 1)',
        pointBorderColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 7
      },
    ],
  };

  

  

  // Simple animation effect for the active tab
  useEffect(() => {
    // This would typically animate something when report type changes
  }, [reportType]);

  const getReportIcon = (type) => {
    switch(type) {
      case 'summary':
        return <motion.div {...iconAnimation}><FiDollarSign size={20} className="text-blue-500" /></motion.div>;
      case 'department':
        return <motion.div {...iconAnimation}><FiUsers size={20} className="text-green-500" /></motion.div>;
      case 'tax':
        return <motion.div {...iconAnimation}><FiBarChart2 size={20} className="text-red-500" /></motion.div>;
      case 'employee':
        return <motion.div {...iconAnimation}><FiUsers size={20} className="text-purple-500" /></motion.div>;
      default:
        return <FiBarChart2 size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 border border-violet-600">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.1 }}
          className="text-blue-600 mr-3"
        >
          <FiBarChart2 size={32} />
        </motion.div>
        <h1 className="text-2xl font-bold text-indigo-900">Payroll Reports</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="col-span-1 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 border-l-4 border-blue-500"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Payroll</h3>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <FiDollarSign size={18} className="text-blue-500" />
            </motion.div>
          </div>
          <p className="text-2xl font-bold text-gray-800">$437,000</p>
          <p className="text-xs text-gray-500 mt-1">Jan - Jun 2023</p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="col-span-1 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 border-l-4 border-green-500"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Employees</h3>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <FiUsers size={18} className="text-green-500" />
            </motion.div>
          </div>
          <p className="text-2xl font-bold text-gray-800">142</p>
          <p className="text-xs text-green-500 mt-1">+12 since last month</p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="col-span-1 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 border-l-4 border-yellow-500"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg. Salary</h3>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <FiTrendingUp size={18} className="text-yellow-500" />
            </motion.div>
          </div>
          <p className="text-2xl font-bold text-gray-800">$72,833</p>
          <p className="text-xs text-yellow-500 mt-1">+3.4% since last quarter</p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="col-span-1 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 border-l-4 border-red-500"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Tax Rate</h3>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <FiBarChart2 size={18} className="text-red-500" />
            </motion.div>
          </div>
          <p className="text-2xl font-bold text-gray-800">15.2%</p>
          <p className="text-xs text-red-500 mt-1">Across all employees</p>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-sm p-6 mb-6"
      >
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Report Settings</h2>
          
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <div className="relative">
              <select 
                value={reportType} 
                onChange={(e) => setReportType(e.target.value)} 
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all duration-200 bg-white"
              >
                <option value="summary">Payroll Summary</option>
                <option value="department">Department Distribution</option>
                <option value="tax">Tax Analysis</option>
                <option value="employee">Employee Earnings</option>
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {getReportIcon(reportType)}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiFilter size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          
        </motion.div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-sm p-6 mb-6"
      >
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center">
            {getReportIcon(reportType)}
            <h2 className="ml-2 text-xl font-semibold text-gray-800">
              {reportType === 'summary' && 'Payroll Summary Report'}
              {reportType === 'department' && 'Department Distribution Report'}
              {reportType === 'tax' && 'Tax Analysis Report'}
              {reportType === 'employee' && 'Employee Earnings Report'}
            </h2>
          </div>
          
        </motion.div>

        {reportType === 'summary' && (
          <motion.div variants={itemVariants}>
            <div className="rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-white p-4 mb-8">
              <div className="h-80">
                <Bar 
                  data={payrollSummaryData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    plugins: { 
                      legend: { position: 'top' }, 
                      title: { display: true, text: 'Monthly Payroll Summary', font: { size: 16, weight: 'bold' } } 
                    }, 
                    scales: { 
                      y: { 
                        beginAtZero: true, 
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { callback: value => '$' + value.toLocaleString() } 
                      },
                      x: {
                        grid: { display: false }
                      }
                    },
                    animation: {
                      duration: 2000,
                      easing: 'easeOutQuart'
                    }
                  }} 
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total Payroll</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tax Deductions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Employees Paid</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Avg. Salary</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payrollSummaryData.labels.map((month, index) => (
                    <motion.tr 
                      key={month}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month} 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">${payrollSummaryData.datasets[0].data[index].toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(payrollSummaryData.datasets[0].data[index] * 0.15).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{120 + index * 5}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round(payrollSummaryData.datasets[0].data[index] / (120 + index * 5)).toLocaleString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {reportType === 'department' && (
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden bg-gradient-to-r from-green-50 to-white p-4">
              <div className="h-80">
                <Pie 
                  data={departmentDistributionData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    plugins: { 
                      legend: { 
                        position: 'right',
                        labels: {
                          padding: 20,
                          font: {
                            size: 12
                          }
                        }
                      }, 
                      title: { 
                        display: true, 
                        text: 'Payroll by Department (%)', 
                        font: { size: 16, weight: 'bold' } 
                      } 
                    },
                    animation: {
                      animateRotate: true,
                      animateScale: true,
                      duration: 2000,
                      easing: 'easeOutQuart'
                    }
                  }} 
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payroll Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {departmentDistributionData.labels.map((dept, index) => (
                    <motion.tr 
                      key={dept}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-green-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: departmentDistributionData.datasets[0].backgroundColor[index] }}></div>
                          <span className="text-sm font-medium text-gray-900">{dept}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">${Math.round(85000 * departmentDistributionData.datasets[0].data[index] / 100).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2.5">
                            <div className="h-2.5 rounded-full" style={{ width: `${departmentDistributionData.datasets[0].data[index]}%`, backgroundColor: departmentDistributionData.datasets[0].backgroundColor[index] }}></div>
                          </div>
                          <span className="ml-3 text-sm text-gray-500">{departmentDistributionData.datasets[0].data[index]}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.round(142 * departmentDistributionData.datasets[0].data[index] / 100)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {reportType === 'tax' && (
          <motion.div variants={itemVariants}>
            <div className="rounded-lg overflow-hidden bg-gradient-to-r from-red-50 to-white p-4 mb-8">
              <div className="h-80">
                <Line 
                  data={taxDistributionData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    plugins: { 
                      legend: { position: 'top' }, 
                      title: { display: true, text: 'Tax vs Net Pay Trend', font: { size: 16, weight: 'bold' } } 
                    }, 
                    scales: { 
                      y: { 
                        beginAtZero: true, 
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { callback: value => '$' + value.toLocaleString() } 
                      },
                      x: {
                        grid: { display: false }
                      }
                    },
                    animation: {
                      tension: {
                        duration: 2000,
                        easing: 'easeOutQuart',
                        from: 0.4,
                        to: 0.2,
                        loop: true
                      }
                    }
                  }} 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-red-50 to-white p-5 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-1">
                  <motion.div 
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <FiBarChart2 size={18} className="text-red-500 mr-2" />
                  </motion.div>
                  <h3 className="text-sm font-medium text-gray-600">Total Tax Paid</h3>
                </div>
                <p className="text-2xl font-bold text-red-600">$63,700</p>
                <p className="text-xs font-medium text-gray-500 mt-1 flex items-center">
                  <FiCalendar size={12} className="mr-1" /> Jan - Jun 2023
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-yellow-50 to-white p-5 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-1">
                  <motion.div 
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <FiDollarSign size={18} className="text-yellow-500 mr-2" />
                  </motion.div>
                  <h3 className="text-sm font-medium text-gray-600">Avg. Tax Rate</h3>
                </div>
                <p className="text-2xl font-bold text-yellow-600">15.2%</p>
                <p className="text-xs font-medium text-gray-500 mt-1 flex items-center">
                  <FiUsers size={12} className="mr-1" /> Across all employees
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-green-50 to-white p-5 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-1">
                  <motion.div 
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <FiTrendingUp size={18} className="text-green-500 mr-2" />
                  </motion.div>
                  <h3 className="text-sm font-medium text-gray-600">Tax Savings</h3>
                </div>
                <p className="text-2xl font-bold text-green-600">$8,400</p>
                <p className="text-xs font-medium text-gray-500 mt-1 flex items-center">
                  <FiFilter size={12} className="mr-1" /> From deductions & benefits
                </p>
              </motion.div>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Gross Pay</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tax Deductions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tax Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Net Pay</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {taxDistributionData.labels.map((month, index) => (
                    <motion.tr 
                      key={month}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-red-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month} 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                        ${(taxDistributionData.datasets[0].data[index] + taxDistributionData.datasets[1].data[index]).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">${taxDistributionData.datasets[0].data[index].toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(taxDistributionData.datasets[0].data[index] / (taxDistributionData.datasets[0].data[index] + taxDistributionData.datasets[1].data[index]) * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">${taxDistributionData.datasets[1].data[index].toLocaleString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {reportType === 'employee' && (
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg mb-6">
              <p className="text-gray-700">Individual employee compensation details for the selected period</p>
            </div>
            
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allowances</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonuses</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 1, name: "John Doe", dept: "Engineering", salary: 7500, allowances: 1500, bonus: 0, deduction: 500, net: 8500 },
                    { id: 2, name: "Jane Smith", dept: "Marketing", salary: 6800, allowances: 1200, bonus: 2000, deduction: 600, net: 9400 },
                    { id: 3, name: "Robert Johnson", dept: "Finance", salary: 8200, allowances: 1800, bonus: 500, deduction: 700, net: 9800 },
                    { id: 4, name: "Lisa Brown", dept: "HR", salary: 5900, allowances: 1000, bonus: 0, deduction: 400, net: 6500 },
                    { id: 5, name: "Michael Wilson", dept: "Operations", salary: 6500, allowances: 1300, bonus: 1000, deduction: 500, net: 8300 }
                  ].map((employee, index) => (
                    <motion.tr 
                      key={employee.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-purple-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-medium">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">ID: EMP-{1000 + employee.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.dept}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${employee.salary.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.allowances.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.bonus.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.deduction.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${employee.net.toLocaleString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PayrollReports;