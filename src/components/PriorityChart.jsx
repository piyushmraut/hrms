// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Cell } from 'recharts';

// const PriorityChart = ({ tasks }) => {
//   const priorityCount = tasks.reduce((acc, task) => {
//     acc[task.priority] = (acc[task.priority] || 0) + 1;
//     return acc;
//   }, {});

//   const data = [
//     { name: 'High', value: priorityCount['High'] || 0, color: '#F97316' },
//     { name: 'Medium', value: priorityCount['Medium'] || 0, color: '#F59E0B' },
//     { name: 'Low', value: priorityCount['Low'] || 0, color: '#6B7280' },
//   ];

//   return (
//     <div className="h-64">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="value" name="Tasks">
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.color} />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PriorityChart;

// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// const PriorityChart = ({ tasks }) => {
//   const [animationActive, setAnimationActive] = useState(false);
  
//   useEffect(() => {
//     // Trigger animation after component mounts
//     setAnimationActive(true);
//   }, []);

//   const priorityCount = tasks?.reduce((acc, task) => {
//     acc[task.priority] = (acc[task.priority] || 0) + 1;
//     return acc;
//   }, {}) || {};

//   const data = [
//     { name: 'High', value: priorityCount['High'] || 0, color: '#ef4444' },
//     { name: 'Medium', value: priorityCount['Medium'] || 0, color: '#f59e0b' },
//     { name: 'Low', value: priorityCount['Low'] || 0, color: '#3b82f6' },
//   ];

//   // Custom tooltip component
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
//           <p className="font-semibold text-gray-800">{`${label} Priority`}</p>
//           <p className="text-lg font-bold" style={{ color: payload[0].payload.color }}>
//             {`${payload[0].value} Tasks`}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="bg-gray-50 rounded-xl shadow-md p-6 h-80">
      
//       <ResponsiveContainer width="100%" height="95%">
//         <BarChart
//           data={data}
//           margin={{
//             top: 5,
//             right: 20,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="5 5" stroke="#e5e7eb" />
//           <XAxis 
//             dataKey="name" 
//             tick={{ fill: '#4b5563', fontWeight: 500 }}
//             axisLine={{ stroke: '#9ca3af' }}
//           />
//           <YAxis 
//             tick={{ fill: '#4b5563' }}
//             axisLine={{ stroke: '#9ca3af' }}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <Legend 
//             wrapperStyle={{ paddingTop: 20 }}
//             formatter={(value) => <span className="text-gray-700 font-medium">{value}</span>}
//           />
//           <Bar 
//             dataKey="value" 
//             name="Tasks"
//             radius={[8, 8, 0, 0]}
//             animationDuration={1500}
//             animationBegin={300}
//             animationEasing="ease-out"
//           >
//             {data.map((entry, index) => (
//               <Cell 
//                 key={`cell-${index}`} 
//                 fill={entry.color}
//                 opacity={animationActive ? 1 : 0.4}
//                 className="transition-opacity duration-500"
//               />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PriorityChart;

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const PriorityChart = ({ tasks }) => {
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimationActive(true);
  }, []);

  const priorityCount = tasks?.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {}) || {};

  const data = [
    { name: 'High', value: priorityCount['High'] || 0, color: '#ef4444' },
    { name: 'Medium', value: priorityCount['Medium'] || 0, color: '#f59e0b' },
    { name: 'Low', value: priorityCount['Low'] || 0, color: '#3b82f6' },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-lg rounded-lg  p-4 border border-gray-200">
          <p className="font-semibold text-gray-800">{`${label} Priority`}</p>
          <p className="text rests-lg font-bold" style={{ color: payload[0].payload.color }}>
            {`${payload[0].value} Tasks`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const renderLegend = () => {
    return (
      <div className="flex justify-center space-x-4 mt-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-4 h-4 mr-2 rounded"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-gray-900 font-medium">{entry.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 border-2 border-dotted border-violet-800 rounded-xl shadow-md p-6 h-72">
      <ResponsiveContainer width="100%" height="110%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#4b5563', fontWeight: 500 }}
            axisLine={{ stroke: '#9ca3af' }}
          />
          <YAxis
            tick={{ fill: '#4b5563' }}
            axisLine={{ stroke: '#9ca3af' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            animationDuration={1500}
            animationBegin={300}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                opacity={animationActive ? 1 : 0.4}
                className="transition-opacity duration-500"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityChart;