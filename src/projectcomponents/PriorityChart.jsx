import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Cell } from 'recharts';

const PriorityChart = ({ tasks }) => {
  const priorityCount = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: 'Critical', value: priorityCount['Critical'] || 0, color: '#EF4444' },
    { name: 'High', value: priorityCount['High'] || 0, color: '#F97316' },
    { name: 'Medium', value: priorityCount['Medium'] || 0, color: '#F59E0B' },
    { name: 'Low', value: priorityCount['Low'] || 0, color: '#6B7280' },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Tasks">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityChart;