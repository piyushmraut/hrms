// import React from "react";
// import { useState,useEffect } from "react";
// const Candidates = () => {
//     const [candidates, setCandidates] = useState([]);
//     const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//     const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//     const [selectedCandidate, setSelectedCandidate] = useState(null);
//     const [newCandidate, setNewCandidate] = useState({
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       position: '',
//       source: '',
//       resume: null,
//       status: 'New'
//     });
//     const [filters, setFilters] = useState({
//       status: '',
//       position: ''
//     });
  
//     useEffect(() => {
//       // Fetch candidates from API
//       const fetchCandidates = async () => {
//         // Mock data - replace with actual API call
//         const mockCandidates = [
//           {
//             id: 1,
//             firstName: 'John',
//             lastName: 'Doe',
//             email: 'john.doe@example.com',
//             phone: '(123) 456-7890',
//             position: 'Senior Developer',
//             source: 'LinkedIn',
//             appliedDate: '2023-05-10',
//             status: 'Interview',
//             resume: 'john_doe_resume.pdf',
//             notes: 'Strong technical background, needs culture fit assessment'
//           },
//           {
//             id: 2,
//             firstName: 'Sarah',
//             lastName: 'Johnson',
//             email: 'sarah.j@example.com',
//             phone: '(234) 567-8901',
//             position: 'Marketing Manager',
//             source: 'Company Website',
//             appliedDate: '2023-05-05',
//             status: 'Offer',
//             resume: 'sarah_j_resume.pdf',
//             notes: 'Excellent communication skills, great cultural fit'
//           },
//           {
//             id: 3,
//             firstName: 'Michael',
//             lastName: 'Chen',
//             email: 'michael.chen@example.com',
//             phone: '(345) 678-9012',
//             position: 'Data Analyst',
//             source: 'Referral',
//             appliedDate: '2023-05-12',
//             status: 'New',
//             resume: 'michael_chen_resume.pdf',
//             notes: 'Needs technical screening'
//           }
//         ];
//         setCandidates(mockCandidates);
//       };
//       fetchCandidates();
//     }, []);
  
//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setNewCandidate(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     };
  
//     const handleFileChange = (e) => {
//       setNewCandidate(prev => ({
//         ...prev,
//         resume: e.target.files[0]
//       }));
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       // Submit to API and update state
//       const submittedCandidate = {
//         ...newCandidate,
//         id: candidates.length + 1,
//         appliedDate: new Date().toISOString().split('T')[0],
//         resume: newCandidate.resume ? newCandidate.resume.name : 'No resume uploaded'
//       };
//       setCandidates([...candidates, submittedCandidate]);
//       setIsAddModalOpen(false);
//       setNewCandidate({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         position: '',
//         source: '',
//         resume: null,
//         status: 'New'
//       });
//     };
  
//     const viewCandidate = (candidate) => {
//       setSelectedCandidate(candidate);
//       setIsViewModalOpen(true);
//     };
  
//     const updateStatus = (id, newStatus) => {
//       setCandidates(candidates.map(candidate => 
//         candidate.id === id ? { ...candidate, status: newStatus } : candidate
//       ));
//     };
  
//     const filteredCandidates = candidates.filter(candidate => {
//       return (
//         (filters.status === '' || candidate.status === filters.status) &&
//         (filters.position === '' || candidate.position.includes(filters.position))
//       );
//     });
  
//     return (
//       <div>
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-lg font-semibold">Candidates</h3>
//           <button
//             onClick={() => setIsAddModalOpen(true)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Add Candidate
//           </button>
//         </div>
  
//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow p-4 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <select
//                 value={filters.status}
//                 onChange={(e) => setFilters({...filters, status: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">All Statuses</option>
//                 <option value="New">New</option>
//                 <option value="Screening">Screening</option>
//                 <option value="Interview">Interview</option>
//                 <option value="Offer">Offer</option>
//                 <option value="Hired">Hired</option>
//                 <option value="Rejected">Rejected</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
//               <input
//                 type="text"
//                 value={filters.position}
//                 onChange={(e) => setFilters({...filters, position: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Filter by position"
//               />
//             </div>
//             <div className="flex items-end">
//               <button
//                 onClick={() => setFilters({ status: '', position: '' })}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>
  
//         {/* Candidates Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredCandidates.map(candidate => (
//                 <tr key={candidate.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
//                         {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{candidate.firstName} {candidate.lastName}</div>
//                         <div className="text-sm text-gray-500">{candidate.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.position}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.phone}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.source}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.appliedDate}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <select
//                       value={candidate.status}
//                       onChange={(e) => updateStatus(candidate.id, e.target.value)}
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         candidate.status === 'New' ? 'bg-blue-100 text-blue-800' :
//                         candidate.status === 'Screening' ? 'bg-yellow-100 text-yellow-800' :
//                         candidate.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
//                         candidate.status === 'Offer' ? 'bg-green-100 text-green-800' :
//                         candidate.status === 'Hired' ? 'bg-green-200 text-green-900' :
//                         'bg-red-100 text-red-800'
//                       }`}
//                     >
//                       <option value="New">New</option>
//                       <option value="Screening">Screening</option>
//                       <option value="Interview">Interview</option>
//                       <option value="Offer">Offer</option>
//                       <option value="Hired">Hired</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button 
//                       onClick={() => viewCandidate(candidate)}
//                       className="text-blue-600 hover:text-blue-900 mr-3"
//                     >
//                       View
//                     </button>
//                     <button className="text-gray-600 hover:text-gray-900">Resume</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
  
//         {/* Add Candidate Modal */}
//         {isAddModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold">Add New Candidate</h3>
//                   <button 
//                     onClick={() => setIsAddModalOpen(false)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
                
//                 <form onSubmit={handleSubmit}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         value={newCandidate.firstName}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         value={newCandidate.lastName}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={newCandidate.email}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={newCandidate.phone}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
//                       <input
//                         type="text"
//                         name="position"
//                         value={newCandidate.position}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
//                       <select
//                         name="source"
//                         value={newCandidate.source}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="">Select source</option>
//                         <option value="LinkedIn">LinkedIn</option>
//                         <option value="Indeed">Indeed</option>
//                         <option value="Company Website">Company Website</option>
//                         <option value="Referral">Referral</option>
//                         <option value="Job Fair">Job Fair</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                       <select
//                         name="status"
//                         value={newCandidate.status}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="New">New</option>
//                         <option value="Screening">Screening</option>
//                         <option value="Interview">Interview</option>
//                         <option value="Offer">Offer</option>
//                         <option value="Hired">Hired</option>
//                         <option value="Rejected">Rejected</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
//                       <input
//                         type="file"
//                         accept=".pdf,.doc,.docx"
//                         onChange={handleFileChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-end space-x-3">
//                     <button
//                       type="button"
//                       onClick={() => setIsAddModalOpen(false)}
//                       className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//                     >
//                       Add Candidate
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
  
//         {/* View Candidate Modal */}
//         {isViewModalOpen && selectedCandidate && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold">Candidate Details</h3>
//                   <button 
//                     onClick={() => setIsViewModalOpen(false)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                   <div className="md:col-span-1">
//                     <div className="flex flex-col items-center">
//                       <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl mb-4">
//                         {selectedCandidate.firstName.charAt(0)}{selectedCandidate.lastName.charAt(0)}
//                       </div>
//                       <h4 className="text-xl font-medium">{selectedCandidate.firstName} {selectedCandidate.lastName}</h4>
//                       <p className="text-gray-600">{selectedCandidate.position}</p>
                      
//                       <div className="mt-6 w-full">
//                         <div className="flex items-center mb-2">
//                           <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                           </svg>
//                           <span>{selectedCandidate.email}</span>
//                         </div>
//                         <div className="flex items-center mb-2">
//                           <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                           <span>{selectedCandidate.phone}</span>
//                         </div>
//                         <div className="flex items-center mb-2">
//                           <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                           </svg>
//                           <span>{selectedCandidate.resume}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                           <span>Applied: {selectedCandidate.appliedDate}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="md:col-span-2">
//                     <div className="mb-6">
//                       <h4 className="text-lg font-medium mb-2">Candidate Status</h4>
//                       <select
//                         value={selectedCandidate.status}
//                         onChange={(e) => updateStatus(selectedCandidate.id, e.target.value)}
//                         className={`px-3 py-2 border rounded-md ${
//                           selectedCandidate.status === 'New' ? 'bg-blue-100 text-blue-800 border-blue-200' :
//                           selectedCandidate.status === 'Screening' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
//                           selectedCandidate.status === 'Interview' ? 'bg-purple-100 text-purple-800 border-purple-200' :
//                           selectedCandidate.status === 'Offer' ? 'bg-green-100 text-green-800 border-green-200' :
//                           selectedCandidate.status === 'Hired' ? 'bg-green-200 text-green-900 border-green-300' :
//                           'bg-red-100 text-red-800 border-red-200'
//                         }`}
//                       >
//                         <option value="New">New</option>
//                         <option value="Screening">Screening</option>
//                         <option value="Interview">Interview</option>
//                         <option value="Offer">Offer</option>
//                         <option value="Hired">Hired</option>
//                         <option value="Rejected">Rejected</option>
//                       </select>
//                     </div>
                    
//                     <div className="mb-6">
//                       <h4 className="text-lg font-medium mb-2">Source</h4>
//                       <p className="text-gray-700">{selectedCandidate.source}</p>
//                     </div>
                    
//                     <div>
//                       <h4 className="text-lg font-medium mb-2">Notes</h4>
//                       <textarea
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         rows={4}
//                         defaultValue={selectedCandidate.notes}
//                       />
//                       <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                         Save Notes
//                       </button>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex justify-end">
//                   <button
//                     onClick={() => setIsViewModalOpen(false)}
//                     className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   export default Candidates;

// import React, { useState, useEffect } from 'react';

// const Candidates = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [newCandidate, setNewCandidate] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     position: '',
//     source: '',
//     resume: null,
//     status: 'New',
//   });
//   const [filters, setFilters] = useState({ status: '', position: '' });

//   // Load candidates from localStorage or initialize with mock data
//   useEffect(() => {
//     const storedCandidates = localStorage.getItem('candidates');
//     if (storedCandidates) {
//       const parsedCandidates = JSON.parse(storedCandidates);
//       // Filter out candidates missing firstName or lastName
//       const validCandidates = parsedCandidates.filter(
//         candidate => candidate.firstName && candidate.lastName
//       );
//       setCandidates(validCandidates);
//     } else {
//       const mockCandidates = [
//         {
//           id: 1,
//           firstName: 'John',
//           lastName: 'Doe',
//           email: 'john.doe@example.com',
//           phone: '(123) 456-7890',
//           position: 'Senior Developer',
//           source: 'LinkedIn',
//           appliedDate: '2023-05-10',
//           status: 'Interview',
//           resume: 'john_doe_resume.pdf',
//           notes: 'Strong technical background, needs culture fit assessment',
//         },
//         {
//           id: 2,
//           firstName: 'Sarah',
//           lastName: 'Johnson',
//           email: 'sarah.j@example.com',
//           phone: '(234) 567-8901',
//           position: 'Marketing Manager',
//           source: 'Company Website',
//           appliedDate: '2023-05-05',
//           status: 'Offer',
//           resume: 'sarah_j_resume.pdf',
//           notes: 'Excellent communication skills, great cultural fit',
//         },
//         {
//           id: 3,
//           firstName: 'Michael',
//           lastName: 'Chen',
//           email: 'michael.chen@example.com',
//           phone: '(345) 678-9012',
//           position: 'Data Analyst',
//           source: 'Referral',
//           appliedDate: '2023-05-12',
//           status: 'New',
//           resume: 'michael_chen_resume.pdf',
//           notes: 'Needs technical screening',
//         },
//       ];
//       setCandidates(mockCandidates);
//       localStorage.setItem('candidates', JSON.stringify(mockCandidates));
//     }
//   }, []);

//   // Handle input changes for the add candidate form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewCandidate(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle file upload for resume
//   const handleFileChange = (e) => {
//     setNewCandidate(prev => ({ ...prev, resume: e.target.files[0] }));
//   };

//   // Submit new candidate
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newId = candidates.length > 0 ? Math.max(...candidates.map(c => c.id)) + 1 : 1;
//     const submittedCandidate = {
//       ...newCandidate,
//       id: newId,
//       appliedDate: new Date().toISOString().split('T')[0],
//       resume: newCandidate.resume ? newCandidate.resume.name : 'No resume uploaded',
//     };
//     const updatedCandidates = [...candidates, submittedCandidate];
//     setCandidates(updatedCandidates);
//     localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
//     setIsAddModalOpen(false);
//     setNewCandidate({ firstName: '', lastName: '', email: '', phone: '', position: '', source: '', resume: null, status: 'New' });
//   };

//   // View candidate details
//   const viewCandidate = (candidate) => {
//     setSelectedCandidate(candidate);
//     setIsViewModalOpen(true);
//   };

//   // Update candidate status
//   const updateStatus = (id, newStatus) => {
//     const updatedCandidates = candidates.map(candidate => 
//       candidate.id === id ? { ...candidate, status: newStatus } : candidate
//     );
//     setCandidates(updatedCandidates);
//     localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
//     if (selectedCandidate && selectedCandidate.id === id) {
//       setSelectedCandidate(prev => ({ ...prev, status: newStatus }));
//     }
//   };

//   // Save candidate notes
//   const saveNotes = (id, notes) => {
//     const updatedCandidates = candidates.map(candidate => 
//       candidate.id === id ? { ...candidate, notes } : candidate
//     );
//     setCandidates(updatedCandidates);
//     localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
//     setSelectedCandidate(prev => ({ ...prev, notes }));
//   };

//   // Filter candidates based on status and position
//   const filteredCandidates = candidates.filter(candidate => (
//     (filters.status === '' || candidate.status === filters.status) &&
//     (filters.position === '' || candidate.position.toLowerCase().includes(filters.position.toLowerCase()))
//   ));

//   return (
//     <div>
//       {/* Header and Add Candidate Button */}
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold">Candidates</h3>
//         <button
//           onClick={() => setIsAddModalOpen(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           Add Candidate
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//             <select
//               value={filters.status}
//               onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">All Statuses</option>
//               <option value="New">New</option>
//               <option value="Screening">Screening</option>
//               <option value="Interview">Interview</option>
//               <option value="Offer">Offer</option>
//               <option value="Hired">Hired</option>
//               <option value="Rejected">Rejected</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
//             <input
//               type="text"
//               value={filters.position}
//               onChange={(e) => setFilters({ ...filters, position: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Filter by position"
//             />
//           </div>
//           <div className="flex items-end">
//             <button
//               onClick={() => setFilters({ status: '', position: '' })}
//               className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Candidates Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredCandidates.map(candidate => (
//               <tr key={candidate.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
//                       {candidate.firstName?.charAt(0) || ''}{candidate.lastName?.charAt(0) || ''}
//                     </div>
//                     <div className="ml-4">
//                       <div className="text-sm font-medium text-gray-900">
//                         {candidate.firstName || 'Unknown'} {candidate.lastName || 'Candidate'}
//                       </div>
//                       <div className="text-sm text-gray-500">{candidate.email}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.position}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.phone}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.source}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.appliedDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <select
//                     value={candidate.status}
//                     onChange={(e) => updateStatus(candidate.id, e.target.value)}
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       candidate.status === 'New' ? 'bg-blue-100 text-blue-800' :
//                       candidate.status === 'Screening' ? 'bg-yellow-100 text-yellow-800' :
//                       candidate.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
//                       candidate.status === 'Offer' ? 'bg-green-100 text-green-800' :
//                       candidate.status === 'Hired' ? 'bg-green-200 text-green-900' :
//                       'bg-red-100 text-red-800'
//                     }`}
//                   >
//                     <option value="New">New</option>
//                     <option value="Screening">Screening</option>
//                     <option value="Interview">Interview</option>
//                     <option value="Offer">Offer</option>
//                     <option value="Hired">Hired</option>
//                     <option value="Rejected">Rejected</option>
//                   </select>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button onClick={() => viewCandidate(candidate)} className="text-blue-600 hover:text-blue-900 mr-3">
//                     View
//                   </button>
//                   <button className="text-gray-600 hover:text-gray-900">Resume</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Candidate Modal */}
//       {isAddModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Add New Candidate</h3>
//                 <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={newCandidate.firstName}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={newCandidate.lastName}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={newCandidate.email}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={newCandidate.phone}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
//                     <input
//                       type="text"
//                       name="position"
//                       value={newCandidate.position}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
//                     <select
//                       name="source"
//                       value={newCandidate.source}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">Select source</option>
//                       <option value="LinkedIn">LinkedIn</option>
//                       <option value="Indeed">Indeed</option>
//                       <option value="Company Website">Company Website</option>
//                       <option value="Referral">Referral</option>
//                       <option value="Job Fair">Job Fair</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                     <select
//                       name="status"
//                       value={newCandidate.status}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="New">New</option>
//                       <option value="Screening">Screening</option>
//                       <option value="Interview">Interview</option>
//                       <option value="Offer">Offer</option>
//                       <option value="Hired">Hired</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
//                     <input
//                       type="file"
//                       accept=".pdf,.doc,.docx"
//                       onChange={handleFileChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     type="button"
//                     onClick={() => setIsAddModalOpen(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//                   >
//                     Add Candidate
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Candidate Modal */}
//       {isViewModalOpen && selectedCandidate && (
//         <div className="fixed inset-0 bg-black bg-opacityBattery-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Candidate Details</h3>
//                 <button onClick={() => setIsViewModalOpen(false)} className="text-gray-500 hover:text-gray-700">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                 <div className="md:col-span-1">
//                   <div className="flex flex-col items-center">
//                     <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl mb-4">
//                       {selectedCandidate.firstName?.charAt(0) || ''}{selectedCandidate.lastName?.charAt(0) || ''}
//                     </div>
//                     <h4 className="text-xl font-medium">
//                       {selectedCandidate.firstName || 'Unknown'} {selectedCandidate.lastName || 'Candidate'}
//                     </h4>
//                     <p className="text-gray-600">{selectedCandidate.position}</p>
//                     <div className="mt-6 w-full">
//                       <div className="flex items-center mb-2">
//                         <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                         </svg>
//                         <span>{selectedCandidate.email}</span>
//                       </div>
//                       <div className="flex items-center mb-2">
//                         <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                         </svg>
//                         <span>{selectedCandidate.phone}</span>
//                       </div>
//                       <div className="flex items-center mb-2">
//                         <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                         </svg>
//                         <span>{selectedCandidate.resume}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                         </svg>
//                         <span>Applied: {selectedCandidate.appliedDate}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="md:col-span-2">
//                   <div className="mb-6">
//                     <h4 className="text-lg font-medium mb-2">Candidate Status</h4>
//                     <select
//                       value={selectedCandidate.status}
//                       onChange={(e) => updateStatus(selectedCandidate.id, e.target.value)}
//                       className={`px-3 py-2 border rounded-md ${
//                         selectedCandidate.status === 'New' ? 'bg-blue-100 text-blue-800 border-blue-200' :
//                         selectedCandidate.status === 'Screening' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
//                         selectedCandidate.status === 'Interview' ? 'bg-purple-100 text-purple-800 border-purple-200' :
//                         selectedCandidate.status === 'Offer' ? 'bg-green-100 text-green-800 border-green-200' :
//                         selectedCandidate.status === 'Hired' ? 'bg-green-200 text-green-900 border-green-300' :
//                         'bg-red-100 text-red-800 border-red-200'
//                       }`}
//                     >
//                       <option value="New">New</option>
//                       <option value="Screening">Screening</option>
//                       <option value="Interview">Interview</option>
//                       <option value="Offer">Offer</option>
//                       <option value="Hired">Hired</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </div>
//                   <div className="mb-6">
//                     <h4 className="text-lg font-medium mb-2">Source</h4>
//                     <p className="text-gray-700">{selectedCandidate.source}</p>
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-medium mb-2">Notes</h4>
//                     <textarea
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       rows={4}
//                       defaultValue={selectedCandidate.notes}
//                       onBlur={(e) => saveNotes(selectedCandidate.id, e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   onClick={() => setIsViewModalOpen(false)}
//                   className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Candidates;

import React, { useState, useEffect } from 'react';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [newCandidate, setNewCandidate] = useState({
    jobId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    source: '',
    resume: null,
    status: 'New',
    qualification: '',
    skills: [],
    notes: '',
  });
  const [filters, setFilters] = useState({ status: '', position: '' });

  useEffect(() => {
    try {
      const storedCandidates = localStorage.getItem('candidates');
      const storedJobs = localStorage.getItem('jobs');
      if (storedJobs) {
        setJobs(JSON.parse(storedJobs));
      }
      if (storedCandidates) {
        const parsedCandidates = JSON.parse(storedCandidates);
        const validCandidates = parsedCandidates.filter(
          candidate => candidate.firstName && candidate.lastName
        );
        // Ensure skills is an array for all candidates
        const candidatesWithSkills = validCandidates.map(candidate => ({
          ...candidate,
          skills: Array.isArray(candidate.skills) ? candidate.skills : [],
        }));
        setCandidates(candidatesWithSkills);
      } else {
        const mockCandidates = [
          {
            id: 1,
            jobId: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '(123) 456-7890',
            position: 'Senior Developer',
            source: 'LinkedIn',
            appliedDate: '2023-05-10',
            status: 'Interview',
            resume: 'john_doe_resume.pdf',
            qualification: 'Bachelor of Science in Computer Science',
            skills: ['JavaScript', 'React', 'Node.js'],
            notes: 'Strong technical background',
          },
          {
            id: 2,
            jobId: 2,
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.j@example.com',
            phone: '(234) 567-8901',
            position: 'Marketing Manager',
            source: 'Company Website',
            appliedDate: '2023-05-05',
            status: 'Offer',
            resume: 'sarah_j_resume.pdf',
            qualification: 'MBA',
            skills: ['Marketing', 'SEO', 'Analytics'],
            notes: 'Excellent communication skills',
          },
          {
            id: 3,
            jobId: 3,
            firstName: 'Michael',
            lastName: 'Chen',
            email: 'michael.chen@example.com',
            phone: '(345) 678-9012',
            position: 'Data Analyst',
            source: 'Referral',
            appliedDate: '2023-05-12',
            status: 'New',
            resume: 'michael_chen_resume.pdf',
            qualification: 'Master’s in Data Science',
            skills: ['Python', 'SQL', 'Tableau'],
            notes: 'Needs technical screening',
          },
        ];
        setCandidates(mockCandidates);
        localStorage.setItem('candidates', JSON.stringify(mockCandidates));
      }
    } catch (error) {
      console.error('Error loading candidates from localStorage:', error);
      setCandidates([]);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      setNewCandidate(prev => ({
        ...prev,
        skills: value ? value.split(',').map(s => s.trim()) : [],
      }));
    } else {
      setNewCandidate(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setNewCandidate(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedCandidates;
    if (modalMode === 'add') {
      const newId = candidates.length > 0 ? Math.max(...candidates.map(c => c.id)) + 1 : 1;
      const submittedCandidate = {
        ...newCandidate,
        id: newId,
        jobId: parseInt(newCandidate.jobId),
        appliedDate: new Date().toISOString().split('T')[0],
        resume: newCandidate.resume ? newCandidate.resume.name : 'No resume uploaded',
      };
      updatedCandidates = [...candidates, submittedCandidate];
      // Update job applicants count
      const jobId = parseInt(newCandidate.jobId);
      const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const updatedJobs = storedJobs.map(job =>
        job.id === jobId ? { ...job, applicants: (job.applicants || 0) + 1 } : job
      );
      setJobs(updatedJobs);
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    } else {
      const updatedCandidate = {
        ...editingCandidate,
        ...newCandidate,
        jobId: parseInt(newCandidate.jobId),
        resume: newCandidate.resume ? newCandidate.resume.name : editingCandidate.resume,
      };
      updatedCandidates = candidates.map(c => (c.id === updatedCandidate.id ? updatedCandidate : c));
    }
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    setIsAddModalOpen(false);
    resetForm();
  };

  const editCandidate = (candidate) => {
    setModalMode('edit');
    setEditingCandidate(candidate);
    setNewCandidate({
      ...candidate,
      skills: Array.isArray(candidate.skills) ? candidate.skills : [],
      resume: null,
    });
    setIsAddModalOpen(true);
  };

  const deleteCandidate = (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      const updatedCandidates = candidates.filter(candidate => candidate.id !== id);
      setCandidates(updatedCandidates);
      localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    }
  };

  const viewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setIsViewModalOpen(true);
  };

  const updateStatus = (id, newStatus) => {
    const updatedCandidates = candidates.map(candidate =>
      candidate.id === id ? { ...candidate, status: newStatus } : candidate
    );
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate(prev => ({ ...prev, status: newStatus }));
    }
  };

  const saveNotes = (id, notes) => {
    const updatedCandidates = candidates.map(candidate =>
      candidate.id === id ? { ...candidate, notes } : candidate
    );
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    setSelectedCandidate(prev => ({ ...prev, notes }));
  };

  const resetForm = () => {
    setNewCandidate({
      jobId: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      source: '',
      resume: null,
      status: 'New',
      qualification: '',
      skills: [],
      notes: '',
    });
    setEditingCandidate(null);
    setModalMode('add');
  };

  const filteredCandidates = candidates.filter(candidate => (
    (filters.status === '' || candidate.status === filters.status) &&
    (filters.position === '' || candidate.position.toLowerCase().includes(filters.position.toLowerCase()))
  ));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Candidates</h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Candidate
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Screening">Screening</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              value={filters.position}
              onChange={(e) => setFilters({ ...filters, position: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Filter by position"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({ status: '', position: '' })}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCandidates.map(candidate => (
              <tr key={candidate.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      {candidate.firstName?.charAt(0) || ''}{candidate.lastName?.charAt(0) || ''}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {candidate.firstName || 'Unknown'} {candidate.lastName || 'Candidate'}
                      </div>
                      <div className="text-sm text-gray-500">{candidate.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.source}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.appliedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={candidate.status}
                    onChange={(e) => updateStatus(candidate.id, e.target.value)}
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      candidate.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      candidate.status === 'Screening' ? 'bg-yellow-100 text-yellow-800' :
                      candidate.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
                      candidate.status === 'Offer' ? 'bg-green-100 text-green-800' :
                      candidate.status === 'Hired' ? 'bg-green-200 text-green-900' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    <option value="New">New</option>
                    <option value="Screening">Screening</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => viewCandidate(candidate)} className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button onClick={() => editCandidate(candidate)} className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                  <button onClick={() => deleteCandidate(candidate.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{modalMode === 'add' ? 'Add New Candidate' : 'Edit Candidate'}</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Posting*</label>
                    <select
                      name="jobId"
                      value={newCandidate.jobId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Job</option>
                      {jobs.map(job => (
                        <option key={job.id} value={job.id}>
                          {job.title} - {job.department}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      value={newCandidate.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      value={newCandidate.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={newCandidate.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newCandidate.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
                    <input
                      type="text"
                      name="position"
                      value={newCandidate.position}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select
                      name="source"
                      value={newCandidate.source}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select source</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Indeed">Indeed</option>
                      <option value="Company Website">Company Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Job Fair">Job Fair</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={newCandidate.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="New">New</option>
                      <option value="Screening">Screening</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={newCandidate.qualification}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
                    <input
                      type="text"
                      name="skills"
                      value={Array.isArray(newCandidate.skills) ? newCandidate.skills.join(', ') : ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                    {modalMode === 'edit' && editingCandidate && (
                      <p className="text-sm text-gray-500 mb-1">Current: {editingCandidate.resume}</p>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {modalMode === 'add' ? 'Add Candidate' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Candidate Details</h3>
                <button onClick={() => setIsViewModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl mb-4">
                      {selectedCandidate.firstName?.charAt(0) || ''}{selectedCandidate.lastName?.charAt(0) || ''}
                    </div>
                    <h4 className="text-xl font-medium">
                      {selectedCandidate.firstName || 'Unknown'} {selectedCandidate.lastName || 'Candidate'}
                    </h4>
                    <p className="text-gray-600">{selectedCandidate.position}</p>
                    <div className="mt-6 w-full">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{selectedCandidate.email}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{selectedCandidate.phone}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>{selectedCandidate.resume}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Applied: {selectedCandidate.appliedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Candidate Status</h4>
                    <select
                      value={selectedCandidate.status}
                      onChange={(e) => updateStatus(selectedCandidate.id, e.target.value)}
                      className={`px-3 py-2 border rounded-md ${
                        selectedCandidate.status === 'New' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        selectedCandidate.status === 'Screening' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        selectedCandidate.status === 'Interview' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                        selectedCandidate.status === 'Offer' ? 'bg-green-100 text-green-800 border-green-200' :
                        selectedCandidate.status === 'Hired' ? 'bg-green-200 text-green-900 border-green-300' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Screening">Screening</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Source</h4>
                    <p className="text-gray-700">{selectedCandidate.source}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Qualification</h4>
                    <p className="text-gray-700">{selectedCandidate.qualification || 'Not specified'}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(selectedCandidate.skills) && selectedCandidate.skills.length > 0 ? (
                        selectedCandidate.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {skill}
                          </span>
                        ))
                      ) : (
                        'No skills listed'
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Notes</h4>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      defaultValue={selectedCandidate.notes}
                      onBlur={(e) => saveNotes(selectedCandidate.id, e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;