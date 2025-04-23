

/*
 *  Preferred Response
 */

// import React, { useState, useEffect } from 'react';
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { motion, AnimatePresence } from 'framer-motion';
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from '../../firebase'; // Adjust path as needed

// function Employees() {
//   // Existing state and constants remain unchanged
//   const [employees, setEmployees] = useState([]);
//   const [formData, setFormData] = useState({
//     id: '', name: '', email: '', position: '', department: '',
//     managerId: '', joiningDate: '', salary: '', contact: '',
//     avatarInitials: '', cardColor: '', password: '' // Added password
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [showCredentialForm, setShowCredentialForm] = useState(false); // New state for credential form
//   const [credentialData, setCredentialData] = useState({ name: '', email: '', password: '' }); // New state for credentials
//   // Other existing state variables remain unchanged

//   // Existing useEffect and helper functions remain unchanged

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: value };
//     if (name === 'name' && !editMode) {
//       updatedFormData.avatarInitials = generateInitials(value);
//       updatedFormData.cardColor = getRandomGradient();
//     }
//     setFormData(updatedFormData);
//   };

//   const handleCredentialChange = (e) => {
//     const { name, value } = e.target;
//     setCredentialData({ ...credentialData, [name]: value });
//   };

//   // const handleCreateUser = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     // Create user in Firebase Authentication
//   //     const userCredential = await createUserWithEmailAndPassword(auth, credentialData.email, credentialData.password);
//   //     const user = userCredential.user;

//   //     // Store additional user info in Firestore
//   //     await setDoc(doc(db, "users", user.uid), {
//   //       name: credentialData.name,
//   //       email: credentialData.email,
//   //       role: "employee"
//   //     });

//   //     alert('User created successfully!');
//   //     setCredentialData({ name: '', email: '', password: '' });
//   //     setShowCredentialForm(false);
//   //   } catch (error) {
//   //     console.error('Error creating user:', error);
//   //     alert('Failed to create user: ' + error.message);
//   //   }
//   // };

//   // Existing handleSubmit, resetForm, handleEdit, handleDelete, etc., remain unchanged

//   const handleCreateUser = async (e) => {
//     e.preventDefault();
//     try {
//       // Create user in Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(
//         auth, 
//         credentialData.email, 
//         credentialData.password
//       );
//       const user = userCredential.user;
  
//       // Store additional user info in Firestore (without password)
//       await setDoc(doc(db, "users", user.uid), {
//         name: credentialData.name,
//         email: credentialData.email,
//         password:credentialData.password,
//         role: "employee",
//         createdAt: new Date(),
//         // Add any other user metadata you need
//       });
  
//       alert('User created successfully!');
//       setCredentialData({ name: '', email: '', password: '' });
//       setShowCredentialForm(false);
//     } catch (error) {
//       console.error('Error creating user:', error);
//       alert('Failed to create user: ' + error.message);
//     }
//   };
//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <motion.h1 className="text-3xl font-bold text-gray-800">Employees</motion.h1>
//           <div className="flex space-x-4 items-center">
//             {/* Existing view toggle buttons */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowForm(!showForm)}
//               className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 shadow-md flex items-center space-x-2"
//             >
//               <span>{showForm ? 'Cancel' : 'Add Employee'}</span>
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowCredentialForm(!showCredentialForm)}
//               className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-700 hover:to-green-600 shadow-md flex items-center space-x-2"
//             >
//               <span>{showCredentialForm ? 'Cancel' : 'Create User'}</span>
//             </motion.button>
//           </div>
//         </div>

//         {/* Existing employee form */}
//         <AnimatePresence>
//           {showForm && (
//             // Existing employee form code remains unchanged
//             <motion.div>{/* ... */}</motion.div>
//           )}
//         </AnimatePresence>

//         {/* New credential creation form */}
//         <AnimatePresence>
//           {showCredentialForm && (
//             <motion.div
//               className="bg-white p-6 mb-8 rounded-2xl shadow-xl"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create User Credentials</h2>
//               <form onSubmit={handleCreateUser} className="grid grid-cols-1 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={credentialData.name}
//                     onChange={handleCredentialChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                     required
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={credentialData.email}
//                     onChange={handleCredentialChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                     required
//                     placeholder="john@example.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={credentialData.password}
//                     onChange={handleCredentialChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                     required
//                     placeholder="••••••••"
//                   />
//                 </div>
//                 <div className="mt-4 flex justify-end space-x-3">
//                   <motion.button
//                     type="button"
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={() => setShowCredentialForm(false)}
//                     className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//                   >
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     type="submit"
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 shadow-md"
//                   >
//                     Create User
//                   </motion.button>
//                 </div>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Rest of the component (hierarchy/list view) remains unchanged */}
//       </div>
//     </div>
//   );
// }

// export default Employees;

// import React, { useState, useEffect } from 'react';
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { motion, AnimatePresence } from 'framer-motion';
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from '../../firebase'; // Adjust path as needed

// function Employees() {
//   const [employees, setEmployees] = useState([]);
//   const [formData, setFormData] = useState({
//     id: '', name: '', email: '', position: '', department: '',
//     managerId: '', joiningDate: '', salary: '', contact: '',
//     avatarInitials: '', cardColor: '', password: ''
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [showCredentialForm, setShowCredentialForm] = useState(false);
//   const [credentialData, setCredentialData] = useState({
//     name: '',
//     personalEmail: '',
//     officialEmail: '',
//     password: ''
//   });

//   const generateInitials = (name) => {
//     return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
//   };

//   const getRandomGradient = () => {
//     const gradients = [
//       'bg-gradient-to-r from-blue-400 to-indigo-500',
//       'bg-gradient-to-r from-green-400 to-teal-500',
//       'bg-gradient-to-r from-purple-400 to-pink-500'
//     ];
//     return gradients[Math.floor(Math.random() * gradients.length)];
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: value };
//     if (name === 'name' && !editMode) {
//       updatedFormData.avatarInitials = generateInitials(value);
//       updatedFormData.cardColor = getRandomGradient();
//     }
//     setFormData(updatedFormData);
//   };

//   const handleCredentialChange = (e) => {
//     const { name, value } = e.target;
//     setCredentialData({ ...credentialData, [name]: value });
//   };

//   const handleCreateUser = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         credentialData.officialEmail,
//         credentialData.password
//       );
//       const user = userCredential.user;

//       await updateProfile(user, {
//         displayName: credentialData.name
//       });

//       await setDoc(doc(db, "users", user.uid), {
//         name: credentialData.name,
//         personalEmail: credentialData.personalEmail,
//         officialEmail: credentialData.officialEmail,
//         password:credentialData.password,
//         role: "employee",
//         createdAt: new Date(),
//       });

//       alert('User created successfully!');
//       setCredentialData({ name: '', personalEmail: '', officialEmail: '', password: '' });
//       setShowCredentialForm(false);
//     } catch (error) {
//       console.error('Error creating user:', error);
//       alert('Failed to create user: ' + error.message);
//     }
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <motion.h1 className="text-3xl font-bold text-gray-800">Employees</motion.h1>
//           <div className="flex space-x-4 items-center">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowForm(!showForm)}
//               className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 shadow-md flex items-center space-x-2"
//             >
//               <span>{showForm ? 'Cancel' : 'Add Employee'}</span>
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowCredentialForm(!showCredentialForm)}
//               className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-700 hover:to-green-600 shadow-md flex items-center space-x-2"
//             >
//               <span>{showCredentialForm ? 'Cancel' : 'Create User'}</span>
//             </motion.button>
//           </div>
//         </div>

//         <AnimatePresence>
//           {showCredentialForm && (
//             <motion.div
//               className="bg-white p-6 mb-8 rounded-2xl shadow-xl"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create User Credentials</h2>
//               <div className="grid grid-cols-1 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={credentialData.name}
//                     onChange={handleCredentialChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                     required
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Personal Email *</label>
//                   <input
//                     type="email"
//                     name="personalEmail"
//                     value={credentialData.personalEmail}
//                     onChange={handleCredentialChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                     required
//                     placeholder="personal@example.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Official Email *</label>
//                   <input
//                     type="email"
//                     name="officialEmail"
//                     value={credentialData.officialEmail}
//                     onChange={handleCredentialChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                     required
//                     placeholder="official@example.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={credentialData.password}
//                     onChange={handleCredentialChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                     required
//                     placeholder="••••••••"
//                   />
//                 </div>
//                 <div className="mt-4 flex justify-end space-x-3">
//                   <motion.button
//                     type="button"
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={() => setShowCredentialForm(false)}
//                     className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//                   >
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     onClick={handleCreateUser}
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 shadow-md"
//                   >
//                     Create User
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// export default Employees;

/*
 *  Final Response 
 */

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from '../../firebase';
// import emailjs from 'emailjs-com';

// function Employees() {
//   const [formData, setFormData] = useState({
//     id: '', name: '', email: '', position: '', department: '',
//     managerId: '', joiningDate: '', salary: '', contact: '',
//     avatarInitials: '', cardColor: '', password: ''
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [showCredentialForm, setShowCredentialForm] = useState(false);
//   const [credentialData, setCredentialData] = useState({
//     name: '',
//     personalEmail: '',
//     officialEmail: '',
//     password: ''
//   });

//   const EMAILJS_SERVICE_ID = 'service_p3xs705';
//   const EMAILJS_TEMPLATE_ID = 'template_nia1e9h';
//   const EMAILJS_USER_ID = 'yj6MazdvAeaUvXzSj';

//   const generateInitials = (name) => {
//     return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
//   };

//   const getRandomGradient = () => {
//     const gradients = [
//       'bg-gradient-to-r from-blue-400 to-indigo-500',
//       'bg-gradient-to-r from-green-400 to-teal-500',
//       'bg-gradient-to-r from-purple-400 to-pink-500'
//     ];
//     return gradients[Math.floor(Math.random() * gradients.length)];
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: value };
//     if (name === 'name' && !editMode) {
//       updatedFormData.avatarInitials = generateInitials(value);
//       updatedFormData.cardColor = getRandomGradient();
//     }
//     setFormData(updatedFormData);
//   };

//   const handleCredentialChange = (e) => {
//     const { name, value } = e.target;
//     setCredentialData({ ...credentialData, [name]: value });
//   };

//   const sendCredentialsEmail = async (userData) => {
//     try {
//       console.log('Attempting to send email with data:', userData); // Debug log
      
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!userData.personalEmail || !emailRegex.test(userData.personalEmail)) {
//         throw new Error(`Invalid personal email address: ${userData.personalEmail}`);
//       }
  
//       const templateParams = {
//         to_name: userData.name,
//         to_email: userData.personalEmail,  // Ensure this matches template
//         official_email: userData.officialEmail,
//         password: userData.password
//       };
  
//       console.log('Template params being sent:', templateParams); // Debug log
  
//       const response = await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         templateParams,
//         EMAILJS_USER_ID
//       );
  
//       console.log('Email sent successfully', response);
//       return true;
//     } catch (error) {
//       console.error('Detailed email sending error:', {
//         error,
//         userData,
//         status: error?.status,
//         text: error?.text
//       });
//       throw error;
//     }
//   };


//   const handleCreateUser = async (e) => {
//     e.preventDefault();
//     try {
//       // Validate form data first
//       if (!credentialData.name || 
//           !credentialData.personalEmail || 
//           !credentialData.officialEmail || 
//           !credentialData.password) {
//         throw new Error('All fields are required');
//       }
  
//       // Validate email format
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(credentialData.personalEmail)) {
//         throw new Error('Please enter a valid personal email address');
//       }
//       if (!emailRegex.test(credentialData.officialEmail)) {
//         throw new Error('Please enter a valid official email address');
//       }
  
//       // First create the user in Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         credentialData.officialEmail,
//         credentialData.password
//       );
//       const user = userCredential.user;
  
//       // Update the user profile with their name
//       await updateProfile(user, {
//         displayName: credentialData.name
//       });
  
//       // Save additional user data to Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         name: credentialData.name,
//         personalEmail: credentialData.personalEmail,
//         officialEmail: credentialData.officialEmail,
//         role: "employee",
//         createdAt: new Date(),
//       });
  
//       // Try to send email (but don't block user creation if it fails)
//       try {
//         await sendCredentialsEmail(credentialData);
//         alert('User created successfully! Credentials have been sent to their personal email.');
//       } catch (emailError) {
//         console.error('Email sending failed:', emailError);
//         alert(`User created successfully! However, we couldn't send the credentials email. Please provide them manually.`);
//       }
  
//       setCredentialData({ name: '', personalEmail: '', officialEmail: '', password: '' });
//       setShowCredentialForm(false);
//     } catch (error) {
//       console.error('Error creating user:', error);
//       alert(`Failed to create user: ${error.message}`);
//     }
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <motion.h1 className="text-3xl font-bold text-gray-800">Employees</motion.h1>
//           <div className="flex space-x-4 items-center">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowForm(!showForm)}
//               className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 shadow-md flex items-center space-x-2"
//             >
//               <span>{showForm ? 'Cancel' : 'Add Employee'}</span>
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowCredentialForm(!showCredentialForm)}
//               className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-700 hover:to-green-600 shadow-md flex items-center space-x-2"
//             >
//               <span>{showCredentialForm ? 'Cancel' : 'Create User'}</span>
//             </motion.button>
//           </div>
//         </div>

