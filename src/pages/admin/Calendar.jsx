// import React, { useState, useEffect, useRef } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import { format, addMonths, subMonths } from 'date-fns';

// // Components
// import AddEventModal from '../../components/AddEventModal';
// import EventDetailsModal from '../../components/EventDetailsModal';
// import CalendarHeader from '../../components/CalendarHeader';
// import LoadingSpinner from '../../components/LoadingSpinner';

// function Calendar() {
//   const [events, setEvents] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [holidays, setHolidays] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [calendarView, setCalendarView] = useState('dayGridMonth');
//   const [country, setCountry] = useState('US');
//   const [year, setYear] = useState(new Date().getFullYear());

//   // API Key for Calendarific
//   const API_KEY = 'dkPIxL5z4UjyYubRU7Of28vtwayR5bgf';

//   // Fetch holidays from Calendarific API
//   useEffect(() => {
//     const fetchHolidays = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}`
//         );
//         const data = await response.json();
        
//         if (data.response && data.response.holidays) {
//           const formattedHolidays = data.response.holidays.map(holiday => ({
//             id: `holiday-${holiday.date.iso}`,
//             title: `🎉 ${holiday.name}`,
//             start: holiday.date.iso,
//             allDay: true,
//             color: '#FF9800',
//             extendedProps: {
//               type: 'holiday',
//               description: holiday.description,
//               country: country
//             }
//           }));
//           setHolidays(formattedHolidays);
//         }
//       } catch (error) {
//         console.error('Error fetching holidays:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchHolidays();
//   }, [country, year, API_KEY]);

//   // Load saved events from localStorage
//   useEffect(() => {
//     const savedEvents = localStorage.getItem('hrmsCalendarEvents');
//     if (savedEvents) {
//       setEvents(JSON.parse(savedEvents));
//     }
//   }, []);

//   // Save events to localStorage whenever events change
//   useEffect(() => {
//     localStorage.setItem('hrmsCalendarEvents', JSON.stringify(events));
//   }, [events]);

//   // Handle adding a new event
//   const handleAddEvent = (newEvent) => {
//     const eventWithId = { ...newEvent, id: `event-${Date.now()}` };
//     setEvents([...events, eventWithId]);
//     setShowAddModal(false);
//   };

//   // Handle editing an event
//   const handleEditEvent = (updatedEvent) => {
//     setEvents(events.map(event => 
//       event.id === updatedEvent.id ? updatedEvent : event
//     ));
//     setShowDetailsModal(false);
//     setSelectedEvent(null);
//   };

//   // Handle deleting an event
//   const handleDeleteEvent = (eventId) => {
//     setEvents(events.filter(event => event.id !== eventId));
//     setShowDetailsModal(false);
//     setSelectedEvent(null);
//   };

//   // Handle clicking on a date in the calendar
//   const handleDateClick = (info) => {
//     setSelectedDate(info.date);
//     setShowAddModal(true);
//   };

//   // Handle clicking on an event in the calendar
//   const handleEventClick = (info) => {
//     // Don't allow editing of holidays
//     if (info.event.extendedProps.type === 'holiday') {
//       // Just show holiday info in an alert
//       alert(`Holiday: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
//       return;
//     }
    
//     setSelectedEvent({
//       id: info.event.id,
//       title: info.event.title,
//       start: info.event.start,
//       end: info.event.end,
//       allDay: info.event.allDay,
//       color: info.event.backgroundColor,
//       description: info.event.extendedProps.description,
//       location: info.event.extendedProps.location,
//       attendees: info.event.extendedProps.attendees || [],
//       priority: info.event.extendedProps.priority || 'Medium'
//     });
//     setShowDetailsModal(true);
//   };

//   // Handle changing the calendar view
//   const handleViewChange = (viewName) => {
//     setCalendarView(viewName);
//   };

//   // Handle changing the country for holidays
//   const handleCountryChange = (e) => {
//     setCountry(e.target.value);
//   };

//   // Handle changing the year
//   const handleYearChange = (e) => {
//     setYear(parseInt(e.target.value));
//   };

//   // All events to display on calendar (user events + holidays)
//   const allEvents = [...events, ...holidays];

//   return (
//     <div className="p-4 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <CalendarHeader 
//           calendarView={calendarView}
//           onViewChange={handleViewChange}
//           onAddEvent={() => {
//             setSelectedDate(new Date());
//             setShowAddModal(true);
//           }}
//           country={country}
//           onCountryChange={handleCountryChange}
//           year={year}
//           onYearChange={handleYearChange}
//         />
        
//         {isLoading && <LoadingSpinner />}
        
//         <div className="mt-4">
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             initialView={calendarView}
//             headerToolbar={false}
//             events={allEvents}
//             dateClick={handleDateClick}
//             eventClick={handleEventClick}
//             height="auto"
//             aspectRatio={1.8}
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={3}
//             weekends={true}
//             eventTimeFormat={{
//               hour: 'numeric',
//               minute: '2-digit',
//               meridiem: 'short'
//             }}
//           />
//         </div>
        
//         {showAddModal && (
//           <AddEventModal
//             isOpen={showAddModal}
//             onClose={() => setShowAddModal(false)}
//             onAddEvent={handleAddEvent}
//             selectedDate={selectedDate}
//           />
//         )}
        
//         {showDetailsModal && selectedEvent && (
//           <EventDetailsModal
//             isOpen={showDetailsModal}
//             onClose={() => {
//               setShowDetailsModal(false);
//               setSelectedEvent(null);
//             }}
//             event={selectedEvent}
//             onEditEvent={handleEditEvent}
//             onDeleteEvent={handleDeleteEvent}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Calendar;


// function Calendar() {
//   const [events, setEvents] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [holidays, setHolidays] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [calendarView, setCalendarView] = useState('dayGridMonth');
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [currentDate, setCurrentDate] = useState(new Date());
  
//   const calendarRef = useRef(null);

//   // API Key for Calendarific
//   const API_KEY = 'dkPIxL5z4UjyYubRU7Of28vtwayR5bgf';
//   // Set country to India only
//   const COUNTRY = 'IN';

//   // Fetch holidays from Calendarific API for India
//   useEffect(() => {
//     const fetchHolidays = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${COUNTRY}&year=${year}`
//         );
//         const data = await response.json();
        
//         if (data.response && data.response.holidays) {
//           const formattedHolidays = data.response.holidays.map(holiday => ({
//             id: `holiday-${holiday.date.iso}`,
//             title: `🎉 ${holiday.name}`,
//             start: holiday.date.iso,
//             allDay: true,
//             color: '#FF5722',
//             extendedProps: {
//               type: 'holiday',
//               description: holiday.description,
//               country: COUNTRY
//             }
//           }));
//           setHolidays(formattedHolidays);
//         }
//       } catch (error) {
//         console.error('Error fetching holidays:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchHolidays();
//   }, [year, API_KEY]);

//   // Load saved events from localStorage
//   useEffect(() => {
//     const savedEvents = localStorage.getItem('hrmsCalendarEvents');
//     if (savedEvents) {
//       setEvents(JSON.parse(savedEvents));
//     }
//   }, []);

//   // Save events to localStorage whenever events change
//   useEffect(() => {
//     localStorage.setItem('hrmsCalendarEvents', JSON.stringify(events));
//   }, [events]);

//   // Handle adding a new event
//   const handleAddEvent = (newEvent) => {
//     const eventWithId = { ...newEvent, id: `event-${Date.now()}` };
//     setEvents([...events, eventWithId]);
//     setShowAddModal(false);
//   };

