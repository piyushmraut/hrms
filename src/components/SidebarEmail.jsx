// import React from 'react';
// import { Mail, Star, Send, Edit, Trash, Plus } from 'lucide-react';

// const SidebarEmail = ({ activeFolder, setActiveFolder, counts, onComposeClick }) => {
//   const folders = [
//     { id: 'inbox', icon: Mail, label: 'Inbox', count: counts.inbox },
//     { id: 'starred', icon: Star, label: 'Starred', count: counts.starred },
//     { id: 'sent', icon: Send, label: 'Sent', count: counts.sent },
//     { id: 'draft', icon: Edit, label: 'Drafts', count: counts.draft },
//     { id: 'bin', icon: Trash, label: 'Bin', count: counts.bin },
//     { id: 'all', icon: Mail, label: 'All Mail', count: counts.all }
//   ];

//   return (
//     <div className="w-64 bg-white shadow-md flex flex-col">
//       <div className="p-4">
//         <button 
//           onClick={onComposeClick}
//           className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
//         >
//           <Plus size={18} className="mr-2" />
//           Compose
//         </button>
//       </div>
      
//       <div className="mt-4 flex-1 overflow-y-auto">
//         <ul className="space-y-1 px-2">
//           {folders.map((folder) => (
//             <li key={folder.id}>
//               <button 
//                 onClick={() => setActiveFolder(folder.id)}
//                 className={`flex items-center w-full px-3 py-2.5 rounded-lg ${activeFolder === folder.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
//               >
//                 <folder.icon size={18} className="mr-3" />
//                 <span>{folder.label}</span>
//                 {folder.count > 0 && (
//                   <span className={`ml-auto text-xs px-2 py-1 rounded-full ${activeFolder === folder.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'}`}>
//                     {folder.count}
//                   </span>
//                 )}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
      
//       <div className="p-4 border-t">
//         <div className="text-xs text-gray-500">
//           <p>Storage: 1.2 GB of 15 GB used</p>
//           <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
//             <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '8%' }}></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SidebarEmail;

// import React from 'react';
// import { Mail, Star, Send, Edit, Trash, Plus } from 'lucide-react';

// function SidebarEmail({ activeFolder, setActiveFolder, counts, setShowComposeModal }) {
//   return (
//     <div className="w-64 bg-white shadow-md">
//       <div className="p-4">
//         <button
//           onClick={() => setShowComposeModal(true)}
//           className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600"
//         >
//           <Plus size={18} className="mr-2" />
//           Compose
//         </button>
//       </div>
//       <div className="mt-4">
//         <ul className="space-y-1">
//           <li>
//             <button
//               onClick={() => setActiveFolder('inbox')}
//               className={`flex items-center w-full px-4 py-2 ${
//                 activeFolder === 'inbox' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
//               } transition-colors`}
//             >
//               <Mail size={18} className="mr-3" />
//               <span>Inbox</span>
//               <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">
//                 {counts.inbox}
//               </span>
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setActiveFolder('starred')}
//               className={`flex items-center w-full px-4 py-2 ${
//                 activeFolder === 'starred' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
//               } transition-colors`}
//             >
//               <Star size={18} className="mr-3" />
//               <span>Starred</span>
//               <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">
//                 {counts.starred}
//               </span>
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setActiveFolder('sent')}
//               className={`flex items-center w-full px-4 py-2 ${
//                 activeFolder === 'sent' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
//               } transition-colors`}
//             >
//               <Send size={18} className="mr-3" />
//               <span>Sent</span>
//               <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">
//                 {counts.sent}
//               </span>
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setActiveFolder('draft')}
//               className={`flex items-center w-full px-4 py-2 ${
//                 activeFolder === 'draft' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
//               } transition-colors`}
//             >
//               <Edit size={18} className="mr-3" />
//               <span>Drafts</span>
//               <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">
//                 {counts.draft}
//               </span>
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setActiveFolder('bin')}
//               className={`flex items-center w-full px-4 py-2 ${
//                 activeFolder === 'bin' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
//               } transition-colors`}
//             >
//               <Trash size={18} className="mr-3" />
//               <span>Bin</span>
//               <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">
//                 {counts.bin}
//               </span>
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setActiveFolder('all')}
//               className={`flex items-center w-full px-4 py-2 ${
//                 activeFolder === 'all' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
//               } transition-colors`}
//             >
//               <Mail size={18} className="mr-3" />
//               <span>All Mail</span>
//               <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">
//                 {counts.all}
//               </span>
//             </button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default SidebarEmail;

import React from 'react';
import { Mail, Star, Send, Edit, Trash, Plus } from 'lucide-react';

function SidebarEmail({ activeFolder, setActiveFolder, counts, setShowComposeModal }) {
  return (
    <div className="w-64 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg rounded-lg overflow-hidden border border-gray-100">
      <div className="p-4">
        <button
          onClick={() => setShowComposeModal(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          <Plus size={18} className="mr-2 animate-pulse" />
          Compose
        </button>
      </div>
      <div className="mt-4 pb-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveFolder('inbox')}
              className={`flex items-center w-full px-4 py-3 rounded-r-full transition-all duration-300 ${
                activeFolder === 'inbox' 
                  ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 font-medium shadow-sm transform translate-x-2' 
                  : 'hover:bg-blue-50 hover:translate-x-1'
              }`}
            >
              <Mail size={18} className={`mr-3 ${activeFolder === 'inbox' ? 'text-blue-600 animate-bounce' : ''}`} />
              <span>Inbox</span>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                activeFolder === 'inbox' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {counts.inbox}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveFolder('starred')}
              className={`flex items-center w-full px-4 py-3 rounded-r-full transition-all duration-300 ${
                activeFolder === 'starred' 
                  ? 'bg-gradient-to-r from-yellow-100 to-amber-200 text-amber-700 font-medium shadow-sm transform translate-x-2' 
                  : 'hover:bg-yellow-50 hover:translate-x-1'
              }`}
            >
              <Star size={18} className={`mr-3 ${activeFolder === 'starred' ? 'text-amber-500 animate-spin' : ''}`} />
              <span>Starred</span>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                activeFolder === 'starred' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {counts.starred}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveFolder('sent')}
              className={`flex items-center w-full px-4 py-3 rounded-r-full transition-all duration-300 ${
                activeFolder === 'sent' 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-200 text-emerald-700 font-medium shadow-sm transform translate-x-2' 
                  : 'hover:bg-green-50 hover:translate-x-1'
              }`}
            >
              <Send size={18} className={`mr-3 ${activeFolder === 'sent' ? 'text-emerald-600 animate-ping' : ''}`} />
              <span>Sent</span>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                activeFolder === 'sent' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {counts.sent}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveFolder('draft')}
              className={`flex items-center w-full px-4 py-3 rounded-r-full transition-all duration-300 ${
                activeFolder === 'draft' 
                  ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 font-medium shadow-sm transform translate-x-2' 
                  : 'hover:bg-orange-50 hover:translate-x-1'
              }`}
            >
              <Edit size={18} className={`mr-3 ${activeFolder === 'draft' ? 'text-orange-600 animate-pulse' : ''}`} />
              <span>Drafts</span>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                activeFolder === 'draft' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {counts.draft}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveFolder('bin')}
              className={`flex items-center w-full px-4 py-3 rounded-r-full transition-all duration-300 ${
                activeFolder === 'bin' 
                  ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 font-medium shadow-sm transform translate-x-2' 
                  : 'hover:bg-red-50 hover:translate-x-1'
              }`}
            >
              <Trash size={18} className={`mr-3 ${activeFolder === 'bin' ? 'text-red-600 animate-bounce' : ''}`} />
              <span>Bin</span>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                activeFolder === 'bin' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {counts.bin}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveFolder('all')}
              className={`flex items-center w-full px-4 py-3 rounded-r-full transition-all duration-300 ${
                activeFolder === 'all' 
                  ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 font-medium shadow-sm transform translate-x-2' 
                  : 'hover:bg-purple-50 hover:translate-x-1'
              }`}
            >
              <Mail size={18} className={`mr-3 ${activeFolder === 'all' ? 'text-purple-600 animate-pulse' : ''}`} />
              <span>All Mail</span>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                activeFolder === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {counts.all}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarEmail;