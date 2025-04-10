// import React from "react";
// import { useState,useEffect } from "react";
// const HiringSettings = () => {
//     const [settings, setSettings] = useState({
//       approvalWorkflow: true,
//       defaultInterviewers: [],
//       offerApprovers: [],
//       emailNotifications: true,
//       emailTemplates: {
//         interviewInvitation: '',
//         offerLetter: '',
//         rejection: ''
//       }
//     });
//     const [employees, setEmployees] = useState([]);
  
//     useEffect(() => {
//       // Fetch data from API
//       const fetchData = async () => {
//         // Mock employees
//         const mockEmployees = [
//           { id: 1, name: 'Jane Smith', role: 'Engineering Manager' },
//           { id: 2, name: 'Mike Johnson', role: 'Senior Developer' },
//           { id: 3, name: 'Alex Brown', role: 'Marketing Director' },
//           { id: 4, name: 'Lisa Wong', role: 'Data Science Lead' },
//           { id: 5, name: 'David Kim', role: 'HR Manager' }
//         ];
        
//         // Mock settings
//         const mockSettings = {
//           approvalWorkflow: true,
//           defaultInterviewers: [1, 5],
//           offerApprovers: [3, 5],
//           emailNotifications: true,
//           emailTemplates: {
//             interviewInvitation: 'Dear [Candidate],\n\nWe are pleased to invite you for an interview for the [Position] position.\n\nDate: [Date]\nTime: [Time]\nLocation: [Location]\n\nBest regards,\n[Your Name]',
//             offerLetter: 'Dear [Candidate],\n\nWe are delighted to offer you the position of [Position] at [Company].\n\nSalary: [Salary]\nStart Date: [Start Date]\n\nPlease let us know your decision by [Response Deadline].\n\nBest regards,\n[Your Name]',
//             rejection: 'Dear [Candidate],\n\nThank you for your interest in the [Position] position at [Company].\n\nAfter careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our needs.\n\nWe appreciate the time you invested in the application process.\n\nBest regards,\n[Your Name]'
//           }
//         };
        
//         setEmployees(mockEmployees);
//         setSettings(mockSettings);
//       };
//       fetchData();
//     }, []);
  
//     const handleInputChange = (e) => {
//       const { name, value, type, checked } = e.target;
//       setSettings(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     };
  
//     const handleTemplateChange = (template, value) => {
//       setSettings(prev => ({
//         ...prev,
//         emailTemplates: {
//           ...prev.emailTemplates,
//           [template]: value
//         }
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
//       setSettings(prev => ({
//         ...prev,
//         defaultInterviewers: selectedInterviewers
//       }));
//     };
  
//     const handleApproverChange = (e) => {
//       const options = e.target.options;
//       const selectedApprovers = [];
//       for (let i = 0; i < options.length; i++) {
//         if (options[i].selected) {
//           selectedApprovers.push(parseInt(options[i].value));
//         }
//       }
//       setSettings(prev => ({
//         ...prev,
//         offerApprovers: selectedApprovers
//       }));
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       // Save settings to API
//       alert('Settings saved successfully!');
//     };
  
//     return (
//       <div>
//         <h3 className="text-lg font-semibold mb-6">Hiring Process Settings</h3>
        
//         <form onSubmit={handleSubmit}>
//           <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <h4 className="text-md font-medium mb-4">Approval Workflow</h4>
            
//             <div className="flex items-center mb-4">
//               <input
//                 type="checkbox"
//                 id="approvalWorkflow"
//                 name="approvalWorkflow"
//                 checked={settings.approvalWorkflow}
//                 onChange={handleInputChange}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="approvalWorkflow" className="ml-2 block text-sm text-gray-700">
//                 Enable approval workflow for job offers
//               </label>
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Default Interviewers</label>
//               <select
//                 multiple
//                 size="5"
//                 value={settings.defaultInterviewers}
//                 onChange={handleInterviewerChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {employees.map(employee => (
//                   <option key={employee.id} value={employee.id}>
//                     {employee.name} - {employee.role}
//                   </option>
//                 ))}
//               </select>
//               <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Offer Approvers</label>
//               <select
//                 multiple
//                 size="5"
//                 value={settings.offerApprovers}
//                 onChange={handleApproverChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {employees.map(employee => (
//                   <option key={employee.id} value={employee.id}>
//                     {employee.name} - {employee.role}
//                   </option>
//                 ))}
//               </select>
//               <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <h4 className="text-md font-medium mb-4">Email Notifications</h4>
            
//             <div className="flex items-center mb-6">
//               <input
//                 type="checkbox"
//                 id="emailNotifications"
//                 name="emailNotifications"
//                 checked={settings.emailNotifications}
//                 onChange={handleInputChange}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
//                 Enable email notifications
//               </label>
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Interview Invitation Template</label>
//               <textarea
//                 value={settings.emailTemplates.interviewInvitation}
//                 onChange={(e) => handleTemplateChange('interviewInvitation', e.target.value)}
//                 rows={5}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//               <p className="mt-1 text-sm text-gray-500">Available variables: [Candidate], [Position], [Date], [Time], [Location]</p>
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Offer Letter Template</label>
//               <textarea
//                 value={settings.emailTemplates.offerLetter}
//                 onChange={(e) => handleTemplateChange('offerLetter', e.target.value)}
//                 rows={5}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//               <p className="mt-1 text-sm text-gray-500">Available variables: [Candidate], [Position], [Company], [Salary], [Start Date], [Response Deadline]</p>
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Template</label>
//               <textarea
//                 value={settings.emailTemplates.rejection}
//                 onChange={(e) => handleTemplateChange('rejection', e.target.value)}
//                 rows={5}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//               <p className="mt-1 text-sm text-gray-500">Available variables: [Candidate], [Position], [Company]</p>
//             </div>
//           </div>
          
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//             >
//               Save Settings
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   };

// export default HiringSettings;

import React, { useState, useEffect } from 'react';

const HiringSettings = () => {
  const [settings, setSettings] = useState({
    approvalWorkflow: true,
    defaultInterviewers: [],
    offerApprovers: [],
    emailNotifications: true,
    emailTemplates: {
      interviewInvitation: '',
      offerLetter: '',
      rejection: '',
    },
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Load employees
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

    // Load settings
    const storedSettings = localStorage.getItem('hiringSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    } else {
      const mockSettings = {
        approvalWorkflow: true,
        defaultInterviewers: [1, 5],
        offerApprovers: [3, 5],
        emailNotifications: true,
        emailTemplates: {
          interviewInvitation: 'Dear [Candidate],\n\nWe are pleased to invite you for an interview for the [Position] position.\n\nDate: [Date]\nTime: [Time]\nLocation: [Location]\n\nBest regards,\n[Your Name]',
          offerLetter: 'Dear [Candidate],\n\nWe are delighted to offer you the position of [Position] at [Company].\n\nSalary: [Salary]\nStart Date: [Start Date]\n\nPlease let us know your decision by [Response Deadline].\n\nBest regards,\n[Your Name]',
          rejection: 'Dear [Candidate],\n\nThank you for your interest in the [Position] position at [Company].\n\nAfter careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our needs.\n\nWe appreciate the time you invested in the application process.\n\nBest regards,\n[Your Name]',
        },
      };
      setSettings(mockSettings);
      localStorage.setItem('hiringSettings', JSON.stringify(mockSettings));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTemplateChange = (template, value) => {
    setSettings(prev => ({
      ...prev,
      emailTemplates: { ...prev.emailTemplates, [template]: value },
    }));
  };

  const handleInterviewerChange = (e) => {
    const options = e.target.options;
    const selectedInterviewers = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedInterviewers.push(parseInt(options[i].value));
      }
    }
    setSettings(prev => ({ ...prev, defaultInterviewers: selectedInterviewers }));
  };

  const handleApproverChange = (e)=> {    const options = e.target.options;
    const selectedApprovers = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedApprovers.push(parseInt(options[i].value));
      }
    }
    setSettings(prev => ({ ...prev, offerApprovers: selectedApprovers }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('hiringSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">Hiring Process Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h4 className="text-md font-medium mb-4">Approval Workflow</h4>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="approvalWorkflow"
              name="approvalWorkflow"
              checked={settings.approvalWorkflow}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="approvalWorkflow" className="ml-2 block text-sm text-gray-700">
              Enable approval workflow for job offers
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Interviewers</label>
            <select
              multiple
              size="5"
              value={settings.defaultInterviewers}
              onChange={handleInterviewerChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} - {employee.role}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Offer Approvers</label>
            <select
              multiple
              size="5"
              value={settings.offerApprovers}
              onChange={handleApproverChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} - {employee.role}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h4 className="text-md font-medium mb-4">Email Notifications</h4>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
              Enable email notifications
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Interview Invitation Template</label>
            <textarea
              value={settings.emailTemplates.interviewInvitation}
              onChange={(e) => handleTemplateChange('interviewInvitation', e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">Available variables: [Candidate], [Position], [Date], [Time], [Location]</p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Offer Letter Template</label>
            <textarea
              value={settings.emailTemplates.offerLetter}
              onChange={(e) => handleTemplateChange('offerLetter', e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">Available variables: [Candidate], [Position], [Company], [Salary], [Start Date], [Response Deadline]</p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Template</label>
            <textarea
              value={settings.emailTemplates.rejection}
              onChange={(e) => handleTemplateChange('rejection', e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">Available variables: [Candidate], [Position], [Company]</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default HiringSettings;

