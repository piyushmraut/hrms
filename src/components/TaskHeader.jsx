// src/components/TaskHeader.jsx
import React from 'react';

const TaskHeader = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex space-x-4">
        <button className="text-blue-500 font-semibold">Kanban</button>
        <button className="text-gray-500">Table</button>
        <button className="text-gray-500">List View</button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500">Filter</button>
        <select className="border rounded-lg p-2">
          <option>01 March 2025</option>
        </select>
      </div>
    </div>
  );
};

export default TaskHeader;