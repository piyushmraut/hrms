import React, { useState } from 'react';
import { Search, Star, Trash, Send, Edit, Mail, Archive, Clock, X, Plus } from 'lucide-react';

function Inbox() {
  // State for emails data
  const [emails, setEmails] = useState([
    { 
      id: 1, 
      from: 'hr@company.com', 
      to: 'john@company.com',
      subject: 'Monthly Performance Review', 
      content: 'Hello John, It\'s time for your monthly performance review. Please prepare the necessary documents.',
      date: '2025-04-06', 
      isStarred: true, 
      isRead: true, 
      folder: 'inbox' 
    },
    { 
      id: 2, 
      from: 'manager@company.com', 
      to: 'john@company.com',
      subject: 'Team Meeting Tomorrow', 
      content: 'Team, We have a meeting scheduled tomorrow at 10 AM to discuss the quarterly targets.',
      date: '2025-04-07', 
      isStarred: false, 
      isRead: false, 
      folder: 'inbox' 
    },
    { 
      id: 3, 
      from: 'john@company.com', 
      to: 'finance@company.com',
      subject: 'Expense Approval', 
      content: 'Dear Finance Team, I\'m submitting my monthly expense report for approval.',
      date: '2025-04-05', 
      isStarred: false, 
      isRead: true, 
      folder: 'sent' 
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
      folder: 'draft' 
    },
  ]);

  // State for active folder
  const [activeFolder, setActiveFolder] = useState('inbox');
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for selected email
  const [selectedEmail, setSelectedEmail] = useState(null);
  
  // State for compose modal
  const [showComposeModal, setShowComposeModal] = useState(false);
  
  // State for new email details
  const [newEmail, setNewEmail] = useState({
    to: '',
    subject: '',
    content: ''
  });

  // Filter emails based on active folder and search query
  const filteredEmails = emails.filter(email => {
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

  // Count emails in each folder
  const counts = {
    inbox: emails.filter(e => e.folder === 'inbox').length,
    starred: emails.filter(e => e.isStarred).length,
    sent: emails.filter(e => e.folder === 'sent').length,
    draft: emails.filter(e => e.folder === 'draft').length,
    bin: emails.filter(e => e.folder === 'bin').length,
    all: emails.length
  };

  // Function to toggle star status
  const toggleStar = (id) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, isStarred: !email.isStarred } : email
    ));
  };

  // Function to move email to bin
  const moveToTrash = (id) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, folder: 'bin' } : email
    ));
    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail(null);
    }
  };

  // Function to restore email from bin
  const restoreFromBin = (id) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, folder: 'inbox' } : email
    ));
  };

  // Function to permanently delete email
  const deleteEmail = (id) => {
    setEmails(emails.filter(email => email.id !== id));
    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail(null);
    }
  };

  // Function to mark email as read
  const markAsRead = (id) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, isRead: true } : email
    ));
  };

  // Function to handle email selection
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    markAsRead(email.id);
  };

  // Function to send new email
  const sendEmail = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    const emailToSend = {
      id: emails.length + 1,
      from: 'john@company.com', // Assuming current user's email
      to: newEmail.to,
      subject: newEmail.subject,
      content: newEmail.content,
      date: currentDate,
      isStarred: false,
      isRead: true,
      folder: 'sent'
    };
    
    setEmails([...emails, emailToSend]);
    setShowComposeModal(false);
    setNewEmail({ to: '', subject: '', content: '' });
  };

  // Function to save draft
  const saveDraft = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    const draftEmail = {
      id: emails.length + 1,
      from: 'john@company.com', // Assuming current user's email
      to: newEmail.to,
      subject: newEmail.subject,
      content: newEmail.content,
      date: currentDate,
      isStarred: false,
      isRead: true,
      folder: 'draft'
    };
    
    setEmails([...emails, draftEmail]);
    setShowComposeModal(false);
    setNewEmail({ to: '', subject: '', content: '' });
  };

  // Function to render email list item
  const renderEmailItem = (email) => {
    const isActive = selectedEmail && selectedEmail.id === email.id;
    
    return (
      <div 
        key={email.id} 
        className={`flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 ${isActive ? 'bg-blue-50' : ''} ${!email.isRead && activeFolder === 'inbox' ? 'font-semibold bg-gray-100' : ''}`}
        onClick={() => handleEmailClick(email)}
      >
        <div className="mr-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleStar(email.id);
            }}
            className="text-gray-400 hover:text-yellow-400"
          >
            <Star className={email.isStarred ? 'text-yellow-400 fill-yellow-400' : ''} size={18} />
          </button>
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between">
            <div className="truncate font-medium">{email.folder === 'sent' || email.folder === 'draft' ? email.to || '[No recipient]' : email.from}</div>
            <div className="text-xs text-gray-500 whitespace-nowrap ml-2">{email.date}</div>
          </div>
          <div className="truncate text-sm">{email.subject}</div>
          <div className="truncate text-xs text-gray-500">{email.content.substring(0, 60)}...</div>
        </div>
        <div className="ml-2 flex">
          {activeFolder === 'bin' ? (
            <>
              <button 
                className="text-gray-400 hover:text-blue-500 p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  restoreFromBin(email.id);
                }}
              >
                <Archive size={16} />
              </button>
              <button 
                className="text-gray-400 hover:text-red-500 p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteEmail(email.id);
                }}
              >
                <Trash size={16} />
              </button>
            </>
          ) : (
            <button 
              className="text-gray-400 hover:text-red-500 p-1"
              onClick={(e) => {
                e.stopPropagation();
                moveToTrash(email.id);
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <button 
            onClick={() => setShowComposeModal(true)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600"
          >
            <Plus size={18} className="mr-2" />
            Compose
          </button>
        </div>
        
        <div className="mt-4">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveFolder('inbox')}
                className={`flex items-center w-full px-4 py-2 ${activeFolder === 'inbox' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <Mail size={18} className="mr-3" />
                <span>Inbox</span>
                <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">{counts.inbox}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveFolder('starred')}
                className={`flex items-center w-full px-4 py-2 ${activeFolder === 'starred' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <Star size={18} className="mr-3" />
                <span>Starred</span>
                <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">{counts.starred}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveFolder('sent')}
                className={`flex items-center w-full px-4 py-2 ${activeFolder === 'sent' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <Send size={18} className="mr-3" />
                <span>Sent</span>
                <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">{counts.sent}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveFolder('draft')}
                className={`flex items-center w-full px-4 py-2 ${activeFolder === 'draft' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <Edit size={18} className="mr-3" />
                <span>Drafts</span>
                <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">{counts.draft}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveFolder('bin')}
                className={`flex items-center w-full px-4 py-2 ${activeFolder === 'bin' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <Trash size={18} className="mr-3" />
                <span>Bin</span>
                <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">{counts.bin}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveFolder('all')}
                className={`flex items-center w-full px-4 py-2 ${activeFolder === 'all' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <Mail size={18} className="mr-3" />
                <span>All Mail</span>
                <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">{counts.all}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Search Bar */}
        <div className="p-4 border-b">
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
        </div>
        
        {/* Email List and Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Email List */}
          <div className="w-1/2 border-r overflow-y-auto">
            <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
              <h2 className="font-medium capitalize">{activeFolder}</h2>
              <div className="text-sm text-gray-500">{filteredEmails.length} emails</div>
            </div>
            {filteredEmails.length > 0 ? (
              filteredEmails.map(email => renderEmailItem(email))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Mail size={48} className="mb-4 opacity-30" />
                <p>No emails found</p>
              </div>
            )}
          </div>
          
          {/* Email Content */}
          <div className="w-1/2 overflow-y-auto">
            {selectedEmail ? (
              <div className="p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-medium mb-4">{selectedEmail.subject}</h1>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="font-medium">{selectedEmail.folder === 'sent' || selectedEmail.folder === 'draft' ? `To: ${selectedEmail.to || '[No recipient]'}` : `From: ${selectedEmail.from}`}</p>
                      <p className="text-sm text-gray-500">{selectedEmail.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => toggleStar(selectedEmail.id)}
                        className="text-gray-400 hover:text-yellow-400"
                      >
                        <Star className={selectedEmail.isStarred ? 'text-yellow-400 fill-yellow-400' : ''} size={20} />
                      </button>
                      <button 
                        onClick={() => moveToTrash(selectedEmail.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-6">
                  <div className="prose max-w-none">
                    {selectedEmail.content.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Mail size={64} className="mb-4 opacity-30" />
                <p>Select an email to view</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Compose Email Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-2/3 max-w-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Compose Email</h3>
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
                  onChange={(e) => setNewEmail({...newEmail, to: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Subject:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={newEmail.subject}
                  onChange={(e) => setNewEmail({...newEmail, subject: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Message:</label>
                <textarea
                  className="w-full p-2 border rounded h-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={newEmail.content}
                  onChange={(e) => setNewEmail({...newEmail, content: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-3">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inbox;