//   // Handle editing an event
//   const handleEditEvent = (updatedEvent) => {
//     setEvents(events.map(event => 
//       event.id === updatedEvent.id ? updatedEvent : event
//     ));
//     setShowDetailsModal(false);
//     setSelectedEvent(null);
//   };

//   // Handle deleting an event
//   const handleDeleteEvent = (eventId) => {
//     setEvents(events.filter(event => event.id !== eventId));
//     setShowDetailsModal(false);
//     setSelectedEvent(null);
//   };

//   // Handle clicking on a date in the calendar
//   const handleDateClick = (info) => {
//     setSelectedDate(info.date);
//     setShowAddModal(true);
//   };

//   // Handle clicking on an event in the calendar
//   const handleEventClick = (info) => {
//     // Don't allow editing of holidays
//     if (info.event.extendedProps.type === 'holiday') {
//       // Just show holiday info in an alert
//       alert(`Holiday: ${info.event.title.replace('🎉 ', '')}\nDescription: ${info.event.extendedProps.description || 'National Holiday'}`);
//       return;
//     }
    
//     setSelectedEvent({
//       id: info.event.id,
//       title: info.event.title,
//       start: info.event.start,
//       end: info.event.end,
//       allDay: info.event.allDay,
//       color: info.event.backgroundColor,
//       description: info.event.extendedProps.description,
//       location: info.event.extendedProps.location,
//       link: info.event.extendedProps.link,
//       attendees: info.event.extendedProps.attendees || [],
//       priority: info.event.extendedProps.priority || 'Medium'
//     });
//     setShowDetailsModal(true);
//   };

//   // Handle changing the calendar view
//   const handleViewChange = (viewName) => {
//     setCalendarView(viewName);
//     if (calendarRef.current) {
//       const calendarApi = calendarRef.current.getApi();
//       calendarApi.changeView(viewName);
//       setCurrentDate(calendarApi.getDate());
//     }
//   };

//   // Handle changing the year
//   const handleYearChange = (e) => {
//     setYear(parseInt(e.target.value));
//   };

//   // Handle calendar date navigation
//   const handleDatesSet = (dateInfo) => {
//     setCurrentDate(dateInfo.view.currentStart);
//   };

//   // Apply custom styling to events
//   const eventContent = (eventInfo) => {
//     const isHoliday = eventInfo.event.extendedProps.type === 'holiday';
    
//     return (
//       <>
//         <div className={`fc-event-main-frame ${isHoliday ? 'holiday-event' : ''}`}>
//           <div className="fc-event-time">{eventInfo.timeText}</div>
//           <div className="fc-event-title-container">
//             <div className="fc-event-title fc-sticky">
//               {isHoliday ? (
//                 <span className="flex items-center">
//                   <span className="mr-1">🎉</span>
//                   <span>{eventInfo.event.title.replace('🎉 ', '')}</span>
//                 </span>
//               ) : (
//                 <span className="flex items-center">
//                   {eventInfo.event.extendedProps.priority === 'High' && (
//                     <span className="mr-1 text-red-500">⚠️</span>
//                   )}
//                   {eventInfo.event.title}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   // All events to display on calendar (user events + holidays)
//   const allEvents = [...events, ...holidays];

//   return (
//     <div className="p-4 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <CalendarHeader 
//           calendarView={calendarView}
//           onViewChange={handleViewChange}
//           onAddEvent={() => {
//             setSelectedDate(new Date());
//             setShowAddModal(true);
//           }}
//           year={year}
//           onYearChange={handleYearChange}
//           currentDate={currentDate}
//         />
        
//         {isLoading && <LoadingSpinner />}
        
//         <div className="mt-4">
//           <style jsx global>{`
//             .fc-theme-standard .fc-scrollgrid {
//               border-radius: 8px;
//               overflow: hidden;
//               border: 1px solid #e5e7eb;
//             }
            
//             .fc-day-today {
//               background-color: #EBF4FF !important;
//             }
            
//             .fc-daygrid-day-top {
//               justify-content: center;
//               padding-top: 4px;
//             }
            
//             .fc-daygrid-day-number {
//               font-weight: 500;
//               color: #4b5563;
//             }
            
//             .fc-col-header-cell {
//               background-color: #4F46E5;
//               color: white;
//               padding: 8px 0;
//             }
            
//             .fc-col-header-cell-cushion {
//               font-weight: 600;
//               color: white;
//               text-decoration: none !important;
//             }
            
//             .fc-daygrid-event {
//               border-radius: 4px;
//               padding: 2px 4px;
//               margin-top: 2px;
//               border: none;
//               box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
//             }
            
//             .fc-event-time {
//               font-weight: 500;
//             }
            
//             .fc-event-title {
//               font-weight: 500;
//               overflow: hidden;
//               text-overflow: ellipsis;
//               white-space: nowrap;
//             }
            
//             .holiday-event {
//               background-color: #FFECE5;
//               color: #B91C1C;
//             }
            
//             .fc-highlight {
//               background-color: #F3F4F6;
//               color:black;
//             }
            
//             .fc-button-primary {
//               background-color: #4F46E5;
//               border-color: #4F46E5;
//             }
            
//             .fc-button-primary:hover {
//               background-color: #4338CA;
//               border-color: #4338CA;
//             }
            
//             .fc-today-button {
//               text-transform: uppercase;
//               font-weight: 500;
//             }

//             /* Responsive adjustments */
//             @media (max-width: 640px) {
//               .fc-header-toolbar {
//                 flex-direction: column;
//                 gap: 10px;
//               }
//             }
//           `}</style>
          
//           <FullCalendar
//             ref={calendarRef}
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             initialView={calendarView}
//             headerToolbar={false}
//             events={allEvents}
//             dateClick={handleDateClick}
//             eventClick={handleEventClick}
//             eventContent={eventContent}
//             height="auto"
//             aspectRatio={1.8}
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={3}
//             weekends={true}
//             datesSet={handleDatesSet}
//             eventTimeFormat={{
//               hour: 'numeric',
//               minute: '2-digit',
//               meridiem: 'short'
//             }}
//             slotLabelFormat={{
//               hour: 'numeric',
//               minute: '2-digit',
//               hour12: true
//             }}
//             dayHeaderFormat={{
//               weekday: 'short'
//             }}
//             allDayText="All Day"
//             moreLinkText="+ more"
//             noEventsText="No events to display"
//           />
//         </div>
        
//         {showAddModal && (
//           <AddEventModal
//             isOpen={showAddModal}
//             onClose={() => setShowAddModal(false)}
//             onAddEvent={handleAddEvent}
//             selectedDate={selectedDate}
//           />
//         )}
        
//         {showDetailsModal && selectedEvent && (
//           <EventDetailsModal
//             isOpen={showDetailsModal}
//             onClose={() => {
//               setShowDetailsModal(false);
//               setSelectedEvent(null);
//             }}
//             event={selectedEvent}
//             onEditEvent={handleEditEvent}
//             onDeleteEvent={handleDeleteEvent}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Calendar;

// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import { format, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';

// // Components
// import AddEventModal from '../../components/AddEventModal';
// import EventDetailsModal from '../../components/EventDetailsModal';
// import CalendarHeader from '../../components/CalendarHeader';
// import LoadingSpinner from '../../components/LoadingSpinner';

// function Calendar() {
//   const [events, setEvents] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [holidays, setHolidays] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [calendarView, setCalendarView] = useState('dayGridMonth');
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const calendarRef = useRef(null);

//   // API Key for Calendarific
//   const API_KEY = 'dkPIxL5z4UjyYubRU7Of28vtwayR5bgf';
//   const COUNTRY = 'IN';

