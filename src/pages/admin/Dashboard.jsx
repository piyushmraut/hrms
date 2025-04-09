

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
        color="bg-green-100"
      />
      <StatCard
        title="Job Applicant"
        value="983"
        change="2.4%"
        changeIcon="fa-arrow-up"
        changeColor="text-green-500"
        subtext="+32 from last month"
        color="bg-green-100"
      />
      <StatCard
        title="Total Revenue"
        value="$4,842.00"
        change="4.2%"
        changeIcon="fa-arrow-up"
        changeColor="text-green-500"
        subtext="+$3,834.00 from last month"
        color="bg-green-100"
      />
      <StatCard
        title="Attendance Rate"
        value="75%"
        change="1.7%"
        changeIcon="fa-arrow-down"
        changeColor="text-red-500"
        subtext="-6.4% from last month"
        color="bg-red-100"
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
                <button className="px-4 py-2 bg-blue-50 rounded hover:bg-gray-300"><i class="fas fa-th-large"></i> Kanban</button>
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