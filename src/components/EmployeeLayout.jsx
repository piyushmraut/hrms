// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import EmployeeSidebar from './EmployeeSidebar';

// const EmployeeLayout = () => {
//   return (
//     <div className="flex">
//       <EmployeeSidebar />
//       <div className="flex-1 p-4">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default EmployeeLayout;

import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';

const EmployeeLayout = () => {
  return (
    <div className="flex h-screen">
      <EmployeeSidebar />
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeLayout;