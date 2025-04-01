// src/pages/admin/Dashboard.jsx
// import React from 'react';
// import Header from '../../components/Header';
// import WelcomeMessage from '../../components/WelcomeMessage';
// import MetricsCard from '../../components/MetricsCard';
// import AttendanceReport from '../../components/AttendanceReport';
// import TaskHeader from '../../components/TaskHeader';
// import TaskStatusOverview from '../../components/TaskStatusOverview';
// import TaskCard from '../../components/TaskCard';

// const metrics = [
//   {
//     title: 'Total Employees',
//     value: '173',
//     change: '+0.18%',
//     changeDirection: 'increase',
//     additionalInfo: '+16 from last month',
//     buttonText: 'Details',
//   },
//   {
//     title: 'Job Applicants',
//     value: '983',
//     change: '+2.4%',
//     changeDirection: 'increase',
//     additionalInfo: '+32 from last month',
//     buttonText: 'Details',
//   },
//   {
//     title: 'Total Revenue',
//     value: '$4,842.00',
//     change: '+0.2%',
//     changeDirection: 'increase',
//     additionalInfo: '+$33.00 from last month',
//     buttonText: 'Details',
//   },
//   {
//     title: 'Attendance Rate',
//     value: '75%',
//     change: '-1.7%',
//     changeDirection: 'decrease',
//     additionalInfo: '-6.4% from last month',
//     buttonText: 'Details',
//   },
// ];

// const tasks = [
//   {
//     category: 'Recruitment',
//     title: 'Employee Onboarding Approval',
//     description: 'A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.',
//   },
//   {
//     category: 'Finance',
//     title: 'Payroll Processing Compensation',
//     description: 'HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10.',
//     imageUrl: 'https://via.placeholder.com/64',
//   },
//   {
//     category: 'Feedback',
//     title: 'Employee Satisfaction Survey Engagement',
//     description: 'The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement.',
//     imageUrl: 'https://via.placeholder.com/64',
//   },
// ];

// const Dashboard = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       <Header />
//       <WelcomeMessage />
//       <div className="mt-4">
//         <div className="flex flex-wrap gap-4">
//           <div className="w-full md:w-1/3 lg:w-1/4">
//             <MetricsCard {...metrics[0]} />
//           </div>
//           <div className="w-full md:w-1/3 lg:w-1/4">
//             <MetricsCard {...metrics[1]} />
//           </div>
//           <div className="w-full md:w-1/3 lg:w-2/4">
//             <AttendanceReport />
//           </div>
//           <div className="w-full md:w-1/2 lg:w-1/4">
//             <MetricsCard {...metrics[2]} />
//           </div>
//           <div className="w-full md:w-1/2 lg:w-1/4">
//             <MetricsCard {...metrics[3]} />
//           </div>
//         </div>
//       </div>
//       <div className="mt-8">
//         <TaskHeader />
//         <TaskStatusOverview />
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//           {tasks.map((task, index) => (
//             <TaskCard key={index} {...task} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import Header from "../../components/Header";
import WelcomeMessage from "../../components/WelcomeMessage";
import MetricsCard from "../../components/MetricsCard";
import AttendanceReport from "../../components/AttendanceReport";
import TaskHeader from "../../components/TaskHeader";
import TaskStatusOverview from "../../components/TaskStatusOverview";
import TaskCard from "../../components/TaskCard";

// Define data for metrics cards
const metrics = [
  {
    title: "Total Employees",
    value: "173",
    change: "+0.18%",
    changeDirection: "increase",
    additionalInfo: "+16 from last month",
    buttonText: "Details",
  },
  {
    title: "Job Applicants",
    value: "983",
    change: "+2.4%",
    changeDirection: "increase",
    additionalInfo: "+32 from last month",
    buttonText: "Details",
  },
  {
    title: "Total Revenue",
    value: "$4,842.00",
    change: "+0.2%",
    changeDirection: "increase",
    additionalInfo: "+$33.00 from last month",
    buttonText: "Details",
  },
  {
    title: "Attendance Rate",
    value: "75%",
    change: "-1.7%",
    changeDirection: "decrease",
    additionalInfo: "-6.4% from last month",
    buttonText: "Details",
  },
];

// Define data for task cards
const tasks = [
  {
    category: "Recruitment",
    title: "Employee Onboarding Approval",
    description:
      "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
  },
  {
    category: "Finance",
    title: "Payroll Processing Compensation",
    description:
      "HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10.",
    imageUrl: "https://via.placeholder.com/64",
  },
  {
    category: "Feedback",
    title: "Employee Satisfaction Survey Engagement",
    description:
      "The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement.",
    imageUrl: "https://via.placeholder.com/64",
  },
];

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Header with search and icons */}
      <Header />

      {/* Welcome message section */}
      <WelcomeMessage />

      {/* Metrics and Attendance Section */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <MetricsCard {...metrics[0]} />
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4">
            <MetricsCard {...metrics[1]} />
          </div>
          <div className="w-full md:w-1/3 lg:w-2/4">
            <AttendanceReport />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4">
            <MetricsCard {...metrics[2]} />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4">
            <MetricsCard {...metrics[3]} />
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="mt-8">
        <TaskHeader />
        <TaskStatusOverview />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {tasks.map((task, index) => (
            <TaskCard key={index} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;