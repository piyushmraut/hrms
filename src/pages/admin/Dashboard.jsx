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

// import React from "react";
// import Header from "../../components/Header";
// import WelcomeMessage from "../../components/WelcomeMessage";
// import MetricsCard from "../../components/MetricsCard";
// import AttendanceReport from "../../components/AttendanceReport";
// import TaskHeader from "../../components/TaskHeader";
// import TaskStatusOverview from "../../components/TaskStatusOverview";
// import TaskCard from "../../components/TaskCard";

// // Define data for metrics cards
// const metrics = [
//   {
//     title: "Total Employees",
//     value: "173",
//     change: "+0.18%",
//     changeDirection: "increase",
//     additionalInfo: "+16 from last month",
//     buttonText: "Details",
//   },
//   {
//     title: "Job Applicants",
//     value: "983",
//     change: "+2.4%",
//     changeDirection: "increase",
//     additionalInfo: "+32 from last month",
//     buttonText: "Details",
//   },
//   {
//     title: "Total Revenue",
//     value: "$4,842.00",
//     change: "+0.2%",
//     changeDirection: "increase",
//     additionalInfo: "+$33.00 from last month",
//     buttonText: "Details",
//   },
//   {
//     title: "Attendance Rate",
//     value: "75%",
//     change: "-1.7%",
//     changeDirection: "decrease",
//     additionalInfo: "-6.4% from last month",
//     buttonText: "Details",
//   },
// ];

// // Define data for task cards
// const tasks = [
//   {
//     category: "Recruitment",
//     title: "Employee Onboarding Approval",
//     description:
//       "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
//   },
//   {
//     category: "Finance",
//     title: "Payroll Processing Compensation",
//     description:
//       "HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10.",
//     imageUrl: "https://via.placeholder.com/64",
//   },
//   {
//     category: "Feedback",
//     title: "Employee Satisfaction Survey Engagement",
//     description:
//       "The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement.",
//     imageUrl: "https://via.placeholder.com/64",
//   },
// ];

// const Dashboard = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       {/* Header with search and icons */}
//       <Header />

//       {/* Welcome message section */}
//       <WelcomeMessage />

//       {/* Metrics and Attendance Section */}
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

//       {/* Tasks Section */}
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

// import React from 'react';
// // import { useAuth } from '../context/AuthContext';
// import { MagnifyingGlassIcon, BellIcon, UserIcon, CalendarIcon, FunnelIcon } from "@heroicons/react/24/outline";

// // Data Panel Component
// function DataPanel({ title, value, percentageChange, additionalInfo, changeColor }) {
//   return (
//     <div className="bg-white p-4 rounded-md shadow-md">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <h2 className="text-lg font-semibold">{title}</h2>
//           <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
//         </div>
//         <span className="text-gray-500">⋮</span>
//       </div>
//       <p className="text-3xl font-bold mt-2">{value}</p>
//       <p className={`text-${changeColor}-500 mt-1`}>{percentageChange}</p>
//       <p className="text-gray-500 text-sm mt-1">{additionalInfo}</p>
//       <a href="#" className="text-blue-500 text-sm mt-2 inline-block">Details</a>
//     </div>
//   );
// }

// // Attendance Report Component
// function AttendanceReport() {
//   return (
//     <div className="bg-white p-4 rounded-md shadow-md">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <h2 className="text-lg font-semibold">Attendance Report</h2>
//           <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
//         </div>
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-1">
//             <CalendarIcon className="w-5 h-5 text-gray-500" />
//             <span>01 March 2025 - ...</span>
//             <FunnelIcon className="w-5 h-5 text-gray-500" />
//           </div>
//           <span className="text-gray-500">⋮</span>
//         </div>
//       </div>
//       {/* Heatmap Placeholder */}
//       <div className="mt-4 grid grid-cols-6 gap-1">
//         {Array.from({ length: 30 }).map((_, index) => (
//           <div key={index} className="w-8 h-8 bg-blue-300"></div>
//         ))}
//       </div>
//       {/* Summary Stats */}
//       <div className="flex justify-between mt-4 text-sm">
//         <p>Total Employ: 173</p>
//         <p>On Time: 128</p>
//         <p>Absent: 21</p>
//         <p>Late: 24</p>
//       </div>
//     </div>
//   );
// }

// // Task Category Component
// function TaskCategory({ name, count, color }) {
//   return (
//     <div className={`bg-${color}-100 p-2 rounded-md flex justify-between items-center w-1/3`}>
//       <span>{name}</span>
//       <span>{count}</span>
//       <button className={`bg-${color}-500 text-white px-2 py-1 rounded`}>+</button>
//     </div>
//   );
// }

// // Task Card Component
// function TaskCard({ category1, color1, category2, color2, title, description }) {
//   return (
//     <div className="bg-white p-4 rounded-md shadow-md">
//       <div className="flex space-x-2">
//         <button className={`bg-${color1}-500 text-white px-2 py-1 rounded`}>{category1}</button>
//         <button className={`bg-${color2}-500 text-white px-2 py-1 rounded`}>{category2}</button>
//       </div>
//       <h3 className="text-lg font-semibold mt-2">{title}</h3>
//       <p className="text-gray-500 mt-1">{description}</p>
//     </div>
//   );
// }

// // Main Dashboard Component
// function Dashboard() {
//   const { userName } = "piyush";
//   const date = new Date();
//   const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = date.toLocaleDateString('en-US', { month: 'long' });
//   const year = date.getFullYear();
//   const currentDate = `${weekday}, ${day} ${month} ${year}`;

//   return (
//     <div className="p-4">
//       {/* Header */}
//       <div className="bg-white p-4 shadow-md rounded-md">
//         <div className="flex justify-between items-center">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-4 py-2 border rounded-md w-64"
//             />
//             <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
//           </div>
//           <div className="flex items-center space-x-4">
//             <BellIcon className="w-6 h-6 text-gray-500" />
//             <UserIcon className="w-6 h-6 text-gray-500" />
//           </div>
//         </div>
//         <div className="mt-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">Hallo, {userName || "Arnold Smith"}</h1>
//             <p className="text-gray-500">{currentDate}</p>
//           </div>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="mt-6 flex space-x-6">
//         {/* Left Column: Data Panels */}
//         <div className="flex-1 space-y-4">
//           <DataPanel
//             title="Total Employees"
//             value="173"
//             percentageChange="+1.8%"
//             additionalInfo="+6 from last month"
//             changeColor="green"
//           />
//           <DataPanel
//             title="Job Applicant"
//             value="983"
//             percentageChange="+2.4%"
//             additionalInfo="+32 from last month"
//             changeColor="green"
//           />
//           <DataPanel
//             title="Total Revenue"
//             value="$4,842.00"
//             percentageChange="+4.2%"
//             additionalInfo="+$834.00 from last month"
//             changeColor="green"
//           />
//           <DataPanel
//             title="Attendance Rate"
//             value="75%"
//             percentageChange="-6.4%"
//             additionalInfo="-6.4% from last month"
//             changeColor="red"
//           />
//         </div>
//         {/* Right Column: Attendance Report */}
//         <div className="w-1/3">
//           <AttendanceReport />
//         </div>
//       </div>

