import React from 'react';
import { Star, Trash, Archive, Paperclip, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

function EmailList({
  filteredEmails,
  selectedEmail,
  toggleStar,
  moveToTrash,
  restoreFromBin,
  deleteEmail,
  activeFolder,
  handleEmailClick,
}) {
  const renderEmailItem = (email) => {
    const isActive = selectedEmail?.id === email.id;
    return (
      <motion.div
        key={email.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
        className={`flex items-center p-4 border-b cursor-pointer rounded-md m-2 shadow-sm hover:shadow-md transition-all duration-200 ${
          isActive ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'
        } ${!email.isRead && activeFolder === 'inbox' ? 'font-semibold bg-gray-50' : 'bg-white'}`}
        onClick={() => handleEmailClick(email)}
      >
        <div className="mr-3 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleStar(email.id);
            }}
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
          >
            <Star 
              className={email.isStarred ? 'text-yellow-400 fill-yellow-400' : ''} 
              size={18} 
            />
          </motion.button>
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between">
            <div className="truncate font-medium text-gray-800">
              {email.folder === 'sent' || email.folder === 'draft'
                ? email.to || '[No recipient]'
                : email.from}
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap ml-2">{email.date}</div>
          </div>
          <div className="truncate text-sm flex items-center text-gray-700 mt-1">
            {email.folder === 'draft' && (
              <span className="text-red-500 mr-1 px-2 py-0.5 bg-red-50 rounded-full text-xs">Draft</span>
            )}
            <span className="truncate font-medium">{email.subject}</span>
            {email.attachments.length > 0 && (
              <Paperclip size={14} className="ml-2 text-gray-500" />
            )}
          </div>
          <div className="truncate text-xs text-gray-500 mt-1">
            {email.content.substring(0, 60)}...
          </div>
        </div>
        <div className="ml-2 flex space-x-1">
          {activeFolder === 'bin' ? (
            <>
              <motion.button
                whileHover={{ scale: 1.2, color: "#3b82f6" }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-blue-500 p-1 rounded-full hover:bg-blue-50 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  restoreFromBin(email.id);
                }}
              >
                <Archive size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.2, color: "#ef4444" }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteEmail(email.id);
                }}
              >
                <Trash size={16} />
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.2, color: "#ef4444" }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                moveToTrash(email.id);
              }}
            >
              <Trash size={16} />
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-1/2 border-r overflow-y-auto bg-gray-50">
      <div className="p-4 border-b bg-white sticky top-0 z-10 shadow-sm flex justify-between items-center">
        <h2 className="font-medium capitalize text-gray-800 flex items-center">
          <span className="bg-blue-500 w-2 h-6 rounded mr-2"></span>
          {activeFolder}
        </h2>
        <div className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
          {filteredEmails.length} emails
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredEmails.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredEmails.map((email) => renderEmailItem(email))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center justify-center h-64 text-gray-500"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
              }}
            >
              <Mail size={48} className="mb-4 text-gray-300" />
            </motion.div>
            <p className="text-gray-500 font-medium">No emails found</p>
            <p className="text-gray-400 text-sm mt-1">Your {activeFolder} is empty</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default EmailList;