

// import React, { useState, useEffect } from 'react';

// function Employees() {
//   // Define protected roles that cannot be deleted
//   const PROTECTED_ROLES = ['CEO', 'CFO', 'CMO', 'COO', 'HR'];
  
//   // Predefined roles for dropdown
//   const ROLES = [
//     'CEO', 'CFO', 'CMO', 'COO', 'HR', 
//     'CTO', 'Director', 'Manager', 'Team Lead', 
//     'Senior Developer', 'Developer', 'Designer',
//     'Marketing Specialist', 'Sales Representative',
//     'Financial Analyst', 'Operations Manager'
//   ];
  
//   // Predefined department options
//   const DEPARTMENTS = [
//     'Executive', 'Finance', 'Marketing', 'Operations', 
//     'Human Resources', 'Technology', 'Sales', 'Customer Support',
//     'Research & Development', 'Legal'
//   ];

//   // Random color generation for employee cards
//   const CARD_COLORS = [
//     'bg-blue-500', 'bg-purple-500', 'bg-green-500', 
//     'bg-yellow-500', 'bg-red-500', 'bg-indigo-500',
//     'bg-pink-500', 'bg-teal-500', 'bg-orange-500'
//   ];

//   // State for employees data
//   const [employees, setEmployees] = useState([]);
//   // State for form data
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     email: '',
//     position: '',
//     department: '',
//     managerId: '',
//     joiningDate: '',
//     salary: '',
//     contact: '',
//     avatarInitials: '',
//     cardColor: ''
//   });
//   // State for editing mode
//   const [editMode, setEditMode] = useState(false);
//   // State for showing form
//   const [showForm, setShowForm] = useState(false);
//   // State for view type
//   const [viewType, setViewType] = useState('hierarchy'); // 'list' or 'hierarchy'

//   // Load sample data when component mounts
//   useEffect(() => {
//     // Sample hierarchical data
//     const sampleEmployees = [
//       { 
//         id: '1', 
//         name: 'Alejandro Moretti', 
//         email: 'amoretti@example.com', 
//         position: 'CEO', 
//         department: 'Executive', 
//         managerId: null, 
//         joiningDate: '2020-01-01', 
//         salary: '180000', 
//         contact: '123-456-7890',
//         avatarInitials: 'AM',
//         cardColor: 'bg-blue-500'
//       },
//       { 
//         id: '2', 
//         name: 'Isabella Rosales', 
//         email: 'irosales@example.com', 
//         position: 'CFO', 
//         department: 'Finance', 
//         managerId: '1', 
//         joiningDate: '2020-02-15', 
//         salary: '160000', 
//         contact: '234-567-8901',
//         avatarInitials: 'IR',
//         cardColor: 'bg-purple-500'
//       },
//       { 
//         id: '3', 
//         name: 'Mikhail Petrov', 
//         email: 'mpetrov@example.com', 
//         position: 'CTO', 
//         department: 'Technology', 
//         managerId: '1', 
//         joiningDate: '2020-03-10', 
//         salary: '155000', 
//         contact: '345-678-9012',
//         avatarInitials: 'MP',
//         cardColor: 'bg-green-500'
//       },
//       { 
//         id: '4', 
//         name: 'Rafael Costa', 
//         email: 'rcosta@example.com', 
//         position: 'COO', 
//         department: 'Operations', 
//         managerId: '1', 
//         joiningDate: '2020-04-20', 
//         salary: '150000', 
//         contact: '456-789-0123',
//         avatarInitials: 'RC',
//         cardColor: 'bg-yellow-500'
//       },
//       { 
//         id: '5', 
//         name: 'Lucia Fernández', 
//         email: 'lfernandez@example.com', 
//         position: 'Finance Manager', 
//         department: 'Finance', 
//         managerId: '2', 
//         joiningDate: '2020-05-15', 
//         salary: '120000', 
//         contact: '567-890-1234',
//         avatarInitials: 'LF',
//         cardColor: 'bg-teal-500'
//       },
//       { 
//         id: '6', 
//         name: 'Hiroshi Takahashi', 
//         email: 'htakahashi@example.com', 
//         position: 'HR Director', 
//         department: 'Human Resources', 
//         managerId: '2', 
//         joiningDate: '2020-06-10', 
//         salary: '125000', 
//         contact: '678-901-2345',
//         avatarInitials: 'HT',
//         cardColor: 'bg-orange-500'
//       },
//       { 
//         id: '7', 
//         name: 'Amélie Dubois', 
//         email: 'adubois@example.com', 
//         position: 'Security Analyst', 
//         department: 'Technology', 
//         managerId: '2', 
//         joiningDate: '2020-07-05', 
//         salary: '115000', 
//         contact: '789-012-3456',
//         avatarInitials: 'AD',
//         cardColor: 'bg-red-500'
//       },
//       { 
//         id: '8', 
//         name: 'Leila Al-Farsi', 
//         email: 'lalfarsi@example.com', 
//         position: 'Operations Manager', 
//         department: 'Operations', 
//         managerId: '3', 
//         joiningDate: '2020-08-15', 
//         salary: '118000', 
//         contact: '890-123-4567',
//         avatarInitials: 'LA',
//         cardColor: 'bg-indigo-500'
//       },
//       { 
//         id: '9', 
//         name: 'Elias Schneider', 
//         email: 'eschneider@example.com', 
//         position: 'Team Lead', 
//         department: 'Technology', 
//         managerId: '3', 
//         joiningDate: '2020-09-10', 
//         salary: '110000', 
//         contact: '901-234-5678',
//         avatarInitials: 'ES',
//         cardColor: 'bg-red-500'
//       },
//       { 
//         id: '10', 
//         name: 'Ingrid Svensson', 
//         email: 'isvensson@example.com', 
//         position: 'Financial Analyst', 
//         department: 'Finance', 
//         managerId: '4', 
//         joiningDate: '2020-10-05', 
//         salary: '105000', 
//         contact: '012-345-6789',
//         avatarInitials: 'IS',
//         cardColor: 'bg-teal-500'
//       },
//       { 
//         id: '11', 
//         name: 'Karim Haddad', 
//         email: 'khaddad@example.com', 
//         position: 'Sales Manager', 
//         department: 'Sales', 
//         managerId: '4', 
//         joiningDate: '2020-11-15', 
//         salary: '108000', 
//         contact: '123-456-7890',
//         avatarInitials: 'KH',
//         cardColor: 'bg-orange-500'
//       }
//     ];
//     setEmployees(sampleEmployees);
//   }, []);

//   // Generate avatar initials from name
//   const generateInitials = (name) => {
//     return name.split(' ')
//       .map(part => part.charAt(0).toUpperCase())
//       .join('')
//       .substring(0, 2);
//   };

