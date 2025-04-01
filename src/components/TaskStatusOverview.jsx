// src/components/TaskStatusOverview.jsx
import React from 'react';

const TaskStatusOverview = () => {
  return (
    <div className="flex justify-around p-4 bg-white shadow-md mt-4">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        <p>New Request: 3</p>
        <button className="text-blue-500">+</button>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
        <p>In Progress: 6</p>
        <button className="text-orange-500">+</button>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        <p>Complete: 12</p>
        <button className="text-green-500">+</button>
      </div>
    </div>
  );
};

export default TaskStatusOverview;