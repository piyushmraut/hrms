// import React, { useState, useEffect } from 'react';

// const EmployeeForm = ({ employee, addEmployee, updateEmployee, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     position: '',
//     email: '',
//   });

//   useEffect(() => {
//     if (employee) {
//       setFormData(employee);
//     } else {
//       setFormData({
//         name: '',
//         position: '',
//         email: '',
//       });
//     }
//   }, [employee]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (employee) {
//       updateEmployee({ ...formData, id: employee.id });
//     } else {
//       addEmployee(formData);
//     }
//     onClose();
//   };

//   return (
//     <div className="fixed z-10 inset-0 overflow-y-auto">
//       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>
//         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
//           &#8203;
//         </span>
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//               {employee ? 'Edit Employee' : 'Add New Employee'}
//             </h3>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                   Full Name
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="name"
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
//                   Position
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="position"
//                   type="text"
//                   name="position"
//                   value={formData.position}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                   Email
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="email"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="submit"
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeForm;

// import React, { useState, useEffect } from 'react';
// import { User, Briefcase, Mail, Save, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const EmployeeForm = ({ employee, addEmployee, updateEmployee, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     position: '',
//     email: '',
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (employee) {
//       setFormData(employee);
//     } else {
//       setFormData({
//         name: '',
//         position: '',
//         email: '',
//       });
//     }
//   }, [employee]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     setTimeout(() => {
//       if (employee) {
//         updateEmployee({ ...formData, id: employee.id });
//       } else {
//         addEmployee(formData);
//       }
//       setIsSubmitting(false);
//       onClose();
//     }, 600);
//   };

//   return (
//     <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-40 backdrop-blur-sm transition-opacity">
//       <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           transition={{ duration: 0.3 }}
//           className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl transform w-full max-w-md"
//         >
//           <div className="relative">
//             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-pink-500"></div>
            
//             <div className="px-6 py-8">
//               <motion.h3 
//                 initial={{ y: -20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.1 }}
//                 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center"
//               >
//                 {employee ? 'Edit Employee Profile' : 'Add New Employee'}
//               </motion.h3>
              
//               <form onSubmit={handleSubmit}>
//                 <motion.div 
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className="mb-5"
//                 >
//                   <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="name">
//                     Full Name
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5 transition-all duration-200"
//                       id="name"
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       placeholder="John Doe"
//                     />
//                   </div>
//                 </motion.div>
                
//                 <motion.div 
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="mb-5"
//                 >
//                   <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="position">
//                     Position
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Briefcase size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5 transition-all duration-200"
//                       id="position"
//                       type="text"
//                       name="position"
//                       value={formData.position}
//                       onChange={handleChange}
//                       required
//                       placeholder="Software Engineer"
//                     />
//                   </div>
//                 </motion.div>
                
//                 <motion.div 
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                   className="mb-6"
//                 >
//                   <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="email">
//                     Email
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail size={18} className="text-gray-400" />
//                     </div>
//                     <input
//                       className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5 transition-all duration-200"
//                       id="email"
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       placeholder="john.doe@example.com"
//                     />
//                   </div>
//                 </motion.div>
                
//                 <motion.div 
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.5 }}
//                   className="flex space-x-3 mt-8"
//                 >
//                   <button
//                     type="button"
//                     onClick={onClose}
//                     className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
//                   >
//                     <X size={18} className="mr-2" />
//                     Cancel
//                   </button>
                  
//                   <motion.button
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 font-medium"
//                   >
//                     {isSubmitting ? (
//                       <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                     ) : (
//                       <Save size={18} className="mr-2" />
//                     )}
//                     {isSubmitting ? 'Saving...' : 'Save'}
//                   </motion.button>
//                 </motion.div>
//               </form>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeForm;

import React, { useState, useEffect } from 'react';
import { User, Briefcase, Mail, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeForm = ({ employee, addEmployee, updateEmployee, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (employee) {
        updateEmployee({ ...formData, id: employee.id });
      } else {
        addEmployee(formData);
      }
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-40 backdrop-blur-sm transition-opacity">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl overflow-hidden shadow-2xl transform w-full max-w-md"
        >
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-pink-500"></div>
            
            <div className="px-6 py-8">
              <motion.h3 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-gray-900 mb-6 text-center"
              >
                {employee ? 'Edit Employee Profile' : 'Add New Employee'}
              </motion.h3>
              
              <form onSubmit={handleSubmit}>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-5"
                >
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5 transition-all duration-200"
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-5"
                >
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="position">
                    Position
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase size={18} className="text-gray-400" />
                    </div>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5 transition-all duration-200"
                      id="position"
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      placeholder="Software Engineer"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5 transition-all duration-200"
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john.doe@example.com"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex space-x-3 mt-8"
                >
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
                  >
                    <X size={18} className="mr-2" />
                    Cancel
                  </button>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 font-medium"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Save size={18} className="mr-2" />
                    )}
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeeForm;