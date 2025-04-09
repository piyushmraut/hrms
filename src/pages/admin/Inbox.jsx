

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import Sidebar from '../../components/SidebarEmail';
import EmailList from '../../components/EmailList';
import EmailContent from '../../components/EmailContent';
import { motion, AnimatePresence } from 'framer-motion';

function Inbox() {
  const [emails, setEmails] = useState([
    // {
    //   id: 1,
    //   from: 'hr@company.com',
    //   to: 'john@company.com',
    //   subject: 'Monthly Performance Review',
    //   content:
    //     "Hello John, It's time for your monthly performance review. Please prepare the necessary documents.",
    //   date: '2025-04-06',
    //   isStarred: true,
    //   isRead: true,
    //   folder: 'inbox',
    //   attachments: ['review_form.docx'],
    // },
    // {
    //   id: 2,
    //   from: 'manager@company.com',
    //   to: 'john@company.com',
    //   subject: 'Team Meeting Tomorrow',
    //   content:
    //     'Team, We have a meeting scheduled tomorrow at 10 AM to discuss the quarterly targets.',
    //   date: '2025-04-07',
    //   isStarred: false,
    //   isRead: false,
    //   folder: 'inbox',
    //   attachments: [],
    // },
    {
      id: 3,
      from: 'john@company.com',
      to: 'finance@company.com',
      subject: 'Expense Approval',
      content:
        "Dear Finance Team, I'm submitting my monthly expense report for approval.",
      date: '2025-04-05',
      isStarred: false,
      isRead: true,
      folder: 'sent',
      attachments: ['expense_report.pdf', 'receipts.zip'],
    },
    {
      id: 4,
      from: 'john@company.com',
      to: '',
      subject: 'Project Proposal Draft',
      content: 'This is a draft for the upcoming project proposal...',
      date: '2025-04-04',
      isStarred: false,
      isRead: true,
      folder: 'draft',
      attachments: [],
    },
    {
      id: 5,
      from: 'support@service.com',
      to: 'john@company.com',
      subject: 'Your subscription is expiring',
      content:
        'Your premium subscription will expire in 7 days. Renew now to avoid service interruption.',
      date: '2025-04-03',
      isStarred: true,
      isRead: false,
      folder: 'inbox',
      attachments: ['renewal_offer.pdf'],
    },
    {
      id: 10,
      from: 'system@company.com',
      to: 'john@company.com',
      subject: 'Password Reset Required',
      content:
        'For security reasons, please reset your password within the next 24 hours.',
      date: '2025-03-29',
      isStarred: true,
      isRead: false,
      folder: 'inbox',
      attachments: [],
    },
    {
      id: 11,
      from: 'colleague@company.com',
      to: 'john@company.com',
      subject: 'Need your feedback on the design',
      content:
        'John, Could you review the attached design mockups and share your thoughts by EOD?',
      date: '2025-03-28',
      isStarred: false,
      isRead: true,
      folder: 'inbox',
      attachments: ['design_mockup_v1.pdf', 'design_mockup_v2.pdf'],
    },
    {
      id: 14,
      from: 'john@company.com',
      to: 'vendor@supplier.com',
      subject: 'Order Inquiry',
      content:
        'Hello, I would like to inquire about the status of our recent order #45678.',
      date: '2025-03-25',
      isStarred: false,
      isRead: true,
      folder: 'sent',
      attachments: ['purchase_order.pdf'],
    },
  ]);

  const [activeFolder, setActiveFolder] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [newEmail, setNewEmail] = useState({ to: '', subject: '', content: '', attachments: [] });
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState(null);

  // Compute filtered emails
  const filteredEmails = emails.filter((email) => {
    const matchesFolder =
      activeFolder === 'starred'
        ? email.isStarred
        : activeFolder === 'all'
        ? true
        : email.folder === activeFolder;
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && (searchQuery === '' || matchesSearch);
  });

  // Compute email counts
  const counts = {
    inbox: emails.filter((e) => e.folder === 'inbox').length,
    starred: emails.filter((e) => e.isStarred).length,
    sent: emails.filter((e) => e.folder === 'sent').length,
    draft: emails.filter((e) => e.folder === 'draft').length,
    bin: emails.filter((e) => e.folder === 'bin').length,
    all: emails.length,
  };

  // Action functions
  const toggleStar = (id) => {
    setEmails(emails.map((email) =>
      email.id === id ? { ...email, isStarred: !email.isStarred } : email
    ));
  };

  const moveToTrash = (id) => {
    setEmails(emails.map((email) =>
      email.id === id ? { ...email, folder: 'bin' } : email
    ));
    if (selectedEmail?.id === id) setSelectedEmail(null);
  };

  const restoreFromBin = (id) => {
    setEmails(emails.map((email) =>
      email.id === id ? { ...email, folder: 'inbox' } : email
    ));
  };

  const deleteEmail = (id) => {
    setEmails(emails.filter((email) => email.id !== id));
    if (selectedEmail?.id === id) setSelectedEmail(null);
  };

  const markAsRead = (id) => {
    setEmails(emails.map((email) =>
      email.id === id ? { ...email, isRead: true } : email
    ));
  };

  const handleEmailClick = (email) => {
    if (email.folder === 'draft') {
      setIsEditingDraft(true);
      setCurrentDraftId(email.id);
      setNewEmail({
        to: email.to,
        subject: email.subject,
        content: email.content,
        attachments: email.attachments || [],
      });
      setShowComposeModal(true);
    } else {
      setSelectedEmail(email);
      markAsRead(email.id);
    }
  };

  const handleReply = () => {
    setNewEmail({
      to: selectedEmail.from,
      subject: `Re: ${selectedEmail.subject}`,
      content: `\n\n\n---\nOriginal message:\nFrom: ${selectedEmail.from}\nDate: ${selectedEmail.date}\n\n${selectedEmail.content}`,
      attachments: [],
    });
    setShowComposeModal(true);
  };

  const sendEmail = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    if (isEditingDraft) {
      setEmails(emails.map((email) =>
        email.id === currentDraftId
          ? {
              ...email,
              to: newEmail.to,
              subject: newEmail.subject,
              content: newEmail.content,
              attachments: newEmail.attachments,
              folder: 'sent',
              date: currentDate,
            }
          : email
      ));
    } else {
      const emailToSend = {
        id: emails.length + 1,
        from: 'john@company.com',
        to: newEmail.to,
        subject: newEmail.subject,
        content: newEmail.content,
        date: currentDate,
        isStarred: false,
        isRead: true,
        folder: 'sent',
        attachments: newEmail.attachments,
      };
      setEmails([...emails, emailToSend]);
    }
    setShowComposeModal(false);
    setIsEditingDraft(false);
    setCurrentDraftId(null);
    setNewEmail({ to: '', subject: '', content: '', attachments: [] });
  };

  const saveDraft = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    if (isEditingDraft) {
      setEmails(emails.map((email) =>
        email.id === currentDraftId
          ? {
              ...email,
              to: newEmail.to,
              subject: newEmail.subject,
              content: newEmail.content,
              attachments: newEmail.attachments,
            }
          : email
      ));
    } else {
      const draftEmail = {
        id: emails.length + 1,
        from: 'john@company.com',
        to: newEmail.to,
        subject: newEmail.subject,
        content: newEmail.content,
        date: currentDate,
        isStarred: false,
        isRead: true,
        folder: 'draft',
        attachments: newEmail.attachments,
      };
      setEmails([...emails, draftEmail]);
    }
    setShowComposeModal(false);
    setIsEditingDraft(false);
    setCurrentDraftId(null);
    setNewEmail({ to: '', subject: '', content: '', attachments: [] });
  };

  const saveChanges = () => {
    setEmails(emails.map((email) =>
      email.id === currentDraftId
        ? {
            ...email,
            to: newEmail.to,
            subject: newEmail.subject,
            content: newEmail.content,
            attachments: newEmail.attachments,
          }
        : email
    ));
    setShowComposeModal(false);
    setIsEditingDraft(false);
    setCurrentDraftId(null);
    setNewEmail({ to: '', subject: '', content: '', attachments: [] });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeFolder={activeFolder}
        setActiveFolder={setActiveFolder}
        counts={counts}
        setShowComposeModal={setShowComposeModal}
      />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800">
        {/* Search Bar */}
        {/* <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div> */}
        <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 border-b border-blue-100 shadow-sm"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search emails..."
            className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white/70 backdrop-blur-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute left-3 top-3.5 text-blue-400"
          >
            <Search size={20} className="animate-pulse" />
          </motion.div>
        </div>
      </motion.div>
        {/* Email List and Content */}
        <div className="flex-1 flex overflow-hidden">
          <EmailList
            filteredEmails={filteredEmails}
            selectedEmail={selectedEmail}
            toggleStar={toggleStar}
            moveToTrash={moveToTrash}
            restoreFromBin={restoreFromBin}
            deleteEmail={deleteEmail}
            activeFolder={activeFolder}
            handleEmailClick={handleEmailClick}
          />
          <EmailContent
            selectedEmail={selectedEmail}
            toggleStar={toggleStar}
            moveToTrash={moveToTrash}
            onReply={handleReply}
          />
        </div>
      </div>
      {/* Compose Email Modal */}
      {/* {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-2/3 max-w-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {isEditingDraft ? 'Edit Draft' : 'Compose Email'}
              </h3>
              <button
                onClick={() => setShowComposeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">To:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={newEmail.to}
                  onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Subject:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={newEmail.subject}
                  onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Message:</label>
                <textarea
                  className="w-full p-2 border rounded h-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={newEmail.content}
                  onChange={(e) => setNewEmail({ ...newEmail, content: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Attachments:</label>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="attachment-input"
                  onChange={(e) => {
                    const files = Array.from(e.target.files).map((file) => file.name);
                    setNewEmail((prev) => ({
                      ...prev,
                      attachments: [...prev.attachments, ...files],
                    }));
                  }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('attachment-input').click()}
                  className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Attach Files
                </button>
                <div className="mt-2">
                  {newEmail.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded mb-1"
                    >
                      <span>{attachment}</span>
                      <button
                        onClick={() => {
                          setNewEmail((prev) => ({
                            ...prev,
                            attachments: prev.attachments.filter((_, i) => i !== index),
                          }));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                {isEditingDraft ? (
                  <>
                    <button
                      onClick={saveChanges}
                      className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={sendEmail}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Send
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={saveDraft}
                      className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                    >
                      Save as Draft
                    </button>
                    <button
                      onClick={sendEmail}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Send
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )} */}

{showComposeModal && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    style={{ 
      animation: "fadeIn 0.3s ease-out" 
    }}
  >
    <div 
      className="bg-white rounded-lg shadow-2xl w-2/3 max-w-2xl overflow-hidden"
      style={{ 
        animation: "slideDown 0.4s ease-out" 
      }}
    >
      {/* Header Section */}
      <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-xl font-semibold text-gray-800">
          {isEditingDraft ? 'Edit Draft' : 'Compose Email'}
        </h3>
        <button
          onClick={() => setShowComposeModal(false)}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* To Field */}
        <div className="mb-5 group">
          <label className="block text-sm font-medium mb-1 text-gray-700">To:</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50 group-hover:bg-white"
            value={newEmail.to}
            onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
            placeholder="recipient@example.com"
          />
        </div>

        {/* Subject Field */}
        <div className="mb-5 group">
          <label className="block text-sm font-medium mb-1 text-gray-700">Subject:</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50 group-hover:bg-white"
            value={newEmail.subject}
            onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
            placeholder="Enter subject"
          />
        </div>

        {/* Message Field */}
        <div className="mb-5 group">
          <label className="block text-sm font-medium mb-1 text-gray-700">Message:</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md h-64 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none bg-gray-50 group-hover:bg-white"
            value={newEmail.content}
            onChange={(e) => setNewEmail({ ...newEmail, content: e.target.value })}
            placeholder="Write your message here..."
          />
        </div>

        {/* Attachments Section */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2 text-gray-700">Attachments:</label>
          <input
            type="file"
            multiple
            className="hidden"
            id="attachment-input"
            onChange={(e) => {
              const files = Array.from(e.target.files).map((file) => file.name);
              setNewEmail((prev) => ({
                ...prev,
                attachments: [...prev.attachments, ...files],
              }));
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById('attachment-input').click()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
            </svg>
            Attach Files
          </button>

          {/* Attachment List */}
          <div className="mt-3 max-h-32 overflow-y-auto">
            {newEmail.attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-blue-50 p-2 rounded-md mb-2 border border-blue-100 hover:shadow-sm transition-all duration-200"
                style={{ animation: "fadeIn 0.3s ease-out" }}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span className="text-sm text-gray-700 truncate max-w-xs">{attachment}</span>
                </div>
                <button
                  onClick={() => {
                    setNewEmail((prev) => ({
                      ...prev,
                      attachments: prev.attachments.filter((_, i) => i !== index),
                    }));
                  }}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-100"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-3 border-t border-gray-100">
          {isEditingDraft ? (
            <>
              <button
                onClick={saveChanges}
                className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                </svg>
                Save Changes
              </button>
              <button
                onClick={sendEmail}
                className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                Send
              </button>
            </>
          ) : (
            <>
              <button
                onClick={saveDraft}
                className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                </svg>
                Save as Draft
              </button>
              <button
                onClick={sendEmail}
                className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                Send
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Inbox;

