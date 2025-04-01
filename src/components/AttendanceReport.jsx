// src/components/AttendanceReport.jsx
import React from 'react';

const AttendanceReport = () => {
  const heatmapData = Array(35).fill(1); // Simplified dummy data for 5 weeks

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Attendance Report</h2>
      <div className="flex justify-between mt-2">
        <div>
          <p>Total Employ: 173</p>
          <p>On Time: 128</p>
          <p>Absent: 21</p>
          <p>Late: 24</p>
        </div>
        <div>
          <select className="border rounded-lg p-2">
            <option>01 March 2025</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-7 gap-1">
          {heatmapData.map((value, index) => (
            <div
              key={index}
              className={`w-4 h-4 ${value === 1 ? 'bg-blue-500' : 'bg-blue-200'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;