// import React from "react";
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
// import { useNavigate } from "react-router-dom";

// const EmployeeLogin = () => {
//   const navigate = useNavigate();

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate("/employee-dashboard");
//     } catch (error) {
//       console.error("Error logging in with Google:", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <button onClick={handleGoogleLogin} className="bg-red-500 text-white p-4 rounded">
//         Login with Google
//       </button>
//     </div>
//   );
// };

// export default EmployeeLogin;

// import React from "react";
// import { signInWithPopup } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
// import { auth, googleProvider, db } from "../firebase"; // Import db
// import { useNavigate } from "react-router-dom";

// const EmployeeLogin = () => {
//   const navigate = useNavigate();

//   const handleGoogleLogin = async () => {
//     try {
//       // Perform Google login
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       // Save user details to Firestore "users" collection
//       await setDoc(doc(db, "users", user.uid), {
//         name: user.displayName,
//         email: user.email,
//       }, { merge: true });

//       // Redirect to employee dashboard
//       navigate("/employee-dashboard");
//     } catch (error) {
//       console.error("Error logging in with Google:", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <button onClick={handleGoogleLogin} className="bg-red-500 text-white p-4 rounded">
//         Login with Google
//       </button>
//     </div>
//   );
// };
// export default EmployeeLogin;

// import React from 'react';
// import { signInWithPopup } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, googleProvider, db } from '../firebase';
// import { useNavigate } from 'react-router-dom';

// const EmployeeLogin = () => {
//   const navigate = useNavigate();

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       await setDoc(
//         doc(db, 'users', user.uid),
//         {
//           name: user.displayName,
//           email: user.email,
//         },
//         { merge: true }
//       );

//       navigate('/employee/dashboard'); // Updated redirect
//     } catch (error) {
//       console.error('Error logging in with Google:', error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <button onClick={handleGoogleLogin} className="bg-red-500 text-white p-4 rounded">
//         Login with Google
//       </button>
//     </div>
//   );
// };

// export default EmployeeLogin;

import React, { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { LogIn, ChevronRight, Loader2 } from 'lucide-react';

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(
        doc(db, 'users', user.uid),
        {
          name: user.displayName,
          email: user.email,
        },
        { merge: true }
      );

      navigate('/employee/dashboard');
    } catch (error) {
      console.error('Error logging in with Google:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 via-cyan-50 to-blue-100">
      <div 
        className={`w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl transform transition-all duration-700 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 mb-6 overflow-hidden group animate-pulse-slow">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-400 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <LogIn className={`w-10 h-10 text-white transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`} />
              <Loader2 className={`absolute w-10 h-10 text-white animate-spin transition-all duration-700 ${isLoading ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            <div className="absolute inset-0 border-4 border-white border-opacity-30 rounded-full"></div>
          </div>
          <h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600 transition-all duration-700 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Employee Portal
          </h2>
          <p className={`mt-2 text-gray-600 transition-all duration-700 delay-100 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Sign in with your Google account to access the dashboard
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className={`w-3/4 border-t border-gray-200 transition-all duration-700 delay-200 ${fadeIn ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
        </div>
        
        <div className={`transition-all duration-700 delay-300 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transform transition-all duration-300 hover:shadow-lg overflow-hidden"
          >
            <div className="absolute left-0 inset-y-0 flex items-center justify-center w-12 transition-all duration-300">
              <svg viewBox="0 0 24 24" width="24" height="24" className="transition-transform duration-300 group-hover:scale-110">
                <path
                  fill="#ffffff"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#ffffff"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#ffffff"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#ffffff"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
            <span className="ml-8 inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  Signing in...
                </>
              ) : (
                'Sign in with Google'
              )}
            </span>
            <span className="absolute right-4 inset-y-0 flex items-center transition-all duration-300 opacity-0 group-hover:opacity-100">
              <ChevronRight className="h-5 w-5 text-white" />
            </span>
          </button>
        </div>
        
        <div className={`text-center pt-6 transition-all duration-700 delay-400 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <p className="text-sm text-gray-500">
            By signing in, you agree to our <span className="text-teal-500 hover:text-teal-700 transition-colors duration-300 cursor-pointer">Terms of Service</span> and <span className="text-teal-500 hover:text-teal-700 transition-colors duration-300 cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;