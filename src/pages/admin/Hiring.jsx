
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBriefcase, FiUsers, FiCalendar, FiMail, FiFileText, 
  FiSettings, FiActivity, FiClock, FiTrendingUp, FiCheck,
  FiChevronRight, FiUser, FiDollarSign, FiAward
} from 'react-icons/fi';
import Offers from '../../components/Offers';
import HiringSettings from '../../components/HiringSettings';
import Candidates from '../../components/Candidates';
import JobPostings from '../../components/JobPostings';
import Interviews from '../../components/Interviews';

const Hiring = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    openPositions: 0,
    candidates: 0,
    interviews: 0,
    hires: 0,
  });

  useEffect(() => {
    const updateStats = () => {
      try {
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
        const interviews = JSON.parse(localStorage.getItem('interviews') || '[]');
        const offers = JSON.parse(localStorage.getItem('offers') || '[]');

        setStats({
          openPositions: jobs.filter(job => job.status === 'Active').length,
          candidates: candidates.length,
          interviews: interviews.filter(i => i.status === 'Scheduled').length,
          hires: offers.filter(o => o.status === 'Accepted').length,
        });
      } catch (error) {
        console.error('Error parsing stats from localStorage:', error);
        setStats({ openPositions: 0, candidates: 0, interviews: 0, hires: 0 });
      }
    };
    updateStats();
    window.addEventListener('storage', updateStats);
    return () => window.removeEventListener('storage', updateStats);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent stats={stats} />;
      case 'job-postings':
        return <JobPostings />;
      case 'candidates':
        return <Candidates />;
      case 'interviews':
        return <Interviews />;
      case 'offers':
        return <Offers />;
      case 'settings':
        return <HiringSettings />;
      default:
        return <DashboardContent stats={stats} />;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'job-postings':
        return 'Job Postings';
      case 'candidates':
        return 'Candidates';
      case 'interviews':
        return 'Interviews';
      case 'offers':
        return 'Offers';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Overview of your hiring process';
      case 'job-postings':
        return 'Manage job postings';
      case 'candidates':
        return 'View and manage candidates';
      case 'interviews':
        return 'Schedule and track interviews';
      case 'offers':
        return 'Manage job offers';
      case 'settings':
        return 'Configure hiring settings';
      default:
        return 'Overview of your hiring process';
    }
  };

  const tabVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-lg rounded-b-xl">
        <div className="max-w-8xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
              className="mr-2"
            >
              <FiBriefcase className="text-indigo-600" size={26} />
            </motion.div>
            Hiring Module
          </h1>
          <nav>
            <ul className="flex space-x-1">
              {[
                { id: 'dashboard', icon: FiBriefcase, label: 'Dashboard' },
                { id: 'job-postings', icon: FiFileText, label: 'Job Postings' },
                { id: 'candidates', icon: FiUsers, label: 'Candidates' },
                { id: 'interviews', icon: FiCalendar, label: 'Interviews' },
                { id: 'offers', icon: FiMail, label: 'Offers' },
                { id: 'settings', icon: FiSettings, label: 'Settings' },
              ].map((tab) => (
                <li key={tab.id}>
                  <motion.button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-blue-50'
                    }`}
                    whileHover="hover"
                    whileTap="tap"
                    variants={tabVariants}
                  >
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      className="mr-2"
                    >
                      <tab.icon className={activeTab === tab.id ? "text-white" : "text-indigo-500"} />
                    </motion.div>
                    {tab.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            {getTabTitle()}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="ml-3 text-indigo-500"
            >
              {activeTab === 'dashboard' && <FiBriefcase />}
              {activeTab === 'job-postings' && <FiFileText />}
              {activeTab === 'candidates' && <FiUsers />}
              {activeTab === 'interviews' && <FiCalendar />}
              {activeTab === 'offers' && <FiMail />}
              {activeTab === 'settings' && <FiSettings />}
            </motion.div>
          </h2>
          <p className="text-gray-600 ml-1">{getTabDescription()}</p>
        </motion.div>
        {renderTabContent()}
      </div>
    </div>
  );
};

// const DashboardContent = ({ stats }) => {
//   // Sample data for charts
//   const [candidateStatusData] = useState([
//     { name: 'New', value: 15, color: '#4F46E5' }, // Indigo
//     { name: 'Screening', value: 8, color: '#0EA5E9' }, // Sky
//     { name: 'Interview', value: 12, color: '#8B5CF6' }, // Violet
//     { name: 'Offer', value: 5, color: '#10B981' }, // Emerald
//     { name: 'Hired', value: 3, color: '#059669' }, // Green
//     { name: 'Rejected', value: 7, color: '#F43F5E' }, // Rose
//   ]);

//   const [hiringTrendData] = useState([
//     { name: 'Jan', hired: 2, interviewed: 8 },
//     { name: 'Feb', hired: 3, interviewed: 10 },
//     { name: 'Mar', hired: 5, interviewed: 15 },
//     { name: 'Apr', hired: 4, interviewed: 12 },
//     { name: 'May', hired: 6, interviewed: 18 },
//   ]);

//   // Calculate percentages for candidate status
//   const totalCandidates = candidateStatusData.reduce((sum, item) => sum + item.value, 0);
//   const candidateStatusWithPercentage = candidateStatusData.map(item => ({
//     ...item,
//     percentage: Math.round((item.value / totalCandidates) * 100)
//   }));

//   return (
//     <div>
//       {/* Stats Cards */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//       >
//         <StatCard 
//           title="Open Positions" 
//           value={stats.openPositions} 
//           icon={<FiBriefcase />} 
//           color="blue" 
//           description="Active job openings"
//         />
//         <StatCard 
//           title="Candidates" 
//           value={stats.candidates} 
//           icon={<FiUsers />} 
//           color="purple" 
//           description="Total applicants"
//         />
//         <StatCard 
//           title="Interviews" 
//           value={stats.interviews} 
//           icon={<FiCalendar />} 
//           color="green" 
//           description="Scheduled this month"
//         />
//         <StatCard 
//           title="Hires" 
//           value={stats.hires} 
//           icon={<FiMail />} 
//           color="orange" 
//           description="Successful placements"
//         />
//       </motion.div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Candidate Status Pie Chart */}
//         <motion.div 
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="bg-white rounded-xl shadow-lg p-6 overflow-hidden border border-indigo-50"
//         >
//           <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//             <FiUsers className="mr-2 text-indigo-500" />
//             Candidate Status
//           </h3>
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="w-64 h-64 relative">
//               {/* Pie Chart with Animation */}
//               <svg width="100%" height="100%" viewBox="0 0 100 100">
//                 {candidateStatusWithPercentage.reduce((acc, item, index) => {
//                   const startAngle = acc;
//                   const endAngle = startAngle + (item.value / totalCandidates) * 360;
//                   const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0;
                  
//                   // Calculate coordinates for the arc
//                   const x1 = 50 + 40 * Math.cos(Math.PI * startAngle / 180);
//                   const y1 = 50 + 40 * Math.sin(Math.PI * startAngle / 180);
//                   const x2 = 50 + 40 * Math.cos(Math.PI * endAngle / 180);
//                   const y2 = 50 + 40 * Math.sin(Math.PI * endAngle / 180);
                  
//                   // Add animation with delay based on index
//                   return [
//                     <motion.path
//                       key={index}
//                       d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
//                       fill={item.color}
//                       stroke="white"
//                       strokeWidth="1"
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: 0.1 * index, duration: 0.5 }}
//                       whileHover={{ scale: 1.05 }}
//                     />
//                   ];
//                 }, 0)}
//                 <motion.circle 
//                   cx="50" cy="50" r="15" 
//                   fill="white" 
//                   filter="drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.8, duration: 0.5 }}
//                 />
//                 <motion.text 
//                   x="50" y="50" 
//                   textAnchor="middle" 
//                   dominantBaseline="middle" 
//                   fontSize="10"
//                   className="font-bold"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1, duration: 0.5 }}
//                 >
//                   {totalCandidates}
//                 </motion.text>
//               </svg>
//             </div>
//             <motion.div 
//               className="ml-0 md:ml-6 mt-4 md:mt-0"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//             >
//               <ul className="space-y-3">
//                 {candidateStatusWithPercentage.map((item, index) => (
//                   <motion.li 
//                     key={index} 
//                     className="flex items-center"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.2 * index, duration: 0.5 }}
//                   >
//                     <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
//                     <span className="text-sm font-medium">
//                       {item.name}: <span className="text-gray-700 font-bold">{item.value}</span> <span className="text-gray-500">({item.percentage}%)</span>
//                     </span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Hiring Trend Bar Chart */}
//         <motion.div 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="bg-white rounded-xl shadow-lg p-6 border border-indigo-50"
//         >
//           <h3 className="text-lg font-semibold  text-gray-800 flex items-center">
//             <FiTrendingUp className="mr-2 text-green-500" />
//             Hiring Trend (Last 5 Months)
//           </h3>
//           <div className="h-64">
//             <div className="flex h-full items-end space-x-4">
//               {hiringTrendData.map((month, index) => (
//                 <div key={index} className="flex flex-col items-center flex-1">
//                   <div className="flex items-end w-full h-48">
//                     <motion.div 
//                       className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t" 
//                       style={{ height: `${(month.interviewed / 20) * 100}%` }}
//                       title={`Interviewed: ${month.interviewed}`}
//                       initial={{ height: 0 }}
//                       animate={{ height: `${(month.interviewed / 20) * 100}%` }}
//                       transition={{ delay: 0.2 * index, duration: 0.8 }}
//                       whileHover={{ filter: "brightness(1.1)" }}
//                     ></motion.div>
//                     <motion.div 
//                       className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t ml-1" 
//                       style={{ height: `${(month.hired / 20) * 100}%` }}
//                       title={`Hired: ${month.hired}`}
//                       initial={{ height: 0 }}
//                       animate={{ height: `${(month.hired / 20) * 100}%` }}
//                       transition={{ delay: 0.2 * index + 0.2, duration: 0.8 }}
//                       whileHover={{ filter: "brightness(1.1)" }}
//                     ></motion.div>
//                   </div>
//                   <div className="text-xs mt-2 font-medium">{month.name}</div>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-center space-x-4 mt-4">
//               <div className="flex items-center">
//                 <div className="w-3 h-3 bg-indigo-500 mr-1 rounded"></div>
//                 <span className="text-xs font-medium">Interviewed</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-3 h-3 bg-emerald-500 mr-1 rounded"></div>
//                 <span className="text-xs font-medium">Hired</span>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Additional Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Recent Activity */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-indigo-50"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//               <FiActivity className="mr-2 text-rose-500" />
//               Recent Activity
//             </h3>
//             <motion.button 
//               className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               View All
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </motion.button>
//           </div>
//           <div className="space-y-5">
//             <ActivityItem 
//               title="New candidate applied" 
//               description="John Doe applied for Senior Developer position" 
//               time="2 hours ago" 
//               icon={<FiUsers className="text-blue-500" />}
//               delay={0.1}
//             />
//             <ActivityItem 
//               title="Interview scheduled" 
//               description="Interview with Sarah Johnson for Marketing Manager" 
//               time="Yesterday" 
//               icon={<FiCalendar className="text-purple-500" />}
//               delay={0.2}
//             />
//             <ActivityItem 
//               title="Job posted" 
//               description="New job posted: UX Designer" 
//               time="2 days ago" 
//               icon={<FiFileText className="text-green-500" />}
//               delay={0.3}
//             />
//             <ActivityItem 
//               title="Offer accepted" 
//               description="Michael Chen accepted the Data Analyst offer" 
//               time="3 days ago" 
//               icon={<FiMail className="text-yellow-500" />}
//               delay={0.4}
//             />
//           </div>
//         </motion.div>

//         {/* Time to Hire Metrics */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="bg-white rounded-xl shadow-lg p-6 border border-indigo-50"
//         >
//           <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//             <FiClock className="mr-2 text-blue-500" />
//             Time to Hire Metrics
//           </h3>
//           <div className="space-y-5">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1, duration: 0.5 }}
//             >
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium">Average Time to Hire</span>
//                 <span className="text-sm font-bold text-indigo-600">32 days</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <motion.div 
//                   className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full" 
//                   initial={{ width: 0 }}
//                   animate={{ width: '70%' }}
//                   transition={{ delay: 0.2, duration: 0.8 }}
//                 ></motion.div>
//               </div>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//             >
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium">Engineering Roles</span>
//                 <span className="text-sm font-bold text-purple-600">38 days</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <motion.div 
//                   className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" 
//                   initial={{ width: 0 }}
//                   animate={{ width: '80%' }}
//                   transition={{ delay: 0.3, duration: 0.8 }}
//                 ></motion.div>
//               </div>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//             >
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium">Non-Engineering Roles</span>
//                 <span className="text-sm font-bold text-green-600">25 days</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <motion.div 
//                   className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" 
//                   initial={{ width: 0 }}
//                   animate={{ width: '55%' }}
//                   transition={{ delay: 0.4, duration: 0.8 }}
//                 ></motion.div>
//               </div>
//             </motion.div>
//           </div>
//           <motion.div 
//             className="mt-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.5 }}
//           >
//             <h4 className="text-md font-medium mb-3">Quick Actions</h4>
//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { label: "Post New Job", icon: FiFileText, color: "blue" },
//                 { label: "Schedule Interview", icon: FiCalendar, color: "green" },
//                 { label: "View Candidates", icon: FiUsers, color: "purple" },
//                 { label: "Generate Report", icon: FiActivity, color: "yellow" }
//               ].map((action, index) => (
//                 <motion.button 
//                   key={index}
//                   className={`px-3 py-3 bg-${action.color}-50 text-${action.color}-700 rounded-lg text-sm font-medium hover:bg-${action.color}-100 transition-all flex items-center justify-center shadow-sm`}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
//                 >
//                   <action.icon className="mr-2" />
//                   {action.label}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Upcoming Interviews */}
//       <div>
//         <motion.div 
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.6 }}
//         className="bg-white rounded-xl shadow-lg p-6 border border-indigo-50"
//       >
//         <div className="flex justify-between items-center mb-5">
//           <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//             <FiCalendar className="mr-2 text-indigo-500" />
//             Upcoming Interviews
//           </h3>
//           <motion.button 
//             className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             View All
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </motion.button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50 rounded-t-lg">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewers</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               <InterviewRow 
//                 candidate="John Doe" 
//                 position="Senior Developer" 
//                 datetime="May 15, 2023 - 10:00 AM" 
//                 interviewers="Jane Smith, Mike Johnson" 
//                 status="Confirmed"
//                 delay={0.1}
//               />
//               <InterviewRow 
//                 candidate="Sarah Johnson" 
//                 position="Marketing Manager" 
//                 datetime="May 16, 2023 - 2:30 PM" 
//                 interviewers="Alex Brown" 
//                 status="Pending"
//                 delay={0.2}
//               />
//               <InterviewRow 
//                 candidate="Michael Chen" 
//                 position="Data Analyst" 
//                 datetime="May 17, 2023 - 11:00 AM" 
//                 interviewers="Lisa Wong, David Kim" 
//                 status="Confirmed"
//                 delay={0.3}
//               />
//             </tbody>
//           </table>
//         </div>
//       </motion.div>
//       </div>
//     </div>
//   );
// };

// // Update ActivityItem to include animations and improved styling
// const ActivityItem = ({ title, description, time, icon, delay = 0 }) => {
//   return (
//     <motion.div 
//       className="flex items-start p-3 rounded-lg hover:bg-indigo-50 transition-colors"
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay, duration: 0.3 }}
//       whileHover={{ x: 5 }}
//     >
//       <motion.div 
//         className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center mr-4 shadow-sm"
//         whileHover={{ rotate: 15 }}
//       >
//         {icon}
//       </motion.div>
//       <div className="flex-1">
//         <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
//         <p className="text-sm text-gray-600">{description}</p>
//         <p className="text-xs text-gray-500 mt-1 flex items-center">
//           <FiClock className="mr-1" size={10} />
//           {time}
//         </p>
//       </div>
//       </motion.div>
//   );
// };

// const StatCard = ({ title, value, icon, color, description }) => {
//   const colorConfig = {
//     blue: {
//       bg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
//       iconBg: 'bg-blue-500',
//       textColor: 'text-blue-600',
//       shadow: 'shadow-blue-100'
//     },
//     green: {
//       bg: 'bg-gradient-to-br from-green-50 to-emerald-100',
//       iconBg: 'bg-green-500',
//       textColor: 'text-green-600',
//       shadow: 'shadow-green-100'
//     },
//     purple: {
//       bg: 'bg-gradient-to-br from-purple-50 to-violet-100',
//       iconBg: 'bg-purple-500',
//       textColor: 'text-purple-600',
//       shadow: 'shadow-purple-100'
//     },
//     orange: {
//       bg: 'bg-gradient-to-br from-orange-50 to-amber-100',
//       iconBg: 'bg-orange-500',
//       textColor: 'text-orange-600',
//       shadow: 'shadow-orange-100'
//     },
//   };

//   const { bg, iconBg, textColor, shadow } = colorConfig[color];

//   return (
//     <motion.div 
//       className={`${bg} p-6 rounded-xl shadow-lg ${shadow} border border-white`}
//       whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
//       transition={{ duration: 0.2 }}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <div className="flex items-end">
//             <motion.h3 
//               className={`text-3xl font-bold ${textColor} mt-1`}
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               {value}
//             </motion.h3>
//             <span className="text-xs text-gray-500 mb-1 ml-1">/ total</span>
//           </div>
//           <p className="text-xs text-gray-500 mt-1">{description}</p>
//         </div>
//         <motion.div 
//           className={`p-4 rounded-full bg-white shadow-md flex items-center justify-center text-white ${iconBg}`}
//           whileHover={{ rotate: 15, scale: 1.1 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           {icon}
//         </motion.div>
//       </div>
//       <motion.div 
//         className="w-full h-1 bg-white/50 rounded-full mt-4 overflow-hidden"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         <motion.div 
//           className={`h-full ${iconBg} rounded-full`}
//           initial={{ width: 0 }}
//           animate={{ width: `${(value / 20) * 100}%` }}
//           transition={{ duration: 1, delay: 0.5 }}
//         />
//       </motion.div>
//     </motion.div>
//   );
// };


const DashboardContent = ({ stats }) => {
  const [candidateStatusData] = useState([
    { name: 'New', value: 15, color: '#6366F1', icon: <FiUser className="text-white" /> }, // Indigo
    { name: 'Screening', value: 8, color: '#8B5CF6', icon: <FiActivity className="text-white" /> }, // Violet
    { name: 'Interview', value: 12, color: '#EC4899', icon: <FiCalendar className="text-white" /> }, // Pink
    { name: 'Offer', value: 5, color: '#10B981', icon: <FiDollarSign className="text-white" /> }, // Emerald
    { name: 'Hired', value: 3, color: '#059669', icon: <FiAward className="text-white" /> }, // Green
    { name: 'Rejected', value: 7, color: '#F43F5E', icon: <FiCheck className="text-white" /> }, // Rose
  ]);

  const [hiringTrendData] = useState([
    { name: 'Jan', hired: 2, interviewed: 8 },
    { name: 'Feb', hired: 3, interviewed: 10 },
    { name: 'Mar', hired: 5, interviewed: 15 },
    { name: 'Apr', hired: 4, interviewed: 12 },
    { name: 'May', hired: 6, interviewed: 18 },
  ]);

  const totalCandidates = candidateStatusData.reduce((sum, item) => sum + item.value, 0);
  const candidateStatusWithPercentage = candidateStatusData.map(item => ({
    ...item,
    percentage: Math.round((item.value / totalCandidates) * 100)
  }));

  return (
    <div>
      {/* Stats Cards - Enhanced with better shadows and animations */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <StatCard 
          title="Open Positions" 
          value={stats.openPositions} 
          icon={<FiBriefcase className="text-white" size={20} />} 
          color="blue" 
          description="Active job openings"
          trend="up"
          trendValue="12%"
        />
        <StatCard 
          title="Candidates" 
          value={stats.candidates} 
          icon={<FiUsers className="text-white" size={20} />} 
          color="purple" 
          description="Total applicants"
          trend="up"
          trendValue="24%"
        />
        <StatCard 
          title="Interviews" 
          value={stats.interviews} 
          icon={<FiCalendar className="text-white" size={20} />} 
          color="pink" 
          description="Scheduled this month"
          trend="down"
          trendValue="8%"
        />
        <StatCard 
          title="Hires" 
          value={stats.hires} 
          icon={<FiMail className="text-white" size={20} />} 
          color="green" 
          description="Successful placements"
          trend="up"
          trendValue="36%"
        />
      </motion.div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Candidate Status Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-orange-50 rounded-xl shadow-lg p-6 overflow-hidden border border-indigo-500"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <FiUsers className="mr-2 text-indigo-500" />
            Candidate Status
          </h3>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-64 h-50 relative">
              {/* Pie Chart with Animation */}
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                {candidateStatusWithPercentage.reduce((acc, item, index) => {
                  const startAngle = acc;
                  const endAngle = startAngle + (item.value / totalCandidates) * 360;
                  const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0;
                  
                  // Calculate coordinates for the arc
                  const x1 = 50 + 40 * Math.cos(Math.PI * startAngle / 180);
                  const y1 = 50 + 40 * Math.sin(Math.PI * startAngle / 180);
                  const x2 = 50 + 40 * Math.cos(Math.PI * endAngle / 180);
                  const y2 = 50 + 40 * Math.sin(Math.PI * endAngle / 180);
                  
                  // Add animation with delay based on index
                  return [
                    <motion.path
                      key={index}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={item.color}
                      stroke="white"
                      strokeWidth="1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    />
                  ];
                }, 0)}
                <motion.circle 
                  cx="50" cy="50" r="15" 
                  fill="white" 
                  filter="drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                />
                <motion.text 
                  x="50" y="50" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fontSize="10"
                  className="font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  {totalCandidates}
                </motion.text>
              </svg>
            </div>
            <motion.div 
              className="ml-0 md:ml-6 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <ul className="space-y-3">
                {candidateStatusWithPercentage.map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index, duration: 0.5 }}
                  >
                    <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">
                      {item.name}: <span className="text-gray-700 font-bold">{item.value}</span> <span className="text-gray-500">({item.percentage}%)</span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Hiring Trend Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-lime-50 rounded-xl shadow-lg p-6 border border-indigo-500"
        >
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FiTrendingUp className="mr-2 text-green-500" />
            Hiring Trend (Last 5 Months)
          </h3>
          <div className="h-50">
            <div className="flex h-full items-end space-x-4">
              {hiringTrendData.map((month, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex items-end w-full h-48">
                    <motion.div 
                      className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t" 
                      style={{ height: `${(month.interviewed / 20) * 100}%` }}
                      title={`Interviewed: ${month.interviewed}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${(month.interviewed / 20) * 100}%` }}
                      transition={{ delay: 0.2 * index, duration: 0.8 }}
                      whileHover={{ filter: "brightness(1.1)" }}
                    ></motion.div>
                    <motion.div 
                      className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t ml-1" 
                      style={{ height: `${(month.hired / 20) * 100}%` }}
                      title={`Hired: ${month.hired}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${(month.hired / 20) * 100}%` }}
                      transition={{ delay: 0.2 * index + 0.2, duration: 0.8 }}
                      whileHover={{ filter: "brightness(1.1)" }}
                    ></motion.div>
                  </div>
                  <div className="text-xs mt-2 font-medium">{month.name}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-500 mr-1 rounded"></div>
                <span className="text-xs font-medium">Interviewed</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 mr-1 rounded"></div>
                <span className="text-xs font-medium">Hired</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Equal Height Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity - Height matched to Time to Hire */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-fuchsia-50 rounded-2xl shadow-xl p-6 border border-indigo-500 h-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <div className="p-2 mr-3 rounded-lg bg-rose-100 text-rose-600">
                <FiActivity size={20} />
              </div>
              Recent Activity
            </h3>
            <motion.button 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              View All <FiChevronRight className="ml-1" />
            </motion.button>
          </div>
          
          <div className="space-y-4">
            <ActivityItem 
              title="New candidate applied" 
              description="John Doe applied for Senior Developer position" 
              time="2 hours ago" 
              icon={<FiUsers className="text-blue-500" />}
              color="blue"
              delay={0.1}
            />
            <ActivityItem 
              title="Interview scheduled" 
              description="Interview with Sarah Johnson for Marketing Manager" 
              time="Yesterday" 
              icon={<FiCalendar className="text-purple-500" />}
              color="purple"
              delay={0.2}
            />
            <ActivityItem 
              title="Job posted" 
              description="New job posted: UX Designer" 
              time="2 days ago" 
              icon={<FiFileText className="text-green-500" />}
              color="green"
              delay={0.3}
            />
            <ActivityItem 
              title="Offer accepted" 
              description="Michael Chen accepted the Data Analyst offer" 
              time="3 days ago" 
              icon={<FiMail className="text-amber-500" />}
              color="amber"
              delay={0.4}
            />
          </div>
        </motion.div>

        {/* Time to Hire Metrics - Height matched to Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-yellow-50 rounded-2xl shadow-xl p-6 border border-indigo-500 h-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <div className="p-2 mr-3 rounded-lg bg-blue-100 text-blue-600">
                <FiClock size={20} />
              </div>
              Time to Hire Metrics
            </h3>
            <motion.button 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details <FiChevronRight className="ml-1" />
            </motion.button>
          </div>
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Average Time to Hire</span>
                <span className="text-sm font-bold text-indigo-600">32 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Industry avg: 42 days</span>
                <span className="text-xs font-medium text-green-600">-10 days</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Engineering Roles</span>
                <span className="text-sm font-bold text-purple-600">38 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: '80%' }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Industry avg: 45 days</span>
                <span className="text-xs font-medium text-green-600">-7 days</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Non-Engineering Roles</span>
                <span className="text-sm font-bold text-green-600">25 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: '55%' }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Industry avg: 35 days</span>
                <span className="text-xs font-medium text-green-600">-10 days</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h4 className="text-md font-semibold mb-4 text-gray-800">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Post New Job", icon: FiFileText, color: "blue" },
                  { label: "Schedule Interview", icon: FiCalendar, color: "green" },
                  { label: "View Candidates", icon: FiUsers, color: "purple" },
                  { label: "Generate Report", icon: FiActivity, color: "amber" }
                ].map((action, index) => (
                  <motion.button 
                    key={index}
                    className={`px-3 py-3 bg-${action.color}-50 text-${action.color}-700 rounded-lg text-sm font-semibold hover:bg-${action.color}-100 transition-all flex items-center justify-center shadow-sm border border-${action.color}-100`}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
                  >
                    <action.icon className="mr-2" />
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Interviews - Enhanced */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-yellow-50 rounded-2xl shadow-xl p-6 border border-indigo-500"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <div className="p-2 mr-3 rounded-lg bg-indigo-100 text-indigo-600">
              <FiCalendar size={20} />
            </div>
            Upcoming Interviews
          </h3>
          <motion.button 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            View All <FiChevronRight className="ml-1" />
          </motion.button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border-red-400 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <InterviewRow 
                candidate="John Doe" 
                position="Senior Developer" 
                datetime="May 15, 2023 - 10:00 AM" 
                interviewers="Jane Smith, Mike Johnson" 
                status="Confirmed"
                delay={0.1}
              />
              <InterviewRow 
                candidate="Sarah Johnson" 
                position="Marketing Manager" 
                datetime="May 16, 2023 - 2:30 PM" 
                interviewers="Alex Brown" 
                status="Pending"
                delay={0.2}
              />
              <InterviewRow 
                candidate="Michael Chen" 
                position="Data Analyst" 
                datetime="May 17, 2023 - 11:00 AM" 
                interviewers="Lisa Wong, David Kim" 
                status="Confirmed"
                delay={0.3}
              />
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

// Enhanced ActivityItem component
const ActivityItem = ({ title, description, time, icon, color = "indigo", delay = 0 }) => {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
    indigo: "bg-indigo-100 text-indigo-600"
  };
  
  return (
    <motion.div 
      className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ x: 5 }}
    >
      <motion.div 
        className={`flex-shrink-0 h-10 w-10 rounded-lg ${colorMap[color]} flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md transition-shadow`}
        whileHover={{ rotate: 15, scale: 1.1 }}
      >
        {icon}
      </motion.div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1 flex items-center">
          <FiClock className="mr-1" size={12} />
          {time}
        </p>
      </div>
      <FiChevronRight className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
    </motion.div>
  );
};

// Enhanced StatCard component with trend indicator
const StatCard = ({ title, value, icon, color, description, trend, trendValue }) => {
  const colorConfig = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-100 to-blue-150',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      shadow: 'shadow-blue-100'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-150 to-green-200',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
      textColor: 'text-green-600',
      shadow: 'shadow-green-100'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      shadow: 'shadow-purple-100'
    },
    pink: {
      bg: 'bg-gradient-to-br from-pink-50 to-pink-100',
      iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600',
      textColor: 'text-pink-600',
      shadow: 'shadow-pink-100'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-amber-100',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
      textColor: 'text-orange-600',
      shadow: 'shadow-orange-100'
    },
  };

  const { bg, iconBg, textColor, shadow } = colorConfig[color];

  return (
    <motion.div 
      className={`${bg} p-6 rounded-2xl shadow-lg ${shadow} border border-white relative overflow-hidden`}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-end">
            <motion.h3 
              className={`text-3xl font-bold ${textColor} mt-1`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.h3>
            <span className="text-xs text-gray-500 mb-1 ml-1">/ total</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <motion.div 
          className={`p-4 rounded-xl ${iconBg} shadow-md flex items-center justify-center text-white`}
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
      </div>
      
      {/* Trend indicator */}
      {trend && (
        <div className={`absolute top-4 right-4 flex items-center text-xs font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
          {trendValue}
        </div>
      )}
      
      <motion.div 
        className="w-full h-1.5 bg-white/50 rounded-full mt-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className={`h-full ${iconBg} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${(value / 20) * 100}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};
const InterviewRow = ({ candidate, position, datetime, interviewers, status, delay = 0 }) => {
  const statusConfig = {
    Confirmed: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      icon: <FiCheck className="mr-1" size={12} />
    },
    Pending: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      icon: <FiClock className="mr-1" size={12} />
    },
    Cancelled: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      icon: <FiClock className="mr-1" size={12} />
    }
  };

  const { bgColor, textColor, borderColor, icon } = statusConfig[status];

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ backgroundColor: 'rgba(79, 70, 229, 0.05)' }}
      className="hover:bg-indigo-50 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center">
          <FiCalendar className="mr-2 text-indigo-500" size={14} />
          {datetime}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center">
          <FiUsers className="mr-2 text-indigo-500" size={14} />
          {interviewers}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <motion.span 
          className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor} border ${borderColor}`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
          {status}
        </motion.span>
      </td>
    </motion.tr>
  );
};

export default Hiring;