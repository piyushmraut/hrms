import React from 'react';
import { CheckCircleIcon, ClockIcon, AlertCircleIcon, CalendarIcon, ListIcon } from 'lucide-react';

const StatCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-lg shadow p-4`}>
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

const TaskStatistics = ({ statistics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatCard
        title="Total Tasks"
        value={statistics.total}
        icon={<ListIcon className="h-8 w-8 text-blue-500" />}
        bgColor="bg-blue-50"
      />
      
      <StatCard
        title="Pending"
        value={statistics.pending}
        icon={<AlertCircleIcon className="h-8 w-8 text-orange-500" />}
        bgColor="bg-orange-50"
      />
      
      <StatCard
        title="In Progress"
        value={statistics.inProgress}
        icon={<ClockIcon className="h-8 w-8 text-indigo-500" />}
        bgColor="bg-indigo-50"
      />
      
      <StatCard
        title="Completed"
        value={statistics.completed}
        icon={<CheckCircleIcon className="h-8 w-8 text-green-500" />}
        bgColor="bg-green-50"
      />
      
      <StatCard
        title="High Priority"
        value={statistics.highPriority}
        icon={<AlertCircleIcon className="h-8 w-8 text-red-500" />}
        bgColor="bg-red-50"
      />
      
      <StatCard
        title="Due Soon"
        value={statistics.dueSoon}
        icon={<CalendarIcon className="h-8 w-8 text-yellow-500" />}
        bgColor="bg-yellow-50"
      />
    </div>
  );
};

export default TaskStatistics;