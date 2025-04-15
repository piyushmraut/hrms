// import React, { useState, useEffect } from 'react';
// import { FiSearch, FiDownload, FiPrinter, FiMail, FiCalendar } from 'react-icons/fi';

// const PayslipGenerator = () => {
//   const [payslips, setPayslips] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [selectedPayslip, setSelectedPayslip] = useState(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);

//   // Simulated payslip data
//   useEffect(() => {
//     const dummyPayslips = [
//       { 
//         id: 1, 
//         employeeId: 'EMP001', 
//         name: 'John Doe', 
//         department: 'Engineering', 
//         position: 'Software Engineer',
//         period: 'June 2023',
//         issueDate: '2023-06-30',
//         basicSalary: 7500,
//         allowances: 1500,
//         overtime: 500,
//         bonuses: 1000,
//         deductions: 500,
//         tax: 1125,
//         netSalary: 8875,
//         status: 'Paid'
//       },
//       { 
//         id: 2, 
//         employeeId: 'EMP002', 
//         name: 'Jane Smith', 
//         department: 'Marketing', 
//         position: 'Marketing Manager',
//         period: 'June 2023',
//         issueDate: '2023-06-30',
//         basicSalary: 8500,
//         allowances: 2000,
//         overtime: 300,
//         bonuses: 1500,
//         deductions: 700,
//         tax: 1530,
//         netSalary: 10070,
//         status: 'Paid'
//       },
//       { 
//         id: 3, 
//         employeeId: 'EMP003', 
//         name: 'Robert Johnson', 
//         department: 'HR', 
//         position: 'HR Specialist',
//         period: 'June 2023',
//         issueDate: '2023-06-30',
//         basicSalary: 6500,
//         allowances: 1200,
//         overtime: 200,
//         bonuses: 800,
//         deductions: 400,
//         tax: 780,
//         netSalary: 7520,
//         status: 'Paid'
//       },
//       { 
//         id: 4, 
//         employeeId: 'EMP004', 
//         name: 'Emily Davis', 
//         department: 'Finance', 
//         position: 'Accountant',
//         period: 'May 2023',
//         issueDate: '2023-05-31',
//         basicSalary: 7000,
//         allowances: 1300,
//         overtime: 400,
//         bonuses: 900,
//         deductions: 450,
//         tax: 910,
//         netSalary: 8240,
//         status: 'Paid'
//       },
//       { 
//         id: 5, 
//         employeeId: 'EMP005', 
//         name: 'Michael Wilson', 
//         department: 'Engineering', 
//         position: 'Senior Developer',
//         period: 'May 2023',
//         issueDate: '2023-05-31',
//         basicSalary: 9000,
//         allowances: 2500,
//         overtime: 600,
//         bonuses: 2000,
//         deductions: 800,
//         tax: 1800,
//         netSalary: 11500,
//         status: 'Paid'
//       },
//     ];
//     setPayslips(dummyPayslips);
//   }, []);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredPayslips = payslips.filter(payslip =>
//     (payslip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     payslip.employeeId.toLowerCase().includes(searchTerm.toLowerCase())) &&
//     (selectedMonth === '' || payslip.period.includes(selectedMonth))
//   );

//   const handleViewPayslip = (payslip) => {
//     setSelectedPayslip(payslip);
//     setIsViewModalOpen(true);
//   };

//   const handleDownloadPayslip = (payslipId) => {
//     // In a real app, this would download the payslip PDF
//     alert(`Downloading payslip ${payslipId}`);
//   };

//   const handlePrintPayslip = (payslipId) => {
//     // In a real app, this would print the payslip
//     alert(`Printing payslip ${payslipId}`);
//   };

//   const handleEmailPayslip = (payslipId) => {
//     // In a real app, this would email the payslip
//     alert(`Emailing payslip ${payslipId}`);
//   };

//   const months = [...new Set(payslips.map(payslip => payslip.period.split(' ')[0]))];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Payslip Generator</h1>
      
//       {/* Search and Filter */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div className="relative flex-1">
//             <FiSearch className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search payslips by employee name or ID..."
//               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//           </div>
//           <div className="flex gap-2">
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-3 text-gray-400" />
//               <select
//                 value={selectedMonth}
//                 onChange={(e) => setSelectedMonth(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//               >
//                 <option value="">All Months</option>
//                 {months.map(month => (
//                   <option key={month} value={month}>{month}</option>
//                 ))}
//               </select>
//             </div>
//             <button className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
//               Generate New Payslips
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Payslips Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredPayslips.map(payslip => (
//                 <tr key={payslip.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payslip.employeeId}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payslip.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payslip.department}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payslip.period}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${payslip.netSalary.toLocaleString()}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs rounded-full ${payslip.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                       {payslip.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div className="flex gap-2">
//                       <button 
//                         onClick={() => handleViewPayslip(payslip)}
//                         className="text-blue-600 hover:text-blue-800"
//                         title="View"
//                       >
//                         View
//                       </button>
//                       <button 
//                         onClick={() => handleDownloadPayslip(payslip.id)}
//                         className="text-gray-600 hover:text-gray-800"
//                         title="Download"
//                       >
//                         <FiDownload />
//                       </button>
//                       <button 
//                         onClick={() => handlePrintPayslip(payslip.id)}
//                         className="text-gray-600 hover:text-gray-800"
//                         title="Print"
//                       >
//                         <FiPrinter />
//                       </button>
//                       <button 
//                         onClick={() => handleEmailPayslip(payslip.id)}
//                         className="text-gray-600 hover:text-gray-800"
//                         title="Email"
//                       >
//                         <FiMail />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* View Payslip Modal */}
//       {isViewModalOpen && selectedPayslip && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
//             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//               <h2 className="text-xl font-semibold text-gray-800">Payslip Details</h2>
//               <button 
//                 onClick={() => setIsViewModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="p-6">
//               {/* Payslip Header */}
//               <div className="flex justify-between items-start mb-8">
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-800">ABC Company</h1>
//                   <p className="text-gray-600">123 Business Street, City, Country</p>
//                 </div>
//                 <div className="text-right">
//                   <h2 className="text-xl font-bold text-blue-600">PAYSLIP</h2>
//                   <p className="text-gray-600">#{selectedPayslip.id.toString().padStart(5, '0')}</p>
//                   <p className="text-gray-600">Issued: {selectedPayslip.issueDate}</p>
//                 </div>
//               </div>

//               {/* Employee and Period Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-gray-500 mb-2">Employee Information</h3>
//                   <p className="font-medium">{selectedPayslip.name}</p>
//                   <p className="text-gray-600">ID: {selectedPayslip.employeeId}</p>
//                   <p className="text-gray-600">{selectedPayslip.department} Department</p>
//                   <p className="text-gray-600">{selectedPayslip.position}</p>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-gray-500 mb-2">Payroll Information</h3>
//                   <p className="font-medium">Pay Period: {selectedPayslip.period}</p>
//                   <p className="text-gray-600">Payment Date: {selectedPayslip.issueDate}</p>
//                   <p className="text-gray-600">Status: <span className={`px-2 py-1 text-xs rounded-full ${selectedPayslip.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                     {selectedPayslip.status}
//                   </span></p>
//                 </div>
//               </div>

//               {/* Earnings and Deductions */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-800 mb-3">Earnings</h3>
//                   <table className="w-full">
//                     <tbody className="divide-y divide-gray-200">
//                       <tr>
//                         <td className="py-2 text-gray-600">Basic Salary</td>
//                         <td className="py-2 text-right font-medium">${selectedPayslip.basicSalary.toLocaleString()}</td>
//                       </tr>
//                       <tr>
//                         <td className="py-2 text-gray-600">Allowances</td>
//                         <td className="py-2 text-right font-medium">${selectedPayslip.allowances.toLocaleString()}</td>
//                       </tr>
//                       <tr>
//                         <td className="py-2 text-gray-600">Overtime</td>
//                         <td className="py-2 text-right font-medium">${selectedPayslip.overtime.toLocaleString()}</td>
//                       </tr>
//                       <tr>
//                         <td className="py-2 text-gray-600">Bonuses</td>
//                         <td className="py-2 text-right font-medium">${selectedPayslip.bonuses.toLocaleString()}</td>
//                       </tr>
//                       <tr className="bg-gray-50">
//                         <td className="py-2 font-medium">Total Earnings</td>
//                         <td className="py-2 text-right font-medium">${(selectedPayslip.basicSalary + selectedPayslip.allowances + selectedPayslip.overtime + selectedPayslip.bonuses).toLocaleString()}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-800 mb-3">Deductions</h3>
//                   <table className="w-full">
//                     <tbody className="divide-y divide-gray-200">
//                       <tr>
//                         <td className="py-2 text-gray-600">Tax</td>
//                         <td className="py-2 text-right font-medium">${selectedPayslip.tax.toLocaleString()}</td>
//                       </tr>
//                       <tr>
//                         <td className="py-2 text-gray-600">Other Deductions</td>
//                         <td className="py-2 text-right font-medium">${selectedPayslip.deductions.toLocaleString()}</td>
//                       </tr>
//                       <tr className="bg-gray-50">
//                         <td className="py-2 font-medium">Total Deductions</td>
//                         <td className="py-2 text-right font-medium">${(selectedPayslip.tax + selectedPayslip.deductions).toLocaleString()}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Net Pay */}
//               <div className="bg-blue-50 p-4 rounded-lg mb-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-medium text-blue-800">Net Pay</h3>
//                   <p className="text-2xl font-bold text-blue-600">${selectedPayslip.netSalary.toLocaleString()}</p>
//                 </div>
//               </div>

//               {/* Bank Details */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-sm font-medium text-gray-500 mb-2">Bank Details</h3>
//                 <p className="text-gray-600">Bank Name: ABC Bank</p>
//                 <p className="text-gray-600">Account Number: ****1234</p>
//                 <p className="text-gray-600">IFSC Code: ABCB0001234</p>
//               </div>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
//               <button
//                 onClick={() => handlePrintPayslip(selectedPayslip.id)}
//                 className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
//               >
//                 <FiPrinter />
//                 Print
//               </button>
//               <button
//                 onClick={() => handleDownloadPayslip(selectedPayslip.id)}
//                 className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
//               >
//                 <FiDownload />
//                 Download
//               </button>
//               <button
//                 onClick={() => handleEmailPayslip(selectedPayslip.id)}
//                 className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//               >
//                 <FiMail />
//                 Email to Employee
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PayslipGenerator;

import React, { useState, useEffect } from 'react';
import { FiSearch, FiDownload, FiPrinter, FiMail, FiCalendar } from 'react-icons/fi';

const PayslipGenerator = () => {
  const [payslips, setPayslips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

useEffect(() => {
  const storedPayslips = localStorage.getItem('payroll_payslips');
  if (storedPayslips) {
    const parsedPayslips = JSON.parse(storedPayslips);
    console.log('Payslips from localStorage:', parsedPayslips);
    setPayslips(parsedPayslips);
  } else {
    setPayslips([]);
  }
}, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPayslips = payslips.filter(payslip =>
    (payslip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payslip.employeeId.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedMonth === '' || payslip.period.includes(selectedMonth))
  );

  const handleViewPayslip = (payslip) => {
    setSelectedPayslip(payslip);
    setIsViewModalOpen(true);
  };

  const handleDownloadPayslip = (payslipId) => {
    alert(`Downloading payslip ${payslipId}`);
  };

  const handlePrintPayslip = (payslipId) => {
    alert(`Printing payslip ${payslipId}`);
  };

  const handleEmailPayslip = (payslipId) => {
    alert(`Emailing payslip ${payslipId}`);
  };

  const months = [...new Set(payslips.map(payslip => payslip.period.split(' ')[0]))];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Payslip Generator</h1>
      
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search payslips by employee name or ID..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">All Months</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayslips.map(payslip => (
                <tr key={payslip.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payslip.employeeId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payslip.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payslip.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payslip.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${payslip.netSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${payslip.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {payslip.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewPayslip(payslip)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleDownloadPayslip(payslip.id)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Download"
                      >
                        <FiDownload />
                      </button>
                      <button 
                        onClick={() => handlePrintPayslip(payslip.id)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Print"
                      >
                        <FiPrinter />
                      </button>
                      <button 
                        onClick={() => handleEmailPayslip(payslip.id)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Email"
                      >
                        <FiMail />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isViewModalOpen && selectedPayslip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Payslip Details</h2>
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">ABC Company</h1>
                  <p className="text-gray-600">123 Business Street, City, Country</p>
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-bold text-blue-600">PAYSLIP</h2>
                  <p className="text-gray-600">#{selectedPayslip.id.toString().padStart(5, '0')}</p>
                  <p className="text-gray-600">Issued: {selectedPayslip.issueDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Employee Information</h3>
                  <p className="font-medium">{selectedPayslip.name}</p>
                  <p className="text-gray-600">ID: {selectedPayslip.employeeId}</p>
                  <p className="text-gray-600">{selectedPayslip.department} Department</p>
                  <p className="text-gray-600">{selectedPayslip.position}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Payroll Information</h3>
                  <p className="font-medium">Pay Period: {selectedPayslip.period}</p>
                  <p className="text-gray-600">Payment Date: {selectedPayslip.issueDate}</p>
                  <p className="text-gray-600">Status: <span className={`px-2 py-1 text-xs rounded-full ${selectedPayslip.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {selectedPayslip.status}
                  </span></p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Earnings</h3>
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-2 text-gray-600">Basic Salary</td>
                        <td className="py-2 text-right font-medium">${selectedPayslip.basicSalary.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Allowances</td>
                        <td className="py-2 text-right font-medium">${selectedPayslip.allowances.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Overtime</td>
                        <td className="py-2 text-right font-medium">${(selectedPayslip.overtime || 0).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Bonuses</td>
                        <td className="py-2 text-right font-medium">${(selectedPayslip.bonuses || 0).toLocaleString()}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 font-medium">Total Earnings</td>
                        <td className="py-2 text-right font-medium">${(selectedPayslip.basicSalary + selectedPayslip.allowances + (selectedPayslip.overtime || 0) + (selectedPayslip.bonuses || 0)).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Deductions</h3>
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-2 text-gray-600">Tax</td>
                        <td className="py-2 text-right font-medium">${selectedPayslip.tax.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Other Deductions</td>
                        <td className="py-2 text-right font-medium">${selectedPayslip.deductions.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 font-medium">Total Deductions</td>
                        <td className="py-2 text-right font-medium">${(selectedPayslip.tax + selectedPayslip.deductions).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-blue-800">Net Pay</h3>
                  <p className="text-2xl font-bold text-blue-600">${selectedPayslip.netSalary.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Bank Details</h3>
                <p className="text-gray-600">Bank Name: {selectedPayslip.bankDetails.bankName}</p>
                <p className="text-gray-600">Account Number: {selectedPayslip.bankDetails.accountNumber}</p>
                <p className="text-gray-600">IFSC Code: {selectedPayslip.bankDetails.ifscCode}</p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => handlePrintPayslip(selectedPayslip.id)}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                <FiPrinter />
                Print
              </button>
              <button
                onClick={() => handleDownloadPayslip(selectedPayslip.id)}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                <FiDownload />
                Download
              </button>
              <button
                onClick={() => handleEmailPayslip(selectedPayslip.id)}
                className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                <FiMail />
                Email to Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayslipGenerator;