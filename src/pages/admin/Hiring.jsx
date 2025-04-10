// import React, { useState, useEffect } from 'react';
// import { Plus, Edit, Trash2, Search, Filter, UserPlus, Calendar, FileText, CheckCircle, XCircle } from 'lucide-react';

// // Mock data for demonstration
// const initialJobs = [
//   { id: 1, title: 'Frontend Developer', department: 'Engineering', status: 'Open', applications: 12, posted: '2025-03-15' },
//   { id: 2, title: 'HR Manager', department: 'Human Resources', status: 'Open', applications: 8, posted: '2025-03-20' },
//   { id: 3, title: 'Product Designer', department: 'Design', status: 'Closed', applications: 24, posted: '2025-02-10' },
//   { id: 4, title: 'Backend Engineer', department: 'Engineering', status: 'Open', applications: 16, posted: '2025-03-25' },
// ];

// const initialCandidates = [
//   { id: 1, name: 'Alex Johnson', jobId: 1, email: 'alex@example.com', status: 'Screening', appliedDate: '2025-03-20' },
//   { id: 2, name: 'Sam Wilson', jobId: 1, email: 'sam@example.com', status: 'Interview', appliedDate: '2025-03-18' },
//   { id: 3, name: 'Jamie Smith', jobId: 2, email: 'jamie@example.com', status: 'Assessment', appliedDate: '2025-03-25' },
//   { id: 4, name: 'Taylor Brown', jobId: 4, email: 'taylor@example.com', status: 'Offer', appliedDate: '2025-03-15' },
// ];

// const Hiring = () => {
//   const [activeTab, setActiveTab] = useState('jobs');
//   const [jobs, setJobs] = useState(initialJobs);
//   const [candidates, setCandidates] = useState(initialCandidates);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);

//   // Modal form data
//   const [formData, setFormData] = useState({
//     id: null,
//     title: '',
//     department: '',
//     status: 'Open',
//     name: '',
//     email: '',
//     jobId: '',
//     candidateStatus: 'Screening',
//   });

//   // Add or update job
//   const handleJobSubmit = (e) => {
//     e.preventDefault();
    
//     if (formData.id) {
//       // Update existing job
//       setJobs(jobs.map(job => job.id === formData.id ? 
//         { ...job, title: formData.title, department: formData.department, status: formData.status } : 
//         job));
//     } else {
//       // Add new job
//       const newJob = {
//         id: jobs.length + 1,
//         title: formData.title,
//         department: formData.department,
//         status: formData.status,
//         applications: 0,
//         posted: new Date().toISOString().split('T')[0]
//       };
//       setJobs([...jobs, newJob]);
//     }
    
//     setShowModal(false);
//     resetForm();
//   };

//   // Add or update candidate
//   const handleCandidateSubmit = (e) => {
//     e.preventDefault();
    
//     if (formData.id) {
//       // Update existing candidate
//       setCandidates(candidates.map(candidate => candidate.id === formData.id ? 
//         { ...candidate, name: formData.name, email: formData.email, jobId: Number(formData.jobId), status: formData.candidateStatus } : 
//         candidate));
//     } else {
//       // Add new candidate
//       const newCandidate = {
//         id: candidates.length + 1,
//         name: formData.name,
//         email: formData.email,
//         jobId: Number(formData.jobId),
//         status: formData.candidateStatus,
//         appliedDate: new Date().toISOString().split('T')[0]
//       };
//       setCandidates([...candidates, newCandidate]);
//     }
    
//     setShowModal(false);
//     resetForm();
//   };

//   // Delete job
//   const deleteJob = (id) => {
//     setJobs(jobs.filter(job => job.id !== id));
//     // Also remove candidates associated with this job
//     setCandidates(candidates.filter(candidate => candidate.jobId !== id));
//   };

//   // Delete candidate
//   const deleteCandidate = (id) => {
//     setCandidates(candidates.filter(candidate => candidate.id !== id));
//   };

//   // Edit job
//   const editJob = (job) => {
//     setCurrentItem('job');
//     setFormData({
//       id: job.id,
//       title: job.title,
//       department: job.department,
//       status: job.status,
//       name: '',
//       email: '',
//       jobId: '',
//       candidateStatus: 'Screening',
//     });
//     setShowModal(true);
//   };

//   // Edit candidate
//   const editCandidate = (candidate) => {
//     setCurrentItem('candidate');
//     setFormData({
//       id: candidate.id,
//       title: '',
//       department: '',
//       status: 'Open',
//       name: candidate.name,
//       email: candidate.email,
//       jobId: candidate.jobId,
//       candidateStatus: candidate.status,
//     });
//     setShowModal(true);
//   };

//   // Reset form data
//   const resetForm = () => {
//     setFormData({
//       id: null,
//       title: '',
//       department: '',
//       status: 'Open',
//       name: '',
//       email: '',
//       jobId: '',
//       candidateStatus: 'Screening',
//     });
//   };

//   // Filter jobs and candidates based on search term
//   const filteredJobs = jobs.filter(job => 
//     job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     job.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredCandidates = candidates.filter(candidate => 
//     candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     jobs.find(job => job.id === candidate.jobId)?.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Open modal for new job or candidate
//   const openAddModal = (type) => {
//     setCurrentItem(type);
//     resetForm();
//     setShowModal(true);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900">HRMS Hiring Module</h1>
//           <div className="flex space-x-2">
//             <button 
//               onClick={() => openAddModal('job')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
//             >
//               <Plus size={18} />
//               Add Job
//             </button>
//             <button 
//               onClick={() => openAddModal('candidate')}
//               className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
//             >
//               <UserPlus size={18} />
//               Add Candidate
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 mb-6">
//           <button
//             className={`px-4 py-2 font-medium ${
//               activeTab === 'jobs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
//             }`}
//             onClick={() => setActiveTab('jobs')}
//           >
//             Job Listings
//           </button>
//           <button
//             className={`px-4 py-2 font-medium ${
//               activeTab === 'candidates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
//             }`}
//             onClick={() => setActiveTab('candidates')}
//           >
//             Candidates
//           </button>
//         </div>

//         {/* Search */}
//         <div className="mb-6 flex">
//           <div className="relative flex-grow">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search size={18} className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder={`Search ${activeTab === 'jobs' ? 'jobs' : 'candidates'}...`}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button className="ml-3 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-1">
//             <Filter size={18} />
//             Filters
//           </button>
//         </div>

