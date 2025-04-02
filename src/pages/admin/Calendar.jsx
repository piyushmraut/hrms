import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { format, addMonths, subMonths } from 'date-fns';

// Components
import AddEventModal from '../../components/AddEventModal';
import EventDetailsModal from '../../components/EventDetailsModal';
import CalendarHeader from '../../components/CalendarHeader';
import LoadingSpinner from '../../components/LoadingSpinner';

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


function Calendar() {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
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
  // Set country to India only
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
              country: COUNTRY
            }
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
  }, [year, API_KEY]);

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
  const handleAddEvent = (newEvent) => {
    const eventWithId = { ...newEvent, id: `event-${Date.now()}` };
    setEvents([...events, eventWithId]);
    setShowAddModal(false);
  };

  // Handle editing an event
  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setShowDetailsModal(false);
    setSelectedEvent(null);
  };

  // Handle deleting an event
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowDetailsModal(false);
    setSelectedEvent(null);
  };

  // Handle clicking on a date in the calendar
  const handleDateClick = (info) => {
    setSelectedDate(info.date);
    setShowAddModal(true);
  };

  // Handle clicking on an event in the calendar
  const handleEventClick = (info) => {
    // Don't allow editing of holidays
    if (info.event.extendedProps.type === 'holiday') {
      // Just show holiday info in an alert
      alert(`Holiday: ${info.event.title.replace('🎉 ', '')}\nDescription: ${info.event.extendedProps.description || 'National Holiday'}`);
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
      priority: info.event.extendedProps.priority || 'Medium'
    });
    setShowDetailsModal(true);
  };

  // Handle changing the calendar view
  const handleViewChange = (viewName) => {
    setCalendarView(viewName);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(viewName);
      setCurrentDate(calendarApi.getDate());
    }
  };

  // Handle changing the year
  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  // Handle calendar date navigation
  const handleDatesSet = (dateInfo) => {
    setCurrentDate(dateInfo.view.currentStart);
  };

  // Apply custom styling to events
  const eventContent = (eventInfo) => {
    const isHoliday = eventInfo.event.extendedProps.type === 'holiday';
    
    return (
      <>
        <div className={`fc-event-main-frame ${isHoliday ? 'holiday-event' : ''}`}>
          <div className="fc-event-time">{eventInfo.timeText}</div>
          <div className="fc-event-title-container">
            <div className="fc-event-title fc-sticky">
              {isHoliday ? (
                <span className="flex items-center">
                  <span className="mr-1">🎉</span>
                  <span>{eventInfo.event.title.replace('🎉 ', '')}</span>
                </span>
              ) : (
                <span className="flex items-center">
                  {eventInfo.event.extendedProps.priority === 'High' && (
                    <span className="mr-1 text-red-500">⚠️</span>
                  )}
                  {eventInfo.event.title}
                </span>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  // All events to display on calendar (user events + holidays)
  const allEvents = [...events, ...holidays];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
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
        
        <div className="mt-4">
          <style jsx global>{`
            .fc-theme-standard .fc-scrollgrid {
              border-radius: 8px;
              overflow: hidden;
              border: 1px solid #e5e7eb;
            }
            
            .fc-day-today {
              background-color: #EBF4FF !important;
            }
            
            .fc-daygrid-day-top {
              justify-content: center;
              padding-top: 4px;
            }
            
            .fc-daygrid-day-number {
              font-weight: 500;
              color: #4b5563;
            }
            
            .fc-col-header-cell {
              background-color: #4F46E5;
              color: white;
              padding: 8px 0;
            }
            
            .fc-col-header-cell-cushion {
              font-weight: 600;
              color: white;
              text-decoration: none !important;
            }
            
            .fc-daygrid-event {
              border-radius: 4px;
              padding: 2px 4px;
              margin-top: 2px;
              border: none;
              box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }
            
            .fc-event-time {
              font-weight: 500;
            }
            
            .fc-event-title {
              font-weight: 500;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            
            .holiday-event {
              background-color: #FFECE5;
              color: #B91C1C;
            }
            
            .fc-highlight {
              background-color: #F3F4F6;
              color:black;
            }
            
            .fc-button-primary {
              background-color: #4F46E5;
              border-color: #4F46E5;
            }
            
            .fc-button-primary:hover {
              background-color: #4338CA;
              border-color: #4338CA;
            }
            
            .fc-today-button {
              text-transform: uppercase;
              font-weight: 500;
            }

            /* Responsive adjustments */
            @media (max-width: 640px) {
              .fc-header-toolbar {
                flex-direction: column;
                gap: 10px;
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
            eventTimeFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: 'short'
            }}
            slotLabelFormat={{
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            }}
            dayHeaderFormat={{
              weekday: 'short'
            }}
            allDayText="All Day"
            moreLinkText="+ more"
            noEventsText="No events to display"
          />
        </div>
        
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
      </div>
    </div>
  );
}

export default Calendar;