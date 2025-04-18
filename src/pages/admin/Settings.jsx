// import React, { useState, useEffect } from 'react';

// const Settings = () => {
//   const modules = [
//     'Attendance',
//     'Calendar',
//     'Dashboard',
//     'Employees',
//     'Help',
//     'Hiring',
//     'Payroll',
//     'Projects',
//     'Reports',
//     'Tasks',
//   ];

//   // Initialize state from localStorage or default to all modules enabled
//   const [enabledModules, setEnabledModules] = useState(() => {
//     const savedSettings = localStorage.getItem('enabledModules');
//     if (savedSettings) {
//       return JSON.parse(savedSettings);
//     }
//     // Default all modules to enabled if no settings exist
//     return modules.reduce((acc, module) => {
//       acc[module] = true;
//       return acc;
//     }, {});
//   });

//   // Update localStorage whenever enabledModules changes
//   useEffect(() => {
//     localStorage.setItem('enabledModules', JSON.stringify(enabledModules));
//   }, [enabledModules]);

//   // Toggle module state on checkbox change
//   const handleCheckboxChange = (module) => {
//     setEnabledModules((prev) => ({
//       ...prev,
//       [module]: !prev[module],
//     }));
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl mb-4">Module Settings for Employees</h2>
//       <div className="space-y-2">
//         {modules.map((module) => (
//           <div key={module} className="flex items-center">
//             <input
//               type="checkbox"
//               id={module}
//               checked={enabledModules[module]}
//               onChange={() => handleCheckboxChange(module)}
//               className="mr-2"
//             />
//             <label htmlFor={module}>{module}</label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Settings;

import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Check, Calendar, Clock, BarChart3, Users, HelpCircle, 
  UserPlus, DollarSign, Briefcase, FileText, CheckSquare } from 'lucide-react';

const Settings = () => {
  const modules = [
    { name: 'Dashboard', icon: BarChart3, color: 'from-blue-500 to-indigo-600' },
    { name: 'Employees', icon: Users, color: 'from-purple-500 to-violet-600' },
    { name: 'Attendance', icon: Clock, color: 'from-teal-500 to-emerald-600' },
    { name: 'Calendar', icon: Calendar, color: 'from-amber-500 to-orange-600' },
    { name: 'Payroll', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
    { name: 'Hiring', icon: UserPlus, color: 'from-rose-500 to-pink-600' },
    { name: 'Projects', icon: Briefcase, color: 'from-cyan-500 to-blue-600' },
    { name: 'Tasks', icon: CheckSquare, color: 'from-fuchsia-500 to-purple-600' },
    { name: 'Reports', icon: FileText, color: 'from-sky-500 to-blue-600' },
    { name: 'Help', icon: HelpCircle, color: 'from-amber-500 to-yellow-600' },
  ];

  // Initialize state from localStorage or default to all modules enabled
  const [enabledModules, setEnabledModules] = useState(() => {
    const savedSettings = localStorage.getItem('enabledModules');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    // Default all modules to enabled if no settings exist
    return modules.reduce((acc, module) => {
      acc[module.name] = true;
      return acc;
    }, {});
  });

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Update localStorage whenever enabledModules changes
  useEffect(() => {
    localStorage.setItem('enabledModules', JSON.stringify(enabledModules));
  }, [enabledModules]);

  // Toggle module state on checkbox change
  const handleToggle = (moduleName) => {
    setEnabledModules((prev) => ({
      ...prev,
      [moduleName]: !prev[moduleName],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 transform ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center">
          <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
            <SettingsIcon className="h-6 w-6 text-white animate-spin-slow" />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-white">Module Settings</h2>
            <p className="text-blue-100">Configure which modules are available to employees</p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {modules.map((module, index) => (
              <div 
                key={module.name}
                className={`bg-white border rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 transform ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: `${150 + index * 50}ms` }}
              >
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${module.color} flex items-center justify-center shadow-sm`}>
                    <module.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-3 font-medium text-gray-700">{module.name}</span>
                </div>

                <button
                  onClick={() => handleToggle(module.name)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    enabledModules[module.name] ? `bg-gradient-to-r ${module.color}` : 'bg-gray-200'
                  }`}
                >
                  <span 
                    className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow transform transition-transform duration-300 flex items-center justify-center ${
                      enabledModules[module.name] ? 'translate-x-6' : ''
                    }`}
                  >
                    {enabledModules[module.name] && <Check className="h-3 w-3 text-indigo-500" />}
                  </span>
                </button>
              </div>
            ))}
          </div>
          
          <div className={`mt-6 flex justify-end transition-all duration-700 delay-700 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-lg shadow hover:shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;