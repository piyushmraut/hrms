// import React, { useState } from 'react';
// import { format } from 'date-fns';

// function EventDetailsModal({ isOpen, onClose, event, onEditEvent, onDeleteEvent }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [eventData, setEventData] = useState({
//     id: event.id,
//     title: event.title,
//     start: event.start ? format(new Date(event.start), "yyyy-MM-dd'T'HH:mm") : '',
//     end: event.end ? format(new Date(event.end), "yyyy-MM-dd'T'HH:mm") : '',
//     allDay: event.allDay || false,
//     description: event.description || '',
//     location: event.location || '',
//     attendees: event.attendees ? event.attendees.join(', ') : '',
//     color: event.color || '#3788d8',
//     priority: event.priority || 'Medium'
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEventData({
//       ...eventData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Format attendees as an array
//     const formattedAttendees = eventData.attendees
//       ? eventData.attendees.split(',').map(email => email.trim())
//       : [];
    
//     // Create the updated event object
//     const updatedEvent = {
//       ...eventData,
//       attendees: formattedAttendees,
//       extendedProps: {
//         description: eventData.description,
//         location: eventData.location,
//         attendees: formattedAttendees,
//         priority: eventData.priority
//       }
//     };
    
//     onEditEvent(updatedEvent);
//   };

//   const confirmDelete = () => {
//     if (window.confirm('Are you sure you want to delete this event?')) {
//       onDeleteEvent(event.id);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-800">
//             {isEditing ? 'Edit Event' : 'Event Details'}
//           </h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {isEditing ? (
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Event Title *</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={eventData.title}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>

//               <div className="flex space-x-4">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700">Start *</label>
//                   <input
//                     type="datetime-local"
//                     name="start"
//                     value={eventData.start}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     required
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700">End *</label>
//                   <input
//                     type="datetime-local"
//                     name="end"
//                     value={eventData.end}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="allDay"
//                   id="allDay"
//                   checked={eventData.allDay}
//                   onChange={handleChange}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="allDay" className="ml-2 block text-sm text-gray-700">
//                   All day event
//                 </label>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Description</label>
//                 <textarea
//                   name="description"
//                   value={eventData.description}
//                   onChange={handleChange}
//                   rows="3"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 ></textarea>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={eventData.location}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Attendees (comma separated emails)</label>
//                 <input
//                   type="text"
//                   name="attendees"
//                   value={eventData.attendees}
//                   onChange={handleChange}
//                   placeholder="john@example.com, jane@example.com"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Priority</label>
//                 <select
//                   name="priority"
//                   value={eventData.priority}
//                   onChange={handleChange}
//                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                 >
//                   <option value="Low">Low</option>
//                   <option value="Medium">Medium</option>
//                   <option value="High">High</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Color</label>
//                 <div className="mt-1 flex items-center">
//                   <input
//                     type="color"
//                     name="color"
//                     value={eventData.color}
//                     onChange={handleChange}
//                     className="h-8 w-12 border border-gray-300 rounded-md"
//                   />
//                   <span className="ml-2 text-sm text-gray-500">{eventData.color}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-between">
//               <button
//                 type="button"
//                 onClick={confirmDelete}
//                 className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 Delete
//               </button>
//               <div className="space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </form>
//         ) : (
//           <div>
//             <div className="mb-4 pb-4 border-b border-gray-200">
//               <div className="flex items-center">
//                 <div 
//                   className="w-4 h-4 rounded-full mr-2"
//                   style={{ backgroundColor: event.color }}
//                 ></div>
//                 <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
//               </div>
//               <p className="mt-2 text-sm text-gray-500">
//                 {event.allDay ? (
//                   format(new Date(event.start), 'MMMM dd, yyyy')
//                 ) : (
//                   <>
//                     {format(new Date(event.start), 'MMMM dd, yyyy h:mm a')} - 
//                     {event.end && format(new Date(event.end), ' h:mm a')}
//                   </>
//                 )}
//               </p>
//             </div>

//             {event.description && (
//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-700">Description</h4>
//                 <p className="mt-1 text-sm text-gray-500">{event.description}</p>
//               </div>
//             )}

//             {event.location && (
//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-700">Location</h4>
//                 <p className="mt-1 text-sm text-gray-500">{event.location}</p>
//               </div>
//             )}

//             {event.attendees && event.attendees.length > 0 && (
//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-700">Attendees</h4>
//                 <ul className="mt-1 text-sm text-gray-500">
//                   {event.attendees.map((attendee, index) => (
//                     <li key={index}>{attendee}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <div className="mb-4">
//               <h4 className="text-sm font-medium text-gray-700">Priority</h4>
//               <p className="mt-1 text-sm text-gray-500">{event.priority}</p>
//             </div>

//             <div className="mt-6 flex justify-between">
//               <button
//                 type="button"
//                 onClick={confirmDelete}
//                 className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 Delete
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(true)}
//                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Edit
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default EventDetailsModal;

import React, { useState } from 'react';
import { format } from 'date-fns';

function EventDetailsModal({ isOpen, onClose, event, onEditEvent, onDeleteEvent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState({
    id: event.id,
    title: event.title,
    start: event.start ? format(new Date(event.start), "yyyy-MM-dd'T'HH:mm") : '',
    end: event.end ? format(new Date(event.end), "yyyy-MM-dd'T'HH:mm") : '',
    allDay: event.allDay || false,
    description: event.description || '',
    location: event.location || '',
    link: event.link || '',
    attendees: event.attendees ? event.attendees.join(', ') : '',
    color: event.color || '#4f46e5',
    priority: event.priority || 'Medium'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format attendees as an array
    const formattedAttendees = eventData.attendees
      ? eventData.attendees.split(',').map(email => email.trim())
      : [];
    
    // Create the updated event object
    const updatedEvent = {
      ...eventData,
      attendees: formattedAttendees,
      extendedProps: {
        description: eventData.description,
        location: eventData.location,
        link: eventData.link,
        attendees: formattedAttendees,
        priority: eventData.priority
      }
    };
    
    onEditEvent(updatedEvent);
  };

  const confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDeleteEvent(event.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-xl font-semibold text-indigo-800">
            {isEditing ? 'Edit Event' : 'Event Details'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Title *</label>
              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                required
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Start *</label>
                <input
                  type="datetime-local"
                  name="start"
                  value={eventData.start}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">End *</label>
                <input
                  type="datetime-local"
                  name="end"
                  value={eventData.end}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="allDay"
                id="allDay"
                checked={eventData.allDay}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="allDay" className="ml-2 block text-sm text-gray-700">
                All day event
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Link (Meeting URL or relevant link)</label>
              <input
                type="url"
                name="link"
                value={eventData.link}
                onChange={handleChange}
                placeholder="https://example.com/meeting"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Attendees (comma separated emails)</label>
              <input
                type="text"
                name="attendees"
                value={eventData.attendees}
                onChange={handleChange}
                placeholder="john@example.com, jane@example.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                name="priority"
                value={eventData.priority}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm transition-colors duration-200"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <div className="mt-1 flex items-center">
                <input
                  type="color"
                  name="color"
                  value={eventData.color}
                  onChange={handleChange}
                  className="h-8 w-12 border border-gray-300 rounded-md"
                />
                <span className="ml-2 text-sm text-gray-500">{eventData.color}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Delete
              </button>
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: event.color }}
                ></div>
                <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
              </div>
              <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-md">
                {event.allDay ? (
                  format(new Date(event.start), 'MMMM dd, yyyy')
                ) : (
                  <>
                    {format(new Date(event.start), 'MMMM dd, yyyy h:mm a')} - 
                    {event.end && format(new Date(event.end), ' h:mm a')}
                  </>
                )}
              </div>
            </div>

            {event.description && (
              <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
                <h4 className="text-sm font-medium text-gray-700">Description</h4>
                <p className="mt-1 text-sm text-gray-500 whitespace-pre-wrap">{event.description}</p>
              </div>
            )}

            {event.location && (
              <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
                <h4 className="text-sm font-medium text-gray-700">Location</h4>
                <p className="mt-1 text-sm text-gray-500">{event.location}</p>
              </div>
            )}

            {event.link && (
              <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
                <h4 className="text-sm font-medium text-gray-700">Meeting Link</h4>
                <a 
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-sm text-indigo-600 hover:text-indigo-800 hover:underline break-all inline-flex items-center"
                >
                  {event.link}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {event.attendees && event.attendees.length > 0 && (
              <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
                <h4 className="text-sm font-medium text-gray-700">Attendees</h4>
                <ul className="mt-1 text-sm text-gray-500 space-y-1">
                  {event.attendees.map((attendee, index) => (
                    <li key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {attendee}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
              <h4 className="text-sm font-medium text-gray-700">Priority</h4>
              <span className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                event.priority === 'High' ? 'bg-red-100 text-red-700' : 
                event.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                'bg-green-100 text-green-700'
              }`}>
                {event.priority}
              </span>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetailsModal;