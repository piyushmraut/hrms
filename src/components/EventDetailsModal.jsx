import React, { useState } from 'react';
import { format } from 'date-fns';

function EventDetailsModal({ isOpen, onClose, event, onEditEvent, onDeleteEvent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
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

  const colorOptions = [
    { name: 'Indigo', value: '#4f46e5' },
    { name: 'Blue', value: '#2563eb' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Green', value: '#059669' },
    { name: 'Purple', value: '#7c3aed' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Pink', value: '#db2777' },
    { name: 'Teal', value: '#0d9488' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedAttendees = eventData.attendees
      ? eventData.attendees.split(',').map(email => email.trim())
      : [];
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
    setIsEditing(false);
  };

  const confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDeleteEvent(event.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {isEditing ? 'Edit Event' : 'Event Details'}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-indigo-200 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="flex border-b">
              <button
                type="button"
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'basic'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-indigo-600'
                }`}
                onClick={() => setActiveTab('basic')}
              >
                Basic Details
              </button>
              <button
                type="button"
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'additional'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-indigo-600'
                }`}
                onClick={() => setActiveTab('additional')}
              >
                Additional Info
              </button>
            </div>

            {activeTab === 'basic' && (
              <div className="space-y-4 p-6">
                {/* Title Input with Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="title"
                      value={eventData.title}
                      onChange={handleChange}
                      className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start *</label>
                    <input
                      type="datetime-local"
                      name="start"
                      value={eventData.start}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End *</label>
                    <input
                      type="datetime-local"
                      name="end"
                      value={eventData.end}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      required
                    />
                  </div>
                </div>

                {/* All Day Toggle */}
                <div className="flex items-center py-2">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      name="allDay"
                      id="allDay"
                      checked={eventData.allDay}
                      onChange={handleChange}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
                    />
                    <label
                      htmlFor="allDay"
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${eventData.allDay ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    ></label>
                  </div>
                  <label htmlFor="allDay" className="text-sm font-medium text-gray-700">
                    All day event
                  </label>
                  <style jsx>{`
                    .toggle-checkbox:checked {
                      right: 0;
                      transform: translateX(100%);
                      border-color: #4f46e5;
                    }
                    .toggle-checkbox:checked + .toggle-label {
                      background-color: #4f46e5;
                    }
                  `}</style>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    rows="3"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  ></textarea>
                </div>

                {/* Priority Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <div className="flex space-x-2">
                    {['Low', 'Medium', 'High'].map((priority) => (
                      <label
                        key={priority}
                        className={`flex-1 border rounded-md py-2 px-3 flex items-center justify-center text-sm cursor-pointer transition-all duration-200 ${
                          eventData.priority === priority
                            ? priority === 'High'
                              ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
                              : priority === 'Medium'
                              ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                              : 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={eventData.priority === priority}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {priority === 'High' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        )}
                        {priority === 'Medium' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {priority === 'Low' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {priority}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div className="space-y-4 p-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={eventData.location}
                      onChange={handleChange}
                      className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Meeting Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <input
                      type="url"
                      name="link"
                      value={eventData.link}
                      onChange={handleChange}
                      placeholder="Add meeting URL"
                      className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Attendees */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="attendees"
                      value={eventData.attendees}
                      onChange={handleChange}
                      placeholder="john@example.com, jane@example.com"
                      className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Separate multiple emails with commas</p>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map((color) => (
                      <div key={color.value} className="relative">
                        <input
                          type="radio"
                          name="color"
                          value={color.value}
                          id={`color-${color.name}`}
                          checked={eventData.color === color.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <label
                          htmlFor={`color-${color.name}`}
                          className={`
                            h-8 w-full rounded-md flex items-center justify-center cursor-pointer transition-all duration-200
                            ${eventData.color === color.value ? 'ring-2 ring-offset-2' : 'hover:opacity-80'}
                          `}
                          style={{ backgroundColor: color.value, color: '#fff', ringColor: color.value }}
                        >
                          {eventData.color === color.value && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </label>
                        <span className="block text-xs text-center mt-1 text-gray-600">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between p-6 border-t">
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
          <div className="p-6">
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
              <span
                className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                  event.priority === 'High'
                    ? 'bg-red-100 text-red-700'
                    : event.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
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
//     link: event.link || '',
//     attendees: event.attendees ? event.attendees.join(', ') : '',
//     color: event.color || '#4f46e5',
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
//         link: eventData.link,
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
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
//         <div className="flex justify-between items-center mb-4 border-b pb-3">
//           <h2 className="text-xl font-semibold text-indigo-800">
//             {isEditing ? 'Edit Event' : 'Event Details'}
//           </h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {isEditing ? (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Event Title *</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={eventData.title}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
//                 required
//               />
//             </div>

//             <div className="flex space-x-4">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700">Start *</label>
//                 <input
//                   type="datetime-local"
//                   name="start"
//                   value={eventData.start}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
//                   required
//                 />
//               </div>
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700">End *</label>
//                 <input
//                   type="datetime-local"
//                   name="end"
//                   value={eventData.end}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="allDay"
//                 id="allDay"
//                 checked={eventData.allDay}
//                 onChange={handleChange}
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//               />
//               <label htmlFor="allDay" className="ml-2 block text-sm text-gray-700">
//                 All day event
//               </label>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Description</label>
//               <textarea
//                 name="description"
//                 value={eventData.description}
//                 onChange={handleChange}
//                 rows="3"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
//               ></textarea>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Location</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={eventData.location}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Link (Meeting URL or relevant link)</label>
//               <input
//                 type="url"
//                 name="link"
//                 value={eventData.link}
//                 onChange={handleChange}
//                 placeholder="https://example.com/meeting"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Attendees (comma separated emails)</label>
//               <input
//                 type="text"
//                 name="attendees"
//                 value={eventData.attendees}
//                 onChange={handleChange}
//                 placeholder="john@example.com, jane@example.com"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Priority</label>
//               <select
//                 name="priority"
//                 value={eventData.priority}
//                 onChange={handleChange}
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm transition-colors duration-200"
//               >
//                 <option value="Low">Low</option>
//                 <option value="Medium">Medium</option>
//                 <option value="High">High</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Color</label>
//               <div className="mt-1 flex items-center">
//                 <input
//                   type="color"
//                   name="color"
//                   value={eventData.color}
//                   onChange={handleChange}
//                   className="h-8 w-12 border border-gray-300 rounded-md"
//                 />
//                 <span className="ml-2 text-sm text-gray-500">{eventData.color}</span>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-between">
//               <button
//                 type="button"
//                 onClick={confirmDelete}
//                 className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
//               >
//                 Delete
//               </button>
//               <div className="space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
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
//               <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-md">
//                 {event.allDay ? (
//                   format(new Date(event.start), 'MMMM dd, yyyy')
//                 ) : (
//                   <>
//                     {format(new Date(event.start), 'MMMM dd, yyyy h:mm a')} - 
//                     {event.end && format(new Date(event.end), ' h:mm a')}
//                   </>
//                 )}
//               </div>
//             </div>

//             {event.description && (
//               <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
//                 <h4 className="text-sm font-medium text-gray-700">Description</h4>
//                 <p className="mt-1 text-sm text-gray-500 whitespace-pre-wrap">{event.description}</p>
//               </div>
//             )}

//             {event.location && (
//               <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
//                 <h4 className="text-sm font-medium text-gray-700">Location</h4>
//                 <p className="mt-1 text-sm text-gray-500">{event.location}</p>
//               </div>
//             )}

//             {event.link && (
//               <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
//                 <h4 className="text-sm font-medium text-gray-700">Meeting Link</h4>
//                 <a 
//                   href={event.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="mt-1 text-sm text-indigo-600 hover:text-indigo-800 hover:underline break-all inline-flex items-center"
//                 >
//                   {event.link}
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                   </svg>
//                 </a>
//               </div>
//             )}

//             {event.attendees && event.attendees.length > 0 && (
//               <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
//                 <h4 className="text-sm font-medium text-gray-700">Attendees</h4>
//                 <ul className="mt-1 text-sm text-gray-500 space-y-1">
//                   {event.attendees.map((attendee, index) => (
//                     <li key={index} className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                       {attendee}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
//               <h4 className="text-sm font-medium text-gray-700">Priority</h4>
//               <span className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
//                 event.priority === 'High' ? 'bg-red-100 text-red-700' : 
//                 event.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
//                 'bg-green-100 text-green-700'
//               }`}>
//                 {event.priority}
//               </span>
//             </div>

//             <div className="mt-6 flex justify-between">
//               <button
//                 type="button"
//                 onClick={confirmDelete}
//                 className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
//               >
//                 Delete
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(true)}
//                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
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

