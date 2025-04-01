// src/components/MetricsCard.jsx
import React from 'react';

const MetricsCard = ({ title, value, change, changeDirection, additionalInfo, buttonText }) => {
  const changeColor = changeDirection === 'increase' ? 'text-green-500' : 'text-orange-500';
  const arrow = changeDirection === 'increase' ? '↑' : '↓';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
      <p className={`${changeColor} text-sm`}>
        {arrow} {change}
      </p>
      <p className="text-gray-500 text-sm">{additionalInfo}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">{buttonText}</button>
    </div>
  );
};

export default MetricsCard;