//   // Fetch holidays from Calendarific API for India
//   useEffect(() => {
//     const fetchHolidays = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${COUNTRY}&year=${year}`
//         );
//         const data = await response.json();

//         if (data.response && data.response.holidays) {
//           const formattedHolidays = data.response.holidays.map(holiday => ({
//             id: `holiday-${holiday.date.iso}`,
//             title: `🎉 ${holiday.name}`,
//             start: holiday.date.iso,
//             allDay: true,
//             color: '#FF5722',
//             extendedProps: {
//               type: 'holiday',
//               description: holiday.description,
//               country: COUNTRY,
//             },
//           }));
//           setHolidays(formattedHolidays);
//         }
//       } catch (error) {
//         console.error('Error fetching holidays:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchHolidays();
//   }, [year]);

//   // Load saved events from localStorage
//   useEffect(() => {
//     const savedEvents = localStorage.getItem('hrmsCalendarEvents');
//     if (savedEvents) {
//       setEvents(JSON.parse(savedEvents));
//     }
//   }, []);

//   // Save events to localStorage whenever events change
//   useEffect(() => {
//     localStorage.setItem('hrmsCalendarEvents', JSON.stringify(events));
//   }, [events]);

//   // Handle adding a new event
//   const handleAddEvent = newEvent => {
//     const eventWithId = { ...newEvent, id: `event-${Date.now()}` };
//     setEvents([...events, eventWithId]);
//     setShowAddModal(false);
//   };

//   // Handle editing an event
//   const handleEditEvent = updatedEvent => {
//     setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
//     setShowDetailsModal(false);
//     setSelectedEvent(null);
//   };

//   // Handle deleting an event
//   const handleDeleteEvent = eventId => {
//     setEvents(events.filter(event => event.id !== eventId));
//     setShowDetailsModal(false);
//     setSelectedEvent(null);
//   };

//   // Handle clicking on a date
//   const handleDateClick = info => {
//     setSelectedDate(info.date);
//     setShowAddModal(true);
//   };

//   // Handle clicking on an event
//   const handleEventClick = info => {
//     if (info.event.extendedProps.type === 'holiday') {
//       alert(
//         `Holiday: ${info.event.title.replace('🎉 ', '')}\nDescription: ${
//           info.event.extendedProps.description || 'National Holiday'
//         }`
//       );
//       return;
//     }

//     setSelectedEvent({
//       id: info.event.id,
//       title: info.event.title,
//       start: info.event.start,
//       end: info.event.end,
//       allDay: info.event.allDay,
//       color: info.event.backgroundColor,
//       description: info.event.extendedProps.description,
//       location: info.event.extendedProps.location,
//       link: info.event.extendedProps.link,
//       attendees: info.event.extendedProps.attendees || [],
//       priority: info.event.extendedProps.priority || 'Medium',
//     });
//     setShowDetailsModal(true);
//   };

//   // Handle view change
//   const handleViewChange = viewName => {
//     setCalendarView(viewName);
//     if (calendarRef.current) {
//       const calendarApi = calendarRef.current.getApi();
//       calendarApi.changeView(viewName);
//       setCurrentDate(calendarApi.getDate());
//     }
//   };

//   // Handle year change
//   const handleYearChange = e => {
//     setYear(parseInt(e.target.value));
//   };

//   // Update current date when calendar view changes
//   const handleDatesSet = dateInfo => {
//     setCurrentDate(dateInfo.view.currentStart);
//   };

//   // Custom event rendering
//   const eventContent = eventInfo => {
//     const isHoliday = eventInfo.event.extendedProps.type === 'holiday';
//     return (
//       <div className={`fc-event-main-frame ${isHoliday ? 'holiday-event' : ''}`}>
//         <div className="fc-event-time">{eventInfo.timeText}</div>
//         <div className="fc-event-title-container">
//           <div className="fc-event-title fc-sticky">
//             {isHoliday ? (
//               <span className="flex items-center">
//                 <span className="mr-1">🎉</span>
//                 <span>{eventInfo.event.title.replace('🎉 ', '')}</span>
//               </span>
//             ) : (
//               <span className="flex items-center">
//                 {eventInfo.event.extendedProps.priority === 'High' && (
//                   <span className="mr-1 text-red-500">⚠️</span>
//                 )}
//                 {eventInfo.event.title}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Filter holidays to show only current month's holidays
//   const currentMonthHolidays = useMemo(() => {
//     const start = startOfMonth(currentDate);
//     const end = endOfMonth(currentDate);
//     return holidays.filter(holiday => {
//       const holidayDate = new Date(holiday.start);
//       return holidayDate >= start && holidayDate <= end;
//     });
//   }, [holidays, currentDate]);

//   // Combine user events and current month holidays
//   const allEvents = [...events, ...currentMonthHolidays];

//   // Compute upcoming holidays (from today onwards)
//   const upcomingHolidays = useMemo(() => {
//     const today = new Date();
//     return holidays
//       .filter(holiday => new Date(holiday.start) >= today)
//       .sort((a, b) => new Date(a.start) - new Date(b.start))
//       .slice(0, 5);
//   }, [holidays]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8">
//         <CalendarHeader
//           calendarView={calendarView}
//           onViewChange={handleViewChange}
//           onAddEvent={() => {
//             setSelectedDate(new Date());
//             setShowAddModal(true);
//           }}
//           year={year}
//           onYearChange={handleYearChange}
//           currentDate={currentDate}
//         />

//         {isLoading && <LoadingSpinner />}

//         <div className="mt-6">
//           <style jsx global>{`
//             .fc-theme-standard .fc-scrollgrid {
//               border-radius: 12px;
//               overflow: hidden;
//               border: 1px solid #e2e8f0;
//             }

//             .fc-day-today {
//               background-color: #dbeafe !important;
//               border: 2px solid #3b82f6;
//             }

//             .fc-daygrid-day-top {
//               justify-content: center;
//               padding-top: 6px;
//             }

//             .fc-daygrid-day-number {
//               font-weight: 600;
//               color: #1f2937;
//             }

//             .fc-col-header-cell {
//               background-color: #4f46e5;
//               color: white;
//               padding: 10px 0;
//             }

//             .fc-col-header-cell-cushion {
//               font-weight: 700;
//               color: white;
//               text-decoration: none !important;
//             }

//             .fc-daygrid-event {
//               border-radius: 6px;
//               padding: 4px 6px;
//               margin-top: 3px;
//               border: none;
//               box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//             }

//             .fc-event-time {
//               font-weight: 600;
//             }

//             .fc-event-title {
//               font-weight: 600;
//               overflow: hidden;
//               text-overflow: ellipsis;
//               white-space: nowrap;
//             }

//             .holiday-event {
//               background-color: #ffede7;
//               color: #b91c1c;
//             }

//             .fc-highlight {
//               background-color: #e5e7eb;
//             }

//             .fc-button-primary {
//               background-color: #4f46e5;
//               border-color: #4f46e5;
//               border-radius: 6px;
//               text-transform: uppercase;
//               font-weight: 600;
//             }

//             .fc-button-primary:hover {
//               background-color: #4338ca;
//               border-color: #4338ca;
//             }

//             .fc-daygrid-day:hover {
//               background-color: #f9fafb;
//               transition: background-color 0.2s ease;
//             }

//             .fc-daygrid-event:hover {
//               transform: scale(1.03);
//               transition: transform 0.1s ease-in-out;
//             }

//             @media (max-width: 640px) {
//               .fc-header-toolbar {
//                 flex-direction: column;
//                 gap: 12px;
//               }
//             }
//           `}</style>