//         {/* Job Listings Table */}
//         {activeTab === 'jobs' && (
//           <div className="bg-white shadow rounded-lg overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
//                   <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredJobs.length > 0 ? (
//                   filteredJobs.map((job) => (
//                     <tr key={job.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">{job.title}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-500">{job.department}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                           {job.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {job.applications}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {job.posted}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                         <div className="flex justify-center space-x-2">
//                           <button 
//                             onClick={() => editJob(job)}
//                             className="text-blue-600 hover:text-blue-900"
//                           >
//                             <Edit size={18} />
//                           </button>
//                           <button 
//                             onClick={() => deleteJob(job.id)}
//                             className="text-red-600 hover:text-red-900"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
//                       No jobs found. Create a new job posting.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Candidates Table */}
//         {activeTab === 'candidates' && (
//           <div className="bg-white shadow rounded-lg overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Position</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
//                   <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredCandidates.length > 0 ? (
//                   filteredCandidates.map((candidate) => (
//                     <tr key={candidate.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-500">{candidate.email}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-500">
//                           {jobs.find(job => job.id === candidate.jobId)?.title || 'Unknown Position'}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${candidate.status === 'Screening' ? 'bg-yellow-100 text-yellow-800' : 
//                             candidate.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
//                             candidate.status === 'Assessment' ? 'bg-purple-100 text-purple-800' :
//                             candidate.status === 'Offer' ? 'bg-green-100 text-green-800' :
//                             'bg-gray-100 text-gray-800'}`}>
//                           {candidate.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {candidate.appliedDate}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                         <div className="flex justify-center space-x-2">
//                           <button 
//                             onClick={() => editCandidate(candidate)}
//                             className="text-blue-600 hover:text-blue-900"
//                           >
//                             <Edit size={18} />
//                           </button>
//                           <button 
//                             onClick={() => deleteCandidate(candidate.id)}
//                             className="text-red-600 hover:text-red-900"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
//                       No candidates found. Add a new candidate.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </main>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-gray-900">
//                 {formData.id ? `Edit ${currentItem === 'job' ? 'Job' : 'Candidate'}` : `Add New ${currentItem === 'job' ? 'Job' : 'Candidate'}`}
//               </h3>
//             </div>
//             <form onSubmit={currentItem === 'job' ? handleJobSubmit : handleCandidateSubmit}>
//               <div className="px-6 py-4">
//                 {currentItem === 'job' ? (
//                   <>
//                     <div className="mb-4">
//                       <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
//                       <input
//                         type="text"
//                         id="title"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.title}
//                         onChange={(e) => setFormData({...formData, title: e.target.value})}
//                         required
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//                       <input
//                         type="text"
//                         id="department"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.department}
//                         onChange={(e) => setFormData({...formData, department: e.target.value})}
//                         required
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                       <select
//                         id="status"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.status}
//                         onChange={(e) => setFormData({...formData, status: e.target.value})}
//                       >
//                         <option value="Open">Open</option>
//                         <option value="Closed">Closed</option>
//                       </select>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="mb-4">
//                       <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                       <input
//                         type="text"
//                         id="name"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.name}
//                         onChange={(e) => setFormData({...formData, name: e.target.value})}
//                         required
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                       <input
//                         type="email"
//                         id="email"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.email}
//                         onChange={(e) => setFormData({...formData, email: e.target.value})}
//                         required
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="jobId" className="block text-sm font-medium text-gray-700 mb-1">Job Position</label>
//                       <select
//                         id="jobId"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.jobId}
//                         onChange={(e) => setFormData({...formData, jobId: e.target.value})}
//                         required
//                       >
//                         <option value="">Select a job position</option>
//                         {jobs.filter(job => job.status === 'Open').map(job => (
//                           <option key={job.id} value={job.id}>{job.title}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="candidateStatus" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                       <select
//                         id="candidateStatus"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.candidateStatus}
//                         onChange={(e) => setFormData({...formData, candidateStatus: e.target.value})}
//                       >
//                         <option value="Screening">Screening</option>
//                         <option value="Interview">Interview</option>
//                         <option value="Assessment">Assessment</option>
//                         <option value="Offer">Offer</option>
//                         <option value="Rejected">Rejected</option>
//                       </select>
//                     </div>
//                   </>
//                 )}
//               </div>
//               <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2 rounded-b-lg">
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   {formData.id ? 'Update' : 'Add'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Hiring;

// import React, { useState, useEffect } from 'react';
// import { Plus, Edit, Trash2, Search, Filter, UserPlus } from 'lucide-react';

// // Mock data for demonstration
// const initialJobs = [
//   { id: 1, title: 'Frontend Developer', department: 'Engineering', status: 'Open', applications: 12, posted: '2025-03-15' },
//   { id: 2, title: 'HR Manager', department: 'Human Resources', status: 'Open', applications: 8, posted: '2025-03-20' },
//   { id: 3, title: 'Product Designer', department: 'Design', status: 'Closed', applications: 24, posted: '2025-02-10' },
//   { id: 4, title: 'Backend Engineer', department: 'Engineering', status: 'Open', applications: 16, posted: '2025-03-25' },
// ];

// const initialCandidates = [
//   { id: 1, name: 'Alex Johnson', jobId: 1, email: 'alex@example.com', status: 'Screening', appliedDate: '2025-03-20' },
//   { id: 2, name: 'Sam Wilson', jobId: 1, email: 'sam@example.com', status: 'Interview', appliedDate: '2025-03-18' },
//   { id: 3, name: 'Jamie Smith', jobId: 2, email: 'jamie@example.com', status: 'Assessment', appliedDate: '2025-03-25' },
//   { id: 4, name: 'Taylor Brown', jobId: 4, email: 'taylor@example.com', status: 'Offer', appliedDate: '2025-03-15' },
// ];

// const Hiring = () => {
//   const [activeTab, setActiveTab] = useState('jobs');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);

//   // Initialize state from localStorage or fallback to initial data
//   const [jobs, setJobs] = useState(() => {
//     const savedJobs = localStorage.getItem('jobs');
//     return savedJobs ? JSON.parse(savedJobs) : initialJobs;
//   });

//   const [candidates, setCandidates] = useState(() => {
//     const savedCandidates = localStorage.getItem('candidates');
//     return savedCandidates ? JSON.parse(savedCandidates) : initialCandidates;
//   });

//   // Save jobs to localStorage whenever jobs change
//   useEffect(() => {
//     localStorage.setItem('jobs', JSON.stringify(jobs));
//   }, [jobs]);

//   // Save candidates to localStorage whenever candidates change
//   useEffect(() => {
//     localStorage.setItem('candidates', JSON.stringify(candidates));
//   }, [candidates]);

//   // Modal form data
//   const [formData, setFormData] = useState({
//     id: null,
//     title: '',
//     department: '',
//     status: 'Open',
//     name: '',
//     email: '',
//     jobId: '',
//     candidateStatus: 'Screening',
//   });

//   // Add or update job
//   const handleJobSubmit = (e) => {
//     e.preventDefault();
//     if (formData.id) {
//       setJobs(jobs.map(job =>
//         job.id === formData.id ? { ...job, title: formData.title, department: formData.department, status: formData.status } : job
//       ));
//     } else {
//       const newJob = {
//         id: jobs.length + 1,
//         title: formData.title,
//         department: formData.department,
//         status: formData.status,
//         applications: 0,
//         posted: new Date().toISOString().split('T')[0],
//       };
//       setJobs([...jobs, newJob]);
//     }
//     setShowModal(false);
//     resetForm();
//   };

//   // Add or update candidate
//   const handleCandidateSubmit = (e) => {
//     e.preventDefault();
//     if (formData.id) {
//       setCandidates(candidates.map(candidate =>
//         candidate.id === formData.id ? { ...candidate, name: formData.name, email: formData.email, jobId: Number(formData.jobId), status: formData.candidateStatus } : candidate
//       ));
//     } else {
//       const newCandidate = {
//         id: candidates.length + 1,
//         name: formData.name,
//         email: formData.email,
//         jobId: Number(formData.jobId),
//         status: formData.candidateStatus,
//         appliedDate: new Date().toISOString().split('T')[0],
//       };
//       setCandidates([...candidates, newCandidate]);
//     }
//     setShowModal(false);
//     resetForm();
//   };

//   // Delete job and associated candidates
//   const deleteJob = (id) => {
//     setJobs(jobs.filter(job => job.id !== id));
//     setCandidates(candidates.filter(candidate => candidate.jobId !== id));
//   };

//   // Delete candidate
//   const deleteCandidate = (id) => {
//     setCandidates(candidates.filter(candidate => candidate.id !== id));
//   };

//   // Edit job
//   const editJob = (job) => {
//     setCurrentItem('job');
//     setFormData({ id: job.id, title: job.title, department: job.department, status: job.status, name: '', email: '', jobId: '', candidateStatus: 'Screening' });
//     setShowModal(true);
//   };

//   // Edit candidate
//   const editCandidate = (candidate) => {
//     setCurrentItem('candidate');
//     setFormData({ id: candidate.id, title: '', department: '', status: 'Open', name: candidate.name, email: candidate.email, jobId: candidate.jobId, candidateStatus: candidate.status });
//     setShowModal(true);
//   };

//   // Reset form data
//   const resetForm = () => {
//     setFormData({ id: null, title: '', department: '', status: 'Open', name: '', email: '', jobId: '', candidateStatus: 'Screening' });
//   };

//   // Filter jobs and candidates based on search term
//   const filteredJobs = jobs.filter(job =>
//     job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredCandidates = candidates.filter(candidate =>
//     candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     jobs.find(job => job.id === candidate.jobId)?.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Open modal for new job or candidate
//   const openAddModal = (type) => {
//     setCurrentItem(type);
//     resetForm();
//     setShowModal(true);
//   };

//   // The rest of the JSX remains unchanged
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900">HRMS Hiring Module</h1>
//           <div className="flex space-x-2">
//             <button onClick={() => openAddModal('job')} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700">
//               <Plus size={18} /> Add Job
//             </button>
//             <button onClick={() => openAddModal('candidate')} className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700">
//               <UserPlus size={18} /> Add Candidate
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         <div className="flex border-b border-gray-200 mb-6">
//           <button className={`px-4 py-2 font-medium ${activeTab === 'jobs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('jobs')}>
//             Job Listings
//           </button>
//           <button className={`px-4 py-2 font-medium ${activeTab === 'candidates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('candidates')}>
//             Candidates
//           </button>
//         </div>

//         <div className="mb-6 flex">
//           <div className="relative flex-grow">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search size={18} className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder={`Search ${activeTab === 'jobs' ? 'jobs' : 'candidates'}...`}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button className="ml-3 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-1">
//             <Filter size={18} /> Filters
//           </button>
//         </div>

//         {activeTab === 'jobs' && (
//           <div className="bg-white shadow rounded-lg overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
//                   <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredJobs.length > 0 ? (
//                   filteredJobs.map((job) => (
//                     <tr key={job.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{job.title}</div></td>
//                       <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{job.department}</div></td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                           {job.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applications}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.posted}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                         <div className="flex justify-center space-x-2">
//                           <button onClick={() => editJob(job)} className="text-blue-600 hover:text-blue-900"><Edit size={18} /></button>
//                           <button onClick={() => deleteJob(job.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No jobs found. Create a new job posting.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {activeTab === 'candidates' && (
//           <div className="bg-white shadow rounded-lg overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Position</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
//                   <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredCandidates.length > 0 ? (
//                   filteredCandidates.map((candidate) => (
//                     <tr key={candidate.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{candidate.name}</div></td>
//                       <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{candidate.email}</div></td>
//                       <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{jobs.find(job => job.id === candidate.jobId)?.title || 'Unknown Position'}</div></td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${candidate.status === 'Screening' ? 'bg-yellow-100 text-yellow-800' : 
//                             candidate.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
//                             candidate.status === 'Assessment' ? 'bg-purple-100 text-purple-800' :
//                             candidate.status === 'Offer' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                           {candidate.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.appliedDate}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                         <div className="flex justify-center space-x-2">
//                           <button onClick={() => editCandidate(candidate)} className="text-blue-600 hover:text-blue-900"><Edit size={18} /></button>
//                           <button onClick={() => deleteCandidate(candidate.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No candidates found. Add a new candidate.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </main>

//       {showModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-gray-900">
//                 {formData.id ? `Edit ${currentItem === 'job' ? 'Job' : 'Candidate'}` : `Add New ${currentItem === 'job' ? 'Job' : 'Candidate'}`}
//               </h3>
//             </div>
//             <form onSubmit={currentItem === 'job' ? handleJobSubmit : handleCandidateSubmit}>
//               <div className="px-6 py-4">
//                 {currentItem === 'job' ? (
//                   <>
//                     <div className="mb-4">
//                       <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
//                       <input
//                         type="text"
//                         id="title"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.title}
//                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                         required
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//                       <input
//                         type="text"
//                         id="department"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.department}
//                         onChange={(e) => setFormData({ ...formData, department: e.target.value })}
//                         required
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                       <select
//                         id="status"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.status}
//                         onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                       >
//                         <option value="Open">Open</option>
//                         <option value="Closed">Closed</option>
//                       </select>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="mb-4">
//                       <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                       <input
//                         type="text"
//                         id="name"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.name}
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                         required
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                       <input
//                         type="email"
//                         id="email"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.email}
//                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                         required
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="jobId" className="block text-sm font-medium text-gray-700 mb-1">Job Position</label>
//                       <select
//                         id="jobId"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.jobId}
//                         onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
//                         required
//                       >
//                         <option value="">Select a job position</option>
//                         {jobs.filter(job => job.status === 'Open').map(job => (
//                           <option key={job.id} value={job.id}>{job.title}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="candidateStatus" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                       <select
//                         id="candidateStatus"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         value={formData.candidateStatus}
//                         onChange={(e) => setFormData({ ...formData, candidateStatus: e.target.value })}
//                       >
//                         <option value="Screening">Screening</option>
//                         <option value="Interview">Interview</option>
//                         <option value="Assessment">Assessment</option>
//                         <option value="Offer">Offer</option>
//                         <option value="Rejected">Rejected</option>
//                       </select>
//                     </div>
//                   </>
//                 )}
//               </div>
//               <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2 rounded-b-lg">
//                 <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" onClick={() => setShowModal(false)}>
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                   {formData.id ? 'Update' : 'Add'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Hiring;

// import React, { useState, useEffect } from 'react';
// import { FaBriefcase, FaUsers, FaCalendarAlt, FaChartBar, FaClipboardList, FaBell, FaSearch, FaChevronDown } from 'react-icons/fa';
// const Hiring = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [candidates, setCandidates] = useState([]);
//   const [jobs, setJobs] = useState([]);
//   const [interviews, setInterviews] = useState([]);
//   const [stats, setStats] = useState({
//     totalJobs: 0,
//     activeCandidates: 0,
//     interviewsToday: 0,
//     hiredThisMonth: 0
//   });

//   useEffect(() => {
//     // Mock data - in a real app, you would fetch from an API
//     setCandidates([
//       { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', status: 'Applied', job: 'Frontend Developer' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901', status: 'Interview', job: 'UX Designer' },
//       { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '345-678-9012', status: 'Offer', job: 'Backend Developer' },
//       { id: 4, name: 'Alice Williams', email: 'alice@example.com', phone: '456-789-0123', status: 'Hired', job: 'Product Manager' },
//     ]);

//     setJobs([
//       { id: 1, title: 'Frontend Developer', department: 'Engineering', type: 'Full-time', applicants: 24, status: 'Active' },
//       { id: 2, title: 'UX Designer', department: 'Design', type: 'Full-time', applicants: 18, status: 'Active' },
//       { id: 3, title: 'Backend Developer', department: 'Engineering', type: 'Contract', applicants: 32, status: 'Active' },
//       { id: 4, title: 'Product Manager', department: 'Product', type: 'Full-time', applicants: 12, status: 'Closed' },
//     ]);

//     setInterviews([
//       { id: 1, candidate: 'John Doe', job: 'Frontend Developer', interviewer: 'Sarah Johnson', date: '2023-05-15', time: '10:00 AM', status: 'Scheduled' },
//       { id: 2, candidate: 'Jane Smith', job: 'UX Designer', interviewer: 'Mike Brown', date: '2023-05-15', time: '2:00 PM', status: 'Scheduled' },
//     ]);

//     setStats({
//       totalJobs: 15,
//       activeCandidates: 42,
//       interviewsToday: 3,
//       hiredThisMonth: 8
//     });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">Hiring Module</h1>
//           <div className="flex items-center space-x-4">
//             <button className="relative p-1 text-gray-400 hover:text-gray-500">
//               <FaBell className="h-6 w-6" />
//               <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
//             </button>
//             <div className="flex items-center">
//               <img className="h-8 w-8 rounded-full" src="https://via.placeholder.com/32" alt="User" />
//               <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
//               <FaChevronDown className="ml-1 h-4 w-4 text-gray-500" />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         {/* Navigation Tabs */}
//         <div className="border-b border-gray-200">
//           <nav className="-mb-px flex space-x-8">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
//             >
//               Overview
//             </button>
//             <button
//               onClick={() => setActiveTab('jobs')}
//               className={`${activeTab === 'jobs' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
//             >
//               Job Postings
//             </button>
//             <button
//               onClick={() => setActiveTab('candidates')}
//               className={`${activeTab === 'candidates' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
//             >
//               Candidates
//             </button>
//             <button
//               onClick={() => setActiveTab('interviews')}
//               className={`${activeTab === 'interviews' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
//             >
//               Interviews
//             </button>
//             <button
//               onClick={() => setActiveTab('analytics')}
//               className={`${activeTab === 'analytics' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
//             >
//               Analytics
//             </button>
//           </nav>
//         </div>

//         {/* Tab Content */}
//         <div className="py-6">
//           {activeTab === 'overview' && <OverviewTab stats={stats} candidates={candidates} interviews={interviews} />}
//           {activeTab === 'jobs' && <JobsTab jobs={jobs} />}
//           {activeTab === 'candidates' && <CandidatesTab candidates={candidates} />}
//           {activeTab === 'interviews' && <InterviewsTab interviews={interviews} />}
//           {activeTab === 'analytics' && <AnalyticsTab stats={stats} />}
//         </div>
//       </main>
//     </div>
//   );
// };

// const OverviewTab = ({ stats, candidates, interviews }) => {
//   return (
//     <div>
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
//         <StatCard icon={<FaBriefcase className="h-6 w-6 text-blue-500" />} title="Total Jobs" value={stats.totalJobs} />
//         <StatCard icon={<FaUsers className="h-6 w-6 text-green-500" />} title="Active Candidates" value={stats.activeCandidates} />
//         <StatCard icon={<FaCalendarAlt className="h-6 w-6 text-yellow-500" />} title="Interviews Today" value={stats.interviewsToday} />
//         <StatCard icon={<FaClipboardList className="h-6 w-6 text-purple-500" />} title="Hired This Month" value={stats.hiredThisMonth} />
//       </div>

//       {/* Recent Candidates */}
//       <div className="bg-white shadow rounded-lg mb-6">
//         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//           <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Candidates</h3>
//         </div>
//         <div className="bg-white overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {candidates.slice(0, 4).map((candidate) => (
//                 <tr key={candidate.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10">
//                         <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${candidate.name.replace(' ', '+')}`} alt="" />
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
//                         <div className="text-sm text-gray-500">{candidate.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{candidate.job}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${candidate.status === 'Hired' ? 'bg-green-100 text-green-800' : 
//                         candidate.status === 'Interview' ? 'bg-blue-100 text-blue-800' : 
//                         candidate.status === 'Offer' ? 'bg-purple-100 text-purple-800' : 
//                         'bg-yellow-100 text-yellow-800'}`}>
//                       {candidate.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
//                     <button className="text-gray-600 hover:text-gray-900">Edit</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Upcoming Interviews */}
//       <div className="bg-white shadow rounded-lg">
//         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//           <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Interviews</h3>
//         </div>
//         <div className="bg-white overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewer</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {interviews.map((interview) => (
//                 <tr key={interview.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10">
//                         <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${interview.candidate.replace(' ', '+')}`} alt="" />
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{interview.candidate}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.job}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.interviewer}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {interview.date} at {interview.time}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
//                         interview.status === 'Completed' ? 'bg-green-100 text-green-800' : 
//                         'bg-gray-100 text-gray-800'}`}>
//                       {interview.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const JobsTab = ({ jobs }) => {
//   const [showJobForm, setShowJobForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredJobs = jobs.filter(job => 
//     job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     job.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div className="relative rounded-md shadow-sm w-64">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <FaSearch className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
//             placeholder="Search jobs..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <button
//           onClick={() => setShowJobForm(true)}
//           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Post New Job
//         </button>
//       </div>

