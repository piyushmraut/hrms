// import React from 'react';

// const ProjectTimeline = ({ projects }) => {
//   // Sort projects by start date
//   const sortedProjects = [...projects].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

//   // Calculate timeline parameters
//   const minDate = new Date(Math.min(...projects.map(p => new Date(p.startDate))));
//   const maxDate = new Date(Math.max(...projects.map(p => new Date(p.endDate))));
//   const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
  
//   // Helper function to calculate position and width of project bars
//   const getProjectPosition = (project) => {
//     const startDay = Math.ceil((new Date(project.startDate) - minDate) / (1000 * 60 * 60 * 24));
//     const endDay = Math.ceil((new Date(project.endDate) - minDate) / (1000 * 60 * 60 * 24));
//     const duration = endDay - startDay;
    
//     return {
//       left: `${(startDay / totalDays) * 100}%`,
//       width: `${(duration / totalDays) * 100}%`,
//     };
//   };

//   // Generate month markers
//   const monthMarkers = [];
//   let currentDate = new Date(minDate);
//   while (currentDate <= maxDate) {
//     monthMarkers.push(new Date(currentDate));
//     currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
//   }

//   return (
//     <div className="relative h-64 overflow-x-auto">
//       {/* Month markers */}
//       <div className="absolute top-0 left-0 right-0 h-8 flex">
//         {monthMarkers.map((date, index) => {
//           const position = ((date - minDate) / (maxDate - minDate)) * 100;
//           return (
//             <div 
//               key={index}
//               className="absolute border-l border-gray-300 h-8"
//               style={{ left: `${position}%` }}
//             >
//               <div className="text-xs text-gray-500 ml-1 mt-1">
//                 {date.toLocaleString('default', { month: 'short' })}
//               </div>
//             </div>
//           );
//         })}
//       </div>
      
//       {/* Project bars */}
//       <div className="mt-10">
//         {sortedProjects.map((project, index) => {
//           const position = getProjectPosition(project);
//           const statusColor = project.status === 'Completed' ? 'bg-green-500' : 
//                             project.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500';
          
//           return (
//             <div key={project.id} className="relative h-12 mb-2">
//               <div className="absolute top-1/2 transform -translate-y-1/2 h-4 rounded-full bg-gray-200 w-full"></div>
//               <div 
//                 className={`absolute top-1/2 transform -translate-y-1/2 h-4 rounded-full ${statusColor}`}
//                 style={{ left: position.left, width: position.width }}
//               ></div>
//               <div 
//                 className="absolute top-0 ml-2 text-sm font-medium"
//                 style={{ left: position.left }}
//               >
//                 {project.name}
//                 <div className="text-xs text-gray-500">
//                   {project.startDate} - {project.endDate}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ProjectTimeline;

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, Activity, AlertTriangle } from 'lucide-react';

const ProjectTimeline = ({ projects }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Sort projects by start date
  const sortedProjects = [...projects].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  // Calculate timeline parameters
  const minDate = new Date(Math.min(...projects.map(p => new Date(p.startDate))));
  const maxDate = new Date(Math.max(...projects.map(p => new Date(p.endDate))));
  const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
  
  // Helper function to calculate position and width of project bars
  const getProjectPosition = (project) => {
    const startDay = Math.ceil((new Date(project.startDate) - minDate) / (1000 * 60 * 60 * 24));
    const endDay = Math.ceil((new Date(project.endDate) - minDate) / (1000 * 60 * 60 * 24));
    const duration = endDay - startDay;
    
    return {
      left: `${(startDay / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`,
    };
  };

  // Generate month markers
  const monthMarkers = [];
  let currentDate = new Date(minDate);
  while (currentDate <= maxDate) {
    monthMarkers.push(new Date(currentDate));
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  }

  // Status color and icon mapping
  const getStatusInfo = (status) => {
    switch(status) {
      case 'Completed':
        return { color: 'bg-emerald-500', icon: <CheckCircle size={16} className="text-white" /> };
      case 'In Progress':
        return { color: 'bg-blue-500', icon: <Activity size={16} className="text-white" /> };
      default:
        return { color: 'bg-amber-500', icon: <AlertTriangle size={16} className="text-white" /> };
    }
  };

  return (
    <div className="relative h-auto pb-8 overflow-x-auto bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md p-6 border-2 border-dotted border-violet-600">
      
      
      {/* Month markers */}
      <div className="absolute top-10 left-0 right-0 h-10 flex">
        {monthMarkers.map((date, index) => {
          const position = ((date - minDate) / (maxDate - minDate)) * 100;
          return (
            <div 
              key={index}
              className="absolute border-l border-gray-300 h-full"
              style={{ 
                left: `${position}%`, 
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.5s ease-in-out ${index * 0.1}s`
              }}
            >
              <div className="text-xs font-medium text-gray-600 ml-1 bg-white px-1 rounded">
                {date.toLocaleString('default', { month: 'short', year: '2-digit' })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Project bars */}
      <div className="mt-20">
        {sortedProjects.map((project, index) => {
          const position = getProjectPosition(project);
          const { color, icon } = getStatusInfo(project.status);
          
          return (
            <div 
              key={project.id} 
              className="relative h-16 mb-4"
              style={{ 
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${index * 0.15}s`
              }}
            >
              <div className="absolute top-1/2 transform -translate-y-1/2 h-3 rounded-full bg-gray-200 w-full"></div>
              <div 
                className={`absolute top-1/2 transform -translate-y-1/2 h-3 rounded-full ${color} shadow-lg`}
                style={{ 
                  left: position.left, 
                  width: position.width,
                  transition: 'width 1s ease-in-out'
                }}
              ></div>
              
              {/* Project dot marker */}
              <div 
                className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full ${color} flex items-center justify-center shadow-md`}
                style={{ 
                  left: position.left,
                  marginLeft: '-12px',
                  animation: 'pulse 2s infinite'
                }}
              >
                {icon}
              </div>
              
              {/* Project info card */}
              <div 
                className="absolute top-0 mt-20 ml-6 bg-white rounded-lg shadow-lg p-2 transform -translate-y-full mb-2 border-l-4 hover:shadow-xl transition-shadow duration-300"
                style={{ 
                  left: position.left,
                  borderLeftColor: color.replace('bg-', 'border-').replace('-500', '-600'),
                  minWidth: '180px',
                  maxWidth: '250px'
                }}
              >
                <div className="font-bold text-gray-800">{project.name}</div>
                <div className="text-xs text-gray-500 flex items-center mt-1">
                  <Clock size={12} className="mr-1" />
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </div>
                <div className={`text-xs mt-1 inline-block px-2 py-1 rounded-full ${color.replace('bg-', 'bg-').replace('-500', '-100')} ${color.replace('bg-', 'text-').replace('-500', '-700')}`}>
                  {project.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectTimeline;