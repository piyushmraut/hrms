

import React from 'react';
import { CheckCircle, Clock, AlertCircle, Calendar, List, TrendingUp, User, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, bgColor, textColor, borderColor, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
      className={`${bgColor} rounded-2xl shadow-md p-5 border-l-4 ${borderColor} overflow-hidden relative`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <motion.p 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: "spring" }}
            className={`text-3xl font-bold ${textColor}`}
          >
            {value}
          </motion.p>
        </div>
        <motion.div 
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: delay + 0.1, duration: 0.5 }}
          className="flex-shrink-0 p-3 rounded-full bg-white bg-opacity-30 backdrop-blur-sm"
        >
          {icon}
        </motion.div>
      </div>
      
      <div className="absolute -right-4 -bottom-4 opacity-10">
        <motion.div
          animate={{ 
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          {React.cloneElement(icon, { size: 80 })}
        </motion.div>
      </div>
    </motion.div>
  );
};

const TaskStatistics = ({ statistics }) => {
  // Define beautiful gradient backgrounds
  const cardStyles = [
    {
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      textColor: "text-blue-700",
      borderColor: "border-blue-500",
      icon: <List className="h-8 w-8 text-blue-500" />,
      delay: 0
    },
    {
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      textColor: "text-orange-700",
      borderColor: "border-orange-500",
      icon: <AlertCircle className="h-8 w-8 text-orange-500" />,
      delay: 0.1
    },
    {
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      textColor: "text-indigo-700",
      borderColor: "border-indigo-500",
      icon: <Clock className="h-8 w-8 text-indigo-500" />,
      delay: 0.2
    },
    {
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      textColor: "text-green-700",
      borderColor: "border-green-500",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      delay: 0.3
    },
    {
      bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      textColor: "text-red-700",
      borderColor: "border-red-500",
      icon: <AlertCircle className="h-8 w-8 text-red-500" />,
      delay: 0.4
    },
    {
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-500",
      icon: <Calendar className="h-8 w-8 text-yellow-500" />,
      delay: 0.5
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white rounded-3xl shadow-lg"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center mb-6"
      >
        <Layers className="text-purple-600 mr-3" size={24} />
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Task Dashboard Statistics
        </h2>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <StatCard
          title="Total Tasks"
          value={statistics.total}
          icon={cardStyles[0].icon}
          bgColor={cardStyles[0].bgColor}
          textColor={cardStyles[0].textColor}
          borderColor={cardStyles[0].borderColor}
          delay={cardStyles[0].delay}
        />
        
        <StatCard
          title="Pending"
          value={statistics.pending}
          icon={cardStyles[1].icon}
          bgColor={cardStyles[1].bgColor}
          textColor={cardStyles[1].textColor}
          borderColor={cardStyles[1].borderColor}
          delay={cardStyles[1].delay}
        />
        
        <StatCard
          title="In Progress"
          value={statistics.inProgress}
          icon={cardStyles[2].icon}
          bgColor={cardStyles[2].bgColor}
          textColor={cardStyles[2].textColor}
          borderColor={cardStyles[2].borderColor}
          delay={cardStyles[2].delay}
        />
        
        <StatCard
          title="Completed"
          value={statistics.completed}
          icon={cardStyles[3].icon}
          bgColor={cardStyles[3].bgColor}
          textColor={cardStyles[3].textColor}
          borderColor={cardStyles[3].borderColor}
          delay={cardStyles[3].delay}
        />
        
        <StatCard
          title="High Priority"
          value={statistics.highPriority}
          icon={cardStyles[4].icon}
          bgColor={cardStyles[4].bgColor}
          textColor={cardStyles[4].textColor}
          borderColor={cardStyles[4].borderColor}
          delay={cardStyles[4].delay}
        />
        
        <StatCard
          title="Due Soon"
          value={statistics.dueSoon}
          icon={cardStyles[5].icon}
          bgColor={cardStyles[5].bgColor}
          textColor={cardStyles[5].textColor}
          borderColor={cardStyles[5].borderColor}
          delay={cardStyles[5].delay}
        />
      </div>
    </motion.div>
  );
};

export default TaskStatistics;