//       {showJobForm && <JobPostingForm onClose={() => setShowJobForm(false)} />}

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredJobs.map((job) => (
//               <tr key={job.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">{job.title}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applicants}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                     ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                     {job.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
//                   <button className="text-gray-600 hover:text-gray-900 mr-3">Edit</button>
//                   <button className="text-red-600 hover:text-red-900">Close</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const CandidatesTab = ({ candidates }) => {
//   const [showCandidateForm, setShowCandidateForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const filteredCandidates = candidates.filter(candidate => {
//     const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          candidate.job.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex space-x-4">
//           <div className="relative rounded-md shadow-sm w-64">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FaSearch className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
//               placeholder="Search candidates..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <select
//             className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="All">All Statuses</option>
//             <option value="Applied">Applied</option>
//             <option value="Interview">Interview</option>
//             <option value="Offer">Offer</option>
//             <option value="Hired">Hired</option>
//             <option value="Rejected">Rejected</option>
//           </select>
//         </div>
//         <button
//           onClick={() => setShowCandidateForm(true)}
//           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Add Candidate
//         </button>
//       </div>

//       {showCandidateForm && <CandidateForm onClose={() => setShowCandidateForm(false)} />}

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredCandidates.map((candidate) => (
//               <tr key={candidate.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0 h-10 w-10">
//                       <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${candidate.name.replace(' ', '+')}`} alt="" />
//                     </div>
//                     <div className="ml-4">
//                       <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
//                       <div className="text-sm text-gray-500">{candidate.email}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.job}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.phone}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                     ${candidate.status === 'Hired' ? 'bg-green-100 text-green-800' : 
//                       candidate.status === 'Interview' ? 'bg-blue-100 text-blue-800' : 
//                       candidate.status === 'Offer' ? 'bg-purple-100 text-purple-800' : 
//                       candidate.status === 'Rejected' ? 'bg-red-100 text-red-800' :
//                       'bg-yellow-100 text-yellow-800'}`}>
//                     {candidate.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
//                   <button className="text-gray-600 hover:text-gray-900 mr-3">Edit</button>
//                   <button className="text-red-600 hover:text-red-900">Reject</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const InterviewsTab = ({ interviews }) => {
//   const [showInterviewForm, setShowInterviewForm] = useState(false);
//   const [dateFilter, setDateFilter] = useState('All');

//   const filteredInterviews = interviews.filter(interview => {
//     if (dateFilter === 'Today') {
//       return interview.date === new Date().toISOString().split('T')[0];
//     } else if (dateFilter === 'Upcoming') {
//       return new Date(interview.date) > new Date();
//     } else if (dateFilter === 'Past') {
//       return new Date(interview.date) < new Date();
//     }
//     return true;
//   });

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex space-x-4">
//           <select
//             className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
//             value={dateFilter}
//             onChange={(e) => setDateFilter(e.target.value)}
//           >
//             <option value="All">All Interviews</option>
//             <option value="Today">Today</option>
//             <option value="Upcoming">Upcoming</option>
//             <option value="Past">Past</option>
//           </select>
//         </div>
//         <button
//           onClick={() => setShowInterviewForm(true)}
//           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Schedule Interview
//         </button>
//       </div>

//       {showInterviewForm && <InterviewForm onClose={() => setShowInterviewForm(false)} />}

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewer</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredInterviews.map((interview) => (
//               <tr key={interview.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0 h-10 w-10">
//                       <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${interview.candidate.replace(' ', '+')}`} alt="" />
//                     </div>
//                     <div className="ml-4">
//                       <div className="text-sm font-medium text-gray-900">{interview.candidate}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.job}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.interviewer}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {interview.date} at {interview.time}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                     ${interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
//                       interview.status === 'Completed' ? 'bg-green-100 text-green-800' : 
//                       'bg-gray-100 text-gray-800'}`}>
//                     {interview.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
//                   <button className="text-gray-600 hover:text-gray-900 mr-3">Reschedule</button>
//                   <button className="text-red-600 hover:text-red-900">Cancel</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const AnalyticsTab = ({ stats }) => {
//   return (
//     <div>
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
//         <div className="bg-white shadow rounded-lg p-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Hiring Funnel</h3>
//           <div className="h-64">
//             {/* Placeholder for funnel chart */}
//             <div className="flex items-center justify-center h-full bg-gray-100 rounded">
//               <p className="text-gray-500">Funnel Chart</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white shadow rounded-lg p-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Time to Hire</h3>
//           <div className="h-64">
//             {/* Placeholder for time to hire chart */}
//             <div className="flex items-center justify-center h-full bg-gray-100 rounded">
//               <p className="text-gray-500">Time to Hire Chart</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white shadow rounded-lg p-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Source of Hire</h3>
//           <div className="h-64">
//             {/* Placeholder for source of hire chart */}
//             <div className="flex items-center justify-center h-full bg-gray-100 rounded">
//               <p className="text-gray-500">Source of Hire Chart</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-white shadow rounded-lg p-6">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Hiring Trends</h3>
//         <div className="h-96">
//           {/* Placeholder for hiring trends chart */}
//           <div className="flex items-center justify-center h-full bg-gray-100 rounded">
//             <p className="text-gray-500">Hiring Trends Chart</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ icon, title, value }) => {
//   return (
//     <div className="bg-white overflow-hidden shadow rounded-lg">
//       <div className="p-5">
//         <div className="flex items-center">
//           <div className="flex-shrink-0">
//             {icon}
//           </div>
//           <div className="ml-5 w-0 flex-1">
//             <dl>
//               <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
//               <dd>
//                 <div className="text-lg font-medium text-gray-900">{value}</div>
//               </dd>
//             </dl>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const JobPostingForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     department: '',
//     type: 'Full-time',
//     location: '',
//     description: '',
//     requirements: '',
//     salaryMin: '',
//     salaryMax: '',
//     status: 'Active'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In a real app, you would submit to an API
//     console.log('Job posting submitted:', formData);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
//         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="sm:flex sm:items-start">
//               <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Post New Job</h3>
//                 <div className="mt-6">
//                   <form onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//                       <div className="sm:col-span-6">
//                         <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
//                         <input
//                           type="text"
//                           name="title"
//                           id="title"
//                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                           value={formData.title}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
//                         <select
//                           id="department"
//                           name="department"
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                           value={formData.department}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select a department</option>
//                           <option value="Engineering">Engineering</option>
//                           <option value="Design">Design</option>
//                           <option value="Product">Product</option>
//                           <option value="Marketing">Marketing</option>
//                           <option value="Sales">Sales</option>
//                           <option value="HR">Human Resources</option>
//                         </select>
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label htmlFor="type" className="block text-sm font-medium text-gray-700">Employment Type</label>
//                         <select
//                           id="type"
//                           name="type"
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                           value={formData.type}
//                           onChange={handleChange}
//                         >
//                           <option value="Full-time">Full-time</option>
//                           <option value="Part-time">Part-time</option>
//                           <option value="Contract">Contract</option>
//                           <option value="Temporary">Temporary</option>
//                           <option value="Internship">Internship</option>
//                         </select>
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
//                         <input
//                           type="text"
//                           name="location"
//                           id="location"
//                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                           value={formData.location}
//                           onChange={handleChange}
//                         />
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
//                         <select
//                           id="status"
//                           name="status"
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                           value={formData.status}
//                           onChange={handleChange}
//                         >
//                           <option value="Active">Active</option>
//                           <option value="Draft">Draft</option>
//                           <option value="Closed">Closed</option>
//                         </select>
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label htmlFor="salaryMin" className="block text-sm font-medium text-gray-700">Salary Min</label>
//                         <input
//                           type="number"
//                           name="salaryMin"
//                           id="salaryMin"
//                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                           value={formData.salaryMin}
//                           onChange={handleChange}
//                         />
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label htmlFor="salaryMax" className="block text-sm font-medium text-gray-700">Salary Max</label>
//                         <input
//                           type="number"
//                           name="salaryMax"
//                           id="salaryMax"
//                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                           value={formData.salaryMax}
//                           onChange={handleChange}
//                         />
//                       </div>

//                       <div className="sm:col-span-6">
//                         <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
//                         <textarea
//                           id="description"
//                           name="description"
//                           rows={4}
//                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                           value={formData.description}
//                           onChange={handleChange}
//                         />
//                       </div>

//                       <div className="sm:col-span-6">
//                         <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
//                         <textarea
//                           id="requirements"
//                           name="requirements"
//                           rows={4}
//                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                           value={formData.requirements}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//             <button
//               type="button"
//               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//               onClick={handleSubmit}
//             >
//               Post Job
//             </button>
//             <button
//               type="button"
//               className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CandidateForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     job: '',
//     source: '',
//     resume: null,
//     status: 'Applied'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       resume: e.target.files[0]
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In a real app, you would submit to an API
//     console.log('Candidate submitted:', formData);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
//         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="sm:flex sm:items-start">
//               <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Add New Candidate</h3>
//                 <div className="mt-6">
//                   <form onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//                       <div className="sm:col-span-3">
//                         <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
//                         <input
//                           type="text"
//                           name="firstName"
//                           id="firstName"
//                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                           value={formData.firstName}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
//                         <input
//                           type="text"
//                           name="lastName"
//                           id="lastName"
//                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                           value={formData.lastName}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="sm:col-span-4">
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                         <input
//                           type="email"
//                           name="email"
//                           id="email"
//                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                           value={formData.email}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="sm:col-span-2">
//                         <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
//                         <input
//                           type="tel"
//                           name="phone"
//                           id="phone"
//                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                           value={formData.phone}
//                           onChange={handleChange}
//                         />
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label htmlFor="job" className="block text-sm font-medium text-gray-700">Job Applied For</label>
//                         <select
//                           id="job"
//                           name="job"
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                           value={formData.job}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select a job</option>
//                           <option value="Frontend Developer">Frontend Developer</option>
//                           <option value="Backend Developer">Backend Developer</option>
//                           <option value="UX Designer">UX Designer</option>
//                           <option value="Product Manager">Product Manager</option>
//                         </select>
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source</label>
//                         <select
//                           id="source"
//                           name="source"
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                           value={formData.source}
//                           onChange={handleChange}
//                         >
//                           <option value="">Select a source</option>
//                           <option value="LinkedIn">LinkedIn</option>
//                           <option value="Indeed">Indeed</option>
//                           <option value="Company Website">Company Website</option>
//                           <option value="Referral">Referral</option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
//                         <select
//                           id="status"
//                           name="status"
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                           value={formData.status}
//                           onChange={handleChange}
//                         >
//                           <option value="Applied">Applied</option>
//                           <option value="Interview">Interview</option>
//                           <option value="Offer">Offer</option>
//                           <option value="Hired">Hired</option>
//                           <option value="Rejected">Rejected</option>
//                         </select>
//                       </div>

//                       <div className="sm:col-span-6">
//                         <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
//                         <div className="mt-1 flex items-center">
//                           <input
//                             type="file"
//                             id="resume"
//                             name="resume"
//                             className="focus:ring-blue-500 focus:border-blue-500 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                             onChange={handleFileChange}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//             <button
//               type="button"
//               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//               onClick={handleSubmit}
//             >
//               Add Candidate
//             </button>
//             <button
//               type="button"
//               className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const InterviewForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     candidate: '',
//     job: '',
//     interviewer: '',
//     date: '',
//     time: '',
//     type: 'In-person',
//     location: '',
//     notes: '',
//     status: 'Scheduled'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In a real app, you would submit to an API
//     console.log('Interview scheduled:', formData);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
//         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="sm:flex sm:items-start">
//               <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Schedule Interview</h3>
//                 <div className="mt-6">
//                   <form onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//                       <div className="sm:col-span-6">
//                         <label htmlFor="candidate" className="block text-sm font-medium text-gray-700">Candidate</label>
//                         <select
//                           id="candidate"
//                           name="candidate"
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                           value={formData.candidate}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select a candidate</option>
//                           <option value="John Doe">John Doe</option>
//                           <option value="Jane Smith">Jane Smith</option>
//                           <option value="Bob Johnson">Bob Johnson</option>
//                           <option value="Alice Williams">Alice Williams</option>
//                         </select>
//                       </div>

//                       <div className="sm:col-span-6">
//                         <label htmlFor="job" className="block text-sm font-medium text-gray-700">Job</label>
//                         <select
//                           id="job"
//                           name="job"
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                           value={formData.job}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select a job</option>
//                           <option value="Frontend Developer">Frontend Developer</option>
//                           <option value="Backend Developer">Backend Developer</option>
//                           <option value="UX Designer">UX Designer</option>
//                           <option value="Product Manager">Product Manager</option>
//                         </select>
//                       </div>

//                       <div className="sm:col-span-6">
//                         <label htmlFor="interviewer" className="block text-sm font-medium text-gray-700">Interviewer</label>
//                         <select
//                           id="interviewer"
//                           name="interviewer"
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                           value={formData.interviewer}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select an interviewer</option>
//                           <option value="Sarah Johnson">Sarah Johnson</option>
//                           <option value="Mike Brown">Mike Brown</option>
//                           <option value="Emily Davis">Emily Davis</option>
//                           <option value="David Wilson">David Wilson</option>
//                         </select>
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
//                         <input
//                           type="date"
//                           name="date"
//                           id="date"
//                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                           value={formData.date}
// onChange={handleChange}
// required
// />
// </div>
//                   <div className="sm:col-span-3">
//                     <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
//                     <input
//                       type="time"
//                       name="time"
//                       id="time"
//                       className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                       value={formData.time}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="sm:col-span-3">
//                     <label htmlFor="type" className="block text-sm font-medium text-gray-700">Interview Type</label>
//                     <select
//                       id="type"
//                       name="type"
//                       className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                       value={formData.type}
//                       onChange={handleChange}
//                     >
//                       <option value="In-person">In-person</option>
//                       <option value="Phone">Phone</option>
//                       <option value="Video">Video</option>
//                     </select>
//                   </div>

//                   <div className="sm:col-span-3">
//                     <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
//                     <input
//                       type="text"
//                       name="location"
//                       id="location"
//                       className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                       value={formData.location}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="sm:col-span-6">
//                     <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
//                     <textarea
//                       id="notes"
//                       name="notes"
//                       rows={3}
//                       className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                       value={formData.notes}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="sm:col-span-3">
//                     <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
//                     <select
//                       id="status"
//                       name="status"
//                       className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                       value={formData.status}
//                       onChange={handleChange}
//                     >
//                       <option value="Scheduled">Scheduled</option>
//                       <option value="Completed">Completed</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//         <button
//           type="button"
//           className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//           onClick={handleSubmit}
//         >
//           Schedule Interview
//         </button>
//         <button
//           type="button"
//           className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//           onClick={onClose}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

// );
// };

// export default Hiring;

/*
 * Preferred Response
 */

// import { useState, useEffect } from 'react';
// import { FiBriefcase, FiUsers, FiCalendar, FiMail, FiFileText, FiSettings } from 'react-icons/fi';
// import Offers from '../../components/Offers';
// import HiringSettings from '../../components/HiringSettings';
// import Candidates from '../../components/Candidates';
// import JobPostings from '../../components/JobPostings';
// import Interviews from '../../components/Interviews';
// const Hiring = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [stats, setStats] = useState({
//     openPositions: 0,
//     candidates: 0,
//     interviews: 0,
//     hires: 0
//   });

//   useEffect(() => {
//     // Fetch stats from API
//     const fetchStats = async () => {
//       // Mock data - replace with actual API call
//       const mockStats = {
//         openPositions: 12,
//         candidates: 45,
//         interviews: 8,
//         hires: 3
//       };
//       setStats(mockStats);
//     };
//     fetchStats();
//   }, []);

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <DashboardContent stats={stats} />;
//       case 'job-postings':
//         return <JobPostings />;
//       case 'candidates':
//         return <Candidates />;
//       case 'interviews':
//         return <Interviews />;
//       case 'offers':
//         return <Offers />;
//       case 'settings':
//         return <HiringSettings />;
//       default:
//         return <DashboardContent stats={stats} />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md">
//         <div className="p-4 border-b border-gray-200">
//           <h1 className="text-xl font-bold text-blue-600">Hiring Module</h1>
//         </div>
//         <nav className="p-4">
//           <ul className="space-y-2">
//             <li>
//               <button
//                 onClick={() => setActiveTab('dashboard')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiBriefcase className="mr-3" />
//                 Dashboard
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('job-postings')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'job-postings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiFileText className="mr-3" />
//                 Job Postings
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('candidates')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'candidates' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiUsers className="mr-3" />
//                 Candidates
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('interviews')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'interviews' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiCalendar className="mr-3" />
//                 Interviews
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('offers')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'offers' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiMail className="mr-3" />
//                 Offers
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('settings')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'settings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiSettings className="mr-3" />
//                 Settings
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Hiring Dashboard</h2>
//           <p className="text-gray-600">Manage your recruitment process efficiently</p>
//         </div>
        
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// const DashboardContent = ({ stats }) => {
//   return (
//     <div>
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard 
//           title="Open Positions" 
//           value={stats.openPositions} 
//           icon={<FiBriefcase className="text-blue-500" size={24} />} 
//           color="blue"
//         />
//         <StatCard 
//           title="Candidates" 
//           value={stats.candidates} 
//           icon={<FiUsers className="text-green-500" size={24} />} 
//           color="green"
//         />
//         <StatCard 
//           title="Interviews" 
//           value={stats.interviews} 
//           icon={<FiCalendar className="text-purple-500" size={24} />} 
//           color="purple"
//         />
//         <StatCard 
//           title="Hires" 
//           value={stats.hires} 
//           icon={<FiMail className="text-yellow-500" size={24} />} 
//           color="yellow"
//         />
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
//         <div className="space-y-4">
//           <ActivityItem 
//             title="New candidate applied" 
//             description="John Doe applied for Senior Developer position" 
//             time="2 hours ago"
//           />
//           <ActivityItem 
//             title="Interview scheduled" 
//             description="Interview with Sarah Johnson for Marketing Manager" 
//             time="Yesterday"
//           />
//           <ActivityItem 
//             title="Job posted" 
//             description="New job posted: UX Designer" 
//             time="2 days ago"
//           />
//         </div>
//       </div>

//       {/* Upcoming Interviews */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h3 className="text-lg font-semibold mb-4">Upcoming Interviews</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewers</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               <InterviewRow 
//                 candidate="John Doe" 
//                 position="Senior Developer" 
//                 datetime="May 15, 2023 - 10:00 AM" 
//                 interviewers="Jane Smith, Mike Johnson" 
//                 status="Confirmed"
//               />
//               <InterviewRow 
//                 candidate="Sarah Johnson" 
//                 position="Marketing Manager" 
//                 datetime="May 16, 2023 - 2:30 PM" 
//                 interviewers="Alex Brown" 
//                 status="Pending"
//               />
//               <InterviewRow 
//                 candidate="Michael Chen" 
//                 position="Data Analyst" 
//                 datetime="May 17, 2023 - 11:00 AM" 
//                 interviewers="Lisa Wong, David Kim" 
//                 status="Confirmed"
//               />
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ title, value, icon, color }) => {
//   const colorClasses = {
//     blue: 'bg-blue-50',
//     green: 'bg-green-50',
//     purple: 'bg-purple-50',
//     yellow: 'bg-yellow-50'
//   };

//   return (
//     <div className={`${colorClasses[color]} p-6 rounded-lg shadow-sm`}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
//         </div>
//         <div className="p-3 rounded-full bg-white shadow-sm">
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// };

// const ActivityItem = ({ title, description, time }) => {
//   return (
//     <div className="flex items-start">
//       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
//         <FiBriefcase className="text-blue-500" />
//       </div>
//       <div className="flex-1">
//         <h4 className="text-sm font-medium text-gray-900">{title}</h4>
//         <p className="text-sm text-gray-600">{description}</p>
//         <p className="text-xs text-gray-500 mt-1">{time}</p>
//       </div>
//     </div>
//   );
// };

// const InterviewRow = ({ candidate, position, datetime, interviewers, status }) => {
//   const statusClasses = {
//     Confirmed: 'bg-green-100 text-green-800',
//     Pending: 'bg-yellow-100 text-yellow-800',
//     Cancelled: 'bg-red-100 text-red-800'
//   };

//   return (
//     <tr>
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datetime}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interviewers}</td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
//           {status}
//         </span>
//       </td>
//     </tr>
//   );
// };

// export default Hiring;

/*
 * Grok Response
 */
// import { useState, useEffect } from 'react';
// import { FiBriefcase, FiUsers, FiCalendar, FiMail, FiFileText, FiSettings } from 'react-icons/fi';
// import Offers from '../../components/Offers';
// import HiringSettings from '../../components/HiringSettings';
// import Candidates from '../../components/Candidates';
// import JobPostings from '../../components/JobPostings';
// import Interviews from '../../components/Interviews';

// const Hiring = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [stats, setStats] = useState({
//     openPositions: 0,
//     candidates: 0,
//     interviews: 0,
//     hires: 0,
//   });

//   useEffect(() => {
//     const updateStats = () => {
//       const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
//       const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
//       const interviews = JSON.parse(localStorage.getItem('interviews') || '[]');
//       const offers = JSON.parse(localStorage.getItem('offers') || '[]');

//       setStats({
//         openPositions: jobs.filter(job => job.status === 'Active').length,
//         candidates: candidates.length,
//         interviews: interviews.filter(i => i.status === 'Scheduled').length,
//         hires: offers.filter(o => o.status === 'Accepted').length,
//       });
//     };
//     updateStats();
//     // Listen to storage changes (optional, for cross-tab updates)
//     window.addEventListener('storage', updateStats);
//     return () => window.removeEventListener('storage', updateStats);
//   }, []);

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <DashboardContent stats={stats} />;
//       case 'job-postings':
//         return <JobPostings />;
//       case 'candidates':
//         return <Candidates />;
//       case 'interviews':
//         return <Interviews />;
//       case 'offers':
//         return <Offers />;
//       case 'settings':
//         return <HiringSettings />;
//       default:
//         return <DashboardContent stats={stats} />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md">
//         <div className="p-4 border-b border-gray-200">
//           <h1 className="text-xl font-bold text-blue-600">Hiring Module</h1>
//         </div>
//         <nav className="p-4">
//           <ul className="space-y-2">
//             <li>
//               <button
//                 onClick={() => setActiveTab('dashboard')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiBriefcase className="mr-3" />
//                 Dashboard
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('job-postings')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'job-postings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiFileText className="mr-3" />
//                 Job Postings
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('candidates')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'candidates' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiUsers className="mr-3" />
//                 Candidates
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('interviews')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'interviews' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiCalendar className="mr-3" />
//                 Interviews
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('offers')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'offers' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiMail className="mr-3" />
//                 Offers
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('settings')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'settings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiSettings className="mr-3" />
//                 Settings
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Hiring Dashboard</h2>
//           <p className="text-gray-600">Manage your recruitment process efficiently</p>
//         </div>
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// const DashboardContent = ({ stats }) => {
//   return (
//     <div>
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard title="Open Positions" value={stats.openPositions} icon={<FiBriefcase className="text-blue-500" size={24} />} color="blue" />
//         <StatCard title="Candidates" value={stats.candidates} icon={<FiUsers className="text-green-500" size={24} />} color="green" />
//         <StatCard title="Interviews" value={stats.interviews} icon={<FiCalendar className="text-purple-500" size={24} />} color="purple" />
//         <StatCard title="Hires" value={stats.hires} icon={<FiMail className="text-yellow-500" size={24} />} color="yellow" />
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
//         <div className="space-y-4">
//           <ActivityItem title="New candidate applied" description="John Doe applied for Senior Developer position" time="2 hours ago" />
//           <ActivityItem title="Interview scheduled" description="Interview with Sarah Johnson for Marketing Manager" time="Yesterday" />
//           <ActivityItem title="Job posted" description="New job posted: UX Designer" time="2 days ago" />
//         </div>
//       </div>

//       {/* Upcoming Interviews */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h3 className="text-lg font-semibold mb-4">Upcoming Interviews</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewers</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               <InterviewRow candidate="John Doe" position="Senior Developer" datetime="May 15, 2023 - 10:00 AM" interviewers="Jane Smith, Mike Johnson" status="Confirmed" />
//               <InterviewRow candidate="Sarah Johnson" position="Marketing Manager" datetime="May 16, 2023 - 2:30 PM" interviewers="Alex Brown" status="Pending" />
//               <InterviewRow candidate="Michael Chen" position="Data Analyst" datetime="May 17, 2023 - 11:00 AM" interviewers="Lisa Wong, David Kim" status="Confirmed" />
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ title, value, icon, color }) => {
//   const colorClasses = {
//     blue: 'bg-blue-50',
//     green: 'bg-green-50',
//     purple: 'bg-purple-50',
//     yellow: 'bg-yellow-50',
//   };

//   return (
//     <div className={`${colorClasses[color]} p-6 rounded-lg shadow-sm`}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
//         </div>
//         <div className="p-3 rounded-full bg-white shadow-sm">{icon}</div>
//       </div>
//     </div>
//   );
// };

// const ActivityItem = ({ title, description, time }) => {
//   return (
//     <div className="flex items-start">
//       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
//         <FiBriefcase className="text-blue-500" />
//       </div>
//       <div className="flex-1">
//         <h4 className="text-sm font-medium text-gray-900">{title}</h4>
//         <p className="text-sm text-gray-600">{description}</p>
//         <p className="text-xs text-gray-500 mt-1">{time}</p>
//       </div>
//     </div>
//   );
// };

// const InterviewRow = ({ candidate, position, datetime, interviewers, status }) => {
//   const statusClasses = {
//     Confirmed: 'bg-green-100 text-green-800',
//     Pending: 'bg-yellow-100 text-yellow-800',
//     Cancelled: 'bg-red-100 text-red-800',
//   };

//   return (
//     <tr>
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datetime}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interviewers}</td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
//           {status}
//         </span>
//       </td>
//     </tr>
//   );
// };

