

import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiDollarSign,
  FiCheckCircle,
  FiDownload,
  FiPrinter,
} from "react-icons/fi";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Process Payroll</h1>
      {!isProcessed ? (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Payroll Period
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={payrollPeriod.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={payrollPeriod.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pay Date
              </label>
              <input
                type="date"
                name="payDate"
                value={payrollPeriod.payDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Select Employees
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={
                        selectedEmployees.length === employees.length &&
                        employees.length > 0
                      }
                      onChange={selectAllEmployees}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>{" "}
                  {/* Added */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Basic Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Salary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={() => toggleEmployeeSelection(employee.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.employeeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.position}
                    </td>{" "}
                    {/* Added */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${employee.basicSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ${calculateNetSalary(employee).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={processPayroll}
              disabled={
                !payrollPeriod.startDate ||
                !payrollPeriod.endDate ||
                !payrollPeriod.payDate ||
                selectedEmployees.length === 0 ||
                isProcessing
              }
              className={`px-6 py-2 rounded-md text-white ${
                isProcessing ||
                !payrollPeriod.startDate ||
                !payrollPeriod.endDate ||
                !payrollPeriod.payDate ||
                selectedEmployees.length === 0
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isProcessing ? "Processing..." : "Process Payroll"}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Payroll Processed Successfully
            </h2>
           
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex items-center">
              <FiCheckCircle className="text-green-500 mr-3" size={24} />
              <div>
                <h3 className="text-lg font-medium text-green-800">
                  Payroll Processed
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  The payroll for {processedData.employees.length} employees has
                  been processed successfully. Total amount: $
                  {processedData.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">
                Payroll Period
              </h3>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {processedData.period.startDate} to{" "}
                {processedData.period.endDate}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">
                Payment Date
              </h3>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {processedData.period.payDate}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">
                Total Amount
              </h3>
              <p className="text-lg font-semibold text-green-600 mt-1">
                ${processedData.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Processed Employees
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Basic Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Salary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processedData.employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.employeeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${employee.basicSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ${calculateNetSalary(employee).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsProcessed(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Process New Payroll
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessPayroll;
