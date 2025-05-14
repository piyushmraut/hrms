import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiDownload, 
  FiPrinter, 
  FiMail, 
  FiCalendar, 
  FiFileText, 
  FiEye, 
  FiX 
} from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Transition } from '@headlessui/react';

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
        fillColor: [79, 70, 229],
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
        fillColor: [79, 70, 229],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        1: { halign: 'right' }
      }
    });
    
    // Net pay
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6 border border-violet-600">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-8xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-8">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="bg-indigo-600 text-white p-3 rounded-xl shadow-lg"
          >
            <FiFileText className="w-4 h-4" />
          </motion.div>
          <h1 className="text-2xl font-bold text-indigo-900">Payslip Generator</h1>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-dotted border-red-400"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
            <div className="relative flex-1">
              <motion.div 

                className="relative"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400">
                  <FiSearch className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search payslips by employee name or ID..."
                  className="pl-12 pr-4 py-3 w-full border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </motion.div>
            </div>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400">
                  <FiCalendar className="w-5 h-5" />
                </div>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="pl-12 pr-10 py-3 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm appearance-none bg-white"
                >
                  <option value="">All Months</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-dotted border-red-400"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-100">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Employee ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Period</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Net Salary</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                  <th className="px-20 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-indigo-50">
                {filteredPayslips.map((payslip, index) => (
                  <motion.tr 
                    key={payslip.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="hover:bg-indigo-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900">{payslip.employeeId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-700">{payslip.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-700">{payslip.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-700">{payslip.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">₹{payslip.netSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${payslip.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {payslip.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-3">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleViewPayslip(payslip)}
                          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 py-1 px-3 rounded-lg transition-all"
                          title="View"
                        >
                          <FiEye className="w-4 h-4" />
                          <span>View</span>
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDownloadPayslip(payslip)}
                          className="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg transition-all"
                          title="Download"
                        >
                          <FiDownload className="w-4 h-4" />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePrintPayslip(payslip.id)}
                          className="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg transition-all"
                          title="Print"
                        >
                          <FiPrinter className="w-4 h-4" />
                        </motion.button>
                        
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filteredPayslips.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-indigo-400">
                      <div className="flex flex-col items-center">
                        <FiFileText className="w-12 h-12 mb-3" />
                        <p className="text-lg">No payslips found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      <Transition show={isViewModalOpen} as={React.Fragment}>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <Transition.Child
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsViewModalOpen(false)}
            />
            
            <Transition.Child
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {selectedPayslip && (
                <>
                  <div className="px-6 py-4 border-b border-indigo-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <FiFileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-indigo-900">Payslip Details</h2>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="text-indigo-400 hover:text-indigo-600 bg-indigo-50 p-2 rounded-full"
                    >
                      <FiX className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  <div className="overflow-y-auto p-6 max-h-[calc(90vh-130px)]">
                    <div className="relative">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 opacity-50" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-50 rounded-full -ml-10 -mb-10 opacity-50" />
                      
                      <div className="relative">
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <h1 className="text-2xl font-bold text-indigo-900">Qloron Private Limited</h1>
                            <p className="text-indigo-600">Business Street, Hyderabad, India</p>
                          </div>
                          <div className="text-right">
                            <h2 className="text-xl font-bold text-indigo-600">PAYSLIP</h2>
                            <p className="text-indigo-500">#{selectedPayslip.id.toString().padStart(5, '0')}</p>
                            <p className="text-indigo-500">Issued: {selectedPayslip.issueDate}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-sm"
                          >
                            <h3 className="text-sm font-medium text-indigo-800 mb-3 uppercase tracking-wider">Employee Information</h3>
                            <p className="text-lg font-medium text-indigo-900">{selectedPayslip.name}</p>
                            <p className="text-indigo-700">ID: {selectedPayslip.employeeId}</p>
                            <p className="text-indigo-700">{selectedPayslip.department} Department</p>
                            <p className="text-indigo-700">{selectedPayslip.position}</p>
                          </motion.div>
                          <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-sm"
                          >
                            <h3 className="text-sm font-medium text-indigo-800 mb-3 uppercase tracking-wider">Payroll Information</h3>
                            <p className="text-lg font-medium text-indigo-900">Pay Period: {selectedPayslip.period}</p>
                            <p className="text-indigo-700">Payment Date: {selectedPayslip.issueDate}</p>
                            <p className="text-indigo-700">Status: 
                              <span className={`ml-2 px-3 py-1 text-xs rounded-full ${selectedPayslip.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                {selectedPayslip.status}
                              </span>
                            </p>
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <h3 className="text-lg font-medium text-indigo-900 mb-4 flex items-center">
                              <span className="bg-emerald-100 p-1 rounded-md mr-2">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </span>
                              Earnings
                            </h3>
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                              <table className="w-full">
                                <tbody className="divide-y divide-indigo-50">
                                  <tr className="hover:bg-indigo-50">
                                    <td className="py-3 px-4 text-indigo-700">Basic Salary</td>
                                    <td className="py-3 px-4 text-right font-medium text-indigo-900">₹{selectedPayslip.basicSalary.toLocaleString()}</td>
                                  </tr>
                                  <tr className="hover:bg-indigo-50">
                                    <td className="py-3 px-4 text-indigo-700">Allowances</td>
                                    <td className="py-3 px-4 text-right font-medium text-indigo-900">₹{selectedPayslip.allowances.toLocaleString()}</td>
                                  </tr>
                                  <tr className="hover:bg-indigo-50">
                                    <td className="py-3 px-4 text-indigo-700">Overtime</td>
                                    <td className="py-3 px-4 text-right font-medium text-indigo-900">₹{(selectedPayslip.overtime || 0).toLocaleString()}</td>
                                  </tr>
                                  <tr className="hover:bg-indigo-50">
                                    <td className="py-3 px-4 text-indigo-700">Bonuses</td>
                                    <td className="py-3 px-4 text-right font-medium text-indigo-900">₹{(selectedPayslip.bonuses || 0).toLocaleString()}</td>
                                  </tr>
                                  <tr className="bg-indigo-100">
                                    <td className="py-3 px-4 font-medium text-indigo-900">Total Earnings</td>
                                    <td className="py-3 px-4 text-right font-bold text-indigo-900">₹{(selectedPayslip.basicSalary + selectedPayslip.allowances + (selectedPayslip.overtime || 0) + (selectedPayslip.bonuses || 0)).toLocaleString()}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h3 className="text-lg font-medium text-indigo-900 mb-4 flex items-center">
                              <span className="bg-red-100 p-1 rounded-md mr-2">
                                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </span>
                              Deductions
                            </h3>
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                              <table className="w-full">
                                <tbody className="divide-y divide-indigo-50">
                                  <tr className="hover:bg-indigo-50">
                                    <td className="py-3 px-4 text-indigo-700">Tax</td>
                                    <td className="py-3 px-4 text-right font-medium text-indigo-900">₹{selectedPayslip.tax.toLocaleString()}</td>
                                  </tr>
                                  <tr className="hover:bg-indigo-50">
                                    <td className="py-3 px-4 text-indigo-700">Other Deductions</td>
                                    <td className="py-3 px-4 text-right font-medium text-indigo-900">₹{selectedPayslip.deductions.toLocaleString()}</td>
                                  </tr>
                                  <tr className="bg-indigo-100">
                                    <td className="py-3 px-4 font-medium text-indigo-900">Total Deductions</td>
                                    <td className="py-3 px-4 text-right font-bold text-indigo-900">₹{(selectedPayslip.tax + selectedPayslip.deductions).toLocaleString()}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </motion.div>
                        </div>

                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl shadow-lg mb-8"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-white">Net Pay</h3>
                            <div className="flex items-center">
                              <span className="text-indigo-200 mr-2"> ₹ </span>
                              <p className="text-3xl font-bold text-white">{selectedPayslip.netSalary.toLocaleString()}</p>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-sm"
                        >
                          <h3 className="text-sm font-medium text-indigo-800 mb-3 uppercase tracking-wider">Bank Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                              <p className="text-xs text-indigo-500 mb-1">Bank Name</p>
                              <p className="text-indigo-900 font-medium">{selectedPayslip.bankDetails.bankName}</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                              <p className="text-xs text-indigo-500 mb-1">Account Number</p>
                              <p className="text-indigo-900 font-medium">{selectedPayslip.bankDetails.accountNumber}</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                              <p className="text-xs text-indigo-500 mb-1">IFSC Code</p>
                              <p className="text-indigo-900 font-medium">{selectedPayslip.bankDetails.ifscCode}</p>
                              </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 py-4 border-t border-indigo-100 flex justify-end gap-3 sticky bottom-0 bg-white z-10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePrintPayslip(selectedPayslip.id)}
                      className="flex items-center gap-2 bg-white border border-indigo-200 text-indigo-700 py-2 px-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                    >
                      <FiPrinter className="animate-pulse" />
                      Print
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownloadPayslip(selectedPayslip)}
                      className="flex items-center gap-2 bg-white border border-indigo-200 text-indigo-700 py-2 px-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                    >
                      <FiDownload className="animate-pulse" />
                      Download
                    </motion.button>
                    
                  </div>
                </>
              )}
            </Transition.Child>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default PayslipGenerator;