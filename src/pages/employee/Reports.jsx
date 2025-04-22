import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  HiUser,
  HiCalendar,
  HiCurrencyDollar,
  HiUserAdd,
  HiUserGroup,
  HiCheckCircle,
  HiXCircle,
  HiOfficeBuilding,
  HiCheck,
  HiX,
  HiCreditCard,
  HiBriefcase,
  HiDownload,
  HiClock,
  HiChartPie,
  HiCalculator,
  HiChartBar
} from 'react-icons/hi';

Chart.register(...registerables);

const Reports = () => {
  const [activeTab, setActiveTab] = useState('employee');
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [employeeData, setEmployeeData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [hiringData, setHiringData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [generatedReports, setGeneratedReports] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockDepartments = [
        { id: 'dept1', name: 'HR' },
        { id: 'dept2', name: 'Finance' },
        { id: 'dept3', name: 'Engineering' },
        { id: 'dept4', name: 'Marketing' },
        { id: 'dept5', name: 'Operations' },
      ];
      
      const mockEmployees = [
        { id: 'emp1', name: 'John Doe', department: 'dept1', position: 'HR Manager', joinDate: '2020-01-15', status: 'active' },
        { id: 'emp2', name: 'Jane Smith', department: 'dept2', position: 'Accountant', joinDate: '2019-05-22', status: 'active' },
        { id: 'emp3', name: 'Mike Johnson', department: 'dept3', position: 'Senior Developer', joinDate: '2018-11-10', status: 'active' },
        { id: 'emp4', name: 'Sarah Williams', department: 'dept3', position: 'Junior Developer', joinDate: '2021-03-05', status: 'active' },
        { id: 'emp5', name: 'David Brown', department: 'dept4', position: 'Marketing Specialist', joinDate: '2020-07-18', status: 'inactive' },
        { id: 'emp6', name: 'Emily Davis', department: 'dept3', position: 'DevOps Engineer', joinDate: '2021-09-12', status: 'active' },
        { id: 'emp7', name: 'Robert Wilson', department: 'dept5', position: 'Operations Manager', joinDate: '2019-02-28', status: 'active' },
        { id: 'emp8', name: 'Lisa Taylor', department: 'dept2', position: 'Financial Analyst', joinDate: '2022-01-10', status: 'active' },
        { id: 'emp9', name: 'James Anderson', department: 'dept4', position: 'Content Writer', joinDate: '2021-11-15', status: 'inactive' },
        { id: 'emp10', name: 'Olivia Martinez', department: 'dept1', position: 'Recruiter', joinDate: '2022-04-01', status: 'active' },
      ];
      
      const mockAttendance = [
        { id: 'att1', employeeId: 'emp1', date: '2023-05-01', status: 'present', checkIn: '09:00', checkOut: '17:00' },
        { id: 'att2', employeeId: 'emp1', date: '2023-05-02', status: 'present', checkIn: '08:55', checkOut: '17:10' },
        { id: 'att3', employeeId: 'emp1', date: '2023-05-03', status: 'absent' },
        { id: 'att4', employeeId: 'emp2', date: '2023-05-01', status: 'present', checkIn: '09:10', checkOut: '17:05' },
        { id: 'att5', employeeId: 'emp2', date: '2023-05-02', status: 'present', checkIn: '09:00', checkOut: '17:00' },
        { id: 'att6', employeeId: 'emp3', date: '2023-05-01', status: 'present', checkIn: '08:45', checkOut: '17:20' },
        { id: 'att7', employeeId: 'emp3', date: '2023-05-02', status: 'present', checkIn: '08:50', checkOut: '17:15' },
        { id: 'att8', employeeId: 'emp4', date: '2023-05-01', status: 'present', checkIn: '09:05', checkOut: '17:00' },
        { id: 'att9', employeeId: 'emp5', date: '2023-05-01', status: 'absent' },
        { id: 'att10', employeeId: 'emp6', date: '2023-05-01', status: 'present', checkIn: '08:30', checkOut: '16:45' },
      ];
      
      const mockPayroll = [
        { id: 'pay1', employeeId: 'emp1', month: '2023-05', basicSalary: 5000, allowances: 1000, deductions: 500, netSalary: 5500, status: 'paid' },
        { id: 'pay2', employeeId: 'emp2', month: '2023-05', basicSalary: 4500, allowances: 800, deductions: 300, netSalary: 5000, status: 'paid' },
        { id: 'pay3', employeeId: 'emp3', month: '2023-05', basicSalary: 6000, allowances: 1200, deductions: 600, netSalary: 6600, status: 'pending' },
        { id: 'pay4', employeeId: 'emp4', month: '2023-05', basicSalary: 4000, allowances: 500, deductions: 200, netSalary: 4300, status: 'paid' },
        { id: 'pay5', employeeId: 'emp5', month: '2023-05', basicSalary: 4800, allowances: 700, deductions: 400, netSalary: 5100, status: 'pending' },
        { id: 'pay6', employeeId: 'emp6', month: '2023-05', basicSalary: 5500, allowances: 900, deductions: 450, netSalary: 5950, status: 'paid' },
        { id: 'pay7', employeeId: 'emp7', month: '2023-05', basicSalary: 6500, allowances: 1100, deductions: 550, netSalary: 7050, status: 'paid' },
        { id: 'pay8', employeeId: 'emp8', month: '2023-05', basicSalary: 5200, allowances: 850, deductions: 420, netSalary: 5630, status: 'pending' },
        { id: 'pay9', employeeId: 'emp9', month: '2023-05', basicSalary: 3800, allowances: 400, deductions: 180, netSalary: 4020, status: 'paid' },
        { id: 'pay10', employeeId: 'emp10', month: '2023-05', basicSalary: 4700, allowances: 750, deductions: 370, netSalary: 5080, status: 'paid' },
      ];
      
      const mockHiring = [
        { id: 'hire1', position: 'Senior Developer', department: 'dept3', applicants: 24, interviews: 5, hired: 1, date: '2023-04-15', status: 'completed' },
        { id: 'hire2', position: 'Marketing Specialist', department: 'dept4', applicants: 18, interviews: 4, hired: 1, date: '2023-03-22', status: 'completed' },
        { id: 'hire3', position: 'HR Intern', department: 'dept1', applicants: 32, interviews: 8, hired: 2, date: '2023-05-10', status: 'in-progress' },
        { id: 'hire4', position: 'Financial Analyst', department: 'dept2', applicants: 15, interviews: 3, hired: 1, date: '2023-02-18', status: 'completed' },
        { id: 'hire5', position: 'DevOps Engineer', department: 'dept3', applicants: 21, interviews: 6, hired: 1, date: '2023-01-05', status: 'completed' },
        { id: 'hire6', position: 'Content Writer', department: 'dept4', applicants: 28, interviews: 7, hired: 1, date: '2023-05-01', status: 'in-progress' },
        { id: 'hire7', position: 'Operations Coordinator', department: 'dept5', applicants: 12, interviews: 3, hired: 1, date: '2023-04-28', status: 'completed' },
        { id: 'hire8', position: 'Junior Developer', department: 'dept3', applicants: 45, interviews: 10, hired: 3, date: '2023-03-15', status: 'completed' },
        { id: 'hire9', position: 'Accountant', department: 'dept2', applicants: 17, interviews: 5, hired: 1, date: '2023-05-05', status: 'in-progress' },
        { id: 'hire10', position: 'Recruiter', department: 'dept1', applicants: 22, interviews: 6, hired: 1, date: '2023-02-10', status: 'completed' },
      ];
      
      setDepartments(mockDepartments);
      setEmployeeData(mockEmployees);
      setAttendanceData(mockAttendance);
      setPayrollData(mockPayroll);
      setHiringData(mockHiring);
      setLoading(false);
    }, 1000);
  }, []);

  const getFilteredData = () => {
    let filteredData = [];
    
    switch(activeTab) {
      case 'employee':
        filteredData = [...employeeData];
        if (departmentFilter !== 'all') {
          filteredData = filteredData.filter(emp => emp.department === departmentFilter);
        }
        break;
      case 'attendance':
        filteredData = [...attendanceData];
        filteredData = filteredData.filter(att => {
          const attDate = new Date(att.date);
          const startDate = new Date(dateRange.start);
          const endDate = new Date(dateRange.end);
          return attDate >= startDate && attDate <= endDate;
        });
        if (departmentFilter !== 'all') {
          const deptEmployees = employeeData.filter(emp => emp.department === departmentFilter).map(emp => emp.id);
          filteredData = filteredData.filter(att => deptEmployees.includes(att.employeeId));
        }
        break;
      case 'payroll':
        filteredData = [...payrollData];
        filteredData = filteredData.filter(pay => {
          const payMonth = new Date(pay.month + '-01');
          const startDate = new Date(dateRange.start);
          const endDate = new Date(dateRange.end);
          return payMonth >= startDate && payMonth <= endDate;
        });
        if (departmentFilter !== 'all') {
          const deptEmployees = employeeData.filter(emp => emp.department === departmentFilter).map(emp => emp.id);
          filteredData = filteredData.filter(pay => deptEmployees.includes(pay.employeeId));
        }
        break;
      case 'hiring':
        filteredData = [...hiringData];
        filteredData = filteredData.filter(hire => {
          const hireDate = new Date(hire.date);
          const startDate = new Date(dateRange.start);
          const endDate = new Date(dateRange.end);
          return hireDate >= startDate && hireDate <= endDate;
        });
        if (departmentFilter !== 'all') {
          filteredData = filteredData.filter(hire => hire.department === departmentFilter);
        }
        break;
      default:
        filteredData = [];
    }
    
    return filteredData;
  };

  const getChartData = () => {
    const filteredData = getFilteredData();
    
    switch(activeTab) {
      case 'employee':
        const deptCounts = {};
        filteredData.forEach(emp => {
          const deptName = departments.find(d => d.id === emp.department)?.name || 'Unknown';
          deptCounts[deptName] = (deptCounts[deptName] || 0) + 1;
        });
        
        return {
          pie: {
            labels: Object.keys(deptCounts),
            datasets: [{
              data: Object.values(deptCounts),
              backgroundColor: ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
            }]
          }
        };
      
      case 'attendance':
        const statusCounts = { present: 0, absent: 0 };
        filteredData.forEach(att => {
          if (att.status === 'present') statusCounts.present++;
          else if (att.status === 'absent') statusCounts.absent++;
        });
        
        return {
          bar: {
            labels: Object.keys(statusCounts),
            datasets: [{
              label: 'Attendance Status',
              data: Object.values(statusCounts),
              backgroundColor: ['#10B981', '#EF4444']
            }]
          }
        };
      
      case 'payroll':
        const salaryRanges = {
          '0-3000': 0,
          '3001-5000': 0,
          '5001-7000': 0,
          '7001+': 0
        };
        
        filteredData.forEach(pay => {
          const salary = pay.netSalary;
          if (salary <= 3000) salaryRanges['0-3000']++;
          else if (salary <= 5000) salaryRanges['3001-5000']++;
          else if (salary <= 7000) salaryRanges['5001-7000']++;
          else salaryRanges['7001+']++;
        });
        
        return {
          bar: {
            labels: Object.keys(salaryRanges),
            datasets: [{
              label: 'Employees by Salary Range',
              data: Object.values(salaryRanges),
              backgroundColor: '#2563EB'
            }]
          }
        };
      
      case 'hiring':
        const statusCountsHiring = { completed: 0, 'in-progress': 0 };
        filteredData.forEach(hire => {
          statusCountsHiring[hire.status] = (statusCountsHiring[hire.status] || 0) + 1;
        });
        
        const hiringTimeline = {};
        filteredData.forEach(hire => {
          const monthYear = hire.date.substring(0, 7);
          if (!hiringTimeline[monthYear]) {
            hiringTimeline[monthYear] = { applicants: 0, interviews: 0, hires: 0 };
          }
          hiringTimeline[monthYear].applicants += hire.applicants;
          hiringTimeline[monthYear].interviews += hire.interviews;
          hiringTimeline[monthYear].hires += hire.hired;
        });
        
        const sortedMonths = Object.keys(hiringTimeline).sort();
        
        return {
          pie: {
            labels: Object.keys(statusCountsHiring),
            datasets: [{
              data: Object.values(statusCountsHiring),
              backgroundColor: ['#10B981', '#2563EB']
            }]
          },
          line: {
            labels: sortedMonths,
            datasets: [
              {
                label: 'Applicants',
                data: sortedMonths.map(month => hiringTimeline[month].applicants),
                borderColor: '#2563EB',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.1
              },
              {
                label: 'Interviews',
                data: sortedMonths.map(month => hiringTimeline[month].interviews),
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.1
              },
              {
                label: 'Hires',
                data: sortedMonths.map(month => hiringTimeline[month].hires),
                borderColor: '#F59E0B',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.1
              }
            ]
          }
        };
      
      default:
        return {};
    }
  };

  const exportToExcel = () => {
    const filteredData = getFilteredData();
    let dataToExport = [];
    
    switch(activeTab) {
      case 'employee':
        dataToExport = filteredData.map(emp => ({
          'Employee ID': emp.id,
          'Name': emp.name,
          'Department': departments.find(d => d.id === emp.department)?.name || 'Unknown',
          'Position': emp.position,
          'Join Date': emp.joinDate,
          'Status': emp.status
        }));
        break;
      case 'attendance':
        dataToExport = filteredData.map(att => {
          const emp = employeeData.find(e => e.id === att.employeeId);
          return {
            'Employee': emp?.name || 'Unknown',
            'Date': att.date,
            'Status': att.status,
            'Check In': att.checkIn || 'N/A',
            'Check Out': att.checkOut || 'N/A'
          };
        });
        break;
      case 'payroll':
        dataToExport = filteredData.map(pay => {
          const emp = employeeData.find(e => e.id === pay.employeeId);
          return {
            'Employee': emp?.name || 'Unknown',
            'Month': pay.month,
            'Basic Salary': pay.basicSalary,
            'Allowances': pay.allowances,
            'Deductions': pay.deductions,
            'Net Salary': pay.netSalary,
            'Status': pay.status
          };
        });
        break;
      case 'hiring':
        dataToExport = filteredData.map(hire => ({
          'Position': hire.position,
          'Department': departments.find(d => d.id === hire.department)?.name || 'Unknown',
          'Applicants': hire.applicants,
          'Interviews': hire.interviews,
          'Hired': hire.hired,
          'Date': hire.date,
          'Status': hire.status
        }));
        break;
    }
    
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${activeTab} Report`);
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    const reportTitle = `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report`;
    saveAs(data, `${reportTitle}.xlsx`);
    
    addToReportHistory(reportTitle, 'excel');
  };

  const addToReportHistory = (title, format) => {
    const newReport = {
      id: Date.now().toString(),
      title,
      type: activeTab,
      format,
      date: new Date().toLocaleString(),
      filters: {
        dateRange,
        department: departmentFilter === 'all' ? 'All' : departments.find(d => d.id === departmentFilter)?.name
      }
    };
    setGeneratedReports(prev => [newReport, ...prev]);
  };

  const renderDataTable = () => {
    const filteredData = getFilteredData();
    
    if (filteredData.length === 0) {
      return <div className="text-center py-8 text-gray-500">No data available for the selected filters</div>;
    }
    
    switch(activeTab) {
      case 'employee':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Department</th>
                  <th className="py-2 px-4 border">Position</th>
                  <th className="py-2 px-4 border">Join Date</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((emp, index) => (
                  <tr key={emp.id} className={`even:bg-gray-50 hover:bg-gray-100`}>
                    <td className="py-2 px-4 border">{emp.id}</td>
                    <td className="py-2 px-4 border">{emp.name}</td>
                    <td className="py-2 px-4 border">{departments.find(d => d.id === emp.department)?.name || 'Unknown'}</td>
                    <td className="py-2 px-4 border">{emp.position}</td>
                    <td className="py-2 px-4 border">{emp.joinDate}</td>
                    <td className="py-2 px-4 border">
                      <span className={`flex items-center px-2 py-1 rounded-full text-xs ${
                        emp.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {emp.status === 'active' ? <HiCheck className="w-3 h-3 mr-1" /> : <HiX className="w-3 h-3 mr-1" />}
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'attendance':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">Employee</th>
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Check In</th>
                  <th className="py-2 px-4 border">Check Out</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((att, index) => {
                  const emp = employeeData.find(e => e.id === att.employeeId);
                  return (
                    <tr key={att.id} className={`even:bg-gray-50 hover:bg-gray-100`}>
                      <td className="py-2 px-4 border">{emp?.name || 'Unknown'}</td>
                      <td className="py-2 px-4 border">{att.date}</td>
                      <td className="py-2 px-4 border">
                        <span className={`flex items-center px-2 py-1 rounded-full text-xs ${
                          att.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {att.status === 'present' ? <HiCheck className="w-3 h-3 mr-1" /> : <HiX className="w-3 h-3 mr-1" />}
                          {att.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 border">{att.checkIn || 'N/A'}</td>
                      <td className="py-2 px-4 border">{att.checkOut || 'N/A'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      
      case 'payroll':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">Employee</th>
                  <th className="py-2 px-4 border">Month</th>
                  <th className="py-2 px-4 border">Basic Salary</th>
                  <th className="py-2 px-4 border">Allowances</th>
                  <th className="py-2 px-4 border">Deductions</th>
                  <th className="py-2 px-4 border">Net Salary</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((pay, index) => {
                  const emp = employeeData.find(e => e.id === pay.employeeId);
                  return (
                    <tr key={pay.id} className={`even:bg-gray-50 hover:bg-gray-100`}>
                      <td className="py-2 px-4 border">{emp?.name || 'Unknown'}</td>
                      <td className="py-2 px-4 border">{pay.month}</td>
                      <td className="py-2 px-4 border">{pay.basicSalary}</td>
                      <td className="py-2 px-4 border">{pay.allowances}</td>
                      <td className="py-2 px-4 border">{pay.deductions}</td>
                      <td className="py-2 px-4 border font-medium">{pay.netSalary}</td>
                      <td className="py-2 px-4 border">
                        <span className={`flex items-center px-2 py-1 rounded-full text-xs ${
                          pay.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {pay.status === 'paid' ? <HiCheck className="w-3 h-3 mr-1" /> : <HiClock className="w-3 h-3 mr-1" />}
                          {pay.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      
      case 'hiring':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">Position</th>
                  <th className="py-2 px-4 border">Department</th>
                  <th className="py-2 px-4 border">Applicants</th>
                  <th className="py-2 px-4 border">Interviews</th>
                  <th className="py-2 px-4 border">Hired</th>
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((hire, index) => (
                  <tr key={hire.id} className={`even:bg-gray-50 hover:bg-gray-100`}>
                    <td className="py-2 px-4 border">{hire.position}</td>
                    <td className="py-2 px-4 border">{departments.find(d => d.id === hire.department)?.name || 'Unknown'}</td>
                    <td className="py-2 px-4 border">{hire.applicants}</td>
                    <td className="py-2 px-4 border">{hire.interviews}</td>
                    <td className="py-2 px-4 border">{hire.hired}</td>
                    <td className="py-2 px-4 border">{hire.date}</td>
                    <td className="py-2 px-4 border">
                      <span className={`flex items-center px-2 py-1 rounded-full text-xs ${
                        hire.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {hire.status === 'completed' ? <HiCheck className="w-3 h-3 mr-1" /> : <HiClock className="w-3 h-3 mr-1" />}
                        {hire.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderCharts = () => {
    const chartData = getChartData();
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {chartData.pie && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Distribution</h3>
            <Pie 
              data={chartData.pie} 
              options={{ 
                responsive: true,
                plugins: { legend: { position: 'right' } },
                animation: { duration: 1000, easing: 'easeOutQuart' }
              }} 
            />
          </div>
        )}
        {chartData.bar && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Statistics</h3>
            <Bar 
              data={chartData.bar} 
              options={{ 
                responsive: true,
                scales: { y: { beginAtZero: true } },
                animation: { duration: 1000, easing: 'easeOutQuart' }
              }} 
            />
          </div>
        )}
        {chartData.line && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Hiring Trends</h3>
            <Line 
              data={chartData.line} 
              options={{ 
                responsive: true,
                scales: { y: { beginAtZero: true } },
                animation: { duration: 1000, easing: 'easeOutQuart' }
              }} 
            />
          </div>
        )}
      </div>
    );
  };

  const renderSummary = () => {
    const filteredData = getFilteredData();
    
    let summary = [];
    
    switch(activeTab) {
      case 'employee':
        const activeCount = filteredData.filter(emp => emp.status === 'active').length;
        const inactiveCount = filteredData.filter(emp => emp.status === 'inactive').length;
        summary = [
          { label: 'Total Employees', value: filteredData.length, icon: HiUserGroup },
          { label: 'Active Employees', value: activeCount, icon: HiCheckCircle },
          { label: 'Inactive Employees', value: inactiveCount, icon: HiXCircle },
          { label: 'Departments', value: [...new Set(filteredData.map(emp => emp.department))].length, icon: HiOfficeBuilding },
        ];
        break;
      case 'attendance':
        const presentCount = filteredData.filter(att => att.status === 'present').length;
        const absentCount = filteredData.filter(att => att.status === 'absent').length;
        const attendanceRate = filteredData.length > 0 ? `${Math.round((presentCount / filteredData.length) * 100)}%` : '0%';
        summary = [
          { label: 'Total Records', value: filteredData.length, icon: HiCalendar },
          { label: 'Present', value: presentCount, icon: HiCheck },
          { label: 'Absent', value: absentCount, icon: HiX },
          { label: 'Attendance Rate', value: attendanceRate, icon: HiChartBar },
        ];
        break;
      case 'payroll':
        const totalSalary = filteredData.reduce((sum, pay) => sum + pay.netSalary, 0);
        const averageSalary = filteredData.length > 0 ? Math.round(totalSalary / filteredData.length) : 0;
        const paidCount = filteredData.filter(pay => pay.status === 'paid').length;
        summary = [
          { label: 'Total Records', value: filteredData.length, icon: HiCreditCard },
          { label: 'Total Salary Paid', value: totalSalary, icon: HiCurrencyDollar },
          { label: 'Average Salary', value: averageSalary, icon: HiCalculator },
          { label: 'Paid', value: paidCount, icon: HiCheckCircle },
          { label: 'Pending', value: filteredData.length - paidCount, icon: HiClock },
        ];
        break;
      case 'hiring':
        const completedCount = filteredData.filter(hire => hire.status === 'completed').length;
        const inProgressCount = filteredData.filter(hire => hire.status === 'in-progress').length;
        const totalApplicants = filteredData.reduce((sum, hire) => sum + hire.applicants, 0);
        const totalHires = filteredData.reduce((sum, hire) => sum + hire.hired, 0);
        const hireRate = totalApplicants > 0 ? `${Math.round((totalHires / totalApplicants) * 100)}%` : '0%';
        summary = [
          { label: 'Total Positions', value: filteredData.length, icon: HiBriefcase },
          { label: 'Completed', value: completedCount, icon: HiCheckCircle },
          { label: 'In Progress', value: inProgressCount, icon: HiClock },
          { label: 'Total Applicants', value: totalApplicants, icon: HiUserGroup },
          { label: 'Total Hires', value: totalHires, icon: HiUserAdd },
          { label: 'Hire Rate', value: hireRate, icon: HiChartPie },
        ];
        break;
    }
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {summary.map((item, index) => (
          <div key={index} className="group bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <item.icon className="w-8 h-8 text-blue-500 mr-3 transform group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
                <p className="text-2xl font-bold text-gray-800">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const tabs = [
    { id: 'employee', label: 'Employee Reports', icon: HiUser },
    { id: 'attendance', label: 'Attendance Reports', icon: HiCalendar },
    { id: 'payroll', label: 'Payroll Reports', icon: HiCurrencyDollar },
    { id: 'hiring', label: 'Hiring Reports', icon: HiUserAdd },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-violet-800">Reports</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="flex border-b mb-6 bg-white rounded-lg shadow">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex items-center py-3 px-6 font-medium transition-colors duration-200 ${
                  activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-medium mb-4 text-gray-800">Report Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center mb-1">
                  <HiCalendar className="w-5 h-5 mr-2 text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">Date Range</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  />
                  <span className="self-center text-gray-500">to</span>
                  <input
                    type="date"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <HiOfficeBuilding className="w-5 h-5 mr-2 text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">Department</label>
                </div>
                <select
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <HiDownload className="w-5 h-5 mr-2 text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">Export Report</label>
                </div>
                <button
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transform hover:scale-105 transition-transform"
                  onClick={exportToExcel}
                >
                  <HiDownload className="w-5 h-5 mr-2" />
                  Export to Excel
                </button>
              </div>
            </div>
          </div>
          
          {renderSummary()}
          {renderCharts()}
          
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h2 className="text-xl font-medium mb-4 text-gray-800">Report Data</h2>
            {renderDataTable()}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h2 className="text-xl font-medium mb-4 text-gray-800">Generated Reports History</h2>
            {generatedReports.length === 0 ? (
              <p className="text-gray-500">No reports generated yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border text-left">Title</th>
                      <th className="py-2 px-4 border text-left">Type</th>
                      <th className="py-2 px-4 border text-left">Format</th>
                      <th className="py-2 px-4 border text-left">Date</th>
                      <th className="py-2 px-4 border text-left">Filters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedReports.map((report, index) => (
                      <tr key={report.id} className={`even:bg-gray-50 hover:bg-gray-100`}>
                        <td className="py-2 px-4 border">{report.title}</td>
                        <td className="py-2 px-4 border capitalize">{report.type}</td>
                        <td className="py-2 px-4 border uppercase">{report.format}</td>
                        <td className="py-2 px-4 border">{report.date}</td>
                        <td className="py-2 px-4 border">
                          <div className="text-sm">
                            <div>Dates: {report.filters.dateRange.start} to {report.filters.dateRange.end}</div>
                            <div>Department: {report.filters.department}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;