// export default Hiring;

// import { useState, useEffect } from 'react';
// import { FiBriefcase, FiUsers, FiCalendar, FiMail, FiFileText, FiSettings } from 'react-icons/fi';
// import Offers from '../../components/Offers';
// import HiringSettings from '../../components/HiringSettings';
// import Candidates from '../../components/Candidates';
// import JobPostings from '../../components/JobPostings';
// import Interviews from '../../components/Interviews';

// const Hiring = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [stats, setStats] = useState({
//     openPositions: 0,
//     candidates: 0,
//     interviews: 0,
//     hires: 0,
//   });

//   useEffect(() => {
//     const updateStats = () => {
//       try {
//         const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
//         const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
//         const interviews = JSON.parse(localStorage.getItem('interviews') || '[]');
//         const offers = JSON.parse(localStorage.getItem('offers') || '[]');

//         setStats({
//           openPositions: jobs.filter(job => job.status === 'Active').length,
//           candidates: candidates.length,
//           interviews: interviews.filter(i => i.status === 'Scheduled').length,
//           hires: offers.filter(o => o.status === 'Accepted').length,
//         });
//       } catch (error) {
//         console.error('Error parsing stats from localStorage:', error);
//         setStats({ openPositions: 0, candidates: 0, interviews: 0, hires: 0 });
//       }
//     };
//     updateStats();
//     window.addEventListener('storage', updateStats);
//     return () => window.removeEventListener('storage', updateStats);
//   }, []);

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <DashboardContent stats={stats} />;
//       case 'job-postings':
//         return <JobPostings />;
//       case 'candidates':
//         return <Candidates />;
//       case 'interviews':
//         return <Interviews />;
//       case 'offers':
//         return <Offers />;
//       case 'settings':
//         return <HiringSettings />;
//       default:
//         return <DashboardContent stats={stats} />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md">
//         <div className="p-4 border-b border-gray-200">
//           <h1 className="text-xl font-bold text-blue-600">Hiring Module</h1>
//         </div>
//         <nav className="p-4">
//           <ul className="space-y-2">
//             <li>
//               <button
//                 onClick={() => setActiveTab('dashboard')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiBriefcase className="mr-3" />
//                 Dashboard
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('job-postings')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'job-postings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiFileText className="mr-3" />
//                 Job Postings
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('candidates')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'candidates' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiUsers className="mr-3" />
//                 Candidates
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('interviews')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'interviews' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiCalendar className="mr-3" />
//                 Interviews
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('offers')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'offers' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiMail className="mr-3" />
//                 Offers
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('settings')}
//                 className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'settings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
//               >
//                 <FiSettings className="mr-3" />
//                 Settings
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Hiring Dashboard</h2>
//           <p className="text-gray-600">Manage your recruitment process efficiently</p>
//         </div>
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// const DashboardContent = ({ stats }) => {
//   return (
//     <div>
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard title="Open Positions" value={stats.openPositions} icon={<FiBriefcase className="text-blue-500" size={24} />} color="blue" />
//         <StatCard title="Candidates" value={stats.candidates} icon={<FiUsers className="text-green-500" size={24} />} color="green" />
//         <StatCard title="Interviews" value={stats.interviews} icon={<FiCalendar className="text-purple-500" size={24} />} color="purple" />
//         <StatCard title="Hires" value={stats.hires} icon={<FiMail className="text-yellow-500" size={24} />} color="yellow" />
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
//         <div className="space-y-4">
//           <ActivityItem title="New candidate applied" description="John Doe applied for Senior Developer position" time="2 hours ago" />
//           <ActivityItem title="Interview scheduled" description="Interview with Sarah Johnson for Marketing Manager" time="Yesterday" />
//           <ActivityItem title="Job posted" description="New job posted: UX Designer" time="2 days ago" />
//         </div>
//       </div>