//       {/* Task Section */}
//       <div className="mt-6 bg-white p-4 rounded-md shadow-md">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <h2 className="text-lg font-semibold">Task</h2>
//             <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-1">
//               <CalendarIcon className="w-5 h-5 text-gray-500" />
//               <span>01 March 2025 - ...</span>
//               <FunnelIcon className="w-5 h-5 text-gray-500" />
//             </div>
//             <span className="text-gray-500">⋮</span>
//           </div>
//         </div>
//         {/* View Options and Filter */}
//         <div className="mt-4 flex justify-between items-center">
//           <div className="space-x-4">
//             <span className="text-gray-700 font-semibold">Kanban</span>
//             <span className="text-gray-500">Table</span>
//             <span className="text-gray-500">List View</span>
//           </div>
//           <button className="text-gray-500">Filter ▼</button>
//         </div>
//         {/* Task Categories */}
//         <div className="mt-4 flex space-x-4">
//           <TaskCategory name="New Request" count="3" color="blue" />
//           <TaskCategory name="In Progress" count="6" color="orange" />
//           <TaskCategory name="Complete" count="12" color="green" />
//         </div>
//         {/* Task Cards */}
//         <div className="mt-4 space-y-4">
//           <TaskCard
//             category1="Recruitment"
//             color1="blue"
//             category2="Compliance"
//             color2="green"
//             title="Employee Onboarding Approval"
//             description="New onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team."
//           />
//           <TaskCard
//             category1="Finance"
//             color1="pink"
//             category2="Compensation"
//             color2="orange"
//             title="Payroll Processing"
//             description="HR and the finance team are calculating salaries, bonuses, tax deductions, and any overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10."
//           />
//           <TaskCard
//             category1="Feedback"
//             color1="purple"
//             category2="Engagement"
//             color2="blue"
//             title="Employee Satisfaction Survey"
//             description="The HR team has gathered feedback from all employees and is now analyzing the results to identify key areas for improvement."
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// import React from "react";

// const Dashboard = () => {
//   return (
//     <div className="bg-gray-100 text-gray-800 p-4">
//       {/* Search Bar */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="relative w-1/3">
//           <input type="text" className="w-full p-2 pl-10 border rounded-lg" placeholder="Search..." />
//           <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
//         </div>
//         <div className="flex space-x-4">
//           <i className="fas fa-bell text-gray-400"></i>
//           <i className="fas fa-cog text-gray-400"></i>
//         </div>
//       </div>

//       {/* Notification Banner */}
//       <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mb-4">
//         Optimize your Efficio experience—track attendance, manage teams, and streamline HR operations effortlessly!
//       </div>

//       {/* Header */}
//       <div className="mb-4">
//         <h1 className="text-2xl font-bold">Hallo, Arnold Smith</h1>
//         <p className="text-gray-500">Wednesday, 06 March 2025</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//         {[
//           { title: "Total Employees", count: 173, change: "1.8%", details: "+16 from last month", icon: "fa-arrow-up", color: "text-green-500" },
//           { title: "Job Applicant", count: 983, change: "2.4%", details: "+32 from last month", icon: "fa-arrow-up", color: "text-green-500" },
//           { title: "Total Revenue", count: "$4,842.00", change: "4.2%", details: "+$3,834.00 from last month", icon: "fa-arrow-up", color: "text-green-500" },
//           { title: "Attendance Rate", count: "75%", change: "-1.7%", details: "-6.4% from last month", icon: "fa-arrow-down", color: "text-red-500" }
//         ].map((stat, index) => (
//           <div key={index} className="bg-white p-4 rounded-lg shadow">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-gray-500">{stat.title}</h2>
//               <i className="fas fa-ellipsis-h text-gray-400"></i>
//             </div>
//             <div className="text-3xl font-bold">{stat.count}</div>
//             <div className={`flex items-center ${stat.color}`}>
//               <i className={`fas ${stat.icon}`}></i>
//               <span className="ml-1">{stat.change}</span>
//             </div>
//             <p className="text-gray-500">{stat.details}</p>
//             <button className="mt-2 text-blue-500">Details</button>
//           </div>
//         ))}
//       </div>

//       {/* Attendance Report */}
//       <div className="bg-white p-4 rounded-lg shadow mb-4">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-gray-500">Attendance Report</h2>
//           <input type="date" className="border rounded-lg p-2" />
//         </div>
//       </div>

//       {/* Task Section */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-gray-500">Task</h2>
//           <div className="flex items-center space-x-2">
//             <button className="text-blue-500">Kanban</button>
//             <button className="text-gray-500">Table</button>
//             <button className="text-gray-500">List View</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React from 'react';

