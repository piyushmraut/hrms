import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiFilter, FiDownload } from 'react-icons/fi';

const EmployeeSalaryManagement = () => {
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

  // const handleExport = () => {
  //   const headers = ['Employee ID', 'Name', 'Department', 'Position', 'Basic Salary', 'Allowances', 'Deductions', 'Tax Rate', 'Bank Name', 'Account Number', 'IFSC Code'];
  //   const csvRows = [
  //     headers.join(','),
  //     ...employees.map(emp => [
  //       emp.employeeId,
  //       emp.name,
  //       emp.department,
  //       emp.position,
  //       emp.basicSalary,
  //       emp.allowances,
  //       emp.deductions,
  //       emp.taxRate,
  //       emp.bankDetails.bankName,
  //       emp.bankDetails.accountNumber,
  //       emp.bankDetails.ifscCode
  //     ].join(','))
  //   ];
  //   const csvString = csvRows.join('\n');
  //   const blob = new Blob([csvString], { type: 'text/csv' });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = 'employee_salaries.csv';
  //   link.click();
  //   URL.revokeObjectURL(url);
  // };

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
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employee Salary Management</h1>
        <button onClick={handleAddEmployee} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center">
          <FiPlus className="mr-2" /> Add Employee Salary
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees by name or ID..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50">
              <FiFilter /> Filter
            </button>
            <button onClick={handleExport} className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50">
              <FiDownload /> Export
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map(employee => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.employeeId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.basicSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${calculateNetSalary(employee).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button onClick={() => handleEditEmployee(employee)} className="text-blue-600 hover:text-blue-800"><FiEdit2 /></button>
                      <button onClick={() => handleDeleteEmployee(employee.id)} className="text-red-600 hover:text-red-800"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Add Employee Salary</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary ($)</label>
                  <input
                    type="number"
                    name="basicSalary"
                    value={formData.basicSalary}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allowances ($)</label>
                  <input
                    type="number"
                    name="allowances"
                    value={formData.allowances}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deductions ($)</label>
                  <input
                    type="number"
                    name="deductions"
                    value={formData.deductions}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                  <input
                    type="number"
                    name="taxRate"
                    value={formData.taxRate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Bank Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankDetails.bankName}
                        onChange={handleBankDetailsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.bankDetails.accountNumber}
                        onChange={handleBankDetailsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                      <input
                        type="text"
                        name="ifscCode"
                        value={formData.bankDetails.ifscCode}
                        onChange={handleBankDetailsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Edit Employee Salary</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary ($)</label>
                  <input
                    type="number"
                    name="basicSalary"
                    value={formData.basicSalary}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allowances ($)</label>
                  <input
                    type="number"
                    name="allowances"
                    value={formData.allowances}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deductions ($)</label>
                  <input
                    type="number"
                    name="deductions"
                    value={formData.deductions}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                  <input
                    type="number"
                    name="taxRate"
                    value={formData.taxRate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Bank Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankDetails.bankName}
                        onChange={handleBankDetailsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.bankDetails.accountNumber}
                        onChange={handleBankDetailsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                      <input
                        type="text"
                        name="ifscCode"
                        value={formData.bankDetails.ifscCode}
                        onChange={handleBankDetailsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSalaryManagement;