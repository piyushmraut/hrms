// import React from "react";
// import { useState,useEffect } from "react";
// const JobPostings = () => {
//     const [jobs, setJobs] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newJob, setNewJob] = useState({
//       title: '',
//       department: '',
//       location: '',
//       type: 'Full-time',
//       description: '',
//       requirements: ''
//     });
  
//     useEffect(() => {
//       // Fetch jobs from API
//       const fetchJobs = async () => {
//         // Mock data - replace with actual API call
//         const mockJobs = [
//           {
//             id: 1,
//             title: 'Senior Developer',
//             department: 'Engineering',
//             location: 'Remote',
//             type: 'Full-time',
//             postedDate: '2023-05-01',
//             applicants: 15,
//             status: 'Active'
//           },
//           {
//             id: 2,
//             title: 'Marketing Manager',
//             department: 'Marketing',
//             location: 'New York',
//             type: 'Full-time',
//             postedDate: '2023-04-25',
//             applicants: 8,
//             status: 'Active'
//           },
//           {
//             id: 3,
//             title: 'UX Designer',
//             department: 'Design',
//             location: 'San Francisco',
//             type: 'Contract',
//             postedDate: '2023-05-10',
//             applicants: 12,
//             status: 'Active'
//           }
//         ];
//         setJobs(mockJobs);
//       };
//       fetchJobs();
//     }, []);
  
//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setNewJob(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       // Submit to API and update state
//       const submittedJob = {
//         ...newJob,
//         id: jobs.length + 1,
//         postedDate: new Date().toISOString().split('T')[0],
//         applicants: 0,
//         status: 'Active'
//       };
//       setJobs([...jobs, submittedJob]);
//       setIsModalOpen(false);
//       setNewJob({
//         title: '',
//         department: '',
//         location: '',
//         type: 'Full-time',
//         description: '',
//         requirements: ''
//       });
//     };
  
//     const closeJob = (id) => {
//       setJobs(jobs.map(job => 
//         job.id === id ? { ...job, status: 'Closed' } : job
//       ));
//     };
  
//     return (
//       <div>
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-lg font-semibold">Job Postings</h3>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Post New Job
//           </button>
//         </div>
  
//         {/* Jobs Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {jobs.map(job => (
//                 <tr key={job.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.postedDate}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applicants}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                     }`}>
//                       {job.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
//                     {job.status === 'Active' && (
//                       <button 
//                         onClick={() => closeJob(job.id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Close
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
  
//         {/* New Job Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold">Post New Job</h3>
//                   <button 
//                     onClick={() => setIsModalOpen(false)}
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
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
//                       <input
//                         type="text"
//                         name="title"
//                         value={newJob.title}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
//                       <input
//                         type="text"
//                         name="department"
//                         value={newJob.department}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
//                       <input
//                         type="text"
//                         name="location"
//                         value={newJob.location}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
//                       <select
//                         name="type"
//                         value={newJob.type}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                       >
//                         <option value="Full-time">Full-time</option>
//                         <option value="Part-time">Part-time</option>
//                         <option value="Contract">Contract</option>
//                         <option value="Internship">Internship</option>
//                         <option value="Temporary">Temporary</option>
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
//                     <textarea
//                       name="description"
//                       value={newJob.description}
//                       onChange={handleInputChange}
//                       rows={5}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
                  
//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Requirements*</label>
//                     <textarea
//                       name="requirements"
//                       value={newJob.requirements}
//                       onChange={handleInputChange}
//                       rows={5}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
                  
//                   <div className="flex justify-end space-x-3">
//                     <button
//                       type="button"
//                       onClick={() => setIsModalOpen(false)}
//                       className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//                     >
//                       Post Job
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

// export default JobPostings;

// import React, { useState, useEffect } from 'react';

// const JobPostings = () => {
//   const [jobs, setJobs] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newJob, setNewJob] = useState({
//     title: '',
//     department: '',
//     location: '',
//     type: 'Full-time',
//     description: '',
//     requirements: '',
//   });

