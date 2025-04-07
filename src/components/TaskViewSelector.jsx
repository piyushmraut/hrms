import React from 'react';
import { TableIcon, LayoutIcon } from 'lucide-react';

const TaskViewSelector = ({ currentView, setCurrentView }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => setCurrentView('table')}
        className={`flex items-center px-3 py-2 rounded-md ${
          currentView === 'table' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <TableIcon className="w-5 h-5 mr-2" />
        Table View
      </button>
      <button
        onClick={() => setCurrentView('kanban')}
        className={`flex items-center px-3 py-2 rounded-md ${
          currentView === 'kanban' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <LayoutIcon className="w-5 h-5 mr-2" />
        Kanban View
      </button>
    </div>
  );
};

export default TaskViewSelector;