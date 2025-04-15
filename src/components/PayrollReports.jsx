import React, { useState } from 'react';
import { FiDownload, FiFilter, FiCalendar, FiBarChart2, FiDollarSign, FiUsers } from 'react-icons/fi';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PayrollReports = () => {
  const [reportType, setReportType] = useState('summary');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sample data for charts
  const payrollSummaryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Payroll',
        data: [65000, 69000, 72000, 71000, 75000, 85000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const departmentDistributionData = {
    labels: ['Engineering', 'Marketing', 'HR', 'Finance', 'Operations'],
    datasets: [
      {
        data: [45, 20, 10, 15, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(244, 63, 94, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const taxDistributionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tax Deductions',
        data: [9500, 10000, 10500, 10200, 11000, 12500],
        fill: false,
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgba(239, 68, 68, 1)',
        tension: 0.1,
      },
      {
        label: 'Net Pay',
        data: [55500, 59000, 61500, 60800, 64000, 72500],
        fill: false,
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgba(16, 185, 129, 1)',
        tension: 0.1,
      },
    ],
  };

  const generateReport = () => {
    // In a real app, this would generate the report based on filters
    alert(`Generating ${reportType} report from ${startDate} to ${endDate}`);
  };

  const downloadReport = () => {
    // In a real app, this would download the report
    alert(`Downloading ${reportType} report`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Payroll Reports</h1>
      
      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="summary">Payroll Summary</option>
              <option value="department">Department Distribution</option>
              <option value="tax">Tax Analysis</option>
              <option value="employee">Employee Earnings</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={generateReport}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
            >
              <FiFilter className="mr-2" />
              Generate
            </button>
            <button
              onClick={downloadReport}
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 flex items-center justify-center"
              title="Download Report"
            >
              <FiDownload />
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          {reportType === 'summary' && <FiDollarSign className="mr-2 text-blue-500" />}
          {reportType === 'department' && <FiUsers className="mr-2 text-green-500" />}
          {reportType === 'tax' && <FiBarChart2 className="mr-2 text-red-500" />}
          {reportType === 'employee' && <FiUsers className="mr-2 text-purple-500" />}
          {reportType === 'summary' && 'Payroll Summary Report'}
          {reportType === 'department' && 'Department Distribution Report'}
          {reportType === 'tax' && 'Tax Analysis Report'}
          {reportType === 'employee' && 'Employee Earnings Report'}
        </h2>

        {reportType === 'summary' && (
          <div>
            <div className="h-80 mb-8">
              <Bar 
                data={payrollSummaryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Monthly Payroll Summary',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return '$' + value.toLocaleString();
                        }
                      }
                    }
                  }
                }}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Payroll</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Deductions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees Paid</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Salary</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payrollSummaryData.labels.map((month, index) => (
                    <tr key={month}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month} 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payrollSummaryData.datasets[0].data[index].toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(payrollSummaryData.datasets[0].data[index] * 0.15).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{120 + index * 5}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round(payrollSummaryData.datasets[0].data[index] / (120 + index * 5)).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === 'department' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-80">
              <Pie 
                data={departmentDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                    title: {
                      display: true,
                      text: 'Payroll by Department (%)',
                    },
                  }
                }}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
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
                    <tr key={dept}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round(85000 * departmentDistributionData.datasets[0].data[index] / 100).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{departmentDistributionData.datasets[0].data[index]}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.round(142 * departmentDistributionData.datasets[0].data[index] / 100)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === 'tax' && (
          <div>
            <div className="h-80 mb-8">
              <Line 
                data={taxDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Tax vs Net Pay Trend',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return '$' + value.toLocaleString();
                        }
                      }
                    }
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Total Tax Paid</h3>
                <p className="text-2xl font-semibold text-red-600 mt-1">$63,700</p>
                <p className="text-xs text-gray-500 mt-1">Jan - Jun 2023</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Avg. Tax Rate</h3>
                <p className="text-2xl font-semibold text-yellow-600 mt-1">15.2%</p>
                <p className="text-xs text-gray-500 mt-1">Across all employees</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Tax Savings</h3>
                <p className="text-2xl font-semibold text-green-600 mt-1">$8,400</p>
                <p className="text-xs text-gray-500 mt-1">From deductions & benefits</p>
              </div>
            </div>
          </div>
        )}

        {reportType === 'employee' && (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">Employee earnings report would show individual employee compensation details for the selected period.</p>
            </div>
            <div className="overflow-x-auto">
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
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">JD</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">John Doe</div>
                          <div className="text-sm text-gray-500">EMP001</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Engineering</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$7,500</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,500</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$500</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">$8,875</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-medium">JS</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                          <div className="text-sm text-gray-500">EMP002</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Marketing</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$8,500</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$2,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,500</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$700</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">$10,070</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600 font-medium">RJ</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Robert Johnson</div>
                          <div className="text-sm text-gray-500">EMP003</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">HR</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$6,500</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,200</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$800</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$400</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">$7,520</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollReports;