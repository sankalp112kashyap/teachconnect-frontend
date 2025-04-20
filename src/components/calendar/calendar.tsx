
// src/components/calendar/Calendar.tsx
import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths
} from 'date-fns';
import CalendarDay from './CalendarDay';

interface CalendarProps {
  currentMonth: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  markedDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  selectedDate,
  onDateSelect,
  onPrevMonth,
  onNextMonth,
  markedDates = [],
}) => {
  // Get days for current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Check if a date is marked (e.g., for events)
  const isDateMarked = (date: Date) =>
    markedDates.some(markedDate => isSameDay(markedDate, date));
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onPrevMonth}
            className="p-1 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <span className="sr-only">Previous month</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="p-1 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <span className="sr-only">Next month</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {/* Week day headers */}
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((day) => (
          <div key={day.toISOString()} className="text-center relative">
            <CalendarDay
              date={day}
              isCurrentMonth={isSameMonth(day, monthStart)}
              isSelected={selectedDate ? isSameDay(day, selectedDate) : false}
              isMarked={isDateMarked(day)}
              onClick={() => onDateSelect(day)}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex text-xs text-gray-500 justify-center">
        <div className="flex items-center mr-4">
          <div className="h-3 w-3 rounded-full bg-indigo-100 mr-1"></div>
          <span>Today</span>
        </div>
        
        <div className="flex items-center mr-4">
          <div className="h-3 w-3 rounded-full bg-indigo-600 mr-1"></div>
          <span>Selected</span>
        </div>
        
        {markedDates.length > 0 && (
          <div className="flex items-center">
            <div className="h-3 w-3 relative mr-1">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full bg-indigo-500"></div>
            </div>
            <span>Class</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;