//       {/* Upcoming Interviews */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h3 className="text-lg font-semibold mb-4">Upcoming Interviews</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewers</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               <InterviewRow candidate="John Doe" position="Senior Developer" datetime="May 15, 2023 - 10:00 AM" interviewers="Jane Smith, Mike Johnson" status="Confirmed" />
//               <InterviewRow candidate="Sarah Johnson" position="Marketing Manager" datetime="May 16, 2023 - 2:30 PM" interviewers="Alex Brown" status="Pending" />
//               <InterviewRow candidate="Michael Chen" position="Data Analyst" datetime="May 17, 2023 - 11:00 AM" interviewers="Lisa Wong, David Kim" status="Confirmed" />
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ title, value, icon, color }) => {
//   const colorClasses = {
//     blue: 'bg-blue-50',
//     green: 'bg-green-50',
//     purple: 'bg-purple-50',
//     yellow: 'bg-yellow-50',
//   };

//   return (
//     <div className={`${colorClasses[color]} p-6 rounded-lg shadow-sm`}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
//         </div>
//         <div className="p-3 rounded-full bg-white shadow-sm">{icon}</div>
//       </div>
//     </div>
//   );
// };

// const ActivityItem = ({ title, description, time }) => {
//   return (
//     <div className="flex items-start">
//       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
//         <FiBriefcase className="text-blue-500" />
//       </div>
//       <div className="flex-1">
//         <h4 className="text-sm font-medium text-gray-900">{title}</h4>
//         <p className="text-sm text-gray-600">{description}</p>
//         <p className="text-xs text-gray-500 mt-1">{time}</p>
//       </div>
//     </div>
//   );
// };

// const InterviewRow = ({ candidate, position, datetime, interviewers, status }) => {
//   const statusClasses = {
//     Confirmed: 'bg-green-100 text-green-800',
//     Pending: 'bg-yellow-100 text-yellow-800',
//     Cancelled: 'bg-red-100 text-red-800',
//   };

//   return (
//     <tr>
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datetime}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interviewers}</td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
//           {status}
//         </span>
//       </td>
//     </tr>
//   );
// };

// export default Hiring;

// import { useState, useEffect } from 'react';
// import { FiBriefcase, FiUsers, FiCalendar, FiMail, FiFileText, FiSettings } from 'react-icons/fi';
// import Offers from '../../components/Offers';
// import HiringSettings from '../../components/HiringSettings';
// import Candidates from '../../components/Candidates';
// import JobPostings from '../../components/JobPostings';
// import Interviews from '../../components/Interviews';

// const Hiring = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [stats, setStats] = useState({
//     openPositions: 0,
//     candidates: 0,
//     interviews: 0,
//     hires: 0,
//   });

//   useEffect(() => {
//     const updateStats = () => {
//       try {
//         const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
//         const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
//         const interviews = JSON.parse(localStorage.getItem('interviews') || '[]');
//         const offers = JSON.parse(localStorage.getItem('offers') || '[]');

//         setStats({
//           openPositions: jobs.filter(job => job.status === 'Active').length,
//           candidates: candidates.length,
//           interviews: interviews.filter(i => i.status === 'Scheduled').length,
//           hires: offers.filter(o => o.status === 'Accepted').length,
//         });
//       } catch (error) {
//         console.error('Error parsing stats from localStorage:', error);
//         setStats({ openPositions: 0, candidates: 0, interviews: 0, hires: 0 });
//       }
//     };
//     updateStats();
//     window.addEventListener('storage', updateStats);
//     return () => window.removeEventListener('storage', updateStats);
//   }, []);

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <DashboardContent stats={stats} />;
//       case 'job-postings':
//         return <JobPostings />;
//       case 'candidates':
//         return <Candidates />;
//       case 'interviews':
//         return <Interviews />;
//       case 'offers':
//         return <Offers />;
//       case 'settings':
//         return <HiringSettings />;
//       default:
//         return <DashboardContent stats={stats} />;
//     }
//   };

//   const getTabTitle = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return 'Dashboard';
//       case 'job-postings':
//         return 'Job Postings';
//       case 'candidates':
//         return 'Candidates';
//       case 'interviews':
//         return 'Interviews';
//       case 'offers':
//         return 'Offers';
//       case 'settings':
//         return 'Settings';
//       default:
//         return 'Dashboard';
//     }
//   };

//   const getTabDescription = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return 'Overview of your hiring process';
//       case 'job-postings':
//         return 'Manage job postings';
//       case 'candidates':
//         return 'View and manage candidates';
//       case 'interviews':
//         return 'Schedule and track interviews';
//       case 'offers':
//         return 'Manage job offers';
//       case 'settings':
//         return 'Configure hiring settings';
//       default:
//         return 'Overview of your hiring process';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation Bar */}
//       <div className="bg-white shadow-md">
//         <div className="p-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold text-blue-600">Hiring Module</h1>
//           <nav>
//             <ul className="flex space-x-4">
//               <li>
//                 <button
//                   onClick={() => setActiveTab('dashboard')}
//                   className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//                 >
//                   <FiBriefcase className="mr-2" />
//                   Dashboard
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => setActiveTab('job-postings')}
//                   className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'job-postings' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//                 >
//                   <FiFileText className="mr-2" />
//                   Job Postings
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => setActiveTab('candidates')}
//                   className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'candidates' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//                 >
//                   <FiUsers className="mr-2" />
//                   Candidates
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => setActiveTab('interviews')}
//                   className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'interviews' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//                 >
//                   <FiCalendar className="mr-2" />
//                   Interviews
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => setActiveTab('offers')}
//                   className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'offers' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//                 >
//                   <FiMail className="mr-2" />
//                   Offers
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => setActiveTab('settings')}
//                   className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'settings' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//                 >
//                   <FiSettings className="mr-2" />
//                   Settings
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-8">
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">{getTabTitle()}</h2>
//           <p className="text-gray-600">{getTabDescription()}</p>
//         </div>
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// const DashboardContent = ({ stats }) => {
//   // Sample data for charts
//   const [candidateStatusData] = useState([
//     { name: 'New', value: 15, color: '#3B82F6' },
//     { name: 'Screening', value: 8, color: '#F59E0B' },
//     { name: 'Interview', value: 12, color: '#8B5CF6' },
//     { name: 'Offer', value: 5, color: '#10B981' },
//     { name: 'Hired', value: 3, color: '#047857' },
//     { name: 'Rejected', value: 7, color: '#EF4444' },
//   ]);

//   const [hiringTrendData] = useState([
//     { name: 'Jan', hired: 2, interviewed: 8 },
//     { name: 'Feb', hired: 3, interviewed: 10 },
//     { name: 'Mar', hired: 5, interviewed: 15 },
//     { name: 'Apr', hired: 4, interviewed: 12 },
//     { name: 'May', hired: 6, interviewed: 18 },
//   ]);

//   const [jobOpeningsData] = useState([
//     { name: 'Engineering', value: 8, color: '#3B82F6' },
//     { name: 'Marketing', value: 3, color: '#10B981' },
//     { name: 'Design', value: 2, color: '#8B5CF6' },
//     { name: 'Operations', value: 1, color: '#F59E0B' },
//     { name: 'HR', value: 1, color: '#EC4899' },
//   ]);

//   // Calculate percentages for candidate status
//   const totalCandidates = candidateStatusData.reduce((sum, item) => sum + item.value, 0);
//   const candidateStatusWithPercentage = candidateStatusData.map(item => ({
//     ...item,
//     percentage: Math.round((item.value / totalCandidates) * 100)
//   }));