//   // Generate random color for employee card
//   const getRandomColor = () => {
//     return CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)];
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     let updatedFormData = {
//       ...formData,
//       [name]: value
//     };
    
//     // Generate avatar initials when name changes
//     if (name === 'name' && !editMode) {
//       updatedFormData.avatarInitials = generateInitials(value);
//       updatedFormData.cardColor = getRandomColor();
//     }
    
//     setFormData(updatedFormData);
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (editMode) {
//       // Update existing employee
//       setEmployees(employees.map(emp => 
//         emp.id === formData.id ? formData : emp
//       ));
//     } else {
//       // Add new employee with unique ID
//       const newId = (Math.max(...employees.map(emp => parseInt(emp.id)), 0) + 1).toString();
//       setEmployees([
//         ...employees, 
//         { 
//           ...formData, 
//           id: newId,
//           avatarInitials: formData.avatarInitials || generateInitials(formData.name),
//           cardColor: formData.cardColor || getRandomColor()
//         }
//       ]);
//     }
    
//     // Reset form
//     resetForm();
//   };

//   // Reset form data and state
//   const resetForm = () => {
//     setFormData({
//       id: '',
//       name: '',
//       email: '',
//       position: '',
//       department: '',
//       managerId: '',
//       joiningDate: '',
//       salary: '',
//       contact: '',
//       avatarInitials: '',
//       cardColor: ''
//     });
//     setEditMode(false);
//     setShowForm(false);
//   };

//   // Edit employee
//   const handleEdit = (employee) => {
//     setFormData(employee);
//     setEditMode(true);
//     setShowForm(true);
//   };

//   // Delete employee
//   const handleDelete = (id) => {
//     // Get the employee
//     const employee = employees.find(emp => emp.id === id);
    
//     // Check if employee has a protected role
//     if (PROTECTED_ROLES.includes(employee.position)) {
//       alert(`Cannot delete employees with ${employee.position} role. You can only edit them.`);
//       return;
//     }
    
//     // Check if employee has subordinates
//     const hasSubordinates = employees.some(emp => emp.managerId === id);
    
//     if (hasSubordinates) {
//       alert("Cannot delete this employee as they have subordinates. Reassign the subordinates first.");
//       return;
//     }
    
//     setEmployees(employees.filter(emp => emp.id !== id));
//   };

//   // Build hierarchical structure
//   const buildHierarchy = (employees) => {
//     // Create a map for quick employee lookup
//     const employeeMap = {};
//     employees.forEach(emp => {
//       employeeMap[emp.id] = { ...emp, subordinates: [] };
//     });
    
//     // Organize into hierarchy
//     const hierarchy = [];
//     employees.forEach(emp => {
//       if (emp.managerId === null || emp.managerId === '') {
//         // This is a top-level employee (e.g., CEO)
//         hierarchy.push(employeeMap[emp.id]);
//       } else if (employeeMap[emp.managerId]) {
//         // This employee has a valid manager
//         employeeMap[emp.managerId].subordinates.push(employeeMap[emp.id]);
//       } else {
//         // Manager doesn't exist, add to top level
//         hierarchy.push(employeeMap[emp.id]);
//       }
//     });
    
//     return hierarchy;
//   };

//   // Render visual hierarchy tree similar to the image
//   const renderVisualHierarchy = (hierarchy, level = 0) => {
//     if (!hierarchy || hierarchy.length === 0) return null;
    
//     return (
//       <div className="flex flex-col items-center">
//         <div className="flex justify-center space-x-8 mb-8">
//           {hierarchy.map(employee => (
//             <div key={employee.id} className="flex flex-col items-center">
//               {/* Employee Card */}
//               <div className={`${employee.cardColor} text-white rounded-lg shadow-lg w-48 p-4 mb-2`}>
//                 <div className="flex items-center mb-2">
//                   {/* Avatar Circle with Initials */}
//                   <div className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center font-bold mr-2">
//                     {employee.avatarInitials}
//                   </div>
//                   <div>
//                     <div className="font-bold">{employee.name}</div>
//                     <div className="text-sm">{employee.position}</div>
//                   </div>
//                 </div>
//                 <div className="text-xs mt-2">
//                   <div className="flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     {employee.contact}
//                   </div>
//                   <div className="flex items-center mt-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                     {employee.email}
//                   </div>
//                 </div>
//                 {/* Actions */}
//                 <div className="mt-2 flex justify-end space-x-1">
//                   <button
//                     onClick={() => handleEdit(employee)}
//                     className="p-1 bg-white text-gray-800 rounded hover:bg-gray-200"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                     </svg>
//                   </button>
//                   {!PROTECTED_ROLES.includes(employee.position) && (
//                     <button
//                       onClick={() => handleDelete(employee.id)}
//                       className="p-1 bg-white text-gray-800 rounded hover:bg-gray-200"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </button>
//                   )}
//                 </div>
//               </div>
              
//               {/* Connector Line */}
//               {employee.subordinates && employee.subordinates.length > 0 && (
//                 <div className="w-px h-8 bg-gray-400"></div>
//               )}
              
//               {/* Subordinates */}
//               {employee.subordinates && employee.subordinates.length > 0 && (
//                 <div className="relative">
//                   {/* Horizontal connector line */}
//                   {employee.subordinates.length > 1 && (
//                     <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-full h-px bg-gray-400"></div>
//                   )}
//                   {renderVisualHierarchy(employee.subordinates, level + 1)}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Render text-based hierarchical tree (as backup/alternative)
//   const renderTextHierarchyTree = (hierarchy, level = 0) => {
//     return hierarchy.map(employee => (
//       <div key={employee.id} className="ml-4">
//         <div className={`flex items-center p-2 my-1 rounded ${employee.cardColor} text-white`}>
//           <div className="flex-1">
//             <div className="font-bold">{employee.name}</div>
//             <div className="text-sm">{employee.position}</div>
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => handleEdit(employee)}
//               className="px-3 py-1 text-xs bg-white text-gray-800 rounded hover:bg-gray-200"
//             >
//               Edit
//             </button>
//             {!PROTECTED_ROLES.includes(employee.position) && (
//               <button
//                 onClick={() => handleDelete(employee.id)}
//                 className="px-3 py-1 text-xs bg-white text-gray-800 rounded hover:bg-gray-200"
//               >
//                 Delete
//               </button>
//             )}
//           </div>
//         </div>
//         {employee.subordinates && employee.subordinates.length > 0 && (
//           <div className="ml-6 border-l-2 border-gray-300 pl-2">
//             {renderTextHierarchyTree(employee.subordinates, level + 1)}
//           </div>
//         )}
//       </div>
//     ));
//   };

//   // Get manager options for dropdown
//   const getManagerOptions = () => {
//     return employees.filter(emp => emp.id !== formData.id).map(emp => (
//       <option key={emp.id} value={emp.id}>
//         {emp.name} ({emp.position})
//       </option>
//     ));
//   };

//   // Get employee details
//   const getEmployeeDetails = (id) => {
//     const employee = employees.find(emp => emp.id === id);
//     return employee ? employee.name + ' (' + employee.position + ')' : 'None';
//   };

//   // Build the hierarchy once
//   const hierarchy = buildHierarchy(employees);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
//           <div className="flex space-x-2">
//             <div className="flex space-x-2 mr-4">
//               <button
//                 onClick={() => setViewType('hierarchy')}
//                 className={`px-4 py-2 rounded ${viewType === 'hierarchy' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//               >
//                 Hierarchy View
//               </button>
//               <button
//                 onClick={() => setViewType('list')}
//                 className={`px-4 py-2 rounded ${viewType === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//               >
//                 List View
//               </button>
//             </div>
//             <button
//               onClick={() => setShowForm(!showForm)}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               {showForm ? 'Cancel' : 'Add Employee'}
//             </button>
//           </div>
//         </div>

//         {/* Employee Form */}
//         {showForm && (
//           <div className="bg-white p-6 mb-6 rounded shadow">
//             <h2 className="text-xl font-semibold mb-4">{editMode ? 'Edit Employee' : 'Add New Employee'}</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Position/Role</label>
//                 <select
//                   name="position"
//                   value={formData.position}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 >
//                   <option value="">Select a Role</option>
//                   {ROLES.map(role => (
//                     <option key={role} value={role}>{role}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//                 <select
//                   name="department"
//                   value={formData.department}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 >
//                   <option value="">Select a Department</option>
//                   {DEPARTMENTS.map(department => (
//                     <option key={department} value={department}>{department}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
//                 <select
//                   name="managerId"
//                   value={formData.managerId || ''}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                 >
//                   <option value="">No Manager (Top Level)</option>
//                   {getManagerOptions()}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
//                 <input
//                   type="date"
//                   name="joiningDate"
//                   value={formData.joiningDate}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
//                 <input
//                   type="number"
//                   name="salary"
//                   value={formData.salary}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
//                 <input
//                   type="text"
//                   name="contact"
//                   value={formData.contact}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 />
//               </div>
//               <div className="md:col-span-2 mt-4">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   {editMode ? 'Update Employee' : 'Add Employee'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="px-4 py-2 ml-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* View Container */}
//         <div className="bg-white rounded shadow p-6 overflow-auto">
//           {/* Hierarchical View */}
//           {viewType === 'hierarchy' && (
//             <div className="min-w-full">
//               {hierarchy.length > 0 ? (
//                 <div className="overflow-x-auto pt-8">
//                   {renderVisualHierarchy(hierarchy)}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center">No employees found.</p>
//               )}
//             </div>
//           )}

//           {/* Employee List View */}
//           {viewType === 'list' && (
//             <div>
//               <h2 className="text-xl font-semibold mb-4">Employee List</h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Position</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Department</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Manager</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contact</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {employees.map(employee => (
//                       <tr key={employee.id}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className={`${employee.cardColor} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3`}>
//                               {employee.avatarInitials}
//                             </div>
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">{employee.name}</div>
//                               <div className="text-sm text-gray-500">{employee.email}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {employee.managerId ? getEmployeeDetails(employee.managerId) : 'None'}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.contact}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <button
//                             onClick={() => handleEdit(employee)}
//                             className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
//                           >
//                             Edit
//                           </button>
//                           {!PROTECTED_ROLES.includes(employee.position) && (
//                             <button
//                               onClick={() => handleDelete(employee.id)}
//                               className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                             >
//                               Delete
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Employees;

// import React, { useState, useEffect, useCallback } from 'react';
// import ReactFlow, { 
//   MiniMap, 
//   Controls, 
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Panel
// } from 'reactflow';
// import 'reactflow/dist/style.css';

// // Custom node component for employee cards
// const EmployeeNode = ({ data }) => {
//   const isProtected = data.isProtected;
  
//   return (
//     <div className={`${data.cardColor} text-white rounded-lg shadow-lg w-64 p-4`}>
//       <div className="flex items-center mb-2">
//         {/* Avatar Circle with Initials */}
//         <div className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center font-bold mr-2">
//           {data.avatarInitials}
//         </div>
//         <div>
//           <div className="font-bold">{data.name}</div>
//           <div className="text-sm">{data.position}</div>
//         </div>
//       </div>
//       <div className="text-xs mt-2">
//         <div className="flex items-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//           </svg>
//           {data.contact}
//         </div>
//         <div className="flex items-center mt-1">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//           </svg>
//           {data.email}
//         </div>
//       </div>
//       {/* Actions */}
//       <div className="mt-2 flex justify-end space-x-1">
//         <button
//           onClick={() => data.onEdit(data.employee)}
//           className="p-1 bg-white text-gray-800 rounded hover:bg-gray-200"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//           </svg>
//         </button>
//         {!isProtected && (
//           <button
//             onClick={() => data.onDelete(data.employee.id)}
//             className="p-1 bg-white text-gray-800 rounded hover:bg-gray-200"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//             </svg>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// function Employees() {
//   // Define protected roles that cannot be deleted
//   const PROTECTED_ROLES = ['CEO', 'CFO', 'CMO', 'COO', 'HR'];
  
//   // Predefined roles for dropdown
//   const ROLES = [
//     'CEO', 'CFO', 'CMO', 'COO', 'HR', 
//     'CTO', 'Director', 'Manager', 'Team Lead', 
//     'Senior Developer', 'Developer', 'Designer',
//     'Marketing Specialist', 'Sales Representative',
//     'Financial Analyst', 'Operations Manager'
//   ];
  
//   // Predefined department options
//   const DEPARTMENTS = [
//     'Executive', 'Finance', 'Marketing', 'Operations', 
//     'Human Resources', 'Technology', 'Sales', 'Customer Support',
//     'Research & Development', 'Legal'
//   ];

//   // Random color generation for employee cards
//   const CARD_COLORS = [
//     'bg-blue-500', 'bg-purple-500', 'bg-green-500', 
//     'bg-yellow-500', 'bg-red-500', 'bg-indigo-500',
//     'bg-pink-500', 'bg-teal-500', 'bg-orange-500'
//   ];

//   // State for employees data
//   const [employees, setEmployees] = useState([]);
//   // State for form data
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     email: '',
//     position: '',
//     department: '',
//     managerId: '',
//     joiningDate: '',
//     salary: '',
//     contact: '',
//     avatarInitials: '',
//     cardColor: ''
//   });
//   // State for editing mode
//   const [editMode, setEditMode] = useState(false);
//   // State for showing form
//   const [showForm, setShowForm] = useState(false);
//   // State for view type
//   const [viewType, setViewType] = useState('hierarchy'); // 'list' or 'hierarchy'
  
//   // React Flow states
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);