//           <FullCalendar
//             ref={calendarRef}
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             initialView={calendarView}
//             headerToolbar={false}
//             events={allEvents}
//             dateClick={handleDateClick}
//             eventClick={handleEventClick}
//             eventContent={eventContent}
//             height="auto"
//             aspectRatio={1.8}
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={3}
//             weekends={true}
//             datesSet={handleDatesSet}
//             eventTimeFormat={{ hour: 'numeric', minute: '2-digit', meridiem: 'short' }}
//             slotLabelFormat={{ hour: 'numeric', minute: '2-digit', hour12: true }}
//             dayHeaderFormat={{ weekday: 'short' }}
//             allDayText="All Day"
//             moreLinkText="+ more"
//             noEventsText="No events to display"
//           />
//         </div>

//         {/* Upcoming Holidays Section */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Holidays</h2>
//           {upcomingHolidays.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {upcomingHolidays.map(holiday => (
//                 <div
//                   key={holiday.id}
//                   className="bg-white p-5 rounded-lg shadow-md border-l-4 border-orange-500 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg"
//                 >
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     {holiday.title.replace('🎉 ', '')}
//                   </h3>
//                   <p className="text-gray-600 mt-1">
//                     {format(new Date(holiday.start), 'MMMM d, yyyy')}
//                   </p>
//                   <p className="text-gray-500 mt-2 text-sm">
//                     {holiday.extendedProps.description || 'National Holiday'}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No upcoming holidays in the selected year.</p>
//           )}
//         </div>

//         {showAddModal && (
//           <AddEventModal
//             isOpen={showAddModal}
//             onClose={() => setShowAddModal(false)}
//             onAddEvent={handleAddEvent}
//             selectedDate={selectedDate}
//           />
//         )}

//         {showDetailsModal && selectedEvent && (
//           <EventDetailsModal
//             isOpen={showDetailsModal}
//             onClose={() => {
//               setShowDetailsModal(false);
//               setSelectedEvent(null);
//             }}
//             event={selectedEvent}
//             onEditEvent={handleEditEvent}
//             onDeleteEvent={handleDeleteEvent}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Calendar;

// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import { format, startOfMonth, endOfMonth } from 'date-fns';

// // Components
// import AddEventModal from '../../components/AddEventModal';
// import EventDetailsModal from '../../components/EventDetailsModal';
// import CalendarHeader from '../../components/CalendarHeader';
// import LoadingSpinner from '../../components/LoadingSpinner';

// function Calendar() {
//   const [events, setEvents] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [holidays, setHolidays] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [calendarView, setCalendarView] = useState('dayGridMonth');
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const calendarRef = useRef(null);

//   // API Key for Calendarific
//   const API_KEY = 'dkPIxL5z4UjyYubRU7Of28vtwayR5bgf';
//   const COUNTRY = 'IN';

//   // Fetch holidays from Calendarific API for India
//   useEffect(() => {
//     const fetchHolidays = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${COUNTRY}&year=${year}`
//         );
//         const data = await response.json();

//         if (data.response && data.response.holidays) {
//           const formattedHolidays = data.response.holidays.map(holiday => ({
//             id: `holiday-${holiday.date.iso}`,
//             title: `🎉 ${holiday.name}`,
//             start: holiday.date.iso,
//             allDay: true,
//             color: '#FF5722',
//             extendedProps: {
//               type: 'holiday',
//               description: holiday.description,
//               country: COUNTRY,
//             },
//           }));
//           setHolidays(formattedHolidays);
//         }
//       } catch (error) {
//         console.error('Error fetching holidays:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchHolidays();
//   }, [year]);

//   // Load saved events from localStorage
//   useEffect(() => {
//     const savedEvents = localStorage.getItem('hrmsCalendarEvents');
//     if (savedEvents) {
//       setEvents(JSON.parse(savedEvents));
//     }
//   }, []);

//   // Save events to localStorage whenever events change
//   useEffect(() => {
//     localStorage.setItem('hrmsCalendarEvents', JSON.stringify(events));
//   }, [events]);

//   // Handle adding a new event
//   const handleAddEvent = newEvent => {
//     const eventWithId = { ...newEvent, id: `event-${Date.now()}` };
//     setEvents([...events, eventWithId]);
//     setShowAddModal(false);
//   };

//   // Handle editing an event
//   const handleEditEvent = updatedEvent => {
//     setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
//     setShowDetailsModal(false);
//     setSelectedEvent(null);
//   };

//   // Handle deleting an event
//   const handleDeleteEvent = eventId => {
//     setEvents(events.filter(event => event.id !== eventId));
//     setShowDetailsModal(false);
//     setSelectedEvent(null);
//   };

//   // Handle clicking on a date
//   const handleDateClick = info => {
//     setSelectedDate(info.date);
//     setShowAddModal(true);
//   };

//   // Handle clicking on an event
//   const handleEventClick = info => {
//     if (info.event.extendedProps.type === 'holiday') {
//       // Enhanced holiday alert using a custom modal would be better
//       alert(
//         `Holiday: ${info.event.title.replace('🎉 ', '')}\nDescription: ${
//           info.event.extendedProps.description || 'National Holiday'
//         }`
//       );
//       return;
//     }

//     setSelectedEvent({
//       id: info.event.id,
//       title: info.event.title,
//       start: info.event.start,
//       end: info.event.end,
//       allDay: info.event.allDay,
//       color: info.event.backgroundColor,
//       description: info.event.extendedProps.description,
//       location: info.event.extendedProps.location,
//       link: info.event.extendedProps.link,
//       attendees: info.event.extendedProps.attendees || [],
//       priority: info.event.extendedProps.priority || 'Medium',
//     });
//     setShowDetailsModal(true);
//   };

//   // Handle view change
//   const handleViewChange = viewName => {
//     setCalendarView(viewName);
//     if (calendarRef.current) {
//       const calendarApi = calendarRef.current.getApi();
//       calendarApi.changeView(viewName);
//       setCurrentDate(calendarApi.getDate());
//     }
//   };

//   // Handle year change
//   const handleYearChange = e => {
//     setYear(parseInt(e.target.value));
//   };

//   // Update current date when calendar view changes
//   const handleDatesSet = dateInfo => {
//     setCurrentDate(dateInfo.view.currentStart);
//   };

//   // Custom event rendering with enhanced styling
//   const eventContent = eventInfo => {
//     const isHoliday = eventInfo.event.extendedProps.type === 'holiday';
//     const priorityColors = {
//       High: 'bg-red-100 border-l-4 border-red-500',
//       Medium: 'bg-blue-100 border-l-4 border-blue-500',
//       Low: 'bg-green-100 border-l-4 border-green-500'
//     };
    
//     const priorityClass = !isHoliday ? priorityColors[eventInfo.event.extendedProps.priority || 'Medium'] : '';
    
//     return (
//       <div className={`fc-event-main-frame ${isHoliday ? 'holiday-event' : priorityClass} rounded-md p-1`}>
//         <div className="fc-event-time font-medium">{eventInfo.timeText}</div>
//         <div className="fc-event-title-container">
//           <div className="fc-event-title fc-sticky">
//             {isHoliday ? (
//               <span className="flex items-center">
//                 <span className="mr-1">🎉</span>
//                 <span className="font-medium truncate">{eventInfo.event.title.replace('🎉 ', '')}</span>
//               </span>
//             ) : (
//               <span className="flex items-center">
//                 {eventInfo.event.extendedProps.priority === 'High' && (
//                   <span className="mr-1 text-red-500">⚠️</span>
//                 )}
//                 <span className="font-medium truncate">{eventInfo.event.title}</span>
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Filter holidays to show only current month's holidays
//   const currentMonthHolidays = useMemo(() => {
//     const start = startOfMonth(currentDate);
//     const end = endOfMonth(currentDate);
//     return holidays.filter(holiday => {
//       const holidayDate = new Date(holiday.start);
//       return holidayDate >= start && holidayDate <= end;
//     });
//   }, [holidays, currentDate]);

