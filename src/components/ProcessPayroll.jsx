import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentReport,
  HiOutlineCheckCircle,
  HiOutlineDownload,
  HiOutlinePrinter,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
  HiOutlineBadgeCheck,
  HiOutlineClipboardCheck,
} from "react-icons/hi";

const ProcessPayroll = () => {
  const [payrollPeriod, setPayrollPeriod] = useState({
    startDate: "",
    endDate: "",
    payDate: "",
  });
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [processedData, setProcessedData] = useState(null);

  useEffect(() => {
    const storedEmployees = localStorage.getItem("payroll_employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayrollPeriod((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEmployeeSelection = (employeeId) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const selectAllEmployees = () => {
    setSelectedEmployees(
      selectedEmployees.length === employees.length
        ? []
        : employees.map((emp) => emp.id)
    );
  };

  const calculateNetSalary = (employee) => {
    const grossSalary = employee.basicSalary + employee.allowances;
    const taxAmount = (grossSalary * employee.taxRate) / 100;
    return grossSalary - taxAmount - employee.deductions;
  };

  const processPayroll = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const selectedEmpData = employees.filter((emp) =>
        selectedEmployees.includes(emp.id)
      );
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const endDate = new Date(payrollPeriod.endDate);
      const period = `${
        monthNames[endDate.getMonth()]
      } ${endDate.getFullYear()}`;

      const payslips = selectedEmpData.map((emp) => {
        const grossSalary = emp.basicSalary + emp.allowances;
        const taxAmount = (grossSalary * emp.taxRate) / 100;
        const netSalary = grossSalary - taxAmount - emp.deductions;
        return {
          id: Date.now() + Math.random(),
          employeeId: emp.employeeId,
          name: emp.name,
          department: emp.department,
          position: emp.position,
          period: period,
          issueDate: payrollPeriod.payDate,
          basicSalary: emp.basicSalary,
          allowances: emp.allowances,
          deductions: emp.deductions,
          tax: taxAmount,
          netSalary: netSalary,
          status: "Paid",
          bankDetails: emp.bankDetails,
        };
      });

      const existingPayslips = JSON.parse(
        localStorage.getItem("payroll_payslips") || "[]"
      );
      localStorage.setItem(
        "payroll_payslips",
        JSON.stringify([...existingPayslips, ...payslips])
      );

      const totalAmount = payslips.reduce(
        (sum, payslip) => sum + payslip.netSalary,
        0
      );
      setProcessedData({
        period: payrollPeriod,
        employees: selectedEmpData,
        totalAmount,
        processedDate: new Date().toISOString().split("T")[0],
      });

      setIsProcessing(false);
      setIsProcessed(true);
    }, 1500);
  };

  const handlePrint = () => {
    alert("Print functionality would be implemented here");
  };

  const handleDownload = () => {
    if (!processedData) return;
    const headers = ["Employee ID", "Name", "Department", "Net Salary"];
    const csvRows = [
      headers.join(","),
      ...processedData.employees.map((emp) =>
        [
          emp.employeeId,
          emp.name,
          emp.department,
          calculateNetSalary(emp),
        ].join(",")
      ),
    ];
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `payroll_${processedData.processedDate}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 min-h-screen border border-violet-600">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-8"
      >
        <div className="bg-indigo-600 p-3 rounded-lg mr-4 shadow-lg">
          <HiOutlineDocumentReport className="text-white" size={16} />
        </div>
        <h1 className="text-2xl font-bold text-indigo-800">Process Payroll</h1>
      </motion.div>

      {!isProcessed ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-xl p-8 mb-6 border-t-4 border-indigo-500"
        >
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
              >
                <HiOutlineCalendar className="text-indigo-600" size={24} />
              </motion.div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Payroll Period
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineCalendar className="text-indigo-500" />
                </div>
                <input
                  type="date"
                  name="startDate"
                  value={payrollPeriod.startDate}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineCalendar className="text-indigo-500" />
                </div>
                <input
                  type="date"
                  name="endDate"
                  value={payrollPeriod.endDate}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pay Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineCalendar className="text-indigo-500" />
                </div>
                <input
                  type="date"
                  name="payDate"
                  value={payrollPeriod.payDate}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
              >
                <HiOutlineUserGroup className="text-indigo-600" size={24} />
              </motion.div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Select Employees
            </h2>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    selectedEmployees.length === employees.length &&
                    employees.length > 0
                  }
                  onChange={selectAllEmployees}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Select All</span>
              </div>
              <div className="text-sm text-indigo-600 font-medium">
                {selectedEmployees.length} of {employees.length} selected
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mb-8 rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          selectedEmployees.length === employees.length &&
                          employees.length > 0
                        }
                        onChange={selectAllEmployees}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Basic Salary
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Net Salary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {employees.map((employee) => (
                  <tr 
                    key={employee.id} 
                    className="hover:bg-indigo-50 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={() => toggleEmployeeSelection(employee.id)}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.employeeId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <HiOutlineOfficeBuilding className="text-indigo-500 mr-2" />
                        <span className="text-sm text-gray-700">{employee.department}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{employee.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${employee.basicSalary.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-emerald-600">
                        ${calculateNetSalary(employee).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={processPayroll}
              disabled={
                !payrollPeriod.startDate ||
                !payrollPeriod.endDate ||
                !payrollPeriod.payDate ||
                selectedEmployees.length === 0 ||
                isProcessing
              }
              className={`flex items-center px-6 py-3 rounded-lg text-white shadow-lg ${
                isProcessing ||
                !payrollPeriod.startDate ||
                !payrollPeriod.endDate ||
                !payrollPeriod.payDate ||
                selectedEmployees.length === 0
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              }`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <HiOutlineCurrencyDollar className="mr-2" size={20} />
                  Process Payroll
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-emerald-500"
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="bg-emerald-100 p-3 rounded-full mr-4"
              >
                <HiOutlineCheckCircle className="text-emerald-600" size={28} />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800">
                Payroll Processed Successfully
              </h2>
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition duration-200"
              >
                <HiOutlineDownload className="mr-2" />
                Export CSV
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition duration-200"
              >
                <HiOutlinePrinter className="mr-2" />
                Print
              </motion.button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-l-4 border-emerald-500 p-6 mb-8 rounded-lg">
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-emerald-500 mr-4"
              >
                <HiOutlineBadgeCheck size={40} />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-emerald-800">
                  Payroll Processed
                </h3>
                <p className="text-emerald-700 mt-1">
                  The payroll for {processedData.employees.length} employees has
                  been processed successfully. Total amount: $
                  {processedData.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-md border border-indigo-100"
            >
              <div className="flex items-center mb-3 text-indigo-600">
                <HiOutlineCalendar size={20} className="mr-2" />
                <h3 className="text-sm font-medium uppercase">
                  Payroll Period
                </h3>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {processedData.period.startDate} to{" "}
                {processedData.period.endDate}
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-md border border-indigo-100"
            >
              <div className="flex items-center mb-3 text-indigo-600">
                <HiOutlineCalendar size={20} className="mr-2" />
                <h3 className="text-sm font-medium uppercase">
                  Payment Date
                </h3>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {processedData.period.payDate}
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl shadow-md border border-emerald-100"
            >
              <div className="flex items-center mb-3 text-emerald-600">
                <HiOutlineCurrencyDollar size={20} className="mr-2" />
                <h3 className="text-sm font-medium uppercase">
                  Total Amount
                </h3>
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                ${processedData.totalAmount.toLocaleString()}
              </p>
            </motion.div>
          </div>

          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
              >
                <HiOutlineClipboardCheck className="text-indigo-600" size={24} />
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Processed Employees
            </h3>
          </div>
          
          <div className="overflow-x-auto mb-8 rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Basic Salary
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Net Salary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {processedData.employees.map((employee) => (
                  <tr 
                    key={employee.id}
                    className="hover:bg-indigo-50 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.employeeId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <HiOutlineOfficeBuilding className="text-indigo-500 mr-2" />
                        <span className="text-sm text-gray-700">{employee.department}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${employee.basicSalary.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-emerald-600">
                        ${calculateNetSalary(employee).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProcessed(false)}
              className="flex items-center px-6 py-3 rounded-lg text-white shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition duration-300"
            >
              <HiOutlineClipboardCheck className="mr-2" size={20} />
              Process New Payroll
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProcessPayroll;