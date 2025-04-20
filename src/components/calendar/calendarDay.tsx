import React from 'react';
import { isSameDay, isToday } from 'date-fns';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isMarked: boolean;
  onClick: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isCurrentMonth,
  isSelected,
  isMarked,
  onClick,
}) => {
  const isTodayDate = isToday(date);
  
  // Base styles
  const baseClasses = 'h-9 w-9 flex items-center justify-center rounded-full cursor-pointer text-sm';
  
  // Text color based on state
  const textColor = !isCurrentMonth
    ? 'text-gray-400'
    : isSelected
      ? 'text-white'
      : isTodayDate
        ? 'text-indigo-600'
        : 'text-gray-900';
  
  // Background color based on state
  const bgColor = isSelected
    ? 'bg-indigo-600'
    : isTodayDate
      ? 'bg-indigo-100'
      : '';
  
  // Hover state
  const hoverClass = !isSelected
    ? 'hover:bg-gray-100'
    : '';
  
  // Combined classes
  const classes = `${baseClasses} ${textColor} ${bgColor} ${hoverClass}`;
  
  return (
    <div className="py-1.5">
      <button
        type="button"
        className={classes}
        onClick={onClick}
      >
        {date.getDate()}
        {isMarked && !isSelected && (
          <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full bg-indigo-500"></span>
        )}
      </button>
    </div>
  );
};

export default CalendarDay;
