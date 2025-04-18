// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import { getUserRole } from "../utils/authUtils";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       const role = await getUserRole(user.email);
//       if (role === "admin") {
//         navigate("/admin/dashboard"); // Updated path
//       } else {
//         setError("You do not have admin access.");
//         await auth.signOut();
//       }
//     } catch (error) {
//       setError("Invalid email or password.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <form onSubmit={handleLogin} className="p-4 bg-white shadow-md rounded">
//         <h2 className="text-2xl mb-4">Admin Login</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mb-2 p-2 border rounded w-full"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mb-4 p-2 border rounded w-full"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;

// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import { getUserRole } from "../utils/authUtils";
// import { Lock, Mail, AlertCircle } from "lucide-react";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
    
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       const role = await getUserRole(user.email);
//       if (role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         setError("You do not have admin access.");
//         await auth.signOut();
//       }
//     } catch (error) {
//       setError("Invalid email or password.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
//         <div className="text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
//             <Lock className="w-8 h-8 text-blue-600" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
//           <p className="mt-2 text-gray-600">Enter your credentials to access the admin dashboard</p>
//         </div>
        
//         {error && (
//           <div className="p-4 rounded-md bg-red-50 flex items-start">
//             <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         )}
        
//         <form onSubmit={handleLogin} className="space-y-6">
//           <div className="space-y-2">
//             <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="admin@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="pl-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//           </div>
          
//           <div className="space-y-2">
//             <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="pl-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//           </div>
          
//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition duration-150 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.01]'}`}
//             >
//               {isLoading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </div>
//         </form>
        
//         <div className="text-center pt-2">
//           <p className="text-sm text-gray-500">
//             Forgot your password? Contact system administrator
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/authUtils";
import { Lock, Mail, AlertCircle, ChevronRight, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const role = await getUserRole(user.email);
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        setError("You do not have admin access.");
        await auth.signOut();
      }
    } catch (error) {
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100">
      <div 
        className={`w-full max-w-md p-8 space-y-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl transform transition-all duration-700 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 mb-6 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className={`w-10 h-10 text-white transition-all duration-700 ${isLoading ? 'animate-spin opacity-0' : 'opacity-100'}`} />
              <Loader2 className={`absolute w-10 h-10 text-white animate-spin transition-all duration-700 ${isLoading ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            <div className="absolute inset-0 border-4 border-white border-opacity-30 rounded-full"></div>
          </div>
          <h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-700 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Admin Portal</h2>
          <p className={`mt-2 text-gray-600 transition-all duration-700 delay-100 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Enter your credentials to access the dashboard</p>
        </div>
        
        {error && (
          <div className="p-4 rounded-md bg-red-50 flex items-start animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5 animate-pulse" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className={`space-y-2 transition-all duration-700 delay-200 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <label htmlFor="email" className="text-sm font-medium text-indigo-700">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-indigo-400 group-hover:text-indigo-600 transition-colors duration-300" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 mt-1 block w-full border border-indigo-200 rounded-lg shadow-sm py-3 px-4 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white bg-opacity-70 backdrop-blur-sm"
                required
              />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>
          
          <div className={`space-y-2 transition-all duration-700 delay-300 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <label htmlFor="password" className="text-sm font-medium text-indigo-700">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-indigo-400 group-hover:text-indigo-600 transition-colors duration-300" />
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 mt-1 block w-full border border-indigo-200 rounded-lg shadow-sm py-3 px-4 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white bg-opacity-70 backdrop-blur-sm"
                required
              />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-400 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:shadow-lg overflow-hidden"
            >
              <span className="absolute right-0 inset-y-0 flex items-center pr-3 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4">
                <ChevronRight className="h-5 w-5" />
              </span>
              <span className="inline-flex items-center transition-all duration-300 group-hover:pr-4">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Signing in...
                  </>
                ) : (
                  'Sign in to Dashboard'
                )}
              </span>
            </button>
          </div>
        </form>
        
        <div className={`text-center pt-2 transition-all duration-700 delay-500 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <p className="text-sm text-indigo-500 hover:text-indigo-700 transition-colors duration-300 cursor-pointer">
            Forgot your password? Contact system administrator
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;