// const Dashboard = () => {
//   return (
//     <div className="p-5 bg-gray-100">
//       {/* Search Bar */}
//       <div className="flex justify-between items-center mb-5">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="p-2 border rounded-lg w-1/3"
//         />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Export</button>
//       </div>

//       {/* Greeting and Date */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">Hallo, Arnold Smith</h1>
//         <p className="text-gray-600">Wednesday, 06 March 2025</p>
//         <p className="text-gray-500">Optimize your Efficio experience—track attendance, manage teams, and streamline HR operations effortlessly!</p>
//       </div>

//       {/* Card Stats */}
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <Card title="Total Employees" value="173" change="+16 from last month" percentage="1.8%" />
//         <Card title="Job Applicant" value="983" change="+32 from last month" percentage="2.4%" />
//         <Card title="Total Revenue" value="$4,842.00" change="+$3,834.00 from last month" percentage="4.2%" />
//         <Card title="Attendance Rate" value="75%" change="-6.4 from last month" percentage="1.7%" />
//       </div>

//       {/* Attendance Report */}
//       <div className="bg-white p-5 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-3">Attendance Report</h2>
//         <div className="flex justify-between mb-4">
//           <span>173 Total Employees</span>
//           <select className="border rounded-lg p-1">
//             <option>01 March 2025</option>
//           </select>
//         </div>
//         <div className="flex justify-between mb-4">
//           <span>128 On Time</span>
//           <span>21 Absent</span>
//           <span>24 Late</span>
//         </div>
//         <AttendanceChart />
//       </div>

//       {/* Task Section */}
//       <div className="bg-white p-5 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-3">Task</h2>
//         <div className="flex justify-between mb-4">
//           <span>New Request: 3</span>
//           <span>In Progress: 6</span>
//           <span>Complete: 12</span>
//         </div>
//         <Task />
//       </div>
//     </div>
//   );
// };

// const Card = ({ title, value, change, percentage }) => {
//   return (
//     <div className="bg-white p-5 rounded-lg shadow-md">
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <h4 className="text-2xl font-bold">{value}</h4>
//       <p className="text-gray-500">{change}</p>
//       <p className={`text-sm ${percentage.includes('-') ? 'text-red-500' : 'text-green-500'}`}>{percentage}</p>
//     </div>
//   );
// };

// const AttendanceChart = () => {
//   return (
//     <div className="grid grid-cols-7 gap-1 mt-5">
//       {Array.from({ length: 35 }).map((_, index) => (
//         <div key={index} className="bg-blue-200 h-8 rounded-md"></div>
//       ))}
//     </div>
//   );
// };

// const Task = () => {
//   const tasks = [
//     {
//       title: "Employee Onboarding Approval",
//       desc: "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team."
//     },
//     {
//       title: "Payroll Processing",
//       desc: "HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10."
//     },
//     {
//       title: "Employee Satisfaction Survey",
//       desc: "The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement."
//     },
//   ];

