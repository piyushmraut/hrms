import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiUsers, FiClock, FiCheckCircle, FiAlertCircle, FiCalendar, FiUser, FiDownload, FiSearch, FiHome, FiBriefcase, FiList } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

Chart.register(...registerables);

const Attendance = () => {
  // State for attendance data
  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [currentView, setCurrentView] = useState('daily');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data initialization
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockEmployees = [
        { id: 1, name: 'John Doe', department: 'IT', position: 'Developer' },
        { id: 2, name: 'Jane Smith', department: 'HR', position: 'Manager' },
        { id: 3, name: 'Bob Johnson', department: 'Finance', position: 'Accountant' },
        { id: 4, name: 'Alice Williams', department: 'Marketing', position: 'Specialist' },
        { id: 5, name: 'Charlie Brown', department: 'IT', position: 'Admin' },
      ];

      const mockAttendance = [];
      const today = new Date();
      
      // Generate 30 days of attendance data
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        
        mockEmployees.forEach(employee => {
          const status = Math.random() > 0.2 ? (Math.random() > 0.3 ? 'present' : 'late') : 'absent';
          const checkIn = status === 'absent' ? null : 
            new Date(date.getFullYear(), date.getMonth(), date.getDate(), 
                     Math.floor(Math.random() * 3) + 8, 
                     Math.floor(Math.random() * 60));
          const checkOut = status === 'absent' ? null : 
            new Date(date.getFullYear(), date.getMonth(), date.getDate(), 
                     Math.floor(Math.random() * 3) + 17, 
                     Math.floor(Math.random() * 60));
          
          mockAttendance.push({
            id: `${employee.id}-${date.toISOString().split('T')[0]}`,
            employeeId: employee.id,
            employeeName: employee.name,
            date: new Date(date),
            status,
            checkIn,
            checkOut,
            department: employee.department,
            workingHours: checkIn && checkOut ? 
              ((checkOut - checkIn) / (1000 * 60 * 60)).toFixed(2) : 0,
            overtime: checkIn && checkOut ? 
              Math.max(0, ((checkOut - checkIn) / (1000 * 60 * 60) - 8).toFixed(2)) : 0,
          });
        });
      }

      setEmployees(mockEmployees);
      setAttendanceData(mockAttendance);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter data based on selections
  const filteredData = attendanceData.filter(record => {
    const matchesEmployee = selectedEmployee ? record.employeeId === parseInt(selectedEmployee) : true;
    const matchesDateRange = 
      (!startDate || record.date >= startDate) && 
      (!endDate || record.date <= endDate);
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         record.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesEmployee && matchesDateRange && matchesSearch;
  });

  // Group data by date for daily view
  const dailyData = filteredData.reduce((acc, record) => {
    const dateStr = record.date.toISOString().split('T')[0];
    if (!acc[dateStr]) {
      acc[dateStr] = {
        date: record.date,
        present: 0,
        absent: 0,
        late: 0,
        total: 0,
        avgWorkingHours: 0,
        totalOvertime: 0
      };
    }
    
    acc[dateStr][record.status]++;
    acc[dateStr].total++;
    acc[dateStr].avgWorkingHours += parseFloat(record.workingHours);
    acc[dateStr].totalOvertime += parseFloat(record.overtime);
    
    return acc;
  }, {});

  // Group data by employee for employee view
  const employeeData = filteredData.reduce((acc, record) => {
    if (!acc[record.employeeId]) {
      acc[record.employeeId] = {
        employeeId: record.employeeId,
        employeeName: record.employeeName,
        department: record.department,
        present: 0,
        absent: 0,
        late: 0,
        total: 0,
        avgWorkingHours: 0,
        totalOvertime: 0
      };
    }
    
    acc[record.employeeId][record.status]++;
    acc[record.employeeId].total++;
    acc[record.employeeId].avgWorkingHours += parseFloat(record.workingHours);
    acc[record.employeeId].totalOvertime += parseFloat(record.overtime);
    
    return acc;
  }, {});

  // Group data by department for department view
  const departmentData = filteredData.reduce((acc, record) => {
    if (!acc[record.department]) {
      acc[record.department] = {
        department: record.department,
        present: 0,
        absent: 0,
        late: 0,
        total: 0,
        avgWorkingHours: 0,
        totalOvertime: 0
      };
    }
    
    acc[record.department][record.status]++;
    acc[record.department].total++;
    acc[record.department].avgWorkingHours += parseFloat(record.workingHours);
    acc[record.department].totalOvertime += parseFloat(record.overtime);
    
    return acc;
  }, {});

  // Calculate averages
  Object.keys(dailyData).forEach(date => {
    dailyData[date].avgWorkingHours = (dailyData[date].avgWorkingHours / dailyData[date].total).toFixed(2);
  });
  
  Object.keys(employeeData).forEach(empId => {
    employeeData[empId].avgWorkingHours = (employeeData[empId].avgWorkingHours / employeeData[empId].total).toFixed(2);
  });
  
  Object.keys(departmentData).forEach(dept => {
    departmentData[dept].avgWorkingHours = (departmentData[dept].avgWorkingHours / departmentData[dept].total).toFixed(2);
  });

  // Prepare data for charts
  const prepareChartData = (data, groupBy) => {
    const labels = Object.keys(data);
    const presentData = labels.map(label => data[label].present);
    const absentData = labels.map(label => data[label].absent);
    const lateData = labels.map(label => data[label].late);
    
    return {
      labels,
      datasets: [
        {
          label: 'Present',
          data: presentData,
          backgroundColor: '#10B981',
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'Late',
          data: lateData,
          backgroundColor: '#F59E0B',
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'Absent',
          data: absentData,
          backgroundColor: '#EF4444',
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    };
  };

  // Prepare working hours chart data
  const prepareWorkingHoursChartData = (data, groupBy) => {
    const labels = Object.keys(data);
    const workingHoursData = labels.map(label => data[label].avgWorkingHours);
    
    return {
      labels,
      datasets: [
        {
          label: 'Average Working Hours',
          data: workingHoursData,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3B82F6',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  };

  // Export to Excel
  const exportToExcel = () => {
    let dataToExport = [];
    
    if (currentView === 'daily') {
      dataToExport = Object.values(dailyData).map(day => ({
        Date: day.date.toISOString().split('T')[0],
        Present: day.present,
        Late: day.late,
        Absent: day.absent,
        'Total Employees': day.total,
        'Average Working Hours': day.avgWorkingHours,
        'Total Overtime Hours': day.totalOvertime
      }));
    } else if (currentView === 'employee') {
      dataToExport = Object.values(employeeData).map(emp => ({
        'Employee ID': emp.employeeId,
        'Employee Name': emp.employeeName,
        Department: emp.department,
        Present: emp.present,
        Late: emp.late,
        Absent: emp.absent,
        'Total Days': emp.total,
        'Average Working Hours': emp.avgWorkingHours,
        'Total Overtime Hours': emp.totalOvertime
      }));
    } else if (currentView === 'department') {
      dataToExport = Object.values(departmentData).map(dept => ({
        Department: dept.department,
        Present: dept.present,
        Late: dept.late,
        Absent: dept.absent,
        'Total Employees': dept.total,
        'Average Working Hours': dept.avgWorkingHours,
        'Total Overtime Hours': dept.totalOvertime
      }));
    } else {
      dataToExport = filteredData.map(record => ({
        'Employee ID': record.employeeId,
        'Employee Name': record.employeeName,
        Department: record.department,
        Date: record.date.toISOString().split('T')[0],
        Status: record.status,
        'Check In': record.checkIn ? record.checkIn.toLocaleTimeString() : 'N/A',
        'Check Out': record.checkOut ? record.checkOut.toLocaleTimeString() : 'N/A',
        'Working Hours': record.workingHours,
        'Overtime Hours': record.overtime
      }));
    }
    
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Report');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `attendance_report_${currentView}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Render appropriate view based on selection
  const renderView = () => {
    switch (currentView) {
      case 'daily':
        return renderDailyView();
      case 'employee':
        return renderEmployeeView();
      case 'department':
        return renderDepartmentView();
      case 'detailed':
        return renderDetailedView();
      default:
        return renderDailyView();
    }
  };

  const renderDailyView = () => {
    const chartData = prepareChartData(dailyData, 'date');
    const workingHoursData = prepareWorkingHoursChartData(dailyData, 'date');
    
    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-violet-700"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-green-50 mr-3">
                <FiCalendar className="text-green-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Attendance Summary by Day</h3>
            </div>
            <Bar 
              data={chartData} 
              options={{ 
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      usePointStyle: true,
                      padding: 20
                    }
                  },
                  tooltip: {
                    backgroundColor: '#1F2937',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                      label: function(context) {
                        return `${context.dataset.label}: ${context.raw}`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#E5E7EB'
                    }
                  }
                }
              }} 
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-violet-700"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-blue-50 mr-3">
                <FiClock className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Average Working Hours by Day</h3>
            </div>
            <Line 
              data={workingHoursData} 
              options={{ 
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      usePointStyle: true,
                      padding: 20
                    }
                  },
                  tooltip: {
                    backgroundColor: '#1F2937',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                      label: function(context) {
                        return `${context.dataset.label}: ${context.raw} hours`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#E5E7EB'
                    },
                    title: {
                      display: true,
                      text: 'Hours'
                    }
                  }
                }
              }} 
            />
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-orange-700 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Working Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Overtime</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(dailyData).map((day, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day.date.toISOString().split('T')[0]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{day.present}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">{day.late}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{day.absent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.avgWorkingHours}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.totalOvertime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderEmployeeView = () => {
    const chartData = prepareChartData(employeeData, 'employee');
    const workingHoursData = prepareWorkingHoursChartData(employeeData, 'employee');
    
    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-purple-50 mr-3">
                <FiUser className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Attendance Summary by Employee</h3>
            </div>
            <Bar 
              data={chartData} 
              options={{ 
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      usePointStyle: true,
                      padding: 20
                    }
                  },
                  tooltip: {
                    backgroundColor: '#1F2937',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                      label: function(context) {
                        return `${context.dataset.label}: ${context.raw}`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#E5E7EB'
                    }
                  }
                }
              }} 
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-indigo-50 mr-3">
                <FiClock className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Average Working Hours by Employee</h3>
            </div>
            <Line 
              data={workingHoursData} 
              options={{ 
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      usePointStyle: true,
                      padding: 20
                    }
                  },
                  tooltip: {
                    backgroundColor: '#1F2937',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                      label: function(context) {
                        return `${context.dataset.label}: ${context.raw} hours`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#E5E7EB'
                    },
                    title: {
                      display: true,
                      text: 'Hours'
                    }
                  }
                }
              }} 
            />
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Working Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Overtime</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(employeeData).map((emp, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emp.employeeId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emp.employeeName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{emp.present}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">{emp.late}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{emp.absent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.avgWorkingHours}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.totalOvertime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderDepartmentView = () => {
    const chartData = prepareChartData(departmentData, 'department');
    const workingHoursData = prepareWorkingHoursChartData(departmentData, 'department');
    
    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-cyan-50 mr-3">
                <FiBriefcase className="text-cyan-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Attendance Summary by Department</h3>
            </div>
            <Pie 
              data={chartData} 
              options={{ 
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      usePointStyle: true,
                      padding: 20
                    }
                  },
                  tooltip: {
                    backgroundColor: '#1F2937',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                      label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                      }
                    }
                  }
                }
              }} 
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-blue-50 mr-3">
                <FiClock className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Average Working Hours by Department</h3>
            </div>
            <Bar 
              data={workingHoursData} 
              options={{ 
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      usePointStyle: true,
                      padding: 20
                    }
                  },
                  tooltip: {
                    backgroundColor: '#1F2937',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                      label: function(context) {
                        return `${context.dataset.label}: ${context.raw} hours`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#E5E7EB'
                    },
                    title: {
                      display: true,
                      text: 'Hours'
                    }
                  }
                }
              }} 
            />
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Working Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Overtime</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(departmentData).map((dept, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{dept.present}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">{dept.late}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{dept.absent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.avgWorkingHours}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.totalOvertime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderDetailedView = () => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Working Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.employeeId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.employeeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date.toISOString().split('T')[0]}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${record.status === 'present' ? 'bg-green-100 text-green-800' : 
                        record.status === 'late' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.checkIn ? record.checkIn.toLocaleTimeString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.checkOut ? record.checkOut.toLocaleTimeString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.workingHours}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.overtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Attendance Data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-indigo-800">Attendance Management</h1>
            <p className="text-gray-600 mt-1">Track and analyze employee attendance patterns</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-6 rounded-lg shadow-md flex items-center transition-all duration-300"
            onClick={exportToExcel}
          >
            <FiDownload className="mr-2" />
            Export to Excel
          </motion.button>
        </motion.div>
        
        {/* Filters and Controls */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FiSearch className="mr-2 text-blue-500" />
            Filter Attendance Records
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiUser className="mr-1" />
                Employee
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">All Employees</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>{employee.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiCalendar className="mr-1" />
                Date Range
              </label>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                isClearable={true}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholderText="Select date range"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiList className="mr-1" />
                View Type
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={currentView}
                onChange={(e) => setCurrentView(e.target.value)}
              >
                <option value="daily">Daily Summary</option>
                <option value="employee">Employee Summary</option>
                <option value="department">Department Summary</option>
                <option value="detailed">Detailed Records</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiSearch className="mr-1" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name or department"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 flex items-center">
              <FiUsers className="mr-1" />
              Showing {filteredData.length} records
            </div>
            
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`py-1 px-3 rounded-lg text-sm font-medium transition-all ${currentView === 'daily' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setCurrentView('daily')}
              >
                Daily
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`py-1 px-3 rounded-lg text-sm font-medium transition-all ${currentView === 'employee' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setCurrentView('employee')}
              >
                Employee
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`py-1 px-3 rounded-lg text-sm font-medium transition-all ${currentView === 'department' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setCurrentView('department')}
              >
                Department
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`py-1 px-3 rounded-lg text-sm font-medium transition-all ${currentView === 'detailed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setCurrentView('detailed')}
              >
                Detailed
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Attendance Stats Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8"
        >
          <div className=" rounded-xl shadow-lg p-5 bg-indigo-50 border border-indigo-500 hover:bg-indigo-100 text-indigo-600 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Records</h3>
                <p className="text-2xl font-semibold text-gray-800 mt-1">{filteredData.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <FiUsers className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className=" rounded-xl shadow-lg p-5 bg-emerald-50 border border-emerald-500 hover:bg-emerald-100 text-emerald-600 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Present</h3>
                <p className="text-2xl font-semibold text-green-600 mt-1">
                  {filteredData.filter(r => r.status === 'present').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <FiCheckCircle className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className=" rounded-xl shadow-lg p-5 bg-amber-50 border border-amber-500 hover:bg-amber-100 text-amber-600 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Late</h3>
                <p className="text-2xl font-semibold text-yellow-600 mt-1">
                  {filteredData.filter(r => r.status === 'late').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50">
                <FiClock className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border-red-600 border rounded-xl shadow-lg p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Absent</h3>
                <p className="text-2xl font-semibold text-red-600 mt-1">
                  {filteredData.filter(r => r.status === 'absent').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-50">
                <FiAlertCircle className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Main Content */}
        {renderView()}
      </div>
      
      <Tooltip id="tooltip" />
    </div>
  );
};

export default Attendance;