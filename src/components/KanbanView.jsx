// import React from 'react';
// import { PlusIcon, Edit2Icon, Trash2Icon } from 'lucide-react';

// const KanbanView = ({ tasks, updateTaskStatus, startEditing, deleteTask }) => {
//   // Group tasks by status
//   const tasksByStatus = {
//     pending: tasks.filter(task => task.status === 'pending'),
//     'in-progress': tasks.filter(task => task.status === 'in-progress'),
//     completed: tasks.filter(task => task.status === 'completed')
//   };

//   // Function to determine the color based on priority
//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'border-l-4 border-red-500';
//       case 'medium': return 'border-l-4 border-yellow-500';
//       case 'low': return 'border-l-4 border-green-500';
//       default: return '';
//     }
//   };

//   // Check if a task is past due date
//   const isOverdue = (dueDate) => {
//     return new Date(dueDate) < new Date();
//   };

//   // Render a task card
//   const TaskCard = ({ task }) => (
//     <div 
//       className={`mb-3 p-3 bg-white rounded-md shadow ${getPriorityColor(task.priority)} hover:shadow-md`}
//       draggable="true"
//       onDragStart={(e) => {
//         e.dataTransfer.setData('taskId', task.id.toString());
//       }}
//     >
//       <div className="flex justify-between items-start mb-2">
//         <h4 className="font-medium text-gray-800">{task.title}</h4>
//         <div className="flex space-x-1">
//           <button 
//             onClick={() => startEditing(task.id)}
//             className="text-gray-500 hover:text-indigo-600"
//           >
//             <Edit2Icon className="w-4 h-4" />
//           </button>
//           <button 
//             onClick={() => deleteTask(task.id)}
//             className="text-gray-500 hover:text-red-600"
//           >
//             <Trash2Icon className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
      
//       <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
//       <div className="flex flex-wrap gap-2 mb-2">
//         <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
//           {task.category}
//         </span>
//         <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
//           isOverdue(task.dueDate) ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
//         }`}>
//           Due: {task.dueDate}
//         </span>
//       </div>
      
//       <div className="flex items-center justify-between mt-2 text-sm">
//         <div className="flex items-center">
//           <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
//             {task.assignedTo.charAt(0).toUpperCase()}
//           </div>
//           <span className="ml-1 text-gray-600">{task.assignedTo}</span>
//         </div>
//       </div>
//     </div>
//   );

//   // Handle dropping a task in a column
//   const handleDrop = (e, newStatus) => {
//     e.preventDefault();
//     const taskId = parseInt(e.dataTransfer.getData('taskId'));
//     updateTaskStatus(taskId, newStatus);
//   };

//   // Allow dropping
//   const allowDrop = (e) => {
//     e.preventDefault();
//   };

//   // Column titles and their styling
//   const columns = [
//     { id: 'pending', title: 'Pending', bgColor: 'bg-orange-50', borderColor: 'border-orange-300' },
//     { id: 'in-progress', title: 'In Progress', bgColor: 'bg-blue-50', borderColor: 'border-blue-300' },
//     { id: 'completed', title: 'Completed', bgColor: 'bg-green-50', borderColor: 'border-green-300' }
//   ];

//   return (
//     <div className="flex flex-col md:flex-row gap-4 overflow-x-auto">
//       {columns.map(column => (
//         <div 
//           key={column.id}
//           className={`flex-1 min-w-[250px] ${column.bgColor} border ${column.borderColor} rounded-lg shadow-sm`}
//           onDrop={(e) => handleDrop(e, column.id)}
//           onDragOver={allowDrop}
//         >
//           <div className="p-3 border-b border-gray-200">
//             <h3 className="font-semibold">{column.title} ({tasksByStatus[column.id].length})</h3>
//           </div>
          
//           <div className="p-3 h-[calc(100vh-280px)] overflow-y-auto">
//             {tasksByStatus[column.id].map(task => (
//               <TaskCard key={task.id} task={task} />
//             ))}
            
//             {tasksByStatus[column.id].length === 0 && (
//               <div className="text-center py-8 text-gray-400">
//                 No tasks in this column
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

//  export default KanbanView;

import React, { useState } from 'react';
import { PlusIcon, Edit2Icon, Trash2Icon, ClockIcon, TagIcon, UserIcon } from 'lucide-react';

