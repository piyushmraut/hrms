import React from 'react';
import { format } from 'date-fns';

function CalendarHeader({ 
  calendarView, 
  onViewChange, 
  onAddEvent,
  year,
  onYearChange,
  currentDate 
}) {
  // Generate year options (5 years back, 5 years forward)
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }

  // Get color themes for different months
  const getMonthColor = (month) => {
    const monthColors = {
      0: {bg: '#EFF6FF', text: '#1E40AF'}, // January - Blue
      1: {bg: '#FDF2F8', text: '#BE185D'}, // February - Pink
      2: {bg: '#ECFDF5', text: '#065F46'}, // March - Green
      3: {bg: '#FEF3C7', text: '#92400E'}, // April - Amber
      4: {bg: '#DCFCE7', text: '#166534'}, // May - Emerald
      5: {bg: '#F0FDFA', text: '#0F766E'}, // June - Teal
      6: {bg: '#FEFCE8', text: '#854D0E'}, // July - Yellow
      7: {bg: '#F0FDF4', text: '#166534'}, // August - Green
      8: {bg: '#F7FEE7', text: '#3F6212'}, // September - Lime
      9: {bg: '#FEF2F2', text: '#B91C1C'}, // October - Red
      10: {bg: '#FAF5FF', text: '#6B21A8'}, // November - Purple
      11: {bg: '#DCFCE7', text: '#166534'}, // December - Emerald
    };
    
    return monthColors[month] || {bg: '#EFF6FF', text: '#1E40AF'};
  };

  const monthIndex = currentDate.getMonth();
  const monthColors = getMonthColor(monthIndex);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
               Calendar
            </span>
            <span className="ml-3 text-sm font-normal px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
              India
            </span>
          </h1>
          <div 
            className="text-xl font-medium mt-2 px-4 py-2 rounded-lg" 
            style={{ 
              backgroundColor: monthColors.bg,
              color: monthColors.text
            }}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {format(currentDate, 'MMMM yyyy')}
            </div>
          </div>
        </div>
        <button
          onClick={onAddEvent}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center transition-all duration-200 transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Event
        </button>
      </div>

      <div className="flex flex-wrap justify-between items-center bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
        <div className="flex space-x-2">
          <button
            onClick={() => onViewChange('dayGridMonth')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              calendarView === 'dayGridMonth'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => onViewChange('timeGridWeek')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              calendarView === 'timeGridWeek'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => onViewChange('timeGridDay')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              calendarView === 'timeGridDay'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Day
          </button>
        </div>

        <div className="mt-3 sm:mt-0">
          <div className="w-40">
            <label htmlFor="year" className="block text-sm font-medium text-indigo-700">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Holiday Year
              </span>
            </label>
            <select
              id="year"
              value={year}
              onChange={onYearChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm bg-indigo-50"
            >
              {years.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default CalendarHeader;