//   // Zoom control state
//   const [zoomLevel, setZoomLevel] = useState(1);

//   // Node types for React Flow
//   const nodeTypes = {
//     employeeNode: EmployeeNode,
//   };

//   // Load sample data when component mounts
//   useEffect(() => {
//     // Sample hierarchical data
//     const sampleEmployees = [
//       { 
//         id: '1', 
//         name: 'Alejandro Moretti', 
//         email: 'amoretti@example.com', 
//         position: 'CEO', 
//         department: 'Executive', 
//         managerId: null, 
//         joiningDate: '2020-01-01', 
//         salary: '180000', 
//         contact: '123-456-7890',
//         avatarInitials: 'AM',
//         cardColor: 'bg-blue-500'
//       },
//       { 
//         id: '2', 
//         name: 'Isabella Rosales', 
//         email: 'irosales@example.com', 
//         position: 'CFO', 
//         department: 'Finance', 
//         managerId: '1', 
//         joiningDate: '2020-02-15', 
//         salary: '160000', 
//         contact: '234-567-8901',
//         avatarInitials: 'IR',
//         cardColor: 'bg-purple-500'
//       },
//       { 
//         id: '3', 
//         name: 'Mikhail Petrov', 
//         email: 'mpetrov@example.com', 
//         position: 'CTO', 
//         department: 'Technology', 
//         managerId: '1', 
//         joiningDate: '2020-03-10', 
//         salary: '155000', 
//         contact: '345-678-9012',
//         avatarInitials: 'MP',
//         cardColor: 'bg-green-500'
//       },
//       { 
//         id: '4', 
//         name: 'Rafael Costa', 
//         email: 'rcosta@example.com', 
//         position: 'COO', 
//         department: 'Operations', 
//         managerId: '1', 
//         joiningDate: '2020-04-20', 
//         salary: '150000', 
//         contact: '456-789-0123',
//         avatarInitials: 'RC',
//         cardColor: 'bg-yellow-500'
//       },
//       { 
//         id: '5', 
//         name: 'Lucia Fernández', 
//         email: 'lfernandez@example.com', 
//         position: 'Finance Manager', 
//         department: 'Finance', 
//         managerId: '2', 
//         joiningDate: '2020-05-15', 
//         salary: '120000', 
//         contact: '567-890-1234',
//         avatarInitials: 'LF',
//         cardColor: 'bg-teal-500'
//       },
//       { 
//         id: '6', 
//         name: 'Hiroshi Takahashi', 
//         email: 'htakahashi@example.com', 
//         position: 'HR Director', 
//         department: 'Human Resources', 
//         managerId: '2', 
//         joiningDate: '2020-06-10', 
//         salary: '125000', 
//         contact: '678-901-2345',
//         avatarInitials: 'HT',
//         cardColor: 'bg-orange-500'
//       },
//       { 
//         id: '7', 
//         name: 'Amélie Dubois', 
//         email: 'adubois@example.com', 
//         position: 'Security Analyst', 
//         department: 'Technology', 
//         managerId: '2', 
//         joiningDate: '2020-07-05', 
//         salary: '115000', 
//         contact: '789-012-3456',
//         avatarInitials: 'AD',
//         cardColor: 'bg-red-500'
//       },
//       { 
//         id: '8', 
//         name: 'Leila Al-Farsi', 
//         email: 'lalfarsi@example.com', 
//         position: 'Operations Manager', 
//         department: 'Operations', 
//         managerId: '3', 
//         joiningDate: '2020-08-15', 
//         salary: '118000', 
//         contact: '890-123-4567',
//         avatarInitials: 'LA',
//         cardColor: 'bg-indigo-500'
//       },
//       { 
//         id: '9', 
//         name: 'Elias Schneider', 
//         email: 'eschneider@example.com', 
//         position: 'Team Lead', 
//         department: 'Technology', 
//         managerId: '3', 
//         joiningDate: '2020-09-10', 
//         salary: '110000', 
//         contact: '901-234-5678',
//         avatarInitials: 'ES',
//         cardColor: 'bg-red-500'
//       },
//       { 
//         id: '10', 
//         name: 'Ingrid Svensson', 
//         email: 'isvensson@example.com', 
//         position: 'Financial Analyst', 
//         department: 'Finance', 
//         managerId: '4', 
//         joiningDate: '2020-10-05', 
//         salary: '105000', 
//         contact: '012-345-6789',
//         avatarInitials: 'IS',
//         cardColor: 'bg-teal-500'
//       },
//       { 
//         id: '11', 
//         name: 'Karim Haddad', 
//         email: 'khaddad@example.com', 
//         position: 'Sales Manager', 
//         department: 'Sales', 
//         managerId: '4', 
//         joiningDate: '2020-11-15', 
//         salary: '108000', 
//         contact: '123-456-7890',
//         avatarInitials: 'KH',
//         cardColor: 'bg-orange-500'
//       }
//     ];
//     setEmployees(sampleEmployees);
//   }, []);

