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
import { Briefcase, MapPin, Calendar, Users,FileText,Check, CheckCircle, Edit, Trash2, X, Eye, Plus, ChevronRight, Clock, GraduationCap} from 'lucide-react';
import { motion } from 'framer-motion';

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

  // return (
  //   <div>
  //     <div className="flex justify-between items-center mb-6">
  //       <h3 className="text-lg font-semibold">Job Postings</h3>
  //       <button
  //         onClick={() => setIsModalOpen(true)}
  //         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
  //       >
  //         Post New Job
  //       </button>
  //     </div>

  //     <div className="bg-white rounded-lg shadow overflow-hidden">
  //       <table className="min-w-full divide-y divide-gray-200">
  //         <thead className="bg-gray-50">
  //           <tr>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Date</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody className="bg-white divide-y divide-gray-200">
  //           {jobs.map((job) => (
  //             <tr key={job.id}>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.postedDate}</td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.lastDate}</td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applicants}</td>
  //               <td className="px-6 py-4 whitespace-nowrap">
  //                 <span
  //                   className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
  //                     job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  //                   }`}
  //                 >
  //                   {job.status}
  //                 </span>
  //               </td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  //                 <button
  //                   onClick={() => viewJob(job)}
  //                   className="text-blue-600 hover:text-blue-900 mr-3"
  //                 >
  //                   View
  //                 </button>
  //                 <button
  //                   onClick={() => editJob(job)}
  //                   className="text-green-600 hover:text-green-900 mr-3"
  //                 >
  //                   Edit
  //                 </button>
  //                 <button
  //                   onClick={() => deleteJob(job.id)}
  //                   className="text-red-600 hover:text-red-900 mr-3"
  //                 >
  //                   Delete
  //                 </button>
  //                 {job.status === 'Active' && (
  //                   <button
  //                     onClick={() => closeJob(job.id)}
  //                     className="text-red-600 hover:text-red-900"
  //                   >
  //                     Close
  //                   </button>
  //                 )}
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>

  //     {/* Add/Edit Modal */}
  //     {isModalOpen && (
  //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  //         <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
  //           <div className="p-6">
  //             <div className="flex justify-between items-center mb-4">
  //               <h3 className="text-lg font-semibold">{modalMode === 'add' ? 'Post New Job' : 'Edit Job Posting'}</h3>
  //               <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
  //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  //                 </svg>
  //               </button>
  //             </div>
  //             <form onSubmit={handleSubmit}>
  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
  //                   <input
  //                     type="text"
  //                     name="title"
  //                     value={newJob.title}
  //                     onChange={handleInputChange}
  //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  //                     required
  //                   />
  //                 </div>
  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
  //                   <input
  //                     type="text"
  //                     name="department"
  //                     value={newJob.department}
  //                     onChange={handleInputChange}
  //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  //                     required
  //                   />
  //                 </div>
  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
  //                   <input
  //                     type="text"
  //                     name="location"
  //                     value={newJob.location}
  //                     onChange={handleInputChange}
  //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  //                     required
  //                   />
  //                 </div>
  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
  //                   <select
  //                     name="type"
  //                     value={newJob.type}
  //                     onChange={handleInputChange}
  //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  //                     required
  //                   >
  //                     <option value="Full-time">Full-time</option>
  //                     <option value="Part-time">Part-time</option>
  //                     <option value="Contract">Contract</option>
  //                     <option value="Internship">Internship</option>
  //                     <option value="Temporary">Temporary</option>
  //                   </select>
  //                 </div>
  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-700 mb-1">Last Date*</label>
  //                   <input
  //                     type="date"
  //                     name="lastDate"
  //                     value={newJob.lastDate}
  //                     onChange={handleInputChange}
  //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  //                     required
  //                   />
  //                 </div>
  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-700 mb-1">Qualification Required*</label>
  //                   <input
  //                     type="text"
  //                     name="qualification"
  //                     value={newJob.qualification}
  //                     onChange={handleInputChange}
  //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //               <div className="mb-6">
  //                 <label className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
  //                 <textarea
  //                   name="description"
  //                   value={newJob.description}
  //                   onChange={handleInputChange}
  //                   rows={5}
  //                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  //                   required
  //                 />
  //               </div>
  //               <div className="mb-6">
  //                 <label className="block text-sm font-medium text-gray-700 mb-1">Requirements*</label>
  //                 <textarea
  //                   name="requirements"
  //                   value={newJob.requirements}
  //                   onChange={handleInputChange}
  //                   rows={5}
  //                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  //                   required
  //                 />
  //               </div>
  //               <div className="flex justify-end space-x-3">
  //                 <button
  //                   type="button"
  //                   onClick={() => setIsModalOpen(false)}
  //                   className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
  //                 >
  //                   Cancel
  //                 </button>
  //                 <button
  //                   type="submit"
  //                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
  //                 >
  //                   {modalMode === 'add' ? 'Post Job' : 'Save Changes'}
  //                 </button>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     )}

  //     {/* View Modal */}
  //     {isViewModalOpen && (
  //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  //         <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
  //           <div className="p-6">
  //             <div className="flex justify-between items-center mb-4">
  //               <h3 className="text-lg font-semibold">Job Details</h3>
  //               <button
  //                 onClick={() => setIsViewModalOpen(false)}
  //                 className="text-gray-500 hover:text-gray-700"
  //               >
  //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  //                 </svg>
  //               </button>
  //             </div>
  //             {viewingJob && (
  //               <div className="space-y-4">
  //                 <div>
  //                   <h4 className="text-xl font-bold">{viewingJob.title}</h4>
  //                 </div>
  //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //                   <div>
  //                     <span className="font-medium">Department:</span> {viewingJob.department}
  //                   </div>
  //                   <div>
  //                     <span className="font-medium">Location:</span> {viewingJob.location}
  //                   </div>
  //                   <div>
  //                     <span className="font-medium">Type:</span> {viewingJob.type}
  //                   </div>
  //                   <div>
  //                     <span className="font-medium">Posted Date:</span> {viewingJob.postedDate}
  //                   </div>
  //                   <div>
  //                     <span className="font-medium">Last Date:</span> {viewingJob.lastDate}
  //                   </div>
  //                   <div>
  //                     <span className="font-medium">Applicants:</span> {viewingJob.applicants}
  //                   </div>
  //                   <div>
  //                     <span className="font-medium">Status:</span> {viewingJob.status}
  //                   </div>
  //                   <div>
  //                     <span className="font-medium">Qualification:</span> {viewingJob.qualification}
  //                   </div>
  //                 </div>
  //                 <div>
  //                   <h5 className="font-medium text-lg mb-2">Description</h5>
  //                   <p className="text-gray-700">{viewingJob.description || 'No description provided'}</p>
  //                 </div>
  //                 <div>
  //                   <h5 className="font-medium text-lg mb-2">Requirements</h5>
  //                   <p className="text-gray-700">{viewingJob.requirements || 'No requirements provided'}</p>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="mr-3 text-blue-600"
          >
            <Briefcase size={28} />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-800">Job Postings</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Post New Job
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h4>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center ${
                    job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {job.status === 'Active' ? (
                    <CheckCircle size={12} className="mr-1" />
                  ) : (
                    <Clock size={12} className="mr-1" />
                  )}
                  {job.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Briefcase size={16} className="mr-2 text-blue-500" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-2 text-blue-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2 text-blue-500" />
                  <span>Deadline: {job.lastDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={16} className="mr-2 text-blue-500" />
                  <span>{job.applicants} Applicants</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => viewJob(job)}
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                >
                  <Eye size={16} className="mr-1" />
                  View Details
                </motion.button>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => editJob(job)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Edit size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => deleteJob(job.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>
              
              {job.status === 'Active' && (
                <div className="mt-4 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => closeJob(job.id)}
                    className="w-full px-3 py-2 text-xs border border-red-200 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Close Job Posting
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state for when there are no jobs */}
      {jobs.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Briefcase size={64} className="text-gray-300 mb-4" />
            <h4 className="text-xl font-semibold text-gray-700 mb-2">No Job Postings Yet</h4>
            <p className="text-gray-500 mb-6">Create your first job posting by clicking the button above.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus size={18} className="mr-2" />
              Post New Job
            </motion.button>
          </motion.div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  {modalMode === 'add' ? (
                    <>
                      <Plus size={20} className="mr-2 text-blue-600" />
                      Post New Job
                    </>
                  ) : (
                    <>
                      <Edit size={20} className="mr-2 text-blue-600" />
                      Edit Job Posting
                    </>
                  )}
                </h3>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </motion.button>
              </div>
              {/* <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={newJob.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
                    <select
                      name="type"
                      value={newJob.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
                  <textarea
                    name="description"
                    value={newJob.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements*</label>
                  <textarea
                    name="requirements"
                    value={newJob.requirements}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {modalMode === 'add' ? 'Post Job' : 'Save Changes'}
                  </motion.button>
                </div>
              </form> */}
              <form onSubmit={handleSubmit} className="space-y-8">
  {/* Form Header with visual indicator */}
  <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500 mb-6">
    <h4 className="text-blue-800 font-medium flex items-center">
      <Calendar className="mr-2 text-blue-600" size={18} />
      {modalMode === 'add' ? 'Create a new job opportunity' : 'Update job details'}
    </h4>
    <p className="text-blue-600 text-sm mt-1">Fill in all required fields marked with an asterisk (*)</p>
  </div>

  {/* Form Sections */}
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h5 className="text-gray-700 font-medium mb-4 flex items-center">
      <Briefcase className="mr-2 text-blue-500" size={16} />
      Job Information
    </h5>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
          Job Title <span className="text-red-500 ml-0.5">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="title"
            value={newJob.title}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
            placeholder="e.g. Senior Frontend Developer"
            required
          />
          <Briefcase className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={18} />
        </div>
        <p className="mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          A clear title attracts more qualified candidates
        </p>
      </div>
      
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
          Department <span className="text-red-500 ml-0.5">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="department"
            value={newJob.department}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
            placeholder="e.g. Engineering, Marketing"
            required
          />
          <Users className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={18} />
        </div>
      </div>
    </div>
  </div>

  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h5 className="text-gray-700 font-medium mb-4 flex items-center">
      <MapPin className="mr-2 text-blue-500" size={16} />
      Location & Type
    </h5>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
          Location <span className="text-red-500 ml-0.5">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="location"
            value={newJob.location}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
            placeholder="e.g. Remote, New York"
            required
          />
          <MapPin className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={18} />
        </div>
      </div>
      
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
          Job Type <span className="text-red-500 ml-0.5">*</span>
        </label>
        <div className="relative">
          <select
            name="type"
            value={newJob.type}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-200 group-hover:border-blue-300"
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Temporary">Temporary</option>
          </select>
          <Clock className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={18} />
          <ChevronRight className="absolute right-3 top-3.5 text-gray-400 transform rotate-90" size={18} />
        </div>
      </div>
    </div>
  </div>

  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h5 className="text-gray-700 font-medium mb-4 flex items-center">
      <Calendar className="mr-2 text-blue-500" size={16} />
      Timeline & Qualifications
    </h5>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
          Application Deadline <span className="text-red-500 ml-0.5">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            name="lastDate"
            value={newJob.lastDate}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
            required
          />
          <Calendar className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={18} />
        </div>
      </div>
      
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
          Qualification Required <span className="text-red-500 ml-0.5">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="qualification"
            value={newJob.qualification}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
            placeholder="e.g. Bachelor's in Computer Science"
            required
          />
          <GraduationCap className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={18} />
        </div>
      </div>
    </div>
  </div>

  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h5 className="text-gray-700 font-medium mb-4 flex items-center">
      <FileText className="mr-2 text-blue-500" size={16} />
      Job Details
    </h5>
    
    <div className="space-y-6">
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
          Job Description <span className="text-red-500 ml-0.5">*</span>
        </label>
        <div className="relative">
          <textarea
            name="description"
            value={newJob.description}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
            placeholder="Enter a detailed description of the job responsibilities and expectations..."
            required
          />
          <div className="absolute top-3 right-3 text-xs text-gray-400">
            {newJob.description.length} characters
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          A comprehensive description helps candidates understand the role better
        </p>
      </div>
      
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
          Requirements <span className="text-red-500 ml-0.5">*</span>
        </label>
        <div className="relative">
          <textarea
            name="requirements"
            value={newJob.requirements}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
            placeholder="List the skills, experience, and qualifications required for this position..."
            required
          />
          <div className="absolute top-3 right-3 text-xs text-gray-400">
            {newJob.requirements.length} characters
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Clear requirements attract more relevant candidates
        </p>
      </div>
    </div>
  </div>

  {/* Form Actions */}
  <div className="flex justify-end space-x-4 pt-4">
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type="button"
      onClick={() => setIsModalOpen(false)}
      className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 shadow-sm flex items-center transition-all duration-200"
    >
      <X size={18} className="mr-2" />
      Cancel
    </motion.button>
    
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type="submit"
      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-medium hover:from-blue-700 hover:to-blue-800 shadow-md flex items-center transition-all duration-200"
    >
      {modalMode === 'add' ? (
        <>
          <Plus size={18} className="mr-2" />
          Post Job
        </>
      ) : (
        <>
          <Check size={18} className="mr-2" />
          Save Changes
        </>
      )}
    </motion.button>
  </div>
</form>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* View Modal */}
      {isViewModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto"
          >
            {viewingJob && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <Eye size={20} className="mr-2 text-blue-600" />
                    Job Details
                  </h3>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setIsViewModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">{viewingJob.title}</h4>
                  <div className="flex items-center text-blue-700">
                    <Briefcase size={16} className="mr-2" />
                    <span className="font-medium">{viewingJob.department}</span>
                    <span className="mx-2">•</span>
                    <MapPin size={16} className="mr-1" />
                    <span>{viewingJob.location}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2 text-gray-700">
                      <Clock size={18} className="mr-2 text-blue-600" />
                      <span className="font-medium">Job Type</span>
                    </div>
                    <p>{viewingJob.type}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2 text-gray-700">
                      <Calendar size={18} className="mr-2 text-blue-600" />
                      <span className="font-medium">Posted Date</span>
                    </div>
                    <p>{viewingJob.postedDate}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2 text-gray-700">
                      <Calendar size={18} className="mr-2 text-blue-600" />
                      <span className="font-medium">Application Deadline</span>
                    </div>
                    <p>{viewingJob.lastDate}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2 text-gray-700">
                      <Users size={18} className="mr-2 text-blue-600" />
                      <span className="font-medium">Applicants</span>
                    </div>
                    <p>{viewingJob.applicants}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-3 pb-2 border-b">
                    <ChevronRight size={20} className="text-blue-600" />
                    <h5 className="font-semibold text-lg text-gray-800">Qualifications</h5>
                  </div>
                  <p className="pl-6 text-gray-700">{viewingJob.qualification || 'No qualification provided'}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-3 pb-2 border-b">
                    <ChevronRight size={20} className="text-blue-600" />
                    <h5 className="font-semibold text-lg text-gray-800">Description</h5>
                  </div>
                  <p className="pl-6 text-gray-700">{viewingJob.description || 'No description provided'}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-3 pb-2 border-b">
                    <ChevronRight size={20} className="text-blue-600" />
                    <h5 className="font-semibold text-lg text-gray-800">Requirements</h5>
                  </div>
                  <p className="pl-6 text-gray-700">{viewingJob.requirements || 'No requirements provided'}</p>
                </div>
                
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsViewModalOpen(false)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default JobPostings;