//   // Combine user events and current month holidays
//   const allEvents = [...events, ...currentMonthHolidays];

//   // Compute upcoming holidays (from today onwards)
//   const upcomingHolidays = useMemo(() => {
//     const today = new Date();
//     return holidays
//       .filter(holiday => new Date(holiday.start) >= today)
//       .sort((a, b) => new Date(a.start) - new Date(b.start))
//       .slice(0, 5);
//   }, [holidays]);

//   return (
//     <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//         {/* Glass-morphism header with gradient */}
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
//           <h1 className="text-3xl font-bold mb-2">Calendar Dashboard</h1>
//           <p className="opacity-80">Manage your events and track holidays</p>
//         </div>
        
//         <div className="p-8">
//           <CalendarHeader
//             calendarView={calendarView}
//             onViewChange={handleViewChange}
//             onAddEvent={() => {
//               setSelectedDate(new Date());
//               setShowAddModal(true);
//             }}
//             year={year}
//             onYearChange={handleYearChange}
//             currentDate={currentDate}
//           />

//           {isLoading && <LoadingSpinner />}

//           <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
//             <style jsx global>{`
//               .fc-theme-standard .fc-scrollgrid {
//                 border: none;
//                 overflow: hidden;
//               }

//               .fc-theme-standard td, .fc-theme-standard th {
//                 border-color: #edf2f7;
//               }

//               .fc-day-today {
//                 background-color: #ebf4ff !important;
//                 position: relative;
//               }
              
//               .fc-day-today:after {
//                 content: '';
//                 position: absolute;
//                 width: 85%;
//                 height: 85%;
//                 top: 7.5%;
//                 left: 7.5%;
//                 border: 2px solid #3b82f6;
//                 border-radius: 50%;
//                 pointer-events: none;
//                 z-index: 1;
//               }

//               .fc-daygrid-day-top {
//                 justify-content: center;
//                 padding-top: 8px;
//               }

//               .fc-daygrid-day-number {
//                 font-weight: 600;
//                 color: #1f2937;
//                 padding: 6px;
//                 margin-top: 2px;
//                 width: 30px;
//                 height: 30px;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 border-radius: 50%;
//                 transition: all 0.2s ease;
//               }
              
//               .fc-day-today .fc-daygrid-day-number {
//                 background-color: #3b82f6;
//                 color: white;
//               }

//               .fc-col-header-cell {
//                 background-color: #4f46e5;
//                 background-image: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
//                 color: white;
//                 padding: 12px 0;
//               }

//               .fc-col-header-cell-cushion {
//                 font-weight: 700;
//                 color: white;
//                 text-decoration: none !important;
//                 padding: 8px;
//                 text-transform: uppercase;
//                 font-size: 0.85rem;
//                 letter-spacing: 0.05em;
//               }

//               .fc-daygrid-event {
//                 border-radius: 8px;
//                 padding: 4px 8px;
//                 margin-top: 4px;
//                 border: none;
//                 box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
//                 transition: all 0.2s ease;
//               }

//               .fc-event-time {
//                 font-weight: 600;
//                 font-size: 0.85rem;
//               }

//               .fc-event-title {
//                 font-weight: 500;
//                 overflow: hidden;
//                 text-overflow: ellipsis;
//                 white-space: nowrap;
//                 font-size: 0.9rem;
//               }

//               .holiday-event {
//                 background-color: #fff0ed;
//                 color: #c53030;
//                 border-left: 4px solid #FF5722 !important;
//               }

//               .fc-highlight {
//                 background-color: #e9eef6;
//               }

//               .fc-button-primary {
//                 background-color: #4f46e5;
//                 border-color: #4f46e5;
//                 border-radius: 8px;
//                 text-transform: uppercase;
//                 font-weight: 600;
//                 padding: 0.6rem 1.2rem;
//                 font-size: 0.85rem;
//                 letter-spacing: 0.025em;
//                 box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
//                 transition: all 0.2s ease;
//               }

//               .fc-button-primary:hover {
//                 background-color: #4338ca;
//                 border-color: #4338ca;
//                 transform: translateY(-1px);
//                 box-shadow: 0 4px 6px rgba(79, 70, 229, 0.25);
//               }
              
//               .fc-button-primary:active {
//                 transform: translateY(0);
//               }

//               .fc-daygrid-day:hover {
//                 background-color: #f9fafb;
//                 transition: background-color 0.2s ease;
//               }

//               .fc-daygrid-event:hover {
//                 transform: translateY(-2px);
//                 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
//               }
              
//               .fc-daygrid-more-link {
//                 background: #f3f4f6;
//                 border-radius: 6px;
//                 padding: 2px 6px;
//                 font-size: 0.75rem;
//                 font-weight: 600;
//                 color: #4f46e5;
//                 margin-top: 4px;
//                 display: inline-block;
//               }

//               @media (max-width: 640px) {
//                 .fc-header-toolbar {
//                   flex-direction: column;
//                   gap: 12px;
//                 }
//               }
//             `}</style>

//             <FullCalendar
//               ref={calendarRef}
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView={calendarView}
//               headerToolbar={false}
//               events={allEvents}
//               dateClick={handleDateClick}
//               eventClick={handleEventClick}
//               eventContent={eventContent}
//               height="auto"
//               aspectRatio={1.8}
//               editable={true}
//               selectable={true}
//               selectMirror={true}
//               dayMaxEvents={3}
//               weekends={true}
//               datesSet={handleDatesSet}
//               eventTimeFormat={{ hour: 'numeric', minute: '2-digit', meridiem: 'short' }}
//               slotLabelFormat={{ hour: 'numeric', minute: '2-digit', hour12: true }}
//               dayHeaderFormat={{ weekday: 'short' }}
//               allDayText="All Day"
//               moreLinkText="+ more"
//               noEventsText="No events to display"
//             />
//           </div>

//           {/* Upcoming Holidays Section - Enhanced */}
//           <div className="mt-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//                 <span className="mr-2">🎊</span> Upcoming Holidays
//               </h2>
//               <div className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium">
//                 {year}
//               </div>
//             </div>
            
//             {upcomingHolidays.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {upcomingHolidays.map(holiday => (
//                   <div
//                     key={holiday.id}
//                     className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group"
//                   >
//                     {/* Background decoration */}
//                     <div className="absolute -right-6 -top-6 w-20 h-20 bg-orange-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                    
//                     <h3 className="text-lg font-semibold text-gray-900 relative z-10">
//                       {holiday.title.replace('🎉 ', '')}
//                     </h3>
//                     <div className="flex items-center mt-3 text-gray-600 relative z-10">
//                       <span className="mr-2">📅</span>
//                       <span className="font-medium">
//                         {format(new Date(holiday.start), 'MMMM d, yyyy')}
//                       </span>
//                     </div>
//                     <p className="text-gray-500 mt-3 text-sm relative z-10">
//                       {holiday.extendedProps.description || 'National Holiday'}
//                     </p>
                    
