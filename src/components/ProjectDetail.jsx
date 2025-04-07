// ProjectDetail.jsx
import React from 'react';
import { Calendar, User, DollarSign, Clock, Users, Tag, CheckCircle, ArrowLeft, Edit, Trash2 } from 'lucide-react';

const ProjectDetail = ({ project, onBack, onEdit, onDelete }) => {
  if (!project) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back to Projects</span>
        </button>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(project)}
            className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button 
            onClick={() => onDelete(project.id)}
            className="flex items-center gap-1 px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Description</h3>
        <p className="text-gray-600">{project.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-start">
          <Calendar className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-500">Timeline</h4>
            <p className="text-gray-800">
              {project.startDate} - {project.endDate}
            </p>
            <p className="text-sm text-gray-500 mt-1">{project.duration}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <DollarSign className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-500">Budget</h4>
            <p className="text-gray-800">${project.budget ? project.budget.toLocaleString() : '0'}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <User className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-500">Client</h4>
            <p className="text-gray-800">{project.clientName || 'Not assigned'}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Tag className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-500">Priority</h4>
            <p className="text-gray-800">{project.priority || 'Medium'}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-blue-600 h-4 rounded-full" 
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>0%</span>
          <span>{project.progress}% Complete</span>
          <span>100%</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Team Members</h3>
        {project.teamMembers && project.teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.teamMembers.map(member => (
              <div key={member.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <Users className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No team members assigned to this project yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;