//   useEffect(() => {
//     const storedJobs = localStorage.getItem('jobs');
//     if (storedJobs) {
//       setJobs(JSON.parse(storedJobs));
//     } else {
//       const mockJobs = [
//         { id: 1, title: 'Senior Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', postedDate: '2023-05-01', applicants: 15, status: 'Active' },
//         { id: 2, title: 'Marketing Manager', department: 'Marketing', location: 'New York', type: 'Full-time', postedDate: '2023-04-25', applicants: 8, status: 'Active' },
//         { id: 3, title: 'UX Designer', department: 'Design', location: 'San Francisco', type: 'Contract', postedDate: '2023-05-10', applicants: 12, status: 'Active' },
//       ];
//       setJobs(mockJobs);
//       localStorage.setItem('jobs', JSON.stringify(mockJobs));
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewJob(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1;
//     const submittedJob = {
//       ...newJob,
//       id: newId,
//       postedDate: new Date().toISOString().split('T')[0],
//       applicants: 0,
//       status: 'Active',
//     };
//     const updatedJobs = [...jobs, submittedJob];
//     setJobs(updatedJobs);
//     localStorage.setItem('jobs', JSON.stringify(updatedJobs));
//     setIsModalOpen(false);
//     setNewJob({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '' });
//   };

//   const closeJob = (id) => {
//     const updatedJobs = jobs.map(job => (job.id === id ? { ...job, status: 'Closed' } : job));
//     setJobs(updatedJobs);
//     localStorage.setItem('jobs', JSON.stringify(updatedJobs));
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold">Job Postings</h3>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           Post New Job
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {jobs.map(job => (
//               <tr key={job.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.postedDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applicants}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                     {job.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
//                   {job.status === 'Active' && (
//                     <button onClick={() => closeJob(job.id)} className="text-red-600 hover:text-red-900">
//                       Close
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Post New Job</h3>
//                 <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={newJob.title}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
//                     <input
//                       type="text"
//                       name="department"
//                       value={newJob.department}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
//                     <input
//                       type="text"
//                       name="location"
//                       value={newJob.location}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
//                     <select
//                       name="type"
//                       value={newJob.type}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="Full-time">Full-time</option>
//                       <option value="Part-time">Part-time</option>
//                       <option value="Contract">Contract</option>
//                       <option value="Internship">Internship</option>
//                       <option value="Temporary">Temporary</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
//                   <textarea
//                     name="description"
//                     value={newJob.description}
//                     onChange={handleInputChange}
//                     rows={5}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Requirements*</label>
//                   <textarea
//                     name="requirements"
//                     value={newJob.requirements}
//                     onChange={handleInputChange}
//                     rows={5}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//                   >
//                     Post Job
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobPostings;

// import React, { useState, useEffect } from 'react';

// const JobPostings = () => {
//   const [jobs, setJobs] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
//   const [editingJob, setEditingJob] = useState(null);
//   const [newJob, setNewJob] = useState({
//     title: '',
//     department: '',
//     location: '',
//     type: 'Full-time',
//     description: '',
//     requirements: '',
//     lastDate: '',
//     qualification: '',
//   });

//   useEffect(() => {
//     try {
//       const storedJobs = localStorage.getItem('jobs');
//       if (storedJobs) {
//         setJobs(JSON.parse(storedJobs));
//       } else {
//         const mockJobs = [
//           {
//             id: 1,
//             title: 'Senior Developer',
//             department: 'Engineering',
//             location: 'Remote',
//             type: 'Full-time',
//             postedDate: '2023-05-01',
//             lastDate: '2023-06-01',
//             qualification: 'Bachelor’s in Computer Science',
//             applicants: 15,
//             status: 'Active',
//           },
//           {
//             id: 2,
//             title: 'Marketing Manager',
//             department: 'Marketing',
//             location: 'New York',
//             type: 'Full-time',
//             postedDate: '2023-04-25',
//             lastDate: '2023-05-25',
//             qualification: 'MBA',
//             applicants: 8,
//             status: 'Active',
//           },
//           {
//             id: 3,
//             title: 'UX Designer',
//             department: 'Design',
//             location: 'San Francisco',
//             type: 'Contract',
//             postedDate: '2023-05-10',
//             lastDate: '2023-06-10',
//             qualification: 'Degree in Design',
//             applicants: 12,
//             status: 'Active',
//           },
//         ];
//         setJobs(mockJobs);
//         localStorage.setItem('jobs', JSON.stringify(mockJobs));
//       }
//     } catch (error) {
//       console.error('Error loading jobs from localStorage:', error);
//       setJobs([]);
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewJob(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let updatedJobs;
//     if (modalMode === 'add') {
//       const newId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1;
//       const submittedJob = {
//         ...newJob,
//         id: newId,
//         postedDate: new Date().toISOString().split('T')[0],
//         applicants: 0,
//         status: 'Active',
//       };
//       updatedJobs = [...jobs, submittedJob];
//     } else {
//       const updatedJob = { ...editingJob, ...newJob };
//       updatedJobs = jobs.map(j => (j.id === updatedJob.id ? updatedJob : j));
//     }
//     setJobs(updatedJobs);
//     localStorage.setItem('jobs', JSON.stringify(updatedJobs));
//     setIsModalOpen(false);
//     resetForm();
//   };

//   const editJob = (job) => {
//     setModalMode('edit');
//     setEditingJob(job);
//     setNewJob({ ...job });
//     setIsModalOpen(true);
//   };

//   const deleteJob = (id) => {
//     if (window.confirm('Are you sure you want to delete this job posting?')) {
//       const updatedJobs = jobs.filter(job => job.id !== id);
//       setJobs(updatedJobs);
//       localStorage.setItem('jobs', JSON.stringify(updatedJobs));
//     }
//   };

//   const closeJob = (id) => {
//     const updatedJobs = jobs.map(job => (job.id === id ? { ...job, status: 'Closed' } : job));
//     setJobs(updatedJobs);
//     localStorage.setItem('jobs', JSON.stringify(updatedJobs));
//   };

//   const resetForm = () => {
//     setNewJob({
//       title: '',
//       department: '',
//       location: '',
//       type: 'Full-time',
//       description: '',
//       requirements: '',
//       lastDate: '',
//       qualification: '',
//     });
//     setEditingJob(null);
//     setModalMode('add');
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold">Job Postings</h3>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           Post New Job
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {jobs.map(job => (
//               <tr key={job.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.postedDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.lastDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applicants}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                     {job.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
//                   <button onClick={() => editJob(job)} className="text-green-600 hover:text-green-900 mr-3">Edit</button>
//                   <button onClick={() => deleteJob(job.id)} className="text-red-600 hover:text-red-900 mr-3">Delete</button>
//                   {job.status === 'Active' && (
//                     <button onClick={() => closeJob(job.id)} className="text-red-600 hover:text-red-900">
//                       Close
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">{modalMode === 'add' ? 'Post New Job' : 'Edit Job Posting'}</h3>
//                 <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={newJob.title}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
//                     <input
//                       type="text"
//                       name="department"
//                       value={newJob.department}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
//                     <input
//                       type="text"
//                       name="location"
//                       value={newJob.location}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
//                     <select
//                       name="type"
//                       value={newJob.type}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="Full-time">Full-time</option>
//                       <option value="Part-time">Part-time</option>
//                       <option value="Contract">Contract</option>
//                       <option value="Internship">Internship</option>
//                       <option value="Temporary">Temporary</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Last Date*</label>
//                     <input
//                       type="date"
//                       name="lastDate"
//                       value={newJob.lastDate}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Qualification Required*</label>
//                     <input
//                       type="text"
//                       name="qualification"
//                       value={newJob.qualification}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
//                   <textarea
//                     name="description"
//                     value={newJob.description}
//                     onChange={handleInputChange}
//                     rows={5}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Requirements*</label>
//                   <textarea
//                     name="requirements"
//                     value={newJob.requirements}
//                     onChange={handleInputChange}
//                     rows={5}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//                   >
//                     {modalMode === 'add' ? 'Post Job' : 'Save Changes'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobPostings;

import React, { useState, useEffect } from 'react';

const JobPostings = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingJob, setEditingJob] = useState(null);
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    lastDate: '',
    qualification: '',
  });
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingJob, setViewingJob] = useState(null);

  useEffect(() => {
    try {
      const storedJobs = localStorage.getItem('jobs');
      if (storedJobs) {
        setJobs(JSON.parse(storedJobs));
      } else {
        const mockJobs = [
          {
            id: 1,
            title: 'Senior Developer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time',
            postedDate: '2023-05-01',
            lastDate: '2023-06-01',
            qualification: 'Bachelor’s in Computer Science',
            applicants: 15,
            status: 'Active',
            description: 'Develop and maintain web applications.',
            requirements: '5+ years of experience, proficiency in React.',
          },
          {
            id: 2,
            title: 'Marketing Manager',
            department: 'Marketing',
            location: 'New York',
            type: 'Full-time',
            postedDate: '2023-04-25',
            lastDate: '2023-05-25',
            qualification: 'MBA',
            applicants: 8,
            status: 'Active',
            description: 'Lead marketing campaigns and strategy.',
            requirements: 'Experience in digital marketing.',
          },
          {
            id: 3,
            title: 'UX Designer',
            department: 'Design',
            location: 'San Francisco',
            type: 'Contract',
            postedDate: '2023-05-10',
            lastDate: '2023-06-10',
            qualification: 'Degree in Design',
            applicants: 12,
            status: 'Active',
            description: 'Design user-friendly interfaces.',
            requirements: 'Proficiency in Figma and Adobe XD.',
          },
        ];
        setJobs(mockJobs);
        localStorage.setItem('jobs', JSON.stringify(mockJobs));
      }
    } catch (error) {
      console.error('Error loading jobs from localStorage:', error);
      setJobs([]);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedJobs;
    if (modalMode === 'add') {
      const newId = jobs.length > 0 ? Math.max(...jobs.map((j) => j.id)) + 1 : 1;
      const submittedJob = {
        ...newJob,
        id: newId,
        postedDate: new Date().toISOString().split('T')[0],
        applicants: 0,
        status: 'Active',
      };
      updatedJobs = [...jobs, submittedJob];
    } else {
      const updatedJob = { ...editingJob, ...newJob };
      updatedJobs = jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j));
    }
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    setIsModalOpen(false);
    resetForm();
  };

  const editJob = (job) => {
    setModalMode('edit');
    setEditingJob(job);
    setNewJob({ ...job });
    setIsModalOpen(true);
  };

  const deleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      const updatedJobs = jobs.filter((job) => job.id !== id);
      setJobs(updatedJobs);
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    }
  };

  const closeJob = (id) => {
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, status: 'Closed' } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const viewJob = (job) => {
    setViewingJob(job);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setNewJob({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: '',
      lastDate: '',
      qualification: '',
    });
    setEditingJob(null);
    setModalMode('add');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Job Postings</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Post New Job
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.postedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.lastDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applicants}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => viewJob(job)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button
                    onClick={() => editJob(job)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="text-red-600 hover:text-red-900 mr-3"
                  >
                    Delete
                  </button>
                  {job.status === 'Active' && (
                    <button
                      onClick={() => closeJob(job.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Close
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{modalMode === 'add' ? 'Post New Job' : 'Edit Job Posting'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={newJob.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
                    <input
                      type="text"
                      name="department"
                      value={newJob.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                    <input
                      type="text"
                      name="location"
                      value={newJob.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
                    <select
                      name="type"
                      value={newJob.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Temporary">Temporary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Date*</label>
                    <input
                      type="date"
                      name="lastDate"
                      value={newJob.lastDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification Required*</label>
                    <input
                      type="text"
                      name="qualification"
                      value={newJob.qualification}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
                  <textarea
                    name="description"
                    value={newJob.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements*</label>
                  <textarea
                    name="requirements"
                    value={newJob.requirements}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {modalMode === 'add' ? 'Post Job' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Job Details</h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {viewingJob && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-bold">{viewingJob.title}</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Department:</span> {viewingJob.department}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {viewingJob.location}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {viewingJob.type}
                    </div>
                    <div>
                      <span className="font-medium">Posted Date:</span> {viewingJob.postedDate}
                    </div>
                    <div>
                      <span className="font-medium">Last Date:</span> {viewingJob.lastDate}
                    </div>
                    <div>
                      <span className="font-medium">Applicants:</span> {viewingJob.applicants}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {viewingJob.status}
                    </div>
                    <div>
                      <span className="font-medium">Qualification:</span> {viewingJob.qualification}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-lg mb-2">Description</h5>
                    <p className="text-gray-700">{viewingJob.description || 'No description provided'}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-lg mb-2">Requirements</h5>
                    <p className="text-gray-700">{viewingJob.requirements || 'No requirements provided'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostings;