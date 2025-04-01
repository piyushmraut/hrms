// src/components/TaskCard.jsx
import React from 'react';

const TaskCard = ({ category, title, description, imageUrl }) => {
  let categoryColor;
  switch (category) {
    case 'Recruitment':
      categoryColor = 'bg-green-100 border-green-500';
      break;
    case 'Finance':
      categoryColor = 'bg-orange-100 border-orange-500';
      break;
    case 'Feedback':
      categoryColor = 'bg-purple-100 border-purple-500';
      break;
    default:
      categoryColor = 'bg-gray-100 border-gray-500';
  }

  return (
    <div className={`p-4 rounded-lg shadow-md ${categoryColor} border-l-4`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button className="text-gray-500">⋮</button>
      </div>
      <p className="text-gray-600 mt-2">{description}</p>
      {imageUrl && (
        <img src={imageUrl} alt="Team" className="mt-2 w-16 h-16 rounded-full" />
      )}
    </div>
  );
};

export default TaskCard;