//                     {/* Days remaining badge */}
//                     <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center justify-center min-w-8 h-8">
//                       {Math.ceil((new Date(holiday.start) - new Date()) / (1000 * 60 * 60 * 24))} days
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="bg-gray-50 rounded-lg p-8 text-center">
//                 <p className="text-gray-500 flex flex-col items-center justify-center">
//                   <span className="text-4xl mb-4">🗓️</span>
//                   <span>No upcoming holidays in the selected year.</span>
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Quick-stats footer */}
//       <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between border-t-4 border-indigo-500">
//           <div>
//             <p className="text-gray-500 text-sm font-medium">Total Events</p>
//             <p className="text-2xl font-bold text-gray-800">{events.length}</p>
//           </div>
//           <div className="bg-indigo-100 p-3 rounded-full">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between border-t-4 border-purple-500">
//           <div>
//             <p className="text-gray-500 text-sm font-medium">Total Holidays</p>
//             <p className="text-2xl font-bold text-gray-800">{holidays.length}</p>
//           </div>
//           <div className="bg-purple-100 p-3 rounded-full">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
//             </svg>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between border-t-4 border-emerald-500">
//           <div>
//             <p className="text-gray-500 text-sm font-medium">Current Month</p>
//             <p className="text-2xl font-bold text-gray-800">{format(currentDate, 'MMMM')}</p>
//           </div>
//           <div className="bg-emerald-100 p-3 rounded-full">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//           </div>
//         </div>
//       </div>

//       {showAddModal && (
//         <AddEventModal
//           isOpen={showAddModal}
//           onClose={() => setShowAddModal(false)}
//           onAddEvent={handleAddEvent}
//           selectedDate={selectedDate}
//         />
//       )}

//       {showDetailsModal && selectedEvent && (
//         <EventDetailsModal
//           isOpen={showDetailsModal}
//           onClose={() => {
//             setShowDetailsModal(false);
//             setSelectedEvent(null);
//           }}
//           event={selectedEvent}
//           onEditEvent={handleEditEvent}
//           onDeleteEvent={handleDeleteEvent}
//         />
//       )}
//     </div>
//   );
// }

// export default Calendar;

import React, { useState, useEffect, useRef, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { format, startOfMonth, endOfMonth } from 'date-fns';

// Components
import AddEventModal from '../../components/AddEventModal';
import EventDetailsModal from '../../components/EventDetailsModal';
import CalendarHeader from '../../components/CalendarHeader';
import LoadingSpinner from '../../components/LoadingSpinner';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAllHolidaysModal, setShowAllHolidaysModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarView, setCalendarView] = useState('dayGridMonth');
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date());

  const calendarRef = useRef(null);

  // API Key for Calendarific
  const API_KEY = 'dkPIxL5z4UjyYubRU7Of28vtwayR5bgf';
  const COUNTRY = 'IN';

  // Fetch holidays from Calendarific API for India
  useEffect(() => {
    const fetchHolidays = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${COUNTRY}&year=${year}`
        );
        const data = await response.json();

        if (data.response && data.response.holidays) {
          const formattedHolidays = data.response.holidays.map(holiday => ({
            id: `holiday-${holiday.date.iso}`,
            title: `🎉 ${holiday.name}`,
            start: holiday.date.iso,
            allDay: true,
            color: '#FF5722',
            extendedProps: {
              type: 'holiday',
              description: holiday.description,
              country: COUNTRY,
              month: new Date(holiday.date.iso).getMonth(),
            },
          }));
          setHolidays(formattedHolidays);
        }
      } catch (error) {
        console.error('Error fetching holidays:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHolidays();
  }, [year]);

  // Load saved events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('hrmsCalendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('hrmsCalendarEvents', JSON.stringify(events));
  }, [events]);

  // Handle adding a new event
  const handleAddEvent = newEvent => {
    const eventWithId = { ...newEvent, id: `event-${Date.now()}` };
    setEvents([...events, eventWithId]);
    setShowAddModal(false);
  };

  // Handle editing an event
  const handleEditEvent = updatedEvent => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
    setShowDetailsModal(false);
    setSelectedEvent(null);
  };

  // Handle deleting an event
  const handleDeleteEvent = eventId => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowDetailsModal(false);
    setSelectedEvent(null);
  };

  // Handle clicking on a date
  const handleDateClick = info => {
    setSelectedDate(info.date);
    setShowAddModal(true);
  };

  // Handle clicking on an event
  const handleEventClick = info => {
    if (info.event.extendedProps.type === 'holiday') {
      // Enhanced holiday alert using a custom modal would be better
      alert(
        `Holiday: ${info.event.title.replace('🎉 ', '')}\nDescription: ${
          info.event.extendedProps.description || 'National Holiday'
        }`
      );
      return;
    }

    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      allDay: info.event.allDay,
      color: info.event.backgroundColor,
      description: info.event.extendedProps.description,
      location: info.event.extendedProps.location,
      link: info.event.extendedProps.link,
      attendees: info.event.extendedProps.attendees || [],
      priority: info.event.extendedProps.priority || 'Medium',
    });
    setShowDetailsModal(true);
  };

  // Handle view change
  const handleViewChange = viewName => {
    setCalendarView(viewName);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(viewName);
      setCurrentDate(calendarApi.getDate());
    }
  };

  // Handle year change
  const handleYearChange = e => {
    setYear(parseInt(e.target.value));
  };

  // Update current date when calendar view changes
  const handleDatesSet = dateInfo => {
    setCurrentDate(dateInfo.view.currentStart);
  };

  // Custom event rendering with enhanced styling
  const eventContent = eventInfo => {
    const isHoliday = eventInfo.event.extendedProps.type === 'holiday';
    const priorityColors = {
      High: 'bg-red-100 border-l-4 border-red-500',
      Medium: 'bg-blue-100 border-l-4 border-blue-500',
      Low: 'bg-green-100 border-l-4 border-green-500'
    };
    
    const priorityClass = !isHoliday ? priorityColors[eventInfo.event.extendedProps.priority || 'Medium'] : '';
    
    return (
      <div className={`fc-event-main-frame ${isHoliday ? 'holiday-event' : priorityClass} rounded-md p-1`}>
        <div className="fc-event-time font-medium">{eventInfo.timeText}</div>
        <div className="fc-event-title-container">
          <div className="fc-event-title fc-sticky">
            {isHoliday ? (
              <span className="flex items-center">
                <span className="mr-1">🎉</span>
                <span className="font-medium truncate">{eventInfo.event.title.replace('🎉 ', '')}</span>
              </span>
            ) : (
              <span className="flex items-center">
                {eventInfo.event.extendedProps.priority === 'High' && (
                  <span className="mr-1 text-red-500">⚠️</span>
                )}
                <span className="font-medium truncate">{eventInfo.event.title}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Filter holidays to show only current month's holidays
  const currentMonthHolidays = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return holidays.filter(holiday => {
      const holidayDate = new Date(holiday.start);
      return holidayDate >= start && holidayDate <= end;
    });
  }, [holidays, currentDate]);

  // Combine user events and current month holidays
  const allEvents = [...events, ...currentMonthHolidays];

  // Compute upcoming holidays (from today onwards)
  const upcomingHolidays = useMemo(() => {
    const today = new Date();
    return holidays
      .filter(holiday => new Date(holiday.start) >= today)
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, 5);
  }, [holidays]);

  // Group holidays by month for the modal view
  // const holidaysByMonth = useMemo(() => {
  //   const months = [
  //     'January', 'February', 'March', 'April', 'May', 'June', 
  //     'July', 'August', 'September', 'October', 'November', 'December'
  //   ];
    
  //   const grouped = {};
    
  //   // Initialize each month
  //   months.forEach((month, index) => {
  //     grouped[index] = {
  //       name: month,
  //       holidays: []
  //     };
  //   });
    
  //   // Group holidays
  //   holidays.forEach(holiday => {
  //     const month = new Date(holiday.start).getMonth();
  //     grouped[month].holidays.push(holiday);
  //   });
    
  //   return grouped;
  // }, [holidays]);

  const holidaysByMonth = useMemo(() => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    return Array.from({ length: 12 }, (_, index) => {
      const monthHolidays = holidays.filter(holiday => {
        // Ensure start is a string in "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SSZ" format
        if (typeof holiday.start !== 'string') {
          console.warn('Invalid start date format:', holiday.start);
          return false;
        }
  
        // Extract date (ignoring time, if any)
        const [year, month, day] = holiday.start.split('T')[0].split('-').map(Number);
        if (isNaN(month)) return false; // Ensure month extraction is valid
  
        return month - 1 === index; // Convert to zero-based index
      });
  
      const uniqueDates = new Set(
        monthHolidays.map(holiday => holiday.start.split('T')[0]) // Ensure date is unique
      );
  
      return {
        name: months[index],
        holidays: monthHolidays,
        uniqueHolidayCount: uniqueDates.size
      };
    });
  }, [holidays]);
  

  // All Holidays Modal Component
//   const AllHolidaysModal = () => {
//     const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
    
//     if (!showAllHolidaysModal) return null;
    
//     const months = Object.values(holidaysByMonth);
    
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-center">
//             <h2 className="text-2xl font-bold flex items-center">
//               <span className="mr-2">🎊</span> All Holidays - {year}
//             </h2>
//             <button 
//               onClick={() => setShowAllHolidaysModal(false)}
//               className="text-white hover:text-red-200 transition-colors"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
          
//           <div className="flex overflow-hidden h-full">
//             {/* Month selector sidebar */}
//             <div className="w-1/4 bg-gray-50 p-4 overflow-y-auto border-r border-gray-200">
//               <div className="space-y-1">
//                 {/* {months.map((month, index) => (
//                   <button
//                     key={month.name}
//                     className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
//                       activeMonth === index 
//                         ? 'bg-indigo-100 text-indigo-800'
//                         : 'hover:bg-gray-200 text-gray-700'
//                     }`}
//                     onClick={() => setActiveMonth(index)}
//                   >
//                     {month.name}
//                     {month.holidays.length > 0 && (
//                       <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
//                         {month.holidays.length}
//                       </span>
//                     )}
//                   </button>
//                 ))} */}
//                 {months.map((month, index) => (
//   <button
//     key={month.name}
//     className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
//       activeMonth === index 
//         ? 'bg-indigo-100 text-indigo-800'
//         : 'hover:bg-gray-200 text-gray-700'
//     }`}
//     onClick={() => setActiveMonth(index)}
//   >
//     {month.name}
//     {month.uniqueHolidayDays > 0 && (
//       <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
//         {month.uniqueHolidayDays}
//       </span>
//     )}
//   </button>
// ))}
//               </div>
//             </div>
            
//             {/* Holidays list */}
//             <div className="w-3/4 p-6 overflow-y-auto">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">{months[activeMonth].name}</h3>
              
//               {months[activeMonth].holidays.length > 0 ? (
//                 <div className="space-y-4">
//                   {months[activeMonth].holidays.map(holiday => (
//                     <div 
//                       key={holiday.id}
//                       className="bg-white p-5 rounded-lg shadow border-l-4 border-orange-500 hover:shadow-md transition-shadow"
//                     >
//                       <div className="flex justify-between items-start">
//                         <h4 className="text-lg font-semibold text-gray-900">
//                           {holiday.title.replace('🎉 ', '')}
//                         </h4>
//                         <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                           {format(new Date(holiday.start), 'MMM d')}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 mt-2 text-sm">
//                         {holiday.extendedProps.description || 'National Holiday'}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-12 text-gray-500">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   <p>No holidays in {months[activeMonth].name}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

// const AllHolidaysModal = () => {
//   const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  
//   if (!showAllHolidaysModal) return null;
  
//   const months = holidaysByMonth; // Already an array from useMemo
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-center">
//           <h2 className="text-2xl font-bold flex items-center">
//             <span className="mr-2">🎊</span> All Holidays - {year}
//           </h2>
//           <button 
//             onClick={() => setShowAllHolidaysModal(false)}
//             className="text-white hover:text-red-200 transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         <div className="flex overflow-hidden h-full">
//           {/* Month selector sidebar */}
//           <div className="w-1/4 bg-gray-50 p-4 overflow-y-auto border-r border-gray-200">
//             <div className="space-y-1">
//               {months.map((month, index) => (
//                 <button
//                   key={month.name}
//                   className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
//                     activeMonth === index 
//                       ? 'bg-indigo-100 text-indigo-800'
//                       : 'hover:bg-gray-200 text-gray-700'
//                   }`}
//                   onClick={() => setActiveMonth(index)}
//                 >
//                   {month.name}
//                   {month.uniqueHolidayCount > 0 && (
//                     <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
//                       {month.uniqueHolidayCount}
//                     </span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           {/* Holidays list */}
//           <div className="w-3/4 p-6 overflow-y-auto">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">{months[activeMonth].name}</h3>
            
//             {months[activeMonth].holidays.length > 0 ? (
//               <div className="space-y-4">
//                 {months[activeMonth].holidays.map(holiday => (
//                   <div 
//                     key={holiday.id}
//                     className="bg-white p-5 rounded-lg shadow border-l-4 border-orange-500 hover:shadow-md transition-shadow"
//                   >
//                     <div className="flex justify-between items-start">
//                       <h4 className="text-lg font-semibold text-gray-900">
//                         {holiday.title.replace('🎉 ', '')}
//                       </h4>
//                       <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                         {format(new Date(holiday.start), 'MMM d')}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 mt-2 text-sm">
//                       {holiday.extendedProps.description || 'National Holiday'}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-12 text-gray-500">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 <p>No holidays in {months[activeMonth].name}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// All Holidays Modal Component
const AllHolidaysModal = () => {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  
  if (!showAllHolidaysModal) return null;
  
  // Group holidays by month properly
  const holidaysByMonth = useMemo(() => {
    const months = Array(12).fill().map((_, i) => ({
      name: format(new Date(0, i), 'MMMM'),
      holidays: []
    }));
    
    // Filter unique holidays by date (since some holidays might span multiple days)
    const uniqueHolidays = [];
    const seenDates = new Set();
    
    holidays.forEach(holiday => {
      const dateKey = holiday.start.split('T')[0]; // Get just the date part
      if (!seenDates.has(dateKey)) {
        seenDates.add(dateKey);
        uniqueHolidays.push(holiday);
      }
    });
    
    // Group by month
    uniqueHolidays.forEach(holiday => {
      const month = new Date(holiday.start).getMonth();
      months[month].holidays.push(holiday);
    });
    
    return months;
  }, [holidays]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="mr-2">🎊</span> All Holidays - {year}
          </h2>
          <button 
            onClick={() => setShowAllHolidaysModal(false)}
            className="text-white hover:text-red-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex overflow-hidden h-full">
          {/* Month selector sidebar */}
          <div className="w-1/4 bg-gray-50 p-4 overflow-y-auto border-r border-gray-200">
            <div className="space-y-1">
              {holidaysByMonth.map((month, index) => (
                <button
                  key={month.name}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeMonth === index 
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setActiveMonth(index)}
                >
                  {month.name}
                  {month.holidays.length > 0 && (
                    <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
                      {month.holidays.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Holidays list */}
          <div className="w-3/4 p-6 overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{holidaysByMonth[activeMonth].name}</h3>
            
            {holidaysByMonth[activeMonth].holidays.length > 0 ? (
              <div className="space-y-4">
                {holidaysByMonth[activeMonth].holidays.map(holiday => (
                  <div 
                    key={holiday.id}
                    className="bg-white p-5 rounded-lg shadow border-l-4 border-orange-500 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {holiday.title.replace('🎉 ', '')}
                      </h4>
                      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {format(new Date(holiday.start), 'MMM d')}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">
                      {holiday.extendedProps.description || 'National Holiday'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>No holidays in {holidaysByMonth[activeMonth].name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Glass-morphism header with gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Calendar Dashboard</h1>
          <p className="opacity-80">Manage your events and track holidays</p>
        </div>
        
        <div className="p-8">
          <CalendarHeader
            calendarView={calendarView}
            onViewChange={handleViewChange}
            onAddEvent={() => {
              setSelectedDate(new Date());
              setShowAddModal(true);
            }}
            year={year}
            onYearChange={handleYearChange}
            currentDate={currentDate}
          />

          {isLoading && <LoadingSpinner />}

          <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
            <style jsx global>{`
              /* Beautiful calendar styling */
              .fc-theme-standard .fc-scrollgrid {
                border: none;
                overflow: hidden;
              }

              .fc-theme-standard td, .fc-theme-standard th {
                border-color: #edf2f7;
              }
              
              /* Make day blocks more colorful */
             
              
              /* Today styling without the circle */
              .fc-day-today {
                background-color: rgba(59, 130, 246, 0.3) !important;
                opacity: 1 !important;
                box-shadow: inset 0 0 0 2px #3b82f6;
              }

              .fc-daygrid-day-top {
                justify-content: center;
                padding-top: 8px;
              }

              .fc-daygrid-day-number {
                font-weight: 600;
                color: #1f2937;
                padding: 6px;
                margin-top: 2px;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
              }
              
              .fc-day-today .fc-daygrid-day-number {
                background-color: #3b82f6;
                color: white;
                border-radius: 50%;
              }

              .fc-col-header-cell {
                background-color: #4f46e5;
                background-image: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
                color: white;
                padding: 12px 0;
              }

              .fc-col-header-cell-cushion {
                font-weight: 700;
                color: white;
                text-decoration: none !important;
                padding: 8px;
                text-transform: uppercase;
                font-size: 0.85rem;
                letter-spacing: 0.05em;
              }

              .fc-daygrid-event {
                border-radius: 8px;
                padding: 4px 8px;
                margin-top: 4px;
                border: none;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
                transition: all 0.2s ease;
              }

              .fc-event-time {
                font-weight: 600;
                font-size: 0.85rem;
              }

              .fc-event-title {
                font-weight: 500;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.9rem;
              }

              .holiday-event {
                background-color: #fff0ed;
                color: #c53030;
                border-left: 4px solid #FF5722 !important;
              }

              .fc-highlight {
                background-color: #e9eef6;
              }

              .fc-button-primary {
                background-color: #4f46e5;
                border-color: #4f46e5;
                border-radius: 8px;
                text-transform: uppercase;
                font-weight: 600;
                padding: 0.6rem 1.2rem;
                font-size: 0.85rem;
                letter-spacing: 0.025em;
                box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
                transition: all 0.2s ease;
              }

              .fc-button-primary:hover {
                background-color: #4338ca;
                border-color: #4338ca;
                transform: translateY(-1px);
                box-shadow: 0 4px 6px rgba(79, 70, 229, 0.25);
              }
              
              .fc-button-primary:active {
                transform: translateY(0);
              }

              .fc-daygrid-event:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
              }
              
              .fc-daygrid-more-link {
                background: #f3f4f6;
                border-radius: 6px;
                padding: 2px 6px;
                font-size: 0.75rem;
                font-weight: 600;
                color: #4f46e5;
                margin-top: 4px;
                display: inline-block;
              }

              /* Time grid views specific styles */
              .fc-timegrid-slot {
                height: 40px !important;
              }
              
              .fc-timegrid-slot-lane {
                background-color: rgba(255, 255, 255, 0.8);
              }
              
              .fc-timegrid-now-indicator-line {
                border-color: #ef4444;
                border-width: 2px;
              }
              
              .fc-timegrid-now-indicator-arrow {
                border-color: #ef4444;
                border-width: 5px;
              }
              
              /* Week view improvements */
              .fc-timeGridWeek-view .fc-timegrid-event {
                border-radius: 6px;
                margin: 1px 1px;
              }

              @media (max-width: 640px) {
                .fc-header-toolbar {
                  flex-direction: column;
                  gap: 12px;
                }
              }
            `}</style>

            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={calendarView}
              headerToolbar={false}
              events={allEvents}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              eventContent={eventContent}
              height="auto"
              aspectRatio={1.8}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={3}
              weekends={true}
              datesSet={handleDatesSet}
              eventTimeFormat={{ hour: 'numeric', minute: '2-digit', meridiem: 'short' }}
              slotLabelFormat={{ hour: 'numeric', minute: '2-digit', hour12: true }}
              dayHeaderFormat={{ weekday: 'short' }}
              allDayText="All Day"
              moreLinkText="+ more"
              noEventsText="No events to display"
              nowIndicator={true}
            />
          </div>

          {/* Upcoming Holidays Section - Enhanced with View All button */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="mr-2">🎊</span> Upcoming Holidays
              </h2>
              <button 
                onClick={() => setShowAllHolidaysModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors shadow-md hover:shadow-lg"
              >
                <span>View All</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {upcomingHolidays.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingHolidays.map(holiday => (
                  <div
                    key={holiday.id}
                    className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group"
                  >
                    {/* Background decoration */}
                    <div className="absolute -right-6 -top-6 w-20 h-20 bg-orange-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 relative z-10">
                      {holiday.title.replace('🎉 ', '')}
                    </h3>
                    <div className="flex items-center mt-3 text-gray-600 relative z-10">
                      <span className="mr-2">📅</span>
                      <span className="font-medium">
                        {format(new Date(holiday.start), 'MMMM d, yyyy')}
                      </span>
                    </div>
                    <p className="text-gray-500 mt-3 text-sm relative z-10">
                      {holiday.extendedProps.description || 'National Holiday'}
                    </p>
                    
                    {/* Days remaining badge */}
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center justify-center min-w-8 h-8">
                      {Math.ceil((new Date(holiday.start) - new Date()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500 flex flex-col items-center justify-center">
                  <span className="text-4xl mb-4">🗓️</span>
                  <span>No upcoming holidays in the selected year.</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Quick-stats footer */}
      <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between border-t-4 border-indigo-500">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Events</p>
            <p className="text-2xl font-bold text-gray-800">{events.length}</p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between border-t-4 border-purple-500">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Holidays</p>
            <p className="text-2xl font-bold text-gray-800">{holidays.length}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between border-t-4 border-emerald-500">
          <div>
            <p className="text-gray-500 text-sm font-medium">Current Month</p>
            <p className="text-2xl font-bold text-gray-800">{format(currentDate, 'MMMM')}</p>
          </div>
          <div className="bg-emerald-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddEventModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddEvent={handleAddEvent}
          selectedDate={selectedDate}
        />
      )}

      {showDetailsModal && selectedEvent && (
        <EventDetailsModal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
      
      {/* All Holidays Modal */}
      <AllHolidaysModal />
    </div>
  );
}

export default Calendar;