//   // Update React Flow nodes and edges when employees change
//   useEffect(() => {
//     if (employees.length > 0) {
//       createFlowElements();
//     }
//   }, [employees]);

//   // Create nodes and edges for React Flow
//   const createFlowElements = () => {
//     const nodesArray = [];
//     const edgesArray = [];
    
//     // Map for storing node positions by level and index
//     const levelMap = {};
    
//     // First, organize employees by levels
//     employees.forEach(emp => {
//       let level = 0;
//       let currentEmp = emp;
      
//       // Determine level by traversing up the manager chain
//       while(currentEmp.managerId) {
//         const manager = employees.find(e => e.id === currentEmp.managerId);
//         if (manager) {
//           level++;
//           currentEmp = manager;
//         } else {
//           break;
//         }
//       }
      
//       if (!levelMap[level]) {
//         levelMap[level] = [];
//       }
      
//       levelMap[level].push(emp);
//     });
    
//     // Calculate positions based on levels
//     const levelHeight = 200; // Vertical distance between levels
//     const nodeWidth = 250; // Width of a node
    
//     Object.keys(levelMap).sort((a, b) => parseInt(a) - parseInt(b)).forEach(level => {
//       const empList = levelMap[level];
//       const levelWidth = empList.length * nodeWidth;
//       const startX = -levelWidth / 2 + nodeWidth / 2;
      
//       empList.forEach((emp, index) => {
//         // Create node
//         nodesArray.push({
//           id: emp.id,
//           type: 'employeeNode',
//           position: { 
//             x: startX + index * nodeWidth, 
//             y: parseInt(level) * levelHeight 
//           },
//           data: { 
//             ...emp,
//             employee: emp,
//             isProtected: PROTECTED_ROLES.includes(emp.position),
//             onEdit: handleEdit,
//             onDelete: handleDelete
//           },
//           draggable: true
//         });
        
//         // Create edge to manager if exists
//         if (emp.managerId) {
//           edgesArray.push({
//             id: `e${emp.managerId}-${emp.id}`,
//             source: emp.managerId,
//             target: emp.id,
//             type: 'smoothstep',
//             animated: false,
//             style: { stroke: '#b1b1b7', strokeWidth: 2 }
//           });
//         }
//       });
//     });
    
//     setNodes(nodesArray);
//     setEdges(edgesArray);
//   };

//   // Generate avatar initials from name
//   const generateInitials = (name) => {
//     return name.split(' ')
//       .map(part => part.charAt(0).toUpperCase())
//       .join('')
//       .substring(0, 2);
//   };

//   // Generate random color for employee card
//   const getRandomColor = () => {
//     return CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)];
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     let updatedFormData = {
//       ...formData,
//       [name]: value
//     };
    
//     // Generate avatar initials when name changes
//     if (name === 'name' && !editMode) {
//       updatedFormData.avatarInitials = generateInitials(value);
//       updatedFormData.cardColor = getRandomColor();
//     }
    
//     setFormData(updatedFormData);
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (editMode) {
//       // Update existing employee
//       setEmployees(employees.map(emp => 
//         emp.id === formData.id ? formData : emp
//       ));
//     } else {
//       // Add new employee with unique ID
//       const newId = (Math.max(...employees.map(emp => parseInt(emp.id)), 0) + 1).toString();
//       setEmployees([
//         ...employees, 
//         { 
//           ...formData, 
//           id: newId,
//           avatarInitials: formData.avatarInitials || generateInitials(formData.name),
//           cardColor: formData.cardColor || getRandomColor()
//         }
//       ]);
//     }
    
//     // Reset form
//     resetForm();
//   };

//   // Reset form data and state
//   const resetForm = () => {
//     setFormData({
//       id: '',
//       name: '',
//       email: '',
//       position: '',
//       department: '',
//       managerId: '',
//       joiningDate: '',
//       salary: '',
//       contact: '',
//       avatarInitials: '',
//       cardColor: ''
//     });
//     setEditMode(false);
//     setShowForm(false);
//   };

//   // Edit employee
//   const handleEdit = (employee) => {
//     setFormData(employee);
//     setEditMode(true);
//     setShowForm(true);
//   };

//   // Delete employee
//   const handleDelete = (id) => {
//     // Get the employee
//     const employee = employees.find(emp => emp.id === id);
    
//     // Check if employee has a protected role
//     if (PROTECTED_ROLES.includes(employee.position)) {
//       alert(`Cannot delete employees with ${employee.position} role. You can only edit them.`);
//       return;
//     }
    
//     // Check if employee has subordinates
//     const hasSubordinates = employees.some(emp => emp.managerId === id);
    
//     if (hasSubordinates) {
//       alert("Cannot delete this employee as they have subordinates. Reassign the subordinates first.");
//       return;
//     }
    
//     setEmployees(employees.filter(emp => emp.id !== id));
//   };

//   // Get manager options for dropdown
//   const getManagerOptions = () => {
//     return employees.filter(emp => emp.id !== formData.id).map(emp => (
//       <option key={emp.id} value={emp.id}>
//         {emp.name} ({emp.position})
//       </option>
//     ));
//   };

//   // Get employee details
//   const getEmployeeDetails = (id) => {
//     const employee = employees.find(emp => emp.id === id);
//     return employee ? employee.name + ' (' + employee.position + ')' : 'None';
//   };

//   // React Flow connection handler
//   const onConnect = useCallback(
//     (connection) => setEdges((eds) => addEdge(connection, eds)),
//     [setEdges]
//   );

//   // Flow instance handler
//   const onInit = (reactFlowInstance) => {
//     setReactFlowInstance(reactFlowInstance);
//     reactFlowInstance.fitView();
//   };

//   // Zoom handlers
//   const handleZoomIn = () => {
//     if (reactFlowInstance) {
//       const newZoom = Math.min(zoomLevel + 0.2, 2);
//       reactFlowInstance.zoomTo(newZoom);
//       setZoomLevel(newZoom);
//     }
//   };

//   const handleZoomOut = () => {
//     if (reactFlowInstance) {
//       const newZoom = Math.max(zoomLevel - 0.2, 0.1);
//       reactFlowInstance.zoomTo(newZoom);
//       setZoomLevel(newZoom);
//     }
//   };

//   const handleZoomReset = () => {
//     if (reactFlowInstance) {
//       reactFlowInstance.fitView();
//       setZoomLevel(1);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
//           <div className="flex space-x-2">
//             <div className="flex space-x-2 mr-4">
//               <button
//                 onClick={() => setViewType('hierarchy')}
//                 className={`px-4 py-2 rounded ${viewType === 'hierarchy' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//               >
//                 Hierarchy View
//               </button>
//               <button
//                 onClick={() => setViewType('list')}
//                 className={`px-4 py-2 rounded ${viewType === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//               >
//                 List View
//               </button>
//             </div>
//             <button
//               onClick={() => setShowForm(!showForm)}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               {showForm ? 'Cancel' : 'Add Employee'}
//             </button>
//           </div>
//         </div>

//         {/* Employee Form */}
//         {showForm && (
//           <div className="bg-white p-6 mb-6 rounded shadow">
//             <h2 className="text-xl font-semibold mb-4">{editMode ? 'Edit Employee' : 'Add New Employee'}</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Position/Role</label>
//                 <select
//                   name="position"
//                   value={formData.position}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 >
//                   <option value="">Select a Role</option>
//                   {ROLES.map(role => (
//                     <option key={role} value={role}>{role}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//                 <select
//                   name="department"
//                   value={formData.department}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 >
//                   <option value="">Select a Department</option>
//                   {DEPARTMENTS.map(department => (
//                     <option key={department} value={department}>{department}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
//                 <select
//                   name="managerId"
//                   value={formData.managerId || ''}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                 >
//                   <option value="">No Manager (Top Level)</option>
//                   {getManagerOptions()}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
//                 <input
//                   type="date"
//                   name="joiningDate"
//                   value={formData.joiningDate}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
//                 <input
//                   type="number"
//                   name="salary"
//                   value={formData.salary}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
//                 <input
//                   type="text"
//                   name="contact"
//                   value={formData.contact}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   required
//                 />
//               </div>
//               <div className="md:col-span-2 mt-4">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   {editMode ? 'Update Employee' : 'Add Employee'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="px-4 py-2 ml-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* View Container */}
//         <div className="bg-white rounded shadow overflow-hidden">
//           {/* Hierarchical View with React Flow */}
//           {viewType === 'hierarchy' && (
//             <div style={{ height: '70vh', width: '100%' }}>
//               <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onNodesChange={onNodesChange}
//                 onEdgesChange={onEdgesChange}
//                 onConnect={onConnect}
//                 onInit={onInit}
//                 nodeTypes={nodeTypes}
//                 fitView
//                 attributionPosition="bottom-right"
//               >
//                 <Controls showInteractive={false} />
//                 <MiniMap 
//                   nodeStrokeColor={(n) => {
//                     return n.data?.cardColor || '#eee';
//                   }}
//                   nodeColor={(n) => {
//                     return n.data?.cardColor || '#fff';
//                   }}
//                 />
//                 <Background variant="dots" gap={12} size={1} />
                
//                 {/* Custom zoom controls */}
//                 <Panel position="top-right" className="bg-white p-2 rounded shadow">
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={handleZoomIn}
//                       className="p-2 bg-gray-100 hover:bg-gray-200 rounded"
//                       title="Zoom In"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={handleZoomOut}
//                       className="p-2 bg-gray-100 hover:bg-gray-200 rounded"
//                       title="Zoom Out"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={handleZoomReset}
//                       className="p-2 bg-gray-100 hover:bg-gray-200 rounded"
//                       title="Reset View"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
//                       </svg>
//                     </button>
//                   </div>
//                 </Panel>
//               </ReactFlow>
//             </div>
//           )}

//           {/* Employee List View */}
//           {viewType === 'list' && (
//             <div className="p-6">
//               <h2 className="text-xl font-semibold mb-4">Employee List</h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Position</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Department</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Manager</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contact</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {employees.map(employee => (
//                       <tr key={employee.id}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className={`${employee.cardColor} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3`}>
//                               {employee.avatarInitials}
//                             </div>
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">{employee.name}</div>
//                               <div className="text-sm text-gray-500">{employee.email}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {employee.managerId ? getEmployeeDetails(employee.managerId) : 'None'}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.contact}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <button
//                             onClick={() => handleEdit(employee)}
//                             className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
//                           >
//                             Edit
//                           </button>
//                           {!PROTECTED_ROLES.includes(employee.position) && (
//                             <button
//                               onClick={() => handleDelete(employee.id)}
//                               className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                             >
//                               Delete
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Employees;

import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function Employees() {
  // Define protected roles that cannot be deleted
  const PROTECTED_ROLES = ['CEO', 'CFO', 'CMO', 'COO', 'HR'];
  
  // Predefined roles for dropdown
  const ROLES = [
    'CEO', 'CFO', 'CMO', 'COO', 'HR', 
    'CTO', 'Director', 'Manager', 'Team Lead', 
    'Senior Developer', 'Developer', 'Designer',
    'Marketing Specialist', 'Sales Representative',
    'Financial Analyst', 'Operations Manager'
  ];
  
  // Predefined department options
  const DEPARTMENTS = [
    'Executive', 'Finance', 'Marketing', 'Operations', 
    'Human Resources', 'Technology', 'Sales', 'Customer Support',
    'Research & Development', 'Legal'
  ];

  // Random color generation for employee cards
  const CARD_COLORS = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500', 
    'bg-yellow-500', 'bg-red-500', 'bg-indigo-500',
    'bg-pink-500', 'bg-teal-500', 'bg-orange-500'
  ];

  // State for employees data
  const [employees, setEmployees] = useState([]);
  // State for form data
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    position: '',
    department: '',
    managerId: '',
    joiningDate: '',
    salary: '',
    contact: '',
    avatarInitials: '',
    cardColor: ''
  });
  // State for editing mode
  const [editMode, setEditMode] = useState(false);
  // State for showing form
  const [showForm, setShowForm] = useState(false);
  // State for view type
  const [viewType, setViewType] = useState('hierarchy'); // 'list' or 'hierarchy'

  // Load sample data when component mounts
  useEffect(() => {
    // Sample hierarchical data
    const sampleEmployees = [
      { 
        id: '1', 
        name: 'Alejandro Moretti', 
        email: 'amoretti@example.com', 
        position: 'CEO', 
        department: 'Executive', 
        managerId: null, 
        joiningDate: '2020-01-01', 
        salary: '180000', 
        contact: '123-456-7890',
        avatarInitials: 'AM',
        cardColor: 'bg-blue-500'
      },
      { 
        id: '2', 
        name: 'Isabella Rosales', 
        email: 'irosales@example.com', 
        position: 'CFO', 
        department: 'Finance', 
        managerId: '1', 
        joiningDate: '2020-02-15', 
        salary: '160000', 
        contact: '234-567-8901',
        avatarInitials: 'IR',
        cardColor: 'bg-purple-500'
      },
      { 
        id: '3', 
        name: 'Mikhail Petrov', 
        email: 'mpetrov@example.com', 
        position: 'CTO', 
        department: 'Technology', 
        managerId: '1', 
        joiningDate: '2020-03-10', 
        salary: '155000', 
        contact: '345-678-9012',
        avatarInitials: 'MP',
        cardColor: 'bg-green-500'
      },
      { 
        id: '4', 
        name: 'Rafael Costa', 
        email: 'rcosta@example.com', 
        position: 'COO', 
        department: 'Operations', 
        managerId: '1', 
        joiningDate: '2020-04-20', 
        salary: '150000', 
        contact: '456-789-0123',
        avatarInitials: 'RC',
        cardColor: 'bg-yellow-500'
      },
      { 
        id: '5', 
        name: 'Lucia Fernández', 
        email: 'lfernandez@example.com', 
        position: 'Finance Manager', 
        department: 'Finance', 
        managerId: '2', 
        joiningDate: '2020-05-15', 
        salary: '120000', 
        contact: '567-890-1234',
        avatarInitials: 'LF',
        cardColor: 'bg-teal-500'
      },
      { 
        id: '6', 
        name: 'Hiroshi Takahashi', 
        email: 'htakahashi@example.com', 
        position: 'HR Director', 
        department: 'Human Resources', 
        managerId: '2', 
        joiningDate: '2020-06-10', 
        salary: '125000', 
        contact: '678-901-2345',
        avatarInitials: 'HT',
        cardColor: 'bg-orange-500'
      },
      { 
        id: '7', 
        name: 'Amélie Dubois', 
        email: 'adubois@example.com', 
        position: 'Security Analyst', 
        department: 'Technology', 
        managerId: '2', 
        joiningDate: '2020-07-05', 
        salary: '115000', 
        contact: '789-012-3456',
        avatarInitials: 'AD',
        cardColor: 'bg-red-500'
      },
      { 
        id: '8', 
        name: 'Leila Al-Farsi', 
        email: 'lalfarsi@example.com', 
        position: 'Operations Manager', 
        department: 'Operations', 
        managerId: '3', 
        joiningDate: '2020-08-15', 
        salary: '118000', 
        contact: '890-123-4567',
        avatarInitials: 'LA',
        cardColor: 'bg-indigo-500'
      },
      { 
        id: '9', 
        name: 'Elias Schneider', 
        email: 'eschneider@example.com', 
        position: 'Team Lead', 
        department: 'Technology', 
        managerId: '3', 
        joiningDate: '2020-09-10', 
        salary: '110000', 
        contact: '901-234-5678',
        avatarInitials: 'ES',
        cardColor: 'bg-red-500'
      },
      { 
        id: '10', 
        name: 'Ingrid Svensson', 
        email: 'isvensson@example.com', 
        position: 'Financial Analyst', 
        department: 'Finance', 
        managerId: '4', 
        joiningDate: '2020-10-05', 
        salary: '105000', 
        contact: '012-345-6789',
        avatarInitials: 'IS',
        cardColor: 'bg-teal-500'
      },
      { 
        id: '11', 
        name: 'Karim Haddad', 
        email: 'khaddad@example.com', 
        position: 'Sales Manager', 
        department: 'Sales', 
        managerId: '4', 
        joiningDate: '2020-11-15', 
        salary: '108000', 
        contact: '123-456-7890',
        avatarInitials: 'KH',
        cardColor: 'bg-orange-500'
      }
    ];
    setEmployees(sampleEmployees);
  }, []);

  // Generate avatar initials from name
  const generateInitials = (name) => {
    return name.split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  // Generate random color for employee card
  const getRandomColor = () => {
    return CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)];
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let updatedFormData = {
      ...formData,
      [name]: value
    };
    
    // Generate avatar initials when name changes
    if (name === 'name' && !editMode) {
      updatedFormData.avatarInitials = generateInitials(value);
      updatedFormData.cardColor = getRandomColor();
    }
    
    setFormData(updatedFormData);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === formData.id ? formData : emp
      ));
    } else {
      // Add new employee with unique ID
      const newId = (Math.max(...employees.map(emp => parseInt(emp.id)), 0) + 1).toString();
      setEmployees([
        ...employees, 
        { 
          ...formData, 
          id: newId,
          avatarInitials: formData.avatarInitials || generateInitials(formData.name),
          cardColor: formData.cardColor || getRandomColor()
        }
      ]);
    }
    
    // Reset form
    resetForm();
  };

  // Reset form data and state
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      email: '',
      position: '',
      department: '',
      managerId: '',
      joiningDate: '',
      salary: '',
      contact: '',
      avatarInitials: '',
      cardColor: ''
    });
    setEditMode(false);
    setShowForm(false);
  };

  // Edit employee
  const handleEdit = (employee) => {
    setFormData(employee);
    setEditMode(true);
    setShowForm(true);
  };

  // Delete employee
  const handleDelete = (id) => {
    // Get the employee
    const employee = employees.find(emp => emp.id === id);
    
    // Check if employee has a protected role
    if (PROTECTED_ROLES.includes(employee.position)) {
      alert(`Cannot delete employees with ${employee.position} role. You can only edit them.`);
      return;
    }
    
    // Check if employee has subordinates
    const hasSubordinates = employees.some(emp => emp.managerId === id);
    
    if (hasSubordinates) {
      alert("Cannot delete this employee as they have subordinates. Reassign the subordinates first.");
      return;
    }
    
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  // Build hierarchical structure
  const buildHierarchy = (employees) => {
    // Create a map for quick employee lookup
    const employeeMap = {};
    employees.forEach(emp => {
      employeeMap[emp.id] = { ...emp, subordinates: [] };
    });
    
    // Organize into hierarchy
    const hierarchy = [];
    employees.forEach(emp => {
      if (emp.managerId === null || emp.managerId === '') {
        // This is a top-level employee (e.g., CEO)
        hierarchy.push(employeeMap[emp.id]);
      } else if (employeeMap[emp.managerId]) {
        // This employee has a valid manager
        employeeMap[emp.managerId].subordinates.push(employeeMap[emp.id]);
      } else {
        // Manager doesn't exist, add to top level
        hierarchy.push(employeeMap[emp.id]);
      }
    });
    
    return hierarchy;
  };

const renderVisualHierarchy = (hierarchy, level = 0) => {
  if (!hierarchy || hierarchy.length === 0) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Top-level employees */}
      <div className="flex justify-center space-x-16">
        {hierarchy.map((employee) => (
          <div key={employee.id} className="flex flex-col items-center">
            {/* Employee Card */}
            <div className={`${employee.cardColor} text-white rounded-lg shadow-lg w-48 p-4`}>
              <div className="flex items-center mb-2">
                {/* Avatar Circle with Initials */}
                <div className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center font-bold mr-2">
                  {employee.avatarInitials}
                </div>
                <div>
                  <div className="font-bold">{employee.name}</div>
                  <div className="text-sm">{employee.position}</div>
                </div>
              </div>
              <div className="text-xs mt-2">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {employee.contact}
                </div>
                <div className="flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {employee.email}
                </div>
              </div>
              {/* Actions */}
              <div className="mt-2 flex justify-end space-x-1">
                <button
                  onClick={() => handleEdit(employee)}
                  className="p-1 bg-white text-gray-800 rounded hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                {!PROTECTED_ROLES.includes(employee.position) && (
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="p-1 bg-white text-gray-800 rounded hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Connector and Subordinates */}
            {employee.subordinates && employee.subordinates.length > 0 && (
              <>
                {/* Vertical line from manager */}
                <div className="w-px h-8 bg-gray-400"></div>

                {/* Relative container for horizontal line and subordinates */}
                <div className="relative">
                  {/* Horizontal line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gray-400"></div>

                  {/* Subordinates container */}
                  <div className="flex justify-center">
                    {employee.subordinates.map((subordinate) => (
                      <div key={subordinate.id} className="flex flex-col items-center mx-4">
                        {/* Vertical line to subordinate */}
                        <div className="w-px h-8 bg-gray-400"></div>

                        {/* Recursive rendering of subordinate */}
                        {renderVisualHierarchy([subordinate], level + 1)}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};



// const renderVisualHierarchy = (hierarchy, level = 0) => {
//   if (!hierarchy || hierarchy.length === 0) return null;

//   return (
//     <div className="flex flex-col items-center">
//       {/* Top-level employees */}
//       <div className="flex justify-center space-x-16">
//         {hierarchy.map((employee) => (
//           <div key={employee.id} className="flex flex-col items-center relative">
//             {/* Employee Card */}
//             <div className={`${employee.cardColor} text-white rounded-lg shadow-lg w-48 p-4 relative z-10`}>
//               <div className="flex items-center mb-2">
//                 {/* Avatar Circle with Initials */}
//                 <div className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center font-bold mr-2">
//                   {employee.avatarInitials}
//                 </div>
//                 <div>
//                   <div className="font-bold">{employee.name}</div>
//                   <div className="text-sm">{employee.position}</div>
//                 </div>
//               </div>
//               <div className="text-xs mt-2">
//                 <div className="flex items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-3 w-3 mr-1"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                     />
//                   </svg>
//                   {employee.contact}
//                 </div>
//                 <div className="flex items-center mt-1">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-3 w-3 mr-1"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                   {employee.email}
//                 </div>
//               </div>
//               {/* Actions */}
//               <div className="mt-2 flex justify-end space-x-1">
//                 <button
//                   onClick={() => handleEdit(employee)}
//                   className="p-1 bg-white text-gray-800 rounded hover:bg-gray-200"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                     />
//                   </svg>
//                 </button>
//                 {!PROTECTED_ROLES.includes(employee.position) && (
//                   <button
//                     onClick={() => handleDelete(employee.id)}
//                     className="p-1 bg-white text-gray-800 rounded hover:bg-gray-200"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       />
//                     </svg>
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Connector and Subordinates */}
//             {employee.subordinates && employee.subordinates.length > 0 && (
//               <div className="relative">
//                 {/* Vertical line from manager to horizontal connector */}
//                 <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-6 bg-gray-400 top-0"></div>
                
//                 {/* Container for subordinates with proper spacing */}
//                 <div className="pt-6">
//                   {/* Horizontal connector line */}
//                   <div className="relative">
//                     <div className="absolute left-0 right-0 h-px bg-gray-400 top-0"></div>
                    
//                     {/* Subordinates container */}
//                     <div className="flex justify-center pt-6 relative">
//                       {employee.subordinates.map((subordinate, index) => (
//                         <div key={subordinate.id} className="relative px-4">
//                           {/* Vertical line to subordinate */}
//                           <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-6 bg-gray-400 top-0"></div>
                          
//                           {/* Recursive rendering of subordinate */}
//                           {renderVisualHierarchy([subordinate], level + 1)}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

  // Render text-based hierarchical tree (as backup/alternative)
  const renderTextHierarchyTree = (hierarchy, level = 0) => {
    return hierarchy.map(employee => (
      <div key={employee.id} className="ml-4">
        <div className={`flex items-center p-2 my-1 rounded ${employee.cardColor} text-white`}>
          <div className="flex-1">
            <div className="font-bold">{employee.name}</div>
            <div className="text-sm">{employee.position}</div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(employee)}
              className="px-3 py-1 text-xs bg-white text-gray-800 rounded hover:bg-gray-200"
            >
              Edit
            </button>
            {!PROTECTED_ROLES.includes(employee.position) && (
              <button
                onClick={() => handleDelete(employee.id)}
                className="px-3 py-1 text-xs bg-white text-gray-800 rounded hover:bg-gray-200"
              >
                Delete
              </button>
            )}
          </div>
        </div>
        {employee.subordinates && employee.subordinates.length > 0 && (
          <div className="ml-6 border-l-2 border-gray-300 pl-2">
            {renderTextHierarchyTree(employee.subordinates, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  // Get manager options for dropdown
 // Get manager options for dropdown
 const getManagerOptions = () => {
  return employees.filter(emp => emp.id !== formData.id).map(emp => (
    <option key={emp.id} value={emp.id}>
      {emp.name} ({emp.position})
    </option>
  ));
};

// Get employee details
const getEmployeeDetails = (id) => {
  const employee = employees.find(emp => emp.id === id);
  return employee ? employee.name + ' (' + employee.position + ')' : 'None';
};

// Build the hierarchy once
const hierarchy = buildHierarchy(employees);

// Zoom controls for the hierarchy view
const ZoomControls = ({ zoomIn, zoomOut, resetTransform }) => (
  <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2 flex space-x-2 z-10">
    <button
      onClick={() => zoomIn()}
      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
      title="Zoom In"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
    </button>
    <button
      onClick={() => zoomOut()}
      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
      title="Zoom Out"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    </button>
    <button
      onClick={() => resetTransform()}
      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
      title="Reset View"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
);

return (
  <div className="p-6 bg-gray-100 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
        <div className="flex space-x-2">
          <div className="flex space-x-2 mr-4">
            <button
              onClick={() => setViewType('hierarchy')}
              className={`px-4 py-2 rounded ${viewType === 'hierarchy' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Hierarchy View
            </button>
            <button
              onClick={() => setViewType('list')}
              className={`px-4 py-2 rounded ${viewType === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              List View
            </button>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {showForm ? 'Cancel' : 'Add Employee'}
          </button>
        </div>
      </div>

      {/* Employee Form */}
      {showForm && (
        <div className="bg-white p-6 mb-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">{editMode ? 'Edit Employee' : 'Add New Employee'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position/Role</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select a Role</option>
                {ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select a Department</option>
                {DEPARTMENTS.map(department => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
              <select
                name="managerId"
                value={formData.managerId || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="">No Manager (Top Level)</option>
                {getManagerOptions()}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editMode ? 'Update Employee' : 'Add Employee'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 ml-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* View Container */}
      <div className="bg-white rounded shadow p-6 overflow-hidden">
        {/* Hierarchical View with Zoom Functionality */}
        {viewType === 'hierarchy' && (
          <div className="min-w-full relative" style={{ height: '700px' }}>
            <TransformWrapper
              initialScale={1}
              initialPositionX={0}
              initialPositionY={0}
              minScale={0.3}
              maxScale={2}
              centerOnInit={true}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <ZoomControls zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />
                  <TransformComponent 
                    wrapperStyle={{ width: "100%", height: "700px" }}
                    contentStyle={{ width: "100%", padding: "20px" }}
                  >
                    <div className="min-w-full">
                      {hierarchy.length > 0 ? (
                        renderVisualHierarchy(hierarchy)
                      ) : (
                        <p className="text-gray-500 text-center">No employees found.</p>
                      )}
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        )}

        {/* Employee List View */}
        {viewType === 'list' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Employee List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Manager</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map(employee => (
                    <tr key={employee.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`${employee.cardColor} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3`}>
                            {employee.avatarInitials}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.managerId ? getEmployeeDetails(employee.managerId) : 'None'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.contact}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                        >
                          Edit
                        </button>
                        {!PROTECTED_ROLES.includes(employee.position) && (
                          <button
                            onClick={() => handleDelete(employee.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default Employees;