//   return (
//     <div>
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard title="Open Positions" value={stats.openPositions} icon={<FiBriefcase className="text-blue-500" size={24} />} color="blue" />
//         <StatCard title="Candidates" value={stats.candidates} icon={<FiUsers className="text-green-500" size={24} />} color="green" />
//         <StatCard title="Interviews" value={stats.interviews} icon={<FiCalendar className="text-purple-500" size={24} />} color="purple" />
//         <StatCard title="Hires" value={stats.hires} icon={<FiMail className="text-yellow-500" size={24} />} color="yellow" />
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Candidate Status Pie Chart */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold mb-4">Candidate Status</h3>
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="w-64 h-64 relative">
//               {/* Pie Chart */}
//               <svg width="100%" height="100%" viewBox="0 0 100 100">
//                 {candidateStatusWithPercentage.reduce((acc, item, index) => {
//                   const startAngle = acc;
//                   const endAngle = startAngle + (item.value / totalCandidates) * 360;
//                   const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0;
                  
//                   // Calculate coordinates for the arc
//                   const x1 = 50 + 40 * Math.cos(Math.PI * startAngle / 180);
//                   const y1 = 50 + 40 * Math.sin(Math.PI * startAngle / 180);
//                   const x2 = 50 + 40 * Math.cos(Math.PI * endAngle / 180);
//                   const y2 = 50 + 40 * Math.sin(Math.PI * endAngle / 180);
                  
//                   return [
                    
//                     <path
//                       key={index}
//                       d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
//                       fill={item.color}
//                       stroke="white"
//                       strokeWidth="1"
//                     />
//                   ];
//                 }, 0)}
//                 <circle cx="50" cy="50" r="15" fill="white" />
//                 <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="10">
//                   {totalCandidates}
//                 </text>
//               </svg>
//             </div>
//             <div className="ml-0 md:ml-6 mt-4 md:mt-0">
//               <ul className="space-y-2">
//                 {candidateStatusWithPercentage.map((item, index) => (
//                   <li key={index} className="flex items-center">
//                     <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
//                     <span className="text-sm">
//                       {item.name}: {item.value} ({item.percentage}%)
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Hiring Trend Bar Chart */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold mb-4">Hiring Trend (Last 5 Months)</h3>
//           <div className="h-64">
//             <div className="flex h-full items-end space-x-4">
//               {hiringTrendData.map((month, index) => (
//                 <div key={index} className="flex flex-col items-center flex-1">
//                   <div className="flex items-end w-full h-48">
//                     <div 
//                       className="w-full bg-blue-500 rounded-t" 
//                       style={{ height: `${(month.interviewed / 20) * 100}%` }}
//                       title={`Interviewed: ${month.interviewed}`}
//                     ></div>
//                     <div 
//                       className="w-full bg-green-500 rounded-t ml-1" 
//                       style={{ height: `${(month.hired / 20) * 100}%` }}
//                       title={`Hired: ${month.hired}`}
//                     ></div>
//                   </div>
//                   <div className="text-xs mt-2">{month.name}</div>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-center space-x-4 mt-2">
//               <div className="flex items-center">
//                 <div className="w-3 h-3 bg-blue-500 mr-1"></div>
//                 <span className="text-xs">Interviewed</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-3 h-3 bg-green-500 mr-1"></div>
//                 <span className="text-xs">Hired</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Additional Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Job Openings by Department */}
//         <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Recent Activity</h3>
//           <button className="text-blue-600 hover:text-blue-800 text-sm">
//             View All
//           </button>
//         </div>
//         <div className="space-y-4">
//           <ActivityItem 
//             title="New candidate applied" 
//             description="John Doe applied for Senior Developer position" 
//             time="2 hours ago" 
//             icon={<FiUsers className="text-blue-500" />}
//           />
//           <ActivityItem 
//             title="Interview scheduled" 
//             description="Interview with Sarah Johnson for Marketing Manager" 
//             time="Yesterday" 
//             icon={<FiCalendar className="text-purple-500" />}
//           />
//           <ActivityItem 
//             title="Job posted" 
//             description="New job posted: UX Designer" 
//             time="2 days ago" 
//             icon={<FiFileText className="text-green-500" />}
//           />
//           <ActivityItem 
//             title="Offer accepted" 
//             description="Michael Chen accepted the Data Analyst offer" 
//             time="3 days ago" 
//             icon={<FiMail className="text-yellow-500" />}
//           />
//         </div>
//       </div>

//         {/* Time to Hire Metrics */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold mb-4">Time to Hire Metrics</h3>
//           <div className="space-y-4">
//             <div>
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium">Average Time to Hire</span>
//                 <span className="text-sm font-medium">32 days</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium">Engineering Roles</span>
//                 <span className="text-sm font-medium">38 days</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium">Non-Engineering Roles</span>
//                 <span className="text-sm font-medium">25 days</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
//               </div>
//             </div>
//           </div>
//           <div className="mt-6">
//             <h4 className="text-md font-medium mb-2">Quick Actions</h4>
//             <div className="grid grid-cols-2 gap-3">
//               <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200">
//                 Post New Job
//               </button>
//               <button className="px-3 py-2 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200">
//                 Schedule Interview
//               </button>
//               <button className="px-3 py-2 bg-purple-100 text-purple-700 rounded-md text-sm hover:bg-purple-200">
//                 View Candidates
//               </button>
//               <button className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-md text-sm hover:bg-yellow-200">
//                 Generate Report
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

      

//       {/* Upcoming Interviews */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Upcoming Interviews</h3>
//           <button className="text-blue-600 hover:text-blue-800 text-sm">
//             View All
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewers</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               <InterviewRow candidate="John Doe" position="Senior Developer" datetime="May 15, 2023 - 10:00 AM" interviewers="Jane Smith, Mike Johnson" status="Confirmed" />
//               <InterviewRow candidate="Sarah Johnson" position="Marketing Manager" datetime="May 16, 2023 - 2:30 PM" interviewers="Alex Brown" status="Pending" />
//               <InterviewRow candidate="Michael Chen" position="Data Analyst" datetime="May 17, 2023 - 11:00 AM" interviewers="Lisa Wong, David Kim" status="Confirmed" />
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Update ActivityItem to include icon prop
// const ActivityItem = ({ title, description, time, icon }) => {
//   return (
//     <div className="flex items-start">
//       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
//         {icon}
//       </div>
//       <div className="flex-1">
//         <h4 className="text-sm font-medium text-gray-900">{title}</h4>
//         <p className="text-sm text-gray-600">{description}</p>
//         <p className="text-xs text-gray-500 mt-1">{time}</p>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ title, value, icon, color }) => {
//   const colorClasses = {
//     blue: 'bg-blue-50',
//     green: 'bg-green-50',
//     purple: 'bg-purple-50',
//     yellow: 'bg-yellow-50',
//   };

//   return (
//     <div className={`${colorClasses[color]} p-6 rounded-lg shadow-sm`}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
//         </div>
//         <div className="p-3 rounded-full bg-white shadow-sm">{icon}</div>
//       </div>
//     </div>
//   );
// };


// const InterviewRow = ({ candidate, position, datetime, interviewers, status }) => {
//   const statusClasses = {
//     Confirmed: 'bg-green-100 text-green-800',
//     Pending: 'bg-yellow-100 text-yellow-800',
//     Cancelled: 'bg-red-100 text-red-800',
//   };

//   return (
//     <tr>
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datetime}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interviewers}</td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
//           {status}
//         </span>
//       </td>
//     </tr>
//   );
// };

// export default Hiring;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBriefcase, FiUsers, FiCalendar, FiMail, FiFileText, 
  FiSettings, FiActivity, FiClock, FiTrendingUp, FiCheck,
  FiChevronRight, FiUser, FiDollarSign, FiAward
} from 'react-icons/fi';
import Offers from '../../components/Offers';
import HiringSettings from '../../components/HiringSettings';
import Candidates from '../../components/Candidates';
import JobPostings from '../../components/JobPostings';
import Interviews from '../../components/Interviews';