//         <AnimatePresence>
//           {showCredentialForm && (
//             <motion.div
//               className="bg-white p-6 mb-8 rounded-2xl shadow-xl"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create User Credentials</h2>
//               <div className="grid grid-cols-1 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={credentialData.name}
//                     onChange={handleCredentialChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                     required
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Personal Email *</label>
//                   <input
//                     type="email"
//                     name="personalEmail"
//                     value={credentialData.personalEmail}
//                     onChange={handleCredentialChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                     required
//                     placeholder="personal@example.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Official Email *</label>
//                   <input
//                     type="email"
//                     name="officialEmail"
//                     value={credentialData.officialEmail}
//                     onChange={handleCredentialChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                     required
//                     placeholder="official@example.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={credentialData.password}
//                     onChange={handleCredentialChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                     required
//                     placeholder="••••••••"
//                   />
//                 </div>
//                 <div className="mt-4 flex justify-end space-x-3">
//                   <motion.button
//                     type="button"
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={() => setShowCredentialForm(false)}
//                     className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//                   >
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     onClick={handleCreateUser}
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 shadow-md"
//                   >
//                     Create User
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// export default Employees;

import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion, AnimatePresence } from 'framer-motion';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';
import emailjs from 'emailjs-com';

function Employees() {
  const PROTECTED_ROLES = ['CEO', 'CFO', 'CMO', 'COO', 'CTO'];
  const ROLES = [
    'CEO', 'CFO', 'CMO', 'COO', 'HR',
    'CTO', 'Director', 'Manager', 'Team Lead',
    'Senior Developer', 'Developer', 'Designer',
    'Marketing Specialist', 'Sales Representative',
    'Financial Analyst', 'Operations Manager'
  ];
  const DEPARTMENTS = [
    'Executive', 'Finance', 'Marketing', 'Operations',
    'Human Resources', 'Technology', 'Sales', 'Customer Support',
    'Research & Development', 'Legal'
  ];
  const CARD_GRADIENTS = [
    'bg-gradient-to-r from-blue-500 to-blue-600',
    'bg-gradient-to-r from-purple-500 to-purple-600',
    'bg-gradient-to-r from-green-500 to-green-600',
    'bg-gradient-to-r from-yellow-500 to-yellow-600',
    'bg-gradient-to-r from-red-500 to-red-600',
    'bg-gradient-to-r from-indigo-500 to-indigo-600',
    'bg-gradient-to-r from-pink-500 to-pink-600',
    'bg-gradient-to-r from-teal-500 to-teal-600',
    'bg-gradient-to-r from-orange-500 to-orange-600',
    'bg-gradient-to-r from-cyan-500 to-cyan-600',
    'bg-gradient-to-r from-emerald-500 to-emerald-600',
    'bg-gradient-to-r from-violet-500 to-violet-600'
  ];

  const EMAILJS_SERVICE_ID = 'service_p3xs705';
  const EMAILJS_TEMPLATE_ID = 'template_nia1e9h';
  const EMAILJS_USER_ID = 'yj6MazdvAeaUvXzSj';

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id: '', name: '', email: '', position: '', department: '',
    managerId: '', joiningDate: '', salary: '', contact: '',
    avatarInitials: '', cardColor: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [viewType, setViewType] = useState('hierarchy');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCredentialForm, setShowCredentialForm] = useState(false);
  const [credentialData, setCredentialData] = useState({
    name: '',
    personalEmail: '',
    officialEmail: '',
    password: ''
  });

  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
      const sampleEmployees = [
        { id: '1', name: 'Alejandro Moretti', email: 'amoretti@example.com', position: 'CEO', department: 'Executive', managerId: null, joiningDate: '2020-01-01', salary: '180000', contact: '123-456-7890', avatarInitials: 'AM', cardColor: CARD_GRADIENTS[0] },
        { id: '2', name: 'Isabella Rosales', email: 'irosales@example.com', position: 'CFO', department: 'Finance', managerId: '1', joiningDate: '2020-02-15', salary: '160000', contact: '234-567-8901', avatarInitials: 'IR', cardColor: CARD_GRADIENTS[1] },
        { id: '3', name: 'Mikhail Petrov', email: 'mpetrov@example.com', position: 'CTO', department: 'Technology', managerId: '1', joiningDate: '2020-03-10', salary: '155000', contact: '345-678-9012', avatarInitials: 'MP', cardColor: CARD_GRADIENTS[2] },
        { id: '4', name: 'Rafael Costa', email: 'rcosta@example.com', position: 'COO', department: 'Operations', managerId: '1', joiningDate: '2020-04-20', salary: '150000', contact: '456-789-0123', avatarInitials: 'RC', cardColor: CARD_GRADIENTS[3] },
        { id: '5', name: 'Lucia Fernández', email: 'lfernandez@example.com', position: 'Finance Manager', department: 'Finance', managerId: '2', joiningDate: '2020-05-15', salary: '120000', contact: '567-890-1234', avatarInitials: 'LF', cardColor: CARD_GRADIENTS[4] },
        { id: '6', name: 'Hiroshi Takahashi', email: 'htakahashi@example.com', position: 'HR Director', department: 'Human Resources', managerId: '2', joiningDate: '2020-06-10', salary: '125000', contact: '678-901-2345', avatarInitials: 'HT', cardColor: CARD_GRADIENTS[5] },
        { id: '7', name: 'Amélie Dubois', email: 'adubois@example.com', position: 'Security Analyst', department: 'Technology', managerId: '2', joiningDate: '2020-07-05', salary: '115000', contact: '789-012-3456', avatarInitials: 'AD', cardColor: CARD_GRADIENTS[6] },
        { id: '8', name: 'Leila Al-Farsi', email: 'lalfarsi@example.com', position: 'Operations Manager', department: 'Operations', managerId: '3', joiningDate: '2020-08-15', salary: '118000', contact: '890-123-4567', avatarInitials: 'LA', cardColor: CARD_GRADIENTS[7] },
        { id: '9', name: 'Elias Schneider', email: 'eschneider@example.com', position: 'Team Lead', department: 'Technology', managerId: '3', joiningDate: '2020-09-10', salary: '110000', contact: '901-234-5678', avatarInitials: 'ES', cardColor: CARD_GRADIENTS[8] },
        { id: '10', name: 'Ingrid Svensson', email: 'isvensson@example.com', position: 'Financial Analyst', department: 'Finance', managerId: '4', joiningDate: '2020-10-05', salary: '105000', contact: '012-345-6789', avatarInitials: 'IS', cardColor: CARD_GRADIENTS[9] },
        { id: '11', name: 'Karim Haddad', email: 'khaddad@example.com', position: 'Sales Manager', department: 'Sales', managerId: '4', joiningDate: '2020-11-15', salary: '108000', contact: '123-456-7890', avatarInitials: 'KH', cardColor: CARD_GRADIENTS[10] }
      ];
      setEmployees(sampleEmployees);
      localStorage.setItem('employees', JSON.stringify(sampleEmployees));
    }
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, [employees]);

  const generateInitials = (name) => name.split(' ').map(part => part.charAt(0).toUpperCase()).join('').substring(0, 2);
  const getRandomGradient = () => CARD_GRADIENTS[Math.floor(Math.random() * CARD_GRADIENTS.length)];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
    if (name === 'name' && !editMode) {
      updatedFormData.avatarInitials = generateInitials(value);
      updatedFormData.cardColor = getRandomGradient();
    }
    setFormData(updatedFormData);
  };

  const handleCredentialChange = (e) => {
    const { name, value } = e.target;
    setCredentialData({ ...credentialData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setEmployees(employees.map(emp => emp.id === formData.id ? formData : emp));
    } else {
      const newId = (Math.max(...employees.map(emp => parseInt(emp.id)), 0) + 1).toString();
      setEmployees([...employees, { ...formData, id: newId, avatarInitials: formData.avatarInitials || generateInitials(formData.name), cardColor: formData.cardColor || getRandomGradient() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ id: '', name: '', email: '', position: '', department: '', managerId: '', joiningDate: '', salary: '', contact: '', avatarInitials: '', cardColor: '' });
    setEditMode(false);
    setShowForm(false);
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const employee = employees.find(emp => emp.id === id);
    if (PROTECTED_ROLES.includes(employee.position)) {
      alert(`Cannot delete employees with ${employee.position} role. You can only edit them.`);
      return;
    }
    const hasSubordinates = employees.some(emp => emp.managerId === id);
    if (hasSubordinates) {
      alert("Cannot delete this employee as they have subordinates. Reassign the subordinates first.");
      return;
    }
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const openModal = (employee) => {
    setSelectedEmployee({
      ...employee,
      managerName: employee.managerId ? getEmployeeDetails(employee.managerId) : 'None'
    });
    setIsModalOpen(true);
  };

  const sendCredentialsEmail = async (userData) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!userData.personalEmail || !emailRegex.test(userData.personalEmail)) {
        throw new Error(`Invalid personal email address: ${userData.personalEmail}`);
      }

      const templateParams = {
        to_name: userData.name,
        to_email: userData.personalEmail,
        official_email: userData.officialEmail,
        password: userData.password
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_USER_ID
      );

      console.log('Email sent successfully', response);
      return true;
    } catch (error) {
      console.error('Detailed email sending error:', { error, userData });
      throw error;
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      if (!credentialData.name || !credentialData.personalEmail || !credentialData.officialEmail || !credentialData.password) {
        throw new Error('All fields are required');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentialData.personalEmail)) {
        throw new Error('Please enter a valid personal email address');
      }
      if (!emailRegex.test(credentialData.officialEmail)) {
        throw new Error('Please enter a valid official email address');
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentialData.officialEmail,
        credentialData.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: credentialData.name
      });

      await setDoc(doc(db, "users", user.uid), {
        name: credentialData.name,
        personalEmail: credentialData.personalEmail,
        officialEmail: credentialData.officialEmail,
        role: "employee",
        createdAt: new Date(),
      });

      try {
        await sendCredentialsEmail(credentialData);
        alert('User created successfully! Credentials have been sent to their personal email.');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        alert(`User created successfully! However, we couldn't send the credentials email. Please provide them manually.`);
      }

      setCredentialData({ name: '', personalEmail: '', officialEmail: '', password: '' });
      setShowCredentialForm(false);
    } catch (error) {
      console.error('Error creating user:', error);
      alert(`Failed to create user: ${error.message}`);
    }
  };

  const buildHierarchy = (employees) => {
    const employeeMap = {};
    employees.forEach(emp => employeeMap[emp.id] = { ...emp, subordinates: [] });
    const hierarchy = [];
    employees.forEach(emp => {
      if (!emp.managerId) {
        hierarchy.push(employeeMap[emp.id]);
      } else if (employeeMap[emp.managerId]) {
        employeeMap[emp.managerId].subordinates.push(employeeMap[emp.id]);
      } else {
        hierarchy.push(employeeMap[emp.id]);
      }
    });
    return hierarchy;
  };

  const renderVisualHierarchy = (hierarchy, level = 0) => {
    if (!hierarchy || hierarchy.length === 0) return null;

    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center space-x-16">
          {hierarchy.map((employee) => (
            <motion.div key={employee.id} className="flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className={`${employee.cardColor} text-white rounded-xl shadow-lg w-56 p-4 transform hover:scale-105 transition-transform duration-200 cursor-pointer`}
                onClick={() => openModal(employee)}>
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold mr-3 shadow-md">
                    <span className="text-xl">{employee.avatarInitials}</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{employee.name}</div>
                    <div className="text-sm opacity-90">{employee.position}</div>
                    <div className="text-xs opacity-75">{employee.department}</div>
                  </div>
                </div>
                <div className="text-xs mt-3 space-y-1">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {employee.contact}
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {employee.email}
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Joined: {new Date(employee.joiningDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-3 flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleEdit(employee)} className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </motion.button>
                  {!PROTECTED_ROLES.includes(employee.position) && (
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(employee.id)} className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  )}
                </div>
              </div>
              {employee.subordinates && employee.subordinates.length > 0 && (
                <>
                  <div className="w-1 h-20 bg-gradient-to-b from-blue-500 to-transparent"></div>
                  <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                    <div className="flex justify-center pt-4">
                      {employee.subordinates.map((subordinate) => (
                        <div key={subordinate.id} className="flex flex-col items-center px-4">
                          <div className="w-1 h-14 bg-gradient-to-b from-blue-500 to-transparent"></div>
                          {renderVisualHierarchy([subordinate], level + 1)}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const getManagerOptions = () => employees.filter(emp => emp.id !== formData.id).map(emp => (
    <option key={emp.id} value={emp.id}>{emp.name} ({emp.position})</option>
  ));

  const getEmployeeDetails = (id) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? `${employee.name} (${employee.position})` : 'None';
  };

  const EmployeeModal = ({ employee, onClose }) => {
    if (!employee) return null;

    const dummyProjects = [
      { id: '1', name: 'Project Alpha', status: 'In Progress', deadline: '2023-12-31' },
      { id: '2', name: 'Project Beta', status: 'Completed', deadline: '2023-06-30' },
      { id: '3', name: 'Project Gamma', status: 'On Hold', deadline: '2024-03-15' }
    ];

    const dummyPayroll = [
      { month: 'January 2023', salary: 5000, bonus: 500 },
      { month: 'February 2023', salary: 5000, bonus: 0 },
      { month: 'March 2023', salary: 5000, bonus: 1000 }
    ];

    const dummyCertifications = [
      { id: '1', name: 'Certified Scrum Master', issuer: 'Scrum Alliance', date: '2022-05-15' },
      { id: '2', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2021-11-20' },
    ];

    const dummySkills = ['JavaScript', 'React', 'Node.js', 'Project Management', 'Data Analysis'];

    const dummyAttendance = {
      totalDays: 220,
      absences: 5,
      rate: 97.7
    };

    const dummyPerformance = [70, 80, 90, 85, 95, 100];

    return (
      <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Employee Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className={`${employee.cardColor} w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4`}>
                {employee.avatarInitials}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{employee.name}</h3>
                <p className="text-gray-600">{employee.position} - {employee.department}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{employee.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="text-gray-800">{employee.contact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Joining Date</p>
                <p className="text-gray-800">{new Date(employee.joiningDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="text-gray-800">${employee.salary}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Manager</p>
                <p className="text-gray-800">{employee.managerName}</p>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Projects</h3>
            <div className="space-y-4">
              {dummyProjects.map(project => (
                <div key={project.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{project.name}</p>
                      <p className="text-sm text-gray-500">Deadline: {project.deadline}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payroll Details</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dummyPayroll.map((pay, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pay.month}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${pay.salary}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${pay.bonus}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${pay.salary + pay.bonus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Certifications</h3>
            <ul className="space-y-2">
              {dummyCertifications.map(cert => (
                <li key={cert.id} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-gray-800">{cert.name}</p>
                  <p className="text-sm text-gray-500">Issued by {cert.issuer} on {cert.date}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {dummySkills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Report</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Days Worked: {dummyAttendance.totalDays}</p>
              <p className="text-sm text-gray-500">Absences: {dummyAttendance.absences}</p>
              <p className="text-sm text-gray-500">Attendance Rate: {dummyAttendance.rate}%</p>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Performance</h3>
            <div className="flex items-end space-x-2 h-32">
              {dummyPerformance.map((score, index) => (
                <div key={index} className="w-8 bg-blue-500 rounded-t" style={{ height: `${score}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => <span key={month}>{month}</span>)}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const ZoomControls = ({ zoomIn, zoomOut, resetTransform }) => (
    <motion.div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-xl p-3 flex space-x-3 z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <motion.button whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }} whileTap={{ scale: 0.95 }} onClick={() => zoomIn()} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors" title="Zoom In">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </motion.button>
      <motion.button whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }} whileTap={{ scale: 0.95 }} onClick={() => zoomOut()} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors" title="Zoom Out">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </motion.button>
      <motion.button whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }} whileTap={{ scale: 0.95 }} onClick={() => resetTransform()} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors" title="Reset View">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
      </motion.button>
    </motion.div>
  );

  const hierarchy = buildHierarchy(employees);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 className="text-3xl font-bold text-gray-800" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>Employees</motion.h1>
          <div className="flex space-x-4 items-center">
            <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-sm">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setViewType('hierarchy')} className={`px-4 py-2 rounded-lg ${viewType === 'hierarchy' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-gray-700'}`}>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  <span>Hierarchy</span>
                </div>
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setViewType('list')} className={`px-4 py-2 rounded-lg ${viewType === 'list' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-gray-700'}`}>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>List</span>
                </div>
              </motion.button>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowForm(!showForm)} className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 shadow-md flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>{showForm ? 'Cancel' : 'Add Employee'}</span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCredentialForm(!showCredentialForm)} className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-700 hover:to-green-600 shadow-md flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>{showCredentialForm ? 'Cancel' : 'Create Employee Credentials'}</span>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div className="bg-white p-6 mb-8 rounded-2xl shadow-xl" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">{editMode ? 'Edit Employee' : 'Add New Employee'}</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" required placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" required placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position/Role *</label>
                    <select name="position" value={formData.position} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]" required>
                      <option value="">Select a Role</option>
                      {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <select name="department" value={formData.department} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSI2Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]" required>
                      <option value="">Select a Department</option>
                      {DEPARTMENTS.map(department => <option key={department} value={department}>{department}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                    <select name="managerId" value={formData.managerId || ''} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]">
                      <option value="">No Manager (Top Level)</option>
                      {getManagerOptions()}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date *</label>
                    <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" required placeholder="75000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact *</label>
                    <input type="tel" name="contact" value={formData.contact} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" required placeholder="123-456-7890" />
                  </div>
                </div>
                <div className="md:col-span-2 mt-4 flex justify-end space-x-3">
                  <motion.button type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={resetForm} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Cancel</span>
                  </motion.button>
                  <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 shadow-md flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{editMode ? 'Update Employee' : 'Add Employee'}</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCredentialForm && (
            <motion.div className="bg-white p-6 mb-8 rounded-2xl shadow-xl" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create User Credentials</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" name="name" value={credentialData.name} onChange={handleCredentialChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all" required placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Personal Email *</label>
                  <input type="email" name="personalEmail" value={credentialData.personalEmail} onChange={handleCredentialChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all" required placeholder="personal@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Official Email *</label>
                  <input type="email" name="officialEmail" value={credentialData.officialEmail} onChange={handleCredentialChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all" required placeholder="official@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input type="password" name="password" value={credentialData.password} onChange={handleCredentialChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all" required placeholder="••••••••" />
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <motion.button type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowCredentialForm(false)} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Cancel
                  </motion.button>
                  <motion.button onClick={handleCreateUser} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 shadow-md">
                    Create
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="bg-white rounded-2xl shadow-xl overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {viewType === 'hierarchy' && (
            <div className="min-w-full relative" style={{ height: '700px' }}>
              <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0} minScale={0.3} maxScale={2} centerOnInit={true}>
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <ZoomControls zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />
                    <TransformComponent wrapperStyle={{ width: "100%", height: "700px" }} contentStyle={{ width: "100%", padding: "40px" }}>
                      <div className="min-w-full">
                        {hierarchy.length > 0 ? renderVisualHierarchy(hierarchy) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500 text-lg">No employees found. Add some to get started!</p>
                          </div>
                        )}
                      </div>
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>
          )}
          {viewType === 'list' && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Employee List</h2>
              <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.length > 0 ? employees.map(employee => (
                      <motion.tr key={employee.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`${employee.cardColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-inner`}>
                              {employee.avatarInitials}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                              <div className="text-sm text-gray-500">{employee.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employee.position}</div>
                          <div className="text-xs text-gray-500">{new Date(employee.joiningDate).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${employee.department === 'Executive' ? 'bg-purple-100 text-purple-800' : employee.department === 'Finance' ? 'bg-blue-100 text-blue-800' : employee.department === 'Technology' ? 'bg-green-100 text-green-800' : employee.department === 'Human Resources' ? 'bg-yellow-100 text-yellow-800' : employee.department === 'Operations' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                            {employee.department}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.managerId ? getEmployeeDetails(employee.managerId) : 'None'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {employee.contact}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => openModal(employee)} className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200" title="View Details">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleEdit(employee)} className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200" title="Edit">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </motion.button>
                            {!PROTECTED_ROLES.includes(employee.position) && (
                              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(employee.id)} className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200" title="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </motion.button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500 text-lg">No employees found. Add some to get started!</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      {isModalOpen && <EmployeeModal employee={selectedEmployee} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default Employees;
