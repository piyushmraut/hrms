import React from 'react';

const ProjectTimeline = ({ projects }) => {
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

  return (
    <div className="relative h-64 overflow-x-auto">
      {/* Month markers */}
      <div className="absolute top-0 left-0 right-0 h-8 flex">
        {monthMarkers.map((date, index) => {
          const position = ((date - minDate) / (maxDate - minDate)) * 100;
          return (
            <div 
              key={index}
              className="absolute border-l border-gray-300 h-8"
              style={{ left: `${position}%` }}
            >
              <div className="text-xs text-gray-500 ml-1 mt-1">
                {date.toLocaleString('default', { month: 'short' })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Project bars */}
      <div className="mt-10">
        {sortedProjects.map((project, index) => {
          const position = getProjectPosition(project);
          const statusColor = project.status === 'Completed' ? 'bg-green-500' : 
                            project.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500';
          
          return (
            <div key={project.id} className="relative h-12 mb-2">
              <div className="absolute top-1/2 transform -translate-y-1/2 h-4 rounded-full bg-gray-200 w-full"></div>
              <div 
                className={`absolute top-1/2 transform -translate-y-1/2 h-4 rounded-full ${statusColor}`}
                style={{ left: position.left, width: position.width }}
              ></div>
              <div 
                className="absolute top-0 ml-2 text-sm font-medium"
                style={{ left: position.left }}
              >
                {project.name}
                <div className="text-xs text-gray-500">
                  {project.startDate} - {project.endDate}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTimeline;