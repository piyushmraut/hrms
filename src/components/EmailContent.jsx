import React from 'react';
import { Star, Trash, Reply, Forward, Archive, Clock, Paperclip,Mail } from 'lucide-react';

const EmailContent = ({ email, onStarClick, onTrashClick, onReply, onForward }) => {
  if (!email) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-gray-50">
        <Mail size={64} className="mb-4 opacity-30" />
        <p>Select an email to view</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 lg:w-3/5 overflow-y-auto bg-white p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-medium mb-4 text-gray-800">{email.subject}</h1>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="font-medium text-gray-700">
              {email.folder === 'sent' || email.folder === 'draft' ? `To: ${email.to || '[No recipient]'}` : `From: ${email.from}`}
            </p>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <Clock size={14} className="mr-1" /> {email.date}
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => onStarClick(email.id)}
              className="text-gray-400 hover:text-yellow-400 transition-colors p-1"
            >
              <Star className={email.isStarred ? 'text-yellow-400 fill-yellow-400' : ''} size={20} />
            </button>
            <button 
              onClick={() => onTrashClick(email.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <Trash size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <div className="prose max-w-none text-gray-700">
          {email.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Paperclip size={16} className="mr-2" /> Attachments ({email.attachments.length})
            </h3>
            <div className="flex flex-wrap gap-3">
              {email.attachments.map((file, index) => (
                <div key={index} className="flex items-center p-2 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Paperclip size={16} className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-2">({file.size})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 pt-4 border-t flex justify-end space-x-3">
        <button 
          onClick={onReply}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
        >
          <Reply size={16} className="mr-2" /> Reply
        </button>
        <button 
          onClick={onForward}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
        >
          <Forward size={16} className="mr-2" /> Forward
        </button>
      </div>
    </div>
  );
};

export default EmailContent;