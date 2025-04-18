// import React from "react";
// import { Link } from "react-router-dom";
// import './index.css'

// const App = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-4xl mb-8">HR Management Dashboard</h1>
//       <div className="space-x-4">
//         <Link to="/admin-login" className="bg-blue-500 text-white p-2 rounded">
//           Admin Login
//         </Link>
//         <Link to="/employee-login" className="bg-green-500 text-white p-2 rounded">
//           Employee Login
//         </Link>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, ShieldCheck, ChevronRight, Briefcase } from "lucide-react";
import './index.css';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [hoverAdmin, setHoverAdmin] = useState(false);
  const [hoverEmployee, setHoverEmployee] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-300 to-indigo-400 opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-pink-300 to-purple-400 opacity-20 blur-3xl animate-float-delayed"></div>
        <div className="absolute top-2/3 left-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 opacity-20 blur-3xl animate-float-slow"></div>
      </div>

      <div className={`relative z-10 max-w-2xl w-full p-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl transform transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="flex items-center justify-center mb-8">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg transform transition-transform duration-500 hover:scale-110">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <div className="ml-4">
            <h1 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-1000 delay-300 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              HR Management
            </h1>
            <p className={`text-lg text-gray-600 transition-all duration-1000 delay-500 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Select your portal to continue
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link 
            to="/admin-login" 
            className={`relative group p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '700ms' }}
            onMouseEnter={() => setHoverAdmin(true)} 
            onMouseLeave={() => setHoverAdmin(false)}
          >
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className={`h-6 w-6 text-white transition-transform duration-500 ${hoverAdmin ? 'rotate-12' : ''}`} />
              </div>
              <div className="ml-4 flex-grow">
                <h2 className="text-xl font-semibold text-indigo-700">Admin Portal</h2>
                <p className="text-sm text-gray-600">Access management tools and settings</p>
              </div>
              <ChevronRight className={`h-5 w-5 text-indigo-500 transition-all duration-300 transform ${hoverAdmin ? 'translate-x-1 opacity-100' : 'opacity-50'}`} />
            </div>
          </Link>

          <Link 
            to="/employee-login" 
            className={`relative group p-6 bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '900ms' }}
            onMouseEnter={() => setHoverEmployee(true)} 
            onMouseLeave={() => setHoverEmployee(false)}
          >
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-teal-500 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <Users className={`h-6 w-6 text-white transition-transform duration-500 ${hoverEmployee ? 'rotate-12' : ''}`} />
              </div>
              <div className="ml-4 flex-grow">
                <h2 className="text-xl font-semibold text-teal-700">Employee Portal</h2>
                <p className="text-sm text-gray-600">Access your profile and requests</p>
              </div>
              <ChevronRight className={`h-5 w-5 text-teal-500 transition-all duration-300 transform ${hoverEmployee ? 'translate-x-1 opacity-100' : 'opacity-50'}`} />
            </div>
          </Link>
        </div>

        <div className={`mt-8 text-center transition-all duration-1000 delay-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <p className="text-sm text-gray-500">
            © 2025 HR Management System • <span className="text-indigo-500 hover:text-indigo-700 transition-colors duration-300 cursor-pointer">Help</span> • <span className="text-indigo-500 hover:text-indigo-700 transition-colors duration-300 cursor-pointer">Privacy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;