const KanbanView = ({ tasks, updateTaskStatus, startEditing, deleteTask }) => {
  // Group tasks by status
  const tasksByStatus = {
    pending: tasks.filter(task => task.status === 'pending'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    completed: tasks.filter(task => task.status === 'completed')
  };

  // State for tracking which task is being dragged
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // Function to determine the color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-rose-500';
      case 'medium': return 'border-l-4 border-amber-500';
      case 'low': return 'border-l-4 border-emerald-500';
      default: return '';
    }
  };

  // Check if a task is past due date
  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  // Render a task card
  const TaskCard = ({ task }) => (
    <div 
      className={`mb-3 p-4 bg-white rounded-lg shadow-sm ${getPriorityColor(task.priority)} 
        hover:shadow-md transition-all duration-300 ease-in-out 
        ${draggedTaskId === task.id ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', task.id.toString());
        setDraggedTaskId(task.id);
      }}
      onDragEnd={() => setDraggedTaskId(null)}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-800">{task.title}</h4>
        <div className="flex space-x-1">
          <button 
            onClick={() => startEditing(task.id)}
            className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
          >
            <Edit2Icon className="w-4 h-4" />
          </button>
          <button 
            onClick={() => deleteTask(task.id)}
            className="text-gray-400 hover:text-rose-600 transition-colors duration-200"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-800">
          <TagIcon className="w-3 h-3" />
          {task.category}
        </span>
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
          isOverdue(task.dueDate) 
            ? 'bg-rose-100 text-rose-800' 
            : 'bg-sky-100 text-sky-800'
        }`}>
          <ClockIcon className="w-3 h-3" />
          {task.dueDate}
        </span>
      </div>
      
      <div className="flex items-center justify-between mt-2 text-sm">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs text-white shadow-sm">
            {task.assignedTo.charAt(0).toUpperCase()}
          </div>
          <span className="ml-2 text-gray-600">{task.assignedTo}</span>
        </div>
      </div>
    </div>
  );

  // Handle dropping a task in a column
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    updateTaskStatus(taskId, newStatus);
    setDraggedTaskId(null);
  };

  // Allow dropping
  const allowDrop = (e) => {
    e.preventDefault();
  };

  // Handle drag enter for visual feedback
  const [activeColumn, setActiveColumn] = useState(null);

  // Column configurations with gradients and styling
  const columns = [
    { 
      id: 'pending', 
      title: 'Pending', 
      bgColor: 'bg-gradient-to-b from-amber-50 to-orange-50', 
      borderColor: 'border-amber-200',
      iconBg: 'bg-amber-500' 
    },
    { 
      id: 'in-progress', 
      title: 'In Progress', 
      bgColor: 'bg-gradient-to-b from-blue-50 to-indigo-50', 
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-500' 
    },
    { 
      id: 'completed', 
      title: 'Completed', 
      bgColor: 'bg-gradient-to-b from-emerald-50 to-green-50', 
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-500' 
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 overflow-x-auto p-4">
      {columns.map(column => (
        <div 
          key={column.id}
          className={`flex-1 min-w-[280px] ${column.bgColor} border ${column.borderColor} rounded-xl shadow-sm
            ${activeColumn === column.id ? 'ring-2 ring-indigo-300 ring-opacity-50' : ''}
            transition-all duration-300 ease-in-out`}
          onDrop={(e) => handleDrop(e, column.id)}
          onDragOver={allowDrop}
          onDragEnter={() => setActiveColumn(column.id)}
          onDragLeave={() => setActiveColumn(null)}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${column.iconBg} mr-2`}></div>
              <h3 className="font-semibold text-gray-700">{column.title}</h3>
            </div>
            <span className="bg-white text-gray-600 text-xs font-medium rounded-full px-2 py-1 shadow-sm">
              {tasksByStatus[column.id].length}
            </span>
          </div>
          
          <div className="p-4 h-[calc(100vh-280px)] overflow-y-auto">
            {tasksByStatus[column.id].map((task, index) => (
              <div 
                key={task.id} 
                className="animate-fadeIn" 
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TaskCard task={task} />
              </div>
            ))}
            
            {tasksByStatus[column.id].length === 0 && (
              <div className="text-center py-12 text-gray-400 animate-pulse">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                  <PlusIcon className="w-6 h-6 text-gray-400" />
                </div>
                <p>Drop tasks here</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default KanbanView;

// import React, { useState } from 'react';
// import { PlusIcon, Edit2Icon, Trash2Icon } from 'lucide-react';

// const KanbanView = ({ tasks, updateTaskStatus, startEditing, deleteTask }) => {
//   // Track which card is being dragged for visual feedback
//   const [draggedTaskId, setDraggedTaskId] = useState(null);
  
//   // Group tasks by status
//   const tasksByStatus = {
//     pending: tasks.filter(task => task.status === 'pending'),
//     'in-progress': tasks.filter(task => task.status === 'in-progress'),
//     completed: tasks.filter(task => task.status === 'completed')
//   };

//   // Function to determine the color based on priority
//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'border-l-4 border-red-500';
//       case 'medium': return 'border-l-4 border-yellow-500';
//       case 'low': return 'border-l-4 border-green-500';
//       default: return '';
//     }
//   };

//   // Check if a task is past due date
//   const isOverdue = (dueDate) => {
//     return new Date(dueDate) < new Date();
//   };

//   // Render a task card
//   const TaskCard = ({ task }) => (
//     <div 
//       className={`mb-3 p-3 bg-white rounded-md shadow ${getPriorityColor(task.priority)} 
//         hover:shadow-lg transition-all duration-300 transform 
//         ${draggedTaskId === task.id ? 'scale-105 opacity-75' : 'hover:-translate-y-1'}`}
//       draggable="true"
//       onDragStart={(e) => {
//         e.dataTransfer.setData('taskId', task.id.toString());
//         setDraggedTaskId(task.id);
//       }}
//       onDragEnd={() => setDraggedTaskId(null)}
//     >
//       <div className="flex justify-between items-start mb-2">
//         <h4 className="font-medium text-gray-800">{task.title}</h4>
//         <div className="flex space-x-1">
//           <button 
//             onClick={() => startEditing(task.id)}
//             className="text-gray-500 hover:text-indigo-600 transition-colors duration-200"
//           >
//             <Edit2Icon className="w-4 h-4" />
//           </button>
//           <button 
//             onClick={() => deleteTask(task.id)}
//             className="text-gray-500 hover:text-red-600 transition-colors duration-200"
//           >
//             <Trash2Icon className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
      
//       <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
//       <div className="flex flex-wrap gap-2 mb-2">
//         <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
//           {task.category}
//         </span>
//         <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
//           isOverdue(task.dueDate) 
//             ? 'bg-red-100 text-red-800 animate-pulse' 
//             : 'bg-blue-100 text-blue-800'
//         }`}>
//           Due: {task.dueDate}
//         </span>
//       </div>
      
//       <div className="flex items-center justify-between mt-2 text-sm">
//         <div className="flex items-center">
//           <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white shadow-sm">
//             {task.assignedTo.charAt(0).toUpperCase()}
//           </div>
//           <span className="ml-2 text-gray-600">{task.assignedTo}</span>
//         </div>
//       </div>
//     </div>
//   );

//   // Handle dropping a task in a column
//   const handleDrop = (e, newStatus) => {
//     e.preventDefault();
//     const taskId = parseInt(e.dataTransfer.getData('taskId'));
//     updateTaskStatus(taskId, newStatus);
    
//     // Add target column highlight effect
//     const column = document.getElementById(`column-${newStatus}`);
//     column.classList.add('bg-opacity-80');
//     setTimeout(() => {
//       column.classList.remove('bg-opacity-80');
//     }, 300);
//   };

//   // Handle drag over column
//   const handleDragOver = (e, columnId) => {
//     e.preventDefault();
//     // Add column highlight effect when dragging over
//     const column = document.getElementById(`column-${columnId}`);
//     column.classList.add('bg-opacity-90');
//   };

//   // Handle drag leave column
//   const handleDragLeave = (e, columnId) => {
//     e.preventDefault();
//     // Remove column highlight effect
//     const column = document.getElementById(`column-${columnId}`);
//     column.classList.remove('bg-opacity-90');
//   };

//   // Column titles and their styling
//   const columns = [
//     { id: 'pending', title: 'Pending', bgColor: 'bg-orange-50', borderColor: 'border-orange-300', headerBg: 'bg-orange-100' },
//     { id: 'in-progress', title: 'In Progress', bgColor: 'bg-blue-50', borderColor: 'border-blue-300', headerBg: 'bg-blue-100' },
//     { id: 'completed', title: 'Completed', bgColor: 'bg-green-50', borderColor: 'border-green-300', headerBg: 'bg-green-100' }
//   ];

//   return (
//     <div className="flex flex-col md:flex-row gap-6 overflow-x-auto p-4">
//       {columns.map(column => (
//         <div 
//           id={`column-${column.id}`}
//           key={column.id}
//           className={`flex-1 min-w-[280px] ${column.bgColor} border ${column.borderColor} rounded-lg shadow-md 
//             transition-all duration-300 transform hover:shadow-lg relative`}
//           onDrop={(e) => handleDrop(e, column.id)}
//           onDragOver={(e) => handleDragOver(e, column.id)}
//           onDragLeave={(e) => handleDragLeave(e, column.id)}
//         >
//           <div className={`p-4 ${column.headerBg} border-b ${column.borderColor} rounded-t-lg`}>
//             <div className="flex items-center justify-between">
//               <h3 className="font-semibold text-gray-800">{column.title}</h3>
//               <span className="bg-white text-gray-700 font-medium px-2 py-1 rounded-full text-xs shadow-sm">
//                 {tasksByStatus[column.id].length}
//               </span>
//             </div>
//           </div>
          
//           <div className="p-4 h-[calc(100vh-280px)] overflow-y-auto">
//             {tasksByStatus[column.id].map((task, index) => (
//               <div key={task.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
//                 <TaskCard task={task} />
//               </div>
//             ))}
            
//             {tasksByStatus[column.id].length === 0 && (
//               <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-md mt-4">
//                 <p className="font-medium">No tasks yet</p>
//                 <p className="text-xs mt-1">Drag tasks here</p>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // Add custom animation keyframes
// const styles = `
//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(10px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
  
//   .animate-fadeIn {
//     animation: fadeIn 0.3s ease-out forwards;
//   }
  
//   @keyframes pulse {
//     0%, 100% { opacity: 1; }
//     50% { opacity: 0.6; }
//   }
  
//   .animate-pulse {
//     animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//   }
// `;

// // Inject the styles into the document
// const StyleInjector = () => {
//   return <style>{styles}</style>;
// };

// // Wrap the KanbanView with style injector
// const EnhancedKanbanView = (props) => (
//   <>
//     <StyleInjector />
//     <KanbanView {...props} />
//   </>
// );

// export default EnhancedKanbanView;