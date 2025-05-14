import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiPlus, 
  FiFilter, 
  FiDownload, 
  FiDollarSign, 
  FiUsers, 
  FiUser, 
  FiPercent, 
  FiCreditCard, 
  FiClipboard 
} from 'react-icons/fi';

const EmployeeSalaryManagement = () => {
  // All the useState and useEffect blocks remain the same
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    department: '',
    position: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    taxRate: '',
    bankDetails: { bankName: '', accountNumber: '', ifscCode: '' }
  });

  // Predefined options for dropdowns
  const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Operations'];
  const positions = ['Software Engineer', 'Marketing Manager', 'HR Specialist', 'Accountant', 'Senior Developer', 'Operations Manager'];

  // Load employees from localStorage
  useEffect(() => {
    const storedEmployees = localStorage.getItem('payroll_employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      const dummyData = [
        { id: 1, employeeId: 'EMP001', name: 'John Doe', department: 'Engineering', position: 'Software Engineer', basicSalary: 7500, allowances: 1500, deductions: 500, taxRate: 15, bankDetails: { bankName: 'ABC Bank', accountNumber: '1234567890', ifscCode: 'ABCB0001234' } },
        { id: 2, employeeId: 'EMP002', name: 'Jane Smith', department: 'Marketing', position: 'Marketing Manager', basicSalary: 8500, allowances: 2000, deductions: 700, taxRate: 18, bankDetails: { bankName: 'XYZ Bank', accountNumber: '0987654321', ifscCode: 'XYZB0004321' } },
        { id: 3, employeeId: 'EMP003', name: 'Robert Johnson', department: 'HR', position: 'HR Specialist', basicSalary: 6500, allowances: 1200, deductions: 400, taxRate: 12, bankDetails: { bankName: 'DEF Bank', accountNumber: '1122334455', ifscCode: 'DEFB0001122' } },
        { id: 4, employeeId: 'EMP004', name: 'Emily Davis', department: 'Finance', position: 'Accountant', basicSalary: 7000, allowances: 1300, deductions: 450, taxRate: 14, bankDetails: { bankName: 'GHI Bank', accountNumber: '6677889900', ifscCode: 'GHIB0003344' } },
        { id: 5, employeeId: 'EMP005', name: 'Michael Wilson', department: 'Engineering', position: 'Senior Developer', basicSalary: 9000, allowances: 2500, deductions: 800, taxRate: 20, bankDetails: { bankName: 'JKL Bank', accountNumber: '5566778899', ifscCode: 'JKLB0005566' } },
      ];
      setEmployees(dummyData);
      localStorage.setItem('payroll_employees', JSON.stringify(dummyData));
    }
  }, []);

  // Save employees to localStorage whenever they change
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('payroll_employees', JSON.stringify(employees));
    }
  }, [employees]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    setIsAddModalOpen(true);
    setFormData({
      employeeId: '',
      name: '',
      department: '',
      position: '',
      basicSalary: '',
      allowances: '',
      deductions: '',
      taxRate: '',
      bankDetails: { bankName: '', accountNumber: '', ifscCode: '' }
    });
  };

  const handleEditEmployee = (employee) => {
    setIsEditModalOpen(true);
    setCurrentEmployee(employee);
    setFormData({
      employeeId: employee.employeeId,
      name: employee.name,
      department: employee.department,
      position: employee.position,
      basicSalary: employee.basicSalary,
      allowances: employee.allowances,
      deductions: employee.deductions,
      taxRate: employee.taxRate,
      bankDetails: employee.bankDetails || { bankName: '', accountNumber: '', ifscCode: '' }
    });
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee salary record?')) {
      setEmployees(employees.filter(employee => employee.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [name]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: isAddModalOpen ? employees.length + 1 : currentEmployee.id,
      employeeId: formData.employeeId,
      name: formData.name,
      department: formData.department,
      position: formData.position,
      basicSalary: Number(formData.basicSalary),
      allowances: Number(formData.allowances),
      deductions: Number(formData.deductions),
      taxRate: Number(formData.taxRate),
      bankDetails: formData.bankDetails
    };
    if (isAddModalOpen) {
      setEmployees([...employees, newEmployee]);
    } else {
      setEmployees(employees.map(emp => emp.id === currentEmployee.id ? newEmployee : emp));
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const calculateNetSalary = (employee) => {
    const grossSalary = employee.basicSalary + employee.allowances;
    const taxAmount = (grossSalary * employee.taxRate) / 100;
    return grossSalary - taxAmount - employee.deductions;
  };

  const handleExport = () => {
    import('xlsx').then((XLSX) => {
      // Prepare the data for export
      const data = employees.map(emp => ({
        'Employee ID': emp.employeeId,
        'Name': emp.name,
        'Department': emp.department,
        'Position': emp.position,
        'Basic Salary': emp.basicSalary,
        'Allowances': emp.allowances,
        'Deductions': emp.deductions,
        'Tax Rate (%)': emp.taxRate,
        'Net Salary': calculateNetSalary(emp),
        'Bank Name': emp.bankDetails.bankName,
        'Account Number': emp.bankDetails.accountNumber,
        'IFSC Code': emp.bankDetails.ifscCode
      }));
  
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Salaries");
      
      // Generate the Excel file and trigger download
      XLSX.writeFile(workbook, "employee_salaries.xlsx", {
        compression: true,
        bookType: 'xlsx'
      });
    });
  };

  const IconWrapper = ({ children }) => (
    <motion.div
      className="inline-block"
      whileHover={{ scale: 1.2, rotate: 5 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );

  // Animations for table rows
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      }
    })
  };

  return (
    <div className=" bg-gradient-to-b from-blue-50 to-indigo-50 p-6 border border-violet-600">
      <div className="max-w-8xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center">
            <IconWrapper>
              <FiUsers className="mr-3 text-3xl text-indigo-600" />
            </IconWrapper>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Employee Salary Management
            </h1>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddEmployee} 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-6 rounded-lg flex items-center shadow-md"
          >
            <IconWrapper>
              <FiPlus className="mr-2" />
            </IconWrapper>
            Add Employee Salary
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-5 mb-8 backdrop-blur-sm bg-opacity-80"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-3 text-indigo-400" />
              <input
                type="text"
                placeholder="Search employees by name or ID..."
                className="pl-12 pr-4 py-3 w-full border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white bg-opacity-70"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-white py-2 px-4 rounded-xl hover:from-teal-500 hover:to-cyan-500 shadow-md"
              >
                <IconWrapper>
                  <FiFilter className="text-white" />
                </IconWrapper>
                Filter
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport} 
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white py-2 px-4 rounded-xl hover:from-amber-500 hover:to-orange-500 shadow-md"
              >
                <IconWrapper>
                  <FiDownload className="text-white" />
                </IconWrapper>
                Export
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-100">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    <div className="flex items-center">
                      <IconWrapper>
                        <FiClipboard className="mr-2 text-white" />
                      </IconWrapper>
                      Employee ID
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    <div className="flex items-center">
                      <IconWrapper>
                        <FiUser className="mr-2 text-white" />
                      </IconWrapper>
                      Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Position</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    <div className="flex items-center">
                      <IconWrapper>
                        <FiDollarSign className="mr-2 text-white" />
                      </IconWrapper>
                      Basic Salary
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    <div className="flex items-center">
                      <IconWrapper>
                        <FiDollarSign className="mr-2 text-white" />
                      </IconWrapper>
                      Net Salary
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-indigo-50">
                {filteredEmployees.map((employee, i) => (
                  <motion.tr 
                    key={employee.id} 
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={rowVariants}
                    className="hover:bg-indigo-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.employeeId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-800">{employee.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {employee.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">₹{employee.basicSalary.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">₹{calculateNetSalary(employee).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-3">
                        <motion.button 
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditEmployee(employee)} 
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteEmployee(employee.id)} 
                          className="text-rose-600 hover:text-rose-900"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
          >
            <div className="px-6 py-4 border-b border-indigo-100 flex items-center">
              <IconWrapper>
                <FiPlus className="mr-3 text-indigo-600" />
              </IconWrapper>
              <h2 className="text-xl font-semibold text-indigo-800">Add Employee Salary</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Employee Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Position</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Position</option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Basic Salary (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-indigo-400" />
                    </div>
                    <input
                      type="number"
                      name="basicSalary"
                      value={formData.basicSalary}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Allowances (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-indigo-400" />
                    </div>
                    <input
                      type="number"
                      name="allowances"
                      value={formData.allowances}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Deductions (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-indigo-400" />
                    </div>
                    <input
                      type="number"
                      name="deductions"
                      value={formData.deductions}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Tax Rate (%)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPercent className="text-indigo-400" />
                    </div>
                    <input
                      type="number"
                      name="taxRate"
                      value={formData.taxRate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center mb-2">
                    <IconWrapper>
                      <FiCreditCard className="mr-2 text-indigo-600" />
                    </IconWrapper>
                    <h3 className="text-lg font-medium text-indigo-800">Bank Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-indigo-50 p-4 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Bank Name</label>
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankDetails.bankName}
                        onChange={handleBankDetailsChange}
                        className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.bankDetails.accountNumber}
                        onChange={handleBankDetailsChange}
                        className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-1">IFSC Code</label>
                      <input
                        type="text"
                        name="ifscCode"
                        value={formData.bankDetails.ifscCode}
                        onChange={handleBankDetailsChange}
                        className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md"
                >
                  Save Employee
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
          >
            <div className="px-6 py-4 border-b border-indigo-100 flex items-center">
              <IconWrapper>
                <FiEdit2 className="mr-3 text-indigo-600" />
              </IconWrapper>
              <h2 className="text-xl font-semibold text-indigo-800">Edit Employee Salary</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Employee Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Position</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Position</option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Basic Salary (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-indigo-400" />
                    </div>
                    <input
                      type="number"
                      name="basicSalary"
                      value={formData.basicSalary}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Allowances (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-indigo-400" />
                    </div>
                    <input
                      type="number"
                      name="allowances"
                      value={formData.allowances}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Deductions (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-indigo-400" />
                    </div>
                    <input
                      type="number"
                      name="deductions"
                      value={formData.deductions}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Tax Rate (%)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPercent className="text-indigo-400" />
                    </div>
                    <input
                      type="number"
                      name="taxRate"
                      value={formData.taxRate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center mb-2">
                    <IconWrapper>
                      <FiCreditCard className="mr-2 text-indigo-600" />
                    </IconWrapper>
                    <h3 className="text-lg font-medium text-indigo-800">Bank Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-indigo-50 p-4 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Bank Name</label>
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankDetails.bankName}
                        onChange={handleBankDetailsChange}
                        className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.bankDetails.accountNumber}
                        onChange={handleBankDetailsChange}
                        className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-1">IFSC Code</label>
                      <input
                        type="text"
                        name="ifscCode"
                        value={formData.bankDetails.ifscCode}
                        onChange={handleBankDetailsChange}
                        className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md"
                >
                  Update Employee
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EmployeeSalaryManagement;