//   return (
//     <div className="flex flex-col gap-4">
//       {tasks.map((task, index) => (
//         <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
//           <h3 className="font-semibold">{task.title}</h3>
//           <p className="text-gray-600">{task.desc}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { IoMdClose } from "react-icons/io";
import { FaFileAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";


const Dashboard = () => {
  return (
    <div className="bg-white text-gray-800 p-4">
      <SearchBar />
      <NotificationBanner />
      <Header />
      <MainContent />
      <TaskSection />
    </div>
  );
};

const SearchBar = () => {
    return (
      <div className="flex items-center justify-between p-4 bg-white mb-4">
        <div className="flex items-center bg-gray-100 rounded-lg p-2 w-1/3">
          <i className="fas fa-search text-gray-500"></i>
          <input
            type="text"
            className="bg-gray-100 outline-none ml-2 w-full"
            placeholder="Search..."
          />
          <div className="flex items-center ml-2">
            <span className="text-gray-500">⌘</span>
            <span className="text-gray-500 ml-1">K</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="bg-gray-100 p-2 rounded-lg">
            <i className="fas fa-plus text-gray-500"></i>
          </button>
          <button className="bg-gray-100 p-2 rounded-lg">
            <i className="fas fa-th-large text-gray-500"></i>
          </button>
          <button className="bg-gray-100 p-2 rounded-lg">
            <i className="fas fa-bell text-gray-500"></i>
          </button>
        </div>
      </div>
    );
  };
  

// Notification Banner Component
const NotificationBanner = () => {
  return (
    <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-4 flex justify-between">
    <div> Optimize your Efficio experience—track attendance, manage teams, and streamline HR operations effortlessly!</div>
      <div className='mt-1'><IoMdClose /></div>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <div className="mb-4 flex justify-between">
      <div>
      <h1 className="text-2xl font-bold">Hallo, Arnold Smith</h1>
      <p className="text-gray-500">Wednesday, 06 March 2025</p>
      </div>

      <div className='bg-blue-500 w-24 h-10 rounded-md'>
        

        <div className='flex mt-2 ml-4 gap-1'>
        <FaFileAlt className='text-white mt-1' />
        <h1 className=' text-white '> Export</h1>
        
        </div>
      </div>
    </div>
  );
};

// Main Content Component
const MainContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <StatsCards />
      <AttendanceReport />
    </div>
  );
};

// Stats Cards Component
const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        title="Total Employees"
        value="173"
        change="1.8%"
        changeIcon="fa-arrow-up"
        changeColor="text-green-500"
        subtext="+16 from last month"
        color="bg-green-200"
      />
      <StatCard
        title="Job Applicant"
        value="983"
        change="2.4%"
        changeIcon="fa-arrow-up"
        changeColor="text-green-500"
        subtext="+32 from last month"
        color="bg-green-200"
      />
      <StatCard
        title="Total Revenue"
        value="$4,842.00"
        change="4.2%"
        changeIcon="fa-arrow-up"
        changeColor="text-green-500"
        subtext="+$3,834.00 from last month"
        color="bg-green-200"
      />
      <StatCard
        title="Attendance Rate"
        value="75%"
        change="1.7%"
        changeIcon="fa-arrow-down"
        changeColor="text-red-500"
        subtext="-6.4% from last month"
        color="bg-red-200"
      />
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, change, changeIcon, changeColor, subtext,color}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-gray-500">{title}</h2>
        <i className="fas fa-ellipsis-h text-gray-400"></i>
      </div>
      <div className='flex gap-4 mt-4'>
      <div className="text-3xl font-bold">{value}</div>
      <div className={`flex items-center ${changeColor} mt-1 ${color} p-1 rounded-md`}>
        <i className={`fas ${changeIcon}`}></i>
        <span className="ml-1">{change}</span>
      </div>
      </div>
      <div className='flex justify-between mt-10 rounded-md bg-gray-100 p-2'>
      <p className="text-gray-500">{subtext}</p>
      <div className='bg-white border-2 border-solid border-blue-300 rounded-md flex px-1 gap-1'>
      <button className=" text-blue-600">Details</button>
      <FaArrowRight className='mt-1 text-blue-600' />

      </div>
      </div>
    </div>
  );
};

// Attendance Report Component
const AttendanceReport = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-gray-500">Attendance Report</h2>
        <div className="flex items-center space-x-2">
          <input type="date" className="border rounded-lg p-2" />
          <i className="fas fa-ellipsis-h text-gray-400"></i>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold">173</div>
          <div className="text-gray-500">Total Employ</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">128</div>
          <div className="text-gray-500">On Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">21</div>
          <div className="text-gray-500">Absent</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">24</div>
          <div className="text-gray-500">Late</div>
        </div>
      </div>
      <Heatmap />
    </div>
  );
};


