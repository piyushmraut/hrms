

// import React, { useState, useEffect } from 'react';
// import { FiSearch, FiDownload, FiPrinter, FiMail, FiCalendar } from 'react-icons/fi';

// const PayslipGenerator = () => {
//   const [payslips, setPayslips] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [selectedPayslip, setSelectedPayslip] = useState(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);

// useEffect(() => {
//   const storedPayslips = localStorage.getItem('payroll_payslips');
//   if (storedPayslips) {
//     const parsedPayslips = JSON.parse(storedPayslips);
//     console.log('Payslips from localStorage:', parsedPayslips);
//     setPayslips(parsedPayslips);
//   } else {
//     setPayslips([]);
//   }
// }, []);

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
//     alert(`Downloading payslip ${payslipId}`);
//   };

//   const handlePrintPayslip = (payslipId) => {
//     alert(`Printing payslip ${payslipId}`);
//   };

//   const handleEmailPayslip = (payslipId) => {
//     alert(`Emailing payslip ${payslipId}`);
//   };

//   const months = [...new Set(payslips.map(payslip => payslip.period.split(' ')[0]))];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Payslip Generator</h1>
      
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
//           </div>
//         </div>
//       </div>

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

//       {isViewModalOpen && selectedPayslip && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
//             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//               <h2 className="text-xl font-semibold text-gray-800">Payslip Details</h2>
//               <button 
//                 onClick={() => setIsViewModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="p-6">
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
//                         <td className="py-2 text-right font-medium">${(selectedPayslip.overtime || 0).toLocaleString()}</td>
//                       </tr>
//                       <tr>
//                         <td className="py-2 text-gray-600">Bonuses</td>
//                         <td className="py-2 text-right font-medium">${(selectedPayslip.bonuses || 0).toLocaleString()}</td>
//                       </tr>
//                       <tr className="bg-gray-50">
//                         <td className="py-2 font-medium">Total Earnings</td>
//                         <td className="py-2 text-right font-medium">${(selectedPayslip.basicSalary + selectedPayslip.allowances + (selectedPayslip.overtime || 0) + (selectedPayslip.bonuses || 0)).toLocaleString()}</td>
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

//               <div className="bg-blue-50 p-4 rounded-lg mb-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-medium text-blue-800">Net Pay</h3>
//                   <p className="text-2xl font-bold text-blue-600">${selectedPayslip.netSalary.toLocaleString()}</p>
//                 </div>
//               </div>

