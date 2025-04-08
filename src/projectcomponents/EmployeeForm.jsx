// import React, { useState } from 'react';

// const EmployeeForm = ({ addEmployee }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [employee, setEmployee] = useState({
//     name: '',
//     position: '',
//     email: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee({ ...employee, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addEmployee(employee);
//     setEmployee({
//       name: '',
//       position: '',
//       email: ''
//     });
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//       >
//         Add Employee
//       </button>

//       {isOpen && (
//         <div className="fixed z-10 inset-0 overflow-y-auto">
//           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//             </div>

//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Employee</h3>
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                       Full Name
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="name"
//                       type="text"
//                       name="name"
//                       value={employee.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
//                       Position
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="position"
//                       type="text"
//                       name="position"
//                       value={employee.position}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                       Email
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="email"
//                       type="email"
//                       name="email"
//                       value={employee.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                     <button
//                       type="submit"
//                       className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
//                     >
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsOpen(false)}
//                       className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EmployeeForm;

// import React, { useState } from 'react';

// const EmployeeForm = ({ addEmployee }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [employee, setEmployee] = useState({
//     name: '',
//     position: '',
//     email: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee({ ...employee, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addEmployee(employee);
//     setEmployee({
//       name: '',
//     position: '',
//     email: ''
//     });
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//       >
//         Add Employee
//       </button>

//       {isOpen && (
//         <div className="fixed z-10 inset-0 overflow-y-auto">
//           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//             </div>

//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Employee</h3>
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                       Full Name
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="name"
//                       type="text"
//                       name="name"
//                       value={employee.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
//                       Position
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="position"
//                       type="text"
//                       name="position"
//                       value={employee.position}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                       Email
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="email"
//                       type="email"
//                       name="email"
//                       value={employee.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                     <button
//                       type="submit"
//                       className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
//                     >
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsOpen(false)}
//                       className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EmployeeForm;


import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, addEmployee, updateEmployee, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        name: '',
        position: '',
        email: '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee) {
      updateEmployee({ ...formData, id: employee.id });
    } else {
      addEmployee(formData);
    }
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {employee ? 'Edit Employee' : 'Add New Employee'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                  Position
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="position"
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;