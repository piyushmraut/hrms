import React, { useState, useRef } from 'react';
import { X, Paperclip, Send, Save } from 'lucide-react';

const ComposeModal = ({ onClose, onSend, onSaveDraft, initialEmail = {} }) => {
  const [email, setEmail] = useState({
    to: initialEmail.to || '',
    subject: initialEmail.subject || '',
    content: initialEmail.content || '',
    attachments: initialEmail.attachments || []
  });
  
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(prev => ({ ...prev, [name]: value }));
  };

  const handleAttach = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      size: formatFileSize(file.size),
      file
    }));
    
    setEmail(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  const removeAttachment = (index) => {
    setEmail(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(email);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
          <h3 className="text-lg font-medium text-gray-800">New Message</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">To:</label>
              <input
                type="email"
                name="to"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                value={email.to}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Subject:</label>
              <input
                type="text"
                name="subject"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                value={email.subject}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-700">Message:</label>
              <textarea
                name="content"
                className="w-full p-2 border rounded-lg h-64 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                value={email.content}
                onChange={handleChange}
              />
            </div>
            
            {email.attachments.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2 text-gray-700 flex items-center">
                  <Paperclip size={16} className="mr-2" /> Attachments
                </h4>
                <div className="flex flex-wrap gap-2">
                  {email.attachments.map((file, index) => (
                    <div key={index} className="flex items-center p-2 border rounded-lg bg-gray-50">
                      <Paperclip size={14} className="text-gray-500 mr-2" />
                      <span className="text-xs text-gray-700 truncate max-w-xs">{file.name}</span>
                      <button 
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="ml-2 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t flex justify-between items-center bg-gray-50 rounded-b-xl">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Attach file"
              >
                <Paperclip size={20} />
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleAttach} 
                  className="hidden" 
                  multiple 
                />
              </button>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => onSaveDraft(email)}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
              >
                <Save size={16} className="mr-2" /> Save Draft
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center shadow-md"
              >
                <Send size={16} className="mr-2" /> Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeModal;