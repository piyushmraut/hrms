import React from 'react';
import { Star, Trash, Archive } from 'lucide-react';

const EmailList = ({ emails, selectedEmail, activeFolder, onEmailClick, onStarClick, onTrashClick, onRestoreClick, onDeleteClick }) => {
  const renderEmailItem = (email) => {
    const isActive = selectedEmail && selectedEmail.id === email.id;
    
    return (
      <div 
        key={email.id} 
        className={`flex items-center p-3 border-b cursor-pointer transition-colors duration-200 ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'} ${!email.isRead && activeFolder === 'inbox' ? 'font-semibold bg-gray-100' : ''}`}
        onClick={() => onEmailClick(email)}
      >
        <div className="mr-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onStarClick(email.id);
            }}
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Star className={email.isStarred ? 'text-yellow-400 fill-yellow-400' : ''} size={18} />
          </button>
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between">
            <div className="truncate font-medium text-gray-800">
              {email.folder === 'sent' || email.folder === 'draft' ? email.to || '[No recipient]' : email.from}
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap ml-2">{email.date}</div>
          </div>
          <div className="truncate text-sm text-gray-700">{email.subject}</div>
          <div className="truncate text-xs text-gray-500">{email.content.substring(0, 60)}...</div>
        </div>
        <div className="ml-2 flex">
          {activeFolder === 'bin' ? (
            <>
              <button 
                className="text-gray-400 hover:text-blue-500 p-1 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onRestoreClick(email.id);
                }}
              >
                <Archive size={16} />
              </button>
              <button 
                className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(email.id);
                }}
              >
                <Trash size={16} />
              </button>
            </>
          ) : (
            <button 
              className="text-gray-400 hover:text-red-500 p-1 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onTrashClick(email.id);
              }}
            >
              <Trash size={16} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full md:w-1/2 lg:w-2/5 border-r overflow-y-auto bg-white">
      <div className="p-3 border-b bg-gray-50 flex justify-between items-center sticky top-0 z-10">
        <h2 className="font-medium capitalize text-gray-700">{activeFolder}</h2>
        <div className="text-sm text-gray-500">{emails.length} {emails.length === 1 ? 'email' : 'emails'}</div>
      </div>
      {emails.length > 0 ? (
        emails.map(email => renderEmailItem(email))
      ): (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <Mail size={48} className="mb-4 opacity-30" />
          <p>No emails found</p>
        </div>
      )}
    </div>
  );
};

export default EmailList;