import React from 'react';
import { Mail, Star, Send, Edit, Trash, Plus } from 'lucide-react';

const SidebarEmail = ({ activeFolder, setActiveFolder, counts, onComposeClick }) => {
  const folders = [
    { id: 'inbox', icon: Mail, label: 'Inbox', count: counts.inbox },
    { id: 'starred', icon: Star, label: 'Starred', count: counts.starred },
    { id: 'sent', icon: Send, label: 'Sent', count: counts.sent },
    { id: 'draft', icon: Edit, label: 'Drafts', count: counts.draft },
    { id: 'bin', icon: Trash, label: 'Bin', count: counts.bin },
    { id: 'all', icon: Mail, label: 'All Mail', count: counts.all }
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4">
        <button 
          onClick={onComposeClick}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
        >
          <Plus size={18} className="mr-2" />
          Compose
        </button>
      </div>
      
      <div className="mt-4 flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {folders.map((folder) => (
            <li key={folder.id}>
              <button 
                onClick={() => setActiveFolder(folder.id)}
                className={`flex items-center w-full px-3 py-2.5 rounded-lg ${activeFolder === folder.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
              >
                <folder.icon size={18} className="mr-3" />
                <span>{folder.label}</span>
                {folder.count > 0 && (
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${activeFolder === folder.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'}`}>
                    {folder.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t">
        <div className="text-xs text-gray-500">
          <p>Storage: 1.2 GB of 15 GB used</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '8%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarEmail;