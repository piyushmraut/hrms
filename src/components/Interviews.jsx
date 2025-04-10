// import React from "react";
// import { useState,useEffect } from "react";
// const Interviews = () => {
//     const [interviews, setInterviews] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newInterview, setNewInterview] = useState({
//       candidateId: '',
//       interviewers: [],
//       date: '',
//       time: '',
//       type: 'On-site',
//       status: 'Scheduled',
//       feedback: ''
//     });
//     const [candidates, setCandidates] = useState([]);
//     const [employees, setEmployees] = useState([]);
  
//     useEffect(() => {
//       // Fetch data from API
//       const fetchData = async () => {
//         // Mock interviews
//         const mockInterviews = [
//           {
//             id: 1,
//             candidateId: 1,
//             candidateName: 'John Doe',
//             position: 'Senior Developer',
//             interviewers: [1, 2],
//             interviewerNames: 'Jane Smith, Mike Johnson',
//             date: '2023-05-15',
//             time: '10:00',
//             type: 'On-site',
//             status: 'Scheduled',
//             feedback: ''
//           },
//           {
//             id: 2,
//             candidateId: 2,
//             candidateName: 'Sarah Johnson',
//             position: 'Marketing Manager',
//             interviewers: [3],
//             interviewerNames: 'Alex Brown',
//             date: '2023-05-16',
//             time: '14:30',
//             type: 'Video',
//             status: 'Scheduled',
//             feedback: ''
//           },
//           {
//             id: 3,
//             candidateId: 3,
//             candidateName: 'Michael Chen',
//             position: 'Data Analyst',
//             interviewers: [4, 5],
//             interviewerNames: 'Lisa Wong, David Kim',
//             date: '2023-05-17',
//             time: '11:00',
//             type: 'On-site',
//             status: 'Completed',
//             feedback: 'Strong technical skills, needs more experience with our specific tools'
//           }
//         ];
        
//         // Mock candidates
//         const mockCandidates = [
//           { id: 1, name: 'John Doe', position: 'Senior Developer' },
//           { id: 2, name: 'Sarah Johnson', position: 'Marketing Manager' },
//           { id: 3, name: 'Michael Chen', position: 'Data Analyst' }
//         ];
        
//         // Mock employees
//         const mockEmployees = [
//           { id: 1, name: 'Jane Smith', role: 'Engineering Manager' },
//           { id: 2, name: 'Mike Johnson', role: 'Senior Developer' },
//           { id: 3, name: 'Alex Brown', role: 'Marketing Director' },
//           { id: 4, name: 'Lisa Wong', role: 'Data Science Lead' },
//           { id: 5, name: 'David Kim', role: 'HR Manager' }
//         ];
        
//         setInterviews(mockInterviews);
//         setCandidates(mockCandidates);
//         setEmployees(mockEmployees);
//       };
//       fetchData();
//     }, []);
  
//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setNewInterview(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     };
  
//     const handleInterviewerChange = (e) => {
//       const options = e.target.options;
//       const selectedInterviewers = [];
//       for (let i = 0; i < options.length; i++) {
//         if (options[i].selected) {
//           selectedInterviewers.push(parseInt(options[i].value));
//         }
//       }
//       setNewInterview(prev => ({
//         ...prev,
//         interviewers: selectedInterviewers
//       }));
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
      
//       // Find candidate and interviewers names
//       const candidate = candidates.find(c => c.id === parseInt(newInterview.candidateId));
//       const selectedInterviewers = employees.filter(e => newInterview.interviewers.includes(e.id));
//       const interviewerNames = selectedInterviewers.map(i => i.name).join(', ');
      
//       // Create new interview
//       const submittedInterview = {
//         id: interviews.length + 1,
//         candidateId: newInterview.candidateId,
//         candidateName: candidate.name,
//         position: candidate.position,
//         interviewers: newInterview.interviewers,
//         interviewerNames,
//         date: newInterview.date,
//         time: newInterview.time,
//         type: newInterview.type,
//         status: newInterview.status,
//         feedback: newInterview.feedback
//       };
      
//       setInterviews([...interviews, submittedInterview]);
//       setIsModalOpen(false);
//       setNewInterview({
//         candidateId: '',
//         interviewers: [],
//         date: '',
//         time: '',
//         type: 'On-site',
//         status: 'Scheduled',
//         feedback: ''
//       });
//     };
  
//     const updateInterviewStatus = (id, status) => {
//       setInterviews(interviews.map(interview => 
//         interview.id === id ? { ...interview, status } : interview
//       ));
//     };
  
//     const addFeedback = (id, feedback) => {
//       setInterviews(interviews.map(interview => 
//         interview.id === id ? { ...interview, feedback } : interview
//       ));
//     };
  
//     return (
//       <div>
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-lg font-semibold">Interviews</h3>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Schedule Interview
//           </button>
//         </div>
  
//         {/* Interviews Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewers</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {interviews.map(interview => (
//                 <tr key={interview.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">{interview.candidateName}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.position}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {interview.date} at {interview.time}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.type}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.interviewerNames}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <select
//                       value={interview.status}
//                       onChange={(e) => updateInterviewStatus(interview.id, e.target.value)}
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
//                         interview.status === 'Completed' ? 'bg-green-100 text-green-800' :
//                         interview.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
//                         'bg-gray-100 text-gray-800'
//                       }`}
//                     >
//                       <option value="Scheduled">Scheduled</option>
//                       <option value="Completed">Completed</option>
//                 <option value="Cancelled">Cancelled</option>
//                 <option value="No Show">No Show</option>
//               </select>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//               <button className="text-blue-600 hover:text-blue-900 mr-3">Details</button>
//               {interview.status === 'Completed' && !interview.feedback && (
//                 <button className="text-yellow-600 hover:text-yellow-900">Add Feedback</button>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>

//   {/* Schedule Interview Modal */}
//   {isModalOpen && (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Schedule New Interview</h3>
//             <button 
//               onClick={() => setIsModalOpen(false)}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
          
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Candidate*</label>
//                 <select
//                   name="candidateId"
//                   value={newInterview.candidateId}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 >
//                   <option value="">Select Candidate</option>
//                   {candidates.map(candidate => (
//                     <option key={candidate.id} value={candidate.id}>
//                       {candidate.name} - {candidate.position}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={newInterview.date}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Time*</label>
//                 <input
//                   type="time"
//                   name="time"
//                   value={newInterview.time}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
//                 <select
//                   name="type"
//                   value={newInterview.type}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 >
//                   <option value="On-site">On-site</option>
//                   <option value="Video">Video</option>
//                   <option value="Phone">Phone</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
//                 <select
//                   name="status"
//                   value={newInterview.status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 >
//                   <option value="Scheduled">Scheduled</option>
//                   <option value="Completed">Completed</option>
//                   <option value="Cancelled">Cancelled</option>
//                 </select>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Interviewers*</label>
//                 <select
//                   multiple
//                   size="5"
//                   name="interviewers"
//                   value={newInterview.interviewers}
//                   onChange={handleInterviewerChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 >
//                   {employees.map(employee => (
//                     <option key={employee.id} value={employee.id}>
//                       {employee.name} - {employee.role}
//                     </option>
//                   ))}
//                 </select>
//                 <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
//                 <textarea
//                   name="feedback"
//                   value={newInterview.feedback}
//                   onChange={handleInputChange}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter feedback if interview is completed"
//                 />
//               </div>
//             </div>
            
//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//               >
//                 Schedule Interview
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )}
// </div>
// );
// };

// export default Interviews;

// import React, { useState, useEffect } from 'react';

// const Interviews = () => {
//   const [interviews, setInterviews] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newInterview, setNewInterview] = useState({
//     candidateId: '',
//     interviewers: [],
//     date: '',
//     time: '',
//     type: 'On-site',
//     status: 'Scheduled',
//     feedback: '',
//   });
//   const [candidates, setCandidates] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     // Load candidates
//     const storedCandidates = localStorage.getItem('candidates');
//     if (storedCandidates) {
//       setCandidates(JSON.parse(storedCandidates));
//     } else {
//       const mockCandidates = [
//         { id: 1, firstName: 'John', lastName: 'Doe', position: 'Senior Developer' },
//         { id: 2, firstName: 'Sarah', lastName: 'Johnson', position: 'Marketing Manager' },
//         { id: 3, firstName: 'Michael', lastName: 'Chen', position: 'Data Analyst' },
//       ];
//       setCandidates(mockCandidates);
//       localStorage.setItem('candidates', JSON.stringify(mockCandidates));
//     }

//     // Load employees
//     const storedEmployees = localStorage.getItem('employees');
//     if (storedEmployees) {
//       setEmployees(JSON.parse(storedEmployees));
//     } else {
//       const mockEmployees = [
//         { id: 1, name: 'Jane Smith', role: 'Engineering Manager' },
//         { id: 2, name: 'Mike Johnson', role: 'Senior Developer' },
//         { id: 3, name: 'Alex Brown', role: 'Marketing Director' },
//         { id: 4, name: 'Lisa Wong', role: 'Data Science Lead' },
//         { id: 5, name: 'David Kim', role: 'HR Manager' },
//       ];
//       setEmployees(mockEmployees);
//       localStorage.setItem('employees', JSON.stringify(mockEmployees));
//     }

//     // Load interviews
//     const storedInterviews = localStorage.getItem('interviews');
//     if (storedInterviews) {
//       setInterviews(JSON.parse(storedInterviews));
//     } else {
//       const mockInterviews = [
//         {
//           id: 1,
//           candidateId: 1,
//           candidateName: 'John Doe',
//           position: 'Senior Developer',
//           interviewers: [1, 2],
//           interviewerNames: 'Jane Smith, Mike Johnson',
//           date: '2023-05-15',
//           time: '10:00',
//           type: 'On-site',
//           status: 'Scheduled',
//           feedback: '',
//         },
//         {
//           id: 2,
//           candidateId: 2,
//           candidateName: 'Sarah Johnson',
//           position: 'Marketing Manager',
//           interviewers: [3],
//           interviewerNames: 'Alex Brown',
//           date: '2023-05-16',
//           time: '14:30',
//           type: 'Video',
//           status: 'Scheduled',
//           feedback: '',
//         },
//         {
//           id: 3,
//           candidateId: 3,
//           candidateName: 'Michael Chen',
//           position: 'Data Analyst',
//           interviewers: [4, 5],
//           interviewerNames: 'Lisa Wong, David Kim',
//           date: '2023-05-17',
//           time: '11:00',
//           type: 'On-site',
//           status: 'Completed',
//           feedback: 'Strong technical skills, needs more experience with our specific tools',
//         },
//       ];
//       setInterviews(mockInterviews);
//       localStorage.setItem('interviews', JSON.stringify(mockInterviews));
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewInterview(prev => ({ ...prev, [name]: value }));
//   };

//   const handleInterviewerChange = (e) => {
//     const options = e.target.options;
//     const selectedInterviewers = [];
//     for (let i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//         selectedInterviewers.push(parseInt(options[i].value));
//       }
//     }
//     setNewInterview(prev => ({ ...prev, interviewers: selectedInterviewers }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const candidate = candidates.find(c => c.id === parseInt(newInterview.candidateId));
//     const selectedInterviewers = employees.filter(e => newInterview.interviewers.includes(e.id));
//     const interviewerNames = selectedInterviewers.map(i => i.name).join(', ');
//     const newId = interviews.length > 0 ? Math.max(...interviews.map(i => i.id)) + 1 : 1;
//     const submittedInterview = {
//       id: newId,
//       candidateId: parseInt(newInterview.candidateId),
//       candidateName: `${candidate.firstName} ${candidate.lastName}`,
//       position: candidate.position,
//       interviewers: newInterview.interviewers,
//       interviewerNames,
//       date: newInterview.date,
//       time: newInterview.time,
//       type: newInterview.type,
//       status: newInterview.status,
//       feedback: newInterview.feedback,
//     };
//     const updatedInterviews = [...interviews, submittedInterview];
//     setInterviews(updatedInterviews);
//     localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
//     setIsModalOpen(false);
//     setNewInterview({ candidateId: '', interviewers: [], date: '', time: '', type: 'On-site', status: 'Scheduled', feedback: '' });
//   };

//   const updateInterviewStatus = (id, status) => {
//     const updatedInterviews = interviews.map(interview => (interview.id === id ? { ...interview, status } : interview));
//     setInterviews(updatedInterviews);
//     localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
//   };

//   const addFeedback = (id, feedback) => {
//     const updatedInterviews = interviews.map(interview => (interview.id === id ? { ...interview, feedback } : interview));
//     setInterviews(updatedInterviews);
//     localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold">Interviews</h3>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           Schedule Interview
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewers</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {interviews.map(interview => (
//               <tr key={interview.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{interview.candidateName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.position}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.date} at {interview.time}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.type}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.interviewerNames}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <select
//                     value={interview.status}
//                     onChange={(e) => updateInterviewStatus(interview.id, e.target.value)}
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
//                       interview.status === 'Completed' ? 'bg-green-100 text-green-800' :
//                       interview.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}
//                   >
//                     <option value="Scheduled">Scheduled</option>
//                     <option value="Completed">Completed</option>
//                     <option value="Cancelled">Cancelled</option>
//                     <option value="No Show">No Show</option>
//                   </select>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">Details</button>
//                   {interview.status === 'Completed' && !interview.feedback && (
//                     <button
//                       onClick={() => {
//                         const feedback = prompt('Enter feedback:');
//                         if (feedback) addFeedback(interview.id, feedback);
//                       }}
//                       className="text-yellow-600 hover:text-yellow-900"
//                     >
//                       Add Feedback
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
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Schedule New Interview</h3>
//                 <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Candidate*</label>
//                     <select
//                       name="candidateId"
//                       value={newInterview.candidateId}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="">Select Candidate</option>
//                       {candidates.map(candidate => (
//                         <option key={candidate.id} value={candidate.id}>
//                           {candidate.firstName} {candidate.lastName} - {candidate.position}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
//                     <input
//                       type="date"
//                       name="date"
//                       value={newInterview.date}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Time*</label>
//                     <input
//                       type="time"
//                       name="time"
//                       value={newInterview.time}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
//                     <select
//                       name="type"
//                       value={newInterview.type}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="On-site">On-site</option>
//                       <option value="Video">Video</option>
//                       <option value="Phone">Phone</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
//                     <select
//                       name="status"
//                       value={newInterview.status}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="Scheduled">Scheduled</option>
//                       <option value="Completed">Completed</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Interviewers*</label>
//                     <select
//                       multiple
//                       size="5"
//                       name="interviewers"
//                       value={newInterview.interviewers}
//                       onChange={handleInterviewerChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       {employees.map(employee => (
//                         <option key={employee.id} value={employee.id}>
//                           {employee.name} - {employee.role}
//                         </option>
//                       ))}
//                     </select>
//                     <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
//                     <textarea
//                       name="feedback"
//                       value={newInterview.feedback}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter feedback if interview is completed"
//                     />
//                   </div>
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
//                    TODOSchedule Interview
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

// export default Interviews;


// import React, { useState, useEffect } from 'react';

// const Interviews = () => {
//   const [interviews, setInterviews] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newInterview, setNewInterview] = useState({
//     candidateId: '',
//     interviewers: [],
//     date: '',
//     startTime: '',
//     endTime: '',
//     type: 'On-site',
//     status: 'Scheduled',
//     feedback: '',
//   });
//   const [candidates, setCandidates] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     try {
//       const storedCandidates = localStorage.getItem('candidates');
//       if (storedCandidates) {
//         setCandidates(JSON.parse(storedCandidates));
//       }

//       const storedEmployees = localStorage.getItem('employees');
//       if (storedEmployees) {
//         setEmployees(JSON.parse(storedEmployees));
//       } else {
//         const mockEmployees = [
//           { id: 1, name: 'Jane Smith', role: 'Engineering Manager' },
//           { id: 2, name: 'Mike Johnson', role: 'Senior Developer' },
//           { id: 3, name: 'Alex Brown', role: 'Marketing Director' },
//           { id: 4, name: 'Lisa Wong', role: 'Data Science Lead' },
//           { id: 5, name: 'David Kim', role: 'HR Manager' },
//         ];
//         setEmployees(mockEmployees);
//         localStorage.setItem('employees', JSON.stringify(mockEmployees));
//       }

//       const storedInterviews = localStorage.getItem('interviews');
//       if (storedInterviews) {
//         setInterviews(JSON.parse(storedInterviews));
//       } else {
//         const mockInterviews = [
//           {
//             id: 1,
//             candidateId: 1,
//             candidateName: 'John Doe',
//             position: 'Senior Developer',
//             interviewers: [1, 2],
//             interviewerNames: 'Jane Smith, Mike Johnson',
//             date: '2023-05-15',
//             startTime: '10:00',
//             endTime: '11:00',
//             type: 'On-site',
//             status: 'Scheduled',
//             feedback: '',
//           },
//           {
//             id: 2,
//             candidateId: 2,
//             candidateName: 'Sarah Johnson',
//             position: 'Marketing Manager',
//             interviewers: [3],
//             interviewerNames: 'Alex Brown',
//             date: '2023-05-16',
//             startTime: '14:30',
//             endTime: '15:30',
//             type: 'Video',
//             status: 'Scheduled',
//             feedback: '',
//           },
//           {
//             id: 3,
//             candidateId: 3,
//             candidateName: 'Michael Chen',
//             position: 'Data Analyst',
//             interviewers: [4, 5],
//             interviewerNames: 'Lisa Wong, David Kim',
//             date: '2023-05-17',
//             startTime: '11:00',
//             endTime: '12:00',
//             type: 'On-site',
//             status: 'Completed',
//             feedback: 'Strong technical skills',
//           },
//         ];
//         setInterviews(mockInterviews);
//         localStorage.setItem('interviews', JSON.stringify(mockInterviews));
//       }
//     } catch (error) {
//       console.error('Error loading interviews from localStorage:', error);
//       setInterviews([]);
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewInterview(prev => ({ ...prev, [name]: value }));
//   };

//   const handleInterviewerChange = (e) => {
//     const options = e.target.options;
//     const selectedInterviewers = [];
//     for (let i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//         selectedInterviewers.push(parseInt(options[i].value));
//       }
//     }
//     setNewInterview(prev => ({ ...prev, interviewers: selectedInterviewers }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const candidate = candidates.find(c => c.id === parseInt(newInterview.candidateId));
//     const selectedInterviewers = employees.filter(e => newInterview.interviewers.includes(e.id));
//     const interviewerNames = selectedInterviewers.map(i => i.name).join(', ');
//     const newId = interviews.length > 0 ? Math.max(...interviews.map(i => i.id)) + 1 : 1;
//     const submittedInterview = {
//       id: newId,
//       candidateId: parseInt(newInterview.candidateId),
//       candidateName: `${candidate.firstName} ${candidate.lastName}`,
//       position: candidate.position,
//       interviewers: newInterview.interviewers,
//       interviewerNames,
//       date: newInterview.date,
//       startTime: newInterview.startTime,
//       endTime: newInterview.endTime,
//       type: newInterview.type,
//       status: newInterview.status,
//       feedback: newInterview.feedback,
//     };
//     const updatedInterviews = [...interviews, submittedInterview];
//     setInterviews(updatedInterviews);
//     localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
//     setIsModalOpen(false);
//     setNewInterview({ candidateId: '', interviewers: [], date: '', startTime: '', endTime: '', type: 'On-site', status: 'Scheduled', feedback: '' });
//   };

//   const updateInterviewStatus = (id, status) => {
//     const updatedInterviews = interviews.map(interview => (interview.id === id ? { ...interview, status } : interview));
//     setInterviews(updatedInterviews);
//     localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
//   };

//   const addFeedback = (id, feedback) => {
//     const updatedInterviews = interviews.map(interview => (interview.id === id ? { ...interview, feedback } : interview));
//     setInterviews(updatedInterviews);
//     localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold">Interviews</h3>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           Schedule Interview
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewers</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {interviews.map(interview => (
//               <tr key={interview.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{interview.candidateName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.position}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.date} from {interview.startTime} to {interview.endTime}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.type}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.interviewerNames}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <select
//                     value={interview.status}
//                     onChange={(e) => updateInterviewStatus(interview.id, e.target.value)}
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
//                       interview.status === 'Completed' ? 'bg-green-100 text-green-800' :
//                       interview.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}
//                   >
//                     <option value="Scheduled">Scheduled</option>
//                     <option value="Completed">Completed</option>
//                     <option value="Cancelled">Cancelled</option>
//                     <option value="No Show">No Show</option>
//                   </select>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">Details</button>
//                   {interview.status === 'Completed' && !interview.feedback && (
//                     <button
//                       onClick={() => {
//                         const feedback = prompt('Enter feedback:');
//                         if (feedback) addFeedback(interview.id, feedback);
//                       }}
//                       className="text-yellow-600 hover:text-yellow-900"
//                     >
//                       Add Feedback
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
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Schedule New Interview</h3>
//                 <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Candidate*</label>
//                     <select
//                       name="candidateId"
//                       value={newInterview.candidateId}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="">Select Candidate</option>
//                       {candidates.map(candidate => (
//                         <option key={candidate.id} value={candidate.id}>
//                           {candidate.firstName} {candidate.lastName} - {candidate.position}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
//                     <input
//                       type="date"
//                       name="date"
//                       value={newInterview.date}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Start Time*</label>
//                     <input
//                       type="time"
//                       name="startTime"
//                       value={newInterview.startTime}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">End Time*</label>
//                     <input
//                       type="time"
//                       name="endTime"
//                       value={newInterview.endTime}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
//                     <select
//                       name="type"
//                       value={newInterview.type}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="On-site">On-site</option>
//                       <option value="Video">Video</option>
//                       <option value="Phone">Phone</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
//                     <select
//                       name="status"
//                       value={newInterview.status}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="Scheduled">Scheduled</option>
//                       <option value="Completed">Completed</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Interviewers*</label>
//                     <select
//                       multiple
//                       size="5"
//                       name="interviewers"
//                       value={newInterview.interviewers}
//                       onChange={handleInterviewerChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       {employees.map(employee => (
//                         <option key={employee.id} value={employee.id}>
//                           {employee.name} - {employee.role}
//                         </option>
//                       ))}
//                     </select>
//                     <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
//                     <textarea
//                       name="feedback"
//                       value={newInterview.feedback}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter feedback if interview is completed"
//                     />
//                   </div>
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
//                     Schedule Interview
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

// export default Interviews;

import React, { useState, useEffect } from 'react';

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [newInterview, setNewInterview] = useState({
    candidateId: '',
    interviewers: [],
    date: '',
    startTime: '',
    endTime: '',
    type: 'On-site',
    status: 'Scheduled',
    feedback: '',
  });
  const [candidates, setCandidates] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    try {
      const storedCandidates = localStorage.getItem('candidates');
      if (storedCandidates) setCandidates(JSON.parse(storedCandidates));

      const storedEmployees = localStorage.getItem('employees');
      if (storedEmployees) {
        setEmployees(JSON.parse(storedEmployees));
      } else {
        const mockEmployees = [
          { id: 1, name: 'Jane Smith', role: 'Engineering Manager' },
          { id: 2, name: 'Mike Johnson', role: 'Senior Developer' },
          { id: 3, name: 'Alex Brown', role: 'Marketing Director' },
          { id: 4, name: 'Lisa Wong', role: 'Data Science Lead' },
          { id: 5, name: 'David Kim', role: 'HR Manager' },
        ];
        setEmployees(mockEmployees);
        localStorage.setItem('employees', JSON.stringify(mockEmployees));
      }

      const storedInterviews = localStorage.getItem('interviews');
      if (storedInterviews) {
        setInterviews(JSON.parse(storedInterviews));
      } else {
        const mockInterviews = [
          {
            id: 1,
            candidateId: 1,
            candidateName: 'John Doe',
            position: 'Senior Developer',
            interviewers: [1, 2],
            interviewerNames: 'Jane Smith, Mike Johnson',
            date: '2023-05-15',
            startTime: '10:00',
            endTime: '11:00',
            type: 'On-site',
            status: 'Scheduled',
            feedback: '',
          },
          {
            id: 2,
            candidateId: 2,
            candidateName: 'Sarah Johnson',
            position: 'Marketing Manager',
            interviewers: [3],
            interviewerNames: 'Alex Brown',
            date: '2023-05-16',
            startTime: '14:30',
            endTime: '15:30',
            type: 'Video',
            status: 'Scheduled',
            feedback: '',
          },
          {
            id: 3,
            candidateId: 3,
            candidateName: 'Michael Chen',
            position: 'Data Analyst',
            interviewers: [4, 5],
            interviewerNames: 'Lisa Wong, David Kim',
            date: '2023-05-17',
            startTime: '11:00',
            endTime: '12:00',
            type: 'On-site',
            status: 'Completed',
            feedback: 'Strong technical skills',
          },
        ];
        setInterviews(mockInterviews);
        localStorage.setItem('interviews', JSON.stringify(mockInterviews));
      }
    } catch (error) {
      console.error('Error loading interviews from localStorage:', error);
      setInterviews([]);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInterview((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterviewerChange = (e) => {
    const options = e.target.options;
    const selectedInterviewers = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedInterviewers.push(parseInt(options[i].value));
      }
    }
    setNewInterview((prev) => ({ ...prev, interviewers: selectedInterviewers }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const candidate = candidates.find((c) => c.id === parseInt(newInterview.candidateId));
    const selectedInterviewers = employees.filter((e) => newInterview.interviewers.includes(e.id));
    const interviewerNames = selectedInterviewers.map((i) => i.name).join(', ');
    let updatedInterviews;

    if (modalMode === 'add') {
      const newId = interviews.length > 0 ? Math.max(...interviews.map((i) => i.id)) + 1 : 1;
      const submittedInterview = {
        id: newId,
        candidateId: parseInt(newInterview.candidateId),
        candidateName: `${candidate.firstName} ${candidate.lastName}`,
        position: candidate.position,
        interviewers: newInterview.interviewers,
        interviewerNames,
        date: newInterview.date,
        startTime: newInterview.startTime,
        endTime: newInterview.endTime,
        type: newInterview.type,
        status: newInterview.status,
        feedback: newInterview.feedback,
      };
      updatedInterviews = [...interviews, submittedInterview];
    } else {
      const updatedInterview = {
        ...selectedInterview,
        candidateId: parseInt(newInterview.candidateId),
        candidateName: `${candidate.firstName} ${candidate.lastName}`,
        position: candidate.position,
        interviewers: newInterview.interviewers,
        interviewerNames,
        date: newInterview.date,
        startTime: newInterview.startTime,
        endTime: newInterview.endTime,
        type: newInterview.type,
        status: newInterview.status,
        feedback: newInterview.feedback,
      };
      updatedInterviews = interviews.map((interview) =>
        interview.id === updatedInterview.id ? updatedInterview : interview
      );
    }

    setInterviews(updatedInterviews);
    localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
    setIsModalOpen(false);
    resetForm();
  };

  const editInterview = (interview) => {
    setModalMode('edit');
    setSelectedInterview(interview);
    setNewInterview({
      candidateId: interview.candidateId.toString(),
      interviewers: interview.interviewers,
      date: interview.date,
      startTime: interview.startTime,
      endTime: interview.endTime,
      type: interview.type,
      status: interview.status,
      feedback: interview.feedback,
    });
    setIsModalOpen(true);
  };

  const viewInterview = (interview) => {
    setSelectedInterview(interview);
    setIsViewModalOpen(true);
  };

  const updateInterviewStatus = (id, status) => {
    const updatedInterviews = interviews.map((interview) =>
      interview.id === id ? { ...interview, status } : interview
    );
    setInterviews(updatedInterviews);
    localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
  };

  const addFeedback = (id, feedback) => {
    const updatedInterviews = interviews.map((interview) =>
      interview.id === id ? { ...interview, feedback } : interview
    );
    setInterviews(updatedInterviews);
    localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
  };

  const resetForm = () => {
    setNewInterview({
      candidateId: '',
      interviewers: [],
      date: '',
      startTime: '',
      endTime: '',
      type: 'On-site',
      status: 'Scheduled',
      feedback: '',
    });
    setSelectedInterview(null);
    setModalMode('add');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Interviews</h3>
        <button
          onClick={() => {
            setModalMode('add');
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Schedule Interview
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {interviews.map((interview) => (
              <tr key={interview.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{interview.candidateName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {interview.date} from {interview.startTime} to {interview.endTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.interviewerNames}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={interview.status}
                    onChange={(e) => updateInterviewStatus(interview.id, e.target.value)}
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      interview.status === 'Scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : interview.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : interview.status === 'Cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="No Show">No Show</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => viewInterview(interview)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button
                    onClick={() => editInterview(interview)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  {interview.status === 'Completed' && !interview.feedback && (
                    <button
                      onClick={() => {
                        const feedback = prompt('Enter feedback:');
                        if (feedback) addFeedback(interview.id, feedback);
                      }}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      Add Feedback
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
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {modalMode === 'add' ? 'Schedule New Interview' : 'Edit Interview'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Candidate*</label>
                    <select
                      name="candidateId"
                      value={newInterview.candidateId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Candidate</option>
                      {candidates.map((candidate) => (
                        <option key={candidate.id} value={candidate.id}>
                          {candidate.firstName} {candidate.lastName} - {candidate.position}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                    <input
                      type="date"
                      name="date"
                      value={newInterview.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time*</label>
                    <input
                      type="time"
                      name="startTime"
                      value={newInterview.startTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time*</label>
                    <input
                      type="time"
                      name="endTime"
                      value={newInterview.endTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
                    <select
                      name="type"
                      value={newInterview.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="On-site">On-site</option>
                      <option value="Video">Video</option>
                      <option value="Phone">Phone</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                    <select
                      name="status"
                      value={newInterview.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interviewers*</label>
                    <select
                      multiple
                      size="5"
                      name="interviewers"
                      value={newInterview.interviewers}
                      onChange={handleInterviewerChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name} - {employee.role}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                    <textarea
                      name="feedback"
                      value={newInterview.feedback}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter feedback if interview is completed"
                    />
                  </div>
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
                    {modalMode === 'add' ? 'Schedule Interview' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Interview Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-700">Candidate</p>
                <p className="text-gray-900">{selectedInterview.candidateName}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Position</p>
                <p className="text-gray-900">{selectedInterview.position}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Date</p>
                <p className="text-gray-900">{selectedInterview.date}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Time</p>
                <p className="text-gray-900">
                  {selectedInterview.startTime} - {selectedInterview.endTime}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Type</p>
                <p className="text-gray-900">{selectedInterview.type}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Status</p>
                <p className="text-gray-900">{selectedInterview.status}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-medium text-gray-700">Interviewers</p>
                <p className="text-gray-900">{selectedInterview.interviewerNames}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-medium text-gray-700">Feedback</p>
                <p className="text-gray-900">{selectedInterview.feedback || 'No feedback yet'}</p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interviews;