const Hiring = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    openPositions: 0,
    candidates: 0,
    interviews: 0,
    hires: 0,
  });

  useEffect(() => {
    const updateStats = () => {
      try {
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
        const interviews = JSON.parse(localStorage.getItem('interviews') || '[]');
        const offers = JSON.parse(localStorage.getItem('offers') || '[]');

        setStats({
          openPositions: jobs.filter(job => job.status === 'Active').length,
          candidates: candidates.length,
          interviews: interviews.filter(i => i.status === 'Scheduled').length,
          hires: offers.filter(o => o.status === 'Accepted').length,
        });
      } catch (error) {
        console.error('Error parsing stats from localStorage:', error);
        setStats({ openPositions: 0, candidates: 0, interviews: 0, hires: 0 });
      }
    };
    updateStats();
    window.addEventListener('storage', updateStats);
    return () => window.removeEventListener('storage', updateStats);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent stats={stats} />;
      case 'job-postings':
        return <JobPostings />;
      case 'candidates':
        return <Candidates />;
      case 'interviews':
        return <Interviews />;
      case 'offers':
        return <Offers />;
      case 'settings':
        return <HiringSettings />;
      default:
        return <DashboardContent stats={stats} />;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'job-postings':
        return 'Job Postings';
      case 'candidates':
        return 'Candidates';
      case 'interviews':
        return 'Interviews';
      case 'offers':
        return 'Offers';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Overview of your hiring process';
      case 'job-postings':
        return 'Manage job postings';
      case 'candidates':
        return 'View and manage candidates';
      case 'interviews':
        return 'Schedule and track interviews';
      case 'offers':
        return 'Manage job offers';
      case 'settings':
        return 'Configure hiring settings';
      default:
        return 'Overview of your hiring process';
    }
  };

  const tabVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-lg rounded-b-xl">
        <div className="max-w-8xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
              className="mr-2"
            >
              <FiBriefcase className="text-indigo-600" size={26} />
            </motion.div>
            Hiring Module
          </h1>
          <nav>
            <ul className="flex space-x-1">
              {[
                { id: 'dashboard', icon: FiBriefcase, label: 'Dashboard' },
                { id: 'job-postings', icon: FiFileText, label: 'Job Postings' },
                { id: 'candidates', icon: FiUsers, label: 'Candidates' },
                { id: 'interviews', icon: FiCalendar, label: 'Interviews' },
                { id: 'offers', icon: FiMail, label: 'Offers' },
                { id: 'settings', icon: FiSettings, label: 'Settings' },
              ].map((tab) => (
                <li key={tab.id}>
                  <motion.button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-blue-50'
                    }`}
                    whileHover="hover"
                    whileTap="tap"
                    variants={tabVariants}
                  >
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      className="mr-2"
                    >
                      <tab.icon className={activeTab === tab.id ? "text-white" : "text-indigo-500"} />
                    </motion.div>
                    {tab.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            {getTabTitle()}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="ml-3 text-indigo-500"
            >
              {activeTab === 'dashboard' && <FiBriefcase />}
              {activeTab === 'job-postings' && <FiFileText />}
              {activeTab === 'candidates' && <FiUsers />}
              {activeTab === 'interviews' && <FiCalendar />}
              {activeTab === 'offers' && <FiMail />}
              {activeTab === 'settings' && <FiSettings />}
            </motion.div>
          </h2>
          <p className="text-gray-600 ml-1">{getTabDescription()}</p>
        </motion.div>
        {renderTabContent()}
      </div>
    </div>
  );
};

// const DashboardContent = ({ stats }) => {
//   // Sample data for charts
//   const [candidateStatusData] = useState([
//     { name: 'New', value: 15, color: '#4F46E5' }, // Indigo
//     { name: 'Screening', value: 8, color: '#0EA5E9' }, // Sky
//     { name: 'Interview', value: 12, color: '#8B5CF6' }, // Violet
//     { name: 'Offer', value: 5, color: '#10B981' }, // Emerald
//     { name: 'Hired', value: 3, color: '#059669' }, // Green
//     { name: 'Rejected', value: 7, color: '#F43F5E' }, // Rose
//   ]);

//   const [hiringTrendData] = useState([
//     { name: 'Jan', hired: 2, interviewed: 8 },
//     { name: 'Feb', hired: 3, interviewed: 10 },
//     { name: 'Mar', hired: 5, interviewed: 15 },
//     { name: 'Apr', hired: 4, interviewed: 12 },
//     { name: 'May', hired: 6, interviewed: 18 },
//   ]);

//   // Calculate percentages for candidate status
//   const totalCandidates = candidateStatusData.reduce((sum, item) => sum + item.value, 0);
//   const candidateStatusWithPercentage = candidateStatusData.map(item => ({
//     ...item,
//     percentage: Math.round((item.value / totalCandidates) * 100)
//   }));

//   return (
//     <div>
//       {/* Stats Cards */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//       >
//         <StatCard 
//           title="Open Positions" 
//           value={stats.openPositions} 
//           icon={<FiBriefcase />} 
//           color="blue" 
//           description="Active job openings"
//         />
//         <StatCard 
//           title="Candidates" 
//           value={stats.candidates} 
//           icon={<FiUsers />} 
//           color="purple" 
//           description="Total applicants"
//         />
//         <StatCard 
//           title="Interviews" 
//           value={stats.interviews} 
//           icon={<FiCalendar />} 
//           color="green" 
//           description="Scheduled this month"
//         />
//         <StatCard 
//           title="Hires" 
//           value={stats.hires} 
//           icon={<FiMail />} 
//           color="orange" 
//           description="Successful placements"
//         />
//       </motion.div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Candidate Status Pie Chart */}
//         <motion.div 
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="bg-white rounded-xl shadow-lg p-6 overflow-hidden border border-indigo-50"
//         >
//           <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//             <FiUsers className="mr-2 text-indigo-500" />
//             Candidate Status
//           </h3>
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="w-64 h-64 relative">
//               {/* Pie Chart with Animation */}
//               <svg width="100%" height="100%" viewBox="0 0 100 100">
//                 {candidateStatusWithPercentage.reduce((acc, item, index) => {
//                   const startAngle = acc;
//                   const endAngle = startAngle + (item.value / totalCandidates) * 360;
//                   const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0;
                  
//                   // Calculate coordinates for the arc
//                   const x1 = 50 + 40 * Math.cos(Math.PI * startAngle / 180);
//                   const y1 = 50 + 40 * Math.sin(Math.PI * startAngle / 180);
//                   const x2 = 50 + 40 * Math.cos(Math.PI * endAngle / 180);
//                   const y2 = 50 + 40 * Math.sin(Math.PI * endAngle / 180);
                  
//                   // Add animation with delay based on index
//                   return [
//                     <motion.path
//                       key={index}
//                       d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
//                       fill={item.color}
//                       stroke="white"
//                       strokeWidth="1"
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: 0.1 * index, duration: 0.5 }}
//                       whileHover={{ scale: 1.05 }}
//                     />
//                   ];
//                 }, 0)}
//                 <motion.circle 
//                   cx="50" cy="50" r="15" 
//                   fill="white" 
//                   filter="drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.8, duration: 0.5 }}
//                 />
//                 <motion.text 
//                   x="50" y="50" 
//                   textAnchor="middle" 
//                   dominantBaseline="middle" 
//                   fontSize="10"
//                   className="font-bold"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1, duration: 0.5 }}
//                 >
//                   {totalCandidates}
//                 </motion.text>
//               </svg>
//             </div>
//             <motion.div 
//               className="ml-0 md:ml-6 mt-4 md:mt-0"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//             >
//               <ul className="space-y-3">
//                 {candidateStatusWithPercentage.map((item, index) => (
//                   <motion.li 
//                     key={index} 
//                     className="flex items-center"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.2 * index, duration: 0.5 }}
//                   >
//                     <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
//                     <span className="text-sm font-medium">
//                       {item.name}: <span className="text-gray-700 font-bold">{item.value}</span> <span className="text-gray-500">({item.percentage}%)</span>
//                     </span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Hiring Trend Bar Chart */}
//         <motion.div 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="bg-white rounded-xl shadow-lg p-6 border border-indigo-50"
//         >
//           <h3 className="text-lg font-semibold  text-gray-800 flex items-center">
//             <FiTrendingUp className="mr-2 text-green-500" />
//             Hiring Trend (Last 5 Months)
//           </h3>
//           <div className="h-64">
//             <div className="flex h-full items-end space-x-4">
//               {hiringTrendData.map((month, index) => (
//                 <div key={index} className="flex flex-col items-center flex-1">
//                   <div className="flex items-end w-full h-48">
//                     <motion.div 
//                       className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t" 
//                       style={{ height: `${(month.interviewed / 20) * 100}%` }}
//                       title={`Interviewed: ${month.interviewed}`}
//                       initial={{ height: 0 }}
//                       animate={{ height: `${(month.interviewed / 20) * 100}%` }}
//                       transition={{ delay: 0.2 * index, duration: 0.8 }}
//                       whileHover={{ filter: "brightness(1.1)" }}
//                     ></motion.div>
//                     <motion.div 
//                       className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t ml-1" 
//                       style={{ height: `${(month.hired / 20) * 100}%` }}
//                       title={`Hired: ${month.hired}`}
//                       initial={{ height: 0 }}
//                       animate={{ height: `${(month.hired / 20) * 100}%` }}
//                       transition={{ delay: 0.2 * index + 0.2, duration: 0.8 }}
//                       whileHover={{ filter: "brightness(1.1)" }}
//                     ></motion.div>
//                   </div>
//                   <div className="text-xs mt-2 font-medium">{month.name}</div>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-center space-x-4 mt-4">
//               <div className="flex items-center">
//                 <div className="w-3 h-3 bg-indigo-500 mr-1 rounded"></div>
//                 <span className="text-xs font-medium">Interviewed</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-3 h-3 bg-emerald-500 mr-1 rounded"></div>
//                 <span className="text-xs font-medium">Hired</span>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Additional Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Recent Activity */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-indigo-50"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//               <FiActivity className="mr-2 text-rose-500" />
//               Recent Activity
//             </h3>
//             <motion.button 
//               className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               View All
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </motion.button>
//           </div>
//           <div className="space-y-5">
//             <ActivityItem 
//               title="New candidate applied" 
//               description="John Doe applied for Senior Developer position" 
//               time="2 hours ago" 
//               icon={<FiUsers className="text-blue-500" />}
//               delay={0.1}
//             />
//             <ActivityItem 
//               title="Interview scheduled" 
//               description="Interview with Sarah Johnson for Marketing Manager" 
//               time="Yesterday" 
//               icon={<FiCalendar className="text-purple-500" />}
//               delay={0.2}
//             />
//             <ActivityItem 
//               title="Job posted" 
//               description="New job posted: UX Designer" 
//               time="2 days ago" 
//               icon={<FiFileText className="text-green-500" />}
//               delay={0.3}
//             />
//             <ActivityItem 
//               title="Offer accepted" 
//               description="Michael Chen accepted the Data Analyst offer" 
//               time="3 days ago" 
//               icon={<FiMail className="text-yellow-500" />}
//               delay={0.4}
//             />
//           </div>
//         </motion.div>

//         {/* Time to Hire Metrics */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="bg-white rounded-xl shadow-lg p-6 border border-indigo-50"
//         >
//           <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//             <FiClock className="mr-2 text-blue-500" />
//             Time to Hire Metrics
//           </h3>
//           <div className="space-y-5">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1, duration: 0.5 }}
//             >
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium">Average Time to Hire</span>
//                 <span className="text-sm font-bold text-indigo-600">32 days</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <motion.div 
//                   className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full" 
//                   initial={{ width: 0 }}
//                   animate={{ width: '70%' }}
//                   transition={{ delay: 0.2, duration: 0.8 }}
//                 ></motion.div>
//               </div>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//             >
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium">Engineering Roles</span>
//                 <span className="text-sm font-bold text-purple-600">38 days</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <motion.div 
//                   className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" 
//                   initial={{ width: 0 }}
//                   animate={{ width: '80%' }}
//                   transition={{ delay: 0.3, duration: 0.8 }}
//                 ></motion.div>
//               </div>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//             >
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium">Non-Engineering Roles</span>
//                 <span className="text-sm font-bold text-green-600">25 days</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <motion.div 
//                   className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" 
//                   initial={{ width: 0 }}
//                   animate={{ width: '55%' }}
//                   transition={{ delay: 0.4, duration: 0.8 }}
//                 ></motion.div>
//               </div>
//             </motion.div>
//           </div>
//           <motion.div 
//             className="mt-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.5 }}
//           >
//             <h4 className="text-md font-medium mb-3">Quick Actions</h4>
//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { label: "Post New Job", icon: FiFileText, color: "blue" },
//                 { label: "Schedule Interview", icon: FiCalendar, color: "green" },
//                 { label: "View Candidates", icon: FiUsers, color: "purple" },
//                 { label: "Generate Report", icon: FiActivity, color: "yellow" }
//               ].map((action, index) => (
//                 <motion.button 
//                   key={index}
//                   className={`px-3 py-3 bg-${action.color}-50 text-${action.color}-700 rounded-lg text-sm font-medium hover:bg-${action.color}-100 transition-all flex items-center justify-center shadow-sm`}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
//                 >
//                   <action.icon className="mr-2" />
//                   {action.label}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Upcoming Interviews */}
//       <div>
//         <motion.div 
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.6 }}
//         className="bg-white rounded-xl shadow-lg p-6 border border-indigo-50"
//       >
//         <div className="flex justify-between items-center mb-5">
//           <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//             <FiCalendar className="mr-2 text-indigo-500" />
//             Upcoming Interviews
//           </h3>
//           <motion.button 
//             className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             View All
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </motion.button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50 rounded-t-lg">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewers</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               <InterviewRow 
//                 candidate="John Doe" 
//                 position="Senior Developer" 
//                 datetime="May 15, 2023 - 10:00 AM" 
//                 interviewers="Jane Smith, Mike Johnson" 
//                 status="Confirmed"
//                 delay={0.1}
//               />
//               <InterviewRow 
//                 candidate="Sarah Johnson" 
//                 position="Marketing Manager" 
//                 datetime="May 16, 2023 - 2:30 PM" 
//                 interviewers="Alex Brown" 
//                 status="Pending"
//                 delay={0.2}
//               />
//               <InterviewRow 
//                 candidate="Michael Chen" 
//                 position="Data Analyst" 
//                 datetime="May 17, 2023 - 11:00 AM" 
//                 interviewers="Lisa Wong, David Kim" 
//                 status="Confirmed"
//                 delay={0.3}
//               />
//             </tbody>
//           </table>
//         </div>
//       </motion.div>
//       </div>
//     </div>
//   );
// };

// // Update ActivityItem to include animations and improved styling
// const ActivityItem = ({ title, description, time, icon, delay = 0 }) => {
//   return (
//     <motion.div 
//       className="flex items-start p-3 rounded-lg hover:bg-indigo-50 transition-colors"
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay, duration: 0.3 }}
//       whileHover={{ x: 5 }}
//     >
//       <motion.div 
//         className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center mr-4 shadow-sm"
//         whileHover={{ rotate: 15 }}
//       >
//         {icon}
//       </motion.div>
//       <div className="flex-1">
//         <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
//         <p className="text-sm text-gray-600">{description}</p>
//         <p className="text-xs text-gray-500 mt-1 flex items-center">
//           <FiClock className="mr-1" size={10} />
//           {time}
//         </p>
//       </div>
//       </motion.div>
//   );
// };

// const StatCard = ({ title, value, icon, color, description }) => {
//   const colorConfig = {
//     blue: {
//       bg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
//       iconBg: 'bg-blue-500',
//       textColor: 'text-blue-600',
//       shadow: 'shadow-blue-100'
//     },
//     green: {
//       bg: 'bg-gradient-to-br from-green-50 to-emerald-100',
//       iconBg: 'bg-green-500',
//       textColor: 'text-green-600',
//       shadow: 'shadow-green-100'
//     },
//     purple: {
//       bg: 'bg-gradient-to-br from-purple-50 to-violet-100',
//       iconBg: 'bg-purple-500',
//       textColor: 'text-purple-600',
//       shadow: 'shadow-purple-100'
//     },
//     orange: {
//       bg: 'bg-gradient-to-br from-orange-50 to-amber-100',
//       iconBg: 'bg-orange-500',
//       textColor: 'text-orange-600',
//       shadow: 'shadow-orange-100'
//     },
//   };

//   const { bg, iconBg, textColor, shadow } = colorConfig[color];

//   return (
//     <motion.div 
//       className={`${bg} p-6 rounded-xl shadow-lg ${shadow} border border-white`}
//       whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
//       transition={{ duration: 0.2 }}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <div className="flex items-end">
//             <motion.h3 
//               className={`text-3xl font-bold ${textColor} mt-1`}
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               {value}
//             </motion.h3>
//             <span className="text-xs text-gray-500 mb-1 ml-1">/ total</span>
//           </div>
//           <p className="text-xs text-gray-500 mt-1">{description}</p>
//         </div>
//         <motion.div 
//           className={`p-4 rounded-full bg-white shadow-md flex items-center justify-center text-white ${iconBg}`}
//           whileHover={{ rotate: 15, scale: 1.1 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           {icon}
//         </motion.div>
//       </div>
//       <motion.div 
//         className="w-full h-1 bg-white/50 rounded-full mt-4 overflow-hidden"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         <motion.div 
//           className={`h-full ${iconBg} rounded-full`}
//           initial={{ width: 0 }}
//           animate={{ width: `${(value / 20) * 100}%` }}
//           transition={{ duration: 1, delay: 0.5 }}
//         />
//       </motion.div>
//     </motion.div>
//   );
// };


const DashboardContent = ({ stats }) => {
  const [candidateStatusData] = useState([
    { name: 'New', value: 15, color: '#6366F1', icon: <FiUser className="text-white" /> }, // Indigo
    { name: 'Screening', value: 8, color: '#8B5CF6', icon: <FiActivity className="text-white" /> }, // Violet
    { name: 'Interview', value: 12, color: '#EC4899', icon: <FiCalendar className="text-white" /> }, // Pink
    { name: 'Offer', value: 5, color: '#10B981', icon: <FiDollarSign className="text-white" /> }, // Emerald
    { name: 'Hired', value: 3, color: '#059669', icon: <FiAward className="text-white" /> }, // Green
    { name: 'Rejected', value: 7, color: '#F43F5E', icon: <FiCheck className="text-white" /> }, // Rose
  ]);

  const [hiringTrendData] = useState([
    { name: 'Jan', hired: 2, interviewed: 8 },
    { name: 'Feb', hired: 3, interviewed: 10 },
    { name: 'Mar', hired: 5, interviewed: 15 },
    { name: 'Apr', hired: 4, interviewed: 12 },
    { name: 'May', hired: 6, interviewed: 18 },
  ]);

  const totalCandidates = candidateStatusData.reduce((sum, item) => sum + item.value, 0);
  const candidateStatusWithPercentage = candidateStatusData.map(item => ({
    ...item,
    percentage: Math.round((item.value / totalCandidates) * 100)
  }));

  return (
    <div>
      {/* Stats Cards - Enhanced with better shadows and animations */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <StatCard 
          title="Open Positions" 
          value={stats.openPositions} 
          icon={<FiBriefcase className="text-white" size={20} />} 
          color="blue" 
          description="Active job openings"
          trend="up"
          trendValue="12%"
        />
        <StatCard 
          title="Candidates" 
          value={stats.candidates} 
          icon={<FiUsers className="text-white" size={20} />} 
          color="purple" 
          description="Total applicants"
          trend="up"
          trendValue="24%"
        />
        <StatCard 
          title="Interviews" 
          value={stats.interviews} 
          icon={<FiCalendar className="text-white" size={20} />} 
          color="pink" 
          description="Scheduled this month"
          trend="down"
          trendValue="8%"
        />
        <StatCard 
          title="Hires" 
          value={stats.hires} 
          icon={<FiMail className="text-white" size={20} />} 
          color="green" 
          description="Successful placements"
          trend="up"
          trendValue="36%"
        />
      </motion.div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Candidate Status Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-orange-50 rounded-xl shadow-lg p-6 overflow-hidden border border-indigo-500"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <FiUsers className="mr-2 text-indigo-500" />
            Candidate Status
          </h3>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-64 h-50 relative">
              {/* Pie Chart with Animation */}
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                {candidateStatusWithPercentage.reduce((acc, item, index) => {
                  const startAngle = acc;
                  const endAngle = startAngle + (item.value / totalCandidates) * 360;
                  const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0;
                  
                  // Calculate coordinates for the arc
                  const x1 = 50 + 40 * Math.cos(Math.PI * startAngle / 180);
                  const y1 = 50 + 40 * Math.sin(Math.PI * startAngle / 180);
                  const x2 = 50 + 40 * Math.cos(Math.PI * endAngle / 180);
                  const y2 = 50 + 40 * Math.sin(Math.PI * endAngle / 180);
                  
                  // Add animation with delay based on index
                  return [
                    <motion.path
                      key={index}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={item.color}
                      stroke="white"
                      strokeWidth="1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    />
                  ];
                }, 0)}
                <motion.circle 
                  cx="50" cy="50" r="15" 
                  fill="white" 
                  filter="drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                />
                <motion.text 
                  x="50" y="50" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fontSize="10"
                  className="font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  {totalCandidates}
                </motion.text>
              </svg>
            </div>
            <motion.div 
              className="ml-0 md:ml-6 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <ul className="space-y-3">
                {candidateStatusWithPercentage.map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index, duration: 0.5 }}
                  >
                    <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">
                      {item.name}: <span className="text-gray-700 font-bold">{item.value}</span> <span className="text-gray-500">({item.percentage}%)</span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Hiring Trend Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-lime-50 rounded-xl shadow-lg p-6 border border-indigo-500"
        >
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FiTrendingUp className="mr-2 text-green-500" />
            Hiring Trend (Last 5 Months)
          </h3>
          <div className="h-50">
            <div className="flex h-full items-end space-x-4">
              {hiringTrendData.map((month, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex items-end w-full h-48">
                    <motion.div 
                      className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t" 
                      style={{ height: `${(month.interviewed / 20) * 100}%` }}
                      title={`Interviewed: ${month.interviewed}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${(month.interviewed / 20) * 100}%` }}
                      transition={{ delay: 0.2 * index, duration: 0.8 }}
                      whileHover={{ filter: "brightness(1.1)" }}
                    ></motion.div>
                    <motion.div 
                      className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t ml-1" 
                      style={{ height: `${(month.hired / 20) * 100}%` }}
                      title={`Hired: ${month.hired}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${(month.hired / 20) * 100}%` }}
                      transition={{ delay: 0.2 * index + 0.2, duration: 0.8 }}
                      whileHover={{ filter: "brightness(1.1)" }}
                    ></motion.div>
                  </div>
                  <div className="text-xs mt-2 font-medium">{month.name}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-500 mr-1 rounded"></div>
                <span className="text-xs font-medium">Interviewed</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 mr-1 rounded"></div>
                <span className="text-xs font-medium">Hired</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Equal Height Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity - Height matched to Time to Hire */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-fuchsia-50 rounded-2xl shadow-xl p-6 border border-indigo-500 h-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <div className="p-2 mr-3 rounded-lg bg-rose-100 text-rose-600">
                <FiActivity size={20} />
              </div>
              Recent Activity
            </h3>
            <motion.button 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              View All <FiChevronRight className="ml-1" />
            </motion.button>
          </div>
          
          <div className="space-y-4">
            <ActivityItem 
              title="New candidate applied" 
              description="John Doe applied for Senior Developer position" 
              time="2 hours ago" 
              icon={<FiUsers className="text-blue-500" />}
              color="blue"
              delay={0.1}
            />
            <ActivityItem 
              title="Interview scheduled" 
              description="Interview with Sarah Johnson for Marketing Manager" 
              time="Yesterday" 
              icon={<FiCalendar className="text-purple-500" />}
              color="purple"
              delay={0.2}
            />
            <ActivityItem 
              title="Job posted" 
              description="New job posted: UX Designer" 
              time="2 days ago" 
              icon={<FiFileText className="text-green-500" />}
              color="green"
              delay={0.3}
            />
            <ActivityItem 
              title="Offer accepted" 
              description="Michael Chen accepted the Data Analyst offer" 
              time="3 days ago" 
              icon={<FiMail className="text-amber-500" />}
              color="amber"
              delay={0.4}
            />
          </div>
        </motion.div>

        {/* Time to Hire Metrics - Height matched to Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-yellow-50 rounded-2xl shadow-xl p-6 border border-indigo-500 h-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <div className="p-2 mr-3 rounded-lg bg-blue-100 text-blue-600">
                <FiClock size={20} />
              </div>
              Time to Hire Metrics
            </h3>
            <motion.button 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details <FiChevronRight className="ml-1" />
            </motion.button>
          </div>
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Average Time to Hire</span>
                <span className="text-sm font-bold text-indigo-600">32 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Industry avg: 42 days</span>
                <span className="text-xs font-medium text-green-600">-10 days</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Engineering Roles</span>
                <span className="text-sm font-bold text-purple-600">38 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: '80%' }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Industry avg: 45 days</span>
                <span className="text-xs font-medium text-green-600">-7 days</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Non-Engineering Roles</span>
                <span className="text-sm font-bold text-green-600">25 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: '55%' }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Industry avg: 35 days</span>
                <span className="text-xs font-medium text-green-600">-10 days</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h4 className="text-md font-semibold mb-4 text-gray-800">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Post New Job", icon: FiFileText, color: "blue" },
                  { label: "Schedule Interview", icon: FiCalendar, color: "green" },
                  { label: "View Candidates", icon: FiUsers, color: "purple" },
                  { label: "Generate Report", icon: FiActivity, color: "amber" }
                ].map((action, index) => (
                  <motion.button 
                    key={index}
                    className={`px-3 py-3 bg-${action.color}-50 text-${action.color}-700 rounded-lg text-sm font-semibold hover:bg-${action.color}-100 transition-all flex items-center justify-center shadow-sm border border-${action.color}-100`}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
                  >
                    <action.icon className="mr-2" />
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Interviews - Enhanced */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-yellow-50 rounded-2xl shadow-xl p-6 border border-indigo-500"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <div className="p-2 mr-3 rounded-lg bg-indigo-100 text-indigo-600">
              <FiCalendar size={20} />
            </div>
            Upcoming Interviews
          </h3>
          <motion.button 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            View All <FiChevronRight className="ml-1" />
          </motion.button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border-red-400 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <InterviewRow 
                candidate="John Doe" 
                position="Senior Developer" 
                datetime="May 15, 2023 - 10:00 AM" 
                interviewers="Jane Smith, Mike Johnson" 
                status="Confirmed"
                delay={0.1}
              />
              <InterviewRow 
                candidate="Sarah Johnson" 
                position="Marketing Manager" 
                datetime="May 16, 2023 - 2:30 PM" 
                interviewers="Alex Brown" 
                status="Pending"
                delay={0.2}
              />
              <InterviewRow 
                candidate="Michael Chen" 
                position="Data Analyst" 
                datetime="May 17, 2023 - 11:00 AM" 
                interviewers="Lisa Wong, David Kim" 
                status="Confirmed"
                delay={0.3}
              />
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

// Enhanced ActivityItem component
const ActivityItem = ({ title, description, time, icon, color = "indigo", delay = 0 }) => {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
    indigo: "bg-indigo-100 text-indigo-600"
  };
  
  return (
    <motion.div 
      className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ x: 5 }}
    >
      <motion.div 
        className={`flex-shrink-0 h-10 w-10 rounded-lg ${colorMap[color]} flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md transition-shadow`}
        whileHover={{ rotate: 15, scale: 1.1 }}
      >
        {icon}
      </motion.div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1 flex items-center">
          <FiClock className="mr-1" size={12} />
          {time}
        </p>
      </div>
      <FiChevronRight className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
    </motion.div>
  );
};

// Enhanced StatCard component with trend indicator
const StatCard = ({ title, value, icon, color, description, trend, trendValue }) => {
  const colorConfig = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-100 to-blue-150',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      shadow: 'shadow-blue-100'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-150 to-green-200',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
      textColor: 'text-green-600',
      shadow: 'shadow-green-100'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      shadow: 'shadow-purple-100'
    },
    pink: {
      bg: 'bg-gradient-to-br from-pink-50 to-pink-100',
      iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600',
      textColor: 'text-pink-600',
      shadow: 'shadow-pink-100'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-amber-100',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
      textColor: 'text-orange-600',
      shadow: 'shadow-orange-100'
    },
  };

  const { bg, iconBg, textColor, shadow } = colorConfig[color];

  return (
    <motion.div 
      className={`${bg} p-6 rounded-2xl shadow-lg ${shadow} border border-white relative overflow-hidden`}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-end">
            <motion.h3 
              className={`text-3xl font-bold ${textColor} mt-1`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.h3>
            <span className="text-xs text-gray-500 mb-1 ml-1">/ total</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <motion.div 
          className={`p-4 rounded-xl ${iconBg} shadow-md flex items-center justify-center text-white`}
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
      </div>
      
      {/* Trend indicator */}
      {trend && (
        <div className={`absolute top-4 right-4 flex items-center text-xs font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
          {trendValue}
        </div>
      )}
      
      <motion.div 
        className="w-full h-1.5 bg-white/50 rounded-full mt-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className={`h-full ${iconBg} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${(value / 20) * 100}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};
const InterviewRow = ({ candidate, position, datetime, interviewers, status, delay = 0 }) => {
  const statusConfig = {
    Confirmed: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      icon: <FiCheck className="mr-1" size={12} />
    },
    Pending: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      icon: <FiClock className="mr-1" size={12} />
    },
    Cancelled: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      icon: <FiClock className="mr-1" size={12} />
    }
  };

  const { bgColor, textColor, borderColor, icon } = statusConfig[status];

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ backgroundColor: 'rgba(79, 70, 229, 0.05)' }}
      className="hover:bg-indigo-50 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center">
          <FiCalendar className="mr-2 text-indigo-500" size={14} />
          {datetime}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center">
          <FiUsers className="mr-2 text-indigo-500" size={14} />
          {interviewers}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <motion.span 
          className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor} border ${borderColor}`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
          {status}
        </motion.span>
      </td>
    </motion.tr>
  );
};

export default Hiring;