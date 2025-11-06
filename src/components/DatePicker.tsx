'use client';

import { useState } from 'react';

interface DatePickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export default function DatePicker({ selectedDate, onDateSelect }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDateAvailable = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Only allow future dates (starting from tomorrow)
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return date >= tomorrow;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days = daysInMonth(currentMonth);
  const firstDay = firstDayOfMonth(currentMonth);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          ←
        </button>
        <div className="font-semibold text-gray-900">
          {monthNames[month]} {year}
        </div>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          →
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: days }).map((_, index) => {
          const day = index + 1;
          const dateString = formatDate(year, month, day);
          const isAvailable = isDateAvailable(year, month, day);
          const isSelected = dateString === selectedDate;

          return (
            <button
              key={day}
              onClick={() => isAvailable && onDateSelect(dateString)}
              disabled={!isAvailable}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm transition ${
                isSelected
                  ? 'bg-blue-600 text-white font-bold'
                  : isAvailable
                  ? 'hover:bg-blue-50 text-gray-900'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
        <div className="mt-4 pt-4 border-t text-center">
          <div className="text-sm text-gray-600">Selected Delivery Date:</div>
          <div className="font-semibold text-gray-900">{selectedDate}</div>
        </div>
      )}
    </div>
  );
}