//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-sm font-medium text-gray-500 mb-2">Bank Details</h3>
//                 <p className="text-gray-600">Bank Name: {selectedPayslip.bankDetails.bankName}</p>
//                 <p className="text-gray-600">Account Number: {selectedPayslip.bankDetails.accountNumber}</p>
//                 <p className="text-gray-600">IFSC Code: {selectedPayslip.bankDetails.ifscCode}</p>
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
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  // const handleDownloadPayslip = (payslip) => {
  //   // Initialize jsPDF with the autotable plugin
  //   const doc = new jsPDF();
    
  //   // Set document properties
  //   doc.setProperties({
  //     title: `Payslip - ${payslip.name} - ${payslip.period}`,
  //     subject: 'Employee Payslip',
  //     author: 'ABC Company',
  //   });

  //   // Company Information
  //   doc.setFontSize(18);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('ABC Company', 105, 20, { align: 'center' });
  //   doc.setFontSize(12);
  //   doc.setFont('helvetica', 'normal');
  //   doc.text('123 Business Street, City, Country', 105, 28, { align: 'center' });
    
  //   // Payslip Header
  //   doc.setFontSize(16);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('PAYSLIP', 105, 40, { align: 'center' });
  //   doc.setFontSize(12);
  //   doc.setFont('helvetica', 'normal');
  //   doc.text(`#${payslip.id.toString().padStart(5, '0')}`, 160, 40);
  //   doc.text(`Issued: ${payslip.issueDate}`, 160, 45);
    
  //   // Separator Line
  //   doc.setDrawColor(200, 200, 200);
  //   doc.line(20, 50, 190, 50);
    
  //   // Employee Information
  //   doc.setFontSize(14);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('Employee Information', 20, 60);
  //   doc.setFontSize(12);
  //   doc.setFont('helvetica', 'normal');
  //   doc.text(`Name: ${payslip.name}`, 20, 70);
  //   doc.text(`ID: ${payslip.employeeId}`, 20, 78);
  //   doc.text(`Department: ${payslip.department}`, 20, 86);
  //   doc.text(`Position: ${payslip.position}`, 20, 94);
    
  //   // Payroll Information
  //   doc.setFontSize(14);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('Payroll Information', 20, 104);
  //   doc.setFontSize(12);
  //   doc.setFont('helvetica', 'normal');
  //   doc.text(`Pay Period: ${payslip.period}`, 20, 114);
  //   doc.text(`Payment Date: ${payslip.issueDate}`, 20, 122);
  //   doc.text(`Status: ${payslip.status}`, 20, 130);
    
  //   // Earnings Table
  //   const earningsData = [
  //     ['Basic Salary', `$${payslip.basicSalary.toLocaleString()}`],
  //     ['Allowances', `$${payslip.allowances.toLocaleString()}`],
  //     ['Overtime', `$${(payslip.overtime || 0).toLocaleString()}`],
  //     ['Bonuses', `$${(payslip.bonuses || 0).toLocaleString()}`],
  //     ['Total Earnings', `$${(payslip.basicSalary + payslip.allowances + (payslip.overtime || 0) + (payslip.bonuses || 0)).toLocaleString()}`]
  //   ];
    
  //   doc.autoTable({
  //     startY: 140,
  //     head: [['Earnings', 'Amount']],
  //     body: earningsData,
  //     theme: 'grid',
  //     headStyles: {
  //       fillColor: [41, 128, 185],
  //       textColor: 255,
  //       fontStyle: 'bold'
  //     },
  //     styles: {
  //       cellPadding: 3,
  //       fontSize: 10,
  //     },
  //     columnStyles: {
  //       1: { cellWidth: 'auto', halign: 'right' }
  //     }
  //   });
    
  //   // Deductions Table
  //   const deductionsData = [
  //     ['Tax', `$${payslip.tax.toLocaleString()}`],
  //     ['Other Deductions', `$${payslip.deductions.toLocaleString()}`],
  //     ['Total Deductions', `$${(payslip.tax + payslip.deductions).toLocaleString()}`]
  //   ];
    
  //   doc.autoTable({
  //     startY: doc.lastAutoTable.finalY + 10,
  //     head: [['Deductions', 'Amount']],
  //     body: deductionsData,
  //     theme: 'grid',
  //     headStyles: {
  //       fillColor: [41, 128, 185],
  //       textColor: 255,
  //       fontStyle: 'bold'
  //     },
  //     styles: {
  //       cellPadding: 3,
  //       fontSize: 10,
  //     },
  //     columnStyles: {
  //       1: { cellWidth: 'auto', halign: 'right' }
  //     }
  //   });
    
  //   // Net Pay
  //   doc.setFontSize(16);
  //   doc.setFont('helvetica', 'bold');
  //   doc.setTextColor(41, 128, 185);
  //   doc.text(`Net Pay: $${payslip.netSalary.toLocaleString()}`, 20, doc.lastAutoTable.finalY + 20);
  //   doc.setTextColor(0, 0, 0);
    
  //   // Bank Details
  //   doc.setFontSize(12);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('Bank Details', 20, doc.lastAutoTable.finalY + 40);
  //   doc.setFont('helvetica', 'normal');
  //   doc.text(`Bank Name: ${payslip.bankDetails.bankName}`, 20, doc.lastAutoTable.finalY + 48);
  //   doc.text(`Account Number: ${payslip.bankDetails.accountNumber}`, 20, doc.lastAutoTable.finalY + 56);
  //   doc.text(`IFSC Code: ${payslip.bankDetails.ifscCode}`, 20, doc.lastAutoTable.finalY + 64);
    
  //   // Footer
  //   doc.setFontSize(10);
  //   doc.text('This is a computer generated payslip. No signature required.', 105, 285, { align: 'center' });
    
  //   // Save the PDF
  //   doc.save(`payslip_${payslip.employeeId}_${payslip.period.replace(' ', '_')}.pdf`);
  // };

  const handleDownloadPayslip = (payslip) => {
    // Initialize jsPDF
    const doc = new jsPDF();
    
    // Add company header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('ABC Company', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('123 Business Street, City, Country', 105, 28, { align: 'center' });
    
    // Add payslip title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PAYSLIP', 105, 40, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`#${payslip.id.toString().padStart(5, '0')}`, 160, 40);
    doc.text(`Issued: ${payslip.issueDate}`, 160, 45);
    
    // Add employee information
    doc.setFontSize(14);
    doc.text('Employee Information', 20, 60);
    doc.setFontSize(12);
    doc.text(`Name: ${payslip.name}`, 20, 70);
    doc.text(`ID: ${payslip.employeeId}`, 20, 78);
    doc.text(`Department: ${payslip.department}`, 20, 86);
    doc.text(`Position: ${payslip.position}`, 20, 94);
    
    // Add payroll information
    doc.text('Payroll Information', 20, 104);
    doc.text(`Pay Period: ${payslip.period}`, 20, 114);
    doc.text(`Payment Date: ${payslip.issueDate}`, 20, 122);
    doc.text(`Status: ${payslip.status}`, 20, 130);
    
    // Earnings table
    autoTable(doc, {
      startY: 140,
      head: [['Earnings', 'Amount']],
      body: [
        ['Basic Salary', `$${payslip.basicSalary.toLocaleString()}`],
        ['Allowances', `$${payslip.allowances.toLocaleString()}`],
        ['Overtime', `$${(payslip.overtime || 0).toLocaleString()}`],
        ['Bonuses', `$${(payslip.bonuses || 0).toLocaleString()}`],
        ['Total Earnings', `$${(payslip.basicSalary + payslip.allowances + (payslip.overtime || 0) + (payslip.bonuses || 0)).toLocaleString()}`]
      ],
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        1: { halign: 'right' }
      }
    });
    
    // Deductions table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Deductions', 'Amount']],
      body: [
        ['Tax', `$${payslip.tax.toLocaleString()}`],
        ['Other Deductions', `$${payslip.deductions.toLocaleString()}`],
        ['Total Deductions', `$${(payslip.tax + payslip.deductions).toLocaleString()}`]
      ],
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        1: { halign: 'right' }
      }
    });
    
    // Net pay
    doc.setFontSize(16);
    doc.setTextColor(41, 128, 185);
    doc.text(`Net Pay: $${payslip.netSalary.toLocaleString()}`, 20, doc.lastAutoTable.finalY + 20);
    
    // Bank details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('Bank Details', 20, doc.lastAutoTable.finalY + 40);
    doc.text(`Bank Name: ${payslip.bankDetails.bankName}`, 20, doc.lastAutoTable.finalY + 48);
    doc.text(`Account Number: ${payslip.bankDetails.accountNumber}`, 20, doc.lastAutoTable.finalY + 56);
    doc.text(`IFSC Code: ${payslip.bankDetails.ifscCode}`, 20, doc.lastAutoTable.finalY + 64);
    
    // Save the PDF
    doc.save(`payslip_${payslip.employeeId}_${payslip.period.replace(' ', '_')}.pdf`);
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
                        onClick={() => handleDownloadPayslip(payslip)}
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
                onClick={() => handleDownloadPayslip(selectedPayslip)}
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