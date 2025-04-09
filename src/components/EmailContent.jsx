import React from 'react';
import { Star, Trash, Mail, Paperclip, Reply } from 'lucide-react';

function EmailContent({ selectedEmail, toggleStar, moveToTrash, onReply }) {
  if (!selectedEmail) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-gray-500 bg-gray-50 rounded-lg p-12">
        <Mail size={80} className="mb-6 opacity-30" />
        <p className="text-lg font-medium">Select an email to view</p>
        <p className="text-sm mt-2">Choose a message from your inbox to read it here</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm w-full h-full overflow-auto">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold text-gray-800">{selectedEmail.subject}</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => toggleStar(selectedEmail.id)}
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              aria-label="Star email"
            >
              <Star
                className={selectedEmail.isStarred ? 'text-yellow-400 fill-yellow-400' : ''}
                size={20}
              />
            </button>
            <button
              onClick={() => moveToTrash(selectedEmail.id)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              aria-label="Delete email"
            >
              <Trash size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                {selectedEmail.folder === 'sent' || selectedEmail.folder === 'draft'
                  ? selectedEmail.to?.charAt(0).toUpperCase() || '?'
                  : selectedEmail.from?.split(' ')[0]?.charAt(0).toUpperCase() || '?'}
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-800">
                {selectedEmail.folder === 'sent' || selectedEmail.folder === 'draft'
                  ? `To: ${selectedEmail.to || '[No recipient]'}`
                  : `From: ${selectedEmail.from}`}
              </p>
              <p className="text-sm text-gray-500">{selectedEmail.date}</p>
            </div>
          </div>
          
          {selectedEmail.folder === 'inbox' && (
            <button
              onClick={onReply}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
            >
              <Reply size={16} className="mr-1" />
              Reply
            </button>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-6">
        <div className="prose max-w-none text-gray-700 leading-relaxed">
          {selectedEmail.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        {selectedEmail.attachments.length > 0 && (
          <div className="mt-8 bg-gray-50 p-4 rounded-md">
            <h3 className="text-md font-medium mb-3 flex items-center text-gray-700">
              <Paperclip size={16} className="mr-2" />
              Attachments ({selectedEmail.attachments.length})
            </h3>
            <div className="flex flex-wrap gap-3">
              {selectedEmail.attachments.map((attachment, index) => (
                <div key={index} className="bg-white border border-gray-200 px-3 py-2 rounded-md flex items-center shadow-sm hover:shadow transition-shadow duration-200">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-2">
                    <span className="text-xs text-gray-500">{attachment.split('.').pop()}</span>
                  </div>
                  <span className="text-sm text-gray-600">{attachment}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailContent;