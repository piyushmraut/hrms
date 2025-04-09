import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatusPieChart = ({ projects }) => {
  const statusCount = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(statusCount).map(status => ({
    name: status,
    value: statusCount[status],
    color: status === 'Completed' ? '#10B981' : 
           status === 'In Progress' ? '#6366F1' : '#F97316'
  }));

  return (
    <div className="h-72 border-2 border-dotted border-violet-800 rounded-lg bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend className='mt-8' />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;

// import React, { useState, useEffect } from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector } from 'recharts';

// const StatusPieChart = ({ projects }) => {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [isAnimated, setIsAnimated] = useState(false);
  
//   useEffect(() => {
//     // Start animation after component mounts
//     setIsAnimated(true);
//   }, []);

//   const statusCount = projects.reduce((acc, project) => {
//     acc[project.status] = (acc[project.status] || 0) + 1;
//     return acc;
//   }, {});

//   // Enhanced color palette with more pleasant light mode colors
//   const statusColors = {
//     'Completed': '#10B981',     // Emerald
//     'In Progress': '#6366F1',   // Indigo
//     'Not Started': '#F97316',   // Orange
//     'On Hold': '#8B5CF6',       // Violet
//     'Cancelled': '#EF4444',     // Red
//     'Planning': '#0EA5E9'       // Sky blue
//   };

//   const data = Object.keys(statusCount).map(status => ({
//     name: status,
//     value: statusCount[status],
//     color: statusColors[status] || '#CBD5E1' // Default color
//   }));

//   // Custom renderer for active sector with hover effect
//   const renderActiveShape = (props) => {
//     const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
//     return (
//       <g>
//         <Sector
//           cx={cx}
//           cy={cy}
//           innerRadius={innerRadius}
//           outerRadius={outerRadius + 10}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           fill={fill}
//           opacity={0.9}
//         />
//         <Sector
//           cx={cx}
//           cy={cy}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           innerRadius={outerRadius + 12}
//           outerRadius={outerRadius + 16}
//           fill={fill}
//           opacity={0.4}
//         />
//       </g>
//     );
//   };

//   const onPieEnter = (_, index) => {
//     setActiveIndex(index);
//   };

//   const onPieLeave = () => {
//     setActiveIndex(null);
//   };

//   // Custom tooltip component
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-4 rounded-md shadow-lg border border-gray-200">
//           <p className="font-semibold text-gray-800">{payload[0].name}</p>
//           <p className="text-gray-600">
//             <span className="font-medium">{payload[0].value}</span> projects
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium">{(payload[0].payload.percent * 100).toFixed(1)}%</span> of total
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Custom legend renderer
//   const renderCustomizedLegend = (props) => {
//     const { payload } = props;
    
//     return (
//       <div className="flex flex-wrap justify-center gap-4 mt-4">
//         {payload.map((entry, index) => (
//           <div 
//             key={`legend-${index}`} 
//             className="flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300"
//             style={{ 
//               backgroundColor: `${entry.color}20`,
//               border: `1px solid ${entry.color}40`
//             }}
//             onMouseEnter={() => setActiveIndex(index)}
//             onMouseLeave={() => setActiveIndex(null)}
//           >
//             <div 
//               className="w-3 h-3 rounded-full" 
//               style={{ backgroundColor: entry.color }}
//             />
//             <span className="text-sm font-medium text-gray-700">{entry.value}</span>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="h-92 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md overflow-hidden transform transition-all duration-500">
//       <div className="p-4">
//         <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">Project Status Overview</h3>
//         <p className="text-sm text-gray-500 text-center mb-4">Distribution of projects by current status</p>
//       </div>
//       <ResponsiveContainer width="100%" height="70%">
//         <PieChart>
//           <Pie
//             activeIndex={activeIndex}
//             activeShape={renderActiveShape}
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={isAnimated ? 50 : 0}
//             outerRadius={isAnimated ? 80 : 0}
//             paddingAngle={4}
//             dataKey="value"
//             onMouseEnter={onPieEnter}
//             onMouseLeave={onPieLeave}
//             animationBegin={0}
//             animationDuration={1200}
//             className="drop-shadow-md"
//             label={({ name, percent }) => isAnimated ? `${(percent * 100).toFixed(0)}%` : ''}
//             labelLine={false}
//           >
//             {data.map((entry, index) => (
//               <Cell 
//                 key={`cell-${index}`} 
//                 fill={entry.color} 
//                 style={{
//                   filter: activeIndex === index ? 'brightness(110%) saturate(120%)' : 'none',
//                   transition: 'filter 0.3s ease'
//                 }}
//               />
//             ))}
//           </Pie>
//           <Tooltip content={<CustomTooltip />} />
//           <Legend 
//             content={renderCustomizedLegend}
//             verticalAlign="bottom" 
//             height={36}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default StatusPieChart;

// import React, { useState, useEffect } from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector } from 'recharts';
// import { motion } from 'framer-motion';

// const StatusPieChart = ({ projects }) => {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [animationFinished, setAnimationFinished] = useState(false);

//   // Calculate status counts
//   const statusCount = projects.reduce((acc, project) => {
//     acc[project.status] = (acc[project.status] || 0) + 1;
//     return acc;
//   }, {});

//   // Enhanced color palette
//   const colorPalette = {
//     'Completed': '#10B981',    // Vibrant green
//     'In Progress': '#6366F1',  // Purple indigo
//     'Not Started': '#F97316',  // Bright orange
//     'On Hold': '#EC4899',      // Pink
//     'Cancelled': '#EF4444'     // Red
//   };

//   // Default color for any unspecified status
//   const defaultColor = '#8B5CF6'; // Purple

//   const data = Object.keys(statusCount).map(status => ({
//     name: status,
//     value: statusCount[status],
//     color: colorPalette[status] || defaultColor
//   }));

//   // Custom active shape for hover effect
//   const renderActiveShape = (props) => {
//     const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
//     return (
//       <g>
//         <Sector
//           cx={cx}
//           cy={cy}
//           innerRadius={innerRadius}
//           outerRadius={outerRadius + 10}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           fill={fill}
//         />
//         <Sector
//           cx={cx}
//           cy={cy}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           innerRadius={outerRadius + 10}
//           outerRadius={outerRadius + 12}
//           fill={fill}
//         />
//       </g>
//     );
//   };

//   // Custom tooltip
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
//           <p className="font-semibold text-gray-700">{payload[0].name}</p>
//           <p className="text-sm">
//             <span className="font-medium">{payload[0].value}</span> projects
//             {' '}
            
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Handle mouse enter for sector hover effect
//   const onPieEnter = (_, index) => {
//     setActiveIndex(index);
//   };

//   // Handle animation end
//   const handleAnimationEnd = () => {
//     setAnimationFinished(true);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.5, 
//         ease: "easeOut" 
//       } 
//     }
//   };

//   const titleVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         delay: 0.3,
//         duration: 0.5 
//       } 
//     }
//   };

//   return (
//     <motion.div 
//       className="bg-white rounded-xl shadow-lg p-6 overflow-hidden"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <motion.div variants={titleVariants}>
//         <h2 className="text-xl font-semibold text-gray-800 mb-6">Project Status Distribution</h2>
//       </motion.div>
      
//       <div className="h-72">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               activeIndex={activeIndex}
//               activeShape={renderActiveShape}
//               data={data}
//               cx="50%"
//               cy="50%"
//               labelLine={animationFinished}
//               outerRadius={90}
//               innerRadius={40}
//               fill="#8884d8"
//               dataKey="value"
//               onMouseEnter={onPieEnter}
//               isAnimationActive={true}
//               animationBegin={0}
//               animationDuration={1200}
//               animationEasing="ease-out"
//               onAnimationEnd={handleAnimationEnd}
//               label={animationFinished ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : false}
//             >
//               {data.map((entry, index) => (
//                 <Cell 
//                   key={`cell-${index}`} 
//                   fill={entry.color} 
//                   stroke="white"
//                   strokeWidth={2}
//                 />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//             <Legend 
//               layout="horizontal" 
//               verticalAlign="bottom" 
//               align="center"
//               wrapperStyle={{ paddingTop: '20px' }}
//               formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>}
//             />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </motion.div>
//   );
// };

// export default StatusPieChart;

// import React, { useState, useEffect } from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const StatusPieChart = ({ projects }) => {
//   const [animationActive, setAnimationActive] = useState(false);
  
//   useEffect(() => {
//     setAnimationActive(true);
//   }, []);
  
//   const statusCount = projects.reduce((acc, project) => {
//     acc[project.status] = (acc[project.status] || 0) + 1;
//     return acc;
//   }, {});
  
//   // Enhanced color palette - more visually appealing
//   const colorPalette = {
//     'Completed': '#10b981',      // Emerald green
//     'In Progress': '#3b82f6',    // Royal blue
//     'Pending': '#f59e0b',        // Amber
//     'Planning': '#8b5cf6',       // Violet
//     'On Hold': '#ec4899',        // Pink
//     'Cancelled': '#ef4444',      // Red
//   };
  
//   const data = Object.keys(statusCount).map(status => ({
//     name: status,
//     value: statusCount[status],
//     color: colorPalette[status] || '#6366f1' // Default to indigo if status not in palette
//   }));
  
//   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//     const RADIAN = Math.PI / 180;
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
//     return (
//       <text 
//         x={x} 
//         y={y} 
//         fill="#fff" 
//         fontWeight="bold"
//         fontSize="12px"
//         textAnchor="middle" 
//         dominantBaseline="central"
//       >
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };
  
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
//           <p className="font-semibold text-gray-800">{payload[0].name}</p>
//           <p className="text-gray-600">
//             Projects: <span className="font-medium">{payload[0].value}</span>
//           </p>
//           <p className="text-gray-600">
//             Percentage: <span className="font-medium">{(payload[0].payload.percent * 100).toFixed(1)}%</span>
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="rounded-xl bg-white shadow-md p-4 h-64">
//       <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Project Status Distribution</h3>
//       <ResponsiveContainer width="100%" height="90%">
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             label={renderCustomizedLabel}
//             outerRadius={80}
//             innerRadius={40} 
//             fill="#8884d8"
//             dataKey="value"
//             animationBegin={0}
//             animationDuration={1500}
//             animationEasing="ease-out"
//             isAnimationActive={animationActive}
//           >
//             {data.map((entry, index) => (
//               <Cell 
//                 key={`cell-${index}`} 
//                 fill={entry.color} 
//                 stroke="#fff" 
//                 strokeWidth={2}
//               />
//             ))}
//           </Pie>
//           <Tooltip content={<CustomTooltip />} />
//           <Legend 
//             layout="horizontal" 
//             verticalAlign="bottom" 
//             align="center"
//             iconType="circle"
//             iconSize={10}
//             wrapperStyle={{ paddingTop: "10px" }}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default StatusPieChart;