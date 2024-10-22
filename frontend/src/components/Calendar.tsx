import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Calendar: React.FC = () => {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, "hours").toDate(),
      title: "Math Tutoring Session"
    }
  ]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ])
  }

  return (
    <div className="h-full">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 200px)' }}
        selectable
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default Calendar;