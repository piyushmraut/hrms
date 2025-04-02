import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <span className="ml-2 text-indigo-600 font-medium">Loading Indian holidays...</span>
    </div>
  );
}

export default LoadingSpinner;