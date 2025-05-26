import React, { useState } from 'react';
import dayjs from 'dayjs';
import events from '../../public/events.json';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const generateDays = () => {
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDay = (day) => {
    const dateStr = currentDate.date(day).format('YYYY-MM-DD');
    return events.filter(event => event.date === dateStr);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}>←</button>
        <h2 className="text-xl font-bold">{currentDate.format('MMMM YYYY')}</h2>
        <button onClick={() => setCurrentDate(currentDate.add(1, 'month'))}>→</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {generateDays().map((day, index) => {
          const isToday = day === currentDate.date() &&
            currentDate.isSame(dayjs(), 'month') &&
            currentDate.isSame(dayjs(), 'year');

          const dayEvents = day ? getEventsForDay(day) : [];

          return (
            <div key={index} className={`min-h-[80px] border rounded-lg p-1 ${isToday ? 'bg-blue-200' : 'bg-gray-50'}`}>
              <div className="font-bold">{day}</div>
              {dayEvents.map((event, idx) => (
                <div key={idx} className="text-xs mt-1 p-1 bg-purple-200 rounded">
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