const Heatmap = () => {
    const heatmapData = [
      ['bg-blue-200', 'bg-blue-200', 'bg-blue-300', 'bg-blue-300', 'bg-blue-400', 'bg-blue-200', 'bg-blue-500', 'bg-blue-500', 'bg-blue-500', 'bg-blue-400', 'bg-blue-200'],
      ['bg-blue-500', 'bg-blue-400', 'bg-blue-300', 'bg-blue-200', 'bg-blue-500', 'bg-blue-400', 'bg-blue-300', 'bg-blue-300', 'bg-blue-400', 'bg-blue-100', 'bg-blue-500'],
      ['bg-blue-500', 'bg-blue-500', 'bg-blue-400', 'bg-blue-400', 'bg-blue-300', 'bg-blue-300', 'bg-blue-200', 'bg-blue-200', 'bg-blue-300', 'bg-blue-300', 'bg-blue-400'],
      ['bg-blue-400', 'bg-blue-500', 'bg-blue-500', 'bg-blue-500', 'bg-blue-400', 'bg-blue-500', 'bg-blue-400', 'bg-blue-400', 'bg-blue-400', 'bg-blue-400', 'bg-blue-500'],
    ];
  
    const months = ['', 'Jan', '', 'Feb', '', 'Mar', '', 'Apr', '', 'May', ''];
    const verticalLabels = ['200', '100', '50', '10']; // Bottom to top
  
    return (
      <div className="flex">
        {/* Vertical labels */}
        <div className="flex flex-col justify-between mr-6 text-gray-500 text-center mb-8">
          {verticalLabels.map((label, index) => (
            <div key={index} className="h-10 flex items-center">{label}</div>
          ))}
        </div>
  
        {/* Heatmap and month labels */}
        <div>
          {heatmapData.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-11 gap-2 mb-2">
              {row.map((color, colIndex) => (
                <div 
                  key={colIndex} 
                  className={`h-10 w-10 ${color} rounded-md`} // Changed to square with w-10
                ></div>
              ))}
            </div>
          ))}
          <div className="grid grid-cols-11 gap-2 text-center text-gray-500">
            {months.map((month, index) => (
              <div key={index}>{month}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };


// TaskSection.jsx
const TaskSection = () => {
    return (
      <div className="bg-white p-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Task</h1>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"><i class="fas fa-th-large"></i> Kanban</button>
                <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-300">Table</button>
                <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-300">List View</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input type="date" className="border rounded px-4 py-2" defaultValue="2025-03-01" />
              <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-300">
                <i className="fas fa-filter"></i> Filter
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <TaskCard
              title="New Request"
              titleColor="text-blue-500"
              count="3"
              tags={[
                { label: "Recruitment", color: "bg-blue-500" },
                { label: "Compliance", color: "bg-green-500" },
              ]}
              taskTitle="Employee Onboarding Approval"
              description="A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team."
            />
            <TaskCard
              title="In Progress"
              titleColor="text-yellow-500"
              count="6"
              tags={[
                { label: "Finance", color: "bg-pink-500" },
                { label: "Compensation", color: "bg-orange-500" },
              ]}
              taskTitle="Payroll Processing"
              description="HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10."
            />
            <TaskCard
              title="Complete"
              titleColor="text-green-500"
              count="12"
              tags={[
                { label: "Feedback", color: "bg-purple-500" },
                { label: "Engagement", color: "bg-blue-500" },
              ]}
              taskTitle="Employee Satisfaction Survey"
              description="The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement."
            />
          </div>
        </div>
      </div>
    );
  };
  
  // TaskCard.jsx
  const TaskCard = ({ title, titleColor, count, tags, taskTitle, description }) => {
    return (
      <div className="w-1/3 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <div className='flex gap-1'>
          <h2 className={`${titleColor} font-bold`}>{title}</h2>
          <span className="text-gray-500">{count}</span>
          </div>
          <div>
          <i className="fas fa-ellipsis-v text-gray-500"></i>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex justify-center items-center">
          <i className="fas fa-plus text-gray-500"></i>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`${tag.color} text-white px-2 py-2 rounded-full text-xs`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
            <i className="fas fa-ellipsis-v text-gray-500"></i>
          </div>
          <h3 className="font-bold mb-2">{taskTitle}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    );
  };
  
export default Dashboard;