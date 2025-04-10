
// import React from "react";
// import { useState,useEffect } from "react";
// const Offers = () => {
//   const [offers, setOffers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newOffer, setNewOffer] = useState({
//     candidateId: '',
//     position: '',
//     salary: '',
//     bonus: '',
//     benefits: '',
//     startDate: '',
//     status: 'Pending'
//   });
//   const [candidates, setCandidates] = useState([]);

//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       // Mock offers
//       const mockOffers = [
//         {
//           id: 1,
//           candidateId: 2,
//           candidateName: 'Sarah Johnson',
//           position: 'Marketing Manager',
//           salary: '$85,000',
//           bonus: '$5,000',
//           benefits: 'Health insurance, 401k matching',
//           startDate: '2023-06-15',
//           status: 'Accepted',
//           sentDate: '2023-05-10'
//         },
//         {
//           id: 2,
//           candidateId: 1,
//           candidateName: 'John Doe',
//           position: 'Senior Developer',
//           salary: '$110,000',
//           bonus: '$10,000',
//           benefits: 'Health insurance, stock options',
//           startDate: '2023-06-01',
//           status: 'Pending',
//           sentDate: '2023-05-12'
//         }
//       ];
      
//       // Mock candidates
//       const mockCandidates = [
//         { id: 1, name: 'John Doe', position: 'Senior Developer' },
//         { id: 2, name: 'Sarah Johnson', position: 'Marketing Manager' },
//         { id: 3, name: 'Michael Chen', position: 'Data Analyst' }
//       ];
      
//       setOffers(mockOffers);
//       setCandidates(mockCandidates);
//     };
//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewOffer(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Find candidate name
//     const candidate = candidates.find(c => c.id === parseInt(newOffer.candidateId));
    
//     // Create new offer
//     const submittedOffer = {
//       id: offers.length + 1,
//       candidateId: newOffer.candidateId,
//       candidateName: candidate.name,
//       position: newOffer.position,
//       salary: newOffer.salary,
//       bonus: newOffer.bonus,
//       benefits: newOffer.benefits,
//       startDate: newOffer.startDate,
//       status: newOffer.status,
//       sentDate: new Date().toISOString().split('T')[0]
//     };
    
//     setOffers([...offers, submittedOffer]);
//     setIsModalOpen(false);
//     setNewOffer({
//       candidateId: '',
//       position: '',
//       salary: '',
//       bonus: '',
//       benefits: '',
//       startDate: '',
//       status: 'Pending'
//     });
//   };

//   const updateOfferStatus = (id, status) => {
//     setOffers(offers.map(offer => 
//       offer.id === id ? { ...offer, status } : offer
//     ));
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold">Job Offers</h3>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           Create Offer
//         </button>
//       </div>

//       {/* Offers Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {offers.map(offer => (
//               <tr key={offer.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">{offer.candidateName}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.position}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.salary}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.bonus}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.startDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <select
//                     value={offer.status}
//                     onChange={(e) => updateOfferStatus(offer.id, e.target.value)}
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       offer.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                       offer.status === 'Accepted' ? 'bg-green-100 text-green-800' :
//                       offer.status === 'Rejected' ? 'bg-red-100 text-red-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Accepted">Accepted</option>
//                     <option value="Rejected">Rejected</option>
//                     <option value="Withdrawn">Withdrawn</option>
//                   </select>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900">View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Create Offer Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Create Job Offer</h3>
//                 <button 
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
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
//                       value={newOffer.candidateId}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="">Select Candidate</option>
//                       {candidates.map(candidate => (
//                         <option key={candidate.id} value={candidate.id}>
//                           {candidate.name} - {candidate.position}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
//                     <input
//                       type="text"
//                       name="position"
//                       value={newOffer.position}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Salary*</label>
//                     <input
//                       type="text"
//                       name="salary"
//                       value={newOffer.salary}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="$"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
//                     <input
//                       type="text"
//                       name="bonus"
//                       value={newOffer.bonus}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="$"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
//                     <input
//                       type="date"
//                       name="startDate"
//                       value={newOffer.startDate}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
//                     <select
//                       name="status"
//                       value={newOffer.status}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Accepted">Accepted</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
//                     <textarea
//                       name="benefits"
//                       value={newOffer.benefits}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Health insurance, retirement plans, etc."
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
//                     Create Offer
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

// export default Offers;

// import React, { useState, useEffect } from 'react';

// const Offers = () => {
//   const [offers, setOffers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newOffer, setNewOffer] = useState({
//     candidateId: '',
//     position: '',
//     salary: '',
//     bonus: '',
//     benefits: '',
//     startDate: '',
//     status: 'Pending',
//   });
//   const [candidates, setCandidates] = useState([]);

//   useEffect(() => {
//     // Load candidates
//     const storedCandidates = localStorage.getItem('candidates');
//     if (storedCandidates) {
//       setCandidates(JSON.parse(storedCandidates));
//     }

//     // Load offers
//     const storedOffers = localStorage.getItem('offers');
//     if (storedOffers) {
//       setOffers(JSON.parse(storedOffers));
//     } else {
//       const mockOffers = [
//         {
//           id: 1,
//           candidateId: 2,
//           candidateName: 'Sarah Johnson',
//           position: 'Marketing Manager',
//           salary: '$85,000',
//           bonus: '$5,000',
//           benefits: 'Health insurance, 401k matching',
//           startDate: '2023-06-15',
//           status: 'Accepted',
//           sentDate: '2023-05-10',
//         },
//         {
//           id: 2,
//           candidateId: 1,
//           candidateName: 'John Doe',
//           position: 'Senior Developer',
//           salary: '$110,000',
//           bonus: '$10,000',
//           benefits: 'Health insurance, stock options',
//           startDate: '2023-06-01',
//           status: 'Pending',
//           sentDate: '2023-05-12',
//         },
//       ];
//       setOffers(mockOffers);
//       localStorage.setItem('offers', JSON.stringify(mockOffers));
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewOffer(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const candidate = candidates.find(c => c.id === parseInt(newOffer.candidateId));
//     const newId = offers.length > 0 ? Math.max(...offers.map(o => o.id)) + 1 : 1;
//     const submittedOffer = {
//       id: newId,
//       candidateId: parseInt(newOffer.candidateId),
//       candidateName: `${candidate.firstName} ${candidate.lastName}`,
//       position: newOffer.position,
//       salary: newOffer.salary,
//       bonus: newOffer.bonus,
//       benefits: newOffer.benefits,
//       startDate: newOffer.startDate,
//       status: newOffer.status,
//       sentDate: new Date().toISOString().split('T')[0],
//     };
//     const updatedOffers = [...offers, submittedOffer];
//     setOffers(updatedOffers);
//     localStorage.setItem('offers', JSON.stringify(updatedOffers));
//     setIsModalOpen(false);
//     setNewOffer({ candidateId: '', position: '', salary: '', bonus: '', benefits: '', startDate: '', status: 'Pending' });
//   };

//   const updateOfferStatus = (id, status) => {
//     const updatedOffers = offers.map(offer => (offer.id === id ? { ...offer, status } : offer));
//     setOffers(updatedOffers);
//     localStorage.setItem('offers', JSON.stringify(updatedOffers));
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold">Job Offers</h3>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           Create Offer
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {offers.map(offer => (
//               <tr key={offer.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{offer.candidateName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.position}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.salary}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.bonus}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.startDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <select
//                     value={offer.status}
//                     onChange={(e) => updateOfferStatus(offer.id, e.target.value)}
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       offer.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                       offer.status === 'Accepted' ? 'bg-green-100 text-green-800' :
//                       offer.status === 'Rejected' ? 'bg-red-100 text-red-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Accepted">Accepted</option>
//                     <option value="Rejected">Rejected</option>
//                     <option value="Withdrawn">Withdrawn</option>
//                   </select>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900">View</button>
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
//                 <h3 className="text-lg font-semibold">Create Job Offer</h3>
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
//                       value={newOffer.candidateId}
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
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
//                     <input
//                       type="text"
//                       name="position"
//                       value={newOffer.position}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Salary*</label>
//                     <input
//                       type="text"
//                       name="salary"
//                       value={newOffer.salary}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="$"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
//                     <input
//                       type="text"
//                       name="bonus"
//                       value={newOffer.bonus}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="$"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
//                     <input
//                       type="date"
//                       name="startDate"
//                       value={newOffer.startDate}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
//                     <select
//                       name="status"
//                       value={newOffer.status}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Accepted">Accepted</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
//                     <textarea
//                       name="benefits"
//                       value={newOffer.benefits}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Health insurance, retirement plans, etc."
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
//                     Create Offer
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

// export default Offers;

// import React, { useState, useEffect } from 'react';

// const Offers = () => {
//   const [offers, setOffers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newOffer, setNewOffer] = useState({
//     candidateId: '',
//     position: '',
//     salary: '',
//     bonus: '',
//     benefits: '',
//     startDate: '',
//     status: 'Pending',
//   });
//   const [candidates, setCandidates] = useState([]);

//   useEffect(() => {
//     try {
//       const storedCandidates = localStorage.getItem('candidates');
//       if (storedCandidates) {
//         setCandidates(JSON.parse(storedCandidates));
//       }

//       const storedOffers = localStorage.getItem('offers');
//       if (storedOffers) {
//         setOffers(JSON.parse(storedOffers));
//       } else {
//         const mockOffers = [
//           {
//             id: 1,
//             candidateId: 2,
//             candidateName: 'Sarah Johnson',
//             position: 'Marketing Manager',
//             salary: '$85,000',
//             bonus: '$5,000',
//             benefits: 'Health insurance, 401k matching',
//             startDate: '2023-06-15',
//             status: 'Accepted',
//             sentDate: '2023-05-10',
//           },
//           {
//             id: 2,
//             candidateId: 1,
//             candidateName: 'John Doe',
//             position: 'Senior Developer',
//             salary: '$110,000',
//             bonus: '$10,000',
//             benefits: 'Health insurance, stock options',
//             startDate: '2023-06-01',
//             status: 'Pending',
//             sentDate: '2023-05-12',
//           },
//         ];
//         setOffers(mockOffers);
//         localStorage.setItem('offers', JSON.stringify(mockOffers));
//       }
//     } catch (error) {
//       console.error('Error loading offers from localStorage:', error);
//       setOffers([]);
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewOffer(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const candidate = candidates.find(c => c.id === parseInt(newOffer.candidateId));
//     const newId = offers.length > 0 ? Math.max(...offers.map(o => o.id)) + 1 : 1;
//     const submittedOffer = {
//       id: newId,
//       candidateId: parseInt(newOffer.candidateId),
//       candidateName: `${candidate.firstName} ${candidate.lastName}`,
//       position: newOffer.position,
//       salary: newOffer.salary,
//       bonus: newOffer.bonus,
//       benefits: newOffer.benefits,
//       startDate: newOffer.startDate,
//       status: newOffer.status,
//       sentDate: new Date().toISOString().split('T')[0],
//     };
//     const updatedOffers = [...offers, submittedOffer];
//     setOffers(updatedOffers);
//     localStorage.setItem('offers', JSON.stringify(updatedOffers));
//     setIsModalOpen(false);
//     setNewOffer({ candidateId: '', position: '', salary: '', bonus: '', benefits: '', startDate: '', status: 'Pending' });
//   };

//   const updateOfferStatus = (id, status) => {
//     const updatedOffers = offers.map(offer => (offer.id === id ? { ...offer, status } : offer));
//     setOffers(updatedOffers);
//     localStorage.setItem('offers', JSON.stringify(updatedOffers));
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold">Job Offers</h3>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           Create Offer
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {offers.map(offer => (
//               <tr key={offer.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{offer.candidateName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.position}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.salary}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.bonus}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.startDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <select
//                     value={offer.status}
//                     onChange={(e) => updateOfferStatus(offer.id, e.target.value)}
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       offer.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                       offer.status === 'Accepted' ? 'bg-green-100 text-green-800' :
//                       offer.status === 'Rejected' ? 'bg-red-100 text-red-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Accepted">Accepted</option>
//                     <option value="Rejected">Rejected</option>
//                     <option value="Withdrawn">Withdrawn</option>
//                   </select>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900">View</button>
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
//                 <h3 className="text-lg font-semibold">Create Job Offer</h3>
//                 <button onClick={() => setIsModalOpen(false)} pénclassName="text-gray-500 hover:text-gray-700">
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
//                       value={newOffer.candidateId}
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
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
//                     <input
//                       type="text"
//                       name="position"
//                       value={newOffer.position}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Salary*</label>
//                     <input
//                       type="text"
//                       name="salary"
//                       value={newOffer.salary}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="$"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
//                     <input
//                       type="text"
//                       name="bonus"
//                       value={newOffer.bonus}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="$"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
//                     <input
//                       type="date"
//                       name="startDate"
//                       value={newOffer.startDate}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
//                     <select
//                       name="status"
//                       value={newOffer.status}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Accepted">Accepted</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
//                     <textarea
//                       name="benefits"
//                       value={newOffer.benefits}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Health insurance, retirement plans, etc."
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
//                     Create Offer
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

// export default Offers;

// import React, { useState, useEffect } from 'react';

// const Offers = () => {
//   const [offers, setOffers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newOffer, setNewOffer] = useState({
//     candidateId: '',
//     position: '',
//     salary: '',
//     bonus: '',
//     benefits: '',
//     startDate: '',
//     status: 'Pending',
//   });
//   const [candidates, setCandidates] = useState([]);
//   const [selectedOffer, setSelectedOffer] = useState(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);

//   useEffect(() => {
//     try {
//       const storedCandidates = localStorage.getItem('candidates');
//       if (storedCandidates) {
//         setCandidates(JSON.parse(storedCandidates));
//       }

//       const storedOffers = localStorage.getItem('offers');
//       if (storedOffers) {
//         setOffers(JSON.parse(storedOffers));
//       } else {
//         const mockOffers = [
//           {
//             id: 1,
//             candidateId: 2,
//             candidateName: 'Sarah Johnson',
//             position: 'Marketing Manager',
//             salary: '$85,000',
//             bonus: '$5,000',
//             benefits: 'Health insurance, 401k matching',
//             startDate: '2023-06-15',
//             status: 'Accepted',
//             sentDate: '2023-05-10',
//           },
//           {
//             id: 2,
//             candidateId: 1,
//             candidateName: 'John Doe',
//             position: 'Senior Developer',
//             salary: '$110,000',
//             bonus: '$10,000',
//             benefits: 'Health insurance, stock options',
//             startDate: '2023-06-01',
//             status: 'Pending',
//             sentDate: '2023-05-12',
//           },
//         ];
//         setOffers(mockOffers);
//         localStorage.setItem('offers', JSON.stringify(mockOffers));
//       }
//     } catch (error) {
//       console.error('Error loading offers from localStorage:', error);
//       setOffers([]);
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewOffer((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const candidate = candidates.find((c) => c.id === parseInt(newOffer.candidateId));
//     const newId = offers.length > 0 ? Math.max(...offers.map((o) => o.id)) + 1 : 1;
//     const submittedOffer = {
//       id: newId,
//       candidateId: parseInt(newOffer.candidateId),
//       candidateName: `${candidate.firstName} ${candidate.lastName}`,
//       position: newOffer.position,
//       salary: newOffer.salary,
//       bonus: newOffer.bonus,
//       benefits: newOffer.benefits,
//       startDate: newOffer.startDate,
//       status: newOffer.status,
//       sentDate: new Date().toISOString().split('T')[0],
//     };
//     const updatedOffers = [...offers, submittedOffer];
//     setOffers(updatedOffers);
//     localStorage.setItem('offers', JSON.stringify(updatedOffers));
//     setIsModalOpen(false);
//     setNewOffer({
//       candidateId: '',
//       position: '',
//       salary: '',
//       bonus: '',
//       benefits: '',
//       startDate: '',
//       status: 'Pending',
//     });
//   };

//   const updateOfferStatus = (id, status) => {
//     const updatedOffers = offers.map((offer) =>
//       offer.id === id ? { ...offer, status } : offer
//     );
//     setOffers(updatedOffers);
//     localStorage.setItem('offers', JSON.stringify(updatedOffers));
//   };

//   const openViewModal = (offer) => {
//     setSelectedOffer(offer);
//     setIsViewModalOpen(true);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold">Job Offers</h3>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           Create Offer
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {offers.map((offer) => (
//               <tr key={offer.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{offer.candidateName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.position}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.salary}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.bonus}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.startDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <select
//                     value={offer.status}
//                     onChange={(e) => updateOfferStatus(offer.id, e.target.value)}
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       offer.status === 'Pending'
//                         ? 'bg-yellow-100 text-yellow-800'
//                         : offer.status === 'Accepted'
//                         ? 'bg-green-100 text-green-800'
//                         : offer.status === 'Rejected'
//                         ? 'bg-red-100 text-red-800'
//                         : 'bg-gray-100 text-gray-800'
//                     }`}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Accepted">Accepted</option>
//                     <option value="Rejected">Rejected</option>
//                     <option value="Withdrawn">Withdrawn</option>
//                   </select>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button
//                     onClick={() => openViewModal(offer)}
//                     className="text-blue-600 hover:text-blue-900"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Create Offer Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Create Job Offer</h3>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
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
//                       value={newOffer.candidateId}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="">Select Candidate</option>
//                       {candidates.map((candidate) => (
//                         <option key={candidate.id} value={candidate.id}>
//                           {candidate.firstName} {candidate.lastName} - {candidate.position}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
//                     <input
//                       type="text"
//                       name="position"
//                       value={newOffer.position}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Salary*</label>
//                     <input
//                       type="text"
//                       name="salary"
//                       value={newOffer.salary}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="$"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
//                     <input
//                       type="text"
//                       name="bonus"
//                       value={newOffer.bonus}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="$"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
//                     <input
//                       type="date"
//                       name="startDate"
//                       value={newOffer.startDate}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
//                     <select
//                       name="status"
//                       value={newOffer.status}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Accepted">Accepted</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
//                     <textarea
//                       name="benefits"
//                       value={newOffer.benefits}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Health insurance, retirement plans, etc."
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
//                     Create Offer
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Offer Modal */}
//       {isViewModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Offer Details</h3>
//                 <button
//                   onClick={() => setIsViewModalOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               {selectedOffer && (
//                 <div className="space-y-4">
//                   <div>
//                     <span className="font-medium">Candidate:</span> {selectedOffer.candidateName}
//                   </div>
//                   <div>
//                     <span className="font-medium">Position:</span> {selectedOffer.position}
//                   </div>
//                   <div>
//                     <span className="font-medium">Salary:</span> {selectedOffer.salary}
//                   </div>
//                   <div>
//                     <span className="font-medium">Bonus:</span> {selectedOffer.bonus}
//                   </div>
//                   <div>
//                     <span className="font-medium">Benefits:</span> {selectedOffer.benefits}
//                   </div>
//                   <div>
//                     <span className="font-medium">Start Date:</span> {selectedOffer.startDate}
//                   </div>
//                   <div>
//                     <span className="font-medium">Status:</span> {selectedOffer.status}
//                   </div>
//                   <div>
//                     <span className="font-medium">Sent Date:</span> {selectedOffer.sentDate}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Offers;

import React, { useState, useEffect } from 'react';

const Offers = () => {
  // State declarations
  const [offers, setOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    candidateId: '',
    position: '',
    salary: '',
    bonus: '',
    benefits: '',
    startDate: '',
    status: 'Pending',
  });
  const [candidates, setCandidates] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [editingOffer, setEditingOffer] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedCandidates = localStorage.getItem('candidates');
      if (storedCandidates) setCandidates(JSON.parse(storedCandidates));

      const storedOffers = localStorage.getItem('offers');
      if (storedOffers) {
        setOffers(JSON.parse(storedOffers));
      } else {
        const mockOffers = [
          {
            id: 1,
            candidateId: 2,
            candidateName: 'Sarah Johnson',
            position: 'Marketing Manager',
            salary: '$85,000',
            bonus: '$5,000',
            benefits: 'Health insurance, 401k matching',
            startDate: '2023-06-15',
            status: 'Accepted',
            sentDate: '2023-05-10',
          },
          {
            id: 2,
            candidateId: 1,
            candidateName: 'John Doe',
            position: 'Senior Developer',
            salary: '$110,000',
            bonus: '$10,000',
            benefits: 'Health insurance, stock options',
            startDate: '2023-06-01',
            status: 'Pending',
            sentDate: '2023-05-12',
          },
        ];
        setOffers(mockOffers);
        localStorage.setItem('offers', JSON.stringify(mockOffers));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setOffers([]);
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for create/edit
  const handleSubmit = (e) => {
    e.preventDefault();
    const candidate = candidates.find((c) => c.id === parseInt(newOffer.candidateId));
    if (!candidate) {
      alert('Invalid candidate selected');
      return;
    }
    const candidateName = `${candidate.firstName} ${candidate.lastName}`;

    if (editingOffer) {
      // Edit existing offer
      const updatedOffer = {
        ...editingOffer,
        candidateId: parseInt(newOffer.candidateId),
        candidateName,
        position: newOffer.position,
        salary: newOffer.salary,
        bonus: newOffer.bonus,
        benefits: newOffer.benefits,
        startDate: newOffer.startDate,
        status: newOffer.status,
      };
      const updatedOffers = offers.map((o) => (o.id === editingOffer.id ? updatedOffer : o));
      setOffers(updatedOffers);
      localStorage.setItem('offers', JSON.stringify(updatedOffers));
    } else {
      // Create new offer
      const newId = offers.length > 0 ? Math.max(...offers.map((o) => o.id)) + 1 : 1;
      const submittedOffer = {
        id: newId,
        candidateId: parseInt(newOffer.candidateId),
        candidateName,
        position: newOffer.position,
        salary: newOffer.salary,
        bonus: newOffer.bonus,
        benefits: newOffer.benefits,
        startDate: newOffer.startDate,
        status: newOffer.status,
        sentDate: new Date().toISOString().split('T')[0],
      };
      const updatedOffers = [...offers, submittedOffer];
      setOffers(updatedOffers);
      localStorage.setItem('offers', JSON.stringify(updatedOffers));
    }

    // Reset modal state
    setIsModalOpen(false);
    setNewOffer({
      candidateId: '',
      position: '',
      salary: '',
      bonus: '',
      benefits: '',
      startDate: '',
      status: 'Pending',
    });
    setEditingOffer(null);
  };

  // Open view modal
  const openViewModal = (offer) => {
    setSelectedOffer(offer);
    setIsViewModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (offer) => {
    setEditingOffer(offer);
    setNewOffer({
      candidateId: offer.candidateId.toString(),
      position: offer.position,
      salary: offer.salary,
      bonus: offer.bonus,
      benefits: offer.benefits,
      startDate: offer.startDate,
      status: offer.status,
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Header and Create Button */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Job Offers</h3>
        <button
          onClick={() => {
            setEditingOffer(null);
            setNewOffer({
              candidateId: '',
              position: '',
              salary: '',
              bonus: '',
              benefits: '',
              startDate: '',
              status: 'Pending',
            });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Offer
        </button>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bonus</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{offer.candidateName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.salary}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.bonus}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => openViewModal(offer)} className="text-blue-600 hover:text-blue-900 mr-2">
                    View
                  </button>
                  <button onClick={() => openEditModal(offer)} className="text-green-600 hover:text-green-900">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{editingOffer ? 'Edit Offer' : 'Create Offer'}</h3>
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
                      value={newOffer.candidateId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
                    <input
                      type="text"
                      name="position"
                      value={newOffer.position}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary*</label>
                    <input
                      type="text"
                      name="salary"
                      value={newOffer.salary}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="$"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
                    <input
                      type="text"
                      name="bonus"
                      value={newOffer.bonus}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="$"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newOffer.startDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                    <select
                      name="status"
                      value={newOffer.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                    <textarea
                      name="benefits"
                      value={newOffer.benefits}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Health insurance, retirement plans, etc."
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editingOffer ? 'Update Offer' : 'Create Offer'}
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
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Offer Details</h3>
                <button onClick={() => setIsViewModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {selectedOffer && (
                <div className="space-y-4">
                  <div><span className="font-medium">Candidate:</span> {selectedOffer.candidateName}</div>
                  <div><span className="font-medium">Position:</span> {selectedOffer.position}</div>
                  <div><span className="font-medium">Salary:</span> {selectedOffer.salary}</div>
                  <div><span className="font-medium">Bonus:</span> {selectedOffer.bonus}</div>
                  <div><span className="font-medium">Benefits:</span> {selectedOffer.benefits}</div>
                  <div><span className="font-medium">Start Date:</span> {selectedOffer.startDate}</div>
                  <div><span className="font-medium">Status:</span> {selectedOffer.status}</div>
                  <div><span className="font-medium">Sent Date:</span> {selectedOffer.sentDate}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;